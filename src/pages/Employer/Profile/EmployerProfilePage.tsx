import EmployerJobInfo from '@/components/Employer/Profile/EmployerJobInfo';
import EmployerProfileCard from '@/components/Employer/Profile/EmployerProfileCard';
import EmployerProfileMenuList from '@/components/Employer/Profile/EmployerProfileMenuList';
import ApplicationStatus from '@/components/Profile/ApplicationStatus';
import ProfileHeader from '@/components/Profile/ProfileHeader';

const EmployerProfilePage = () => {
  return (
    <div>
      <ProfileHeader />
      <EmployerProfileCard />
      <EmployerJobInfo />
      <EmployerProfileMenuList />
    </div>
  );
};

export default EmployerProfilePage;
