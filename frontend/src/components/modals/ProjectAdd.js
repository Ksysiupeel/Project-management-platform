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
  useDisclosure,
  FormLabel,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import Select from "react-select";

const ProjectAdd = ({ state }) => {
  const [name, setName] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [description, setDescription] = useState();
  const [usersId, setUsersId] = useState([]);
  const [data, setData] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    axiosInstance
      .post("/user/projects/", {
        project_name: name,
        start_date: startDate,
        end_date: endDate,
        description: description,
        users_id: usersId.map((id) => id.value),
      })
      .then(() => {
        axiosInstance.get("/user/projects/").then((res) => {
          state(res.data);
        });

        toast.success("Project was created!", {
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

  const UserList = () => {
    axiosInstance.get("/users/").then((r) => {
      setData(r.data);
    });
  };

  return (
    <>
      <Button
        colorScheme="whatsapp"
        onClick={() => {
          onOpen();
          UserList();
        }}
        size="md"
      >
        Create a new project
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Create</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl isRequired>
                <FormLabel>Project name</FormLabel>
                <Input
                  type="text"
                  value={name || ""}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Start date</FormLabel>
                <Input
                  type="date"
                  value={startDate || ""}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>End date</FormLabel>
                <Input
                  type="date"
                  value={endDate || ""}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </FormControl>

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

              <FormControl>
                {data.length && (
                  <>
                    <FormLabel>Add users to the project</FormLabel>
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
                  </>
                )}
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} type="submit" colorScheme="red">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectAdd;
