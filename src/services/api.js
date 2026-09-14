const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getPatients() {
  const response = await fetch(`${API_URL}/patients`);

  if (!response.ok) {
    throw new Error("Failed to load patients");
  }

  return response.json();
}

export async function addPatient(patient) {
  const response = await fetch(`${API_URL}/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patient),
  });

  if (!response.ok) {
    throw new Error("Failed to register patient");
  }

  return response.json();
}

export async function updatePatient(id, updates) {
  const response = await fetch(`${API_URL}/patients/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update patient");
  }

  return response.json();
}

export async function deletePatient(id) {
  const response = await fetch(`${API_URL}/patients/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete patient");
  }
}