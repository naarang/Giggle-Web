import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useSearchSchool } from '@/hooks/api/useDocument';
import {
  IntegratedApplicationData,
  SearchSchoolResponse,
} from '@/types/api/document';
import Input from '@/components/Common/Input';
import { InputType } from '@/types/common/input';
import { School } from '@/types/api/document';
import { RESTYPE } from '@/types/api/common';

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
  // TODO: 학교 검색 API와 연결 후 mock data 제거, 함수는 작성완료된 상태
  const [searchResult, setSearchResult] = useState<School[]>();
  const { searchSchool } = useSearchSchool({
    onSuccess: (data: RESTYPE<SearchSchoolResponse>) =>
      setSearchResult(data.data.school_list),
  });

  // 검색 입력 시 실시간으로 검색 진행
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

  // 학교 선택 시 자동 입력 및 bottomsheet 제거
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
            {searchResult && searchResult?.length > 0 && (
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
