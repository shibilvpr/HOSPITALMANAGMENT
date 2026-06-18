import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import "./Appointments.css";
import Sidebar from "../../compenents/Sidebar/Sidebar";
import { FiSearch } from "react-icons/fi";

const API =
  "http://localhost:5000/api/appointment";

const DOCTOR_API =
  "http://localhost:5000/api/doctor";

const Appointments = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const [appointments, setAppointments] =
    useState([]);

  const [doctors, setDoctors] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [editId, setEditId] =
    useState(null);

  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    specialty: "",
    date: "",
    status: "Confirmed",
  });

  // GET APPOINTMENTS

  const getAppointments = async () => {
    try {
      const res = await axios.get(
        `${API}/all`
      );

      setAppointments(
        res.data.appointments
      );
    } catch (error) {
      console.log(error);
    }
  };

  // GET DOCTORS

  const getDoctors = async () => {
    try {
      const res = await axios.get(
        `${DOCTOR_API}/all`
      );

      setDoctors(
        res.data.doctors
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
    getDoctors();
  }, []);

  // HANDLE CHANGE

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    if (name === "doctor") {
      const selectedDoctor =
        doctors.find(
          (doc) =>
            doc.name === value
        );

      setForm({
        ...form,
        doctor: value,

        specialty:
          selectedDoctor?.specialty ||
          "",
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  // SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `${API}/update/${editId}`,
          form
        );

        alert(
          "Appointment Updated"
        );
      } else {
        await axios.post(
          `${API}/create`,
          form
        );

        alert(
          "Appointment Added"
        );
      }

      setForm({
        patient: "",
        doctor: "",
        specialty: "",
        date: "",
        status: "Confirmed",
      });

      setEditId(null);

      getAppointments();
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Something went wrong"
      );
    }
  };

  // DELETE

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this appointment?"
      );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API}/delete/${id}`
      );

      getAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`${API}/update/${id}`, { status });
      alert(`Appointment status updated to ${status}`);
      getAppointments();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  // EDIT

  const handleEdit = (
    appointment
  ) => {
    setForm({
      patient:
        appointment.patient,

      doctor:
        appointment.doctor,

      specialty:
        appointment.specialty,

      date:
        appointment.date?.split(
          "T"
        )[0],

      status:
        appointment.status,
    });

    setEditId(
      appointment._id
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SEARCH

  const filteredAppointments =
    appointments.filter(
      (appointment) =>
        appointment.patient
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="appointment-page">
      <Sidebar />

      {/* TOPBAR */}

      <motion.div
        className="topbar"
        initial={{
          y: -40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <div>
          <p className="top-small">
            CareWell Dashboard
          </p>

          <h1>
            Appointment Management
          </h1>
        </div>

        <div className="topbar-right">
          <div className="search-box">
            <FiSearch />

            <input
              type="text"
              placeholder="Search appointments..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />
          </div>

          <div>
            {new Date().toDateString()}
          </div>
        </div>
      </motion.div>

      {/* HEADER */}

      <motion.div
        className="appointment-header"
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <div>
          <span className="header-badge">
            Luxury Healthcare
          </span>

          <h2>
            Appointments
          </h2>

          <p>
            {
              appointments.length
            }{" "}
            total appointments
          </p>
        </div>
      </motion.div>

      {/* FORM */}

      {role !== "doctor" && (
        <motion.div
          className="appointment-card"
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
        <div className="card-header">
          <h3>
            {editId
              ? "Edit Appointment"
              : "Book Appointment"}
          </h3>
        </div>

        <form
          className="appointment-form"
          onSubmit={handleSubmit}
        >
          <div className="form-grid">
            {/* PATIENT */}

            <div className="form-group">
              <label>
                Patient Name
              </label>

              <input
                type="text"
                name="patient"
                placeholder="Enter patient name"
                value={form.patient}
                onChange={handleChange}
                required
              />
            </div>

            {/* DOCTOR */}

            <div className="form-group">
              <label>
                Doctor Name
              </label>

              <select
                name="doctor"
                value={form.doctor}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Doctor
                </option>

                {doctors.map(
                  (doctor) => (
                    <option
                      key={doctor._id}
                      value={doctor.name}
                    >
                      {doctor.name}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* SPECIALTY */}

            <div className="form-group">
              <label>
                Specialty
              </label>

              <input
                type="text"
                name="specialty"
                value={form.specialty}
                placeholder="Doctor specialty"
                readOnly
              />
            </div>

            {/* DATE */}

            <div className="form-group">
              <label>
                Appointment Date
              </label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            {/* STATUS */}

            <div className="form-group full-width">
              <label>
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Confirmed">
                  Confirmed
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>
              </select>
            </div>
          </div>

          <button type="submit">
            {editId
              ? "Update Appointment"
              : "+ Book Appointment"}
          </button>
        </form>
      </motion.div>
      )}

      {/* TABLE */}

      <motion.div
        className="table-card"
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <div className="table-header">
          <h3>
            All Appointments
          </h3>
        </div>

        {/* DESKTOP TABLE */}

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Specialty</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.map(
                (
                  appointment,
                  index
                ) => (
                  <tr
                    key={
                      appointment._id
                    }
                  >
                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {
                        appointment.patient
                      }
                    </td>

                    <td>
                      {
                        appointment.doctor
                      }
                    </td>

                    <td>
                      {
                        appointment.specialty
                      }
                    </td>

                    <td>
                      {new Date(
                        appointment.date
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      <span
                        className={`status ${appointment.status.toLowerCase()}`}
                      >
                        {
                          appointment.status
                        }
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        {role === "doctor" ? (
                          <>
                            <button
                              type="button"
                              className="edit-btn"
                              style={{ background: "#e8efdc", color: "#55603f" }}
                              disabled={appointment.status === "Confirmed"}
                              onClick={() =>
                                handleStatusUpdate(
                                  appointment._id,
                                  "Confirmed"
                                )
                              }
                            >
                              ✅ Accept
                            </button>
                            <button
                              type="button"
                              className="delete-btn"
                              style={{ background: "#f8e2df", color: "#c45c4e" }}
                              disabled={appointment.status === "Cancelled"}
                              onClick={() =>
                                handleStatusUpdate(
                                  appointment._id,
                                  "Cancelled"
                                )
                              }
                            >
                              ❌ Reject
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="edit-btn"
                              onClick={() =>
                                handleEdit(
                                  appointment
                                )
                              }
                            >
                              ✏ Edit
                            </button>

                            <button
                              type="button"
                              className="delete-btn"
                              onClick={() =>
                                handleDelete(
                                  appointment._id
                                )
                              }
                            >
                              🗑 Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE */}

        <div className="mobile-cards">
          {filteredAppointments.map(
            (
              appointment
            ) => (
              <div
                className="mobile-card"
                key={
                  appointment._id
                }
              >
                <h4>
                  {
                    appointment.patient
                  }
                </h4>

                <p>
                  <strong>
                    Doctor :
                  </strong>{" "}
                  {
                    appointment.doctor
                  }
                </p>

                <p>
                  <strong>
                    Specialty :
                  </strong>{" "}
                  {
                    appointment.specialty
                  }
                </p>

                <p>
                  <strong>
                    Date :
                  </strong>{" "}
                  {new Date(
                    appointment.date
                  ).toLocaleDateString()}
                </p>

                <p>
                  <strong>
                    Status :
                  </strong>

                  <span
                    className={`status ${appointment.status.toLowerCase()}`}
                  >
                    {
                      appointment.status
                    }
                  </span>
                </p>

                 <div className="mobile-actions">
                   {role === "doctor" ? (
                     <>
                       <button
                         type="button"
                         className="edit-btn"
                         style={{ background: "#e8efdc", color: "#55603f", width: "100%" }}
                         disabled={appointment.status === "Confirmed"}
                         onClick={() =>
                           handleStatusUpdate(
                             appointment._id,
                             "Confirmed"
                           )
                         }
                       >
                         ✅ Accept
                       </button>
                       <button
                         type="button"
                         className="delete-btn"
                         style={{ background: "#f8e2df", color: "#c45c4e", width: "100%" }}
                         disabled={appointment.status === "Cancelled"}
                         onClick={() =>
                           handleStatusUpdate(
                             appointment._id,
                             "Cancelled"
                           )
                         }
                       >
                         ❌ Reject
                       </button>
                     </>
                   ) : (
                     <>
                       <button
                         type="button"
                         className="edit-btn"
                         onClick={() =>
                           handleEdit(
                             appointment
                           )
                         }
                       >
                          Edit
                       </button>

                       <button
                         type="button"
                         className="delete-btn"
                         onClick={() =>
                           handleDelete(
                             appointment._id
                           )
                         }
                       >
                          Delete
                       </button>
                     </>
                   )}
                 </div>
              </div>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Appointments;