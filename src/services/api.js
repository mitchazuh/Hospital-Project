import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase";

const patientsCollection = collection(db, "patients");

// Get all patients
export const getPatients = async () => {
  const snapshot = await getDocs(patientsCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Add a patient
export const addPatient = async (patient) => {
  const docRef = await addDoc(patientsCollection, patient);

  return {
    id: docRef.id,
    ...patient,
  };
};

// Update a patient
export const updatePatient = async (id, updates) => {
  const patientRef = doc(db, "patients", id);

  await updateDoc(patientRef, updates);

  return {
    id,
    ...updates,
  };
};

// Delete a patient
export const deletePatient = async (id) => {
  const patientRef = doc(db, "patients", id);

  await deleteDoc(patientRef);

  return id;
};