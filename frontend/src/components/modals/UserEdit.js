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
  const [userData, setUserData] = useState([]);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState();
  const [birthDate, setBirthDate] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    axiosInstance
      .patch("/user/edit/", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        gender: gender,
        birth_date: birthDate,
        phone_number: phoneNumber,
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

  const getUserData = () => {
    axiosInstance.get("/user/").then((r) => {
      setUserData(r.data);
    });
  };

  return (
    <>
      <Button
        colorScheme="whatsapp"
        onClick={() => {
          onOpen();
          getUserData();
        }}
        size="md"
      >
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
                  placeholder={userData.first_name}
                  value={firstName || ""}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Last name</FormLabel>
                <Input
                  type="text"
                  placeholder={userData.last_name}
                  value={lastName || ""}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder={userData.email}
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
                  placeholder="your secret password"
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
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Birth date</FormLabel>
                <Input
                  type="text"
                  placeholder={userData.birth_date}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  value={birthDate || ""}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Phone number</FormLabel>
                <Input
                  type="text"
                  placeholder={userData.phone_number}
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
              Change
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserEdit;
