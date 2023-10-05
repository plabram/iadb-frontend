import { useState } from "react"
import { authenticationRequest } from "../../api/calls";

const Login = () => {

  const [login, setLogin] = useState("")

  const authenticate = async (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value
    const password = e.target.elements[1].value
    console.log("checkpoint0", email, password)
    const response = await authenticationRequest(email, password)

    if (response === 200) {
      setLogin("Successfully logged in.")
    } else if (response === 401) {
      setLogin("That email and password combination is incorrect")
    } else {
      setLogin("We couldn't log this user in")
    }
  }

  return (
    <div>
      <form onSubmit={authenticate}>
        <div>
          <input id="email" type="text" placeholder="email" required />
          <input id="password" type="text" placeholder="password" required />
        </div>
        <button type="submit">Log in</button>
      </form>
      <p>{login}</p>
    </div>
  )
}

export default Login