import {
  Database,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Bot,
  Camera,
  PlayCircle,
  Pause,
  Plus,
  Eye,
  Upload,
  Archive,
  Trash2,
  Info,
  Calendar,
  Filter,
  Copy,
  Sun,
} from "lucide-react";

const stats = [
  {
    title: "TOTAL DATASET IMAGES",
    value: "12,842",
    sub: "All Classes",
    trend: "↑ 18.6% vs yesterday",
    icon: Database,
    color: "bg-blue-700",
    trendColor: "text-emerald-400",
  },
  {
    title: "VALID IMAGES",
    value: "10,265",
    sub: "79.8% of total",
    trend: "↑ 16.3% vs yesterday",
    icon: CheckCircle,
    color: "bg-emerald-600",
    trendColor: "text-emerald-400",
  },
  {
    title: "PENDING REVIEW",
    value: "1,842",
    sub: "14.3% of total",
    trend: "↑ 7.5% vs yesterday",
    icon: AlertTriangle,
    color: "bg-amber-500",
    trendColor: "text-emerald-400",
  },
  {
    title: "REJECTED IMAGES",
    value: "735",
    sub: "5.7% of total",
    trend: "↓ 2.1% vs yesterday",
    icon: XCircle,
    color: "bg-violet-700",
    trendColor: "text-red-400",
  },
  {
    title: "READY FOR TRAINING",
    value: "3",
    sub: "Datasets",
    icon: Bot,
    color: "bg-blue-700",
  },
];

const latestImages = [
  { status: "Valid", time: "23 Apr 2026 12:32:45 PM", quality: "95%" },
  { status: "Valid", time: "23 Apr 2026 12:32:43 PM", quality: "92%" },
  { status: "Blurry", time: "23 Apr 2026 12:32:42 PM", quality: "68%" },
  { status: "Blurry", time: "23 Apr 2026 12:32:40 PM", quality: "79%" },
  { status: "Needs Label", time: "23 Apr 2026 12:32:39 PM", quality: "90%" },
  { status: "Needs Label", time: "23 Apr 2026 12:32:37 PM", quality: "88%" },
];

const logs = [
  ["23 Apr 2026 12:32:45 PM", "Camera 1 - Gate", "Helmet", "120", "98", "15", "7", "In Progress"],
  ["23 Apr 2026 11:10:22 AM", "Camera 1 - Gate", "No Helmet", "200", "176", "18", "6", "Completed"],
  ["23 Apr 2026 10:05:15 AM", "Camera 2 - Parking", "Vest", "150", "130", "12", "8", "Completed"],
  ["23 Apr 2026 09:21:33 AM", "Camera 2 - Parking", "No Vest", "180", "154", "16", "10", "Completed"],
  ["23 Apr 2026 10:05:15 AM", "Camera 2 - Parking", "Vest", "150", "130", "12", "8", "Completed"],
  ["23 Apr 2026 10:05:15 AM", "Camera 2 - Parking", "Vest", "150", "130", "12", "8", "Completed"],
  ["23 Apr 2026 10:05:15 AM", "Camera 2 - Parking", "Vest", "150", "130", "12", "8", "Completed"],
  ["23 Apr 2026 10:05:15 AM", "Camera 2 - Parking", "Vest", "150", "130", "12", "8", "Completed"],
];

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-lg border border-[#123250] bg-[#04111f]/95 ${className}`}>
      {children}
    </div>
  );
}

