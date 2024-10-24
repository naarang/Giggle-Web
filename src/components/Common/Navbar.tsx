import { useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@/assets/icons/HomeIcon.svg?react';
import SearchIcon from '@/assets/icons/NavSearchIcon.svg?react';
import DocumentsIcon from '@/assets/icons/DocumentsIcon.svg?react';
import ProfileIcon from '@/assets/icons/ProfileIcon.svg?react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getIconColor = (path: string) => {
    return location.pathname === path ? '#1E1926' : '#DCDCDC';
  };

  const routes = [
    {
      path: '/',
      svg: HomeIcon,
    },
    {
      path: '/search',
      svg: SearchIcon,
    },
    {
      path: '/applicants',
      svg: DocumentsIcon,
    },
    {
      path: '/profile',
      svg: ProfileIcon,
    },
  ];

  return (
    <div className="flex justify-center items-center z-50">
      <section className="fixed bottom-0 w-full py-6 px-12 bg-navbarGradient rounded-t-[2rem]">
        <div className="flex justify-between items-center">
          {routes.map((route, index) => {
            const IconComponent = route.svg;
            return (
              <button key={index} onClick={() => navigate(route.path)}>
                {route.path == '/profile' ? (
                  <IconComponent stroke={getIconColor(route.path)} />
                ) : (
                  <IconComponent fill={getIconColor(route.path)} />
                )}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Navbar;
