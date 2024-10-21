import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/Home/HomePage';
import InformationPage from './pages/Information/InformationPage';
import PostSearchPage from '@/pages/PostSearch/PostSearchPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/search" element={<PostSearchPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
