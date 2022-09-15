import axiosInstance from "../../axiosApi";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Text,
  Stack,
} from "@chakra-ui/react";

const User = () => {
  const [userData, setUserData] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    axiosInstance.get("/user/").then((res) => {
      setUserData(res.data);
    });
  };

  return (
    <>
      <Button
        colorScheme="whatsapp"
        onClick={() => {
          onOpen();
          handleSubmit();
        }}
      >
        View your data
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Your data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Text>First name: {userData.first_name}</Text>
              <Text>Last name: {userData.last_name}</Text>
              <Text>Email: {userData.email}</Text>
              <Text>Gender: {userData.gender}</Text>
              <Text>Birth date: {userData.birth_date}</Text>
              <Text>Phone number: {userData.phone_number}</Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="linkedin" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default User;
