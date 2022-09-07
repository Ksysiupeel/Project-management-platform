import axiosInstance from "./axiosApi";
import UserEdit from "./modals/UserEdit";
import ProjectEdit from "./modals/ProjectEdit";
import CommentAdd from "./modals/CommentAdd";
import ProjectAdd from "./modals/ProjectAdd";
import ProjectDetails from "./modals/ProjectDetails";
import User from "./modals/User";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Projects = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!window.localStorage.getItem("access_token")) {
      navigate("/");
    } else {
      axiosInstance.get("/user/projects/").then((res) => {
        setData(res.data);
        setIsLoading(false);
      });
    }
  }, []);

  const handleDelete = (id) => {
    axiosInstance.delete(`/user/projects/${id}/`).then(() => {
      axiosInstance.get("/user/projects/").then((res) => {
        setData(res.data);
      });
      toast.success("Project was deleted!", {
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
    <div className="projects">
      {isLoading && <div>Loading....</div>}
      <User /> <br /> <br />
      <UserEdit /> <br /> <br />
      <ProjectAdd state={setData} />
      {data && (
        <div className="projects-list">
          {data.map((project) => (
            <div className="projects-preview" key={project.id}>
              <h2>{project.project_name}</h2>
              <p>Project start date: {project.start_date}</p>
              <p>Project end date: {project.end_date}</p>
              <p>Project status: {project.status}</p>
              <p>Project description: {project.description}</p>
              <ProjectEdit project={project} state={setData} />
              <CommentAdd project_id={project.id} />
              <ProjectDetails project_id={project.id} />
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
