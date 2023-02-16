export enum MessageType {
  GetWhitelist = 'getWhitelist',
  ConfidenceCheck = 'confidenceCheck',
  ProceedAnyway = 'proceedAnyway'
}

export function messageGenerator(
  messageType: MessageType,
  params: any = null
): any {
  return {
    type: messageType,
    ...params
  };
}
