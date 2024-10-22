import ApplicationStatus from '@/components/Profile/ApplicationStatus';
import LicenseCard from '@/components/Profile/LicenseCard';
import ProfileCard from '@/components/Profile/ProfileCard';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileMenuList from '@/components/Profile/ProfileMenuList';

const ProfilePage = () => {
  return (
    <div
      className="w-full h-full min-h-[100vh]"
      style={{
        background: 'linear-gradient(180deg, #FEF387 0.01%, #FFF 46.31%)',
      }}
    >
      <ProfileHeader />
      <div className="flex flex-col px-6 gap-9">
        <ProfileCard />
        <ApplicationStatus />
        <LicenseCard />
        <ProfileMenuList />
      </div>
    </div>
  );
};

export default ProfilePage;
