import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  const navLinkClasses = ({ isActive }) =>
    `px-4 py-2 rounded-md font-medium transition duration-200 
  ${isActive ? 'bg-white text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`;

  return (
    <nav className="w-full bg-gray-900 rounded-sm shadow-md py-4 px-8">
      <div className="flex items-center justify-between gap-6">

        <div>
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>

          <NavLink to="/pastes" className={navLinkClasses}>
            Pastes
          </NavLink>
        </div>

        
          <Link to='/'>
          <div className="text-lg font-semibold cursor-pointer">
            <span className="text-[#8245ec]">&lt;</span>
            <span className="text-white">Abdullah</span>
            <span className="text-[#8245ec]">/</span>
            <span className="text-white">Hussain</span>
            <span className="text-[#8245ec]">&gt;</span>
          </div>
          </Link>
      

      </div>

    </nav>
  );
};

export default Navbar;
