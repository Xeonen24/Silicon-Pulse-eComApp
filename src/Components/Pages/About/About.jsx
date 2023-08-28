import React, { useState } from "react";
import axios from "axios";
import Footer from "../../Static/Footer/Footer";
import "./About.css";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        process.URL + "/auth/send-mail",
        {
          msg: formData,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (response.statusText == "OK") {
        alert("Email sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="about-page">
        <div className="about-content">
          <h2 className="contact-heading">About Silicon Pulse...</h2>
          <p className="para">
            Welcome to Silicon Pulse, your one-stop destination for high-quality
            computer parts and components. Our mission is to provide
            cutting-edge technology to enthusiasts, professionals, and gamers
            alike.
          </p>
          <p className="para">
            With a passion for innovation, we carefully select and curate a wide
            range of products to meet your computing needs. Our team of experts
            ensures that each item we offer is of the highest quality,
            performance, and reliability.
          </p>
          <p className="para">
            At Silicon Pulse, we believe in fostering a tech-savvy community.
            Join us in embracing the pulse of technology!
          </p>
        </div>
        <div className="contact-form">
          <h2 className="form-heading">Contact Us</h2>
          <form className="formo" onSubmit={handleSubmit}>
            <label htmlFor="name" className="labelo">
              Name
            </label>
            <input
              className="inputo"
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleFormChange}
            />

            <label htmlFor="email" className="labelo">
              Email
            </label>
            <input
              className="inputo"
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleFormChange}
            />

            <label htmlFor="message" className="labelo">
              Message
            </label>
            <textarea
              className="texto"
              id="message"
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleFormChange}
            />

            <button
              type="submit"
              style={{
                width: "30rem",
                marginBottom: "1rem",
                alignSelf: "center",
                marginRight: "1rem",
              }}
              className="ascdscbut"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <div className="FooterDiv">
        <Footer />
      </div>
    </div>
  );
};

export default About;
