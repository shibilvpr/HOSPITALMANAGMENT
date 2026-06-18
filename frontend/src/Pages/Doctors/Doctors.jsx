import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiPhone,
  FiUser,
  FiAward,
} from "react-icons/fi";

import "./Doctors.css";
import Sidebar from "../../compenents/Sidebar/Sidebar";

const API = "http://localhost:5000/api/doctor";

const Doctors = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.role !== "admin") {
    return <Navigate to="/appointments" replace />;
  }

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    specialty: "",
    experience: "",
    phone: "",
    email: "",
    password: "",
  });

  // GET DOCTORS

  const getDoctors = async () => {
    try {
      const res = await axios.get(`${API}/all`);

      setDoctors(res.data.doctors);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  // HANDLE CHANGE

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

        alert("Doctor Updated Successfully");
      } else {
        await axios.post(
          `${API}/create`,
          form
        );

        alert("Doctor Added Successfully");
      }

      setForm({
        name: "",
        specialty: "",
        experience: "",
        phone: "",
        email: "",
        password: "",
      });

      setEditId(null);

      getDoctors();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // DELETE

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this doctor?"
      );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API}/delete/${id}`
      );

      getDoctors();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT

  const handleEdit = (doctor) => {
    setForm({
      name: doctor.name,
      specialty: doctor.specialty,
      experience: doctor.experience,
      phone: doctor.phone,
      email: doctor.email || "",
      password: "",
    });

    setEditId(doctor._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SEARCH

  const filteredDoctors =
    doctors.filter((doctor) =>
      doctor.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="doctor-page">
      <Sidebar />

      {/*  TOPBAR  */}

      <motion.div
        className="topbar"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <p className="small-text">
            Welcome Back
          </p>

          <h1>Doctor Management</h1>
        </div>

        <div className="topbar-right">
          <div className="search-box">
            <FiSearch />

            <input
              type="text"
              placeholder="Search doctors..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div >
            {new Date().toDateString()}
          </div>
        </div>
      </motion.div>

      {/*  HERO  */}

     

      {/*  FORM CARD  */}

      <motion.div
        className="doctor-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 0.5 }}
      >
        {/* LEFT SIDE */}

        <div className="doctor-image-side">
          <div className="image-overlay">
            <span className="overlay-tag">
              Smart Healthcare
            </span>

            <h2>
              {editId
                ? "Update Doctor Profile"
                : "Add New Doctor"}
            </h2>

            <p>
              Create and maintain doctor
              profiles with a luxury modern
              dashboard inspired by elegant
              minimal design systems.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="doctor-form-side">
          <div className="card-header">
            <h3>
              Doctor Information
            </h3>

            <p>
              Fill all details carefully
            </p>
          </div>

          <form
            className="doctor-form"
            onSubmit={handleSubmit}
          >
            <div className="form-grid">
              <div className="form-group">
                <label>
                  Doctor Name
                </label>

                <div className="input-box">
                  <FiUser />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter doctor name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Specialty
                </label>

                <div className="input-box">
                  <FiAward />

                  <input
                    type="text"
                    name="specialty"
                    placeholder="Enter specialty"
                    value={form.specialty}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Experience
                </label>

                <div className="input-box">
                  <input
                    type="number"
                    name="experience"
                    placeholder="Years of experience"
                    value={form.experience}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Phone
                </label>

                <div className="input-box">
                  <FiPhone />

                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Email
                </label>

                <div className="input-box">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {!editId && (
                <div className="form-group">
                  <label>
                    Password
                  </label>

                  <div className="input-box">
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            <button type="submit">
              {editId
                ? "Update Doctor"
                : "+ Add Doctor"}
            </button>
          </form>
        </div>
      </motion.div>

      {/*  TABLE  */}

      <motion.div
        className="table-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="table-header">
          <div>
            <h3>
              Doctor Directory
            </h3>

            <p>
              Manage all hospital doctors
            </p>
          </div>
        </div>

        {/* DESKTOP TABLE */}

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>Experience</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDoctors.map(
                (doctor, index) => (
                  <tr key={doctor._id}>
                    <td>{index + 1}</td>

                    <td className="doctor-name">
                      <div className="table-avatar">
                        {doctor.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      {doctor.name}
                    </td>

                    <td>
                      <span className="specialty-badge">
                        {
                          doctor.specialty
                        }
                      </span>
                    </td>

                    <td>
                      {doctor.experience} yrs
                    </td>

                    <td>
                      {doctor.phone}
                    </td>

                    <td>
                      {doctor.email}
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(
                              doctor
                            )
                          }
                        >
                          <FiEdit2 />
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              doctor._id
                            )
                          }
                        >
                          <FiTrash2 />
                          Delete
                        </button>
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
          {filteredDoctors.map(
            (doctor) => (
              <div
                className="mobile-card"
                key={doctor._id}
              >
                <div className="mobile-top">
                  <div className="doctor-avatar">
                    {doctor.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="mobile-user-info">
                    <h4>
                      {doctor.name}
                    </h4>

                    <span className="specialty-badge">
                      {
                        doctor.specialty
                      }
                    </span>
                  </div>
                </div>

                <div className="mobile-info">
                  <p>
                    <strong>
                      Experience:
                    </strong>{" "}
                    {
                      doctor.experience
                    }{" "}
                    yrs
                  </p>

                  <p>
                    <strong>
                      Phone:
                    </strong>{" "}
                    {doctor.phone}
                  </p>
                </div>

                <div className="mobile-actions">
                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(doctor)
                    }
                  >
                    <FiEdit2 />
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        doctor._id
                      )
                    }
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Doctors;