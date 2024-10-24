import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';
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
import ScrollToTop from '@/components/Common/ScrollToTop';
import Navbar from '@/components/Common/Navbar';

const Layout = () => {
  const location = useLocation();

  // Nav bar 컴포넌트가 랜딩되는 페이지
  const showNavbarPaths = ['/', '/profile', '/search', '/applicants'];

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
          <Route path="/information" element={<InformationPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/application-documents"
            element={<ApplicationDocumentsPage />}
          />
          <Route path="/search" element={<PostSearchPage />} />
          <Route path="/search/filter" element={<PostSearchFilterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/language" element={<LanguageSettingPage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/post/apply/:id" element={<PostApplyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
