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

const ProjectEdit = ({ p, state }) => {
  const [name, setName] = useState(p.project_name);
  const [start_date, setStart_Date] = useState(p.start_date);
  const [end_date, setEnd_Date] = useState(p.end_date);
  const [status, setStatus] = useState(p.status);
  const [description, setDescription] = useState(p.description);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    axiosInstance
      .put(`/user/projects/${p.id}/`, {
        project_name: name,
        start_date: start_date,
        end_date: end_date,
        status: status,
        description: description,
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

  return (
    <>
      <Button onClick={onOpen} size="m">
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
                  value={start_date}
                  onChange={(e) => {
                    setStart_Date(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>End date</FormLabel>
                <Input
                  type="date"
                  value={end_date}
                  onChange={(e) => {
                    setEnd_Date(e.target.value);
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
