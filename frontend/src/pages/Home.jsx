import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  // const navigate = useNavigate();

  const getTodos = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { token } = user;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get("http://localhost:5000/api/goals", config);
    setTodos(res.data);
  };

  const addTodo = async (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { token } = user;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/goals",
        {
          text,
        },
        config
      );
      console.log(res.data);
    } catch (error) {
      toast.error(error.message);
    }
    setText("");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // const { token } = user;

    if (user || user !== null) {
      getTodos();
    } else {
      toast.error(
        "error occurrd when fetching todos, ensure you are logged in"
      );
    }
  }, [todos]);
  return (
    <>
      <section>
        <h1>Fullstack MERN Todo App</h1>

        <form onSubmit={addTodo}>
          <label htmlFor="email">Todo</label>
          <br />
          <input
            type="text"
            value={text}
            id="text"
            name="text"
            placeholder="Enter todo text"
            onChange={(e) => setText(e.target.value)}
          />{" "}
          <br /> <br />
          <button type="submit">Add</button>
        </form>

        <article>
          {todos.length < 1 ? (
            <p>No todos, add above</p>
          ) : (
            <>
              {todos?.map((todo) => (
                <p key={todo._id}>{todo.text}</p>
              ))}
            </>
          )}
        </article>
      </section>
    </>
  );
}
