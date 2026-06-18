import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";

import "./Dashboard.css";
import Sidebar from "../../compenents/Sidebar/Sidebar";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.role === "doctor") {
    return <Navigate to="/appointments" replace />;
  }

  const [patients, setPatients] =
    useState([]);

  const [doctors, setDoctors] =
    useState([]);

  const [appointments, setAppointments] =
    useState([]);

  // GET DATA

  const getDashboardData =
    async () => {
      try {
        const patientRes =
          await axios.get(
            "http://localhost:5000/api/patient/all"
          );

        const doctorRes =
          await axios.get(
            "http://localhost:5000/api/doctor/all"
          );

        const appointmentRes =
          await axios.get(
            "http://localhost:5000/api/appointment/all"
          );

        setPatients(
          patientRes.data.patients
        );

        setDoctors(
          doctorRes.data.doctors
        );

        setAppointments(
          appointmentRes.data.appointments
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getDashboardData();
  }, []);

  // STATUS COUNTS

  const confirmedAppointments =
    appointments.filter(
      (item) =>
        item.status ===
        "Confirmed"
    );

  return (
    <div className="dashboard-page">
      <Sidebar />

      {/*TOPBAR */}

      <motion.div
        className="dashboard-top"
        initial={{
          opacity: 0,
          y: -40,
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
          {/* <p className="top-small">
            CareWell Hospital
          </p> */}

          <h1>
            Dashboard
          </h1>

          <p className="dashboard-subtitle">
            Hospital Management
            Overview
          </p>
        </div>

        <div className="date-box">
          <span className="date-title">
            Today
          </span>

          <span className="date-day">
            {new Date().toDateString()}
          </span>
        </div>
      </motion.div>

      {/* HERO  */}

      <motion.div
        className="hero-banner"
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
        <div className="hero-overlay">
          <span className="hero-badge">
            Premium Healthcare
          </span>

          <h2>
            Modern Hospital <br />
            Management Dashboard
          </h2>

          <p>
            Manage appointments,
            doctors, patients and
            hospital activities with
            a clean luxury dashboard
            experience.
          </p>
        </div>
      </motion.div>

      {/* STATS */}

      <div className="stats-grid">

        {/* PATIENTS */}

        <motion.div
          className="stats-card"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          <div className="card-image patients-img">
            <div className="card-overlay"></div>
          </div>

          <div className="card-content">
            {/* <div className="card-icon">
              👨‍⚕️
            </div> */}

            <h2>
              {patients.length}
            </h2>

            <p>
              Total Patients
            </p>
          </div>
        </motion.div>

        {/* DOCTORS */}

        <motion.div
          className="stats-card"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <div className="card-image doctors-img">
            <div className="card-overlay"></div>
          </div>

          <div className="card-content">
            {/* <div className="card-icon">
              🩺
            </div> */}

            <h2>
              {doctors.length}
            </h2>

            <p>
              Total Doctors
            </p>
          </div>
        </motion.div>

        {/* APPOINTMENTS */}

        <motion.div
          className="stats-card"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <div className="card-image appointments-img">
            <div className="card-overlay"></div>
          </div>

          <div className="card-content">
            {/* <div className="card-icon">
              📅
            </div> */}

            <h2>
              {appointments.length}
            </h2>

            <p>
              Total Appointments
            </p>
          </div>
        </motion.div>

        {/* CONFIRMED */}

        <motion.div
          className="stats-card"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <div className="card-image confirmed-img">
            <div className="card-overlay"></div>
          </div>

          <div className="card-content">
            {/* <div className="card-icon">
              ✅
            </div> */}

            <h2>
              {
                confirmedAppointments.length
              }
            </h2>

            <p>
              Confirmed Bookings
            </p>
          </div>
        </motion.div>
      </div>

      {/*  TABLE  */}

      <motion.div
        className="dashboard-table-card"
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
            Recent Appointments
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
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments
                .slice(0, 5)
                .map(
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
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}

        <div className="mobile-cards">

          {appointments
            .slice(0, 5)
            .map(
              (
                appointment,
                index
              ) => (

                <div
                  className="mobile-card"
                  key={appointment._id}
                >

                  <div className="mobile-card-top">

                    <div className="mobile-avatar">
                      {index + 1}
                    </div>

                    <div>

                      <h4>
                        {
                          appointment.patient
                        }
                      </h4>

                      <p>
                        {
                          appointment.doctor
                        }
                      </p>

                    </div>

                  </div>

                  <div className="mobile-card-info">

                    <div className="info-row">

                      <span>
                        Date
                      </span>

                      <strong>
                        {new Date(
                          appointment.date
                        ).toLocaleDateString()}
                      </strong>

                    </div>

                    <div className="info-row">

                      <span>
                        Status
                      </span>

                      <span
                        className={`status ${appointment.status.toLowerCase()}`}
                      >
                        {
                          appointment.status
                        }
                      </span>

                    </div>

                  </div>

                </div>
              )
            )}

        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;