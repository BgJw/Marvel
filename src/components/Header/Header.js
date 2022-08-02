import { Link, NavLink } from 'react-router-dom';
import './Header.scss';


const Header = () => {


    return (
        <header className='header'>
            <Link to="/">
                <h1><span className='red'>Marvel</span> information portal</h1>
            </Link>
            <ul className='header__menu'>
                <li>
                    <NavLink end to='/' className={({ isActive }) =>
                        isActive ? 'active' : 'notActive'
                    }>
                        Characters
                    </NavLink> /
                </li>
                <li>
                    <NavLink to='/comics' className={({ isActive }) =>
                        isActive ? 'active' : 'notActive'
                    }>
                        Comics
                    </NavLink>
                </li>
            </ul>
        </header>
    );
};

export default Header;