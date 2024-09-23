export interface ChatMessage {
  type: "Chat";
  id: string;
  text: string;
  timestamp: string;
}

export interface RoomListMessage {
  type: "List";
  rooms: string[];
}

export type ReceiveMessage = ChatMessage | RoomListMessage;
