import Login from "./modals/Login";
import Register from "./modals/Register";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Project management system</h1>
      <Login />
      <Register />
    </div>
  );
};

export default HomePage;
