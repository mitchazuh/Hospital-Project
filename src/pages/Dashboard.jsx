import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueue } from "../context/QueueContext";

function Dashboard() {
  const navigate = useNavigate();

  const {
    patients,
    updatePatientStatus,
    clearQueue,
  } = useQueue();

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("All");

  const waitingPatients = patients.filter(
    (patient) => patient.status === "Waiting"
  );

  const consultationPatients = patients.filter(
    (patient) => patient.status === "In Consultation"
  );

  const completedPatients = patients.filter(
    (patient) => patient.status === "Completed"
  );

  const filteredPatients = patients.filter((patient) => {
    const patientName = patient.name || "";
    const queueNumber = patient.queueNumber || "";
    const department = patient.department || "";

    const matchesSearch =
      patientName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      queueNumber
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All" ||
      department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  /* =========================
     CALL NEXT PATIENT
  ========================= */

  const callNextPatient = async () => {
    if (waitingPatients.length === 0) {
      alert("There are no patients waiting.");
      return;
    }

    const nextPatient = waitingPatients[0];

    try {
      await updatePatientStatus(
        nextPatient.id,
        "In Consultation"
      );

      alert(
        `Now calling ${nextPatient.queueNumber} - ${nextPatient.name}`
      );
    } catch (error) {
      alert(
        "Could not update the patient status. Please make sure the API is running."
      );
    }
  };

  /* =========================
     CLEAR QUEUE
  ========================= */

  const handleClearQueue = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the entire queue?"
    );

    if (!confirmClear) return;

    try {
      await clearQueue();
      alert("Queue cleared successfully.");
    } catch (error) {
      alert(
        "Could not clear the queue. Please make sure the API is running."
      );
    }
  };

  /* =========================
     START CONSULTATION
  ========================= */

  const handleStart = async (patient) => {
    try {
      await updatePatientStatus(
        patient.id,
        "In Consultation"
      );
    } catch (error) {
      alert(
        "Could not update patient status."
      );
    }
  };

  /* =========================
     COMPLETE PATIENT
  ========================= */

  const handleComplete = async (patient) => {
    try {
      await updatePatientStatus(
        patient.id,
        "Completed"
      );
    } catch (error) {
      alert(
        "Could not update patient status."
      );
    }
  };

  return (
    <main className="dashboard">

      {/* =========================
          DASHBOARD HEADER
      ========================= */}

      <div className="dashboard-header">

        <div>
          <p className="welcome">
            STAFF PANEL
          </p>

          <h1>
            Queue Dashboard
          </h1>

          <p>
            Manage patients and control the hospital queue.
          </p>
        </div>

        <div className="dashboard-actions">

          <button
            className="action-btn secondary"
            onClick={handleClearQueue}
          >
            Clear Queue
          </button>

          <button
            className="action-btn primary"
            onClick={callNextPatient}
          >
            Call Next Patient
          </button>

        </div>

      </div>


      {/* =========================
          STATISTICS
      ========================= */}

      <section className="dashboard-stats">

        <div className="dashboard-card">

          <div className="dashboard-card-icon">
            👥
          </div>

          <div>
            <h3>{patients.length}</h3>
            <p>Total Patients</p>
          </div>

        </div>


        <div className="dashboard-card">

          <div className="dashboard-card-icon">
            ⏳
          </div>

          <div>
            <h3>
              {waitingPatients.length}
            </h3>

            <p>Waiting</p>
          </div>

        </div>


        <div className="dashboard-card">

          <div className="dashboard-card-icon">
            🩺
          </div>

          <div>
            <h3>
              {consultationPatients.length}
            </h3>

            <p>In Consultation</p>
          </div>

        </div>


        <div className="dashboard-card">

          <div className="dashboard-card-icon">
            ✓
          </div>

          <div>
            <h3>
              {completedPatients.length}
            </h3>

            <p>Completed</p>
          </div>

        </div>

      </section>


      {/* =========================
          PATIENT QUEUE PANEL
      ========================= */}

      <section className="dashboard-panel">

        <div className="dashboard-panel-header">

          <div>
            <h2>
              Patient Queue
            </h2>

            <p>
              Manage today's registered patients.
            </p>
          </div>

        </div>


        {/* =========================
            SEARCH & FILTER
        ========================= */}

        <div className="dashboard-toolbar">

          <input
            type="text"
            placeholder="Search patient or queue number..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="dashboard-search"
          />


          <select
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(
                e.target.value
              )
            }
            className="dashboard-filter"
          >

            <option value="All">
              All Departments
            </option>

            <option value="General Medicine">
              General Medicine
            </option>

            <option value="Cardiology">
              Cardiology
            </option>

            <option value="Dental">
              Dental
            </option>

            <option value="Pediatrics">
              Pediatrics
            </option>

            <option value="Laboratory">
              Laboratory
            </option>

          </select>

        </div>


        {/* =========================
            PATIENT TABLE
        ========================= */}

        {filteredPatients.length === 0 ? (

          <div className="empty-queue">

            <div className="empty-queue-icon">
              🏥
            </div>

            <h3>
              No patients found
            </h3>

            <p>
              Patients registered in the system
              will appear here.
            </p>

          </div>

        ) : (

          <div className="table-wrapper">

            <table className="patient-table">

              <thead>

                <tr>
                  <th>Queue No.</th>
                  <th>Patient</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>


              <tbody>

                {filteredPatients.map(
                  (patient) => (

                    <tr
                      key={patient.id}
                      className="dashboard-patient-row"
                    >

                      {/* QUEUE NUMBER */}

                      <td>

                        <button
                          className="patient-link"
                          onClick={() =>
                            navigate(
                              `/patient/${patient.id}`
                            )
                          }
                        >
                          {patient.queueNumber}
                        </button>

                      </td>


                      {/* PATIENT NAME */}

                      <td>

                        <button
                          className="patient-name-link"
                          onClick={() =>
                            navigate(
                              `/patient/${patient.id}`
                            )
                          }
                        >
                          {patient.name}
                        </button>

                        <small className="patient-view-hint">
                          View details →
                        </small>

                      </td>


                      {/* DEPARTMENT */}

                      <td>
                        {patient.department}
                      </td>


                      {/* STATUS */}

                      <td>

                        {patient.status ===
                          "Waiting" && (
                          <span className="status waiting">
                            Waiting
                          </span>
                        )}

                        {patient.status ===
                          "In Consultation" && (
                          <span className="status consultation">
                            In Consultation
                          </span>
                        )}

                        {patient.status ===
                          "Completed" && (
                          <span className="status completed">
                            Completed
                          </span>
                        )}

                      </td>


                      {/* ACTION */}

                      <td>

                        {patient.status ===
                          "Waiting" && (

                          <button
                            className="action-btn primary"
                            onClick={() =>
                              handleStart(
                                patient
                              )
                            }
                          >
                            Start
                          </button>

                        )}


                        {patient.status ===
                          "In Consultation" && (

                          <button
                            className="action-btn secondary"
                            onClick={() =>
                              handleComplete(
                                patient
                              )
                            }
                          >
                            Complete
                          </button>

                        )}


                        {patient.status ===
                          "Completed" && (

                          <span className="status completed">
                            Done ✓
                          </span>

                        )}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </section>

    </main>
  );
}

export default Dashboard;