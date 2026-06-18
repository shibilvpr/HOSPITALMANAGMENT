import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";

import {
  FiSearch,
  FiTrash2,
  FiEdit2,
  FiUser,
  FiMail,
  FiLock,
  FiAward,
} from "react-icons/fi";

import "./Receptionists.css";
import Sidebar from "../../compenents/Sidebar/Sidebar";

const API = "http://localhost:5000/api/receptionist";

const Receptionists = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.role !== "admin") {
    return <Navigate to="/appointments" replace />;
  }

  const [receptionists, setReceptionists] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "receptionist",
  });

  // GET RECEPTIONISTS

  const getReceptionists = async () => {
    try {
      const res = await axios.get(`${API}/all`);
      setReceptionists(res.data.receptionists);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReceptionists();
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
        await axios.put(`${API}/update/${editId}`, {
          name: form.name,
          email: form.email,
          role: form.role,
        });

        alert("User Updated Successfully");
      } else {
        await axios.post(`${API}/create`, form);

        alert("User Created Successfully");
      }

      setForm({
        name: "",
        email: "",
        password: "",
        role: "receptionist",
      });

      setEditId(null);

      getReceptionists();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // EDIT

  const handleEdit = (rep) => {
    setEditId(rep._id);

    setForm({
      name: rep.name,
      email: rep.email,
      password: "",
      role: rep.role || "receptionist",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // DELETE

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this user account?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/delete/${id}`);
      getReceptionists();
    } catch (error) {
      console.log(error);
    }
  };

  // SEARCH

  const filteredReceptionists =
    receptionists.filter((rep) =>
      rep.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="receptionist-page">
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

          <h1>
            Receptionist & User 
          </h1>
        </div>

        <div className="topbar-right">
          <div className="search-box">
            <FiSearch />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div>
            {new Date().toDateString()}
          </div>
        </div>
      </motion.div>

      {/*  FORM CARD  */}

      <motion.div
        className="receptionist-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 0.5 }}
      >
        {/* LEFT SIDE */}

        <div className="receptionist-image-side">
          <div className="image-overlay">
            <span className="overlay-tag">
              CareWell Staff
            </span>

            <h2>
              {editId
                ? "Edit User Account"
                : "Create User Account"}
            </h2>

            <p>
              Provision new hospital users and
              staff accounts with customized
              roles and credentials.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="receptionist-form-side">
          <div className="card-header">
            <h3>User Information</h3>

            <p>
              Fill all details carefully
            </p>
          </div>

          <form
            className="receptionist-form"
            onSubmit={handleSubmit}
          >
            <div className="form-grid">
              {/* NAME */}

              <div className="form-group">
                <label>User Name</label>

                <div className="input-box">
                  <FiUser />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div className="form-group">
                <label>Email Address</label>

                <div className="input-box">
                  <FiMail />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* ROLE */}

              {user &&
                user.role === "admin" && (
                  <div className="form-group">
                    <label>
                      Assign Role
                    </label>

                    <div className="input-box">
                      <FiAward />

                      <select
                        name="role"
                        value={form.role}
                        onChange={
                          handleChange
                        }
                        className="role-select"
                        required
                      >
                        <option value="receptionist">
                          Receptionist
                        </option>

                        <option value="admin">
                          Admin
                        </option>
                      </select>
                    </div>
                  </div>
                )}

              {/* PASSWORD */}

              {!editId && (
                <div className="form-group">
                  <label>Password</label>

                  <div className="input-box">
                    <FiLock />

                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={form.password}
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="button-group">
              <button type="submit">
                {editId
                  ? "Update User"
                  : "+ Add User"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setEditId(null);

                    setForm({
                      name: "",
                      email: "",
                      password: "",
                      role: "receptionist",
                    });
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
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
            <h3>User Directory</h3>

            <p>
              Manage all registered admin and
              receptionist credentials
            </p>
          </div>
        </div>

        {/*  DESKTOP TABLE  */}

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredReceptionists.map(
                (rep, index) => (
                  <tr key={rep._id}>
                    <td>{index + 1}</td>

                    <td className="receptionist-name">
                      <div className="table-avatar">
                        {rep.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      {rep.name}
                    </td>

                    <td>{rep.email}</td>

                    <td>
                      <span className="role-badge">
                        {rep.role}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(rep)
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
                              rep._id
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

        {/*  MOBILE CARDS  */}

        <div className="mobile-cards">
          {filteredReceptionists.map(
            (rep) => (
              <div
                className="mobile-user-card"
                key={rep._id}
              >
                <div className="mobile-user-top">
                  <div className="mobile-avatar">
                    {rep.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="mobile-user-info">
                    <h4>{rep.name}</h4>

                    <p>{rep.email}</p>

                    <span className="mobile-role">
                      {rep.role}
                    </span>
                  </div>
                </div>

                <div className="mobile-actions">
                  <button
                    className="mobile-edit-btn"
                    onClick={() =>
                      handleEdit(rep)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="mobile-delete-btn"
                    onClick={() =>
                      handleDelete(rep._id)
                    }
                  >
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

export default Receptionists;