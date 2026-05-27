import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";

import "./AddPatient.css";

import Sidebar from "../../compenents/Sidebar/Sidebar";
import { FiSearch } from "react-icons/fi";

const API =
  "http://localhost:5000/api/patient";

const AddPatient = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.role === "doctor") {
    return <Navigate to="/appointments" replace />;
  }

  const [patients, setPatients] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [editId, setEditId] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    disease: "",
    phone: "",
    address: "",
  });

  // GET PATIENTS

  const getPatients = async () => {

    try {

      const res = await axios.get(
        `${API}/all`
      );

      setPatients(
        res.data.patients
      );

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatients();
  }, []);

  // HANDLE CHANGE

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
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

        alert(
          "Patient Updated Successfully"
        );

      } else {

        await axios.post(
          `${API}/create`,
          form
        );

        alert(
          "Patient Added Successfully"
        );
      }

      setForm({
        name: "",
        age: "",
        gender: "",
        disease: "",
        phone: "",
        address: "",
      });

      setEditId(null);

      getPatients();

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
        "Delete this patient?"
      );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `${API}/delete/${id}`
      );

      getPatients();

    } catch (error) {
      console.log(error);
    }
  };

  // EDIT

  const handleEdit = (patient) => {

    setForm({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      disease: patient.disease,
      phone: patient.phone,
      address: patient.address,
    });

    setEditId(patient._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SEARCH

  const filteredPatients =
    patients.filter((patient) =>
      patient.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <>
      <Sidebar />

      <div className="patient-page">

        {/* TOPBAR */}

        <motion.div
          className="topbar"
          initial={{
            opacity: 0,
            y: -30,
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

            <h1>
              Patient Management
            </h1>

            <span className="topbar-subtitle">
              CareWell Hospital Dashboard
            </span>

          </div>

          <div className="topbar-right">

            <div className="search-box">

              <FiSearch />

              <input
                type="text"
                placeholder="Search patients..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

            <p>
              {new Date().toDateString()}
            </p>

          </div>

        </motion.div>

        {/* HEADER */}

        <motion.div
          className="patient-header"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >

          <div>

            <span className="section-badge">
              Hospital Patients
            </span>

            <h2>
              Patients
            </h2>

            <p>
              {patients.length} total
              patients registered
            </p>

          </div>

        </motion.div>

        {/* FORM */}

        <motion.div
          className="patient-card"
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >

          <div className="card-header">

            <h3>
              {editId
                ? "Edit Patient"
                : "Add Patient"}
            </h3>

          </div>

          <form
            className="patient-form"
            onSubmit={handleSubmit}
          >

            <div className="form-grid">

              <div className="form-group">

                <label>
                  Patient Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter patient name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Age
                </label>

                <input
                  type="number"
                  name="age"
                  placeholder="Enter age"
                  value={form.age}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Gender
                </label>

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                </select>

              </div>

              <div className="form-group">

                <label>
                  Disease
                </label>

                <input
                  type="text"
                  name="disease"
                  placeholder="Enter disease"
                  value={form.disease}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group full-width">

                <label>
                  Address
                </label>

                <textarea
                  name="address"
                  placeholder="Enter address"
                  value={form.address}
                  onChange={handleChange}
                />

              </div>

            </div>

            <button type="submit">

              {editId
                ? "Update Patient"
                : "+ Add Patient"}

            </button>

          </form>

        </motion.div>

        {/* DESKTOP TABLE */}

        <motion.div
          className="table-card desktop-table"
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >

          <div className="table-header">

            <h3>
              Patient List
            </h3>

          </div>

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Disease</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredPatients.map(
                  (patient, index) => (

                    <tr key={patient._id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        {patient.name}
                      </td>

                      <td>
                        {patient.age}
                      </td>

                      <td>
                        {patient.gender}
                      </td>

                      <td>
                        {patient.disease}
                      </td>

                      <td>
                        {patient.phone}
                      </td>

                      <td>

                        <div className="action-buttons">

                          <button
                            className="edit-btn"
                            onClick={() =>
                              handleEdit(patient)
                            }
                          >
                            ✏ Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(
                                patient._id
                              )
                            }
                          >
                            🗑 Delete
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </motion.div>

        {/* MOBILE CARDS */}

        <div className="mobile-patient-list">

          {filteredPatients.map(
            (patient) => (

              <motion.div
                className="mobile-card"
                key={patient._id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                }}
              >

                <div className="mobile-top">

                  <div className="avatar">

                    {patient.name
                      ?.charAt(0)
                      .toUpperCase()}

                  </div>

                  <div>

                    <h4>
                      {patient.name}
                    </h4>

                    <p>
                      {patient.gender}
                    </p>

                  </div>

                </div>

                <div className="mobile-details">

                  <div>
                    <span>Age</span>
                    <p>{patient.age}</p>
                  </div>

                  <div>
                    <span>Disease</span>
                    <p>{patient.disease}</p>
                  </div>

                  <div>
                    <span>Phone</span>
                    <p>{patient.phone}</p>
                  </div>

                  <div>
                    <span>Address</span>
                    <p>{patient.address}</p>
                  </div>

                </div>

                <div className="mobile-actions">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(patient)
                    }
                  >
                     Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        patient._id
                      )
                    }
                  >
                     Delete
                  </button>

                </div>

              </motion.div>
            )
          )}

        </div>

      </div>
    </>
  );
};

export default AddPatient;