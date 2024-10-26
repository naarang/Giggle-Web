import { initialIntegratedApplication } from '@/constants/documents';
import { useGetGeoInfo, useSearchAddress } from '@/hooks/api/useKaKaoMap';
import { IntegratedApplicationData } from '@/types/api/document';
import { AddressType, Document } from '@/types/api/map';
import { pick } from '@/utils/map';
import { useCallback, useEffect, useState } from 'react';
import Input from '../Common/Input';
import { InputType } from '@/types/common/input';
import Dropdown, { DropdownModal } from '../Common/Dropdown';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { country, gender, phone } from '@/constants/information';
import RadioButton from '../Information/RadioButton';
import { Gender } from '@/types/api/users';
import InputLayout from '../Document/write/InputLayout';
import { isNotEmpty, propertyToString } from '../../utils/document';
import Notice from '../Document/write/Notice';
import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import SearchSchoolBottomSheet from '../Document/write/SearchSchoolBottomSheet';
import SignaturePad from '@/components/Document/write/SignaturePad';
import BottomButtonPanel from '../Common/BottomButtonPanel';
import Button from '../Common/Button';
import { usePostIntegratedApplicants } from '@/hooks/api/useDocument';
import { formatPhoneNumber } from '@/utils/information';

type IntegratedApplicationFormProps = {
  document?: IntegratedApplicationData;
  isEdit: boolean;
};

