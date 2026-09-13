import React from "react";
import { ChatData } from "../context/ChatContext";

const Header = () => {
  const { chats } = ChatData();
  return (
    <div className="mb-6 px-2 md:px-4">
      <p className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
        Hello, How can i help you today?
      </p>

      {chats && chats.length === 0 && (
        <p className="text-base md:text-lg text-gray-400 mb-6">
          Create new chat to continue
        </p>
      )}
    </div>
  );
};

export default Header;