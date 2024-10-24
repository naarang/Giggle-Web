import PostApplyProfile from '@/components/PostApply/PostApplyProfile';
import PostApplyCardLayout from '@/components/PostApply/PostApplyCardLayout';
import { ResumeDetailItemType } from '@/types/postApply/resumeDetailItem';

// 더미데이터
const RESUME_DETAIL_DATA: ResumeDetailItemType = {
  profile_img_url: 'https://example.com/profile.jpg',
  name: 'John Doe',
  visa: {
    visa: 'D_2_2',
    description: 'Student visa for academic studies',
  },
  personal_information: {
    main_address: '123 Main Street, Seoul',
    detailed_address: 'Apt 45B, Gangnam-gu',
    phone_number: '010-1234-5678',
    email: 'john.doe@example.com',
  },
  introduction:
    'A passionate software developer with experience in full-stack development.',
  work_experience: [
    {
      id: 1,
      title: 'Software Engineer',
      description: 'Worked on developing and maintaining a web application.',
      start_date: '2021-03-01',
      end_date: '2023-05-15',
      duration: 805,
    },
  ],
  education: [
    {
      id: 1,
      education_level: 'ASSOCIATE',
      school_name: 'Seoul National University',
      major: 'Computer Science',
      start_date: '2017-03-01',
      end_date: '2021-02-28',
      grade: 3,
    },
  ],
  languages: {
    topik: 5,
    social_integration: 80,
    sejong_institute: 85,
    etc: [
      {
        id: 1,
        laguage_name: 'English',
        level: 4,
      },
      {
        id: 2,
        laguage_name: 'Japanese',
        level: 3,
      },
    ],
  },
};

const EDUCATION_PERIOD = {
  BACHELOR: 4,
  ASSOCIATE: 2,
  HIGHSCHOOL: 3,
} as const;

const PostApplyResume = () => {
  return (
    <section className="flex flex-col items-center gap-[1.5rem] w-full pt-[1.5rem] px-[1.5rem] pb-[7.25rem]">
      <PostApplyProfile
        profileImgUrl={RESUME_DETAIL_DATA.profile_img_url}
        name={RESUME_DETAIL_DATA.name}
      />
      <PostApplyCardLayout title="Visa">
        <h4 className="px-[0.25rem] pb-[0.375rem] head-3 text-[#464646]">
          {RESUME_DETAIL_DATA.visa.visa.replace(/_/g, '-')}
        </h4>
        <p className="px-[0.25rem] body-3 text-[#464646]">
          {RESUME_DETAIL_DATA.visa.description}
        </p>
      </PostApplyCardLayout>
      <PostApplyCardLayout title="Personal Information">
        <div className="flex flex-col gap-[0.75rem] w-full">
          <div>
            <h4 className="px-[0.25rem] pb-[0.375rem] button-2 text-[#464646]">
              Main Address
            </h4>
            <p className="px-[0.25rem] body-3 text-[#464646]">
              {RESUME_DETAIL_DATA.personal_information.main_address}
            </p>
          </div>
          <div>
            <h4 className="px-[0.25rem] pb-[0.375rem] button-2 text-[#464646]">
              Detailed Address
            </h4>
            <p className="px-[0.25rem] body-3 text-[#464646]">
              {RESUME_DETAIL_DATA.personal_information.detailed_address}
            </p>
          </div>
          <div>
            <h4 className="px-[0.25rem] pb-[0.375rem] button-2 text-[#464646]">
              Phone number
            </h4>
            <p className="px-[0.25rem] body-3 text-[#464646]">
              {RESUME_DETAIL_DATA.personal_information.phone_number}
            </p>
          </div>
          <div>
            <h4 className="px-[0.25rem] pb-[0.375rem] button-2 text-[#464646]">
              Email
            </h4>
            <p className="px-[0.25rem] body-3 text-[#464646]">
              {RESUME_DETAIL_DATA.personal_information.email}
            </p>
          </div>
        </div>
      </PostApplyCardLayout>
      <PostApplyCardLayout title="Introduction">
        <p className="w-full px-[0.25rem] body-3 text-[#464646]">
          {RESUME_DETAIL_DATA.introduction}
        </p>
      </PostApplyCardLayout>
      <PostApplyCardLayout title="Work Experience">
        <div className="flex flex-col gap-[0.563rem]">
          {RESUME_DETAIL_DATA.work_experience.map((data) => (
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
          {RESUME_DETAIL_DATA.education.map((data) => (
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
              LEVEL {RESUME_DETAIL_DATA.languages.topik}
            </div>
          </div>
          <div className="flex justify-between items-center w-full py-[1rem] px-[0.75rem] rounded-[0.75rem] bg-[#F4F4F980]">
            <h5 className="pb-[0.125rem] button-2 text-[#464646]">
              Social Intergration
            </h5>
            <div className="px-[0.5rem] py-[0.25rem] rounded-[0.188rem] border-[0.031rem] border-[#7872ED] text-[#7872ED] bg-[#2801E81F] caption-2">
              Level {RESUME_DETAIL_DATA.languages.social_integration}
            </div>
          </div>
          <div className="flex justify-between items-center w-full py-[1rem] px-[0.75rem] rounded-[0.75rem] bg-[#F4F4F980]">
            <h5 className="pb-[0.125rem] button-2 text-[#464646]">
              Sejong Institute
            </h5>
            <div className="px-[0.5rem] py-[0.25rem] rounded-[0.188rem] border-[0.031rem] border-[#7872ED] text-[#7872ED] bg-[#2801E81F] caption-2">
              Level {RESUME_DETAIL_DATA.languages.sejong_institute}
            </div>
          </div>
          {RESUME_DETAIL_DATA.languages.etc?.map((data) => (
            <div
              key={data.id}
              className="flex justify-between items-center w-full py-[1rem] px-[0.75rem] rounded-[0.75rem] bg-[#F4F4F980]"
            >
              <h5 className="pb-[0.125rem] button-2 text-[#464646]">
                {data.laguage_name}
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
