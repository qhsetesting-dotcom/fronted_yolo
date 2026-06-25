import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import CameraCard, { LiveMonitoringHeader } from "../components/CameraCard";
import ChartsPanel from "../components/ChartsPanel";
import EventsTable from "../components/EventsTable";
import RightActions from "../components/RightActions";
import CameraManagement from "../components/CameraManagement";

import { cameraSources } from "../data/faceEnrollmentData";

export function DashboardHome() {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_250px] xl:grid-cols-[minmax(0,1fr)_260px] 2xl:grid-cols-[minmax(0,1fr)_280px]">
      <section className="min-w-0 space-y-3">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            type="persons"
            title="PERSONS"
            value="120"
            subtitle="Live Count"
            change="↑ 15.6% vs yesterday"
          />

          <StatCard
            type="faces"
            title="FACES"
            value="85"
            subtitle="Live Count"
            change="↑ 12.4% vs yesterday"
          />

          <StatCard
            type="fps"
            title="FPS"
            value="20.1"
            subtitle="Stable"
          />

          <StatCard
            type="violations"
            title="VIOLATIONS (TODAY)"
            value="26"
            subtitle="Today"
            change="↑ 30.0% vs yesterday"
            danger
          />
        </div>

        {/* Live Monitoring Section */}
        <section className="glass-card w-full min-w-0 p-3">
          <LiveMonitoringHeader />

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <CameraCard
              title="Camera 1 - Gate"
              persons={12}
              violations={1}
              compliant
            />

            <CameraCard
              title="Camera 2 - Parking"
              persons={8}
              violations={2}
              mixed
            />

            <CameraCard
              title="Camera 3 - Warehouse"
              persons={10}
              violations={0}
              compliant
            />

            <CameraCard
              title="Camera 4 - Entrance"
              persons={6}
              violations={1}
              missing
            />
          </div>
        </section>

        <CameraManagement />
        <EventsTable />
      </section>

      <aside className="w-full min-w-0 shrink-0 space-y-3 lg:w-[250px] xl:w-[260px] 2xl:w-[280px]">
        <ChartsPanel />
        <RightActions />
      </aside>
    </div>
  );
}

function getActivePage(pathname) {
  if (pathname.includes("camera-management")) return "camera-management";
  if (pathname.includes("face-enrollment")) return "face";
  if (pathname.includes("enrolled-persons")) return "enrolled-persons";
  if (pathname.includes("dataset-management")) return "dataset-management";
  if (pathname.includes("archives")) return "archives";
  if (pathname.includes("notifications-alerts")) return "notifications";
  if (pathname.includes("email-settings")) return "email";
  if (pathname.includes("settings")) return "settings";
  if (pathname.includes("live-monitoring")) return "live";

  return "dashboard";
}

export default function Dashboard() {
  const { pathname } = useLocation();
  const activePage = getActivePage(pathname);

  const [selectedCamera, setSelectedCamera] = useState(cameraSources[0]);

  // ADD THIS
  const [liveSelectedEvents, setLiveSelectedEvents] = useState(["All Events"]);

  return (
    <div className="dashboard-shell min-h-screen w-full bg-[#020817] text-white">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <Sidebar />

        <main className="min-w-0 flex-1 p-3 sm:p-4">
          <Header
            activePage={activePage}
            cameraSources={cameraSources}
            selectedCamera={selectedCamera}
            setSelectedCamera={setSelectedCamera}
            liveSelectedEvents={liveSelectedEvents}
            setLiveSelectedEvents={setLiveSelectedEvents}
          />

          <Outlet
            context={{
              selectedCamera,
              setSelectedCamera,
              liveSelectedEvents,
              setLiveSelectedEvents,
            }}
          />
        </main>
      </div>
    </div>
  );
}