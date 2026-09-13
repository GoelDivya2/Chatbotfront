import { IoIosCloseCircle } from "react-icons/io";
import { ChatData } from "../context/ChatContext";
import { MdDelete } from "react-icons/md";
import { LoadingSpinner } from "./Loading";
import { UserData } from "../context/UserContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { chats, createChat, createLod, setSelected, deleteChat } = ChatData();

  const { logoutHandler } = UserData();

  const deleteChatHandler = (id) => {
    if (confirm("are you sure you want to delete this chat")) {
      deleteChat(id);
    }
  };

  const clickEvent = (id) => {
    setSelected(id);
    toggleSidebar();
  };

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-b from-slate-950 via-gray-950 to-blue-950 p-4 md:p-5 transition-transform transform md:relative md:translate-x-0 md:w-1/4 md:block border-r border-white/10 shadow-2xl z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        className="md:hidden p-2 mb-5 bg-gray-800/80 hover:bg-gray-700 rounded-xl text-2xl transition-all duration-200 border border-white/10"
        onClick={toggleSidebar}
      >
        <IoIosCloseCircle />
      </button>

      <div className="text-3xl font-bold mb-7 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
        ChatBot
      </div>

      <div className="mb-6">
        <button
          onClick={createChat}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl font-semibold shadow-lg shadow-blue-900/30 transition-all duration-300 active:scale-[0.98]"
        >
          {createLod ? <LoadingSpinner /> : "New Chat +"}
        </button>
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
          Recent
        </p>

        <div className="max-h-[500px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar pr-1">
          {chats && chats.length > 0 ? (
            chats.map((e) => (
              <button
                key={e._id}
                className="w-full text-left py-3 px-3 bg-gray-800/70 hover:bg-gray-700/90 rounded-xl mt-2 flex justify-between items-center border border-white/5 hover:border-blue-500/30 transition-all duration-200 group"
                onClick={() => clickEvent(e._id)}
              >
                <span className="truncate text-sm text-gray-200 group-hover:text-white">
                  {e.latestMessage.slice(0, 38)}...
                </span>

                <button
                  className="bg-red-600/90 text-white text-xl px-3 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 ml-2 shrink-0 shadow-md shadow-red-950/30"
                  onClick={() => deleteChatHandler(e._id)}
                >
                  <MdDelete />
                </button>
              </button>
            ))
          ) : (
            <p className="text-gray-500 text-sm py-3">
              No chats yet
            </p>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 px-4 md:px-5 mb-6 w-full">
        <button
          className="bg-red-600/90 text-white font-semibold px-5 py-3 rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg shadow-red-950/30"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;