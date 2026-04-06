import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import DemoPresentation from "./pages/DemoPresentation";
import ReferralFormPage from "./pages/ReferralFormPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import LiveReportPage from "./pages/LiveReportPage";
import LearningDashboardPage from "./pages/LearningDashboardPage";
import QueueMonitorPage from "./pages/QueueMonitorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<DemoPresentation />}
        />

        <Route
          path="/referral"
          element={<ReferralFormPage />}
        />

        <Route
          path="/admin"
          element={<AdminDashboardPage />}
        />

        <Route
          path="/admin/live-report"
          element={<LiveReportPage />}
        />

        <Route
          path="/admin/learning"
          element={<LearningDashboardPage />}
        />

        <Route
          path="/admin/queues"
          element={<QueueMonitorPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;