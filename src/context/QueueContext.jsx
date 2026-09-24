import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getPatients,
  addPatient as addPatientToApi,
  updatePatient,
  deletePatient,
} from "../services/api";

const QueueContext = createContext();

export function QueueProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load patients from API
  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        console.error("Error loading patients:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  // Register patient
  const addPatient = async (newPatient) => {
    try {
      const savedPatient = await addPatientToApi(newPatient);

      setPatients((currentPatients) => [
        ...currentPatients,
        savedPatient,
      ]);

      return savedPatient;
    } catch (error) {
      console.error("Error adding patient:", error);
      throw error;
    }
  };

  // Update patient status
  const updatePatientStatus = async (id, status) => {
    try {
      const updatedPatient = await updatePatient(id, {
        status,
      });

      setPatients((currentPatients) =>
        currentPatients.map((patient) =>
          String(patient.id) === String(id)
            ? updatedPatient
            : patient
        )
      );

      return updatedPatient;
    } catch (error) {
      console.error("Error updating patient:", error);
      throw error;
    }
  };

  // Delete patient
  const removePatient = async (id) => {
    try {
      await deletePatient(id);

      setPatients((currentPatients) =>
        currentPatients.filter(
          (patient) => String(patient.id) !== String(id)
        )
      );
    } catch (error) {
      console.error("Error deleting patient:", error);
      throw error;
    }
  };

  // Clear entire queue
  const clearQueue = async () => {
    try {
      await Promise.all(
        patients.map((patient) =>
          deletePatient(patient.id)
        )
      );

      setPatients([]);
    } catch (error) {
      console.error("Error clearing queue:", error);
      throw error;
    }
  };

  return (
    <QueueContext.Provider
      value={{
        patients,
        loading,
        addPatient,
        updatePatientStatus,
        removePatient,
        clearQueue,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  return useContext(QueueContext);
}