import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

const useMsgFetch = ({ ChatType, ChatID }) => {
  // Hooks
  const [Messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let unsubscribe;
    if (ChatType === "DM") {
      // Private Chat Fetch
      const DMref = query(
        collection(db, "Messages", "Private_Chats", ChatID),
        orderBy("createdAt")
        // ,limitToLast(20)
      );
      unsubscribe = onSnapshot(DMref, (snapshot) => {
        const next = [];
        snapshot.docs.forEach((msg) => {
          next.push(msg.data());
        });
        setMessages(next);
        setIsLoading(false);
      });
    }

    if (ChatType === "Group") {
      // Group Chat Fetch
      const DMref = query(
        collection(db, "Messages", "Group_Chats", ChatID),
        orderBy("createdAt")
        // ,limitToLast(25)
      );
      unsubscribe = onSnapshot(DMref, (snapshot) => {
        const next = [];
        snapshot.docs.forEach((msg) => {
          next.push(msg.data());
        });
        setMessages(next);
        setIsLoading(false);
      });
    }

    // end
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [ChatType, ChatID]);

  return [Messages, isLoading];
};

export default useMsgFetch;
