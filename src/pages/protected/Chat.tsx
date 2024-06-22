// src/pages/protected/Chat.tsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { collection, addDoc, query, onSnapshot, orderBy, Timestamp } from "firebase/firestore";
import { db } from "../../lib/firebase/config";
import { useUserContext } from "../../context/AuthProvider";
import { FaPaperPlane } from "react-icons/fa";
import { IProduct, IUser } from "../../types";
import { formatToIDR } from "../../constant"; // Import your currency formatting function

const Chat = () => {
  const { sellerId } = useParams();
  const location = useLocation();
  const { user } = useUserContext();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  const seller = location.state?.seller as IUser;
  const product = location.state?.product as IProduct;

  useEffect(() => {
    if (sellerId) {
      const q = query(collection(db, "chats", sellerId, "messages"), orderBy("timestamp"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const msgs = querySnapshot.docs.map((doc) => doc.data());
        setMessages(msgs);
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      });

      return () => unsubscribe();
    }
  }, [sellerId]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      await addDoc(collection(db, "chats", sellerId, "messages"), {
        senderId: user.accountId,
        text: newMessage,
        timestamp: Timestamp.now(),
      });
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center p-4 bg-green-500 text-white">
        {seller ? (
          <>
            <img src={seller.imageUrl} alt="Seller" className="w-10 h-10 rounded-full mr-4" />
            <h1 className="text-xl">Chat with {seller.name}</h1>
          </>
        ) : (
          <h1 className="text-xl">Loading seller info...</h1>
        )}
      </div>

      {product && (
        <div className="p-4 bg-white shadow-md flex items-center">
          <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded-md mr-4" />
          <div className="flex-1">
            <Link to={`/product/${product.id}`} className="text-lg font-semibold hover:underline">
              {product.name}
            </Link>
            <p className="text-gray-500">{formatToIDR(product.price)}</p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4" style={{ backgroundColor: "#efeae2" }}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.senderId === user.accountId ? "justify-end" : "justify-start"} mb-2`}>
            <div className={`rounded-lg p-2 ${msg.senderId === user.accountId ? "bg-green-400 text-white" : "bg-white text-black"} max-w-xs`}>
              <p>{msg.text}</p>
              <span className="text-xs text-gray-500">{msg.timestamp.toDate().toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="flex items-center p-4 bg-white border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:outline-none"
          placeholder="Type a message"
        />
        <button onClick={sendMessage} className="ml-4 p-2 bg-green-500 text-white rounded-full">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chat;
