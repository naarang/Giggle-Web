import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { buttonTypeKeys } from '@/constants/components';
import { InputType } from '@/types/common/input';
import { JobPostingForm } from '@/types/postCreate/postCreate';
import { findJobCategoryByNameStrict, JobCategoryNames } from '@/utils/post';
import { useEffect, useState } from 'react';

const Step5 = ({
  postInfo,
  onNext,
  onSubmit,
  onPrev,
}: {
  postInfo: JobPostingForm;
  onNext: (postInfo: JobPostingForm) => void;
  onSubmit: (newPost: FormData) => void;
  onPrev: () => void;
}) => {
  // 현재 step내에서 입력받는 정보를 따로 관리할 state, 추후 다음 step으로 넘어갈 때 funnel 관리 페이지의 state로 통합된다.
  const [newPostInfo, setNewPostInfo] = useState<JobPostingForm>(postInfo);
  // 버튼 활성화 여부를 위한 플래그
  const [isInvalid, setIsInvalid] = useState(true);

  /* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */
  useEffect(() => {
    const { description } = newPostInfo.body;
    const isFormValid = description !== '';
    setIsInvalid(!isFormValid);
  }, [newPostInfo]);

  const handlePreferredInput = (value: string) => {
    // 우대 사항 입력 50자 이하 제한
    if (newPostInfo.body.preferred_conditions.length < 50)
      setNewPostInfo({
        ...newPostInfo,
        body: {
          ...newPostInfo.body,
          preferred_conditions: value,
        },
      });
  };

  const handleSubmit = () => {
    if (isInvalid) return;
    const formData = new FormData();
    newPostInfo.images.forEach((image) => {
      formData.append('image', image);
    });
    formData.append(
      'body',
      new Blob([JSON.stringify(newPostInfo.body)], {
        type: 'application/json',
      }),
    );
    formData.forEach((value, key) => {
      if (value instanceof Blob) {
        console.log(`${key}:`, `Blob size: ${value.size}, type: ${value.type}`);
      } else {
        console.log(`${key}:`, value);
      }
    });

    onNext({
      ...postInfo,
      body: {
        ...newPostInfo.body,
        job_category: String(
          findJobCategoryByNameStrict(
            newPostInfo.body.job_category as JobCategoryNames,
          ),
        ),
      },
    });
    onSubmit(formData);
  };

  return (
    <div className="w-full py-6 flex flex-col">
      <div className="[&>*:last-child]:mb-40 flex flex-col gap-4">
        {/* 상세요강 입력 */}
        <InputLayout title="상세요강" isEssential>
          <div className="w-full self-stretch flex flex-col items-center justify-start body-3">
            <div className="w-full flex flex-col items-start justify-start">
              <div className="w-full flex flex-col items-center justify-start">
                <textarea
                  className="w-full h-[40vh] px-[1rem] py-[0.75rem] border border-[#E2E5EB] rounded-[0.75rem] body-2 outline-none resize-none"
                  placeholder="상세요강을 작성해주세요"
                  value={newPostInfo.body.description}
                  maxLength={100}
                  onChange={(e) =>
                    setNewPostInfo({
                      ...newPostInfo,
                      body: {
                        ...newPostInfo.body,
                        description: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </InputLayout>
        {/* 우대조건 입력 */}
        <InputLayout title="우대조건" isEssential={false}>
          <Input
            inputType={InputType.TEXT}
            placeholder="우대조건을 입력해주세요"
            value={newPostInfo.body.preferred_conditions}
            onChange={(value) => handlePreferredInput(value)}
            canDelete={false}
          />
        </InputLayout>
      </div>
      <BottomButtonPanel>
        <div className="w-full flex gap-2">
          <Button
            type={buttonTypeKeys.BACK}
            bgColor="bg-[#F4F4F9]"
            fontColor="text-[#BDBDBD]"
            isBorder={false}
            title="이전"
            onClick={() => onPrev()}
          />
          <Button
            type="large"
            bgColor={isInvalid ? 'bg-[#F4F4F9]' : 'bg-[#fef387]'}
            fontColor={isInvalid ? 'text-[#BDBDBD]' : 'text-[#222]'}
            isBorder={false}
            title="다음"
            onClick={handleSubmit}
          />
        </div>
      </BottomButtonPanel>
    </div>
  );
};

export default Step5;
