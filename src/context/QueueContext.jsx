```javascript
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase";

import {
  addPatient as addPatientToApi,
  updatePatient,
  deletePatient,
} from "../services/api";

const QueueContext = createContext();

export function QueueProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase in real time
  useEffect(() => {
    const patientsCollection = collection(db, "patients");

    const unsubscribe = onSnapshot(
      patientsCollection,
      (snapshot) => {
        const patientsData = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setPatients(patientsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading patients:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Register patient
  const addPatient = async (newPatient) => {
    try {
      const savedPatient = await addPatientToApi(newPatient);

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
```
