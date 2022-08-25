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
  Text,
  Input,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const CommentAdd = ({ project_id }) => {
  const [description, setDescription] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    axiosInstance
      .post("/user/comment/add/", {
        project_id: project_id,
        description: description,
      })
      .then(() => {
        toast.success("Comment created!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(() => {
        toast.error("Something went wrong!", {
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
      <Button onClick={onOpen} size="m">
        Add comment
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Add comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl>
                <Text>Description</Text>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                handleSubmit();
                onClose();
              }}
              type="submit"
              colorScheme="red"
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommentAdd;
