import { useNavigate } from 'react-router-dom';

const useNavigateBack = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return navigateBack;
};

export default useNavigateBack;
