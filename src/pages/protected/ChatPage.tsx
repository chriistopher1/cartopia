import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase/config";
import { useUserContext } from "../../context/AuthProvider";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { formatToIDR } from "../../constant";
import { IProduct, Message } from "../../types";

const ChatPage = () => {
  const { user } = useUserContext();
  const [conversations, setConversations] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.accountId) {
      const q = query(collection(db, "chats_metadata"), where("userId", "==", user.accountId));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const convos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setConversations(convos);
      });
      return () => unsubscribe();
    }
  }, [user.accountId]);

  const handleChatClick = (chatId: string, product: IProduct, sellerId: string) => {
    navigate(`/chat/${product.id}/${user.accountId}`, { state: { product, sellerId } });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Conversations</h2>
      {conversations.length > 0 ? (
        conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="p-4 bg-white shadow-md rounded-lg mb-4 flex items-center justify-between cursor-pointer"
            onClick={() => handleChatClick(conversation.productId, conversation.product, conversation.sellerId)}
          >
            <div className="flex items-center">
              <img src={conversation.product.imageUrl} alt={conversation.product.name} className="w-16 h-16 object-cover rounded-md mr-4" />
              <div>
                <h3 className="text-lg font-semibold">{conversation.product.name}</h3>
                <p className="text-gray-500">{formatToIDR(conversation.product.price)}</p>
                <p className="text-sm text-gray-600">{conversation.latestMessage}</p>
              </div>
            </div>
            <FaEnvelopeOpenText className="text-2xl text-gray-500" />
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-500">No conversations found</p>
      )}
    </div>
  );
};

export default ChatPage;
