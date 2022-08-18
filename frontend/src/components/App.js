import NotFound from "./NotFound";
import Logout from "./Logout";
import Projects from "./Projects";
import HomePage from "./Home";
import Navbar from "./Navbar";
import "../css/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <ChakraProvider>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme="colored"
            pauseOnHover={false}
            draggable
          />
        </div>
      </ChakraProvider>
    </Router>
  );
};

export default App;
