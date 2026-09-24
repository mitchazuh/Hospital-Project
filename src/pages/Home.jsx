import { Link } from "react-router-dom";
import { useQueue } from "../context/QueueContext";

function Home() {
  const { patients } = useQueue();

  const waitingPatients = patients.filter(
    (patient) => patient.status === "Waiting"
  );

  const consultationPatients = patients.filter(
    (patient) => patient.status === "In Consultation"
  );

  const completedPatients = patients.filter(
    (patient) => patient.status === "Completed"
  );

  return (
    <main className="home">

      {/* HERO SECTION */}
      <section className="hero">

        {/* Hospital image in the background */}
        <div className="hero-background"></div>

        {/* White fading effect */}
        <div className="hero-fade"></div>

        {/* Hero content */}
        <div className="hero-content">

          <p className="welcome">
            WELCOME TO MEDIQUEUE
          </p>

          <h1>
            Smarter Healthcare.
            <br />
            <span>Shorter Waiting Times.</span>
          </h1>

          <p className="hero-text">
            A digital queue management system that helps hospitals
            organize patients, reduce waiting time and provide
            better healthcare service.
          </p>

          {/* Buttons */}
          <div className="hero-buttons">

            <Link
              to="/register"
              className="primary-btn"
            >
              👤 Join the Queue
            </Link>

            <Link
              to="/queue"
              className="secondary-btn"
            >
              ◷ View Current Queue
            </Link>

          </div>

          {/* Small features */}
          <div className="hero-features">

            <div>
              <strong>✓</strong>
              Easy Registration
            </div>

            <div>
              <strong>✓</strong>
              Live Queue Tracking
            </div>

            <div>
              <strong>✓</strong>
              Efficient Service
            </div>

          </div>

        </div>

      </section>


      {/* FEATURES SECTION */}
      <section className="features-section">

        <div className="feature-card">

          <div className="feature-icon">
            👤+
          </div>

          <div>
            <h3>Easy Registration</h3>

            <p>
              Quick and simple patient
              registration process.
            </p>
          </div>

        </div>


        <div className="feature-card">

          <div className="feature-icon">
            ◷
          </div>

          <div>
            <h3>Live Queue Tracking</h3>

            <p>
              Real-time updates on queue
              status and progress.
            </p>
          </div>

        </div>


        <div className="feature-card">

          <div className="feature-icon">
            ✓
          </div>

          <div>
            <h3>Efficient Service</h3>

            <p>
              Improved efficiency and
              shorter wait times.
            </p>
          </div>

        </div>


        <div className="feature-card">

          <div className="feature-icon">
            ↗
          </div>

          <div>
            <h3>Better Experience</h3>

            <p>
              Enhanced patient experience
              and satisfaction.
            </p>
          </div>

        </div>

      </section>


      {/* STATISTICS SECTION */}
      <section className="home-stats">

        <div className="home-stat">

          <div className="stat-icon">
            👥
          </div>

          <div>
            <strong>
              {patients.length}
            </strong>

            <span>
              Total Patients Today
            </span>
          </div>

        </div>


        <div className="home-stat">

          <div className="stat-icon">
            ◷
          </div>

          <div>
            <strong>
              {waitingPatients.length}
            </strong>

            <span>
              Patients Waiting
            </span>
          </div>

        </div>


        <div className="home-stat">

          <div className="stat-icon">
            🩺
          </div>

          <div>
            <strong>
              {consultationPatients.length}
            </strong>

            <span>
              In Consultation
            </span>
          </div>

        </div>


        <div className="home-stat">

          <div className="stat-icon">
            ✓
          </div>

          <div>
            <strong>
              {completedPatients.length}
            </strong>

            <span>
              Completed Today
            </span>
          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;
