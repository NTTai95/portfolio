import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { useLocation } from "react-router-dom";

// Layouts
import MainLayout from "@layouts/mainLayout/MainLayout";
import AdminLayout from "@layouts/AdminLayout/AdminLayout";
import ProfileLayout from "@layouts/ProfileLayout/ProfileLayout";

// Pages
import Home from "@pages/home/home";
import About from "@pages/about/about";
import Authentication from "@pages/authentication/Authentication";
import PostDetail from "@pages/postDetail/PostDetail";
import JobPost from "@pages/JobPost/JobPost";
import ProjectPage from "@pages/ProjectPage/ProjectPage";
import ForgotPassword from "@pages/ForgotPassword/ForgotPassword";
import ChangePasswordDN from "@pages/changePassword/changePassword";
import ProfileFreelancers from "@pages/profileFreelancers/ProfileFreelancers";
import ProfileRecruiters from "@pages/ProfileRecruiters/ProfileRecruiters";
import Profile from "@pages/profile/Profile";
import ListFreelancer from "@pages/listfreelancer/ListFreelancer";
import Freelancer from "@pages/freelancer/Freelancer";
import Recruiter from "@pages/recruiter/Recruiter";
import Page404 from "@pages/page404/Page404";
import ApplyDetail from "../pages/ApplyDetail/ApplyDetail";
import ListApplies from "@pages/listapplies/ListApplies";
import ChangePassword from "@pages/ForgotPassword/ChangePassword";

