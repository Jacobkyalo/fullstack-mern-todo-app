import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      toast.error(error.message);
    }
    setEmail("");
    setPassword("");

    navigate("/");
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            value={email}
            id="email"
            name="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <br />
          <label htmlFor="password">Password</label> <br />
          <input
            type="password"
            value={password}
            id="password"
            name="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <br /> <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
