

const loginForm = ({
  handleLogin,
  password,
  setPassword,
  username,
  setUsername
}) => (
  <form id="loginForm" onSubmit={handleLogin}>
    <div>
          username:
      <input
        id="usernameField"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
          password:
      <input
        id="passwordField"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default (loginForm)