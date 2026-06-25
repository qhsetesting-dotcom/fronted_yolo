export const stats = [
  { title: "PERSONS", value: "120", sub: "Live Count", change: "↑ 15.6%", tone: "blue" },
  { title: "FACES", value: "85", sub: "Live Count", change: "↑ 12.4%", tone: "green" },
  { title: "FPS", value: "20.1", sub: "Stable", change: "", tone: "purple" },
  { title: "VIOLATIONS (TODAY)", value: "26", sub: "Today", change: "↑ 30.0% vs yesterday", tone: "orange" }
];

export const cameras = [
  { title: "Camera 1 - Gate", persons: 12, violations: 1, scene: "gate", labels: [{ text: "Helmet, Vest", ok: true, left: "43%", top: "16%" }] },
  { title: "Camera 2 - Parking", persons: 8, violations: 2, scene: "parking", labels: [{ text: "Helmet, Vest", ok: true, left: "40%", top: "18%" }, { text: "Helmet, Vest", ok: true, left: "62%", top: "20%" }, { text: "No Vest", ok: false, left: "82%", top: "18%" }] },
  { title: "Camera 3 - Warehouse", persons: 10, violations: 0, scene: "warehouse", labels: [{ text: "Helmet, Vest", ok: true, left: "38%", top: "20%" }, { text: "Helmet, Vest", ok: true, left: "58%", top: "20%" }] },
  { title: "Camera 4 - Entrance", persons: 6, violations: 1, scene: "entrance", labels: [{ text: "Helmet Missing", ok: false, left: "57%", top: "15%" }] }
];

export const events = [
  ["23 Apr 2026 12:04:32 PM", "Camera 2 - Parking", "Vest Missing", "Amit Singh", "Yes", "No", "EMP1023"],
  ["23 Apr 2026 12:03:45 PM", "Camera 4 - Entrance", "Helmet Missing", "Unknown Person", "No", "Yes", "N/A"],
  ["23 Apr 2026 12:03:12 PM", "Camera 1 - Gate", "No PPE", "Ramesh Kumar", "No", "No", "EMP1001"],
  ["23 Apr 2026 12:02:18 PM", "Camera 3 - Warehouse", "Unauthorized Access", "Unknown Person", "No", "No", "N/A"],
  ["23 Apr 2026 12:03:12 PM", "Camera 1 - Gate", "No PPE", "Ramesh Kumar", "No", "No", "EMP1001"],
  ["23 Apr 2026 12:03:12 PM", "Camera 1 - Gate", "No PPE", "Ramesh Kumar", "No", "No", "EMP1001"]
];

export const alerts = [
  ["Helmet Missing", "Gate 2", "Now", "warn"],
  ["Vest Missing", "Warehouse", "10s ago", "warn"],
  ["No PPE", "Gate 1", "25s ago", "danger"],
  ["Unauthorized Access", "Warehouse", "45s ago", "warn"],
  ["No PPE", "Gate 1", "25s ago", "danger"],
];

