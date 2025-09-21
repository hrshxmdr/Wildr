import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaCompass, FaBullseye, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import "./AboutPage.css";

// Animation variants for sections to reduce repetition
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const AboutPage = () => {
  const teamMembers = [
    { name: "Harsh Madhur", role: "CEO & Founder", img: "/img/harsh-madhur.jpg" },
   
  ];

  return (
    <div className="about-wrapper navbar-offset">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-background-image" />
        <div className="hero-overlay" />
        <Container className="hero-content text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Our Story
          </motion.h1>
          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            Connecting people with the wild, one campsite at a time.
          </motion.p>
        </Container>
      </section>

      <Container className="py-5 about-content">
        {/* About Us Section */}
        <motion.section 
          className="content-section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <h2 className="section-title">Who We Are</h2>
              <p>
                At <strong>Wildr</strong>, we believe the best memories are made under the stars. Our platform helps outdoor lovers discover breathtaking campsites across the globe—from hidden forest retreats and serene lakeside escapes to adventurous mountain trails.
              </p>
            </Col>
            <Col lg={6} className="text-center">
              <FaCompass className="section-icon" />
            </Col>
          </Row>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          className="content-section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Row className="align-items-center g-5 flex-row-reverse">
            <Col lg={6}>
              <h2 className="section-title">Our Mission</h2>
              <p>
                Our mission is to inspire and empower explorers by making camping accessible and unforgettable. We provide up-to-date information, honest reviews, and practical tips so every adventurer can find their perfect escape into the wild.
              </p>
            </Col>
            <Col lg={6} className="text-center">
              <FaBullseye className="section-icon" />
            </Col>
          </Row>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          className="content-section text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="section-title">Meet The Team</h2>
          <p className="lead text-muted mb-5">The passionate explorers behind the platform.</p>
          <Row className="justify-content-center">
            {teamMembers.map((member, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="team-card">
                    <Card.Img variant="top" src={member.img} alt={member.name} />
                    <Card.Body>
                      <Card.Title className="team-name">{member.name}</Card.Title>
                      <Card.Text className="team-role">{member.role}</Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.section>
        
        {/* Contact Section */}
        <motion.section
          className="content-section contact-section text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="lead text-muted mb-4">Have questions or feedback? We'd love to hear from you.</p>
          <Row>
            <Col md={4} className="contact-item">
              <FaEnvelope />
              <a href="mailto:info@woodsandwild.com">info@Wildr.com</a>
            </Col>
            <Col md={4} className="contact-item">
              <FaPhone />
              <span>(123) 456-7890</span>
            </Col>
            <Col md={4} className="contact-item">
              <FaMapMarkerAlt />
              <span>Mathura, Uttar Pradesh, India</span>
            </Col>
          </Row>
        </motion.section>
      </Container>
    </div>
  );
};

export default AboutPage;