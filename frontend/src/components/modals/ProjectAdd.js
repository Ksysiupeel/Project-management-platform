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
  Radio,
  RadioGroup,
  Stack,
  FormLabel,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const ProjectAdd = ({ state }) => {
  const [name, setName] = useState();
  const [start_date, setStart_Date] = useState();
  const [end_date, setEnd_Date] = useState();
  const [description, setDescription] = useState();
  const [user_id, setUser_id] = useState(null);
  const [data, setData] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    axiosInstance
      .post("/user/projects/", {
        project_name: name,
        start_date: start_date,
        end_date: end_date,
        description: description,
        user_id: user_id,
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
                  value={start_date || ""}
                  onChange={(e) => {
                    setStart_Date(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>End date</FormLabel>
                <Input
                  type="date"
                  value={end_date || ""}
                  onChange={(e) => {
                    setEnd_Date(e.target.value);
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
                    <FormLabel>Add user to the project</FormLabel>
                    <RadioGroup onChange={setUser_id} value={user_id}>
                      <Stack>
                        {data.map((user) => (
                          <Radio key={user.id} value={user.id}>
                            {user.first_name} {user.last_name}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
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
