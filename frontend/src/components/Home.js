import Login from "./modals/Login";
import Register from "./modals/Register";

const HomePage = () => {
  return (
    <div className="home-page">
      <Login /> <br /> <br />
      <Register />
    </div>
  );
};

export default HomePage;
