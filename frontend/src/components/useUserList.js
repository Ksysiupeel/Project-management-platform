import axiosInstance from "./axiosApi";
import { useState, useEffect } from "react";

const useUserList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get("/users/").then((r) => {
      setData(r.data);
    });
  }, []);

  return { data };
};

export default useUserList;
