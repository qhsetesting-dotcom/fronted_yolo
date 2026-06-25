import { Video } from "lucide-react";

const cameras = [
  { name: "Webcam", type: "Local", status: "Active" },
  { name: "RTSP Camera 1", type: "Gate", status: "Online" },
  { name: "RTSP Camera 2", type: "Parking", status: "Online" },
  { name: "RTSP Camera 3", type: "Warehouse", status: "Online" },
  { name: "RTSP Camera 4", type: "Entrance", status: "Online" },
];

export default function CameraManagement() {
  return (
    <section className="glass-card w-full min-w-0 p-2.5 sm:p-3">
      <div className="mb-2 flex h-[14px] items-center justify-between gap-2">
        <h3 className="flex min-w-0 items-center gap-1 text-[12px] font-semibold sm:text-sm">
          <Video size={13} className="shrink-0" />
          <span className="truncate">Camera Source</span>
        </h3>

        <button className="shrink-0 text-[10px] text-white/70 hover:text-white sm:text-[11px]">
          Manage ›
        </button>
      </div>

      {/* Always 1 row. On small width / zoom, horizontal scroll will appear */}
      <div className="flex w-full min-w-0 gap-2 overflow-x-auto overflow-y-hidden pb-1">
        {cameras.map((camera) => (
          <div
            key={camera.name}
            className="min-w-[135px] flex-1 shrink-0 rounded-md border border-[#123250] bg-[#07182a] px-2 py-1"
          >
            <div className="truncate text-[11px] font-semibold sm:text-xs">
              {camera.name}
            </div>

            <div className="mt-1 flex items-center justify-between gap-2 text-[10px] sm:text-[11px]">
              <span className="truncate text-white/55">{camera.type}</span>
              <span className="shrink-0 font-semibold text-green-400">
                {camera.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}