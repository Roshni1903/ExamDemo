import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar/NavBar";
import RegisterUi from "/src/Presentation/registration/RegisterUi.jsx";
import registerDesc from "/src/Description/registerDesc.js";
import LoginUi from "./Presentation/login/LoginUi";
import loginDesc from "/src/Description/loginDesc.js";
import ForgetDesc from "./Description/ForgetDesc";
import ForgetPasswordUi from "./Presentation/ForgetPassword/ForgetPasswordUi";
import newPassDesc from "./Description/newPassDesc";
import NewPasswordUi from "./Presentation/NewPassword/NewPasswordUi";
import ProtectedRoute from "./component/Routes/ProtectedRoute";
import { useLocation } from "react-router-dom";
// import CreateExam from "./component/Teacher/CreateExam/CreateExam";
// import EditExam from "./component/Teacher/EditExam/EditExam";
import Profile from "./component/Student/Profile";
import Dashboard from "./component/CommonUser/Dashboard";
import TeacherLayout from "./component/Teacher/TeacherLayout";
import StudentLayout from "./component/Student/StudentLayout";
import PublicRoute from "./component/Routes/publicRoute";
import ShowStudentData from "./component/Teacher/ShowStudentData/ShowStudentData";
import ViewStudentDetail from "./component/Teacher/ViewStudentDetail/ViewStudentDetail";
import StartExam from "./component/Student/StartExam/StartExam";
import AdminDashboard from "./component/Teacher/AdminDashboard/AdminDashboard";
import StudentDashboard from "./component/Student/StudentDashboard/StudentDashboard";
import SubmitReview from "./component/Student/SubmitReview/SubmitReview";
import profileDesc from "./Description/ProfileDesc";
import ChangeProfileUi from "./Presentation/ChangeProfile/ChangeProfileUi";
import ResetPasswordUi from "./Presentation/ResetPassword/ResetPasswordUi";
import resetPassDesc from "./Description/resetPassDesc";
import AdminProfile from "./component/Teacher/AdminProfile";
import CreateEditExam from "./component/CreateEditExam";
export default function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/404";
  const role = localStorage.getItem("role");

  return (
    <>
      {hideNavbar ? null : <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginUi desc={loginDesc} />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterUi desc={registerDesc} />
            </PublicRoute>
          }
        />
        <Route
          path="/forget-password-link"
          element={<ForgetPasswordUi desc={ForgetDesc} />}
        ></Route>
        {/* <Route
          path="/reset-password"
          element={<ResetPasswordUi desc={resetPassDesc} />}
        ></Route> */}
        <Route
          path="/newPassword"
          element={<NewPasswordUi desc={newPassDesc} />}
        ></Route>
        <Route path="*" element={<Navigate to="/404" />}></Route>
        <Route path="/404" element={<h1>Page not found!</h1>} />
        <Route
          element={
            <ProtectedRoute>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/student/dashboard"
            element={
              <StudentDashboard key={location.state?.refresh || "default"} />
            }
          />

          <Route
            path="/edit-profile"
            element={<ChangeProfileUi desc={profileDesc} />}
          ></Route>
          <Route path="/student/profile" element={<Profile />} />
          <Route path="/start-exam/:id" element={<StartExam />} />
          <Route path="/submit-review/:id" element={<SubmitReview />} />
          <Route
            path="/student/reset-password"
            element={<ResetPasswordUi desc={resetPassDesc} />}
          />
        </Route>
        <Route
          element={
            <ProtectedRoute>
              <TeacherLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/teacher/dashboard" element={<AdminDashboard />} />

          {/* <Route path="/create-exam" element={<CreateExam />} />
          <Route path="/edit-exam/:id" element={<EditExam />} /> */}
          <Route path="/create-exam" element={<CreateEditExam />} />
          <Route path="/edit-exam/:id" element={<CreateEditExam />} />
          <Route path="/teacher/profile" element={<AdminProfile />} />
          <Route path="/students" element={<ShowStudentData />} />
          <Route
            path="/teacher/reset-password"
            element={<ResetPasswordUi desc={resetPassDesc} />}
          />

          <Route
            path="/view-student-detail/:id"
            element={<ViewStudentDetail />}
          />
        </Route>
      </Routes>
    </>
  );
}
