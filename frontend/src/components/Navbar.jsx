export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h3>AuthApp</h3>
      <nav>
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: "30px",
            listStyle: "none",
          }}
        >
          <li>
            <a href="/">Home</a>
          </li>
          {user ? (
            <li>
              <a href="/profile">Profile</a>
            </li>
          ) : (
            <>
              <li>
                <a href="/register">Register</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
