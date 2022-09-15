import axiosInstance from "../../axiosApi";
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
  useDisclosure,
  FormLabel,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const CommentAdd = ({ project_id }) => {
  const [description, setDescription] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    axiosInstance
      .post("/user/comment/add/", {
        project_id: project_id,
        description: description,
      })
      .then(() => {
        toast.success("Comment added!", {
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
      <Button onClick={onOpen}>Add comment</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Add comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={description || ""}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} type="submit" colorScheme="red">
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommentAdd;
