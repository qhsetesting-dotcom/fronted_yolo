import {
  AppWindow,
  Archive,
  Bell,
  Calendar,
  ChevronDown,
  Clock,
  Database,
  FileText,
  Gauge,
  Globe,
  Image,
  LayoutDashboard,
  List,
  Lock,
  Monitor,
  Moon,
  Palette,
  Play,
  RefreshCcw,
  RotateCcw,
  Save,
  ShieldAlert,
  Sun,
  Timer,
  Volume2,
} from "lucide-react";

function Toggle({ enabled = true }) {
  return (
    <button
      type="button"
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        enabled ? "bg-emerald-500" : "bg-slate-600"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          enabled ? "right-1" : "left-1"
        }`}
      />
    </button>
  );
}

const selectClass =
  "h-9 w-full appearance-none rounded-md border border-[#123250] bg-[#061421] px-3 pr-9 text-sm text-white outline-none focus:border-blue-500";

const inputBoxClass =
  "h-9 w-full rounded-md border border-[#123250] bg-[#061421] px-3 text-sm text-white outline-none focus:border-blue-500";

const fieldWidth = "w-full sm:w-[260px] 2xl:w-[320px]";
const wideFieldWidth = "w-full sm:w-[260px] 2xl:w-[360px]";

function Row({ icon, title, desc, children, last = false, py = "py-3" }) {
  return (
    <div
      className={`flex flex-col gap-3 px-2 ${py} sm:flex-row sm:items-center sm:justify-between ${
        last ? "" : "border-b border-[#123250]"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        {icon}
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-white">{title}</h4>
          <p className="break-words text-xs text-white/60">{desc}</p>
        </div>
      </div>

      <div className="w-full shrink-0 sm:w-auto">{children}</div>
    </div>
  );
}

