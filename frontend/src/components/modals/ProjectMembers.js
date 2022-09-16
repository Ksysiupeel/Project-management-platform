import axiosInstance from "../../axiosApi";
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
} from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";

const ProjectMembers = ({ projectId }) => {
  const [members, setMembers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getProjectMembers = () => {
    axiosInstance.get(`/projectmembers/${projectId}/`).then((res) => {
      setMembers(res.data);
    });
  };

  const deleteMember = (user_id) => {
    axiosInstance
      .delete(`/projectmembers/${user_id}/?project_id=${projectId}`)
      .then(() => {
        toast.success("Member was removed!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
        getProjectMembers();
      });
  };

  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          getProjectMembers();
        }}
      >
        Members
      </Button>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Project Members</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            {members.length ? (
              members.map((member) => (
                <Text key={member.user_id}>
                  {member.name} {""}
                  <Button
                    colorScheme="cyan"
                    color="white"
                    size="sm"
                    type="submit"
                    onClick={() => {
                      deleteMember(member.user_id);
                    }}
                  >
                    Remove
                  </Button>
                  <br /> <br />
                </Text>
              ))
            ) : (
              <Text>
                There are no other users of the project other than you
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="red">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectMembers;
