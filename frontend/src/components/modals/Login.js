import axiosInstance from "../../axiosApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  useDisclosure,
  FormLabel,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    axiosInstance
      .post("/token/obtain/", {
        email: email,
        password: password,
      })
      .then((res) => {
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + res.data.access;
        window.localStorage.setItem("access_token", res.data.access);
        window.localStorage.setItem("refresh_token", res.data.refresh);
        toast.success("Logged in!!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/projects");
      })
      .catch(() => {
        toast.error("Wrong email or password", {
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
      <Button colorScheme="green" onClick={onOpen} size="lg">
        Sign in!
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Sign in</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} type="submit" colorScheme="blue">
              Sign in
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
