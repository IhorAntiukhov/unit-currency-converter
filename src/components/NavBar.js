import { BiDollar, BiSolidRuler, BiHistory } from 'react-icons/bi';
import NavBarLink from './NavBarLink';

function NavBar() {
  return (
    <nav className="columns-3 space-x-2 pt-2 bg-gradient-to-br from-primary to-secondary-darker shadow-lg">
      <NavBarLink to="/" icon={<BiDollar className="w-7 h-7" />} text="Currency" />
      <NavBarLink to="/units" icon={<BiSolidRuler className="w-7 h-7" />} text="Units" />
      <NavBarLink to="/history" icon={<BiHistory className="w-7 h-7" />} text="History" />
    </nav>
  );
}

export default NavBar;
