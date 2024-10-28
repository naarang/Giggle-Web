import Dropdown, { DropdownModal } from '@/components/Common/Dropdown';
import Input from '@/components/Common/Input';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { phone } from '@/constants/information';
import { useGetGeoInfo, useSearchAddress } from '@/hooks/api/useKaKaoMap';
import { EmployerRegistrationRequest } from '@/types/api/employ';
import { AddressType, Document } from '@/types/api/map';
import { InputType } from '@/types/common/input';
import { pick } from '@/utils/map';
import { useCallback, useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import FileAddIcon from '@/assets/icons/FileAddIcon.svg?react';

type InformationInputSectionProps = {
  newEmployData: EmployerRegistrationRequest;
  setNewEmployData: (newData: EmployerRegistrationRequest) => void;
};

const InformationInputSection = ({
  newEmployData,
  setNewEmployData,
}: InformationInputSectionProps) => {
  // 주소 검색용 input 저장하는 state
  const [addressInput, setAddressInput] = useState('');
  // 주소 검색 결과를 저장하는 array
  const [addressSearchResult, setAddressSearchResult] = useState<Document[]>(
    [],
  );
  // 지도에 표시할 핀에 사용되는 위/경도 좌표
  const [currentGeoInfo, setCurrentGeoInfo] = useState({
    lat: 0,
    lon: 0,
  });
  // 세 부분으로 나누어 입력받는 방식을 위해 전화번호만 별도의 state로 분리, 추후 유효성 검사 단에서 통합
  const [phoneNum, setPhoneNum] = useState({
    start: '',
    middle: '',
    end: '',
  });
  // 현재 좌표 기준 주소 획득
  const { data, isSuccess } = useGetGeoInfo(setCurrentGeoInfo);
  // 키워드로 주소 검색
  const { searchAddress } = useSearchAddress({
    onSuccess: (data) => setAddressSearchResult(data),
  });
  // 첫 로딩 시 현재 사용자의 위치 파악 해 지도에 표기
  useEffect(() => {
    setNewEmployData({
      ...newEmployData,
      address: {
        ...newEmployData.address,
        address_name: String(data?.address.address_name),
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
    setNewEmployData({
      ...newEmployData,
      address: {
        ...newEmployData.address,
        ...selectedProperties,
        region_4depth_name: region4DepthName,
        longitude: Number(addressData.x),
        latitude: Number(addressData.y),
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
  return (
    <>
      <div className="w-full flex flex-col py-6 items-center justify-between [&>*:last-child]:mb-40">
        <div className="relative w-full flex items-center justify-center title-1 text-[#1e1926] text-left">
          추가 정보 입력
        </div>
        <div className="flex flex-col gap-4">
          {/* 이름 입력 */}
          <InputLayout title="회사/점포명" isEssential>
            <Input
              inputType={InputType.TEXT}
              placeholder="회사/점포명을 입력해주세요"
              value={newEmployData.owner_info.company_name}
              onChange={(value) =>
                setNewEmployData({
                  ...newEmployData,
                  owner_info: {
                    ...newEmployData.owner_info,
                    company_name: value,
                  },
                })
              }
              canDelete={false}
            />
          </InputLayout>
          {/* 대표자명 입력 */}
          <InputLayout title="대표자명" isEssential>
            <Input
              inputType={InputType.TEXT}
              placeholder="대표자명을 입력해주세요"
              value={newEmployData.owner_info.owner_name}
              onChange={(value) =>
                setNewEmployData({
                  ...newEmployData,
                  owner_info: {
                    ...newEmployData.owner_info,
                    owner_name: value,
                  },
                })
              }
              canDelete={false}
            />
          </InputLayout>
          <div className="w-full flex flex-col gap-[1.125rem]">
            {/* 주소 검색 입력 input */}
            <InputLayout title="회사/점포주소" isEssential>
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
                  value={newEmployData.address.address_name}
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
                  position={{
                    lat: currentGeoInfo.lat,
                    lng: currentGeoInfo.lon,
                  }}
                ></MapMarker>
              </Map>
            </div>
            <InputLayout title="Detailed Address" isEssential>
              <Input
                inputType={InputType.TEXT}
                placeholder="ex) 101-dong"
                value={newEmployData.address.address_detail}
                onChange={(value) =>
                  setNewEmployData({
                    ...newEmployData,
                    address: {
                      ...newEmployData.address,
                      address_detail: value,
                    },
                  })
                }
                canDelete={false}
              />
            </InputLayout>
          </div>
          {/* 사업자 등록번호 입력 */}
          <InputLayout title="사업자 등록번호" isEssential>
            <Input
              inputType={InputType.TEXT}
              placeholder="사업자등록번호를 입력해주세요"
              value={newEmployData.owner_info.company_registration_number}
              onChange={(value) =>
                setNewEmployData({
                  ...newEmployData,
                  owner_info: {
                    ...newEmployData.owner_info,
                    company_registration_number: value,
                  },
                })
              }
              canDelete={false}
            />
          </InputLayout>
          {/* 개인 휴대폰 번호 입력 */}
          <InputLayout title="Cell Phone No." isEssential>
            <div className="w-full flex flex-row gap-2 justify-between">
              <div className="w-full h-[2.75rem]">
                <Dropdown
                  value={phoneNum.start}
                  placeholder="+82"
                  options={phone}
                  setValue={(value) =>
                    setPhoneNum({ ...phoneNum, start: value })
                  }
                />
              </div>
              <Input
                inputType={InputType.TEXT}
                placeholder="0000"
                value={phoneNum.middle}
                onChange={(value) =>
                  setPhoneNum({ ...phoneNum, middle: value })
                }
                canDelete={false}
              />
              <Input
                inputType={InputType.TEXT}
                placeholder="0000"
                value={phoneNum.end}
                onChange={(value) => setPhoneNum({ ...phoneNum, end: value })}
                canDelete={false}
              />
            </div>
          </InputLayout>
          <InputLayout title="Cell Phone No." isEssential={false}>
            <div className="w-full flex flex-col items-center justify-start">
              <div className="w-full flex items-center justify-start">
                <div className="shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-lg bg-white border-[0.5px] border-[#eae9f6] h-11 flex items-center justify-center px-4 py-2.5">
                  <FileAddIcon />
                </div>
              </div>
            </div>
          </InputLayout>
        </div>
      </div>
    </>
  );
};

export default InformationInputSection;
