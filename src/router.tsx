import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';

import ScrollToTop from '@/components/Common/ScrollToTop';
import Navbar from '@/components/Common/Navbar';
import HomePage from '@/pages/Home/HomePage';
import SigninPage from '@/pages/Signin/SigninPage';
import SignupPage from '@/pages/Signup/SignupPage';
import InformationPage from '@/pages/Information/InformationPage';
import ApplicationDocumentsPage from '@/pages/ApplicationDocuments/ApplicationDocumentsPage';
import PostSearchPage from '@/pages/PostSearch/PostSearchPage';
import ProfilePage from '@/pages/Profile/ProfilePage';
import LanguageSettingPage from '@/pages/LanguageSetting/LanguageSettingPage';
import EditProfilePage from '@/pages/EditProfile/EditProfilePage';
import PostDetailPage from '@/pages/PostDetail/PostDetailPage';
import PostApplyPage from '@/pages/PostApply/PostApplyPage';
import ApplicationPage from '@/pages/Application/ApplicationPage';
import ManageResumePage from '@/pages/ManageResumePage/ManageResumePage';
import WriteDocumentsPage from '@/pages/WriteDocuments/WriteDocumentsPage';
import ScrappedJobPostsPage from '@/pages/ScrappedJobPosts/ScrappedJobPostsPage';
import LanguagePage from '@/pages/Language/LanguagePage';
import PostEducationPage from '@/pages/SetEducation/PostEducationPage';
import PatchEducationPage from '@/pages/SetEducation/PatchEducationPage';
import PostWorkExperiencePage from '@/pages/SetWorkExperience/PostWorkExperiencePage';
import IntroductionPage from '@/pages/Introduction/IntroductionPage';
import PatchWorkExperiencePage from '@/pages/SetWorkExperience/PatchWorkExperiencePage';
import ApplicationDetailPage from '@/pages/ApplicationDetail/ApplicationDetailPage';
import ApplicationResultPage from '@/pages/ApplicationResult/ApplicationResultPage';
import EmployerPostDetailPage from '@/pages/Employer/PostDetail/EmployerPostDetailPage';
import RequestModifyPage from '@/pages/WriteDocuments/RequestModifyPage';
import DocumentPreview from '@/pages/WriteDocuments/DocumentPreviewPage';
import EmployerPostPage from '@/pages/Employer/Post/EmployerPostPage';
import EmployerApplicantListPage from '@/pages/Employer/ApplicantList/EmployerApplicantListPage';
import EmployerProfilePage from '@/pages/Employer/Profile/EmployerProfilePage';
import EmployerSignupInfoPage from '@/pages/Employer/signup/EmployerSignupInfoPage';
import PostLanguagePage from '@/pages/PostLanguage/PostLanguagePage';
import EmployerApplicantDetailPage from '@/pages/Employer/ApplicantDetail/EmployerApplicantDetailPage';
import EmployerApplicantResumePage from '@/pages/Employer/ApplicantResume/EmployerApplicantResumePage';
import EmployerApplicantResumeAcceptPage from '@/pages/Employer/ApplicantResumeAccept/EmployerApplicantResumeAcceptPage';
import EmployerCreatePostPage from '@/pages/Employer/Post/EmployerCreatePostPage';
import EmployerEditProfilePage from '@/pages/Employer/EditProfile/EmployerEditProfilePage';
import EmployerSignupPage from '@/pages/Employer/Signup/EmployerSignupPage';
import AlarmPage from '@/pages/Alarm/AlarmPage';
import ChatBotPage from '@/pages/ChatBot/ChatBotPage';
import Splash from '@/components/Splash/Splash';
import ApplicantDocumentsDetailPage from '@/pages/Employer/WriteDocuments/ApplicantDocumentsDetailPage';
import EmployerWriteDocumentsPage from '@/pages/Employer/WriteDocuments/EmployerWriteDocumentsPage';
import EmployerEditPostPage from './pages/Employer/Post/EmployerEditPostPage';
import PostSearchFilterPage from '@/pages/PostSearch/PostSearchFilterPage';