const IntegratedApplicationWriteForm = ({
  document,
  isEdit,
}: IntegratedApplicationFormProps) => {
  const [newDocumentData, setNewDocumentData] =
    useState<IntegratedApplicationData>(initialIntegratedApplication);

  // 세 부분으로 나누어 입력받는 방식을 위해 전화번호만 별도의 state로 분리, 추후 유효성 검사 단에서 통합
  const [phoneNum, setPhoneNum] = useState({
    start: '',
    middle: '',
    end: '',
  });
  const [cellPhoneNum, setCellPhoneNum] = useState({
    start: '',
    middle: '',
    end: '',
  });
  const [schoolPhoneNum, setSchoolPhoneNum] = useState({
    start: '',
    middle: '',
    end: '',
  });
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
  // 학교 선택 모달 출현 여부 관리 state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 현재 좌표 기준 주소 획득
  const { data, isSuccess } = useGetGeoInfo(setCurrentGeoInfo);
  // 키워드로 주소 검색
  const { searchAddress } = useSearchAddress({
    onSuccess: (data) => setAddressSearchResult(data),
  });
  const { mutate: postDocument } = usePostIntegratedApplicants(); // 통합신청서 생성 훅
  const { mutate: updateDocument } = usePostIntegratedApplicants(); // 통합신청서 수정 훅
  // 문서 편집일 시 페이지 진입과 동시에 기존 내용 자동 입력
  useEffect(() => {
    if (isEdit && document) {
      setNewDocumentData(document);
    }
  }, [document, isEdit]);
  // 첫 로딩 시 현재 사용자의 위치 파악 해 지도에 표기
  useEffect(() => {
    setNewDocumentData({
      ...newDocumentData,
      address: {
        ...newDocumentData.address,
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
    setNewDocumentData({
      ...newDocumentData,
      address: {
        ...newDocumentData.address,
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

  // 문서 작성 완료 핸들러 함수
  const handleNext = () => {
    const finalDocument = {
      ...newDocumentData,
      birth: newDocumentData.birth.replace(/\//g, '.'),
      tele_phone_number: formatPhoneNumber(phoneNum),
      cell_phone_number: formatPhoneNumber(cellPhoneNum),
      school_phone_number: formatPhoneNumber(schoolPhoneNum),
    };
    const payload = {
      id: 1,
      document: finalDocument, // TODO: 로그인 연결 후 userId를 넣어야 하는 것으로 추정
    };

    if (isEdit) {
      updateDocument(payload);
      return;
    }
    postDocument(payload);
  };
  return (
    <div className="w-full p-6 flex flex-col">
      <div className="[&>*:last-child]:mb-40 flex flex-col gap-4">
        {/* 이름 입력 */}
        <InputLayout title="First Name" isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="First Name"
            value={newDocumentData.first_name}
            onChange={(value) =>
              setNewDocumentData({ ...newDocumentData, first_name: value })
            }
            canDelete={false}
          />
        </InputLayout>
        {/* 성 입력 */}
        <InputLayout title="Last Name" isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="Last Name"
            value={newDocumentData.last_name}
            onChange={(value) =>
              setNewDocumentData({ ...newDocumentData, last_name: value })
            }
            canDelete={false}
          />
        </InputLayout>
        {/* 생일 입력 */}
        <InputLayout title="Date Of Birth" isEssential>
          <Dropdown
            value={newDocumentData.birth}
            placeholder="Select Date"
            options={[]}
            isCalendar={true}
            setValue={(value) =>
              setNewDocumentData({ ...newDocumentData, birth: value })
            }
          />
        </InputLayout>
        {/* 성별 입력 */}
        <InputLayout title="Gender" isEssential>
          <div className="w-full flex flex-row gap-[1.75rem]">
            {gender.map((gender) => (
              <RadioButton
                value={gender}
                setValue={(value: string) =>
                  setNewDocumentData({
                    ...newDocumentData,
                    gender: value.toUpperCase() as Gender,
                  })
                }
                isOn={gender.toUpperCase() === newDocumentData.gender}
              />
            ))}
          </div>
        </InputLayout>
        {/* 국적 입력 */}
        <InputLayout title="Nationality" isEssential>
          <Dropdown
            value={propertyToString(newDocumentData.nationality)}
            placeholder="Select Nationality"
            options={country} // TODO: 국가명 데이터 받으면 교체해야 함.
            setValue={(value: string) =>
              setNewDocumentData({
                ...newDocumentData,
                nationality: value,
              })
            }
          />
        </InputLayout>
        {/* 서류 출력 후 작성 정보 입력 안내 */}
        <div className="w-full relative flex flex-col gap-7 items-start justify-center py-7 text-left body-3 text-[#1e1926]">
          <Notice
            title="Foreign Resident Registration No."
            content="As personal identification information, please print out the file after completing the standard labor contract and write it."
          />
          <Notice
            title="Passport number, passport issuance date, passport expiration date"
            content="As personal identification information, please print out the file after completing the standard labor contract and write it."
          />
        </div>
        <div className="w-full flex flex-col gap-[1.125rem]">
          {/* 주소 검색 입력 input */}
          <InputLayout title="Address in Korea" isEssential>
            <Input
              inputType={InputType.SEARCH}
              placeholder="Search Your Address"
              value={addressInput}
              onChange={(value) => handleAddressSearch(value)}
              canDelete={false}
            />
            {/* 주소 검색 결과 보여주는 dropdown modal */}
            {addressSearchResult && addressSearchResult.length !== 0 && (
              <DropdownModal
                value={newDocumentData.address.address_name}
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
          <InputLayout title="Detailed Address" isEssential>
            <Input
              inputType={InputType.TEXT}
              placeholder="ex) 101-dong"
              value={newDocumentData.address.address_detail}
              onChange={(value) =>
                setNewDocumentData({
                  ...newDocumentData,
                  address: {
                    ...newDocumentData.address,
                    address_detail: value,
                  },
                })
              }
              canDelete={false}
            />
          </InputLayout>
        </div>
        {/* 전화번호 선택, dropdown으로 앞 번호를, 중간 번호와 뒷 번호는 각각 input으로 입력 받음 */}
        <InputLayout title="Telephone No." isEssential>
          <div className="w-full flex flex-row gap-2 justify-between">
            <div className="w-full h-[2.75rem]">
              <Dropdown
                value={phoneNum.start}
                placeholder="+82"
                options={phone}
                setValue={(value) => setPhoneNum({ ...phoneNum, start: value })}
              />
            </div>
            <Input
              inputType={InputType.TEXT}
              placeholder="0000"
              value={phoneNum.middle}
              onChange={(value) => setPhoneNum({ ...phoneNum, middle: value })}
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
        {/* 개인 휴대폰 번호 입력 */}
        <InputLayout title="Cell Phone No." isEssential>
          <div className="w-full flex flex-row gap-2 justify-between">
            <div className="w-full h-[2.75rem]">
              <Dropdown
                value={cellPhoneNum.start}
                placeholder="+82"
                options={phone}
                setValue={(value) =>
                  setCellPhoneNum({ ...cellPhoneNum, start: value })
                }
              />
            </div>
            <Input
              inputType={InputType.TEXT}
              placeholder="0000"
              value={cellPhoneNum.middle}
              onChange={(value) =>
                setCellPhoneNum({ ...cellPhoneNum, middle: value })
              }
              canDelete={false}
            />
            <Input
              inputType={InputType.TEXT}
              placeholder="0000"
              value={cellPhoneNum.end}
              onChange={(value) =>
                setCellPhoneNum({ ...cellPhoneNum, end: value })
              }
              canDelete={false}
            />
          </div>
        </InputLayout>
        {/* 서류 출력 후 작성 정보 입력 안내 */}
        <div className="w-full relative flex flex-col gap-7 items-start justify-center py-7 text-left body-3 text-[#1e1926]">
          <Notice
            title="Address, Phone Number, in Home Country"
            content="As personal identification information, please print out the file after completing the standard labor contract and write it."
          />
        </div>
        {/* 대학 종류 선택 */}
        <InputLayout title="Type Of Name" isEssential>
          <div className="w-full relative body-3 text-[#bdbdbd] text-left">
            University is an education office accredited school.
          </div>
          <div className="w-full relative flex flex-col items-start justify-center px-1 py-1.5 gap-3 text-left text-[#656565]">
            <RadioButton
              value="Accredited by Eduvation Office"
              setValue={() =>
                setNewDocumentData({ ...newDocumentData, is_accredited: true })
              }
              isOn={newDocumentData.is_accredited}
            />
            <RadioButton
              value="Non-accredited, Alternative School"
              setValue={() =>
                setNewDocumentData({ ...newDocumentData, is_accredited: false })
              }
              isOn={!newDocumentData.is_accredited}
            />
          </div>
        </InputLayout>
        {/* 학교 이름 입력 */}
        <InputLayout title="Name Of School" isEssential>
          <div onClick={() => setIsModalOpen(true)}>
            <Input
              inputType={InputType.SEARCH}
              placeholder="Name of School"
              value={newDocumentData.school_name}
              onChange={() => {}}
              canDelete={false}
            />
          </div>
        </InputLayout>
        {/* 대학 번호 입력 */}
        <InputLayout title="Phone Number of School" isEssential>
          <div className="w-full flex flex-row gap-2 justify-between">
            <div className="w-full h-[2.75rem]">
              <Dropdown
                value={schoolPhoneNum.start}
                placeholder="+82"
                options={phone}
                setValue={(value) =>
                  setSchoolPhoneNum({ ...schoolPhoneNum, start: value })
                }
              />
            </div>
            <Input
              inputType={InputType.TEXT}
              placeholder="0000"
              value={schoolPhoneNum.middle}
              onChange={(value) =>
                setSchoolPhoneNum({ ...schoolPhoneNum, middle: value })
              }
              canDelete={false}
            />
            <Input
              inputType={InputType.TEXT}
              placeholder="0000"
              value={schoolPhoneNum.end}
              onChange={(value) =>
                setSchoolPhoneNum({ ...schoolPhoneNum, end: value })
              }
              canDelete={false}
            />
          </div>
        </InputLayout>
        {/* 서류 출력 후 작성 정보 입력 안내 */}
        <div className="w-full relative flex flex-col gap-7 items-start justify-center py-7 text-left body-3 text-[#1e1926]">
          <Notice
            title="Current Workplace Of Name, Business Registration No, Phone Number"
            content="As personal identification information, please print out the file after completing the standard labor contract and write it."
          />
        </div>
        {/* 근무 장소 이름 입력 */}
        <InputLayout title="New Workplace" isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="New Workplace Name"
            value={newDocumentData.new_work_place_name}
            onChange={(value) =>
              setNewDocumentData({
                ...newDocumentData,
                new_work_place_name: value,
              })
            }
            canDelete={false}
          />
        </InputLayout>
        {/* 사업등록번호 입력 */}
        <InputLayout
          title="Business Registration No. Of New Workplace"
          isEssential
        >
          <Input
            inputType={InputType.TEXT}
            placeholder="Business Registration No."
            value={newDocumentData.new_work_place_registration_number}
            onChange={(value) =>
              setNewDocumentData({
                ...newDocumentData,
                new_work_place_registration_number: value,
              })
            }
            canDelete={false}
          />
        </InputLayout>
        {/* 연봉 입력 */}
        <InputLayout title="Annual Income Amount" isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="0"
            value={String(newDocumentData.annual_income_amount)}
            onChange={(value) =>
              setNewDocumentData({
                ...newDocumentData,
                annual_income_amount: Number(value),
              })
            }
            canDelete={false}
          />
        </InputLayout>
        {/* 직업 입력 */}
        <InputLayout title="Occupation" isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="Occupation"
            value={newDocumentData.occupation}
            onChange={(value) =>
              setNewDocumentData({
                ...newDocumentData,
                occupation: value,
              })
            }
            canDelete={false}
          />
        </InputLayout>
        {/* 이메일 입력 */}
        <InputLayout title="Email" isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="Email"
            value={newDocumentData.email}
            onChange={(value) =>
              setNewDocumentData({ ...newDocumentData, email: value })
            }
            canDelete={false}
          />
        </InputLayout>
        {/* 하이코리아 작성 정보 입력 안내 */}
        <div className="w-full relative flex flex-col gap-7 items-start justify-center py-7 text-left body-3 text-[#1e1926]">
          <Notice
            title="Date of apllication"
            content="Please fill it out on the application date for Hi Korea documents."
            notWarning
          />
        </div>
        {/* 서명 입력 */}
        <InputLayout title="Applicant Signature" isEssential>
          <SignaturePad
            onSave={(signature: string) =>
              setNewDocumentData({
                ...newDocumentData,
                signature_base64: signature,
              })
            }
            onReset={() =>
              setNewDocumentData({
                ...newDocumentData,
                signature_base64: '',
              })
            }
          />
        </InputLayout>
        {/* 서류 출력 후 작성 정보(부모님) 입력 안내 */}
        <div className="w-full relative flex flex-col gap-7 items-start justify-center py-7 text-left body-3 text-[#1e1926]">
          <Notice
            title="Spouse of applicant Signature"
            content="As personal identification information, please print out the file after completing the standard labor contract and write it."
          />
          <Notice
            title="Father/Mother of applicant"
            content="As personal identification information, please print out the file after completing the standard labor contract and write it."
          />
        </div>
      </div>
      {isModalOpen && (
        <BottomSheetLayout
          hasHandlebar
          isAvailableHidden={true}
          isShowBottomsheet={isModalOpen}
          setIsShowBottomSheet={setIsModalOpen}
        >
          <SearchSchoolBottomSheet
            newDocumentData={newDocumentData}
            setNewDocumentData={setNewDocumentData}
            onClose={() => setIsModalOpen(false)}
          />
        </BottomSheetLayout>
      )}
      <BottomButtonPanel>
        {/* 입력된 정보 중 빈 칸이 없다면 활성화 */}
        {isNotEmpty(newDocumentData) &&
        isNotEmpty(phoneNum) &&
        isNotEmpty(cellPhoneNum) &&
        isNotEmpty(schoolPhoneNum) ? (
          <Button
            type="large"
            bgColor="bg-[#fef387]"
            fontColor="text-[#222]"
            isBorder={false}
            title={isEdit ? 'Modify' : 'Create'}
            onClick={handleNext}
          />
        ) : (
          <Button
            type="large"
            bgColor="bg-[#F4F4F9]"
            fontColor=""
            isBorder={false}
            title={isEdit ? 'Modify' : 'Create'}
          />
        )}
      </BottomButtonPanel>
    </div>
  );
};

export default IntegratedApplicationWriteForm;
