import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users", {
        email,
        password,
      });
      console.log(res.data);
    } catch (error) {
      toast.error(error.message);
    }
    setEmail("");
    setPassword("");
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
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}
