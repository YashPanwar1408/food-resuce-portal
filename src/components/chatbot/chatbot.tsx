import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const chatbotVariants = {
  open: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      
      duration: 1 
    },
  },
  closed: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const buttonVariants = {
  open: {
    rotate: 0,
    transition: { duration: 0.3 },
  },
  closed: {
    rotate: 0, // No rotation on close for the initial button
    transition: { duration: 0.3 },
  },
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Welcome! How can I help you with FoodRescue Connect today?" },
  ]);
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const suggestedQuestions = [
    "How can my restaurant donate food?",
    "How can my NGO request food?",
    "What types of food can be donated?",
  ];

  const sendMessage = async (message: string) => {
    const userMessage = { from: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://chatbot-backend-qenz.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: message }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { from: "bot", text: "Something went wrong!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="openButton"
            onClick={toggleChat}
            variants={buttonVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300"
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatWindow"
            variants={chatbotVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="w-[95vw] max-w-[420px] h-[70vh] max-h-[560px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            <div className="bg-green-500 px-4 py-3 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-green-600 text-white w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">FoodRescue Connect AI</h2>
                  <p className="text-xs text-white opacity-80">Online</p>
                </div>
                
                   
                
              </div>
              <div className="flex gap-2"><button
    onClick={() => {
      setMessages([
        { from: "bot", text: "Welcome! How can I help you with FoodRescue Connect today?" }
      ]);
    }}
    className="ml-6 text-s underline text-white"
  >
    New Chat
  </button>
   <button onClick={toggleChat} className="hover:opacity-70 transition">
                <X size={20} className="text-white" />
              </button></div>
             
            </div>

            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 text-sm">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg w-fit max-w-[85%] ${
                    msg.from === "bot" ? "bg-gray-100 text-gray-800" : "bg-green-100 text-green-800 self-end"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && <div className="text-xs text-gray-500 animate-pulse">Typing...</div>}
              <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} /> {/* For auto-scrolling */}
            </div>

            <div className="p-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 bg-white">
  <div className="flex flex-wrap gap-2">
    {suggestedQuestions.map((q, i) => (
      <button
        key={i}
        onClick={() => sendMessage(q)}
        className="bg-gray-100 hover:bg-gray-200 text-xs text-gray-700 px-3 py-1 rounded-full transition duration-200"
      >
        {q}
      </button>
    ))}
  </div>
  
</div>


            <div className="border-t border-gray-200 px-3 py-2 flex items-center gap-2 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                className="flex-1 px-4 py-2 text-sm rounded-full bg-gray-100 focus:outline-none"
              />
              <button onClick={() => sendMessage(input)} className="text-green-600 hover:text-green-700 transition duration-200">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}