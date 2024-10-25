import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';

import ScrollToTop from '@/components/Common/ScrollToTop';
import Navbar from '@/components/Common/Navbar';

import HomePage from '@/pages/Home/HomePage';
import SigninPage from '@/pages/Signin/SigninPage';
import SignupPage from '@/pages/Signup/SignupPage';
import InformationPage from '@/pages/Information/InformationPage';
import ApplicationDocumentsPage from '@/pages/ApplicationDocuments/ApplicationDocumentsPage';
import PostSearchPage from '@/pages/PostSearch/PostSearchPage';
import PostSearchFilterPage from '@/pages/PostSearchFilter/PostSearchFilterPage';
import ProfilePage from '@/pages/Profile/ProfilePage';
import LanguageSettingPage from '@/pages/Profile/LanguageSettingPage';
import EditProfilePage from '@/pages/Profile/EditProfilePage';
import PostDetailPage from '@/pages/PostDetail/PostDetailPage';
import PostApplyPage from '@/pages/PostApply/PostApplyPage';
import ApplicationPage from '@/pages/Application/ApplicationPage';
import ManageResumePage from '@/pages/ManageResumePage/ManageResumePage';
import WriteDocumentsPage from '@/pages/WriteDocuments/WriteDocumentsPage';
import ScrappedJobPostsPage from './pages/ScrappedJobPosts/ScrappedJobPostsPage';
import LanguagePage from './pages/Language/LanguagePage';
import PostEducationPage from './pages/SetEducation/PostEducationPage';
import PatchEducationPage from './pages/SetEducation/PatchEducationPage';
import PostWorkExperiencePage from './pages/SetWorkExperience/PostWorkExperiencePage';
import IntroductionPage from './pages/Introduction/IntroductionPage';

const Layout = () => {
  const location = useLocation();

  // Nav bar 컴포넌트가 랜딩되는 페이지
  const showNavbarPaths = ['/', '/profile', '/search', '/application'];

  const shouldShowNavbar = showNavbarPaths.includes(location.pathname);

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

          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/information" element={<InformationPage />} />

          <Route
            path="/application-documents"
            element={<ApplicationDocumentsPage />}
          />

          <Route path="/search" element={<PostSearchPage />} />
          <Route path="/search/filter" element={<PostSearchFilterPage />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/profile/manage-resume" element={<ManageResumePage />} />
          <Route path="/profile/language" element={<LanguagePage />} />

          <Route path="/resume/introduction" element={<IntroductionPage />} />
          <Route path="/resume/language" element={<LanguagePage />} />
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
            element={<PatchEducationPage />}
          />

          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/post/apply/:id" element={<PostApplyPage />} />

          <Route path="/write-documents" element={<WriteDocumentsPage />} />

          <Route path="/application" element={<ApplicationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
