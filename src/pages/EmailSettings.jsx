import { useState } from "react";
import {
  AlertTriangle,
  Bell,
  Camera,
  ChevronDown,
  Database,
  Download,
  Eye,
  Info,
  Pencil,
  Plus,
  Save,
  Send,
  Shield,
  Trash2,
  User,
} from "lucide-react";

const alertsData = [
  ["Helmet Missing", "Alert when helmet is not detected", AlertTriangle, "bg-yellow-500", true],
  ["Vest Missing", "Alert when safety vest is not detected", Shield, "bg-orange-500", true],
  ["No PPE", "Alert when neither helmet nor vest is detected", Bell, "bg-cyan-500", true],
  ["Unauthorized Access", "Alert for unrecognized persons", User, "bg-teal-500", true],
  ["Camera Offline", "Alert when camera goes offline", Camera, "bg-blue-500", true],
  ["System Alerts", "System errors and critical notifications", Database, "bg-blue-600", true],
  ["Daily Summary", "Daily summary of compliance statistics", Bell, "bg-cyan-500", true],
  ["Weekly Report", "Weekly compliance report", Download, "bg-purple-600", false],
];

const recipients = [
  ["safety.manager@company.com", "John Safety Manager", "Safety Manager", "All Alerts"],
  ["site.supervisor@company.com", "Mike Supervisor", "Site Supervisor", "Critical Only"],
  ["hr.manager@company.com", "Sarah HR Manager", "HR Manager", "Unauthorized Access"],
  ["admin@company.com", "System Administrator", "Administrator", "All Alerts"],
  ["admin2@company.com", "System Administrator", "Administrator", "All Alerts"],
  ["admin3@company.com", "System Administrator", "Administrator", "All Alerts"],
  ["admin4@company.com", "System Administrator", "Administrator", "All Alerts"],
];

function Toggle({ enabled }) {
  return (
    <button
      className={`relative h-5 w-9 shrink-0 rounded-full transition ${
        enabled ? "bg-emerald-500" : "bg-slate-700"
      }`}
    >
      <span
        className={`absolute top-1 h-3 w-3 rounded-full bg-white transition ${
          enabled ? "right-1" : "left-1"
        }`}
      />
    </button>
  );
}

