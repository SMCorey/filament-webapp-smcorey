import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <>
      <Link to="/">Home</Link> <br />
      <Link to="/login">Login</Link> <br />
      <Link to="/logout">Logout</Link> <br />
      <Link to="/cart">Cart</Link> <br />

    </>
  )
}