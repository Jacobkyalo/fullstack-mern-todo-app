import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const getUserProfile = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { token } = user;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      "http://localhost:5000/api/users/profile",
      config
    );
    setUserData(res.data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // const { token } = user;

    if (user || user !== null) {
      getUserProfile();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div>
        <section>
          <h4>Email: {userData.email || "null"}</h4>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </section>
      </div>
    </>
  );
}
