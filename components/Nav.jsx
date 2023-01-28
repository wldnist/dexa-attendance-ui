import { NavLink } from '.';

export { Nav };

function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Attendance</NavLink>
                <NavLink href="/profiles" className="nav-item nav-link">Employees</NavLink>
            </div>
        </nav>
    );
}