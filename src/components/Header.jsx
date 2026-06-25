import { useEffect, useState } from "react";
import { Bell, ChevronDown, Mail, Menu } from "lucide-react";
import { getCameras } from "../data/api";

const pageInfo = {
  dashboard: {
    title: "PPE Monitoring Dashboard",
    subtitle: "Real-time overview of PPE compliance and face recognition system",
  },
  live: {
    title: "Live Monitoring",
    subtitle: "Real-time AI monitoring, smart alerts & instant actions",
  },
  "camera-management": {
    title: "Camera Management",
    subtitle: "Manage, configure and monitor all your camera sources",
  },
  face: {
    title: "Face Enrollment",
    subtitle: "Register and manage face enrollment records",
  },
  "enrolled-persons": {
    title: "Enrolled Persons",
    subtitle:
      "Manage and control all enrolled persons and face recognition records",
  },
  "dataset-management": {
    title: "Dataset Management",
    subtitle: "Collect and manage dataset for AI model training",
  },
  archives: {
    title: "Archives",
    subtitle: "View and manage archived datasets and persons",
  },
  notifications: {
    title: "Notifications & Alerts",
    subtitle: "Real-time alerts and system notifications",
  },
  email: {
    title: "Email Settings",
    subtitle: "Configure email alerts and notifications",
  },
  settings: {
    title: "Settings",
    subtitle: "Configure system preferences and application settings",
  },
};

const eventFilterItems = [
  "All Events",
  "Face",
  "Helmet Missing",
  "Vest Missing",
  "Safety Shoes Missing",
  "Welding Suit Missing",
  "Arcflash Suit Missing",
];

function ToggleSwitch() {
  return (
    <span className="flex items-center gap-1">
      <span className="relative h-[14px] w-[26px] rounded-full bg-emerald-600">
        <span className="absolute right-[3px] top-1/2 h-[8px] w-[8px] -translate-y-1/2 rounded-full bg-white" />
      </span>
      <span className="text-[8px] font-semibold">ON</span>
    </span>
  );
}

function HeaderButton({ children }) {
  return (
    <button
      type="button"
      className="h-8 rounded-md border border-[#123250] bg-[#020817] px-3 text-[10px] text-white transition hover:bg-[#0b2238]"
    >
      {children}
    </button>
  );
}

function NotificationButton({ count = 12 }) {
  return (
    <button
      type="button"
      className="relative grid h-8 w-8 shrink-0 place-items-center rounded-md border border-[#123250] bg-[#020817] text-white transition hover:bg-[#0b2238]"
    >
      <Bell size={16} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[9px] font-bold leading-none text-white">
          {count}
        </span>
      )}
    </button>
  );
}

function LiveStatusButton() {
  return (
    <button
      type="button"
      className="flex h-8 w-[78px] shrink-0 items-center justify-center gap-2 rounded-md border border-[#123250] bg-[#020817] px-3 text-[10px] text-white transition hover:bg-[#0b2238]"
    >
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      Live
    </button>
  );
}

function SettingsHeaderControls() {
  return (
    <div className="flex min-w-0 items-center justify-end gap-5">
      <NotificationButton />

      <div className="flex items-center gap-2 text-[12px] text-white/80">
        <span>System Status</span>
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="font-semibold text-emerald-500">
          All Systems Operational
        </span>
      </div>
    </div>
  );
}

function EmailHeaderControls() {
  return (
    <div className="flex min-w-0 items-center justify-end gap-6">
      <div className="flex items-center gap-2 text-[12px] text-white/80">
        <span>Connection Status</span>
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="font-semibold text-emerald-500">Connected</span>
      </div>

      <button
        type="button"
        className="flex h-10 items-center gap-3 rounded-md border border-blue-700/70 bg-[#020817] px-5 text-[13px] font-semibold text-blue-500 transition hover:bg-blue-950/40"
      >
        <Mail size={18} />
        Send Test Email
      </button>
    </div>
  );
}

