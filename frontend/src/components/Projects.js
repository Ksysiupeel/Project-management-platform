import axiosInstance from "./axiosApi";
import UserEdit from "./modals/UserEdit";
import ProjectEdit from "./modals/ProjectEdit";
import CommentAdd from "./modals/CommentAdd";
import ProjectAdd from "./modals/ProjectAdd";
import ProjectDetails from "./modals/ProjectDetails";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const Projects = () => {
  const [data, setData] = useState(null);
  const [isloading, setIsloading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("/user/projects/").then((res) => {
      setData(res.data);
      setIsloading(false);
    });
  }, []);

  const handleDelete = (id) => {
    axiosInstance.delete(`/user/projects/${id}/`).then(() => {
      axiosInstance.get("/user/projects/").then((res) => {
        setData(res.data);
      });
      navigate("/projects");
    });
  };

  return (
    <div className="projects">
      {isloading && <div>Loading....</div>}
      <UserEdit /> <br /> <br />
      <ProjectAdd state={setData} /> <br /> <br />
      <Button
        colorScheme="whatsapp"
        size="md"
        onClick={() => {
          navigate("/logout");
        }}
      >
        Logout
      </Button>
      {data && (
        <div className="projects-list">
          {data.map((project) => (
            <div className="projects-preview" key={project.id}>
              <h2>{project.project_name}</h2>
              <p>Project start date: {project.start_date}</p>
              <p>Project end date: {project.end_date}</p>
              <p>Project status: {project.status}</p>
              <p>Project description: {project.description}</p>
              <ProjectEdit p={project} state={setData} />
              <CommentAdd project_id={project.id} />
              <ProjectDetails id={project.id} />
              <button
                onClick={() => {
                  handleDelete(project.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
