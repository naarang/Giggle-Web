import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useSearchSchool } from '@/hooks/api/useDocument';
import {
  IntegratedApplicationData,
  SearchSchoolResponse,
} from '@/types/api/document';
import Input from '@/components/Common/Input';
import { InputType } from '@/types/common/input';
import { School } from '@/types/api/document';

type SearchSchoolBottomSheetProps = {
  newDocumentData: IntegratedApplicationData;
  setNewDocumentData: Dispatch<SetStateAction<IntegratedApplicationData>>;
  onClose: () => void;
};

const SearchSchoolBottomSheet = ({
  newDocumentData,
  setNewDocumentData,
  onClose,
}: SearchSchoolBottomSheetProps) => {
  const [searchResult, setSearchResult] = useState<School[]>([
    {
      id: 1,
      name: '서울대학교',
      phone_number: '02-880-5114',
    },
    {
      id: 2,
      name: '연세대학교',
      phone_number: '02-2123-2114',
    },
    {
      id: 3,
      name: '고려대학교',
      phone_number: '02-3290-1114',
    },
    {
      id: 4,
      name: '한양대학교',
      phone_number: '02-2220-0114',
    },
    {
      id: 5,
      name: '성균관대학교',
      phone_number: '02-760-1114',
    },
    {
      id: 6,
      name: '경희대학교',
      phone_number: '02-961-0114',
    },
    {
      id: 7,
      name: '중앙대학교',
      phone_number: '02-820-5114',
    },
  ]);
  const { searchSchool } = useSearchSchool({
    onSuccess: (data: SearchSchoolResponse) =>
      setSearchResult(data.school_list),
  });

  const handleAddressSearch = useCallback(
    (name: string) => {
      setNewDocumentData({
        ...newDocumentData,
        school_name: name,
      });
      if (name !== '') {
        searchSchool(name);
      } else {
        setSearchResult([]);
      }
    },
    [searchSchool],
  );

  const handleSelect = (name: string) => {
    setNewDocumentData({ ...newDocumentData, school_name: name });
    onClose();
  };
  return (
    <>
      <div className="self-stretch flex items-center justify-center pb-3 head-2 text-center">
        <div className="flex-1 relative">Search for school</div>
      </div>

      <div className="w-full flex flex-col items-start justify-start pb-6 text-left head-3">
        <div className="self-stretch flex flex-col items-start justify-start py-6 gap-4">
          <div className="self-stretch flex items center jusity-center">
            <div className="flex-1 relative">Select your school</div>
          </div>
          <Input
            inputType={InputType.SEARCH}
            placeholder="Name of School"
            value={newDocumentData.school_name}
            onChange={(name: string) => handleAddressSearch(name)}
            canDelete={true}
            onDelete={() =>
              setNewDocumentData({ ...newDocumentData, school_name: '' })
            }
          />
          <div className="w-full h-[30vh]">
            {searchResult?.length && searchResult.length > 0 && (
              <div className="w-full relative rounded-2xl bg-white flex flex-row items-start justify-start pl-1 text-left text-[#656565] body-2">
                <div className="flex-1 flex flex-col items-start justify-start gap-1">
                  {searchResult.map((school) => (
                    <div
                      className="self-stretch overflow-hidden flex items-center justify-start px-3.5 py-2.5"
                      onClick={() => handleSelect(school.name)}
                    >
                      <div className="relative">{school.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchSchoolBottomSheet;