function IconBox({ color, children }) {
  return (
    <span
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-md ${color}`}
    >
      {children}
    </span>
  );
}

export default function SettingsPage() {
  return (
    <div className="w-full max-w-full overflow-x-hidden px-0.5 pb-1 text-white">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        {/* LEFT COLUMN */}
        <div className="min-w-0 space-y-2">
          <div className="rounded-lg border border-[#123250] bg-[#03111f]">
            <div className="px-4 pt-4">
              <h2 className="text-base font-semibold text-white">
                General Settings
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Configure basic application preferences
              </p>
            </div>

            <div className="mt-3 rounded-md border border-[#123250]">
              <Row
                title="Application Name"
                desc="Set the name of the application"
                icon={
                  <IconBox color="bg-purple-600">
                    <AppWindow size={18} />
                  </IconBox>
                }
              >
                <input
                  defaultValue="Paperless AI PPE Monitoring System"
                  className={`${inputBoxClass} ${fieldWidth}`}
                />
              </Row>

              <Row
                title="Language"
                desc="Select application language"
                icon={
                  <IconBox color="bg-blue-600">
                    <Globe size={18} />
                  </IconBox>
                }
              >
                <div className={`relative ${fieldWidth}`}>
                  <select defaultValue="English" className={selectClass}>
                    <option>English</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                  />
                </div>
              </Row>

              <Row
                title="Date Format"
                desc="Select date display format"
                icon={
                  <IconBox color="bg-cyan-600">
                    <Calendar size={18} />
                  </IconBox>
                }
              >
                <div className={`relative ${fieldWidth}`}>
                  <select
                    defaultValue="23 Apr 2026 (DD MMM YYYY)"
                    className={selectClass}
                  >
                    <option>23 Apr 2026 (DD MMM YYYY)</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                  />
                </div>
              </Row>

              <Row
                title="Time Format"
                desc="Select time display format"
                icon={
                  <IconBox color="bg-cyan-500">
                    <Clock size={18} />
                  </IconBox>
                }
              >
                <div className={`relative ${fieldWidth}`}>
                  <select defaultValue="12-Hour (01:30 PM)" className={selectClass}>
                    <option>12-Hour (01:30 PM)</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                  />
                </div>
              </Row>

              <Row
                title="Time Zone"
                desc="Select your time zone"
                icon={
                  <IconBox color="bg-emerald-600">
                    <Globe size={18} />
                  </IconBox>
                }
              >
                <div className={`relative ${fieldWidth}`}>
                  <select
                    defaultValue="(UTC+05:30) Asia/Kolkata"
                    className={selectClass}
                  >
                    <option>(UTC+05:30) Asia/Kolkata</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                  />
                </div>
              </Row>

              <Row
                title="Theme"
                desc="Select application theme"
                icon={
                  <IconBox color="bg-purple-700">
                    <Palette size={18} />
                  </IconBox>
                }
              >
                <div className="grid w-full grid-cols-3 overflow-hidden rounded-md border border-[#123250] text-sm sm:w-auto">
                  <button className="flex h-9 items-center justify-center gap-1 px-2 hover:bg-[#0b2238]">
                    <Sun size={15} /> Light
                  </button>
                  <button className="flex h-9 items-center justify-center gap-1 bg-blue-700 px-2 font-semibold">
                    <Moon size={15} /> Dark
                  </button>
                  <button className="flex h-9 items-center justify-center gap-1 border-l border-[#123250] px-2 hover:bg-[#0b2238]">
                    <Monitor size={15} /> System
                  </button>
                </div>
              </Row>

              <Row
                last
                title="Refresh Interval"
                desc="Auto refresh interval for live views"
                icon={
                  <IconBox color="bg-blue-600">
                    <RefreshCcw size={18} />
                  </IconBox>
                }
              >
                <div className={`relative ${fieldWidth}`}>
                  <select defaultValue="5 seconds" className={selectClass}>
                    <option>5 seconds</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                  />
                </div>
              </Row>
            </div>
          </div>

          <div className="rounded-lg border border-[#123250] bg-[#03111f]">
            <div className="px-4 pt-3">
              <h2 className="text-base font-semibold text-white">
                AI & Detection Settings
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Configure AI detection and alert behavior
              </p>
            </div>

            <div className="mt-3 rounded-md border border-[#123250]">
              <Row
                title="Detection Sensitivity"
                desc="Adjust detection confidence threshold"
                icon={
                  <IconBox color="bg-emerald-600">
                    <Gauge size={18} />
                  </IconBox>
                }
              >
                <div className={`flex items-center gap-4 ${wideFieldWidth}`}>
                  <input
                    type="range"
                    defaultValue="75"
                    className="w-full accent-blue-500"
                  />
                  <span className="text-sm font-semibold">75%</span>
                </div>
              </Row>

              <Row
                title="Alert Cooldown"
                desc="Minimum time between same alerts"
                icon={
                  <IconBox color="bg-orange-500">
                    <Timer size={18} />
                  </IconBox>
                }
              >
                <div className={`relative ${fieldWidth}`}>
                  <select defaultValue="10 seconds" className={selectClass}>
                    <option>10 seconds</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                  />
                </div>
              </Row>

              <Row
                last
                title="Violated PPE Alert Priority"
                desc="Set priority for PPE violation alerts"
                icon={
                  <IconBox color="bg-red-600">
                    <ShieldAlert size={18} />
                  </IconBox>
                }
              >
                <div className="grid w-full grid-cols-4 overflow-hidden rounded-md border border-[#123250] text-sm sm:w-auto">
                  <button className="h-9 px-2 hover:bg-[#0b2238]">Low</button>
                  <button className="h-9 bg-blue-700 px-2 font-semibold">
                    Medium
                  </button>
                  <button className="h-9 border-l border-[#123250] px-2 hover:bg-[#0b2238]">
                    High
                  </button>
                  <button className="h-9 border-l border-[#123250] px-2 hover:bg-[#0b2238]">
                    Critical
                  </button>
                </div>
              </Row>
            </div>
          </div>

          <div className="rounded-lg border border-[#123250] bg-[#03111f]">
            <div className="px-4 pt-3">
              <h2 className="text-base font-semibold text-white">
                Data & Storage Settings
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Configure data retention and storage preferences
              </p>
            </div>

            <div className="mt-3 rounded-md border border-[#123250]">
              <Row
                title="Data Retention Period"
                desc="Automatically delete data older than"
                icon={
                  <IconBox color="bg-purple-600">
                    <Database size={18} />
                  </IconBox>
                }
              >
                <div className={`relative ${fieldWidth}`}>
                  <select defaultValue="90 days" className={selectClass}>
                    <option>90 days</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                  />
                </div>
              </Row>

              <Row
                title="Image Quality"
                desc="Quality for captured and stored images"
                icon={
                  <IconBox color="bg-blue-600">
                    <Image size={18} />
                  </IconBox>
                }
              >
                <div className="grid w-full grid-cols-3 overflow-hidden rounded-md border border-[#123250] text-sm sm:w-auto">
                  <button className="h-9 px-3 md:px-5 hover:bg-[#0b2238]">
                    Low
                  </button>
                  <button className="h-9 border-l border-[#123250] px-3 md:px-5 hover:bg-[#0b2238]">
                    Medium
                  </button>
                  <button className="h-9 bg-blue-700 px-3 md:px-5 font-semibold">
                    High
                  </button>
                </div>
              </Row>

              <Row
                last
                title="Auto Archive Datasets"
                desc="Archive completed datasets automatically"
                icon={
                  <IconBox color="bg-orange-500">
                    <Archive size={18} />
                  </IconBox>
                }
              >
                <Toggle enabled />
              </Row>
            </div>
          </div>

          <button className="flex h-10 items-center gap-2 rounded-md border border-red-600 px-5 text-sm font-semibold text-red-500 hover:bg-red-950/30">
            <RotateCcw size={16} />
            Reset to Default
          </button>
        </div>

        {/* RIGHT COLUMN */}
        <div className="min-w-0 space-y-2">
          <div className="rounded-lg border border-[#123250] bg-[#03111f]">
            <div className="px-4 pt-3">
              <h2 className="text-base font-semibold text-white">
                System Settings
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Configure system behavior and preferences
              </p>
            </div>

            <div className="mt-3 rounded-md border border-[#123250]">
              <Row
                py="py-4"
                title="Auto Start Live Monitoring"
                desc="Start live monitoring on application launch"
                icon={
                  <IconBox color="bg-emerald-600">
                    <Play size={18} />
                  </IconBox>
                }
              >
                <Toggle enabled />
              </Row>

              <Row
                py="py-4"
                title="Minimize to System Tray"
                desc="Minimize application to system tray"
                icon={
                  <IconBox color="bg-blue-600">
                    <Archive size={18} />
                  </IconBox>
                }
              >
                <Toggle enabled />
              </Row>

              <Row
                title="Alert Sound"
                desc="Play sound on critical alerts"
                icon={
                  <IconBox color="bg-orange-500">
                    <Volume2 size={18} />
                  </IconBox>
                }
              >
                <Toggle enabled />
              </Row>

              <Row
                title="Browser Notifications"
                desc="Show desktop notifications for alerts"
                icon={
                  <IconBox color="bg-purple-600">
                    <Bell size={18} />
                  </IconBox>
                }
              >
                <Toggle enabled />
              </Row>

              <Row
                last
                title="Session Timeout"
                desc="Automatic logout after inactivity"
                icon={
                  <IconBox color="bg-red-600">
                    <Timer size={18} />
                  </IconBox>
                }
              >
                <div className={`relative ${fieldWidth}`}>
                  <select defaultValue="30 minutes" className={selectClass}>
                    <option>30 minutes</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                  />
                </div>
              </Row>
            </div>
          </div>

          <div className="rounded-lg border border-[#123250] bg-[#03111f]">
            <div className="px-4 pt-3">
              <h2 className="text-base font-semibold text-white">
                Display Settings
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Configure how information is displayed
              </p>
            </div>

            <div className="mt-3 rounded-md border border-[#123250]">
              <Row
                title="Default Dashboard"
                desc="Select default landing page"
                icon={
                  <IconBox color="bg-purple-600">
                    <LayoutDashboard size={18} />
                  </IconBox>
                }
              >
                <div className={`relative ${fieldWidth}`}>
                  <select defaultValue="Live Monitoring" className={selectClass}>
                    <option>Live Monitoring</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                  />
                </div>
              </Row>

              <Row
                title="Items Per Page"
                desc="Number of items in tables"
                icon={
                  <IconBox color="bg-blue-600">
                    <List size={18} />
                  </IconBox>
                }
              >
                <div className={`relative ${fieldWidth}`}>
                  <select defaultValue="25" className={selectClass}>
                    <option>25</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                  />
                </div>
              </Row>

              <Row
                title="Compact View"
                desc="Reduce spacing in tables and cards"
                icon={
                  <IconBox color="bg-cyan-600">
                    <Database size={18} />
                  </IconBox>
                }
              >
                <Toggle enabled={false} />
              </Row>

              <Row
                title="Show Tooltips"
                desc="Show helpful information on hover"
                icon={
                  <IconBox color="bg-purple-700">
                    <Bell size={18} />
                  </IconBox>
                }
              >
                <Toggle enabled />
              </Row>

              <Row
                last
                title="Animations"
                desc="Enable UI animations and transitions"
                icon={
                  <IconBox color="bg-purple-600">
                    <Gauge size={18} />
                  </IconBox>
                }
              >
                <Toggle enabled />
              </Row>
            </div>
          </div>

          <div className="rounded-lg border border-[#123250] bg-[#03111f]">
            <div className="px-4 pt-3">
              <h2 className="text-base font-semibold text-white">
                Security Settings
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Configure security and access preferences
              </p>
            </div>

            <div className="mt-3 rounded-md border border-[#123250]">
              <Row
                title="Require Login on Startup"
                desc="Ask for login credentials on application start"
                icon={
                  <IconBox color="bg-emerald-600">
                    <Lock size={18} />
                  </IconBox>
                }
              >
                <Toggle enabled />
              </Row>

              <Row
                title="Auto Lock on Inactivity"
                desc="Lock application after inactivity"
                icon={
                  <IconBox color="bg-orange-500">
                    <Timer size={18} />
                  </IconBox>
                }
              >
                <div className={`relative ${fieldWidth}`}>
                  <select defaultValue="15 minutes" className={selectClass}>
                    <option>15 minutes</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                  />
                </div>
              </Row>

              <Row
                last
                title="Audit Log"
                desc="Enable system activity logging"
                icon={
                  <IconBox color="bg-purple-600">
                    <FileText size={18} />
                  </IconBox>
                }
              >
                <Toggle enabled />
              </Row>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="flex h-10 items-center gap-2 rounded-md bg-blue-700 px-5 text-sm font-semibold text-white hover:bg-blue-600">
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}