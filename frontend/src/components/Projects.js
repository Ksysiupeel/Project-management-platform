import axiosInstance from "./axiosApi";
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
              <p>Data rozpoczęcia projektu: {project.start_date}</p>
              <p>Data zakończenia projektu: {project.end_date}</p>
              <p>Status projektu: {project.status}</p>
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
