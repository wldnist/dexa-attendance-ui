import { useState, useEffect } from "react";

import { Link } from "components";
import { alertService, profileService } from "services";
import { apiUrlProfileSvc } from "config";

export default Index;

function Index({ data }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    setProfiles(data);
  }, []);

  const list = async () => {
    const res = await fetch(`${apiUrlProfileSvc}`);
    const data = await res.json();

    setProfiles(data);
  };

  async function deleteProfile(id) {
    await profileService
      .delete(id, {})
      .then(() => {
        alertService.success("Employee profile deleted", {
          keepAfterRouteChange: true,
        });
      })
      .catch(alertService.error);
    list();
  }

  return (
    <div>
      <h1>Employees</h1>
      <Link href="/profiles/add" className="btn btn-sm btn-success mb-2">
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
          {profiles &&
            profiles.profiles.map((profile) => (
              <tr key={profile.id}>
                <td>{profile.name}</td>
                <td>{profile.email}</td>
                <td>{profile.phone}</td>
                <td>{profile.role}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    href={`/profiles/edit/${profile.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProfile(profile.id)}
                    className="btn btn-sm btn-danger btn-delete"
                    disabled={profile.isDeleting}
                  >
                    {profile.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          {!profiles && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="spinner-border spinner-border-lg align-center"></div>
              </td>
            </tr>
          )}
          {profiles && !profiles.profiles.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">No Profiles To Display</div>
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
  const res = await fetch(`${apiUrlProfileSvc}`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
