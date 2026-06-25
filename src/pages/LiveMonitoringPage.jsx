import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import {
  AlertTriangle,
  Bell,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Expand,
  Flag,
  Grid2X2,
  Info,
  Maximize2,
  PlayCircle,
  Square,
  Users,
  Video,
} from "lucide-react";

import {
  getCameras,
  getCameraStreamUrl,
  getCameraDetectionStreamUrl,
  getCameraDetectionStats,
  startCameraRecording,
  stopCameraRecording,
  getRecordingDownloadUrl,
} from "../data/api";

const defaultSlotData = [
  {
    id: 1,
    name: "Camera Slot 1",
    feedUrl: "",
    persons: 12,
    violations: 1,
    fps: 26,
    ppeStatus: "ok",
    labels: [],
  },
  {
    id: 2,
    name: "Camera Slot 2",
    feedUrl: "",
    persons: 8,
    violations: 2,
    fps: 24,
    ppeStatus: "ok",
    labels: [],
  },
  {
    id: 3,
    name: "Camera Slot 3",
    feedUrl: "",
    persons: 10,
    violations: 0,
    fps: 25,
    ppeStatus: "ok",
    labels: [],
  },
  {
    id: 4,
    name: "Camera Slot 4",
    feedUrl: "",
    persons: 6,
    violations: 1,
    fps: 23,
    ppeStatus: "danger",
    labels: [],
  },
];


const alerts = [
  {
    type: "critical",
    title: "No PPE Detected",
    camera: "Camera 2 - Parking",
    date: "23 Apr 2026",
    time: "12:06:21 PM",
  },
  {
    type: "warning",
    title: "Helmet Missing",
    camera: "Camera 4 - Entrance",
    date: "23 Apr 2026",
    time: "12:06:09 PM",
  },
  {
    type: "warning",
    title: "Vest Missing",
    camera: "Camera 1 - Gate",
    date: "23 Apr 2026",
    time: "12:05:58 PM",
  },
  {
    type: "info",
    title: "Unauthorized Access",
    camera: "Camera 3 - Warehouse",
    date: "23 Apr 2026",
    time: "12:05:45 PM",
  },
  {
    type: "critical",
    title: "No Helmet, No Vest",
    camera: "Camera 3 - Warehouse",
    date: "23 Apr 2026",
    time: "12:05:30 PM",
  },
];

const timeline = [
  {
    time: "12:06 PM",
    title: "No PPE Detected",
    camera: "Camera 2 - Parking",
    type: "critical",
  },
  {
    time: "12:06 PM",
    title: "Helmet Missing",
    camera: "Camera 4 - Entrance",
    type: "warning",
  },
  {
    time: "12:05 PM",
    title: "Vest Missing",
    camera: "Camera 1 - Gate",
    type: "warning",
  },
  {
    time: "12:05:45",
    title: "Unauthorized Access",
    camera: "Camera 3 - Warehouse",
    type: "info",
  },
  {
    time: "12:05:30",
    title: "No Helmet, No Vest",
    camera: "Camera 3 - Warehouse",
    type: "critical",
  },
];

const cameraHealth = [
  ["Camera 1 - Gate", "Online", "26", "120 ms"],
  ["Camera 2 - Parking", "Online", "24", "110 ms"],
  ["Camera 3 - Warehouse", "Online", "25", "115 ms"],
  ["Camera 4 - Entrance", "Online", "23", "118 ms"],
];

function typeStyle(type) {
  if (type === "critical")
    return { iconBg: "bg-red-600", text: "text-red-500" };
  if (type === "warning")
    return { iconBg: "bg-yellow-500", text: "text-yellow-400" };
  return { iconBg: "bg-blue-600", text: "text-blue-500" };
}

function OnSwitch() {
  return (
    <span className="flex shrink-0 items-center gap-1 text-[9px] text-white">
      <span className="relative h-[15px] w-[28px] rounded-full bg-emerald-600">
        <span className="absolute right-[3px] top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-white" />
      </span>
      ON
    </span>
  );
}

