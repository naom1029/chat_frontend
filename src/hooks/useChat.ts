import { useState, useEffect, useCallback } from "react";
import { SendMessage } from "../types/SendMessage";

export const useChat = () => {
  const [messages, setMessages] = useState<SendMessage[]>([
    {
      text: "Welcome to the chat app!",
    },
  ]);

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = useCallback((text: string, sender: string) => {
    const newMessage: SendMessage = {
      text,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, []);

  return { messages, sendMessage };
};
