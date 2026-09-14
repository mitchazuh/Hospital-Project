import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueue } from "../context/QueueContext";

function Register() {
  const navigate = useNavigate();
  const { addPatient } = useQueue();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    department: "",
    reason: "",
    symptoms: "",
    duration: "",
    medicalConditions: "",
    allergies: "",
    emergencyContact: "",
  });

  const [submitting, setSubmitting] = useState(false);

  // Handle all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // Submit patient
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.age ||
      !formData.gender ||
      !formData.phone ||
      !formData.department ||
      !formData.reason
    ) {
      alert(
        "Please fill in all required fields."
      );
      return;
    }

    try {
      setSubmitting(true);

      // Generate queue number like A043
      const randomNumber = Math.floor(
        100 + Math.random() * 900
      );

      const queueNumber = `A${randomNumber}`;

      const newPatient = {
        name: formData.name,
        age: Number(formData.age),
        gender: formData.gender,
        phone: formData.phone,
        address: formData.address,
        department: formData.department,
        reason: formData.reason,
        symptoms: formData.symptoms,
        duration: formData.duration,
        medicalConditions:
          formData.medicalConditions,
        allergies: formData.allergies,
        emergencyContact:
          formData.emergencyContact,
        queueNumber,
        status: "Waiting",
      };

      // Save through API
      const savedPatient =
        await addPatient(newPatient);

      alert(
        `Registration successful!\n\nYour queue number is ${queueNumber}`
      );

      // Go to queue and pass the newly registered patient
      navigate("/queue", {
        state: {
          newPatient: savedPatient,
        },
      });

    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      alert(
        "Could not register patient. Please make sure the API is running."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="register-page">

      <section className="register-card">

        <p className="register-label">
          MEDIQUEUE
        </p>

        <h1>Register Patient</h1>

        <p className="register-subtitle">
          Enter the patient's information to join
          the hospital queue.
        </p>

        <form onSubmit={handleSubmit}>

          {/* =========================
              PERSONAL INFORMATION
          ========================= */}

          <div className="form-section">

            <h2>Personal Information</h2>

            <p>
              Please provide the patient's basic
              information.
            </p>

          </div>

          <div className="register-grid">

            {/* FULL NAME */}

            <div className="form-group">

              <label>
                Full Name <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter patient's full name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>


            {/* AGE */}

            <div className="form-group">

              <label>
                Age <span>*</span>
              </label>

              <input
                type="number"
                name="age"
                min="0"
                max="120"
                placeholder="Enter age"
                value={formData.age}
                onChange={handleChange}
              />

            </div>


            {/* GENDER */}

            <div className="form-group">

              <label>
                Gender <span>*</span>
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >

                <option value="">
                  Select gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            {/* PHONE */}

            <div className="form-group">

              <label>
                Phone Number <span>*</span>
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="08012345678"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>


            {/* EMERGENCY CONTACT */}

            <div className="form-group">

              <label>
                Emergency Contact
              </label>

              <input
                type="tel"
                name="emergencyContact"
                placeholder="Emergency contact number"
                value={
                  formData.emergencyContact
                }
                onChange={handleChange}
              />

            </div>


            {/* ADDRESS */}

            <div className="form-group full-width">

              <label>
                Address
              </label>

              <input
                type="text"
                name="address"
                placeholder="Enter patient's address"
                value={formData.address}
                onChange={handleChange}
              />

            </div>

          </div>


          {/* =========================
              MEDICAL INFORMATION
          ========================= */}

          <div className="form-section medical-section">

            <h2>Medical Information</h2>

            <p>
              Tell us about the reason for the
              patient's visit.
            </p>

          </div>

          <div className="register-grid">

            {/* DEPARTMENT */}

            <div className="form-group">

              <label>
                Department <span>*</span>
              </label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
              >

                <option value="">
                  Select department
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


            {/* DURATION */}

            <div className="form-group">

              <label>
                How Long?
              </label>

              <input
                type="text"
                name="duration"
                placeholder="e.g. 3 days, 2 weeks"
                value={formData.duration}
                onChange={handleChange}
              />

            </div>


            {/* REASON */}

            <div className="form-group full-width">

              <label>
                Reason for Visit <span>*</span>
              </label>

              <input
                type="text"
                name="reason"
                placeholder="What brings the patient to the hospital?"
                value={formData.reason}
                onChange={handleChange}
              />

            </div>


            {/* SYMPTOMS */}

            <div className="form-group full-width">

              <label>
                Symptoms
              </label>

              <textarea
                name="symptoms"
                rows="4"
                placeholder="Describe the patient's symptoms..."
                value={formData.symptoms}
                onChange={handleChange}
              />

            </div>


            {/* MEDICAL CONDITIONS */}

            <div className="form-group full-width">

              <label>
                Existing Medical Conditions
              </label>

              <textarea
                name="medicalConditions"
                rows="3"
                placeholder="e.g. Diabetes, Asthma, Hypertension, or None"
                value={
                  formData.medicalConditions
                }
                onChange={handleChange}
              />

            </div>


            {/* ALLERGIES */}

            <div className="form-group full-width">

              <label>
                Allergies
              </label>

              <textarea
                name="allergies"
                rows="3"
                placeholder="List any known allergies or enter None"
                value={formData.allergies}
                onChange={handleChange}
              />

            </div>

          </div>


          {/* =========================
              BUTTON
          ========================= */}

          <div className="form-button">

            <button
              type="submit"
              disabled={submitting}
            >

              {submitting
                ? "Registering Patient..."
                : "Get Queue Number →"}

            </button>

          </div>

        </form>


        <p className="register-note">

          <strong>*</strong> Required fields.
          Patient information is only used for
          queue management and hospital visit
          records.

        </p>

      </section>

    </main>
  );
}

export default Register;