function StatCard({ item }) {
  const Icon = item.icon;

  return (
    <Card className="min-h-[76px] p-2 2xl:min-h-[92px] 2xl:p-3">
      <div className="flex h-full items-center gap-2">
        <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg 2xl:h-12 2xl:w-12 ${item.color}`}>
          <Icon size={20} className="text-white 2xl:size-[27px]" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-[8px] font-semibold text-white/70 xl:text-[10px] 2xl:text-[11px]">
            {item.title}
          </p>
          <h3 className="mt-1 text-[15px] font-semibold leading-none text-white xl:text-[16px] 2xl:text-xl">
            {item.value}
          </h3>
          <p className="mt-1 truncate text-[10px] text-white/75 2xl:text-[12px]">
            {item.sub}
          </p>
          {item.trend && (
            <p className={`truncate text-[10px] font-semibold 2xl:text-[11px] ${item.trendColor}`}>
              {item.trend}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

function Badge({ children, color = "emerald" }) {
  const colors = {
    emerald: "bg-emerald-600 text-white",
    red: "bg-red-600 text-white",
    amber: "bg-amber-600 text-white",
    purple: "bg-violet-700 text-white",
    blue: "bg-blue-700 text-white",
  };

  return (
    <span className={`rounded px-2 py-1 text-[9px] font-semibold ${colors[color]}`}>
      {children}
    </span>
  );
}

export default function DatasetManagementPage() {
  return (
    <div className="min-h-screen bg-[#020817] p-0.5 text-white">
      <section className="mb-2 grid grid-cols-5 gap-2">
        {stats.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </section>

      <div className="grid grid-cols-[minmax(0,1fr)_clamp(210px,20vw,260px)] gap-2 2xl:grid-cols-[minmax(0,1fr)_280px]">
        <main className="min-w-0 space-y-2 overflow-hidden">
          <Card>
            <div className="flex flex-col gap-2 border-b border-[#123250] px-3 py-2 text-[12px] sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-white/70">Dataset:</span>
                <strong>PPE Detection Dataset v1</strong>
                <Badge>Default</Badge>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-white/70">
                <span>
                  Created By: <b className="text-white/80">Super Admin</b>
                </span>
                <span>|</span>
                <span className="flex items-center gap-1">
                  23 Apr 2026 10:15 AM <Calendar size={13} />
                </span>
              </div>
            </div>

            <div className="border-b border-[#123250]">
              <div className="flex flex-col gap-2 px-3 py-2 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold 2xl:text-base">
                    Live Capture - Camera 1 (Gate)
                  </h2>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] text-white/70">LIVE</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[12px]">
                  <span className="text-white/70">Capture Mode:</span>
                  <button className="rounded-md border border-[#123250] px-3 py-2 hover:bg-[#0b2238]">
                    Manual
                  </button>
                  <button className="rounded-md bg-blue-700 px-3 py-2">
                    Auto
                  </button>
                  <span className="text-white/70">Interval:</span>
                  <select className="rounded-md border border-[#123250] bg-[#020817] px-3 py-2 outline-none">
                    <option>2 sec</option>
                    <option>5 sec</option>
                    <option>10 sec</option>
                  </select>
                </div>
              </div>

              <div className="relative h-[250px] overflow-hidden bg-[url('/dataset-camera.jpg')] bg-cover bg-center md:h-[285px] 2xl:h-[300px]">
                <div className="absolute inset-0 bg-black/25" />

                <div className="absolute left-[8%] top-[12%] hidden h-[72%] w-[13%] rounded-md border-2 border-emerald-500 md:block">
                  <Badge>Helmet</Badge>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <Badge>Vest</Badge>
                  </div>
                </div>

                <div className="absolute left-[30%] top-[12%] hidden h-[72%] w-[13%] rounded-md border-2 border-red-500 md:block">
                  <Badge color="red">No Helmet</Badge>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <Badge color="red">No Vest</Badge>
                  </div>
                </div>

                <div className="absolute left-[56%] top-[12%] hidden h-[72%] w-[13%] rounded-md border-2 border-emerald-500 md:block">
                  <Badge>Helmet</Badge>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <Badge>Vest</Badge>
                  </div>
                </div>

                <div className="absolute right-[10%] top-[12%] hidden h-[72%] w-[11%] rounded-md border-2 border-emerald-500 md:block">
                  <Badge>Helmet</Badge>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <Badge>Vest</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[160px_190px_minmax(0,1fr)_85px] gap-2 p-3 2xl:grid-cols-[220px_250px_minmax(0,1fr)_110px] 2xl:gap-3 2xl:p-4">
                <button className="flex items-center justify-center gap-2 rounded-md bg-blue-700 px-3 py-3 text-[12px] font-semibold hover:bg-blue-600 2xl:text-sm">
                  <Camera size={16} /> Capture Image
                </button>

                <button className="flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-3 py-3 text-[12px] font-semibold hover:bg-emerald-600 2xl:text-sm">
                  <PlayCircle size={16} /> Auto Capture
                  <span className="rounded-full bg-white/15 px-2 text-[10px]">ON</span>
                </button>

                <div className="rounded-md border border-[#123250] bg-[#031827] px-3 py-2">
                  <p className="text-[12px] font-semibold text-emerald-400 2xl:text-sm">
                    Auto Capture Running
                  </p>
                  <p className="truncate text-[10px] text-white/60 2xl:text-[11px]">
                    Capturing images automatically...
                  </p>
                </div>

                <button className="flex items-center justify-center gap-1 rounded-md border border-[#123250] px-2 py-3 text-[12px] hover:bg-[#0b2238] 2xl:text-sm">
                  <Pause size={15} /> Pause
                </button>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-2 p-3 2xl:gap-3 2xl:p-4">
              <div className="col-span-2 rounded-md border border-[#123250] p-3">
                <div className="flex justify-between">
                  <div>
                    <p className="text-[10px] text-white/70">Target Images</p>
                    <h4 className="text-lg">2000</h4>
                  </div>

                  <div>
                    <p className="text-[10px] text-white/70">Current Count</p>
                    <h4 className="text-lg">342</h4>
                  </div>
                </div>

                <div className="mt-3 h-2 rounded bg-white/10">
                  <div className="h-2 w-[17%] rounded bg-emerald-500" />
                </div>
              </div>

              {[
                ["Valid", "284", "text-emerald-400"],
                ["Blurry", "38", "text-amber-400"],
                ["Needs Label", "20", "text-purple-400"],
                ["Rejected", "0", "text-white/70"],
              ].map(([label, value, color]) => (
                <div key={label} className="rounded-md border border-[#123250] p-3">
                  <p className={`text-[11px] ${color}`}>{label}</p>
                  <h4 className="text-xl 2xl:text-2xl">{value}</h4>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-3 2xl:p-4">
            <h3 className="mb-3 text-sm font-semibold 2xl:text-base">
              Latest Captured Images
            </h3>

            <div className="flex gap-2 overflow-x-auto pb-2 2xl:gap-3">
              {latestImages.map((img, index) => (
                <div
                  key={index}
                  className="w-[145px] min-w-[145px] overflow-hidden rounded-md border border-[#123250] 2xl:w-[170px] 2xl:min-w-[170px]"
                >
                  <div className="relative h-24 bg-gradient-to-br from-[#1a2d3d] to-[#07111f] 2xl:h-28">
                    <span className="absolute left-2 top-2">
                      <Badge color={img.status === "Valid" ? "emerald" : img.status === "Blurry" ? "amber" : "purple"}>
                        {img.status}
                      </Badge>
                    </span>
                  </div>

                  <div className="space-y-1 p-2 text-[10px] 2xl:text-[11px]">
                    <p>{img.time}</p>
                    <p className="text-white/70">
                      <span className="text-emerald-400">●</span> Quality: {img.quality}
                    </p>
                  </div>
                </div>
              ))}

              <button className="grid min-h-[140px] w-[145px] min-w-[145px] place-items-center rounded-md border border-dashed border-white/40 text-white/70 hover:bg-[#0b2238] 2xl:min-h-[155px] 2xl:w-[170px] 2xl:min-w-[170px]">
                <div className="text-center">
                  <Plus size={28} className="mx-auto" />
                  <p className="mt-2 text-sm">More Images</p>
                </div>
              </button>
            </div>
          </Card>

          <Card className="flex items-center gap-2 overflow-hidden p-2 text-[11px] 2xl:gap-3 2xl:p-3 2xl:text-[12px]">
            <span className="shrink-0 text-white/70">Smart Filters:</span>

            {[
              [Filter, "Blur Filter"],
              [Copy, "Duplicate Filter"],
              [Sun, "Low Light Filter"],
            ].map(([Icon, label]) => (
              <button
                key={label}
                className="flex shrink-0 items-center gap-1.5 rounded-md border border-[#123250] px-2 py-2 text-[11px] 2xl:gap-2 2xl:px-3 2xl:text-[12px]"
              >
                <Icon size={14} /> {label}
                <span className="rounded bg-emerald-600 px-1.5 text-[9px] 2xl:px-2 2xl:text-[10px]">
                  ON
                </span>
              </button>
            ))}

            <div className="ml-auto flex shrink-0 items-center gap-1.5">
              <span className="text-white/70">Min Face Size:</span>
              <select className="rounded-md border border-[#123250] bg-[#020817] px-2 py-2 text-[11px] outline-none 2xl:px-3 2xl:text-[12px]">
                <option>Medium</option>
                <option>Small</option>
                <option>Large</option>
              </select>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="flex items-center justify-between px-3 py-3">
              <h3 className="font-semibold">Dataset Collection Logs</h3>
              <button className="text-[12px] text-white/70">View All ›</button>
            </div>

            <div className="max-h-[210px] overflow-auto">
              <table className="w-full min-w-[760px] text-left text-[11px] 2xl:min-w-[850px] 2xl:text-[12px]">
                <thead className="sticky top-0 z-10 bg-[#0b1a2a] text-white/70">
                  <tr>
                    {["Time", "Camera", "Class", "Captured", "Valid", "Blurry", "Needs Label", "Status", "Action"].map((h) => (
                      <th key={h} className="px-3 py-2 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {logs.map((row, i) => (
                    <tr key={i} className="border-t border-[#123250]">
                      {row.map((cell, index) => (
                        <td key={index} className="px-3 py-2">
                          {index === 7 ? (
                            <Badge color={cell === "Completed" ? "emerald" : "blue"}>{cell}</Badge>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}

                      <td className="px-3 py-2">
                        <button className="flex items-center gap-1 text-white/80">
                          <Eye size={14} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </main>

        <aside className="min-w-0 space-y-2">
          <Card className="p-2.5 2xl:p-3">
            <h3 className="mb-3 text-[13px] font-semibold 2xl:text-sm">
              Dataset Configuration
            </h3>

            <p className="mb-2 text-[10px] text-white/70 2xl:text-[11px]">
              Select Class (Active)
            </p>

            <div className="mb-4 flex flex-wrap gap-1.5 2xl:gap-2">
              {["Helmet", "No Helmet", "Vest", "No Vest"].map((item, i) => (
                <button
                  key={item}
                  className={`rounded-md border px-2 py-1.5 text-[9px] 2xl:text-[10px] ${
                    i % 2 === 0 ? "border-emerald-500 text-emerald-400" : "border-red-500 text-red-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="space-y-3 text-[10px] text-white/70 2xl:text-[11px]">
              <p>
                Description
                <br />
                <span className="text-white">Helmet, Vest, Person, No Helmet, No Vest</span>
              </p>

              <p>
                Created By
                <br />
                <span className="text-white">Super Admin</span>
              </p>

              <p>
                Created On
                <br />
                <span className="text-white">23 Apr 2026 10:15 AM</span>
              </p>

              <p>
                Last Updated
                <br />
                <span className="text-white">23 Apr 2026 02:45 PM</span>
              </p>
            </div>
          </Card>

          <Card className="p-2.5 2xl:p-3">
            <h3 className="mb-3 text-[13px] font-semibold 2xl:text-sm">
              Target Settings
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-[10px] text-white/70 2xl:text-[11px]">Target Images</p>
                <div className="mt-1 rounded-md border border-[#123250] px-2 py-2 text-[10px] 2xl:px-3 2xl:text-[11px]">
                  2000
                </div>
              </div>

              <div>
                <p className="text-[10px] text-white/70 2xl:text-[11px]">Current Count</p>
                <div className="mt-1 py-2 text-lg font-semibold text-emerald-400 2xl:text-xl">
                  342
                </div>
              </div>
            </div>

            <div className="mt-3 h-2 rounded bg-white/10">
              <div className="h-2 w-[17%] rounded bg-emerald-500" />
            </div>

            <p className="mt-1 text-right text-[10px] text-white/70">17.1%</p>
          </Card>

          <Card className="p-2.5 2xl:p-3">
            <h3 className="mb-3 text-[13px] font-semibold 2xl:text-sm">
              Labeling Status
            </h3>

            <div className="flex items-center justify-between text-[10px] 2xl:text-[11px]">
              <span>
                Auto Label (YOLO) <Info size={12} className="inline" />
              </span>

              <span className="rounded-full bg-emerald-600 px-3 py-1 text-[9px]">
                ON
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2 text-[10px] 2xl:text-[11px]">
              <span>Pending Review</span>
              <span className="text-amber-400">124 images</span>

              <button className="rounded border border-blue-600 px-2 py-1 text-[9px]">
                Review Now
              </button>
            </div>
          </Card>

          <Card className="p-2.5 2xl:p-3">
            <h3 className="mb-4 text-[13px] font-semibold 2xl:text-sm">
              Class Distribution
            </h3>

            <div className="mx-auto grid h-26 w-26 place-items-center rounded-full bg-[conic-gradient(#16a34a_0_26%,#ef4444_26%_51%,#0ea5e9_51%_76%,#6d28d9_76%_88%,#f59e0b_88%_100%)] 2xl:h-28 2xl:w-28">
              <div className="grid h-18 w-18 place-items-center rounded-full bg-[#04111f] text-center 2xl:h-16 2xl:w-16">
                <div>
                  <p className="text-sm 2xl:text-base">12,458</p>
                  <p className="text-[8px] text-white/70">Total Images</p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-[10px] 2xl:text-[10px]">
              {[
                ["Helmet", "3,245 (26.0%)", "bg-emerald-500"],
                ["Vest", "3,128 (25.1%)", "bg-red-500"],
                ["Person", "3,102 (24.9%)", "bg-sky-500"],
                ["No Helmet", "1,542 (12.4%)", "bg-violet-600"],
                ["No Vest", "1,441 (11.6%)", "bg-amber-500"],
              ].map(([label, value, color]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${color}`} />
                    {label}
                  </span>

                  <span>{value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-2.5 2xl:p-3">
            <h3 className="mb-3 text-[13px] font-semibold 2xl:text-sm">
              Quick Actions
            </h3>

            <div className="space-y-2">
              {[
                [Eye, "View / Review Images", "Browse and review captured images", "bg-blue-700"],
                [Camera, "Label Images", "Label or re-label dataset", "bg-emerald-700"],
                [Upload, "Export Dataset", "Export images and labels", "bg-amber-600"],
                [Archive, "Prepare for Training", "Use this dataset for model training", "bg-violet-700"],
              ].map(([Icon, title, sub, color]) => (
                <button
                  key={title}
                  className={`flex w-full items-center gap-2 rounded-md ${color} px-2 py-2 text-left 2xl:px-3`}
                >
                  <Icon size={15} />

                  <span>
                    <b className="block text-[10px] 2xl:text-[11px]">{title}</b>
                    <small className="text-[10px] text-white/75 2xl:text-[9px]">{sub}</small>
                  </span>
                </button>
              ))}
            </div>
          </Card>

          <button className="flex w-full items-center justify-center gap-2 rounded-md border border-red-600 px-3 py-3 text-xs font-semibold text-red-500 hover:bg-red-950/30 2xl:text-sm">
            <Trash2 size={16} /> Archive Dataset
          </button>
        </aside>
      </div>
    </div>
  );
}