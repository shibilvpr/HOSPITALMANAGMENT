
import Navbar from "../../compenents/Navbar/Navbar";
import "./Home.css";

import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <Navbar />


      <div className="medical-home-wrapper">

        {/* HERO SECTION */}

        <section className="medical-hero-section">

          <div className="medical-hero-layout">

            {/* LEFT IMAGE */}

            <motion.div
              className="medical-image-side"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >

              <img
                src="/MedTech.webp"
                alt="medtec"
                className="medical-doctor-photo"
              />

            </motion.div>

            {/* RIGHT CONTENT */}

            <motion.div
              className="medical-text-side"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >

              <p className="medical-subtitle">
                BETTER CARE FOR YOUR HEALTH
              </p>

              <h1 className="medical-main-title">
                Get Quick <br />
                <span>Medical Service</span>
              </h1>

              <p className="medical-description">
                Get your medical service with certified
                and professional doctors on MedCare.
              </p>

              <motion.button
                className="medical-start-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>

            </motion.div>

          </div>

          {/* DOCTOR CARD */}

          <motion.div
            className="medical-doctor-card"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <div className="medical-doctor-details">

              <h3>
                Advanced Healthcare For Every Family
              </h3>

              <p>
                Care Well Hospital provides modern medical treatment,
                experienced doctors, emergency care, advanced laboratory
                services, and compassionate patient support with trusted
                healthcare solutions for a healthier future.
              </p>

            </div>

            <motion.div
              className="medical-schedule-box"
              whileHover={{
                scale: 1.08,
                rotate: 2,
              }}
            >
              <span>›</span>
              <p>Schedule</p>
            </motion.div>

          </motion.div>

        </section>

        {/* SERVICE SECTION */}

        <section className="medical-vaccine-wrapper">

          {/* LEFT CARD */}

          <motion.div
            className="medical-vaccine-card"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <h3>Emergency Support</h3>

            <button className="medical-patient-btn">
              1,480 Patients
            </button>

            <img
              src="/patients.jpg"
              alt="patients"
              className="medical-syringe-img"
            />

          </motion.div>

          {/* RIGHT CONTENT */}

          <motion.div
            className="medical-vaccine-content"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <h1>
              We Provide Trusted <br />
              Healthcare Services
            </h1>

            <p>
              We provide modern healthcare services with
              trusted doctors, advanced technology,
              emergency support, and home medical care.
            </p>

            <div className="medical-service-grid">

              {/* CARD 1 */}

              <motion.div
                className="medical-service-card"
                whileHover={{ y: -10 }}
              >

                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="medical-service-video"
                >

                  <source

                    src="Doctors.mp4"
                    type="video/mp4"
                  />

                </video>

                <h4> Emergency Response</h4>

                <p>
                  Immediate medical assistance within 60 minutes
                  for urgent care, emergency support, and critical situations.
                </p>
              </motion.div>

              {/* CARD 2 */}

              <motion.div
                className="medical-service-card"
                whileHover={{ y: -10 }}
              >

                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="medical-service-video"
                >

                  <source
                    src="caring.mp4"
                    type="video/mp4"
                  />

                </video>

                <h4>Home Care</h4>

                <p>
                  Experienced doctors and nurses visit your home
                  to provide safe, convenient, and personalized medical care.
                </p>



              </motion.div>

            </div>

          </motion.div>

        </section>

        {/* FOOTER */}

        <footer className="hospital-footer">

          <div className="footer-content">

            <div className="footer-grid">

              <div className="footer-box">

                <h2 className="footer-logo">
                  Care<span>Well</span>
                </h2>

                <p>
                  Providing quality healthcare services with
                  experienced doctors and modern facilities
                  for every patient.
                </p>

              </div>

              <div className="footer-box">

                <h3>Services</h3>

                <ul>
                  <li>Emergency Care</li>
                  <li>Laboratory</li>
                  <li>Cardiology</li>
                  <li>Dental Care</li>
                </ul>

              </div>

              <div className="footer-box">

                <h3>Quick Links</h3>

                <ul>
                  <li>Home</li>
                  <li>Doctors</li>
                  <li>Appointments</li>
                  <li>Contact</li>
                </ul>

              </div>

              <div className="footer-box">

                <h3>Contact</h3>

                <p> +91 98765 43210</p>
                <p>medicare@gmail.com</p>
                <p> Kochi, Kerala</p>

              </div>

            </div>

            <div className="footer-image">

              <img
                src="/footer.png"
                alt="doctor"
              />

            </div>

          </div>

          <div className="footer-bottom">
            © 2026 MediCare Hospital | All Rights Reserved
          </div>

        </footer>


      </div>


    </>
  );
};

export default Home;