import axiosInstance from "./axiosApi";
import UserEdit from "./modals/UserEdit";
import ProjectEdit from "./modals/ProjectEdit";
import CommentAdd from "./modals/CommentAdd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [data, setData] = useState(null);
  const [isloading, setIsloading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      axiosInstance.get("/user/projects/").then((res) => {
        setData(res.data);
        setIsloading(false);
      });
    }, 2000);
  });

  const handleDelete = (id) => {
    axiosInstance.delete(`/user/projects/${id}/`).then(() => {
      navigate("/projects");
    });
  };

  return (
    <div className="projects">
      {isloading && <div>Loading....</div>}
      {data && (
        <div className="projects-list">
          {data.map((project) => (
            <div className="projects-preview" key={project.id}>
              <h2>{project.project_name}</h2>
              <p>Project start date: {project.start_date}</p>
              <p>Project end date: {project.end_date}</p>
              <p>Project status: {project.status}</p>
              <ProjectEdit p={project} />
              <CommentAdd user_id={project.id} project_id={project.id} />
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
