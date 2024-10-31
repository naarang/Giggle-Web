import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import Dropdown, { DropdownModal } from '@/components/Common/Dropdown';
import Input from '@/components/Common/Input';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { useGetGeoInfo, useSearchAddress } from '@/hooks/api/useKaKaoMap';
import { AddressType, Document } from '@/types/api/map';
import { InputType } from '@/types/common/input';
import { JobPostingForm } from '@/types/postCreate/postCreate';
import { pick } from '@/utils/map';
import { useCallback, useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import CheckIcon from '@/assets/icons/CheckOfBoxIcon.svg?react';
import { buttonTypeKeys } from '@/constants/components';
import { formatDateToDash } from '../../../utils/editResume';

const Step2 = ({
  postInfo,
  onNext,
  onPrev,
}: {
  postInfo: JobPostingForm;
  onNext: (postInfo: JobPostingForm) => void;
  onPrev: () => void;
}) => {
  // 현재 step내에서 입력받는 정보를 따로 관리할 state, 추후 다음 step으로 넘어갈 때 funnel 관리 페이지의 state로 통합된다.
  const [newPostInfo, setNewPostInfo] = useState<JobPostingForm>(postInfo);
  // 버튼 활성화 여부를 위한 플래그
  const [isInvalid, setIsInvalid] = useState(true);
  // 주소 검색용 input 저장하는 state
  const [addressInput, setAddressInput] = useState(
    newPostInfo.body.address.address_name
      ? newPostInfo.body.address.address_name
      : '',
  );
  // 주소 검색 결과를 저장하는 array
  const [addressSearchResult, setAddressSearchResult] = useState<Document[]>(
    [],
  );
  // 지도에 표시할 핀에 사용되는 위/경도 좌표
  const [currentGeoInfo, setCurrentGeoInfo] = useState({
    lat: 0,
    lon: 0,
  });

  // 현재 좌표 기준 주소 획득
  const { data, isSuccess } = useGetGeoInfo(setCurrentGeoInfo);
  // 키워드로 주소 검색
  const { searchAddress } = useSearchAddress({
    onSuccess: (data) => setAddressSearchResult(data),
  });

  // 첫 로딩 시 현재 사용자의 위치 파악 해 지도에 표기
  useEffect(() => {
    setNewPostInfo({
      ...newPostInfo,
      body: {
        ...newPostInfo.body,
        address: {
          ...newPostInfo.body.address,
          address_name: String(data?.address.address_name),
        },
      },
    });
  }, [isSuccess]);

  // 검색할 주소 입력 시 실시간 검색
  const handleAddressSearch = useCallback(
    (address: string) => {
      setAddressInput(address);
      if (address !== '') {
        searchAddress(address);
      } else {
        setAddressSearchResult([]);
      }
    },
    [searchAddress],
  );

  // 검색 결과 중 원하는 주소를 선택할 시 state에 입력
  const handleAddressSelect = (selectedAddressName: string) => {
    // 사용자가 선택한 주소와 일치하는 결과를 검색 결과를 저장하는 array에서 탐색
    const selectedAddress = addressSearchResult.find(
      (address) => address.address_name === selectedAddressName,
    ) as Document | undefined;

    if (!selectedAddress) return;

    // 구 주소와 도로명 주소를 구분하기 위한 플래그(카카오에서 반환하는 속성 명이 달라짐)
    const isRegionAddr =
      selectedAddress.address_type === AddressType.REGION_ADDR;
    const addressData = isRegionAddr
      ? selectedAddress.address
      : selectedAddress.road_address;

    // 카카오에서 반환하는 데이터 중 필요한 속성들만 선택
    const selectedProperties = pick(addressData, [
      'address_name',
      'region_1depth_name',
      'region_2depth_name',
      'region_3depth_name',
    ]);

    let region4DepthName = ''; // optional property인 region4DeptName
    if (isRegionAddr) {
      region4DepthName = selectedAddress.address.region_3depth_h_name || '';
    } else {
      region4DepthName = selectedAddress.road_address.road_name || '';
    }

    // 선택한 데이터들을 state에 update
    setNewPostInfo({
      ...newPostInfo,
      body: {
        ...newPostInfo.body,
        address: {
          ...newPostInfo.body.address,
          ...selectedProperties,
          region_4depth_name: region4DepthName,
          longitude: Number(addressData.x),
          latitude: Number(addressData.y),
        },
      },
    });
    setAddressInput(selectedAddress.address_name);
    setCurrentGeoInfo({
      lon: Number(selectedAddress.x),
      lat: Number(selectedAddress.y),
    });
    // 검색 결과 초기화
    setAddressSearchResult([]);
  };
  /* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */
  useEffect(() => {
    const { address } = newPostInfo.body;

    const isFormValid = address.region_1depth_name !== '';
    // work_day_times.length &&
    setIsInvalid(!isFormValid);
  }, [newPostInfo]);
  return (
    <div className="w-full py-6 flex flex-col">
      <div className="[&>*:last-child]:mb-40 flex flex-col gap-4">
        <div className="w-full flex flex-col gap-[1.125rem]">
          {/* 주소 검색 입력 input */}
          <InputLayout title="근무지 주소" isEssential>
            <Input
              inputType={InputType.SEARCH}
              placeholder="주소 검색"
              value={addressInput}
              onChange={(value) => handleAddressSearch(value)}
              canDelete={false}
            />
            {/* 주소 검색 결과 보여주는 dropdown modal */}
            {addressSearchResult && addressSearchResult.length !== 0 && (
              <DropdownModal
                value={newPostInfo.body.address.address_name}
                options={Array.from(
                  addressSearchResult.filter(
                    (address) =>
                      address.address_type !==
                      (AddressType.REGION_ADDR || AddressType.ROAD_ADDR),
                  ),
                  (address) => address.address_name,
                )}
                onSelect={handleAddressSelect}
              />
            )}
          </InputLayout>
          {/* 검색한 위치를 보여주는 지도 */}
          <div className="w-full rounded-xl">
            <Map
              center={{ lat: currentGeoInfo.lat, lng: currentGeoInfo.lon }}
              style={{ width: '100%', height: '200px' }}
              className="rounded-xl"
            >
              <MapMarker
                position={{ lat: currentGeoInfo.lat, lng: currentGeoInfo.lon }}
              ></MapMarker>
            </Map>
          </div>
          <InputLayout title="상세주소" isEssential={false}>
            <Input
              inputType={InputType.TEXT}
              placeholder="ex) 101동"
              value={newPostInfo.body.address.address_detail}
              onChange={(value) =>
                setNewPostInfo({
                  ...newPostInfo,
                  body: {
                    ...newPostInfo.body,
                    address: {
                      ...newPostInfo.body.address,
                      address_detail: value,
                    },
                  },
                })
              }
              canDelete={false}
            />
          </InputLayout>
        </div>
        {/* 날짜 선택 입력 */}
        <InputLayout title="공고 종료일" isEssential>
          <Dropdown
            value={
              newPostInfo.body.recruitment_dead_line === null
                ? ''
                : newPostInfo.body.recruitment_dead_line
            }
            placeholder="날짜 선택"
            options={[]}
            isCalendar={true}
            setValue={(value) =>
              setNewPostInfo({
                ...newPostInfo,
                body: {
                  ...newPostInfo.body,
                  recruitment_dead_line: formatDateToDash(value),
                },
              })
            }
          />
        </InputLayout>
        <div className="w-full relative flex items-center justify-start py-2 gap-3 text-left body-3 text-[#656565]">
          <div className="w-6 h-6 relative">
            <div
              className={`w-full h-full border border-[#f4f4f9] flex items-center justify-center ${newPostInfo.body.recruitment_dead_line === null ? 'bg-[#1E1926]' : 'bg-white'}`}
              onClick={
                newPostInfo.body.recruitment_dead_line !== null
                  ? () =>
                      setNewPostInfo({
                        ...newPostInfo,
                        body: {
                          ...newPostInfo.body,
                          recruitment_dead_line: null,
                        },
                      })
                  : () =>
                      setNewPostInfo({
                        ...newPostInfo,
                        body: {
                          ...newPostInfo.body,
                          recruitment_dead_line: '',
                        },
                      })
              }
            >
              <CheckIcon />
            </div>
          </div>
          <div className="flex items-start justify-start">상시모집</div>
        </div>
      </div>
      <BottomButtonPanel>
        {/* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */}
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
            onClick={
              isInvalid
                ? undefined
                : () =>
                    onNext({
                      ...postInfo,
                      body: {
                        ...newPostInfo.body,
                        recruitment_dead_line:
                          newPostInfo.body.recruitment_dead_line &&
                          formatDateToDash(
                            newPostInfo.body.recruitment_dead_line,
                          ),
                      },
                    })
            }
          />
        </div>
      </BottomButtonPanel>
    </div>
  );
};

export default Step2;
