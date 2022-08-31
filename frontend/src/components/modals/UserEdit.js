import axiosInstance from "../axiosApi";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  Button,
  Radio,
  RadioGroup,
  useDisclosure,
  Stack,
  FormLabel,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const UserEdit = () => {
  const [first_name, setFirst_Name] = useState();
  const [last_name, setLast_Name] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState();
  const [birth_date, setBirth_Date] = useState();
  const [phone_number, setPhone_Number] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    axiosInstance
      .patch("/user/edit/", {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        gender: gender,
        birth_date: birth_date,
        phone_number: phone_number,
      })
      .then(() => {
        toast.success("User was updated!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
        onClose();
      })
      .catch((error) => {
        toast.error(error.response.data.msg, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <>
      <Button colorScheme="whatsapp" onClick={onOpen} size="md">
        Change your data
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Data change</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  type="text"
                  value={first_name || ""}
                  onChange={(e) => {
                    setFirst_Name(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Last name</FormLabel>
                <Input
                  type="text"
                  value={last_name || ""}
                  onChange={(e) => {
                    setLast_Name(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email || ""}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password || ""}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup onChange={setGender} value={gender}>
                  <Stack>
                    <Radio value="Man">Man</Radio>
                    <Radio value="Woman">Woman</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Birth date</FormLabel>
                <Input
                  type="date"
                  value={birth_date || ""}
                  onChange={(e) => {
                    setBirth_Date(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Phone number</FormLabel>
                <Input
                  type="text"
                  value={phone_number || ""}
                  onChange={(e) => {
                    setPhone_Number(e.target.value);
                  }}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} type="submit" colorScheme="red">
              Change
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserEdit;
