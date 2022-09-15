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

const ProjectDetails = ({ project_id }) => {
  const [commentData, setCommentData] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getProjectDetails = () => {
    axiosInstance.get(`/user/comment/get/${project_id}/`).then((res) => {
      setCommentData(res.data);
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

      <Modal onClose={onClose} isOpen={isOpen} isCentered size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Project Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              {commentData.length ? (
                commentData.map((comment) => (
                  <Text key={comment.id}>
                    {`${comment.author} | ${comment.date_added} | ${comment.description}`}
                  </Text>
                ))
              ) : (
                <Text>No comments yet</Text>
              )}
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
