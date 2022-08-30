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

const ProjectDetails = ({ id }) => {
  const [comment_data, setComment_Data] = useState(null);
  const [iscomment, setIscomment] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getProjectDetails = () => {
    axiosInstance.get(`/user/comment/get/${id}/`).then((res) => {
      setComment_Data(res.data);
      setIscomment(true);
    });
  };

  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          getProjectDetails();
        }}
      >
        Details
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Project Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              {iscomment &&
                comment_data.map((comment) => (
                  <Text key={comment.id}>
                    {comment.date_added} | {comment.description}
                  </Text>
                ))}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectDetails;
