import axiosInstance from "../axiosApi";
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
  const [user_data, setUser_Data] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    axiosInstance.get("/user/").then((res) => {
      setUser_Data(res.data);
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
              <Text>First name: {user_data.first_name}</Text>
              <Text>Last name: {user_data.last_name}</Text>
              <Text>Email: {user_data.email}</Text>
              <Text>Gender: {user_data.gender}</Text>
              <Text>Birth date: {user_data.birth_date}</Text>
              <Text>Phone number: {user_data.phone_number}</Text>
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
