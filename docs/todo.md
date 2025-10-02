# Contributor Task List

Here is a list of tasks that you can work on to contribute to the Ctrix Chat App. Each task includes a description of what needs to be done, why it's important, and how you can approach it.

---

### 1. Add "User is typing..." Indicator

*   **What:** Implement a feature that shows an indicator when a user is typing a message in a chat room.
*   **Why:** This improves the user experience by making the chat feel more interactive and responsive. It lets users know that the other person is actively engaged in the conversation.
*   **How:**
    1.  You'll need to detect when a user starts and stops typing in the message input field.
    2.  When a user is typing, you can update a `typing` status in Firestore for that user in the current chat room. For example, you could have a `typingUsers` array in the chat room document.
    3.  Other users in the chat room will listen for changes to this `typingUsers` array and display an indicator (e.g., "User is typing...") when it's not empty.
    4.  Remember to handle the case where a user stops typing or leaves the chat room, so the indicator doesn't stay on forever.

---

### 2. Implement Read Receipts

*   **What:** Add a feature to show when a message has been seen by the other user(s) in a chat room.
*   **Why:** This provides confirmation to the sender that their message has been read, which is a common and expected feature in modern chat applications.
*   **How:**
    1.  When a user opens a chat room and views the messages, you need to identify which messages are now "seen".
    2.  For each message document in Firestore, you could add a `seenBy` array containing the UIDs of the users who have seen it.
    3.  When a message is displayed, you can check if the current user's UID is in the `seenBy` array. If it is, you can display a double-tick or a similar indicator.
    4.  You will need to update the message documents in Firestore as users view them.

---

### 3. Enhance UI/UX for Chat Bubbles

*   **What:** Improve the visual design and user experience of the chat messages (the "bubbles").
*   **Why:** The current chat bubbles are functional, but they could be more aesthetically pleasing and easier to read. A polished UI makes the app look more professional and enjoyable to use.
*   **How:**
    1.  The chat messages are rendered by the `Message.js` component. You can start by modifying the styles in this component.
    2.  You can experiment with different color schemes, bubble shapes, and typography. Look at other popular chat apps for inspiration.
    3.  Consider adding a timestamp to each message bubble that is only visible on hover or is formatted in a more user-friendly way (e.g., "2 minutes ago").
    4.  Make sure to handle the distinction between messages sent by the current user and messages received from others (e.g., different colors or alignment).

---

### 4. Add Unit Tests for Components

*   **What:** Write unit tests for some of the React components to ensure they work as expected.
*   **Why:** Tests are crucial for maintaining code quality and preventing regressions. They allow us to make changes to the codebase with more confidence.
*   **How:**
    1.  The project uses `@testing-library/react` for testing. You can look at `App.test.js` for a basic example.
    2.  Pick a component, for example, `SideBar.js` or `ChatModal.js`.
    3.  Write a test file (e.g., `SideBar.test.js`) in the same directory as the component.
    4.  Write tests to check if the component renders correctly, if it responds to user interactions (like clicks), and if it displays the correct information based on its props.
    5.  You can run the tests using the `pnpm test` command.

---

### 5. Improve UI Smoothness and Animations

*   **What:** Enhance the user interface by adding smooth transitions and animations.
*   **Why:** A smoother UI feels more modern and professional. Animations can provide valuable feedback to the user and make the application more enjoyable to use.
*   **How:**
    1.  The project uses `framer-motion`, which is already a dependency. You can use it to add animations to components.
    2.  Identify areas where animations could improve the user experience. For example, when opening a modal, switching between chat rooms, or when new messages appear.
    3.  You can start with simple fade-in or slide-in animations for components. The `ChatModal.js` or the `Message.js` components would be good places to start.
    4.  Ensure that the animations are not jarring and do not negatively impact performance.

---

### 6. Enhance Group Chat Support

*   **What:** Improve the functionality and user experience for group chats.
*   **Why:** While the app supports group chats, the experience can be made more robust. Better group chat features will make the app more competitive with other chat applications.
*   **How:**
    1.  Currently, group chats are created, but there is no way to manage them. You could add features to add or remove users from a group, or to change the group name or avatar.
    2.  The `GetNameForGroup.js` function is a good place to start to understand how group names are currently handled.
    3.  You could create a new component for group settings, which could be accessed from the chat room view.
    4.  For displaying messages, you could add the name of the sender above their message in group chats to make it clear who is speaking.

---

### 7. Fix UI Flicker on Load

*   **What:** Investigate and fix any UI flickering that occurs when the application is loading or when switching between pages.
*   **Why:** UI flickering can be distracting for users and makes the application feel unpolished. A smooth, flicker-free experience is essential for a professional-looking application.
*   **How:**
    1.  Identify the components or pages where flickering is most noticeable. This often happens when data is being loaded asynchronously.
    2.  One common cause is that the component renders an initial state before the data has been fetched. You can use loading spinners or skeleton screens to provide a better loading experience.
    3.  The `useChatInit.js` and `useMsgFetch.js` hooks are responsible for fetching data. You can add loading state variables to these hooks.
    4.  In your components, you can check for the loading state and display a loading indicator instead of the main content until the data is ready.