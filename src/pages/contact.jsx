import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowRight,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar.jsx";

import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <div className="contact-page">

        {/* ================= HERO ================= */}

        <section className="contact-hero">

          <div className="contact-hero-content">

            <div className="contact-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Contact Us</span>
            </div>

            <span className="contact-label">
              GET IN TOUCH
            </span>

            <h1>
              Let's talk about
              <br />
              <span>your space.</span>
            </h1>

            <p>
              Have a question about our furniture,
              your order, or anything else?
              We're here to help.
            </p>

          </div>

          {/* HERO IMAGE */}

          <div className="contact-hero-icon">
            <img
              src="/images/contactus.jpg"
              alt="Contact us"
            />
          </div>

        </section>


        {/* ================= CONTACT CONTENT ================= */}

        <section className="contact-section">

          <div className="contact-info">

            <span className="section-label">
              CONTACT INFORMATION
            </span>

            <h2>
              We'd love to
              <br />
              hear from you.
            </h2>

            <p className="contact-intro">
              Whether you need help choosing the right
              furniture or have a question about an order,
              feel free to reach out to our team.
            </p>


            {/* EMAIL */}

            <div className="contact-info-item">

              <div className="contact-info-icon">
                <Mail size={21} />
              </div>

              <div>
                <span>Email Us</span>

                <strong>
                  hello@furniture.com
                </strong>
              </div>

            </div>


            {/* PHONE */}

            <div className="contact-info-item">

              <div className="contact-info-icon">
                <Phone size={21} />
              </div>

              <div>
                <span>Call Us</span>

                <strong>
                  +20 100 123 4567
                </strong>
              </div>

            </div>


            {/* ADDRESS */}

            <div className="contact-info-item">

              <div className="contact-info-icon">
                <MapPin size={21} />
              </div>

              <div>
                <span>Visit Us</span>

                <strong>
                  Cairo, Egypt
                </strong>
              </div>

            </div>


            {/* HOURS */}

            <div className="contact-info-item">

              <div className="contact-info-icon">
                <Clock size={21} />
              </div>

              <div>
                <span>Working Hours</span>

                <strong>
                  Sat - Thu, 9:00 AM - 8:00 PM
                </strong>
              </div>

            </div>

          </div>


          {/* ================= FORM ================= */}

          <div className="contact-form-wrapper">

            <div className="form-header">

              <span>
                SEND A MESSAGE
              </span>

              <h2>
                How can we help?
              </h2>

              <p>
                Fill out the form below and we'll
                get back to you as soon as possible.
              </p>

            </div>


            <form onSubmit={handleSubmit}>

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Your Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              <div className="form-group">

                <label>
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  placeholder="What can we help you with?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Message
                </label>

                <textarea
                  name="message"
                  placeholder="Write your message..."
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

              </div>


              <button
                type="submit"
                className="send-button"
              >
                Send Message
                <Send size={17} />
              </button>


              {submitted && (

                <div className="success-message">

                  <strong>
                    Message sent successfully! ✓
                  </strong>

                  <span>
                    Thank you for contacting us.
                    We'll get back to you soon.
                  </span>

                </div>

              )}

            </form>

          </div>

        </section>


        {/* ================= FAQ ================= */}

        <section className="contact-faq">

          <div className="faq-heading">

            <span>
              NEED HELP?
            </span>

            <h2>
              Frequently asked questions
            </h2>

            <p>
              Here are some common questions
              our customers ask.
            </p>

          </div>


          <div className="faq-grid">

            <div className="faq-card">

              <h3>
                How can I track my order?
              </h3>

              <p>
                Once your order is shipped,
                you'll receive tracking information
                by email.
              </p>

            </div>


            <div className="faq-card">

              <h3>
                How long does delivery take?
              </h3>

              <p>
                Delivery usually takes between
                3 and 7 business days.
              </p>

            </div>


            <div className="faq-card">

              <h3>
                Can I return my furniture?
              </h3>

              <p>
                Yes. We offer an easy return process
                for eligible products.
              </p>

            </div>


            <div className="faq-card">

              <h3>
                Can I change my order?
              </h3>

              <p>
                Contact us as soon as possible and
                we'll do our best to help.
              </p>

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="contact-cta">

          <div>

            <span>
              READY TO SHOP?
            </span>

            <h2>
              Find something
              <br />
              you'll love.
            </h2>

            <p>
              Explore our furniture collection
              and transform your space.
            </p>

            <Link
              to="/shop"
              className="contact-cta-button"
            >
              Explore Furniture
              <ArrowRight size={18} />
            </Link>

          </div>

        </section>

      </div>

      <Footer />
    </>
  );
}

export default Contact;
