import { InputType } from '@/types/common/input';
import Input from '../Common/Input';
import Dropdown from '../Common/Dropdown';
import { PostEducationType } from '@/types/postResume/postEducation';
import { EducationLevels } from '@/constants/manageResume';
import GraySearchIcon from '@/assets/icons/ManageResume/GraySearchIcon.svg?react';
import { useState } from 'react';
import SearchSchools from './SearchSchools';
import { School } from '@/types/api/document';

type EducationPatchProps = {
  educationData: PostEducationType;
  setEducationData: React.Dispatch<React.SetStateAction<PostEducationType>>;
  schoolData: School;
};

const EducationPatch = ({
  educationData,
  setEducationData,
  schoolData,
}: EducationPatchProps) => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [school, setSchool] = useState<School>(schoolData);

  const handleSchoolChange = (school: School) => {
    setSchool(school);
  };

  const handleInputChange = (
    field: keyof PostEducationType,
    value: string | number,
  ) => {
    setEducationData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (
    field: 'start_date' | 'end_date',
    value: string,
  ) => {
    handleInputChange(field, value.replace(/\//g, '-'));
  };

  return (
    <>
      {searchOpen && (
        <SearchSchools
          setSchool={handleSchoolChange}
          setSearchOpen={setSearchOpen}
          handleInputChange={handleInputChange}
        />
      )}
      <div className="p-6 flex flex-col gap-3">
        <div className="head-1 mb-6 text-[#1E1926]">Modify Education</div>
        {/* 교육 기관 타입 선택 */}
        <div className="relative">
          <p className="body-3 text-[#1E1926] px-1 py-2">
            Education Levels<span className="text-[#EE4700] body-1">*</span>
          </p>
          <div className="absolute">
            <Dropdown
              value={educationData.education_level}
              placeholder="2-Year university"
              options={EducationLevels}
              setValue={(value) => handleInputChange('education_level', value)}
            />
          </div>
          <div className="h-11" /> {/* absolute 만큼의 공간 차지 */}
        </div>
        {/* 학교명 선택 */}
        <div>
          <p className="body-3 text-[#1E1926] px-1 py-2">
            Name Of School<span className="text-[#EE4700] body-1">*</span>
          </p>
          <div
            className="w-full py-2.5 px-4 flex items-center gap-2.5 border border-solid border-[#EBEEF1] rounded-xl"
            onClick={() => setSearchOpen(true)}
          >
            <GraySearchIcon />
            {/* 선택되었다면, 선택한 학교명 */}
            <p
              className={`body-2 ${school ? 'text-[#1E1926]' : 'text-[#BDBDBD]'}`}
            >
              {school ? school.name : 'Search Name of school'}
            </p>
          </div>
        </div>
        {/* 전공 입력 */}
        <div>
          <p className="body-3 text-[#1E1926] px-1 py-2">
            Department (major)<span className="text-[#EE4700] body-1">*</span>
          </p>
          <Input
            inputType={InputType.TEXT}
            placeholder="Education Title"
            value={educationData.major}
            onChange={(value) => handleInputChange('major', value)}
            canDelete={false}
          />
        </div>
        {/* 학년 입력 */}
        <div>
          <p className="body-3 text-[#1E1926] px-1 py-2">
            Grade<span className="text-[#EE4700] body-1">*</span>
          </p>
          <Input
            inputType={InputType.TEXT}
            placeholder="Grade"
            value={String(educationData.grade)}
            onChange={(value) => handleInputChange('grade', value)}
            canDelete={false}
          />
        </div>
        {/* 학점 입력 */}
        <div>
          <p className="body-3 text-[#1E1926] px-1 py-2">
            Credit<span className="text-[#EE4700] body-1">*</span>
          </p>
          <Input
            inputType={InputType.TEXT}
            placeholder="0.0"
            value={String(educationData.gpa)}
            onChange={(value) => handleInputChange('gpa', value)}
            canDelete={false}
          />
        </div>
        {/* 입학 날짜 입력 */}
        <div className="w-full">
          <p className="body-3 text-[#1E1926] px-1 py-2">
            Entrance Date <span className="text-[#EE4700] body-1">*</span>
          </p>
          <Dropdown
            value={educationData.start_date.replace(/-/g, '/')}
            placeholder="Select Date"
            options={[]}
            isCalendar={true}
            setValue={(value) => handleDateChange('start_date', value)}
          />
        </div>
        {/* 졸업 날짜 입력 */}
        <div className="w-full">
          <p className="body-3 text-[#1E1926] px-1 py-2">
            Graduation Date <span className="text-[#EE4700] body-1">*</span>
          </p>
          <Dropdown
            value={educationData.end_date?.replace(/-/g, '/')}
            placeholder="Select Date"
            options={[]}
            isCalendar={true}
            setValue={(value) => handleDateChange('end_date', value)}
          />
        </div>
      </div>
    </>
  );
};

export default EducationPatch;
