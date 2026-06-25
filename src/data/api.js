const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getCameraGroups() {
  const res = await fetch(`${API_BASE_URL}/api/camera-groups`);
  return res.json();
}

export async function createCameraGroup(payload) {
  const res = await fetch(`${API_BASE_URL}/api/camera-groups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
}

export async function deleteCameraGroup(groupId) {
  const res = await fetch(`${API_BASE_URL}/api/camera-groups/${groupId}`, {
    method: "DELETE",
  });

  return res.json();
}

export async function getCameras() {
  const res = await fetch(`${API_BASE_URL}/api/cameras`);
  return res.json();
}

export async function createCamera(payload) {
  const res = await fetch(`${API_BASE_URL}/api/cameras`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
}

export async function deleteCamera(cameraId) {
  const res = await fetch(`${API_BASE_URL}/api/cameras/${cameraId}`, {
    method: "DELETE",
  });

  return res.json();
}

// Normal camera stream
export function getCameraStreamUrl(cameraId) {
  return `${API_BASE_URL}/api/cameras/${cameraId}/stream`;
}

// YOLO detection stream
export function getCameraDetectionStreamUrl(cameraId, ppeFilter = "all") {
  return `${API_BASE_URL}/api/cameras/${cameraId}/detection-stream?ppe_filter=${ppeFilter}`;
}

// Detection stats for camera card
export async function getCameraDetectionStats(cameraId) {
  const res = await fetch(
    `${API_BASE_URL}/api/cameras/${cameraId}/detection-stats`
  );

  return res.json();
}

// Start backend recording for one camera
export async function startCameraRecording(cameraId) {
  const res = await fetch(
    `${API_BASE_URL}/api/cameras/${cameraId}/recording/start`,
    {
      method: "POST",
    }
  );

  return res.json();
}

// Stop backend recording for one camera
export async function stopCameraRecording(cameraId) {
  const res = await fetch(
    `${API_BASE_URL}/api/cameras/${cameraId}/recording/stop`,
    {
      method: "POST",
    }
  );

  return res.json();
}

// Create full download URL for recorded video
export function getRecordingDownloadUrl(downloadUrl) {
  return `${API_BASE_URL}${downloadUrl}`;
}

// =========================================================
// Face Enrollment Recognition APIs
// =========================================================

// Start face recognition detection
export async function startFaceRecognition(cameraId) {
  const res = await fetch(
    `${API_BASE_URL}/api/face-enrollment/${cameraId}/recognition/start`,
    {
      method: "POST",
    }
  );

  return res.json();
}

// Stop face recognition detection
export async function stopFaceRecognition(cameraId) {
  const res = await fetch(
    `${API_BASE_URL}/api/face-enrollment/${cameraId}/recognition/stop`,
    {
      method: "POST",
    }
  );

  return res.json();
}

// Get face recognition ON/OFF status
export async function getFaceRecognitionStatus(cameraId) {
  const res = await fetch(
    `${API_BASE_URL}/api/face-enrollment/${cameraId}/recognition/status`
  );

  return res.json();
}

// Face recognition stream with boundary box
export function getFaceRecognitionStreamUrl(cameraId) {
  return `${API_BASE_URL}/api/face-enrollment/${cameraId}/recognition-stream`;
}

export async function captureFace(cameraId) {
  const res = await fetch(
    `${API_BASE_URL}/api/face-enrollment/${cameraId}/capture`,
    {
      method: "POST",
    }
  );

  return res.json();
}

export async function importFaces(files) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const res = await fetch(`${API_BASE_URL}/api/face-enrollment/import`, {
    method: "POST",
    body: formData,
  });

  return res.json();
}

// =========================================================
// Face Enrollment Master Data APIs
// =========================================================

export async function getDepartments() {
  const res = await fetch(`${API_BASE_URL}/api/departments`);
  return res.json();
}

export async function createDepartment(payload) {
  const res = await fetch(`${API_BASE_URL}/api/departments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
}

export async function deleteDepartment(departmentId) {
  const res = await fetch(`${API_BASE_URL}/api/departments/${departmentId}`, {
    method: "DELETE",
  });

  return res.json();
}

export async function getRoles() {
  const res = await fetch(`${API_BASE_URL}/api/roles`);
  return res.json();
}

export async function createRole(payload) {
  const res = await fetch(`${API_BASE_URL}/api/roles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
}

export async function deleteRole(roleId) {
  const res = await fetch(`${API_BASE_URL}/api/roles/${roleId}`, {
    method: "DELETE",
  });

  return res.json();
}

// =========================================================
// Face Enrollment Save Person API
// =========================================================

export async function enrollFacePerson(payload) {
  const res = await fetch(`${API_BASE_URL}/api/face-enrollment/enroll`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
}