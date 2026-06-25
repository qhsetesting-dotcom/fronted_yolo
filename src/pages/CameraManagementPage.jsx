import { useEffect, useState } from "react";

import {
  ChevronDown,
  Edit,
  Plus,
  RefreshCcw,
  Search,
  Settings,
  Trash2,
  Video,
  CircleGauge,
  Power,
  CircleDot,
} from "lucide-react";

import {
  getCameraGroups,
  createCameraGroup,
  deleteCameraGroup,
  getCameras,
  createCamera,
  deleteCamera,
} from "../data/api";

import { issues, stats } from "../data/deshboarddata.js";

function StatusBadge({ status }) {
  const normalizedStatus =
    status?.charAt(0)?.toUpperCase() + status?.slice(1)?.toLowerCase();

  const styles = {
    Online: "text-green-400",
    Offline: "text-red-400",
    Lagging: "text-orange-400",
    Connecting: "text-blue-400",
  };

  const finalStatus = normalizedStatus || "Offline";

  return (
    <span
      title={finalStatus}
      className={`whitespace-nowrap text-[8px] font-semibold ${
        styles[finalStatus] || "text-white"
      }`}
    >
      ● {finalStatus}
    </span>
  );
}

function RecordingBadge({ value }) {
  const isRecording = value === "REC" || value === true;

  return (
    <span
      title={String(value)}
      className={`whitespace-nowrap text-[8px] ${
        isRecording ? "text-red-400" : "text-white/45"
      }`}
    >
      ● {isRecording ? "REC" : "OFF"}
    </span>
  );
}

function IssueBadge({ value }) {
  if (!value || value === "—" || value === "-") {
    return <span className="text-white/45">—</span>;
  }

  const isDanger = value.toLowerCase().includes("signal");
  const isConnecting = value.toLowerCase().includes("connecting");

  return (
    <span
      title={value}
      className={`inline-block max-w-full truncate whitespace-nowrap rounded border px-1 py-[1px] text-[7px] ${
        isDanger
          ? "border-red-500/50 text-red-400"
          : isConnecting
          ? "border-blue-500/50 text-blue-400"
          : "border-orange-500/50 text-orange-400"
      }`}
    >
      {value}
    </span>
  );
}

function CameraThumb({ index }) {
  const gradients = [
    "from-slate-700 via-slate-900 to-black",
    "from-yellow-900 via-slate-800 to-black",
    "from-orange-900 via-slate-900 to-black",
    "from-slate-600 via-zinc-900 to-black",
  ];

  return (
    <div
      className={`h-6 w-7 shrink-0 overflow-hidden rounded bg-gradient-to-br ${
        gradients[index % gradients.length]
      }`}
    >
      <div className="h-full w-full bg-[linear-gradient(90deg,transparent_0,transparent_45%,rgba(255,255,255,.12)_46%,transparent_47%),linear-gradient(0deg,transparent_0,transparent_55%,rgba(255,180,0,.16)_56%,transparent_57%)]" />
    </div>
  );
}

function StatSparkline({ type }) {
  const isOffline = type === "Offline";

  return (
    <svg
      viewBox="0 0 90 28"
      className="absolute bottom-2 right-4 h-8 w-20"
      preserveAspectRatio="none"
    >
      <path
        d={
          isOffline
            ? "M0 24 L12 21 L24 19 L36 15 L48 17 L60 9 L72 14 L82 7 L90 11"
            : "M0 24 L12 23 L24 21 L36 22 L48 18 L60 20 L72 12 L82 15 L90 6"
        }
        fill="none"
        stroke={isOffline ? "#ef4444" : "#22c55e"}
        strokeWidth="2"
      />
    </svg>
  );
}

