import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 아이콘 색상 선택
  const getIconColor = (path: string) => {
    return location.pathname === path ? '#1E1926' : '#DCDCDC';
  };

  // 각 아이콘에 대한 경로 설정
  const routes = [
    {
      path: '/',
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 11.4273C2 6.73484 2.51167 7.06234 5.26583 4.50817C6.47083 3.53817 8.34583 1.6665 9.965 1.6665C11.5833 1.6665 13.4958 3.529 14.7117 4.50817C17.4658 7.06234 17.9767 6.73484 17.9767 11.4273C17.9767 18.3332 16.3442 18.3332 9.98833 18.3332C3.6325 18.3332 2 18.3332 2 11.4273Z"
            fill={getIconColor('/')}
          />
          <path
            d="M7.57031 13.4455H12.4161"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      path: '/search',
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.33331 1.75C4.69745 1.75 1.75 4.69746 1.75 8.33333C1.75 11.9692 4.69745 14.9167 8.33331 14.9167C9.88105 14.9167 11.3041 14.3826 12.428 13.4886L16.5531 17.6136C16.846 17.9065 17.3208 17.9065 17.6137 17.6136C17.9066 17.3207 17.9066 16.8459 17.6137 16.553L13.4887 12.4279C14.3826 11.3039 14.9166 9.88101 14.9166 8.33333C14.9166 4.69746 11.9692 1.75 8.33331 1.75ZM3.24999 8.33333C3.24999 5.52589 5.52587 3.25 8.33331 3.25C11.1407 3.25 13.4166 5.52589 13.4166 8.33333C13.4166 11.1408 11.1407 13.4167 8.33331 13.4167C5.52587 13.4167 3.24999 11.1408 3.24999 8.33333Z"
            fill={getIconColor('/search')}
          />
        </svg>
      ),
    },
    {
      path: '/documents',
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.47492 1.76385C4.64489 1.74996 4.84659 1.74998 5.05853 1.75H12.5535L16.9999 6.41875V16.1915C17 16.4034 17 16.6051 16.9861 16.7751C16.971 16.9604 16.9356 17.173 16.8274 17.3855C16.6756 17.6834 16.4334 17.9256 16.1354 18.0774C15.9229 18.1857 15.7104 18.221 15.525 18.2362C15.3551 18.25 15.1533 18.25 14.9414 18.25H5.05848C4.84656 18.25 4.64488 18.25 4.47492 18.2362C4.28958 18.221 4.07699 18.1857 3.86451 18.0774C3.56659 17.9256 3.32437 17.6834 3.17257 17.3855C3.06431 17.173 3.02899 16.9604 3.01385 16.7751C2.99996 16.6051 2.99998 16.4034 3 16.1915V3.80854C2.99998 3.5966 2.99996 3.3949 3.01385 3.22493C3.02899 3.03959 3.06431 2.827 3.17257 2.61452C3.32437 2.31659 3.56659 2.07437 3.86451 1.92257C4.07699 1.81431 4.28958 1.77899 4.47492 1.76385ZM4.49998 3.33317C4.49998 3.28715 4.53729 3.24984 4.58332 3.24984H10.9166V7.41683H15.4999V16.6665C15.4999 16.7125 15.4626 16.7498 15.4166 16.7498H4.58332C4.53729 16.7498 4.49998 16.7125 4.49998 16.6665V3.33317ZM12.4166 5.91683V3.78109L14.4507 5.91683H12.4166Z"
            fill={getIconColor('/documents')}
          />
        </svg>
      ),
    },
    {
      path: '/profile',
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.99102 12.7881C6.76801 12.7881 4.01562 13.2754 4.01562 15.227C4.01562 17.1786 6.75055 17.6833 9.99102 17.6833C13.214 17.6833 15.9656 17.1952 15.9656 15.2444C15.9656 13.2936 13.2315 12.7881 9.99102 12.7881Z"
            stroke={getIconColor('/profile')}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.99424 10.0047C12.1093 10.0047 13.8236 8.28966 13.8236 6.17458C13.8236 4.0595 12.1093 2.34521 9.99424 2.34521C7.87916 2.34521 6.16408 4.0595 6.16408 6.17458C6.15694 8.28252 7.86012 9.9976 9.96726 10.0047H9.99424Z"
            stroke={getIconColor('/profile')}
            strokeWidth="1.42857"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-[377px] py-[24px] px-[48px] bg-navbarGradient">
      <div className="flex justify-between">
        {routes.map((route, index) => (
          <button key={index} onClick={() => navigate(route.path)}>
            {route.svg}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Navbar;
