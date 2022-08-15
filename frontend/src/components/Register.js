import { TextField, Button } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";

const Register = () => {
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birth_date, setBirth_Date] = useState("");

  const handleSubmit = () => {
    console.log(gender);
  };

  return (
    <div className="register-form">
      <form>
        <TextField
          required
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="first_name"
          variant="outlined"
          value={first_name}
          onChange={(e) => setFirst_Name(e.target.value)}
        />

        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="last_name"
          variant="outlined"
          value={last_name}
          onChange={(e) => setLast_Name(e.target.value)}
          required
        />

        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="password"
          label="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br />
        <InputLabel id="gender">Gender</InputLabel>
        <Select
          label="gender"
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <MenuItem value="Man">Man</MenuItem>
          <MenuItem value="Woman">Woman</MenuItem>
        </Select>

        <br />
        <br />
        <InputLabel id="birth_date">Birth_date</InputLabel>
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="date"
          variant="outlined"
          value={birth_date}
          onChange={(e) => setBirth_Date(e.target.value)}
          required
        />

        <br />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          save
        </Button>
      </form>
    </div>
  );
};

export default Register;
