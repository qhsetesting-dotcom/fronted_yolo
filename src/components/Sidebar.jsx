import {
  Archive,
  Bell,
  Camera,
  Database,
  Home,
  Mail,
  Monitor,
  ScanFace,
  Settings,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const menuGroups = [
  {
    title: "OPERATIONS",
    items: [
      { icon: Home, label: "Dashboard", path: "/dashboard" },
      { icon: Monitor, label: "Live Monitoring", path: "/live-monitoring" },
    ],
  },
  {
    title: "INFRASTRUCTURE",
    items: [
      { icon: Camera, label: "Camera Management", path: "/camera-management" },
    ],
  },
  {
    title: "AI MANAGEMENT",
    items: [
      { icon: ScanFace, label: "Face Enrollment", path: "/face-enrollment" },
      { icon: Users, label: "Enrolled Persons", path: "/enrolled-persons" },
      {
        icon: Database,
        label: "Dataset Management",
        path: "/dataset-management",
      },
      { icon: Archive, label: "Archives", path: "/archives" },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      {
        icon: Bell,
        label: "Notifications & Alerts",
        path: "/notifications-alerts",
      },
      { icon: Mail, label: "Email Settings", path: "/email-settings" },
      { icon: Settings, label: "Settings", path: "/settings" },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="flex w-full flex-col justify-between gap-4 border-r border-[#0f2a44] bg-[#020c16]/95 px-2 py-3 lg:w-[185px] lg:shrink-0">
      <div className="min-w-0">
        {/* LOGO */}
        <div className="mb-4 flex justify-center">
          <div className="relative h-[48px] w-full max-w-[170px] rounded-sm bg-white shadow-sm">
            <img
              src={logo}
              alt="Paperless AI"
              className="absolute left-0 top-0 h-[40px] w-full object-contain px-1"
            />

            <p className="absolute bottom-[4px] right-[10px] text-[10px] font-semibold leading-none text-[#0b3c88]">
              PPE Monitoring System
            </p>
          </div>
        </div>

        {/* NAV */}
        <nav className="space-y-5">
          {menuGroups.map((group) => (
            <div key={group.title} className="min-w-0">
              <p className="mb-2 truncate px-1 text-[12px] font-bold uppercase tracking-wide text-[#1686ff]">
                {group.title}
              </p>

              <div className="space-y-1.5">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      title={item.label}
                      className={({ isActive }) =>
                        `flex w-full min-w-0 items-center gap-2 rounded-md px-2 py-2 text-sm font-semibold transition ${
                          isActive
                            ? "bg-[#0d63e6] text-white shadow-[0_0_12px_rgba(13,99,230,.3)]"
                            : "text-white/90 hover:bg-[#0b2238]"
                        }`
                      }
                    >
                      <Icon size={18} className="shrink-0" />

                      <span className="min-w-0 truncate">
                        {item.label}
                      </span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* USER CARD */}
      <div className="flex min-w-0 items-center gap-2 rounded-lg bg-[#0b1c2f] p-2.5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0d63e6] text-sm font-bold">
          UA
        </div>

        <div className="min-w-0 flex-1 leading-tight">
          <div className="truncate text-sm font-semibold">User Admin</div>
          <div className="truncate text-sm text-gray-400">
            User Administrator
          </div>
        </div>

        <Settings size={18} className="shrink-0 text-gray-400" />
      </div>
    </aside>
  );
}