function FeedView({ src, title, fullscreenType = null }) {
  const heightClass =
    fullscreenType === "single"
      ? "h-[calc(100vh-150px)]"
      : fullscreenType === "all"
      ? "h-[calc((100vh-190px)/2)]"
      : "h-[120px] xl:h-[132px] 2xl:h-[150px]";

  return (
    <div className={`relative overflow-hidden bg-black ${heightClass}`}>
      {src ? (
        <img
          key={src}
          src={src}
          alt={title}
          className="h-full w-full object-cover opacity-80"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#050f19] text-[10px] text-white/35">
          Select camera to connect
        </div>
      )}

      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}

function getPpeFilterFromEvents(events) {
  if (events.includes("All Events")) return "all";

  const hasHelmet = events.includes("Helmet Missing");
  const hasVest = events.includes("Vest Missing");

  if (hasHelmet && !hasVest) return "helmet";
  if (hasVest && !hasHelmet) return "vest";

  return "all";
}

function CameraCard({
  slotIndex,
  camera,
  cameraList,
  selectedCameraId,
  onCameraChange,
  isRecognitionActive,
  onStartRecognition,
  onStopRecognition,
  cameraStats,
  onToggleRecording,
  recordingLoadingId,
  selectedEvents = ["All Events"],
  fullscreenType = null,
  onToggleFullscreen,
}) {
  const selectedCamera = cameraList.find(
    (item) => Number(item.id) === Number(selectedCameraId)
  );

  const displayName =
    selectedCamera?.camera_name || selectedCamera?.name || camera.name;

  const ppeFilter = getPpeFilterFromEvents(selectedEvents);

  const streamUrl = selectedCameraId
    ? isRecognitionActive
      ? getCameraDetectionStreamUrl(selectedCameraId, ppeFilter)
      : getCameraStreamUrl(selectedCameraId)
    : "";

  const stats = selectedCameraId ? cameraStats[selectedCameraId] || {} : {};

  const persons = streamUrl ? Number(stats.persons || 0) : 0;
  const violations = streamUrl ? Number(stats.violations || 0) : 0;
  const fps = streamUrl ? Number(stats.fps || 0) : 0;
  const isRecording = Boolean(stats.recording);
  const isRecordingLoading =
    selectedCameraId && Number(recordingLoadingId) === Number(selectedCameraId);

  return (
    <section
      className={`min-w-0 overflow-hidden rounded-md border border-[#1b344d] bg-[#061421] ${
        fullscreenType ? "h-full" : ""
      }`}
    >
      <div className="flex min-h-[32px] items-center justify-between gap-1 px-2 py-1">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-blue-600 text-[10px] font-bold text-white">
            {slotIndex + 1}
          </span>

          <select
            value={selectedCameraId || ""}
            onChange={(e) => onCameraChange(slotIndex, e.target.value)}
            className="h-6 w-full min-w-[92px] max-w-[170px] rounded border border-[#1b344d] bg-[#03101d] px-2 text-[10px] text-white outline-none focus:border-blue-500"
          >
            <option value="">Select Camera</option>

            {cameraList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.camera_name || item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-end gap-1">
          <span className="flex items-center gap-1 text-[9px] font-medium text-white">
            <span
              className={`h-2 w-2 rounded-full ${
                selectedCameraId ? "bg-emerald-500" : "bg-red-500"
              }`}
            />
            {selectedCameraId ? "LIVE" : "OFF"}
          </span>

          <button
            type="button"
            title="Start Recognition"
            disabled={!selectedCameraId || isRecognitionActive}
            onClick={() => onStartRecognition(slotIndex, selectedCameraId)}
            className={`flex h-6 items-center gap-1 rounded-md border px-1.5 text-[8px] font-bold text-white disabled:cursor-not-allowed disabled:border-[#1b344d] disabled:bg-[#03101d] disabled:text-white ${
              isRecognitionActive
                ? "border-emerald-700/70 bg-emerald-700"
                : "border-emerald-700/70 bg-emerald-700 hover:bg-emerald-600"
            }`}
          >
            <PlayCircle size={11} className="shrink-0" />
            <span className="whitespace-nowrap">
              {isRecognitionActive ? "Running" : "Start"}
            </span>
          </button>

          <button
            type="button"
            title="Stop Recognition"
            disabled={!selectedCameraId || !isRecognitionActive}
            onClick={() => onStopRecognition(slotIndex, selectedCameraId)}
            className={`flex h-6 items-center gap-1 rounded-md border px-1.5 text-[8px] font-bold text-white disabled:cursor-not-allowed disabled:border-gray-700 disabled:bg-gray-700 disabled:text-white ${
              isRecognitionActive
                ? "border-red-700/70 bg-red-700 hover:bg-red-600"
                : "border-gray-700 bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <Square size={9} className="shrink-0" />
            <span className="whitespace-nowrap">Stop</span>
          </button>

          <button
            type="button"
            title={fullscreenType === "single" ? "Exit Fullscreen" : "Fullscreen"}
            onClick={() => onToggleFullscreen(slotIndex)}
            className="grid h-6 w-6 place-items-center rounded-md border border-[#1b344d] bg-[#03101d] text-white/85 hover:bg-[#0b2238]"
          >
            <Expand size={12} />
          </button>
        </div>
      </div>

      <div className="relative">
        <FeedView
          src={streamUrl}
          title={displayName}
          fullscreenType={fullscreenType}
        />
      </div>

      <div className="grid h-[38px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)_60px_86px] items-center bg-[#061421]/95 px-2">
        <div className="flex min-w-0 items-center gap-1.5 overflow-hidden">
          <Users size={15} className="shrink-0 text-blue-500" />

          <div className="min-w-0 leading-tight">
            <p className="truncate text-[10px] text-white">{persons}</p>
            <p className="truncate text-[9px] text-white/65">Persons</p>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-1.5 overflow-hidden">
          {streamUrl && violations === 0 ? (
            <CheckCircle2 size={15} className="shrink-0 text-emerald-500" />
          ) : (
            <AlertTriangle size={15} className="shrink-0 text-yellow-400" />
          )}

          <div className="min-w-0 leading-tight">
            <p className="truncate text-[10px] text-white">{violations}</p>
            <p className="truncate text-[9px] text-white/65">Violations</p>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-1 text-[9px] text-white/85">
          <span className="truncate">FPS: {fps}</span>
        </div>

        <button
          type="button"
          disabled={!selectedCameraId}
          onClick={() => onToggleRecording(selectedCameraId)}
          className={`flex h-6 items-center gap-1 rounded-md border px-1.5 text-[8px] font-bold text-white disabled:cursor-not-allowed disabled:border-gray-700 disabled:bg-gray-700 ${
            stats.recording
              ? "border-red-700/70 bg-red-700 hover:bg-red-600"
              : "border-gray-700 bg-gray-700 hover:bg-gray-600"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              stats.recording ? "bg-red-500 animate-pulse" : "bg-white/40"
            }`}
          />
          {stats.recording ? "Stop REC" : "REC"}
        </button>
      </div>
    </section>
  );
}

function ToggleButton({ label }) {
  return (
    <button className="flex h-[36px] min-w-0 items-center justify-between gap-2 rounded-md border border-[#1b344d] bg-[#061421] px-3 text-[10px] text-white hover:bg-[#0b2238]">
      <span title={label} className="truncate">
        {label}
      </span>

      <OnSwitch />
    </button>
  );
}

function ActiveViolation() {
  return (
    <section className="rounded-md border border-[#1b344d] bg-[#061421]">
      <div className="grid min-w-0 grid-cols-[155px_minmax(0,1fr)_112px] gap-3 p-3 2xl:grid-cols-[185px_minmax(0,1fr)_125px]">
        <div className="relative h-[120px] min-w-0 overflow-hidden rounded-sm bg-black 2xl:h-[130px]">
          <div className="flex h-full w-full items-center justify-center bg-[#050f19] text-[10px] text-white/35">
            Violation snapshot
          </div>

          <span className="absolute left-2 top-0 rounded bg-red-600 px-2 py-0.5 text-[9px] font-semibold text-white">
            Active Violation
          </span>

          <span className="absolute left-[48px] top-[28px] rounded bg-red-600 px-2 py-0.5 text-[9px] font-semibold text-white">
            Helmet Missing
          </span>
        </div>

        <div className="grid min-w-0 grid-cols-3 gap-2">
          <div className="min-w-0 border-r border-[#1b344d] pr-2">
            <p className="mb-2 truncate text-[9px] text-white/65">
              Event Details
            </p>

            <div className="space-y-2.5">
              <div className="flex min-w-0 gap-1.5">
                <AlertTriangle
                  size={12}
                  className="mt-1 shrink-0 text-red-500"
                />

                <div className="min-w-0">
                  <p className="truncate text-[8px] text-white/55">
                    Detected Issue
                  </p>
                  <p
                    title="Helmet Missing"
                    className="truncate text-[9px] font-semibold text-red-500 2xl:text-[10px]"
                  >
                    Helmet Missing
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 gap-1.5">
                <Camera size={12} className="mt-1 shrink-0 text-white/75" />

                <div className="min-w-0">
                  <p className="truncate text-[8px] text-white/55">Camera</p>
                  <p
                    title="Camera 4 - Entrance"
                    className="truncate text-[9px] text-white 2xl:text-[10px]"
                  >
                    Camera 4 - Entrance
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 gap-1.5">
                <Grid2X2 size={12} className="mt-1 shrink-0 text-white/75" />

                <div className="min-w-0">
                  <p className="truncate text-[8px] text-white/55">Zone</p>
                  <p
                    title="Entrance Zone"
                    className="truncate text-[9px] text-white 2xl:text-[10px]"
                  >
                    Entrance Zone
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-0 border-r border-[#1b344d] pr-2">
            <p className="truncate text-[8px] text-white/55">Event Time</p>
            <p
              title="23 Apr 2026 | 12:06:10 PM"
              className="mb-2 truncate text-[9px] text-white 2xl:text-[10px]"
            >
              23 Apr 2026 | 12:06:10 PM
            </p>

            <p className="truncate text-[8px] text-white/55">Duration</p>
            <p className="mb-2 text-[9px] text-white 2xl:text-[10px]">
              00:00:08
            </p>

            <p className="truncate text-[8px] text-white/55">
              Confidence Score
            </p>
            <p className="text-[9px] text-white 2xl:text-[10px]">92%</p>

            <div className="mt-1 h-1.5 rounded bg-white/10">
              <div className="h-full w-[92%] rounded bg-emerald-500" />
            </div>

            <p className="mt-2 truncate text-[8px] text-white/55">AI Model</p>
            <p
              title="YOLOv8 + PPE Model"
              className="truncate text-[9px] text-white 2xl:text-[10px]"
            >
              YOLOv8 + PPE Model
            </p>
          </div>

          <div className="min-w-0">
            <p className="mb-2 truncate text-[9px] text-white/65">
              Person Details
            </p>

            <div className="flex min-w-0 gap-2">
              <div className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded bg-[#0b2238] text-[8px] text-white/50">
                Face
              </div>

              <div className="min-w-0 pt-0.5">
                <p
                  title="Unknown Person"
                  className="truncate text-[9px] text-white 2xl:text-[10px]"
                >
                  Unknown Person
                </p>
                <p className="mt-1 truncate text-[8px] text-white/55">
                  No Match Found
                </p>
              </div>
            </div>

            <button className="mt-2 h-[28px] w-[92px] rounded-md border border-[#1b344d] bg-[#041322] text-[9px] text-white hover:bg-[#0b2238]">
              View Details
            </button>
          </div>
        </div>

        <div className="min-w-0 border-l border-[#1b344d] pl-2">
          <p className="mb-2 truncate text-[9px] text-white/65">Actions</p>

          <div className="space-y-1.5">
            {[
              [Camera, "Snapshot"],
              [Video, "Record Clip"],
              [Flag, "Raise Incident"],
              [Bell, "Send Alert"],
            ].map(([Icon, label]) => (
              <button
                key={label}
                title={label}
                className="flex h-[28px] w-full min-w-0 items-center gap-1.5 rounded-md border border-[#1b344d] bg-[#041322] px-2 text-[9px] text-white hover:bg-[#0b2238]"
              >
                <Icon size={12} className="shrink-0 text-white/80" />
                <span className="truncate">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="rounded-md border border-[#1b344d] bg-[#061421] p-3">
      <div className="mb-2 flex items-center gap-2">
        <h3 className="text-[13px] font-medium text-white">
          Live Event Timeline
        </h3>

        <span className="rounded bg-red-600 px-2 py-0.5 text-[9px] font-bold text-white">
          LIVE
        </span>
      </div>

      <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1">
        <button className="grid h-[48px] w-[28px] shrink-0 place-items-center rounded-md border border-[#1b344d] bg-[#041322]">
          <ChevronLeft size={15} />
        </button>

        {timeline.map((item) => {
          const style = typeStyle(item.type);

          return (
            <div
              key={item.title + item.time}
              className="h-[48px] min-w-[138px] rounded-md border border-[#1b344d] bg-[#041322] px-2 py-1.5"
            >
              <p className="truncate text-[9px] text-white">
                {item.time} <span className={style.text}>●</span>{" "}
                <span className={`font-semibold ${style.text}`}>
                  {item.title}
                </span>
              </p>

              <p className="mt-1 truncate text-[9px] text-white/60">
                {item.camera}
              </p>
            </div>
          );
        })}

        <button className="grid h-[48px] w-[28px] shrink-0 place-items-center rounded-md border border-[#1b344d] bg-[#041322]">
          <ChevronRight size={15} />
        </button>
      </div>
    </section>
  );
}

function LiveAlerts() {
  return (
    <section className="min-h-[245px] rounded-md border border-[#1b344d] bg-[#061421]">
      <div className="flex h-[42px] items-center justify-between border-b border-[#1b344d] px-3">
        <h3 className="text-[13px] font-semibold text-white">Live Alerts</h3>

        <button className="text-[10px] text-white/50 hover:text-white">
          View All
        </button>
      </div>

      <div>
        {alerts.map((item) => {
          const style = typeStyle(item.type);

          return (
            <div
              key={item.title + item.time}
              className="grid grid-cols-[16px_minmax(0,1fr)_58px] gap-2 border-b border-[#1b344d] px-2 py-2.5 last:border-b-0"
            >
              <span
                className={`mt-1 grid h-[14px] w-[14px] place-items-center rounded-full text-[8px] font-bold text-white ${style.iconBg}`}
              >
                !
              </span>

              <div className="min-w-0">
                <p className="truncate text-[10px] font-semibold text-white">
                  {item.title}
                </p>
                <p className="mt-0.5 truncate text-[9px] text-white/55">
                  {item.camera}
                </p>
              </div>

              <div className="text-right text-[7.5px] leading-4 text-white/60">
                <p>{item.date}</p>
                <p>{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CameraHealth() {
  return (
    <section className="min-h-[170px] rounded-md border border-[#1b344d] bg-[#061421]">
      <div className="flex h-[42px] items-center justify-between border-b border-[#1b344d] px-3">
        <h3 className="text-[13px] font-medium text-white">Camera Health</h3>

        <button className="flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300">
          View All <ChevronRight size={12} />
        </button>
      </div>

      <div className="overflow-hidden">
        <table className="w-full table-fixed text-left text-[8px]">
          <thead className="bg-[#082136] text-white/70">
            <tr>
              <th className="w-[40%] px-2 py-2 font-medium">Camera</th>
              <th className="w-[24%] px-2 py-2 font-medium">Status</th>
              <th className="w-[14%] px-2 py-2 font-medium">FPS</th>
              <th className="w-[22%] px-2 py-2 font-medium">Latency</th>
            </tr>
          </thead>

          <tbody>
            {cameraHealth.map((row) => (
              <tr key={row[0]} className="border-t border-[#1b344d]">
                <td className="px-2 py-2 text-white/80">
                  <span title={row[0]} className="block truncate">
                    {row[0]}
                  </span>
                </td>

                <td className="px-2 py-2 text-white/80">
                  <span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  {row[1]}
                </td>

                <td className="px-2 py-2 text-white/80">{row[2]}</td>

                <td className="px-2 py-2 text-white/80">
                  <span title={row[3]} className="block truncate">
                    {row[3]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Legend() {
  return (
    <section className="grid min-h-[38px] grid-cols-4 gap-1 rounded-md border border-[#1b344d] bg-[#061421] px-2 py-3 text-[8px] text-white/75">
      <span className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        Critical
      </span>

      <span className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-yellow-500" />
        Warning
      </span>

      <span className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-blue-500" />
        Info
      </span>

      <span className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        Normal
      </span>
    </section>
  );
}

export default function LiveMonitoringPage() {
  const { liveSelectedEvents = ["All Events"] } = useOutletContext() || {};
  const [cameraList, setCameraList] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState(() => {
    try {
      const savedSlots = localStorage.getItem("liveMonitoringSelectedSlots");
      const parsedSlots = savedSlots ? JSON.parse(savedSlots) : null;

      return Array.isArray(parsedSlots) && parsedSlots.length === 4
        ? parsedSlots
        : ["", "", "", ""];
    } catch {
      return ["", "", "", ""];
    }
  });

  const [recognitionSlots, setRecognitionSlots] = useState([
    false,
    false,
    false,
    false,
  ]);

  const [cameraStats, setCameraStats] = useState({});
  const [recordingLoadingId, setRecordingLoadingId] = useState(null);

  const [selectedEvents, setSelectedEvents] = useState(["All Events"]);

  const [fullscreenMode, setFullscreenMode] = useState(null);

  const isAllCamerasFullscreen = fullscreenMode === "all";
  const fullscreenSlotIndex =
    typeof fullscreenMode === "number" ? fullscreenMode : null;

  const handleAllCamerasFullscreen = () => {
    setFullscreenMode((currentMode) => (currentMode === "all" ? null : "all"));
  };

  const handleCameraFullscreen = (slotIndex) => {
    setFullscreenMode((currentMode) =>
      currentMode === slotIndex ? null : slotIndex
    );
  };

  useEffect(() => {
    loadCameras();
  }, []);

  useEffect(() => {
    const activeCameraIds = selectedSlots.filter(Boolean);

    if (activeCameraIds.length === 0) {
      return undefined;
    }

    const loadStats = async () => {
      const results = await Promise.all(
        activeCameraIds.map(async (cameraId) => {
          try {
            const res = await getCameraDetectionStats(cameraId);
            return res.ok ? [cameraId, res.data] : null;
          } catch (error) {
            console.error("Detection stats error:", error);
            return null;
          }
        })
      );

      setCameraStats((prev) => {
        const updated = { ...prev };

        results.forEach((item) => {
          if (!item) return;

          const [cameraId, data] = item;
          updated[cameraId] = data;
        });

        return updated;
      });
    };

    loadStats();

    const intervalId = window.setInterval(loadStats, 1000);

    return () => window.clearInterval(intervalId);
  }, [selectedSlots]);

  const loadCameras = async () => {
    const res = await getCameras();

    if (res.ok) {
      setCameraList(res.data || []);
    }
  };

  const handleSlotCameraChange = (slotIndex, cameraId) => {
    const updatedSlots = [...selectedSlots];
    updatedSlots[slotIndex] = cameraId;
    setSelectedSlots(updatedSlots);
    localStorage.setItem(
      "liveMonitoringSelectedSlots",
      JSON.stringify(updatedSlots)
    );

    const updatedRecognitionSlots = [...recognitionSlots];
    updatedRecognitionSlots[slotIndex] = false;
    setRecognitionSlots(updatedRecognitionSlots);

    setCameraStats((prev) => {
      const updated = { ...prev };
      delete updated[cameraId];
      return updated;
    });
  };

  const handleToggleRecording = async (cameraId) => {
    if (!cameraId) return;

    const isRecording = Boolean(cameraStats[cameraId]?.recording);

    setRecordingLoadingId(cameraId);

    try {
      const res = isRecording
        ? await stopCameraRecording(cameraId)
        : await startCameraRecording(cameraId);

      if (!res.ok) {
        alert(res.message || "Recording action failed");
        return;
      }

      if (res.data) {
        setCameraStats((prev) => ({
          ...prev,
          [cameraId]: res.data,
        }));
      }

      if (isRecording && res.download_url) {
        window.location.href = getRecordingDownloadUrl(res.download_url);
      }
    } catch (error) {
      console.error("Recording error:", error);
      alert("Recording action failed");
    } finally {
      setRecordingLoadingId(null);
    }
  };

  const handleStartRecognition = async (slotIndex, cameraId) => {
    if (!cameraId) return;

    const updatedRecognitionSlots = [...recognitionSlots];
    updatedRecognitionSlots[slotIndex] = true;
    setRecognitionSlots(updatedRecognitionSlots);
  };

  const handleStopRecognition = async (slotIndex, cameraId) => {
    if (!cameraId) return;

    if (cameraStats[cameraId]?.recording) {
      await handleToggleRecording(cameraId);
    }

    const updatedRecognitionSlots = [...recognitionSlots];
    updatedRecognitionSlots[slotIndex] = false;
    setRecognitionSlots(updatedRecognitionSlots);
  };

  return (
    <div className="w-full min-w-0 overflow-x-hidden bg-[#020c16] text-white">
      <div
        className={`grid w-full min-w-0 gap-3 ${
          fullscreenMode !== null
            ? "grid-cols-1"
            : "grid-cols-[minmax(0,1fr)_260px]"
        }`}
      >
        <main
          className={`min-w-0 overflow-x-hidden ${
            fullscreenMode !== null ? "space-y-0" : "space-y-3"
          }`}
        >
          <div
            className={`grid gap-3 ${
              fullscreenSlotIndex !== null
                ? "grid-cols-1"
                : isAllCamerasFullscreen
                ? "grid-cols-2"
                : "grid-cols-2"
            }`}
          >
            {defaultSlotData.map((camera, index) => {
              if (
                fullscreenSlotIndex !== null &&
                fullscreenSlotIndex !== index
              ) {
                return null;
              }

              return (
                <CameraCard
                  key={camera.id}
                  slotIndex={index}
                  camera={camera}
                  cameraList={cameraList}
                  selectedCameraId={selectedSlots[index]}
                  selectedEvents={liveSelectedEvents}
                  onCameraChange={handleSlotCameraChange}
                  isRecognitionActive={recognitionSlots[index]}
                  onStartRecognition={handleStartRecognition}
                  onStopRecognition={handleStopRecognition}
                  cameraStats={cameraStats}
                  onToggleRecording={handleToggleRecording}
                  recordingLoadingId={recordingLoadingId}
                  fullscreenType={
                    fullscreenSlotIndex === index
                      ? "single"
                      : isAllCamerasFullscreen
                      ? "all"
                      : null
                  }
                  onToggleFullscreen={handleCameraFullscreen}
                />
              );
            })}
          </div>

          {fullscreenMode === null && (
            <>
              <div className="grid grid-cols-[1fr_1fr_1fr_118px] gap-2">
                <ToggleButton label="Auto Focus on Violation" />
                <ToggleButton label="Sound Alerts" />
                <ToggleButton label="Show AI Detections" />

                <button
                  type="button"
                  onClick={handleAllCamerasFullscreen}
                  className="flex h-[36px] items-center justify-center gap-2 rounded-md border border-[#1b344d] bg-[#061421] text-[10px] text-white hover:bg-[#0b2238]"
                >
                  <Maximize2 size={13} />
                  Fullscreen
                </button>
              </div>

              <ActiveViolation />

              <Timeline />

              <div className="flex items-center gap-2 pb-4 text-[11px] text-white/65">
                <Info size={14} className="text-blue-500" />
                All times are in IST (UTC +05:30)
              </div>
            </>
          )}

          {fullscreenMode !== null && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setFullscreenMode(null)}
                className="mt-2 rounded-md border border-[#1b344d] bg-[#061421] px-3 py-1.5 text-[10px] font-semibold text-white hover:bg-[#0b2238]"
              >
                Exit Fullscreen
              </button>
            </div>
          )}
        </main>

        {fullscreenMode === null && (
          <aside className="w-[260px] min-w-0 space-y-3">
            <LiveAlerts />
            <CameraHealth />
            <Legend />
          </aside>
        )}
      </div>
    </div>
  );
}