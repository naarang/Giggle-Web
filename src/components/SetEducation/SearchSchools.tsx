import { useState, useEffect } from 'react';
import BaseHeader from '../Common/Header/BaseHeader';
import Input from '../Common/Input';
import { InputType } from '@/types/common/input';
import Button from '../Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import { School } from '@/types/api/document';
import { SearchSchollsList } from '@/constants/manageResume';
import { InitailEducationType } from '@/types/postResume/postEducation';
// import { useGetSearchSchools } from '@/hooks/api/useResume';

type SearchSchoolsProps = {
  setSchool: (school: School) => void;
  setSearchOpen: (value: boolean) => void;
  handleInputChange: (field: keyof InitailEducationType, value: number) => void;
};

const SearchSchools = ({
  setSchool,
  setSearchOpen,
  handleInputChange,
}: SearchSchoolsProps) => {
  // 학교명 검색어 상태 관리
  const [searchSchool, setSearchSchool] = useState<string>('');
  // 선택한 학교 상태 관리
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  // 학교 목록의 페이지(서버 요청)
  const [page, setPage] = useState<number>(1);
  const size = 10;

  const schoolList = SearchSchollsList;
  // const { data: schoolList = [], isLoading } = useGetSearchSchools(
  //   searchSchool,
  //   page,
  //   size,
  // );

  useEffect(() => {
    if (selectedSchool) {
      console.log(`Selected School: ${selectedSchool.name}`);
    }
  }, [selectedSchool]);

  // 선택 버튼
  const handleSubmit = () => {
    if (selectedSchool) {
      setSchool(selectedSchool);
      setSearchOpen(false);
      handleInputChange('school_id', selectedSchool.id);
    }
  };

  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
  };

  const handleSearchChange = (value: string) => {
    setSearchSchool(value);
    setPage(1); // 새로운 검색어가 들어오면 페이지를 초기화
  };

  return (
    <div className="fixed top-0 w-screen h-screen bg-white z-50">
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => setSearchOpen(false)}
        hasMenuButton={false}
        title="Education"
      />
      <div className="px-6 mb-6">
        <div className="head-1 text-[#1E1926] my-6">
          Search for
          <br />
          educational institutions
        </div>
        <Input
          inputType={InputType.SEARCH}
          placeholder="Search Name of school"
          value={searchSchool}
          onChange={handleSearchChange}
          canDelete={true}
          onDelete={() => setSearchSchool('')}
        />
        <div className="mt-6 p-2 body-2 text-[#656565] h-[26rem] overflow-scroll">
          {/* {isLoading ? (
            <div>Loading...</div>
          ) : ( */}
          {/* 검색된 학교 목록 */}
          {
            schoolList.map((school: School) => (
              <div
                key={school.id}
                className={`px-3.5 py-2.5 rounded-lg cursor-pointer ${
                  selectedSchool?.id === school.id
                    ? 'bg-[#FEF387] text-[#1E1926]'
                    : 'bg-white text-[#656565]'
                }`}
                onClick={() => handleSelectSchool(school)}
              >
                {school.name}
              </div>
            ))
            // )}
          }
        </div>
      </div>
      <div className="fixed w-full bottom-[3.125rem] px-6 pt-3 bg-grayGradient">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={selectedSchool ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}
          fontColor={selectedSchool ? 'text-[#1E1926]' : 'text-[#BDBDBD]'}
          title="Select"
          isBorder={false}
          onClick={selectedSchool ? handleSubmit : undefined}
        />
      </div>
    </div>
  );
};

export default SearchSchools;
