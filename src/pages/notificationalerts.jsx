import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  BellOff,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Info,
  RefreshCcw,
  Search,
  Settings,
  ShieldAlert,
  Trash2,
  X,
} from "lucide-react";

const summaryCards = [
  {
    title: "TOTAL ALERTS",
    value: "126",
    subtitle: "All Time",
    trend: "↑ 18.6% vs yesterday",
    icon: Bell,
    bg: "bg-red-600",
    trendColor: "text-red-400",
  },
  {
    title: "HIGH PRIORITY",
    value: "32",
    subtitle: "Requires Attention",
    trend: "↑ 12.4% vs yesterday",
    icon: AlertTriangle,
    bg: "bg-orange-500",
    trendColor: "text-orange-400",
  },
  {
    title: "PENDING",
    value: "18",
    subtitle: "Unacknowledged",
    trend: "↑ 5.2% vs yesterday",
    icon: Info,
    bg: "bg-yellow-500",
    trendColor: "text-yellow-400",
  },
  {
    title: "RESOLVED",
    value: "94",
    subtitle: "This Week",
    trend: "↑ 22.8% vs last week",
    icon: CheckCircle2,
    bg: "bg-emerald-600",
    trendColor: "text-emerald-400",
  },
  {
    title: "SILENCED",
    value: "6",
    subtitle: "Active",
    trend: "↓ 2.1% vs yesterday",
    icon: BellOff,
    bg: "bg-blue-600",
    trendColor: "text-blue-400",
  },
];

const alerts = [
  {
    time: "23 Apr 2026\n12:04:32 PM",
    type: "PPE Violation",
    message: "No Helmet detected",
    source: "Camera 2 - Parking",
    severity: "High",
    status: "New",
    icon: ShieldAlert,
    bg: "bg-red-600",
  },
  {
    time: "23 Apr 2026\n12:03:45 PM",
    type: "PPE Violation",
    message: "No Vest detected",
    source: "Camera 4 - Entrance",
    severity: "High",
    status: "New",
    icon: AlertTriangle,
    bg: "bg-orange-500",
  },
  {
    time: "23 Apr 2026\n12:03:12 PM",
    type: "General Alert",
    message: "Unauthorized access detected",
    source: "Camera 1 - Gate",
    severity: "Medium",
    status: "Acknowledged",
    icon: Info,
    bg: "bg-yellow-500",
  },
  {
    time: "23 Apr 2026\n12:02:18 PM",
    type: "PPE Violation",
    message: "No Helmet & No Vest",
    source: "Camera 3 - Warehouse",
    severity: "High",
    status: "New",
    icon: ShieldAlert,
    bg: "bg-red-600",
  },
  {
    time: "23 Apr 2026\n12:02:18 PM",
    type: "PPE Violation",
    message: "No Helmet & No Vest",
    source: "Camera 3 - Warehouse",
    severity: "High",
    status: "New",
    icon: ShieldAlert,
    bg: "bg-red-600",
  },
  {
    time: "23 Apr 2026\n12:02:18 PM",
    type: "PPE Violation",
    message: "No Helmet & No Vest",
    source: "Camera 3 - Warehouse",
    severity: "High",
    status: "New",
    icon: ShieldAlert,
    bg: "bg-red-600",
  },
  {
    time: "23 Apr 2026\n12:02:18 PM",
    type: "PPE Violation",
    message: "No Helmet & No Vest",
    source: "Camera 3 - Warehouse",
    severity: "High",
    status: "New",
    icon: ShieldAlert,
    bg: "bg-red-600",
  },
  {
    time: "23 Apr 2026\n12:02:18 PM",
    type: "PPE Violation",
    message: "No Helmet & No Vest",
    source: "Camera 3 - Warehouse",
    severity: "High",
    status: "New",
    icon: ShieldAlert,
    bg: "bg-red-600",
  },
  {
    time: "23 Apr 2026\n12:02:18 PM",
    type: "PPE Violation",
    message: "No Helmet & No Vest",
    source: "Camera 3 - Warehouse",
    severity: "High",
    status: "New",
    icon: ShieldAlert,
    bg: "bg-red-600",
  },
  {
    time: "23 Apr 2026\n11:55:10 AM",
    type: "PPE Violation",
    message: "No Helmet detected",
    source: "Camera 1 - Gate",
    severity: "High",
    status: "Acknowledged",
    icon: ShieldAlert,
    bg: "bg-orange-500",
  },
  {
    time: "23 Apr 2026\n11:55:10 AM",
    type: "PPE Violation",
    message: "No Helmet detected",
    source: "Camera 1 - Gate",
    severity: "High",
    status: "Acknowledged",
    icon: ShieldAlert,
    bg: "bg-orange-500",
  },
  {
    time: "23 Apr 2026\n11:52:33 AM",
    type: "PPE Violation",
    message: "Multiple violations detected",
    source: "Camera 2 - Parking",
    severity: "Medium",
    status: "New",
    icon: AlertTriangle,
    bg: "bg-yellow-500",
  },
  {
    time: "23 Apr 2026\n11:45:22 AM",
    type: "System",
    message: "Dataset export completed",
    source: "System",
    severity: "Low",
    status: "Resolved",
    icon: Check,
    bg: "bg-emerald-600",
  },
  {
    time: "23 Apr 2026\n11:40:05 AM",
    type: "General Alert",
    message: "New person enrolled",
    source: "Face Enrollment",
    severity: "Low",
    status: "Resolved",
    icon: Info,
    bg: "bg-blue-600",
  },
];

