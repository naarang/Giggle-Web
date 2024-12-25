import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { employerRoutes, userRoutes, guestRoutes } from '@/constants/routes';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { account_type } = useUserStore();

  const getIconColor = (path: string) => {
    return location.pathname === path ? '#1E1926' : '#DCDCDC';
  };

  return (
    <div className="flex justify-center items-center z-50">
      <section className="fixed bottom-0 w-full pt-6 pb-10 px-12 bg-navbarGradient rounded-t-[2rem]">
        <div className="flex justify-between items-center">
          {/* 유학생 유저일 경우 nav bar */}
          {account_type === UserType.USER &&
            userRoutes.map((route, index) => {
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
          {/* 고용자 유저일 경우 nav bar */}
          {account_type === UserType.OWNER &&
            employerRoutes.map((route, index) => {
              const IconComponent = route.svg;
              return (
                <button key={index} onClick={() => navigate(route.path)}>
                  {route.path == '/employer/profile' ? (
                    <IconComponent stroke={getIconColor(route.path)} />
                  ) : (
                    <IconComponent fill={getIconColor(route.path)} />
                  )}
                </button>
              );
            })}
          {/* 비회원일 경우 nav bar */}
          {account_type === undefined &&
            guestRoutes.map((route, index) => {
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
