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
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";

const ProjectMembers = ({ projectId }) => {
  const [members, setMembers] = useState([]);
  const [usersId, setUsersId] = useState([]);
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getProjectMembers = () => {
    axiosInstance.get(`/projectmembers/${projectId}/`).then((res) => {
      setMembers(res.data);
    });
  };

  const UserList = () => {
    axiosInstance.get("/users/").then((r) => {
      setData(r.data);
    });
  };

  const addMembers = () => {
    axiosInstance
      .post(`/projectmembers/${projectId}/`, {
        users_id: usersId.map((id) => id.value),
      })
      .then(() => {
        toast.success("User was added!", {
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
          UserList();
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
            <br /> <br />
            {data.length ? (
              <>
                <form>
                  <FormControl>
                    <FormLabel textAlign="center">
                      Add users to the project
                    </FormLabel>
                    <Select
                      closeMenuOnSelect={false}
                      onChange={setUsersId}
                      isMulti
                      isSearchable={true}
                      placeholder="Select users..."
                      options={data.map((user) => ({
                        value: user.id,
                        label: (
                          <>
                            {user.first_name} {user.last_name}
                          </>
                        ),
                      }))}
                    />

                    <br />
                    <Button
                      onClick={() => {
                        addMembers();
                      }}
                      colorScheme="linkedin"
                    >
                      Add
                    </Button>
                  </FormControl>
                </form>
              </>
            ) : null}
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
