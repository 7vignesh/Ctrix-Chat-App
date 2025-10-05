import { useEffect, useContext } from "react";

import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../../firebase";

import AppContext from "../GlobalStore/Context";

function useChatInit() {
  const context = useContext(AppContext);
  // Ref
  const PMREF = collection(db, "Private_Chat_init");

  useEffect(() => {
    // indicate loading while we attach listeners and receive first snapshots
    context.setLoading(true);
    // Retrieving Private Chatroom details or chat initiase information related to current user
    // let ChatInitsFetched;
    const unsubPrivate = onSnapshot(
      query(
        PMREF,
        where("ChatUserID", "array-contains", context.Current_UserID)
      ),
      (snapshot) => {
        const next = [];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          next.push(data);
        });
        // Replace in one commit to avoid flicker from multiple state updates
        context.setChatInit((prev) => {
          const filtered = prev.filter(
            (arr) => !next.some((n) => n.ChatID === arr.ChatID)
          );
          return [...filtered, ...next];
        });
      }
    );
    // onSnapshot(
    //   query(PMREF, where("User2.ID", "==", context.Current_UserID)),
    //   (snapshot) => {
    //     snapshot.docs.forEach((doc) => {
    //       const data = doc.data();
    //       context.setChatInit((chat) =>
    //         chat.filter((arr) => arr.ChatID !== data.ChatID)
    //       );
    //       context.setChatInit((value) => [...value, data]);
    //     });
    //   }
    // );

    // Group Chat

    const GroupChatRef = collection(db, "Group_Chat_init");

    const unsubGroup = onSnapshot(
      query(
        GroupChatRef,
        where("ChatUserID", "array-contains", context.Current_UserID)
      ),
      (snapshot) => {
        const next = [];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          next.push(data);
        });
        context.setChatInit((prev) => {
          const filtered = prev.filter(
            (arr) => !next.some((n) => n.ChatID === arr.ChatID)
          );
          return [...filtered, ...next];
        });
        // first group snapshot received; dismiss loading
        context.setLoading(false);
      }
    );

    // eslint-disable-next-line
    return () => {
      unsubPrivate && unsubPrivate();
      unsubGroup && unsubGroup();
    };
  }, [db, context.Current_UserData]);
  return null;
}

export default useChatInit;
