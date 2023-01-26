import { useState, useEffect } from "react";

import { Link } from "components";

export default Index;

function Index({ data }) {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    setUsers(data);
  }, []);

  const getAll = async () => {
    const res = await fetch("http://localhost:3002/profiles");
    const data = await res.json();

    setUsers(data);
  };

  const deleteUser = async (id) => {
    await fetch("http://localhost:3002/profiles/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getAll();
  };

  return (
    <div>
      <h1>Employees</h1>
      <Link href="/users/add" className="btn btn-sm btn-success mb-2">
        Add Employee
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Name</th>
            <th style={{ width: "20%" }}>Email</th>
            <th style={{ width: "20%" }}>Phone</th>
            <th style={{ width: "20%" }}>Role</th>
            <th style={{ width: "10%" }}></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.profiles.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    href={`/users/edit/${user.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="btn btn-sm btn-danger btn-delete-user"
                    disabled={user.isDeleting}
                  >
                    {user.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          {!users && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="spinner-border spinner-border-lg align-center"></div>
              </td>
            </tr>
          )}
          {users && !users.profiles.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">No Users To Display</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3002/profiles`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
