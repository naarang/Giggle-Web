import Dropdown from '@/components/Common/Dropdown';
import Input from '@/components/Common/Input';
import RadioButton from '@/components/Information/RadioButton';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { InputType } from '@/types/common/input';
import { EmploymentType, JobPostingForm } from '@/types/postCreate/postCreate';
import { em } from 'framer-motion/client';
import React, { useEffect, useState } from 'react';

const Step1 = ({
  postInfo,
  onNext,
}: {
  postInfo: JobPostingForm;
  onNext: (postInfo: JobPostingForm) => void;
}) => {
  // 현재 step내에서 입력받는 정보를 따로 관리할 state, 추후 다음 step으로 넘어갈 때 funnel 관리 페이지의 state로 통합된다.
  const [newPostInfo, setNewPostInfo] = useState<JobPostingForm>(postInfo);
  // 버튼 활성화 여부를 위한 플래그
  const [isInvalid, setIsInvalid] = useState(true);

  /* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */
  useEffect(() => {
    const { title, job_category, work_day_times, hourly_rate, work_period } =
      newPostInfo.body;

    const isFormValid =
      title !== '' &&
      job_category !== '' &&
      work_day_times.length &&
      Number(hourly_rate) !== 0 &&
      work_period !== '';

    setIsInvalid(!isFormValid);
  }, [newPostInfo]);

  return (
    <div className="w-full p-6 flex flex-col">
      <div className="[&>*:last-child]:mb-40 flex flex-col gap-4">
        {/* 공고 제목 입력 */}
        <InputLayout title="공고 제목" isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="제목을 입력해주세요"
            value={newPostInfo.body.title}
            onChange={(value) =>
              setNewPostInfo({
                ...newPostInfo,
                body: { ...newPostInfo.body, title: value },
              })
            }
            canDelete={false}
          />
        </InputLayout>
        {/* 업직종 입력 */}
        <InputLayout title="업직종" isEssential>
          <Dropdown
            value={newPostInfo.body.job_category}
            placeholder="업직종을 선택해주세요"
            options={[]}
            setValue={(value) =>
              setNewPostInfo({
                ...newPostInfo,
                body: { ...newPostInfo.body, job_category: value },
              })
            }
          />
        </InputLayout>
        {/* 근무 시간 선택 */}
        <InputLayout title="근무 시간" isEssential>
          <div className="w-full relative body-3 text-[#222] text-left">
            원하는 근무 시간을 추가해주세요.
          </div>
          <div className="w-full relative flex flex-col items-start justify-center px-1 py-1.5 gap-3 text-left text-[#656565]"></div>
        </InputLayout>
        {/* 시급 입력 */}
        <InputLayout title="시급" isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="시급을 입력해주세요"
            value={`${newPostInfo.body.hourly_rate} 원`}
            onChange={(value) =>
              setNewPostInfo({
                ...newPostInfo,
                body: { ...newPostInfo.body, hourly_rate: value },
              })
            }
            canDelete={false}
          />
        </InputLayout>
        {/* 타입 선택 */}
        <InputLayout title="타입" isEssential>
          <div className="w-full relative flex flex-col items-start justify-center px-1 py-1.5 gap-3 text-left text-[#656565]">
            <RadioButton
              value="아르바이트"
              setValue={(value) =>
                setNewPostInfo({
                  ...newPostInfo,
                  body: {
                    ...newPostInfo.body,
                    employment_type: value as EmploymentType,
                  },
                })
              }
              isOn={
                newPostInfo.body.employment_type === EmploymentType.PARTTIME
              }
            />
            <RadioButton
              value="인턴십"
              setValue={(value) =>
                setNewPostInfo({
                  ...newPostInfo,
                  body: {
                    ...newPostInfo.body,
                    employment_type: value as EmploymentType,
                  },
                })
              }
              isOn={
                newPostInfo.body.employment_type !== EmploymentType.PARTTIME
              }
            />
          </div>
        </InputLayout>
      </div>
    </div>
  );
};

export default Step1;
