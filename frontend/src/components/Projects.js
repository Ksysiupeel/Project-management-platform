import { useState } from "react";
import axiosInstance from "./axiosApi";

const Projects = () => {
  const [name, setName] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [status, setStatus] = useState("");
  const [opeartions, setOperations] = useState("");

  axiosInstance.get("/user/projects/").then((res) => {
    console.log(res.data);
  });
};

export default Projects;