export default function EmailSettings() {
  const [alerts, setAlerts] = useState(
    alertsData.map((item, index) => ({ id: index + 1, item }))
  );

  const toggleAlert = (id) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              item: [
                alert.item[0],
                alert.item[1],
                alert.item[2],
                alert.item[3],
                !alert.item[4],
              ],
            }
          : alert
      )
    );
  };

  return (
    <div className="w-full max-w-full px-0.5 pb-1">
      <div className="grid w-full grid-cols-1 items-start gap-2 md:grid-cols-[300px_minmax(0,1fr)] 2xl:grid-cols-[360px_minmax(0,1fr)]">
        {/* LEFT SIDE */}
        <div className="min-w-0 space-y-2">
          <div className="rounded-lg border border-[#123250] bg-[#03111f] p-4 md:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-white">
                Email Configuration
              </h2>
              <span className="shrink-0 rounded bg-emerald-600 px-2 py-1 text-[11px] font-semibold text-white">
                Enabled
              </span>
            </div>

            <div className="space-y-4">
              {[
                ["Email Provider", "SMTP (Custom)", "select"],
                ["SMTP Server", "smtp.gmail.com"],
                ["Port", "587"],
                ["Encryption", "TLS", "select"],
                ["Sender Email", "mygaterlive@gmail.com"],
                ["Username", "mygaterlive@gmail.com"],
              ].map(([label, value, type]) => (
                <div key={label}>
                  <label className="mb-1.5 block text-sm text-white/70">
                    {label}
                  </label>

                  <div className="relative">
                    {type === "select" ? (
                      <select
                        defaultValue={value}
                        className="h-10 w-full appearance-none rounded-md border border-[#123250] bg-[#061421] px-3 pr-8 text-xs text-white outline-none focus:border-blue-500"
                      >
                        <option>{value}</option>
                      </select>
                    ) : (
                      <input
                        defaultValue={value}
                        className="h-10 w-full rounded-md border border-[#123250] bg-[#061421] px-3 text-xs text-white outline-none focus:border-blue-500"
                      />
                    )}

                    {type === "select" && (
                      <ChevronDown
                        size={15}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                      />
                    )}
                  </div>
                </div>
              ))}

              <div>
                <label className="mb-1.5 block text-sm text-white/70">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    defaultValue="password123"
                    className="h-10 w-full rounded-md border border-[#123250] bg-[#061421] px-3 pr-9 text-xs text-white outline-none focus:border-blue-500"
                  />
                  <Eye
                    size={15}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                  />
                </div>
              </div>

              <button className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-blue-700 text-sm font-semibold text-white hover:bg-blue-600">
                <Save size={17} />
                Save Configuration
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-[#123250] bg-[#03111f] p-4">
            <h3 className="text-base font-semibold text-white">
              Test Connection
            </h3>
            <p className="mt-1 text-sm text-white/60">
              Send a test email to verify your email configuration
            </p>

            <input
              placeholder="Enter test email address"
              className="mt-4 h-10 w-full rounded-md border border-[#123250] bg-[#061421] px-3 text-xs text-white outline-none placeholder:text-white/40 focus:border-blue-500"
            />

            <button className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-md border border-blue-700 text-sm font-semibold text-blue-500 hover:bg-blue-950/40">
              <Send size={17} />
              Send Test Email
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="min-w-0 space-y-2">
          <div className="rounded-lg border border-[#123250] bg-[#03111f]">
            <div className="p-3">
              <h2 className="text-base font-semibold text-white">
                Alert Settings
              </h2>
              <p className="text-sm text-white/60">
                Configure which alerts should be sent via email
              </p>
            </div>

            <table className="w-full table-fixed text-left text-xs">
              <thead>
                <tr className="border-y border-[#123250] text-white/70">
                  <th className="w-[38%] px-2 py-3 font-medium md:px-4">
                    Alert Type
                  </th>
                  <th className="w-[47%] px-2 py-3 font-medium md:px-4">
                    Description
                  </th>
                  <th className="w-[15%] px-2 py-3 text-right font-medium md:px-4">
                    Email
                  </th>
                </tr>
              </thead>

              <tbody>
                {alerts.map(({ id, item }) => {
                  const [title, desc, Icon, bg, enabled] = item;

                  return (
                    <tr key={id} className="border-b border-[#123250]">
                      <td className="px-2 py-2 md:px-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <span
                            className={`grid h-8 w-8 shrink-0 place-items-center rounded-md ${bg}`}
                          >
                            <Icon size={16} />
                          </span>
                          <span className="break-words font-semibold text-white">
                            {title}
                          </span>
                        </div>
                      </td>

                      <td className="break-words px-2 py-3 text-white/70 md:px-4">
                        {desc}
                      </td>

                      <td className="px-2 py-3 text-right md:px-4">
                        <span onClick={() => toggleAlert(id)}>
                          <Toggle enabled={enabled} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* FIXED HEIGHT RECIPIENT CARD */}
          <div className="rounded-lg border border-[#123250] bg-[#03111f]">
            <div className="p-3">
              <h2 className="text-base font-semibold text-white">
                Alert Recipients
              </h2>
              <p className="text-sm text-white/60">
                Manage email recipients for alerts
              </p>
            </div>

            <div className="h-[195px] overflow-y-auto overflow-x-hidden border-y border-[#123250]">
              <table className="w-full table-fixed text-left text-xs">
                <thead className="sticky top-0 z-10 bg-[#03111f]">
                  <tr className="border-b border-[#123250] text-white/70">
                    <th className="w-[25%] px-2 py-3 font-medium md:px-4">
                      Email
                    </th>
                    <th className="w-[20%] px-2 py-3 font-medium md:px-4">
                      Name
                    </th>
                    <th className="w-[17%] px-2 py-3 font-medium md:px-4">
                      Role
                    </th>
                    <th className="w-[18%] px-2 py-3 font-medium md:px-4">
                      Alert Type
                    </th>
                    <th className="w-[10%] px-2 py-3 font-medium md:px-4">
                      Status
                    </th>
                    <th className="w-[10%] px-2 py-3 text-right font-medium md:px-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recipients.map(([email, name, role, type], index) => (
                    <tr
                      key={`${email}-${index}`}
                      className="border-b border-[#123250]"
                    >
                      <td className="break-words px-2 py-3 text-white/80 md:px-4">
                        {email}
                      </td>
                      <td className="break-words px-2 py-3 text-white md:px-4">
                        {name}
                      </td>
                      <td className="break-words px-2 py-3 text-white/80 md:px-4">
                        {role}
                      </td>
                      <td className="break-words px-2 py-3 text-white/80 md:px-4">
                        {type}
                      </td>
                      <td className="px-2 py-3 md:px-4">
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-500">
                          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      </td>
                      <td className="px-2 py-3 md:px-4">
                        <div className="flex justify-end gap-2 md:gap-3">
                          <button className="text-blue-500">
                            <Pencil size={15} />
                          </button>
                          <button className="text-red-500">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">
              <button className="flex h-8 w-fit items-center gap-2 rounded-md border border-blue-700 px-3 text-xs font-semibold text-blue-500 hover:bg-blue-950/40">
                <Plus size={15} />
                Add Recipient
              </button>

              <p className="flex items-center gap-2 text-xs text-white/60">
                <Info size={15} className="shrink-0 text-blue-500" />
                Email alerts are sent in real-time based on your configuration
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}