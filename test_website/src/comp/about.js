import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        {/* Header Section */}
        <header className="about-header">
          <h1>About the Project</h1>
          <p className="subtitle">Final Year Project | Computer Engineering</p>
        </header>

        {/* Project Description */}
        <section className="about-section">
          <h2>Project Overview</h2>
          <p>
            Welcome to <strong>The Bookstore</strong>. This platform is a fully functional 
            E-commerce web application developed as a Final Year Project (FYP). 
            an online platform for books selling, promotion and inventory management:
          </p>
        </section>
        <section className="about-section">
            <h2>Technical Implementation</h2>
            <ul className="fyp-list">
                <li><strong>Database Design:</strong> Establishing a scalable Firebase schema for real-time inventory and book data management.</li>
                <li><strong>Backend Systems:</strong> Developing a robust logic layer that integrates secure authentication and instant messaging capabilities.</li>
                <li><strong>Cloud Deployment:</strong> Building a modern React.js frontend and hosting the platform on a secure cloud infrastructure.</li>
            </ul>
        </section>
        {/* Features Section */}
        <section className="about-section">
          <h2>Core Features</h2>
          <div className="features-grid">
            {/* Feature 1 */}
              {/*<h3>Live Chat</h3>*/}
              {/*<p>Integrated real-time customer support powered by CometChat.</p>*/}
            {/*</div>*/}
            <div className="feature-item">
              <h3>Inventory Management</h3>
              <p>Dynamic data synchronization using Firebase Realtime Database.</p>
            </div>
            <div className="feature-item">
              <h3>Secure Auth</h3>
              <p>User authentication and profile management via Auth0.</p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="about-section tech-stack">
          <h2>Technologies Used</h2>
          <div className="tech-tags">
            <span>React.js</span>
            <span>Firebase</span>
            <span>Auth0</span>
            <span>Vercel</span>
            {/*<span>CometChat</span>*/}
          </div>
        </section>

        {/* Developer Info */}
        <footer className="about-footer">
          <p>Developed by: <strong>Man Tsoi Yee 13738740</strong></p>
          <p>Academic Year: 2025 - 2026</p>
        </footer>
      </div>
    </div>
  );
};

export default About;