const Layout = () => {
  const location = useLocation();
  const { account_type } = useUserStore();
  // Nav bar 컴포넌트가 랜딩되는 페이지
  const showNavbarPaths = () => {
    if (account_type === UserType.OWNER) {
      return ['/', '/search', '/employer/post', '/employer/profile'];
    } else return ['/', '/search', '/application', '/profile'];
  };

  const shouldShowNavbar = showNavbarPaths().includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      <Outlet />
      {shouldShowNavbar && <Navbar />}
    </>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/chatbot" element={<ChatBotPage />} />
          <Route path="/alarm" element={<AlarmPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/information" element={<InformationPage />} />

          <Route
            path="/application-documents/:id"
            element={<ApplicationDocumentsPage />}
          />

          <Route path="/search/filter" element={<PostSearchFilterPage />} />
          <Route path="/search" element={<PostSearchPage />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/profile/manage-resume" element={<ManageResumePage />} />
          <Route path="/profile/language" element={<LanguageSettingPage />} />

          <Route path="/resume/introduction" element={<IntroductionPage />} />
          <Route path="/resume/language" element={<LanguagePage />} />
          <Route path="/resume/language/add" element={<PostLanguagePage />} />
          <Route path="/resume/scrapped" element={<ScrappedJobPostsPage />} />
          <Route path="/resume/education" element={<PostEducationPage />} />
          <Route
            path="/resume/education/edit/:id"
            element={<PatchEducationPage />}
          />
          <Route
            path="/resume/work-experience"
            element={<PostWorkExperiencePage />}
          />
          <Route
            path="/resume/work-experience/edit/:id"
            element={<PatchWorkExperiencePage />}
          />

          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/post/apply/:id" element={<PostApplyPage />} />
          <Route path="/write-documents/:id" element={<WriteDocumentsPage />} />

          <Route path="/document-preview/:id" element={<DocumentPreview />} />
          <Route path="/request-modify/:id" element={<RequestModifyPage />} />

          <Route path="/application" element={<ApplicationPage />} />
          <Route path="/application/:id" element={<ApplicationDetailPage />} />
          <Route
            path="/application/result/:id"
            element={<ApplicationResultPage />}
          />

          <Route path="/employer/signup" element={<EmployerSignupPage />} />
          <Route
            path="/employer/signup/information"
            element={<EmployerSignupInfoPage />}
          />
          <Route path="/employer/post" element={<EmployerPostPage />} />
          <Route
            path="/employer/post/create/"
            element={<EmployerCreatePostPage />}
          />
          <Route
            path="/employer/post/edit/:id"
            element={<EmployerEditPostPage />}
          />
          <Route
            path="/employer/post/:id"
            element={<EmployerPostDetailPage />}
          />
          <Route
            path="/employer/post/:id/applicant"
            element={<EmployerApplicantListPage />}
          />
          <Route
            path="/employer/applicant/:id"
            element={<EmployerApplicantDetailPage />}
          />
          <Route
            path="/employer/applicant/:id/resume"
            element={<EmployerApplicantResumePage />}
          />

          <Route
            path="/employer/applicant/:id/resume/accept"
            element={<EmployerApplicantResumeAcceptPage />}
          />
          <Route
            path="/employer/applicant/document-detail/:id"
            element={<ApplicantDocumentsDetailPage />}
          />
          <Route
            path="/employer/write-documents/:id"
            element={<EmployerWriteDocumentsPage />}
          />
          <Route path="/write-documents" element={<WriteDocumentsPage />} />
          <Route path="/document-preview" element={<DocumentPreview />} />
          <Route path="/request-modify" element={<RequestModifyPage />} />

          <Route path="/employer/profile" element={<EmployerProfilePage />} />
          <Route
            path="/employer/profile/edit"
            element={<EmployerEditProfilePage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
