import { useState } from 'react';
import BaseHeader from '../Common/Header/BaseHeader';
import Input from '../Common/Input';
import { InputType } from '@/types/common/input';
import Button from '../Common/Button';
import { buttonTypeKeys } from '@/constants/components';

type School = {
  id: number;
  name: string;
  phone_number: string;
};

type SearchSchoolsProps = {
  setSchoolId: (value: number) => void; //Id말고 객체로 넘기기
  setSearchOpen: (value: boolean) => void;
};

const SearchSchools = ({ setSchoolId, setSearchOpen }: SearchSchoolsProps) => {
  const [searchSchool, setSearchSchool] = useState<string>('');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  const [schoolList, setSchoolList] = useState<School[]>([
    { id: 1, name: 'University of Oxford', phone_number: 'String' },
    {
      id: 2,
      name: 'National University of Lesotho International School',
      phone_number: 'String',
    },
    { id: 3, name: 'University of Chester CE Academy', phone_number: 'String' },
    {
      id: 4,
      name: 'University of Chester Academy Northwich',
      phone_number: 'String',
    },
    { id: 5, name: 'University of Birmingham School', phone_number: 'String' },
    { id: 6, name: 'University of Oxford', phone_number: 'String' },
    {
      id: 7,
      name: 'National University of Lesotho International School',
      phone_number: 'String',
    },
    { id: 8, name: 'University of Chester CE Academy', phone_number: 'String' },
    {
      id: 9,
      name: 'University of Chester Academy Northwich',
      phone_number: 'String',
    },
    { id: 10, name: 'University of Birmingham School', phone_number: 'String' },
  ]);

  const handleSubmit = () => {
    if (selectedSchool) {
      setSchoolId(selectedSchool.id);
      setSearchOpen(false);
    }
  };

  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
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
          onChange={(value: string) => setSearchSchool(value)}
          canDelete={true}
          onDelete={() => setSearchSchool('')}
        />
        <div className="mt-6 p-2 body-2 text-[#656565] h-[26rem] overflow-scroll">
          {schoolList.map((school) => (
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
          ))}
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
