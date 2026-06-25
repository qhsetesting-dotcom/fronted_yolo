import {
  AlertCircle,
  AlertTriangle,
  CalendarDays,
  Camera,
  Mail,
  Monitor,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";

export const sidebarItems = [
  { label: "Dashboard", icon: Monitor },
  { label: "Live Monitoring", icon: Camera },
  { label: "Camera Management", icon: Camera },
  { label: "Face & Dataset", icon: Users, active: true },
  { label: "Email Settings", icon: Mail },
];

export const enrollmentStats = [
  {
    title: "Total Enrolled Faces",
    value: "1,248",
    sub: "All Time",
    change: "12.6%",
    changeText: "vs yesterday",
    negative: false,
    color: "bg-blue-600",
    icon: Users,
  },
  {
    title: "Active Personnel",
    value: "1,156",
    sub: "Currently Active",
    change: "8.3%",
    changeText: "vs yesterday",
    negative: false,
    color: "bg-emerald-600",
    icon: User,
  },
  {
    title: "Today's Enrollments",
    value: "24",
    sub: "Today",
    change: "14.3%",
    changeText: "vs yesterday",
    negative: false,
    color: "bg-indigo-600",
    icon: CalendarDays,
  },
  {
    title: "Failed Attempts",
    value: "2.1%",
    sub: "Failure Rate",
    change: "0.6%",
    changeText: "vs yesterday",
    negative: true,
    color: "bg-yellow-500",
    icon: ShieldCheck,
  },
];

export const cameraSources = [
  {
    id: "rtsp",
    name: "RTSP Camera",
    cameraName: "Camera 1 - Gate",
    url: "rtsp://192.168.1.10/stream",
    status: "Live",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "webcam",
    name: "Webcam",
    cameraName: "Camera 2 - Parking",
    url: "Logitech HD Pro Webcam C920",
    status: "Idle",
    image:
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1200&auto=format&fit=crop",
  },
];

export const capturedImages = [
  { id: 1, status: "Good", bad: false },
  { id: 2, status: "Good", bad: false },
  { id: 3, status: "Good", bad: false },
  { id: 4, status: "Good", bad: false },
  { id: 5, status: "Blurry", bad: true },
];

export const recognitionStats = [
  { label: "Active Faces", value: "1,156", color: "bg-emerald-500" },
  { label: "Unknown Detections", value: "52", color: "bg-yellow-400" },
  { label: "Failed Matches", value: "29", color: "bg-red-500" },
  { label: "Offline Cameras", value: "2", color: "bg-blue-500" },
];

export const alerts = [
  {
    id: 1,
    title: "Duplicate Face Detected",
    desc: "Amit Singh (EMP1023)",
    time: "2m ago",
    type: "warn",
    icon: AlertTriangle,
  },
  {
    id: 2,
    title: "Poor Quality Capture",
    desc: "Camera 3 - Warehouse",
    time: "12m ago",
    type: "danger",
    icon: AlertCircle,
  },
  {
    id: 3,
    title: "Face Not Detected",
    desc: "Camera 2 - Parking",
    time: "18m ago",
    type: "warn",
    icon: AlertTriangle,
  },
  {
    id: 4,
    title: "New Enrollment",
    desc: "Ramesh Kumar (EMP1001)",
    time: "25m ago",
    type: "info",
    icon: AlertCircle,
  },
];

export const emptyPersonForm = {
  fullName: "Amit Singh",
  employeeId: "EMP1023",
  department: "Operations",
  role: "Worker",
  mobile: "9876543210",
  email: "amit.singh@company.com",
};

export const recentEnrollmentLogs = [
  {
    id: 1,
    time: "23 Apr 2026 12:05:32 PM",
    name: "Amit Singh",
    employeeId: "EMP1023",
    camera: "Camera 1 - Gate",
    status: "Enrolled",
    score: "92%",
    action: "View",
  },
  {
    id: 2,
    time: "23 Apr 2026 12:03:45 PM",
    name: "Ramesh Kumar",
    employeeId: "EMP1001",
    camera: "Camera 4 - Entrance",
    status: "Enrolled",
    score: "88%",
    action: "View",
  },
  {
    id: 3,
    time: "23 Apr 2026 12:01:12 PM",
    name: "Vikash Yadav",
    employeeId: "EMP1004",
    camera: "Camera 1 - Gate",
    status: "Failed",
    score: "42%",
    action: "Re-enroll",
  },
  {
    id: 4,
    time: "23 Apr 2026 11:59:08 AM",
    name: "Suresh Patel",
    employeeId: "EMP1008",
    camera: "Camera 3 - Warehouse",
    status: "Enrolled",
    score: "90%",
    action: "View",
  },
  {
    id: 5,
    time: "23 Apr 2026 11:56:21 AM",
    name: "Deepak Sharma",
    employeeId: "EMP1011",
    camera: "Camera 2 - Parking",
    status: "Enrolled",
    score: "85%",
    action: "View",
  },
   {
    id: 2,
    time: "23 Apr 2026 12:03:45 PM",
    name: "Ramesh Kumar",
    employeeId: "EMP1001",
    camera: "Camera 4 - Entrance",
    status: "Enrolled",
    score: "88%",
    action: "View",
  },
];