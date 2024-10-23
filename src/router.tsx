import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/Home/HomePage';
import SigninPage from '@/pages/Signin/SigninPage';
import SignupPage from '@/pages/Signup/SignupPage';
import InformationPage from '@/pages/Information/InformationPage';
import ApplicationDocumentsPage from '@/pages/ApplicationDocuments/ApplicationDocumentsPage';
import PostSearchPage from '@/pages/PostSearch/PostSearchPage';
import PostSearchFilterPage from '@/pages/PostSearchFilter/PostSearchFilterPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
