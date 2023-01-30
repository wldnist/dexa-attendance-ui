import { NavLink } from '.';

export { NavUser };

function NavUser() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink href="/user" exact className="nav-item nav-link">Attendance</NavLink>
                <NavLink href="/user/profile" className="nav-item nav-link">Profile</NavLink>
            </div>
        </nav>
    );
}