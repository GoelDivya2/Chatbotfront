import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";
import toast from "react-hot-toast";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newRequestLoading, setNewRequestLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [createLod, setCreateLod] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ FETCH RESPONSE FROM GEMINI
async function fetchResponse() {
  if (prompt.trim() === "") return alert("Write prompt");

  setNewRequestLoading(true);

  const userPrompt = prompt;
  setPrompt("");

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `${userPrompt}

Answer in a maximum of 150 words. Do not exceed 50 words.`,
              },
            ],
          },
        ],
      }
    );

    const answer =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    const message = {
      question: userPrompt,
      answer: answer,
    };

    setMessages((prev) => [...prev, message]);
    setNewRequestLoading(false);

    // ✅ Save to backend
    await axios.post(
      `${server}/api/chat/${selected}`,
      {
        question: userPrompt,
        answer: answer,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
    setNewRequestLoading(false);
  }
}
  // ✅ FETCH ALL CHATS
  async function fetchChats() {
    try {
      const { data } = await axios.get(`${server}/api/chat/all`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setChats(data);
      if (data.length > 0) setSelected(data[0]._id);
    } catch (error) {
      console.log(error);
    }
  }

  // ✅ CREATE NEW CHAT
  async function createChat() {
    setCreateLod(true);
    try {
      await axios.post(
        `${server}/api/chat/new`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      await fetchChats();
      setCreateLod(false);
    } catch (error) {
      toast.error("Something went wrong");
      setCreateLod(false);
    }
  }

  // ✅ FETCH MESSAGES OF SELECTED CHAT
  async function fetchMessages() {
    if (!selected) return;

    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/chat/${selected}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // ✅ DELETE CHAT
  async function deleteChat(id) {
    try {
      const { data } = await axios.delete(`${server}/api/chat/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      fetchChats();
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  // ✅ EFFECTS
  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [selected]);

  return (
    <ChatContext.Provider
      value={{
        fetchResponse,
        messages,
        prompt,
        setPrompt,
        newRequestLoading,
        chats,
        createChat,
        createLod,
        selected,
        setSelected,
        loading,
        deleteChat,
        fetchChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatData = () => useContext(ChatContext);