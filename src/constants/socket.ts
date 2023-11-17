export const CONNECT = 'connect';
export const DISCONNECT = 'disconnect';

export const SOCKET = {
  FETCH_MESSAGES: 'fetch-messages',
  MESSAGES_TO_CLIENT: 'messages-to-client',
  MESSAGE_TO_SERVER: 'message-to-server',
  MESSAGE_TO_CLIENT: 'message-to-client',
  LEAVE: 'leave',
  JOIN: 'join',
  INVITE: 'invite',
} as const;
