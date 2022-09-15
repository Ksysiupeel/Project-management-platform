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
  Radio,
  RadioGroup,
  Stack,
  FormLabel,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import Select from "react-select";

const ProjectEdit = ({ project, state }) => {
  const [name, setName] = useState(project.project_name);
  const [startDate, setStartDate] = useState(project.start_date);
  const [endDate, setEndDate] = useState(project.end_date);
  const [status, setStatus] = useState(project.status);
  const [description, setDescription] = useState(project.description);

  const [usersId, setUsersId] = useState([]);
  const [data, setData] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    axiosInstance
      .put(`/user/projects/${project.id}/`, {
        project_name: name,
        start_date: startDate,
        end_date: endDate,
        status: status,
        description: description,
        users_id: usersId.map((id) => id.value),
      })
      .then(() => {
        axiosInstance.get("/user/projects/").then((res) => {
          state(res.data);
        });

        toast.success("Project was updated!", {
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
        onClick={() => {
          onOpen();
          UserList();
        }}
      >
        Change
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Data change</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl>
                <FormLabel>Project name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Start date</FormLabel>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>End date</FormLabel>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Status</FormLabel>
                <RadioGroup onChange={setStatus} value={status}>
                  <Stack>
                    <Radio value="In Progress">In Progress</Radio>
                    <Radio value="Closed">Closed</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </FormControl>

              {data.length ? (
                <>
                  <FormControl>
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
                  </FormControl>
                </>
              ) : null}
            </form>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} type="submit" colorScheme="red">
              Change
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectEdit;
