import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/Home/HomePage';
import SigninPage from '@/pages/Signin/SigninPage';
import SignupPage from '@/pages/Signup/SignupPage';
import InformationPage from '@/pages/Information/InformationPage';
import ApplicationDocumentsPage from '@/pages/ApplicationDocuments/ApplicationDocumentsPage';
import WriteDocumentsPage from '@/pages/WriteDocuments/WriteDocumentsPage';
import PostSearchPage from '@/pages/PostSearch/PostSearchPage';
import PostSearchFilterPage from '@/pages/PostSearchFilter/PostSearchFilterPage';
import ProfilePage from '@/pages/Profile/ProfilePage';
import LanguageSettingPage from '@/pages/Profile/LanguageSettingPage';
import EditProfilePage from '@/pages/Profile/EditProfilePage';
import PostDetailPage from '@/pages/PostDetail/PostDetailPage';
import PostApplyPage from '@/pages/PostApply/PostApplyPage';
import ScrollToTop from '@/components/Common/ScrollToTop';
import ApplicationPage from '@/pages/Application/ApplicationPage';
import ApplicationDetailPage from '@/pages/ApplicationDetail/ApplicationDetailPage';
import ApplicationResultPage from '@/pages/ApplicationResult/ApplicationResultPage';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/application-documents"
          element={<ApplicationDocumentsPage />}
        />
        <Route path="/write-documents" element={<WriteDocumentsPage />} />
        <Route path="/search" element={<PostSearchPage />} />
        <Route path="/search/filter" element={<PostSearchFilterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/language" element={<LanguageSettingPage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/post/apply/:id" element={<PostApplyPage />} />
        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/application/:id" element={<ApplicationDetailPage />} />
        <Route
          path="/application/result/:id"
          element={<ApplicationResultPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
