import { useState, useEffect } from "react";
import axios from "axios";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string | number | Date;
}

const useFetchMessages = (apiUrl: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(apiUrl);
        setMessages(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [apiUrl]);

  return { messages, loading, error };
};

export default useFetchMessages;
