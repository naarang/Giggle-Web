import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/Home/HomePage';
import InformationPage from './pages/Information/InformationPage';
import PostDetailPage from './pages/PostDetail/PostDetailPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
