import {
  AlertTriangle,
  CheckCircle,
  CircleDot,
  Power,
  Video,
} from "lucide-react";

export const stats = [
  {
    title: "Total Cameras",
    value: "12",
    sub: "Configured",
    color: "bg-blue-600",
    icon: Video,
  },
  {
    title: "Online",
    value: "9",
    sub: "75% of total",
    color: "bg-green-600",
    icon: CheckCircle,
  },
  {
    title: "Offline",
    value: "3",
    sub: "25% of total",
    color: "bg-red-500",
    icon: Power,
  },
  {
    title: "Recording",
    value: "8",
    sub: "66% of total",
    color: "bg-orange-500",
    icon: CircleDot,
  },
];

export const cameras = [
  ["Camera 1 - Gate", "Main Gate", "Entrance", "RTSP", "Online", "18", "REC", "Just now", "—"],
  ["Camera 2 - Parking", "Parking Area", "North Zone", "RTSP", "Offline", "0", "OFF", "2 min ago", "No Signal"],
  ["Camera 3 - Warehouse", "Warehouse", "Warehouse 1", "RTSP", "Online", "17", "REC", "Just now", "—"],
  ["Camera 4 - Entrance", "Main Gate", "Employee Entry", "RTSP", "Lagging", "8", "REC", "10 sec ago", "High Latency"],
  ["Camera 5 - Office", "Admin Block", "2nd Floor", "Webcam", "Online", "15", "OFF", "Just now", "—"],
  ["Camera 6 - Canteen", "Canteen", "Canteen Area", "RTSP", "Offline", "0", "OFF", "5 min ago", "No Signal"],
  ["Camera 7 - Exit", "Main Gate", "Exit Gate", "RTSP", "Connecting", "—", "OFF", "Connecting...", "Connecting"],
  ["Camera 8 - Store", "Warehouse", "Store Room", "RTSP", "Online", "16", "REC", "Just now", "—"],
];

export const issues = [
  ["Camera 2 - Parking", "No signal detected", "2 min ago", "danger", AlertTriangle],
  ["Camera 4 - Entrance", "High latency detected", "10 sec ago", "warn", AlertTriangle],
  ["Camera 6 - Canteen", "Not recording", "5 min ago", "danger", AlertTriangle],
  ["Camera 7 - Exit", "Still connecting", "1 min ago", "info", AlertTriangle],
  ["Camera 9 - Office", "Stream unstable", "3 min ago", "warn", AlertTriangle],
  ["Camera 10 - Gate", "Low FPS detected", "6 min ago", "warn", AlertTriangle],
];

export const groups = [
  ["Main Gate", 3],
  ["Parking Area", 2],
  ["Warehouse", 3],
  ["Admin Block", 2],
  ["Canteen", 1],
  ["Others", 1],
  ["Factory Floor", 4],
  ["Entry Zone", 2],
];