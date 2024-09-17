export interface Message {
  id: number;
  text: string;
  timestamp: Date;
}

export interface ChatContextType {
  messages: Message[];
  sendMessage: (text: string) => void;
}
