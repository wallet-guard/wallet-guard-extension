import { Conversation } from '../../../models/chatweb3/chatweb3';

export const updateConversation = (updatedConversation: Conversation, allConversations: Conversation[]) => {
  const updatedConversations = allConversations.map((c) => {
    if (c.id === updatedConversation.id) {
      return updatedConversation;
    }

    return c;
  });

  return {
    single: updatedConversation,
    all: updatedConversations,
  };
};
