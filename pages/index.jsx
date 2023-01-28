import { Link } from 'components';
import { useEffect, useState } from 'react';
import { userService, attendanceService } from 'services';

export default Home;

function Home() {
    // const [users, setUsers] = useState(null);
    const [attendances, setAttendances] = useState(null);

    useEffect(() => {
        // userService.getAll().then(x => setUsers(x));
        attendanceService.list({}).then(x => setAttendances(x));
    }, []);

    // function deleteUser(id) {
    //     setUsers(users.map(x => {
    //         if (x.id === id) { x.isDeleting = true; }
    //         return x;
    //     }));
    //     userService.delete(id).then(() => {
    //         setUsers(users => users.filter(x => x.id !== id));
    //     });
    // }

    return (
        <div>
            <h1>Attendances</h1>
            {/* <Link href="/users/add" className="btn btn-sm btn-success mb-2">Add User</Link> */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>Name</th>
                        <th style={{ width: '20%' }}>Email</th>
                        <th style={{ width: '10%' }}>Role</th>
                        <th style={{ width: '20%' }}>Date</th>
                        <th style={{ width: '15%' }}>In</th>
                        <th style={{ width: '15%' }}>Out</th>
                    </tr>
                </thead>
                <tbody>
                    {attendances && attendances.attendances.map(attendance =>
                        <tr key={attendance.id}>
                            <td>{attendance.profile?.name ?? ""}</td>
                            <td>{attendance.profile?.email ?? ""}</td>
                            <td>{attendance.profile?.role ?? ""}</td>
                            <td>{attendance.attendance_date}</td>
                            <td>{attendance.attendance_in}</td>
                            <td>{attendance.attendance_out}</td>
                            {/* <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/users/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger btn-delete" disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td> */}
                        </tr>
                    )}
                    {!attendances &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {attendances && !attendances.attendances.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Attendances To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
