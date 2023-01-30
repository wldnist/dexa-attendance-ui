import { useEffect, useState } from "react";
import { alertService, attendanceService } from "services";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default User;

function User() {
  const [attendances, setAttendances] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    attendanceService.list({}).then((x) => setAttendances(x));
  }, []);

  async function list() {
    const params = {
      start_date: startDate,
      end_date: endDate,
    };

    await attendanceService
      .list(params)
      .then((attendances) => setAttendances(attendances))
      .catch(alertService.error);
  }

  return (
    <div>
      <h1>Attendances</h1>
      <div className="form-row">
        <div className="form-group">
          <label>From</label>
          <ReactDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div className="form-group">
          <label>To</label>
          <ReactDatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <button
            onClick={() => list()}
            type="button"
            className="btn btn-primary"
          >
            Search
          </button>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Date</th>
            <th style={{ width: "30%" }}>In</th>
            <th style={{ width: "30%" }}>Out</th>
          </tr>
        </thead>
        <tbody>
          {attendances &&
            attendances.attendances.map((attendance) => (
              <tr key={attendance.id}>
                <td>{attendance.attendance_date}</td>
                <td>{attendance.attendance_in}</td>
                <td>{attendance.attendance_out}</td>
              </tr>
            ))}
          {!attendances && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="spinner-border spinner-border-lg align-center"></div>
              </td>
            </tr>
          )}
          {attendances && !attendances.attendances.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">No Attendances To Display</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
