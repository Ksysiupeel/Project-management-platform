import axiosInstance from "../axiosApi";
import useUserList from "../useUserList";
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
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const ProjectAdd = ({ state }) => {
  const [name, setName] = useState("");
  const [start_date, setStart_Date] = useState("");
  const [end_date, setEnd_Date] = useState("");
  const [description, setDescription] = useState("");
  const [user_id, setUser_id] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useUserList();

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
      <Button colorScheme="whatsapp" onClick={onOpen} size="md">
        Create a new project
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Create</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl>
                <Text>Project name</Text>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />

                <br />
                <Text>Start date</Text>
                <Input
                  type="date"
                  value={start_date}
                  onChange={(e) => {
                    setStart_Date(e.target.value);
                  }}
                />

                <br />
                <Text>End date</Text>
                <Input
                  type="date"
                  value={end_date}
                  onChange={(e) => {
                    setEnd_Date(e.target.value);
                  }}
                />

                <br />
                <Text>Description</Text>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />

                <br />
                {data.length && (
                  <>
                    <Text>Add user to the project</Text>
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