// Admin Pages
import Dashboard from "@pages/dashboard/Dashboard";
import SkillTable from "@pages/skills/SkillTable";
import SkillForm from "@pages/form/SkillForm";
import StaffTable from "@pages/StaffTable/StaffTable";
import StaffForm from "@pages/form/StaffForm";
import LanguageTable from "@pages/language/LanguageTable";
import LanguageForm from "@pages/language/LanguageForm";
import PaymentSuccess from "@pages/paymentsuccess/PaymentSuccess";
import ChangePasswordAdmin from "@pages/changePassword/ChangePasswordAdmin";

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath != "/login" && currentPath != "/register") {
      sessionStorage.setItem("urlPrev", currentPath);
    }
  }, [location]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/home"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout>
            <Authentication isLogin={true} />
          </MainLayout>
        }
      />
      <Route
        path="/register"
        element={
          <MainLayout>
            <Authentication isLogin={false} />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />
      <Route
        path="/jobpost"
        element={
          <MainLayout>
            <JobPost />
          </MainLayout>
        }
      />
      <Route
        path="/jobpostdetail/:id"
        element={
          <MainLayout>
            <PostDetail />
          </MainLayout>
        }
      />
      <Route
        path="/jobpost/:mode/:id?"
        element={
          <MainLayout>
            <ProjectPage />
          </MainLayout>
        }
      />
      <Route
        path="/forgotpassword"
        element={
          <MainLayout>
            <ForgotPassword />
          </MainLayout>
        }
      />
      <Route
        path="/freelancers"
        element={
          <MainLayout>
            <ListFreelancer />
          </MainLayout>
        }
      />
      <Route
        path="/freelancers/:id"
        element={
          <MainLayout>
            <Freelancer />
          </MainLayout>
        }
      />
      <Route
        path="/404"
        element={
          <MainLayout>
            <Page404 />
          </MainLayout>
        }
      />

      {/* Profile Routes */}
      <Route
        path="/profile"
        element={
          <MainLayout>
            <ProfileLayout active="profile">
              <Profile />
            </ProfileLayout>
          </MainLayout>
        }
      />

      <Route
        path="/profile/recruiters"
        element={
          <PrivateRoute
            element={
              <MainLayout>
                <ProfileLayout active="recruiters">
                  <ProfileRecruiters />
                </ProfileLayout>
              </MainLayout>
            }
          />
        }
      />

      <Route
        path="/changePassword"
        element={
          // <PrivateRoute
          //   element={
              <MainLayout>
                <ProfileLayout active="changePassword">
                <ChangePasswordDN />
                </ProfileLayout>
              </MainLayout>
          //  }
          ///>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute
            requireStaff={true}
            element={
              <AdminLayout active="home">
                <Dashboard />
              </AdminLayout>
            }
          />
        }
      />
      <Route
        path="/admin/skills"
        element={
          <PrivateRoute
            requireStaff={true}
            element={
              <AdminLayout active="skills" breadcrumb="Kỹ năng">
                <SkillTable />
              </AdminLayout>
            }
          />
        }
      />
      <Route
        path="/admin/skills/:mode/:id?"
        element={
          <PrivateRoute
            requireStaff={true}
            element={
              <AdminLayout active="skills" breadcrumb="Kỹ năng">
                <SkillForm />
              </AdminLayout>
            }
          />
        }
      />
      <Route
        path="/admin/staff"
        element={
          <PrivateRoute
            requireStaff={true}
            element={
              <AdminLayout active="staff" breadcrumb="Nhân viên">
                <StaffTable />
              </AdminLayout>
            }
          />
        }
      />
      <Route
        path="/admin/staff/:mode/:id?"
        element={
          <PrivateRoute
            requireStaff={true}
            element={
              <AdminLayout active="staff" breadcrumb="Nhân viên">
                <StaffForm />
              </AdminLayout>
            }
          />
        }
      />
      <Route
        path="/admin/languages"
        element={
          <PrivateRoute
            element={
              <AdminLayout active="languages" breadcrumb="Ngôn ngữ">
                <LanguageTable />
              </AdminLayout>
            }
          />
        }
      />
      <Route
        path="/admin/languages/:mode/:id?"
        element={
          <PrivateRoute
            element={
              <AdminLayout active="languages" breadcrumb="Ngôn ngữ">
                <LanguageForm />
              </AdminLayout>
            }
          />
        }
      />

      <Route
        path="/payment/success"
        element={
          <MainLayout>
            <PaymentSuccess />
          </MainLayout>
        }
      />

      {/* Profile Routes */}
      <Route
        path="/profile"
        element={
          <MainLayout>
            <ProfileLayout active="profile">
              <Profile />
            </ProfileLayout>
          </MainLayout>
        }
      />
      <Route
        path="/profile/freelancer"
        element={
          <PrivateRoute
            element={
              <MainLayout>
                <ProfileLayout active="freelancer">
                  <ProfileFreelancers />
                </ProfileLayout>
              </MainLayout>
            }
          />
        }
      />
      <Route
        path="/profile/recruiters"
        element={
          <PrivateRoute
            element={
              <MainLayout>
                <ProfileLayout active="recruiters">
                  <ProfileRecruiters />
                </ProfileLayout>
              </MainLayout>
            }
          />
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute
            requireStaff={true}
            element={
              <AdminLayout active="home">
                <Dashboard />
              </AdminLayout>
            }
          />
        }
      />
      <Route
        path="/admin/skills"
        element={
          <PrivateRoute
            requireStaff={true}
            element={
              <AdminLayout active="skills" breadcrumb="Kỹ năng">
                <SkillTable />
              </AdminLayout>
            }
          />
        }
      />
      <Route
        path="/admin/skills/:mode/:id?"
        element={
          <PrivateRoute
            requireStaff={true}
            element={
              <AdminLayout active="skills" breadcrumb="Kỹ năng">
                <SkillForm />
              </AdminLayout>
            }
          />
        }
      />
      <Route
        path="/admin/staff"
        element={
          <PrivateRoute
            requireStaff={true}
            element={
              <AdminLayout active="staff" breadcrumb="Nhân viên">
                <StaffTable />
              </AdminLayout>
            }
          />
        }
      />
      <Route
        path="/admin/staff/:mode/:id?"
        element={
          <PrivateRoute
            requireStaff={true}
            element={
              <AdminLayout active="staff" breadcrumb="Nhân viên">
                <StaffForm />
              </AdminLayout>
            }
          />
        }
      />
      <Route
        path="/admin/languages"
        element={
          <PrivateRoute
            element={
              <AdminLayout active="languages" breadcrumb="Ngôn ngữ">
                <LanguageTable />
              </AdminLayout>
            }
          />
        }
      />
      <Route
        path="/admin/languages/:mode/:id?"
        element={
          <PrivateRoute
            element={
              <AdminLayout active="languages" breadcrumb="Ngôn ngữ">
                <LanguageForm />
              </AdminLayout>
            }
          />
        }
      />
      <Route
        path="/payment/success"
        element={
          <MainLayout>
            <PaymentSuccess />
          </MainLayout>
        }
      />
      <Route
        path="/recruiter/:id"
        element={
          <MainLayout>
            <Recruiter />
          </MainLayout>
        }
      />
      <Route
        path="/admin/changepassword"
        element={
          <AdminLayout active="changePassword" breadcrumb="Đổi mật khẩu">
            <ChangePasswordAdmin />
          </AdminLayout>
        }
      />
      <Route
        path="/jobpost/apply/:id"
        element={
          <MainLayout>
            <ApplyDetail />
          </MainLayout>
        }
      />
      <Route
        path="/applies/jobpost/:id"
        element={
          <MainLayout>
            <ListApplies />
          </MainLayout>
        }
      />
   <Route
        path="/changepassword/:token"
        element={
          <MainLayout>
            <ChangePassword />
          </MainLayout>
        }
      />
    </Routes >
  );
};

export default AppRoutes;
