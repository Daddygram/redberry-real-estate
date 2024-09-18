import { Link } from 'react-router-dom'
import logo from '../assets/LOGO.png'

const Navbar = () => {
  return (
    <div className="max-w-screen-2xl mx-auto py-[38px]">
      <Link to='/'>
        <img src={logo} alt="redberry logo" />
      </Link>
    </div>
  )
}

export default Navbar