function LiveHeaderControls({
  selectedEvents = ["All Events"],
  setSelectedEvents = null,
}) {
  const [localSelectedEvents, setLocalSelectedEvents] = useState(["All Events"]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [cameraList, setCameraList] = useState([]);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [selectedCameraId, setSelectedCameraId] = useState("");

  const selectedCamera = cameraList.find(
    (camera) => String(camera.id) === String(selectedCameraId)
  );

  const activeSelectedEvents = setSelectedEvents
    ? selectedEvents
    : localSelectedEvents;

  const safeSelectedEvents =
    Array.isArray(activeSelectedEvents) && activeSelectedEvents.length > 0
      ? activeSelectedEvents
      : ["All Events"];

  const filterValue = selectedCamera
    ? `${
        selectedCamera.camera_name ||
        selectedCamera.cameraName ||
        selectedCamera.name
      } / ${
        safeSelectedEvents.length === 1
          ? safeSelectedEvents[0]
          : `${safeSelectedEvents.length} Events`
      }`
    : "Select Camera";

  const loadCameraList = async () => {
    try {
      setCameraLoading(true);
      const res = await getCameras();
      if (res.ok) setCameraList(res.data || []);
    } catch (error) {
      console.error("Camera list error:", error);
    } finally {
      setCameraLoading(false);
    }
  };

  const handleFilterClick = async () => {
    const nextOpen = !filterOpen;
    setFilterOpen(nextOpen);
    if (nextOpen && cameraList.length === 0) await loadCameraList();
  };

  const updateSelectedEvents = (updater) => {
    if (setSelectedEvents) setSelectedEvents(updater);
    else setLocalSelectedEvents(updater);
  };

  const handleEventToggle = (eventName) => {
    updateSelectedEvents((prevEvents) => {
      const prev =
        Array.isArray(prevEvents) && prevEvents.length > 0
          ? prevEvents
          : ["All Events"];

      if (eventName === "All Events") return ["All Events"];

      const withoutAll = prev.filter((item) => item !== "All Events");

      if (withoutAll.includes(eventName)) {
        const updated = withoutAll.filter((item) => item !== eventName);
        return updated.length ? updated : ["All Events"];
      }

      return [...withoutAll, eventName];
    });
  };

  const handleReset = () => {
    setSelectedCameraId("");
    updateSelectedEvents(() => ["All Events"]);
  };

  return (
    <div className="flex min-w-0 flex-1 shrink items-center justify-end gap-1 overflow-visible">
      <button
        type="button"
        className="flex h-[30px] w-[92px] shrink-0 items-center justify-between gap-1 rounded-md border border-[#123250] bg-[#020817] px-2 text-[8.5px] text-white transition hover:bg-[#0b2238] 2xl:h-[34px] 2xl:w-[112px] 2xl:text-[10px]"
      >
        <span className="text-white/70">Mode:</span>
        <span className="font-semibold">RTSP</span>
        <ChevronDown size={10} className="shrink-0 text-white/70" />
      </button>

      <div className="flex h-[30px] shrink-0 items-center overflow-hidden rounded-md border border-[#123250] bg-[#020817] text-[8.5px] text-white 2xl:h-[34px] 2xl:text-[10px]">
        <span className="px-1.5 text-white/70 2xl:px-2">Layout:</span>
        <button className="h-full bg-blue-700 px-2 font-semibold">4</button>
        <button className="h-full border-l border-[#123250] px-2 hover:bg-[#0b2238]">
          6
        </button>
        <button className="h-full border-l border-[#123250] px-2 hover:bg-[#0b2238]">
          9
        </button>
        <button className="h-full border-l border-[#123250] px-2 hover:bg-[#0b2238]">
          Focus
        </button>
      </div>

      <button
        type="button"
        className="flex h-[30px] w-[112px] shrink-0 items-center justify-between gap-1 rounded-md border border-[#123250] bg-[#020817] px-2 text-[8.5px] text-white transition hover:bg-[#0b2238] 2xl:h-[34px] 2xl:w-[128px] 2xl:text-[10px]"
      >
        <span className="text-white/70">AI Overlay:</span>
        <ToggleSwitch />
      </button>

      <div className="relative z-50 min-w-0 shrink">
        <button
          type="button"
          onClick={handleFilterClick}
          className="flex h-[30px] w-[150px] min-w-0 items-center justify-between gap-1 rounded-md border border-[#123250] bg-[#020817] px-2 text-[8px] text-white transition hover:bg-[#0b2238] lg:w-[170px] xl:w-[190px] 2xl:h-[34px] 2xl:w-[220px] 2xl:text-[10px]"
        >
          <span className="shrink-0 text-white/70">Filter:</span>
          <span className="min-w-0 flex-1 truncate text-left font-semibold">
            {filterValue}
          </span>
          <ChevronDown
            size={10}
            className={`shrink-0 text-white/70 transition ${
              filterOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {filterOpen && (
          <div className="absolute right-0 top-[32px] w-[260px] rounded-md border border-[#123250] bg-[#061421] p-2 shadow-2xl 2xl:top-[36px]">
            <p className="mb-1 text-[9px] font-semibold text-white/50">
              Select Camera
            </p>

            <select
              value={selectedCameraId}
              onChange={(e) => setSelectedCameraId(e.target.value)}
              className="mb-2 h-[30px] w-full rounded-md border border-[#123250] bg-[#020817] px-2 text-[10px] text-white outline-none focus:border-blue-500"
            >
              <option value="">Select Camera</option>

              {cameraLoading ? (
                <option value="">Loading cameras...</option>
              ) : (
                cameraList.map((camera) => (
                  <option key={camera.id} value={camera.id}>
                    {camera.camera_name || camera.cameraName || camera.name}
                  </option>
                ))
              )}
            </select>

            <p className="mb-1 text-[9px] font-semibold text-white/50">
              Select Events
            </p>

            <div className="max-h-[210px] overflow-y-auto">
              {eventFilterItems.map((item) => (
                <label
                  key={item}
                  className="flex h-[28px] cursor-pointer items-center gap-2 rounded px-2 text-[10px] text-white hover:bg-[#0b2238]"
                >
                  <input
                    type="checkbox"
                    checked={safeSelectedEvents.includes(item)}
                    onChange={() => handleEventToggle(item)}
                    className="h-3 w-3 accent-blue-600"
                  />
                  <span className="truncate">{item}</span>
                </label>
              ))}
            </div>

            <div className="mt-2 flex justify-end gap-2 border-t border-[#123250] pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="h-[26px] rounded-md border border-[#123250] px-3 text-[9px] text-white hover:bg-[#0b2238]"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={() => setFilterOpen(false)}
                className="h-[26px] rounded-md bg-blue-700 px-3 text-[9px] font-semibold text-white hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      <LiveStatusButton />
      <NotificationButton />
    </div>
  );
}

export default function Header({
  activePage = "dashboard",
  selectedCamera = null,
  setSelectedCamera = null,
  liveSelectedEvents = ["All Events"],
  setLiveSelectedEvents = null,
}) {
  const current = pageInfo[activePage] || pageInfo.dashboard;

  const isLivePage = activePage === "live";
  const isEmailPage = activePage === "email";
  const isSettingsPage = activePage === "settings";
  const isFacePage = activePage === "face";
  const isDatasetPage = activePage === "dataset-management";
  const isNotificationsPage = activePage === "notifications";
  const isArchivesPage = activePage === "archives";

  const useCameraHeader =
    isFacePage || isDatasetPage || isNotificationsPage || isArchivesPage;

  const [cameraList, setCameraList] = useState([]);
  const [cameraLoading, setCameraLoading] = useState(false);

  useEffect(() => {
    if (!useCameraHeader) return;

    const loadCameras = async () => {
      try {
        setCameraLoading(true);
        const res = await getCameras();

        if (res.ok) {
          const cameras = res.data || [];
          setCameraList(cameras);

          if (!selectedCamera && cameras.length > 0 && setSelectedCamera) {
            setSelectedCamera(cameras[0]);
          }
        }
      } catch (error) {
        console.error("Camera list error:", error);
      } finally {
        setCameraLoading(false);
      }
    };

    loadCameras();
  }, [useCameraHeader, selectedCamera, setSelectedCamera]);

  const selectedCameraId = selectedCamera?.id ? String(selectedCamera.id) : "";

  return (
    <header
      className={`flex min-h-[54px] min-w-0 items-center justify-between gap-3 px-3 pb-3 ${
        isLivePage ? "flex-nowrap" : "flex-wrap"
      }`}
    >
      <div
        className={`flex min-w-0 items-center gap-3 ${
          isLivePage ? "max-w-[330px] shrink" : ""
        }`}
      >
        {/* COMMON SAME ICON FOR ALL PAGES */}
        <button className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-[#123250] bg-[#07182a] text-blue-500 transition hover:bg-[#0b2238]">
          <Menu size={27} />
        </button>

        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-2">
            <h1
              className={`truncate font-bold text-white ${
                isLivePage
                  ? "text-[18px] leading-none 2xl:text-[22px]"
                  : isSettingsPage
                  ? "text-2xl"
                  : "text-lg sm:text-sm lg:text-2xl"
              }`}
            >
              {current.title}
            </h1>

            {isLivePage && (
              <span className="shrink-0 rounded bg-blue-700 px-1.5 py-0.5 text-[8px] font-bold text-white 2xl:text-[10px]">
                V3
              </span>
            )}
          </div>

          <p
            className={`mt-1 truncate text-white/60 ${
              isLivePage
                ? "text-[9px] 2xl:text-[11px]"
                : isSettingsPage
                ? "text-sm"
                : "text-[10px] sm:text-[11px]"
            }`}
          >
            {current.subtitle}
          </p>
        </div>
      </div>

      <div className="flex min-w-0 shrink-0 items-center justify-end gap-3">
        {isSettingsPage ? (
          <SettingsHeaderControls />
        ) : isEmailPage ? (
          <EmailHeaderControls />
        ) : isLivePage ? (
          <LiveHeaderControls
            selectedEvents={liveSelectedEvents}
            setSelectedEvents={setLiveSelectedEvents}
          />
        ) : useCameraHeader ? (
          <>
            <HeaderButton>Mode: RTSP</HeaderButton>

            <div className="relative">
              <select
                value={selectedCameraId}
                disabled={cameraLoading || cameraList.length === 0}
                onChange={(e) => {
                  const nextCamera = cameraList.find(
                    (camera) => String(camera.id) === e.target.value
                  );

                  if (nextCamera && setSelectedCamera) {
                    setSelectedCamera(nextCamera);
                  }
                }}
                className="h-8 w-[210px] appearance-none rounded-md border border-[#123250] bg-[#020817] px-3 pr-8 text-[10px] text-white outline-none transition hover:bg-[#0b2238] focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option value="">
                  {cameraLoading
                    ? "Loading cameras..."
                    : "Camera: Camera 1 - Gate"}
                </option>

                {cameraList.map((source) => (
                  <option key={source.id} value={source.id}>
                    Camera:{" "}
                    {source.camera_name || source.cameraName || source.name}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
              />
            </div>

            <NotificationButton />
            <LiveStatusButton />
          </>
        ) : (
          <>
            <HeaderButton>Mode: RTSP</HeaderButton>
            <HeaderButton>App: Idle</HeaderButton>
            <NotificationButton />
          </>
        )}
      </div>
    </header>
  );
}