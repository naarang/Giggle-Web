import PostApplyProfile from '@/components/PostApply/PostApplyProfile';
import PostApplyCardLayout from '@/components/PostApply/PostApplyCardLayout';
import {
  EducationType,
  LanguageType,
  WorkExperienceType,
} from '@/types/postApply/resumeDetailItem';
import { useGetApplicantResume, useGetResume } from '@/hooks/api/useResume';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { useCurrentApplicantIdStore } from '@/store/url';

const EDUCATION_PERIOD = {
  BACHELOR: 4,
  ASSOCIATE: 2,
  HIGHSCHOOL: 3,
} as const;

const PostApplyResume = () => {
  const { currentApplicantId } = useCurrentApplicantIdStore();
  const { account_type } = useUserStore();

  const { data: userData } = useGetResume(account_type === UserType.USER);
  const { data: ownerData } = useGetApplicantResume(
    Number(currentApplicantId),
    !isNaN(Number(currentApplicantId)) && account_type === UserType.OWNER
      ? true
      : false,
  );

  const data = account_type === UserType.OWNER ? ownerData : userData;

  if (!data?.success) return <></>;

  return (
    <section className="flex flex-col items-center gap-[1.5rem] w-full pt-[1.5rem] px-[1.5rem] pb-[7.25rem]">
      <PostApplyProfile
        profileImgUrl={data?.data?.profile_img_url}
        name={data?.data?.name}
      />
      <PostApplyCardLayout title="Visa">
        <h4 className="px-[0.25rem] pb-[0.375rem] head-3 text-[#464646]">
          {data?.data?.visa.visa.replace(/_/g, '-')}
        </h4>
        <p className="px-[0.25rem] body-3 text-[#464646]">
          {data?.data?.visa.description}
        </p>
      </PostApplyCardLayout>
      <PostApplyCardLayout title="Personal Information">
        <div className="flex flex-col gap-[0.75rem] w-full">
          <div>
            <h4 className="px-[0.25rem] pb-[0.375rem] button-2 text-[#464646]">
              Main Address
            </h4>
            <p className="px-[0.25rem] body-3 text-[#464646]">
              {data?.data?.personal_information.main_address}
            </p>
          </div>
          <div>
            <h4 className="px-[0.25rem] pb-[0.375rem] button-2 text-[#464646]">
              Detailed Address
            </h4>
            <p className="px-[0.25rem] body-3 text-[#464646]">
              {data?.data?.personal_information.detailed_address}
            </p>
          </div>
          <div>
            <h4 className="px-[0.25rem] pb-[0.375rem] button-2 text-[#464646]">
              Phone number
            </h4>
            <p className="px-[0.25rem] body-3 text-[#464646]">
              {data?.data?.personal_information.phone_number}
            </p>
          </div>
          <div>
            <h4 className="px-[0.25rem] pb-[0.375rem] button-2 text-[#464646]">
              Email
            </h4>
            <p className="px-[0.25rem] body-3 text-[#464646]">
              {data?.data?.personal_information.email}
            </p>
          </div>
        </div>
      </PostApplyCardLayout>
      <PostApplyCardLayout title="Introduction">
        <p className="w-full px-[0.25rem] body-3 text-[#464646]">
          {data?.data?.introduction}
        </p>
      </PostApplyCardLayout>
      <PostApplyCardLayout title="Work Experience">
        <div className="flex flex-col gap-[0.563rem]">
          {data?.data?.work_experience?.map((data: WorkExperienceType) => (
            <div
              key={data.id}
              className="w-full p-[0.75rem] rounded-[0.75rem] bg-[#F4F4F980]"
            >
              <h5 className="pb-[0.125rem] button-2 text-[#464646]">
                {data.title}
              </h5>
              <p className="pb-[0.5rem] caption-1 text-[#464646]">
                {data.description}
              </p>
              <div className="flex gap-[0.5rem] caption-1">
                <p className="text-[#656565]">
                  {data.start_date}~{data.end_date ?? ''}
                </p>
                <p className="text-[#7872ED]">{data.duration} months</p>
              </div>
            </div>
          ))}
        </div>
      </PostApplyCardLayout>
      <PostApplyCardLayout title="Education">
        <div className="flex flex-col gap-[0.563rem]">
          {data?.data?.education?.map((data: EducationType) => (
            <div key={data.id}>
              <h5 className="px-[0.5rem] pb-[0.563rem] button-2 text-[#1E1926]">
                {data.education_level}
              </h5>
              <div className="w-full p-[0.75rem] rounded-[0.75rem] bg-[#F4F4F980]">
                <div className="flex justify-between items-center">
                  <h5 className="pb-[0.125rem] button-2 text-[#464646]">
                    {data.school_name}
                  </h5>
                  <div className="px-[0.5rem] py-[0.25rem] rounded-[0.188rem] border-[0.031rem] border-[#7872ED] text-[#7872ED] bg-[#2801E81F] caption-2">
                    {EDUCATION_PERIOD[data.education_level]} years program
                  </div>
                </div>
                <p className="pb-[0.5rem] caption-1 text-[#464646]">
                  {data.major}
                </p>
                <div className="flex gap-[0.5rem] caption-1">
                  <p className="text-[#656565]">
                    {data.start_date}~{data.end_date}
                  </p>
                  <p className="text-[#7872ED]">{data.grade}th grade</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PostApplyCardLayout>
      <PostApplyCardLayout title="Languages">
        <div className="flex flex-col gap-[0.75rem]">
          <div className="flex justify-between items-center w-full py-[1rem] px-[0.75rem] rounded-[0.75rem] bg-[#F4F4F980]">
            <h5 className="pb-[0.125rem] button-2 text-[#464646]">TOPIK</h5>
            <div className="px-[0.5rem] py-[0.25rem] rounded-[0.188rem] border-[0.031rem] border-[#7872ED] text-[#7872ED] bg-[#2801E81F] caption-2">
              LEVEL {data?.data?.languages.topik}
            </div>
          </div>
          <div className="flex justify-between items-center w-full py-[1rem] px-[0.75rem] rounded-[0.75rem] bg-[#F4F4F980]">
            <h5 className="pb-[0.125rem] button-2 text-[#464646]">
              Social Intergration
            </h5>
            <div className="px-[0.5rem] py-[0.25rem] rounded-[0.188rem] border-[0.031rem] border-[#7872ED] text-[#7872ED] bg-[#2801E81F] caption-2">
              LEVEL {data?.data?.languages.social_integration}
            </div>
          </div>
          <div className="flex justify-between items-center w-full py-[1rem] px-[0.75rem] rounded-[0.75rem] bg-[#F4F4F980]">
            <h5 className="pb-[0.125rem] button-2 text-[#464646]">
              Sejong Institute
            </h5>
            <div className="px-[0.5rem] py-[0.25rem] rounded-[0.188rem] border-[0.031rem] border-[#7872ED] text-[#7872ED] bg-[#2801E81F] caption-2">
              LEVEL {data?.data?.languages.sejong_institute}
            </div>
          </div>
          {data?.data?.languages.etc?.map((data: LanguageType) => (
            <div
              key={data.id}
              className="flex justify-between items-center w-full py-[1rem] px-[0.75rem] rounded-[0.75rem] bg-[#F4F4F980]"
            >
              <h5 className="pb-[0.125rem] button-2 text-[#464646]">
                {data.language_name}
              </h5>
              <div className="px-[0.5rem] py-[0.25rem] rounded-[0.188rem] border-[0.031rem] border-[#7872ED] text-[#7872ED] bg-[#2801E81F] caption-2">
                Level {data.level}
              </div>
            </div>
          ))}
        </div>
      </PostApplyCardLayout>
    </section>
  );
};

export default PostApplyResume;
