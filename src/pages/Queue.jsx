import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQueue } from "../context/QueueContext";

function Queue() {
  const { patients } = useQueue();

  const location = useLocation();
  const navigate = useNavigate();

  const newPatient = location.state?.newPatient;

  const currentPatient = patients.find(
    (patient) => patient.status === "In Consultation"
  );

  const waitingPatients = patients.filter(
    (patient) => patient.status === "Waiting"
  );

  return (
    <main className="queue-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="queue-header">

        <div>
          <p className="page-label">MEDIQUEUE</p>

          <h1>Current Queue</h1>

          <p>
            Follow the queue and see which patient is
            currently being served.
          </p>
        </div>

        <div className="queue-count">
          <span>{waitingPatients.length}</span>
          <small>Waiting</small>
        </div>

      </div>


      {/* =========================
          NEW PATIENT TICKET
      ========================= */}

      {newPatient && (
        <div className="ticket">

          <div className="ticket-header">

            <div>
              <span className="ticket-logo">+</span>
              <strong>MEDIQUEUE</strong>
            </div>

            <span className="ticket-status">
              REGISTERED
            </span>

          </div>

          <div className="ticket-number">

            <small>YOUR QUEUE NUMBER</small>

            <h2>
              #{newPatient.queueNumber}
            </h2>

          </div>

          <div className="ticket-details">

            <div>
              <span>Patient</span>
              <strong>{newPatient.name}</strong>
            </div>

            <div>
              <span>Department</span>
              <strong>{newPatient.department}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong>{newPatient.status}</strong>
            </div>

          </div>

          <div className="ticket-message">
            Please wait for your number to be called.
          </div>

          {/* View patient details */}

          {newPatient.id && (
            <button
              className="ticket-details-btn"
              onClick={() =>
                navigate(`/patient/${newPatient.id}`)
              }
            >
              View Patient Details →
            </button>
          )}

        </div>
      )}


      {/* =========================
          NOW SERVING
      ========================= */}

      <div className="now-serving">

        <div>

          <p className="serving-label">
            NOW SERVING
          </p>

          {currentPatient ? (
            <>
              <h2>
                #{currentPatient.queueNumber}
              </h2>

              <h3>
                {currentPatient.name}
              </h3>

              <p>
                {currentPatient.department}
              </p>

              <button
                className="view-serving-btn"
                onClick={() =>
                  navigate(
                    `/patient/${currentPatient.id}`
                  )
                }
              >
                View Patient →
              </button>
            </>
          ) : (
            <>
              <h2>---</h2>

              <h3>
                No patient is being served
              </h3>

              <p>
                Please wait for the next patient.
              </p>
            </>
          )}

        </div>

        <div className="serving-icon">
          🩺
        </div>

      </div>


      {/* =========================
          WAITING PATIENTS
      ========================= */}

      <div className="waiting-section">

        <div className="section-heading">

          <h2>Waiting Patients</h2>

          <span>
            {waitingPatients.length} waiting
          </span>

        </div>


        {waitingPatients.length === 0 ? (

          <div className="empty-queue">

            <div>✓</div>

            <h2>
              No patients waiting
            </h2>

            <p>
              The queue is currently clear.
            </p>

          </div>

        ) : (

          <div className="queue-list">

            {waitingPatients.map(
              (patient, index) => (

                <div
                  className="queue-item"
                  key={patient.id}
                  onClick={() =>
                    navigate(
                      `/patient/${patient.id}`
                    )
                  }
                  role="button"
                  tabIndex="0"
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      navigate(
                        `/patient/${patient.id}`
                      );
                    }
                  }}
                >

                  {/* Position */}

                  <div className="position">
                    {index + 1}
                  </div>


                  {/* Queue Number */}

                  <div className="queue-number-box">
                    {patient.queueNumber}
                  </div>


                  {/* Patient Information */}

                  <div className="patient-info">

                    <h3>
                      {patient.name}
                    </h3>

                    <p>
                      {patient.department}
                    </p>

                    <small>
                      {patient.reason ||
                        "Medical consultation"}
                    </small>

                  </div>


                  {/* Status */}

                  <div className="status waiting">
                    Waiting
                  </div>


                  {/* Arrow */}

                  <div className="patient-arrow">
                    →
                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>


      {/* =========================
          BOTTOM ACTION
      ========================= */}

      <div className="queue-bottom-action">

        <p>
          Need to register another patient?
        </p>

        <Link
          to="/register"
          className="primary-btn"
        >
          Register Patient
        </Link>

      </div>

    </main>
  );
}

export default Queue;