import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../components/Header";
import { ChatData } from "../context/ChatContext";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { LoadingBig, LoadingSmall } from "../components/Loading";
import { IoMdSend } from "react-icons/io";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const {
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    newRequestLoading,
    loading,
    chats,
  } = ChatData();

  const submitHandler = (e) => {
    e.preventDefault();
    fetchResponse();
  };

  const messagecontainerRef = useRef();

  useEffect(() => {
    if (messagecontainerRef.current) {
      messagecontainerRef.current.scrollTo({
        top: messagecontainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-blue-950 text-white">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 flex-col min-w-0">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-4 bg-gray-900/90 backdrop-blur-md text-2xl border-b border-white/10 hover:bg-gray-800 transition-all"
        >
          <GiHamburgerMenu />
        </button>

        <div className="flex-1 p-4 md:p-6 mb-20 md:mb-0 overflow-hidden">
          <Header />

          {loading ? (
            <LoadingBig />
          ) : (
            <div
              className="flex-1 p-3 md:p-6 max-h-[600px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar space-y-4"
              ref={messagecontainerRef}
            >
              {messages && messages.length > 0 ? (
                messages.map((e, i) => (
                  <div key={i}>
                    <div className="mb-4 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex gap-3 shadow-lg shadow-blue-950/30 border border-blue-400/20 hover:shadow-blue-900/40 transition-all">
                      <div className="bg-white p-2 rounded-full text-blue-700 text-2xl h-10 w-10 flex items-center justify-center shrink-0 shadow-md">
                        <CgProfile />
                      </div>

                      <div className="pt-1 leading-relaxed break-words">
                        {e.question}
                      </div>
                    </div>

                    <div className="mb-4 p-4 md:p-5 rounded-2xl bg-gray-800/90 backdrop-blur-sm text-gray-100 flex gap-3 shadow-lg shadow-black/20 border border-white/10">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-full text-white text-xl h-10 w-10 flex items-center justify-center shrink-0 shadow-md">
                        <FaRobot />
                      </div>

                      <p
                        className="pt-1 leading-relaxed break-words text-gray-200"
                        dangerouslySetInnerHTML={{ __html: e.answer }}
                      ></p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 text-lg">
                    No chat yet
                  </p>
                </div>
              )}

              {newRequestLoading && <LoadingSmall />}
            </div>
          )}
        </div>
      </div>

      {chats && chats.length === 0 ? (
        ""
      ) : (
        <div className="fixed bottom-0 right-0 left-auto p-3 md:p-4 bg-gray-950/95 backdrop-blur-xl border-t border-white/10 w-full md:w-[75%] shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
          <form
            onSubmit={submitHandler}
            className="flex justify-center items-center max-w-5xl mx-auto"
          >
            <input
              className="flex-grow p-3.5 md:p-4 bg-gray-800/90 border border-gray-700 rounded-l-xl text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-gray-800"
              type="text"
              placeholder="Enter a prompt here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />

            <button className="p-3.5 md:p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-r-xl text-2xl text-white hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-900/30">
              <IoMdSend />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;