function severityClass(value) {
  if (value === "High") return "border-red-500 text-red-400";
  if (value === "Medium") return "border-yellow-500 text-yellow-400";
  return "border-blue-500 text-blue-400";
}

function statusDot(value) {
  if (value === "New") return "bg-red-500";
  if (value === "Acknowledged") return "bg-blue-600";
  return "bg-emerald-600";
}

export default function NotificationAlerts() {
  const [selectedAlert, setSelectedAlert] = useState(alerts[0]);
  const SelectedIcon = selectedAlert.icon;

  const todayStats = useMemo(
    () => [
      ["High", "12", "bg-red-500"],
      ["Medium", "8", "bg-orange-500"],
      ["Low", "4", "bg-blue-600"],
      ["Info", "2", "bg-emerald-500"],
    ],
    []
  );

  return (
    <main className="w-full overflow-x-hidden bg-[#020817] p-2 text-white sm:p-0.5">
      <div className="mb-3 grid w-full grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="flex h-[86px] min-w-0 items-center gap-3 rounded-md border border-[#123250] bg-[#061421] px-3 py-3"
            >
              <div
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${card.bg}`}
              >
                <Icon size={21} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[11px] font-bold text-white/80 sm:text-[11px]">
                  {card.title}
                </p>
                <h3 className="text-[16px] font-bold leading-tight">
                  {card.value}
                </h3>
                <p className="truncate text-[9px] text-white/70 sm:text-[11px]">
                  {card.subtitle}
                </p>
                <p
                  className={`truncate text-[9px] font-semibold sm:text-[11px] ${card.trendColor}`}
                >
                  {card.trend}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <section className="grid min-h-[calc(100vh-130px)] min-w-0 grid-cols-1 gap-2 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_300px] 2xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col space-y-2">
          <div className="rounded-md border border-[#123250] bg-[#061421] p-3">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_88px_88px_88px_130px_70px] xl:grid-cols-[minmax(0,1.4fr)_105px_105px_105px_160px_82px]">
              <div className="relative min-w-0">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
                />
                <input
                  className="h-10 w-full min-w-0 rounded-md border border-[#123250] bg-[#020817] pl-9 pr-3 text-[11px] outline-none placeholder:text-white/50 focus:border-blue-500"
                  placeholder="Search alerts by message, camera, or type..."
                />
              </div>

              {["Severity: All", "Status: All", "Type: All"].map((item) => (
                <button
                  key={item}
                  className="flex h-10 min-w-0 items-center justify-between rounded-md border border-[#123250] bg-[#020817] px-2 text-[10px] hover:bg-[#0b2238]"
                >
                  <span className="truncate">{item}</span>
                  <ChevronDown size={12} className="shrink-0" />
                </button>
              ))}

              <button className="flex h-10 min-w-0 items-center justify-between rounded-md border border-[#123250] bg-[#020817] px-2 text-[10px] hover:bg-[#0b2238]">
                <span className="flex min-w-0 items-center gap-1 truncate">
                  <CalendarDays size={12} className="shrink-0" />
                  <span className="truncate">23 Apr 2026 - 23 Apr</span>
                </span>
                <ChevronDown size={12} className="shrink-0" />
              </button>

              <button className="flex h-10 items-center justify-center gap-1 rounded-md border border-[#123250] bg-[#020817] px-2 text-[10px] hover:bg-[#0b2238]">
                <Filter size={12} />
                Filters
              </button>
            </div>
          </div>

          <div className="flex h-[752px] min-w-0 flex-col overflow-hidden rounded-md border border-[#123250] bg-[#061421]">
            <div className="hidden flex-1 overflow-auto lg:block">
              <div className="min-w-[740px]">
                <table className="w-full table-fixed text-left text-[11px]">
                  <colgroup>
                    <col className="w-[13%]" />
                    <col className="w-[16%]" />
                    <col className="w-[23%]" />
                    <col className="w-[17%]" />
                    <col className="w-[10%]" />
                    <col className="w-[13%]" />
                    <col className="w-[8%]" />
                  </colgroup>

                  <thead className="sticky top-0 z-10 bg-[#082033] text-white/80">
                    <tr>
                      {[
                        "Time ↓",
                        "Type",
                        "Message",
                        "Source",
                        "Severity",
                        "Status",
                        "Actions",
                      ].map((head) => (
                        <th
                          key={head}
                          className="border-b border-[#123250] px-2.5 py-3 font-medium"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {alerts.map((alert, index) => {
                      const Icon = alert.icon;

                      return (
                        <tr
                          key={index}
                          className="h-[58px] border-b border-[#123250] hover:bg-[#0b2238]"
                        >
                          <td className="whitespace-pre-line px-2.5 py-3 text-white/80">
                            {alert.time}
                          </td>

                          <td className="px-2.5 py-3">
                            <div className="flex min-w-0 items-center gap-1.5">
                              <span
                                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${alert.bg}`}
                              >
                                <Icon size={12} />
                              </span>
                              <span className="truncate font-semibold">
                                {alert.type}
                              </span>
                            </div>
                          </td>

                          <td className="truncate px-2.5 py-3 font-semibold">
                            {alert.message}
                          </td>

                          <td className="truncate px-2.5 py-3 font-semibold">
                            {alert.source}
                          </td>

                          <td className="px-2.5 py-3">
                            <span
                              className={`inline-flex rounded border px-2 py-0.5 text-[9px] ${severityClass(
                                alert.severity
                              )}`}
                            >
                              {alert.severity}
                            </span>
                          </td>

                          <td className="px-2.5 py-3">
                            <span className="flex min-w-0 items-center gap-1.5 font-semibold">
                              <span
                                className={`h-2 w-2 shrink-0 rounded-full ${statusDot(
                                  alert.status
                                )}`}
                              />
                              <span className="truncate">{alert.status}</span>
                            </span>
                          </td>

                          <td className="px-2.5 py-3">
                            <div className="flex gap-1">
                              <button
                                onClick={() => setSelectedAlert(alert)}
                                className="grid h-6 w-6 place-items-center rounded border border-[#22425f] hover:bg-[#0b2238]"
                              >
                                <Eye size={12} />
                              </button>

                              <button className="grid h-6 w-6 place-items-center rounded border border-[#22425f] hover:bg-[#0b2238]">
                                {alert.status === "New" ? (
                                  <Check size={12} />
                                ) : (
                                  <RefreshCcw size={12} />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="h-[560px] space-y-2 overflow-y-auto p-2 lg:hidden">
              {alerts.map((alert, index) => {
                const Icon = alert.icon;

                return (
                  <div
                    key={index}
                    className="rounded-md border border-[#123250] bg-[#020817] p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-3">
                        <span
                          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${alert.bg}`}
                        >
                          <Icon size={16} />
                        </span>

                        <div>
                          <h3 className="text-sm font-semibold">
                            {alert.message}
                          </h3>
                          <p className="text-xs text-white/60">{alert.type}</p>
                        </div>
                      </div>

                      <span
                        className={`rounded border px-2 py-1 text-[10px] ${severityClass(
                          alert.severity
                        )}`}
                      >
                        {alert.severity}
                      </span>
                    </div>

                    <div className="mt-3 grid gap-1 text-xs text-white/70">
                      <p className="whitespace-pre-line">{alert.time}</p>
                      <p>{alert.source}</p>
                      <p className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${statusDot(
                            alert.status
                          )}`}
                        />
                        {alert.status}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedAlert(alert)}
                      className="mt-3 h-8 w-full rounded border border-[#22425f] text-xs hover:bg-[#0b2238]"
                    >
                      View Details
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-2 border-t border-[#123250] px-3 py-2 text-[11px] text-white/70 md:flex-row md:items-center md:justify-between">
              <p>Showing 1 to 10 of 126 alerts</p>

              <div className="flex flex-wrap items-center gap-1.5">
                <button className="grid h-7 w-7 place-items-center rounded border border-[#22425f]">
                  <ChevronLeft size={13} />
                </button>

                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`grid h-7 w-7 place-items-center rounded border border-[#22425f] ${
                      page === 1 ? "bg-blue-700 text-white" : ""
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <span>...</span>

                <button className="grid h-7 w-7 place-items-center rounded border border-[#22425f]">
                  13
                </button>

                <button className="grid h-7 w-7 place-items-center rounded border border-[#22425f]">
                  <ChevronRight size={13} />
                </button>

                <button className="flex h-7 items-center gap-2 rounded border border-[#22425f] px-2">
                  Rows: 10
                  <ChevronDown size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside className="min-w-0 space-y-2 lg:w-[280px] xl:w-[300px] 2xl:w-[320px]">
          <section className="min-h-[287px] rounded-md border border-[#123250] bg-[#061421] p-3">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[12px] font-bold">Alert Details</h2>
              <button>
                <X size={15} />
              </button>
            </div>

            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded bg-red-600">
                  <SelectedIcon size={15} />
                </span>
                <p className="truncate text-[12px] font-semibold">
                  {selectedAlert.type}
                </p>
              </div>

              <span
                className={`rounded border px-2 py-0.5 text-[10px] ${severityClass(
                  selectedAlert.severity
                )}`}
              >
                {selectedAlert.severity}
              </span>
            </div>

            <div className="space-y-3 text-[11px]">
              <div>
                <p className="text-white/50">Message</p>
                <p className="font-semibold">{selectedAlert.message}</p>
              </div>

              <div>
                <p className="text-white/50">Source</p>
                <p className="font-semibold">{selectedAlert.source}</p>
              </div>

              <div>
                <p className="text-white/50">Time</p>
                <p className="font-medium text-white/90">
                  {selectedAlert.time.replace("\n", " ")}
                </p>
              </div>


              <div>
                <p className="text-white/50">Status</p>
                <p className="flex items-center gap-2 font-semibold">
                  <span
                    className={`h-2 w-2 rounded-full ${statusDot(
                      selectedAlert.status
                    )}`}
                  />
                  {selectedAlert.status}
                </p>
              </div>

              <div>
                <p className="text-white/50">Description</p>
                <p className="text-[11px] text-white/75">
                  PPE violation detected in the monitored area.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-md border border-[#123250] bg-[#061421] p-3">
            <h2 className="mb-2 text-[12px] font-bold">Alert Snapshot</h2>

            <div className="overflow-hidden rounded-md border border-[#123250]">
              <img
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
                alt="Alert Snapshot"
                className="h-36 w-full object-cover"
              />
            </div>

            <button className="mt-1.5 w-full text-[10px] hover:text-blue-400">
              View in Live ↗
            </button>
          </section>

          <section className="rounded-md border border-[#123250] bg-[#061421] p-3">
            <h2 className="mb-3 text-[13px] font-bold">Alert Statistics (Today)</h2>

            <div className="flex items-center gap-4">
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-[conic-gradient(#ef4444_0_46%,#f97316_46%_77%,#2563eb_77%_92%,#22c55e_92%_100%)]">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-[#061421] text-center">
                  <span className="text-xl font-bold leading-none">26</span>
                  <span className="text-[10px] text-white/60">Total</span>
                </div>
              </div>

              <div className="flex-1 space-y-2 text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="flex-1">High</span>
                  <span>12 (46.2%)</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  <span className="flex-1">Medium</span>
                  <span>8 (30.8%)</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  <span className="flex-1">Low</span>
                  <span>4 (15.4%)</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="flex-1">Info</span>
                  <span>2 (7.6%)</span>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-md border border-[#123250] bg-[#061421] p-3">
            <h2 className="mb-2 text-[12px] font-bold">Quick Actions</h2>

            <div className="grid grid-cols-2 gap-1.5">
              <button className="rounded-md bg-blue-700 px-1.5 py-2.5 text-[11px] font-medium hover:bg-blue-600">
                <CheckCircle2 className="mx-auto mb-1" size={14} />
                Acknowledge
              </button>

              <button className="rounded-md bg-emerald-700 px-1.5 py-2.5 text-[11px] font-medium hover:bg-emerald-600">
                <CheckCircle2 className="mx-auto mb-1" size={14} />
                Mark as Resolved
              </button>

              <button className="rounded-md bg-orange-600 px-1.5 py-2.5 text-[11px] font-medium hover:bg-orange-500">
                <Bell className="mx-auto mb-1" size={14} />
                Snooze Alert
              </button>

              <button className="rounded-md bg-red-700 px-1.5 py-2.5 text-[11px] font-medium hover:bg-red-600">
                <Trash2 className="mx-auto mb-1" size={14} />
                Delete Alert
              </button>
            </div>
          </section>

          <button className="flex w-full items-center justify-between rounded-md border border-[#123250] bg-[#061421] p-3 text-left hover:bg-[#0b2238]">
            <span className="flex min-w-0 items-center gap-2">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded border border-[#22425f]">
                <Settings size={13} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[11px] font-bold">
                  Notification Preferences
                </span>
                <span className="block truncate text-[11px] text-white/50">
                  Manage alert rules
                </span>
              </span>
            </span>

            <ChevronRight size={13} className="shrink-0" />
          </button>
        </aside>
      </section>
    </main>
  );
}