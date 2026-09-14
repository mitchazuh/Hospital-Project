import { useNavigate, useParams } from "react-router-dom";
import { useQueue } from "../context/QueueContext";

function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { patients, loading } = useQueue();

  const patient = patients.find(
    (item) => String(item.id) === String(id)
  );

  if (loading) {
    return (
      <div className="patient-details-page">
        <div className="details-loading">
          Loading patient information...
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="patient-details-page">
        <div className="patient-not-found">
          <h2>Patient Not Found</h2>

          <p>
            The patient information could not be found.
          </p>

          <button
            className="submit-btn"
            onClick={() => navigate("/queue")}
          >
            Back to Queue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-details-page">

      <div className="patient-details-container">

        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="details-header">

          <div>
            <span className="section-tag">
              PATIENT DETAILS
            </span>

            <h1>{patient.name}</h1>

            <p>
              Complete information about this patient's
              hospital visit.
            </p>
          </div>

          <div className="queue-number-large">
            <small>QUEUE NUMBER</small>
            <strong>{patient.queueNumber}</strong>
          </div>

        </div>


        {/* STATUS */}

        <div className="patient-status-card">

          <div>
            <span>Current Status</span>

            <strong
              className={`status-badge ${patient.status
                ?.toLowerCase()
                .replace(" ", "-")}`}
            >
              {patient.status}
            </strong>
          </div>

          <div>
            <span>Department</span>
            <strong>{patient.department}</strong>
          </div>

        </div>


        {/* PERSONAL INFORMATION */}

        <div className="details-card">

          <h2>Personal Information</h2>

          <div className="details-grid">

            <div className="detail-item">
              <span>Full Name</span>
              <strong>{patient.name || "—"}</strong>
            </div>

            <div className="detail-item">
              <span>Age</span>
              <strong>{patient.age || "—"}</strong>
            </div>

            <div className="detail-item">
              <span>Gender</span>
              <strong>{patient.gender || "—"}</strong>
            </div>

            <div className="detail-item">
              <span>Phone</span>
              <strong>{patient.phone || "—"}</strong>
            </div>

            <div className="detail-item">
              <span>Emergency Contact</span>
              <strong>
                {patient.emergencyContact || "—"}
              </strong>
            </div>

            <div className="detail-item full">
              <span>Address</span>
              <strong>{patient.address || "—"}</strong>
            </div>

          </div>

        </div>


        {/* MEDICAL INFORMATION */}

        <div className="details-card">

          <h2>Medical Information</h2>

          <div className="details-grid">

            <div className="detail-item">
              <span>Department</span>
              <strong>{patient.department || "—"}</strong>
            </div>

            <div className="detail-item">
              <span>Reason for Visit</span>
              <strong>{patient.reason || "—"}</strong>
            </div>

            <div className="detail-item full">
              <span>Symptoms</span>
              <strong>
                {patient.symptoms || "No symptoms provided"}
              </strong>
            </div>

            <div className="detail-item">
              <span>Duration</span>
              <strong>{patient.duration || "—"}</strong>
            </div>

            <div className="detail-item full">
              <span>Existing Medical Conditions</span>
              <strong>
                {patient.medicalConditions || "None"}
              </strong>
            </div>

            <div className="detail-item full">
              <span>Allergies</span>
              <strong>
                {patient.allergies || "None"}
              </strong>
            </div>

          </div>

        </div>


        <div className="details-actions">

          <button
            className="secondary-btn"
            onClick={() => navigate("/queue")}
          >
            View Current Queue
          </button>

          <button
            className="submit-btn"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}

export default PatientDetails;