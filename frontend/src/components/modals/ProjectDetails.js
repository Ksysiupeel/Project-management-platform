import axiosInstance from "../axiosApi";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    axiosInstance.get(`/user/comment/get/${id}/`).then((res) => {
      setComment_Data(res.data);
      setIscomment(true);
    });
  }, []);

  return (
    <>
      <Button onClick={onOpen}>Details</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Project Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              {iscomment ? (
                comment_data.map((data) => (
                  <Text key={data.id}>
                    {data.date_added} | {data.description} <br />
                  </Text>
                ))
              ) : (
                <Text>No comments</Text>
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
