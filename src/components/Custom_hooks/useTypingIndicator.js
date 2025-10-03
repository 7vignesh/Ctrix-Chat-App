import { useState, useEffect, useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import AppContext from "../GlobalStore/Context";

const useTypingIndicator = () => {
  const context = useContext(AppContext);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    if (!context.activeChatInit?.ChatID) {
      setTypingUsers([]);
      return;
    }

    const chatCollection =
      context.activeChatInit.ChatType === "DM"
        ? "Private_Chat_init"
        : "Group_Chat_init";

    const chatRef = doc(db, chatCollection, context.activeChatInit.ChatID);

    const unsubscribe = onSnapshot(chatRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        const currentTypingUsers = data.typingUsers || [];

        // Filter out current user and old entries (older than 5 seconds)
        const now = Date.now();
        const filteredUsers = currentTypingUsers.filter(
          (user) =>
            user.userId !== context.Current_UserID &&
            now - user.timestamp < 5000
        );

        setTypingUsers(filteredUsers);
      }
    });

    return () => unsubscribe();
  }, [
    context.activeChatInit?.ChatID,
    context.activeChatInit?.ChatType,
    context.Current_UserID,
  ]);

  return typingUsers;
};

export default useTypingIndicator;
