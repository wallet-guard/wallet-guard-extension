import { ChatBody, Message, OpenAIModelID } from '../../types';
import tiktokenModel from './cl100k_base.json';
import { init, Tiktoken } from '@dqbd/tiktoken/lite/init';
// @ts-expect-error
import wasm from '../../node_modules/@dqbd/tiktoken/lite/tiktoken_bg.wasm?module';
import { DEFAULT_SYSTEM_PROMPT } from '../../utils/app/const';
import { OpenAIStream } from '../../utils/server';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { model, messages, key, prompt } = (await req.json()) as ChatBody;

    await init((imports: WebAssembly.Imports | undefined) => WebAssembly.instantiate(wasm, imports));
    const encoding = new Tiktoken(tiktokenModel.bpe_ranks, tiktokenModel.special_tokens, tiktokenModel.pat_str);

    const tokenLimit = model.id === OpenAIModelID.GPT_4 ? 6000 : 3000;
    let tokenCount = 0;
    let messagesToSend: Message[] = [];

    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      const tokens = encoding.encode(message.content);

      if (tokenCount + tokens.length > tokenLimit) {
        break;
      }
      tokenCount += tokens.length;
      messagesToSend = [message, ...messagesToSend];
    }

    encoding.free();

    let promptToSend = prompt;
    if (!promptToSend) {
      promptToSend = DEFAULT_SYSTEM_PROMPT;
    }

    const stream = await OpenAIStream(model, promptToSend, key, messagesToSend);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
