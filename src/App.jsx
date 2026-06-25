import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard, { DashboardHome } from "./pages/Dashboard";
import CameraManagementPage from "./pages/CameraManagementPage";
import FaceEnrollmentPage from "./pages/FaceEnrollmentPage";
import DatasetManagementPage from "./pages/DatasetManagementPage";
import LiveMonitoringPage from "./pages/LiveMonitoringPage";
import EnrolledPersons from "./pages/EnrolledPersons";
import NotificationAlerts from "./pages/notificationalerts";
import Archives from "./pages/Archives";
import EmailSettings from "./pages/EmailSettings";
import SettingsPage from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full overflow-x-hidden bg-dark text-white">
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Navigate to="/dashboard" replace />} />

            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="live-monitoring" element={<LiveMonitoringPage />} />

            <Route
              path="camera-management"
              element={<CameraManagementPage />}
            />

            <Route path="face-enrollment" element={<FaceEnrollmentPage />} />
            <Route path="enrolled-persons" element={<EnrolledPersons />} />

            <Route
              path="dataset-management"
              element={<DatasetManagementPage />}
            />

            <Route path="archives" element={<Archives />} />

            <Route
              path="notifications-alerts"
              element={<NotificationAlerts />}
            />

            <Route path="email-settings" element={<EmailSettings />} />

            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}