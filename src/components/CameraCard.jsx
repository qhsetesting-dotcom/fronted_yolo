import {
  AlertTriangle,
  Grid3X3,
  HardHat,
  List,
  Maximize2,
  ShieldCheck,
  Users,
} from "lucide-react";

export function LiveMonitoringHeader() {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="text-sm font-semibold text-white">
        Live Monitoring <span className="text-white/80">(4 Cameras)</span>
      </h2>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#123250] bg-[#061b2d] text-white/80 hover:bg-[#0b2a45] hover:text-white"
        >
          <Grid3X3 size={16} />
        </button>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#123250] bg-[#061b2d] text-white/80 hover:bg-[#0b2a45] hover:text-white"
        >
          <List size={17} />
        </button>

        <button
          type="button"
          className="h-8 rounded-md border border-[#123250] bg-[#061b2d] px-4 text-xs font-medium text-white hover:bg-[#0b2a45]"
        >
          Expand View
        </button>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#123250] bg-[#061b2d] text-white/80 hover:bg-[#0b2a45] hover:text-white"
        >
          <Maximize2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default function CameraCard({
  title = "Camera",
  persons = 0,
  violations = 0,
  compliant = false,
  mixed = false,
  missing = false,
}) {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-lg border border-[#123250] bg-[#061b2d]">
      <div className="flex items-center justify-between px-3 py-2">
        <h3 className="truncate text-sm font-semibold text-white">{title}</h3>

        <div className="flex shrink-0 items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <span className="text-xs font-bold text-white">LIVE</span>
        </div>
      </div>

      <div className="relative h-[190px] overflow-hidden bg-gradient-to-br from-[#30353a] via-[#111827] to-black xl:h-[205px]">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_0,transparent_30%,rgba(255,255,255,.15)_31%,transparent_32%),linear-gradient(0deg,transparent_0,transparent_50%,rgba(255,180,0,.25)_51%,transparent_52%)]" />

        <PersonBox
          label={missing ? "Helmet Missing" : "Helmet, Vest"}
          danger={missing}
          left={mixed ? "32%" : "48%"}
          color={mixed ? "orange" : "green"}
        />

        {mixed && (
          <>
            <PersonBox label="Helmet, Vest" left="52%" color="green" />
            <PersonBox label="No Vest" danger left="75%" color="orange" />
          </>
        )}

        {compliant && (
          <PersonBox label="Helmet, Vest" left="58%" color="green" />
        )}

        <div className="absolute inset-x-0 bottom-0 flex h-[50px] items-center justify-between bg-black/70 px-4 text-white">
          <div className="flex items-center gap-2">
            <Users size={26} className="shrink-0 text-blue-500" />

            <div className="leading-tight">
              <p className="text-sm font-semibold">{persons}</p>
              <p className="text-sm text-white">Persons</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <AlertTriangle size={26} className="shrink-0 text-yellow-400" />

            <div className="leading-tight">
              <p className="text-sm font-semibold">{violations}</p>
              <p className="text-sm text-white">Violations</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <HardHat
              size={27}
              className={missing ? "text-red-500" : "text-green-500"}
            />

            <ShieldCheck size={27} className="text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonBox({
  label,
  danger = false,
  left = "50%",
  color = "green",
}) {
  const bodyColor =
    color === "orange"
      ? "from-orange-500 to-red-700"
      : "from-lime-300 to-lime-600";

  return (
    <div
      className="absolute top-[42px] h-[118px] w-[78px] sm:top-[45px] sm:h-[125px] sm:w-[84px]"
      style={{ left, transform: "translateX(-50%)" }}
    >
      <div
        className={`absolute -top-6 left-0 right-0 px-2 py-1 text-center text-[10px] font-semibold leading-tight text-white ${
          danger ? "bg-red-600" : "bg-green-600"
        }`}
      >
        {label}
      </div>

      <div className="absolute left-1/2 top-4 h-6 w-6 -translate-x-1/2 rounded-full bg-yellow-400" />

      <div
        className={`absolute left-1/2 top-11 h-16 w-10 -translate-x-1/2 rounded-t-xl bg-gradient-to-b ${bodyColor}`}
      />

      <div
        className={`absolute inset-0 border ${
          danger ? "border-red-500" : "border-green-500"
        }`}
      />
    </div>
  );
}