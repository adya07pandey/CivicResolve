import { Link } from "react-router-dom";

function Home() {

  return (

    <div className="home-page">

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-content">

          <h1 className="hero-title">
            Public Complaint
            Management System
          </h1>

          <p className="hero-subtitle">
            A simple platform for citizens to report
            civic issues and track complaint resolution
            efficiently.
          </p>

          <div className="hero-buttons">

            <Link
              to="/register"
              className="primary-btn"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="secondary-btn"
            >
              Login
            </Link>

          </div>

        </div>

      </section>


    </div>
  );
}

export default Home;