import { useState } from "react";
import axios from "axios";
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

const Register = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState();
  const [birthDate, setBirthDate] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    axios
      .post("http://127.0.0.1:8000/api/user/create/", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        gender: gender,
        birth_date: birthDate,
        phone_number: phoneNumber,
      })
      .then(() => {
        toast.success("User was created!", {
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
      <Button colorScheme="telegram" onClick={onOpen} size="lg">
        Sign up!
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Sign up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl isRequired>
                <FormLabel>First name</FormLabel>
                <Input
                  type="text"
                  value={firstName || ""}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Last name</FormLabel>
                <Input
                  type="text"
                  value={lastName || ""}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email || ""}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password || ""}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Gender</FormLabel>
                <RadioGroup onChange={setGender} value={gender}>
                  <Stack>
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Birth date</FormLabel>
                <Input
                  type="date"
                  value={birthDate || ""}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Phone number (Optional)</FormLabel>
                <Input
                  type="text"
                  value={phoneNumber || ""}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} type="submit" colorScheme="red">
              Sign up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Register;
