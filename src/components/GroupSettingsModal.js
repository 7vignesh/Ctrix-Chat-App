import { useContext, useState } from "react";
import usePictures from "./Custom_hooks/usePictures";
import AppContext from "./GlobalStore/Context";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Image,
  useDisclosure,
  Button,
  Text
} from '@chakra-ui/react'
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { CiSettings } from "react-icons/ci";

export const GroupSettingsModal = () => {
  const context = useContext(AppContext);
  const [newName, setNewName] = useState(context.activeChatInit.ChatName)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [Placeholder] = usePictures();

  const [groupMembers, setGroupMembers] = useState(
    context.activeChatInit.ChatUserID.map(user => context.UsersData.find(val => val.User_ID == user)).filter(val => val != undefined)
  )

  return (
    <>
      <CiSettings size={"30"} cursor={"pointer"} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={2} /> */}
            <VStack w={"full"} spacing={4}>
              Group Name
              <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
              <Button
                onClick={async () => {
                  context.setActiveChatInit({
                    ...context.activeChatInit,
                    ChatName: newName,
                  });
                  const docRef = doc(db, "Group_Chat_init", context.activeChatInit.ChatID)
                  await updateDoc(docRef, {
                    ChatName: newName
                  })
                  onClose()
                }}
              >Change Name</Button>
              <hr />
              <Text>Members</Text>
              {groupMembers.map((user) => (
                user.User_ID !== context.Current_UserID &&
                <HStack key={user.User_ID} justifyContent={"space-between"} w={"full"}>
                  <HStack>
                    <Image
                      alt="User profile"
                      src={user.ProfilePicture || Placeholder}
                      boxSize={"30px"}
                      borderRadius="50%"
                      userSelect="none"
                    />
                    <Text>{user.NickName}</Text>
                  </HStack>
                  <Button
                    colorScheme="red"
                    onClick={async () => {
                      const newMembers = context.activeChatInit.ChatUserID.filter((member) => member !== user.User_ID)
                      context.setActiveChatInit({
                        ...context.activeChatInit,
                        ChatUserID: newMembers,
                      });
                      const docRef = doc(db, "Group_Chat_init", context.activeChatInit.ChatID)
                      await updateDoc(docRef, {
                        ChatUserID: newMembers
                      })
                      setGroupMembers((prev) => prev.filter(val => val.User_ID != user.User_ID))
                      onClose()
                    }}
                  >Remove</Button>
                  )
                </HStack>
              ))}
              <>
                <hr />
                <Text>Add Members</Text>
                {context.UsersData.filter((user) => !groupMembers.find(val => val.User_ID == user.User_ID)).map((user) => (
                  <HStack key={user.User_ID} justifyContent={"space-between"} w={"full"}>
                    <HStack>
                      <Image
                        alt="User profile"
                        src={user.ProfilePicture || "https://via.placeholder.com/150"}
                        boxSize={"30px"}
                        borderRadius="50%"
                        userSelect="none"
                      />
                      <Text>{user.NickName}</Text>
                    </HStack>
                    <Button
                      colorScheme="green"
                      onClick={async () => {
                        const newMembers = [...context.activeChatInit.ChatUserID, user.User_ID]
                        context.setActiveChatInit({
                          ...context.activeChatInit,
                          ChatUserID: newMembers,
                        });
                        const docRef = doc(db, "Group_Chat_init", context.activeChatInit.ChatID)
                        await updateDoc(docRef, {
                          ChatUserID: newMembers
                        })
                        setGroupMembers((prev) => [...prev, user])
                        onClose()
                      }}
                    >Add</Button>
                  </HStack>
                ))}
              </>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