function StatSummaryCard({ item }) {
  const iconMap = {
    "Total Cameras": Video,
    Online: CircleGauge,
    Offline: Power,
    Recording: CircleDot,
  };

  const Icon = iconMap[item.title] || item.icon;
  const isTotalCamera = item.title === "Total Cameras";
  const showSparkline = item.title === "Online" || item.title === "Offline";

  return (
    <div className="glass-card relative flex h-[84px] min-w-0 items-center gap-2 overflow-hidden px-2.5">
      <div
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${item.color}`}
      >
        <Icon size={20} />
      </div>

      <div className="min-w-0 flex-1">
        <p
          title={item.title}
          className="max-w-[105px] truncate text-[11px] font-semibold text-white/80"
        >
          {item.title}
        </p>

        <h2 className="mt-1 text-[16px] font-bold leading-none">
          {item.value}
        </h2>

        <div className="mt-1.5 flex items-center justify-between gap-2">
          <p
            title={item.sub}
            className="min-w-0 truncate text-[9px] text-white/55"
          >
            {item.sub}
          </p>

          {isTotalCamera && (
            <button className="shrink-0 whitespace-nowrap text-[9px] text-blue-400 hover:text-blue-300">
              View all →
            </button>
          )}
        </div>
      </div>

      {showSparkline && <StatSparkline type={item.title} />}
    </div>
  );
}

export default function CameraManagementPage() {
  const [cameraGroupRows, setCameraGroupRows] = useState([]);
  const [cameraRows, setCameraRows] = useState([]);

  const [popupType, setPopupType] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");

  const [newGroupName, setNewGroupName] = useState("");
  const [deleteGroupId, setDeleteGroupId] = useState(null);
  const [deleteCameraId, setDeleteCameraId] = useState(null);

  const [cameraForm, setCameraForm] = useState({
    source_type: "RTSP",
    name: "",
    source: "",
    group_id: "",
  });

  useEffect(() => {
    loadCameraGroups();
    loadCameras();
  }, []);

  const loadCameraGroups = async () => {
    const res = await getCameraGroups();

    if (res.ok) {
      setCameraGroupRows(res.data || []);
    } else {
      setPopupMessage(res.message || "Failed to load camera groups");
      setPopupType("message");
    }
  };

  const loadCameras = async () => {
    const res = await getCameras();

    if (res.ok) {
      setCameraRows(res.data || []);
    } else {
      setPopupMessage(res.message || "Failed to load cameras");
      setPopupType("message");
    }
  };

  const handleAddGroup = async () => {
    if (!newGroupName.trim()) {
      setPopupMessage("Group name is required");
      setPopupType("message");
      return;
    }

    const res = await createCameraGroup({
      name: newGroupName.trim(),
      description: "",
    });

    if (res.ok) {
      setNewGroupName("");
      setPopupType(null);
      setPopupMessage("");
      loadCameraGroups();
    } else {
      setPopupMessage(res.message || "Failed to create camera group");
      setPopupType("message");
    }
  };

  const openDeleteGroupPopup = (groupId) => {
    setDeleteGroupId(groupId);
    setPopupMessage("Are you sure you want to delete this camera group?");
    setPopupType("deleteGroup");
  };

  const handleDeleteGroup = async () => {
    const res = await deleteCameraGroup(deleteGroupId);

    if (res.ok) {
      setDeleteGroupId(null);
      setPopupType(null);
      setPopupMessage("");
      loadCameraGroups();
    } else {
      setPopupMessage(res.message || "Failed to delete camera group");
      setPopupType("message");
    }
  };

  const handleAddCamera = async () => {
    if (!cameraForm.name.trim()) {
      setPopupMessage("Camera name is required");
      setPopupType("message");
      return;
    }

    if (!cameraForm.source.trim()) {
      setPopupMessage(
        cameraForm.source_type === "RTSP"
          ? "RTSP URL is required"
          : cameraForm.source_type === "USB"
          ? "USB camera index is required"
          : "Webcam index is required"
      );
      setPopupType("message");
      return;
    }

    if (!cameraForm.group_id) {
      setPopupMessage("Camera group is required");
      setPopupType("message");
      return;
    }

    const selectedGroup = cameraGroupRows.find(
      (group) => Number(group.id) === Number(cameraForm.group_id)
    );

    const dummyLocation = selectedGroup?.name || "Default Location";

    const payload = {
      camera_name: cameraForm.name.trim(),
      source_type: cameraForm.source_type.toLowerCase(),
      rtsp_url: cameraForm.source_type === "RTSP" ? cameraForm.source.trim() : null,
      webcam_index:
        cameraForm.source_type === "Webcam" ? Number(cameraForm.source) : null,
      usb_index: cameraForm.source_type === "USB" ? Number(cameraForm.source) : null,
      group_id: Number(cameraForm.group_id),
      location: dummyLocation,
      is_recording: true,
    };

    const res = await createCamera(payload);

    if (res.ok) {
      setCameraForm({
        source_type: "RTSP",
        name: "",
        source: "",
        group_id: "",
      });

      setPopupType(null);
      setPopupMessage("");

      loadCameras();
    } else {
      setPopupMessage(res.message || "Failed to add camera");
      setPopupType("message");
    }
  };

  const openDeleteCameraPopup = (cameraId) => {
    setDeleteCameraId(cameraId);
    setPopupMessage("Are you sure you want to delete this camera?");
    setPopupType("deleteCamera");
  };

  const handleDeleteCamera = async () => {
    const res = await deleteCamera(deleteCameraId);

    if (res.ok) {
      setDeleteCameraId(null);
      setPopupType(null);
      setPopupMessage("");
      loadCameras();
    } else {
      setPopupMessage(res.message || "Failed to delete camera");
      setPopupType("message");
    }
  };

  const closePopup = () => {
    setPopupType(null);
    setPopupMessage("");
    setDeleteGroupId(null);
    setDeleteCameraId(null);
  };

  const getGroupName = (cam) => {
    return (
      cam.group ||
      cam.group_name ||
      cam.camera_group?.name ||
      cameraGroupRows.find((group) => Number(group.id) === Number(cam.group_id))
        ?.name ||
      "-"
    );
  };

  return (
    <div className="w-full min-w-0 overflow-x-hidden text-white">
      <div className="grid w-full min-w-0 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_260px]">
        <main className="min-w-0 space-y-2 overflow-x-hidden">
          <div className="grid min-w-0 grid-cols-4 gap-2">
            {stats.map((item) => (
              <StatSummaryCard key={item.title} item={item} />
            ))}
          </div>

          <section className="glass-card p-2.5">
            <h3 className="mb-2 text-[12px] font-semibold">Add New Camera</h3>

            <div className="grid min-w-0 grid-cols-1 gap-2 xl:grid-cols-[240px_minmax(160px,1fr)_minmax(180px,1fr)_minmax(100px,0.55fr)]">
              <div className="min-w-0">
                <label className="mb-1 block text-[11px] text-white/65">
                  Source Type
                </label>

                <div className="grid grid-cols-3 gap-1">
                  {["RTSP", "USB", "Webcam"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setCameraForm({
                          ...cameraForm,
                          source_type: type,
                          source: "",
                        })
                      }
                      className={`flex h-8 min-w-0 items-center justify-center gap-1 rounded-md border px-1 text-[8.5px] font-semibold ${
                        cameraForm.source_type === type
                          ? "border-blue-600 bg-[#09254a] text-white"
                          : "border-[#123250] bg-[#07182a] text-white/80"
                      }`}
                    >
                      <span className="grid h-3 w-3 shrink-0 place-items-center rounded-full border border-blue-400">
                        {cameraForm.source_type === type && (
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                        )}
                      </span>
                      <span>{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="min-w-0">
                <label className="mb-1 block text-[11px] text-white/65">
                  Camera Name
                </label>

                <input
                  value={cameraForm.name}
                  onChange={(e) =>
                    setCameraForm({ ...cameraForm, name: e.target.value })
                  }
                  className="h-8 w-full min-w-0 rounded-md border border-[#123250] bg-[#020817] px-2 text-[10px] outline-none placeholder:text-white/35 focus:border-blue-500"
                  placeholder="Enter camera name"
                />
              </div>

              <div className="min-w-0">
                <label className="mb-1 block text-[11px] text-white/65">
                  {cameraForm.source_type === "RTSP"
                    ? "RTSP Stream URL"
                    : cameraForm.source_type === "USB"
                    ? "USB Camera Index"
                    : "Webcam Index"}
                </label>

                <input
                  value={cameraForm.source}
                  onChange={(e) =>
                    setCameraForm({ ...cameraForm, source: e.target.value })
                  }
                  className="h-8 w-full min-w-0 rounded-md border border-[#123250] bg-[#020817] px-2 text-[10px] outline-none placeholder:text-white/35 focus:border-blue-500"
                  placeholder={
                    cameraForm.source_type === "RTSP"
                      ? "rtsp://user:pass@ip/stream"
                      : cameraForm.source_type === "USB"
                      ? "1"
                      : "0"
                  }
                />
              </div>

              <div className="min-w-0">
                <label className="mb-1 block text-[11px] text-white/65">
                  Group
                </label>

                <select
                  value={cameraForm.group_id}
                  onChange={(e) =>
                    setCameraForm({
                      ...cameraForm,
                      group_id: e.target.value,
                    })
                  }
                  className="h-8 w-full min-w-0 rounded-md border border-[#123250] bg-[#020817] px-2 text-[10px] outline-none focus:border-blue-500"
                >
                  <option value="">Select group</option>
                  {cameraGroupRows.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-4 flex justify-end">
                <button
                  onClick={handleAddCamera}
                  className="flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-md bg-blue-600 px-4 text-[10px] font-semibold hover:bg-blue-700"
                >
                  <Plus size={13} />
                  Add Camera
                </button>
              </div>
            </div>
          </section>

          <section className="glass-card flex h-[332px] min-w-0 flex-col overflow-hidden p-0">
            <div className="shrink-0 border-b border-[#123250] p-2">
              <div className="flex min-w-0 items-center justify-between gap-2">
                <h3 className="shrink-0 text-[12px] font-semibold">
                  Camera List ({cameraRows.length})
                </h3>

                <div className="flex min-w-0 shrink items-center justify-end gap-1.5">
                  <div className="relative w-[145px] shrink">
                    <Search
                      size={12}
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-white/45"
                    />

                    <input
                      className="h-7 w-full rounded-md border border-[#123250] bg-[#020817] pl-7 pr-2 text-[10px] outline-none placeholder:text-white/35 focus:border-blue-500"
                      placeholder="Search cameras..."
                    />
                  </div>

                  <select className="h-7 w-[88px] shrink-0 rounded-md border border-[#123250] bg-[#020817] px-1.5 text-[9px] outline-none focus:border-blue-500">
                    <option>All Groups</option>
                    {cameraGroupRows.map((group) => (
                      <option key={group.id}>{group.name}</option>
                    ))}
                  </select>

                  <select className="h-7 w-[82px] shrink-0 rounded-md border border-[#123250] bg-[#020817] px-1.5 text-[9px] outline-none focus:border-blue-500">
                    <option>All Status</option>
                  </select>

                  <button
                    onClick={loadCameras}
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-[#123250] bg-[#07182a] hover:bg-[#0b2238]"
                  >
                    <RefreshCcw size={12} />
                  </button>

                  <button className="flex h-7 w-[88px] shrink-0 items-center justify-center gap-1 rounded-md border border-blue-600 bg-[#09254a] px-1.5 text-[9px] text-blue-300 hover:bg-[#0b2f60]">
                    <span className="truncate">Bulk Actions</span>
                    <ChevronDown size={11} className="shrink-0" />
                  </button>
                </div>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
              <table className="w-full table-fixed border-collapse text-left text-[8.5px]">
                <thead className="sticky top-0 z-10 bg-[#082136] text-white/75">
                  <tr className="h-[25px]">
                    <th className="w-[4%] px-2 py-1">
                      <input
                        type="checkbox"
                        className="h-3 w-3 appearance-none rounded-[2px] border border-white/50 bg-transparent checked:border-blue-500 checked:bg-blue-600"
                      />
                    </th>

                    <th className="w-[18%] px-1.5 py-1">Camera Name</th>
                    <th className="w-[9%] px-1.5 py-1">Group</th>
                    <th className="w-[10%] px-1.5 py-1">Location</th>
                    <th className="w-[12%] px-1.5 py-1">Source</th>
                    <th className="w-[9%] px-1.5 py-1">Status</th>
                    <th className="w-[5%] px-1.5 py-1">FPS</th>
                    <th className="w-[8%] px-1.5 py-1">Recording</th>
                    <th className="w-[9%] px-1.5 py-1">Last Seen</th>
                    <th className="w-[8%] px-1.5 py-1">Issues</th>
                    <th className="w-[8%] px-1.5 py-1 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cameraRows.map((cam, index) => {
                    const cameraName = cam.camera_name || cam.name || "-";
                    const group = getGroupName(cam);
                    const location = cam.location || "-";
                    const sourceType = cam.source_type || "rtsp";
                    const source =
                      sourceType === "webcam"
                        ? `Webcam ${cam.webcam_index ?? "-"}`
                        : sourceType === "usb"
                        ? `USB ${cam.usb_index ?? "-"}`
                        : cam.rtsp_url || "-";
                    const status = cam.status || "Offline";
                    const fps = cam.fps ?? 0;
                    const recording =
                      cam.recording_status || cam.is_recording || false;
                    const lastSeen = cam.last_seen || "-";
                    const issue = cam.issues || cam.issue || "—";

                    return (
                      <tr
                        key={cam.id || `${cameraName}-${index}`}
                        className="h-[32px] border-t border-[#123250] bg-[#051828]/80 hover:bg-[#0b2238]"
                      >
                        <td className="px-2 py-0.5">
                          <input
                            type="checkbox"
                            className="h-3 w-3 appearance-none rounded-[2px] border border-white/50 bg-transparent checked:border-blue-500 checked:bg-blue-600"
                          />
                        </td>

                        <td className="px-1.5 py-0.5">
                          <div className="flex min-w-0 items-center gap-1.5">
                            <CameraThumb index={index} />

                            <span
                              title={cameraName}
                              className="min-w-0 truncate font-semibold"
                            >
                              {cameraName}
                            </span>
                          </div>
                        </td>

                        <td className="px-1.5 py-0.5">
                          <span title={group} className="block truncate">
                            {group}
                          </span>
                        </td>

                        <td className="px-1.5 py-0.5">
                          <span title={location} className="block truncate">
                            {location}
                          </span>
                        </td>

                        <td className="px-1.5 py-0.5">
                          <div
                            title={sourceType}
                            className="truncate font-medium leading-tight"
                          >
                            {sourceType.toUpperCase()}
                          </div>

                          <div
                            title={source}
                            className="truncate text-[7px] leading-tight text-white/45"
                          >
                            {source}
                          </div>
                        </td>

                        <td className="px-1.5 py-0.5">
                          <StatusBadge status={status} />
                        </td>

                        <td className="px-1.5 py-0.5">
                          <span title={String(fps)} className="block truncate">
                            {fps}
                          </span>
                        </td>

                        <td className="px-1.5 py-0.5">
                          <RecordingBadge value={recording} />
                        </td>

                        <td className="px-1.5 py-0.5">
                          <span title={lastSeen} className="block truncate">
                            {lastSeen}
                          </span>
                        </td>

                        <td className="px-1.5 py-0.5">
                          <IssueBadge value={issue} />
                        </td>

                        <td className="px-1.5 py-0.5">
                          <div className="flex justify-center gap-1">
                            <button
                              title="Edit"
                              className="grid h-[18px] w-[18px] place-items-center rounded border border-[#123250] bg-[#07182a] text-white/75 hover:bg-[#123a5a] hover:text-white"
                            >
                              <Edit size={9} />
                            </button>

                            <button
                              title="Settings"
                              className="grid h-[18px] w-[18px] place-items-center rounded border border-[#123250] bg-[#07182a] text-white/75 hover:bg-[#123a5a] hover:text-white"
                            >
                              <Settings size={9} />
                            </button>

                            <button
                              title="Delete"
                              onClick={() => openDeleteCameraPopup(cam.id)}
                              className="grid h-[18px] w-[18px] place-items-center rounded border border-[#123250] bg-[#07182a] text-white/75 hover:bg-red-900/40 hover:text-red-300"
                            >
                              <Trash2 size={9} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {cameraRows.length === 0 && (
                    <tr>
                      <td
                        colSpan="11"
                        className="h-24 text-center text-[11px] text-white/50"
                      >
                        No cameras found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="shrink-0 border-t border-[#123250] px-3 py-1.5 text-[10px] text-white/65">
              <div className="flex items-center justify-between gap-2">
                <span>
                  Showing 1 to {Math.min(cameraRows.length, 8)} of{" "}
                  {cameraRows.length} cameras
                </span>

                <div className="flex items-center gap-1.5">
                  <button className="rounded-md bg-[#07182a] px-2 py-1 text-white/50 hover:bg-[#0b2238]">
                    ‹
                  </button>

                  <button className="rounded-md bg-blue-600 px-2 py-1 text-white">
                    1
                  </button>

                  <button className="rounded-md bg-[#07182a] px-2 py-1 hover:bg-[#0b2238]">
                    ›
                  </button>

                  <select className="ml-2 h-7 rounded-md border border-[#123250] bg-[#020817] px-2 text-[10px] outline-none">
                    <option>10 / page</option>
                    <option>25 / page</option>
                    <option>50 / page</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        </main>

        <aside className="w-[260px] min-w-0 space-y-2">
          <section className="glass-card p-3">
            <h3 className="mb-2 text-[12px] font-semibold">
              Monitoring Guidance
            </h3>

            {[
              "Use RTSP for IP camera, Webcam for laptop camera, or USB for external USB camera.",
              "Start Recognition opens PPE detection on the current source.",
              "Stop safely ends the running stream or enrollment session.",
              "Email alerts are managed from the Email Settings page.",
            ].map((text) => (
              <p
                key={text}
                className="mb-1.5 flex gap-2 text-[9px] leading-4 text-white/70 last:mb-0"
              >
                <span className="mt-1 text-blue-400">●</span>
                <span>{text}</span>
              </p>
            ))}
          </section>

          <section className="glass-card p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="text-[12px] font-semibold">Camera Issues</h3>

              <button className="shrink-0 text-[10px] text-blue-400 hover:text-blue-300">
                View All →
              </button>
            </div>

            <div className="max-h-[144px] overflow-y-auto pr-1">
              {issues.map(([title, desc, time, type, Icon]) => (
                <div
                  key={`${title}-${desc}`}
                  className="flex h-[36px] items-center gap-2 border-b border-[#123250] last:border-0"
                >
                  <div
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                      type === "danger"
                        ? "bg-red-500"
                        : type === "warn"
                        ? "bg-orange-500"
                        : "bg-blue-600"
                    }`}
                  >
                    <Icon size={12} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-semibold">
                      {title}
                    </p>

                    <p className="truncate text-[8px] text-white/55">
                      {desc}
                    </p>
                  </div>

                  <span className="shrink-0 text-[8px] text-white/45">
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="text-[12px] font-semibold">Camera Groups</h3>

              <button
                onClick={() => setPopupType("add")}
                className="shrink-0 rounded-md border border-blue-600 px-2 py-1 text-[10px] text-blue-400 hover:bg-[#09254a]"
              >
                + Add Group
              </button>
            </div>

            <div className="max-h-[160px] overflow-y-auto pr-1">
              <table className="w-full table-fixed border-collapse text-left text-[8.5px]">
                <thead className="sticky top-0 z-10 bg-[#082136] text-white/75">
                  <tr className="h-[24px]">
                    <th className="w-[78%] px-2 py-1">Group Name</th>
                    <th className="w-[22%] px-2 py-1 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {cameraGroupRows.map((group) => (
                    <tr
                      key={group.id}
                      className="h-[30px] border-t border-[#123250] bg-[#051828]/80 hover:bg-[#0b2238]"
                    >
                      <td className="px-2 py-1">
                        <span
                          title={group.name}
                          className="block truncate font-semibold"
                        >
                          {group.name}
                        </span>
                      </td>

                      <td className="px-2 py-1">
                        <div className="flex justify-center">
                          <button
                            title="Delete"
                            onClick={() => openDeleteGroupPopup(group.id)}
                            className="grid h-[18px] w-[18px] place-items-center rounded border border-[#123250] bg-[#07182a] text-white/75 hover:bg-red-900/40 hover:text-red-300"
                          >
                            <Trash2 size={9} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {cameraGroupRows.length === 0 && (
                    <tr>
                      <td
                        colSpan="2"
                        className="h-16 text-center text-[10px] text-white/50"
                      >
                        No groups found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </aside>
      </div>

      {popupType && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/45">
          <div className="w-[470px] overflow-hidden rounded-2xl bg-[#3b82f6] shadow-2xl">
            <div className="bg-[#14336d] px-6 py-5 text-center">
              <h2 className="text-[17px] font-bold text-white">
                Paperless Management System States
              </h2>
            </div>

            <div className="px-10 py-8 text-center">
              {popupType === "add" && (
                <>
                  <p className="mb-5 text-[13px] font-semibold text-white">
                    Enter new camera group name
                  </p>

                  <input
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="mb-5 h-10 w-full rounded-md border border-white/20 bg-[#0f2d64] px-3 text-[13px] text-white outline-none placeholder:text-white/45 focus:border-white"
                    placeholder="Enter group name"
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={handleAddGroup}
                      className="h-11 flex-1 rounded-lg bg-[#14336d] text-[14px] font-bold text-white hover:bg-[#102b5c]"
                    >
                      Add
                    </button>


                    <button
                      onClick={closePopup}
                      className="h-11 flex-1 rounded-lg bg-[#14336d] text-[14px] font-bold text-white hover:bg-[#102b5c]"
                    >
                      Cancel
                    </button>

                  </div>
                </>
              )}

              {popupType === "deleteGroup" && (
                <>
                  <p className="mb-8 text-[13px] font-semibold text-white">
                    {popupMessage}
                  </p>

                  <div className="flex gap-3">

                    <button
                      onClick={handleDeleteGroup}
                      className="h-11 flex-1 rounded-lg bg-[#14336d] text-[14px] font-bold text-white hover:bg-[#102b5c]"
                    >
                      Confirm Delete
                    </button>

                    <button
                      onClick={closePopup}
                      className="h-11 flex-1 rounded-lg bg-[#14336d] text-[14px] font-bold text-white hover:bg-[#102b5c]"
                    >
                      Cancel
                    </button>

                  </div>
                </>
              )}

              {popupType === "deleteCamera" && (
                <>
                  <p className="mb-8 text-[13px] font-semibold text-white">
                    {popupMessage}
                  </p>

                  <div className="flex gap-3">

                    <button
                      onClick={handleDeleteCamera}
                      className="h-11 flex-1 rounded-lg bg-[#14336d] text-[14px] font-bold text-white hover:bg-[#102b5c]"
                    >
                      Confirm Delete
                    </button>

                    <button
                      onClick={closePopup}
                      className="h-11 flex-1 rounded-lg bg-[#14336d] text-[14px] font-bold text-white hover:bg-[#102b5c]"
                    >
                      Cancel
                    </button>

                  </div>
                </>
              )}

              {(popupType === "success" || popupType === "message") && (
                <>
                  <p className="mb-8 text-[13px] font-semibold text-white">
                    {popupMessage}
                  </p>

                  <button
                    onClick={closePopup}
                    className="h-11 w-full rounded-lg bg-[#14336d] text-[14px] font-bold text-white hover:bg-[#102b5c]"
                  >
                    OK
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}