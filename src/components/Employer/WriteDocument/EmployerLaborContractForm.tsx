import Dropdown, { DropdownModal } from '@/components/Common/Dropdown';
import Input from '@/components/Common/Input';
import InputLayout from '@/components/WorkExperience/InputLayout';
import {
  DAYS,
  initialLaborContractEmployerInfo,
  INSURANCES,
} from '@/constants/documents';
import { useGetGeoInfo, useSearchAddress } from '@/hooks/api/useKaKaoMap';
import {
  DayOfWeek,
  Insurance,
  LaborContractDataResponse,
  LaborContractEmployerInfo,
  PaymentMethod,
  WorkDayTimeWithRest,
} from '@/types/api/document';
import { AddressType, Document } from '@/types/api/map';
import { InputType } from '@/types/common/input';
import { pick } from '@/utils/map';
import { useCallback, useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import SignaturePad from '@/components/Document/write/SignaturePad';
import { workDayTimeToString } from '@/utils/post';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import { usePutLaborContractEmployer } from '@/hooks/api/useDocument';
import { useParams } from 'react-router-dom';
import { parseStringToSafeNumber, validateLaborContractEmployerInformation } from '@/utils/document';
import { formatPhoneNumber, parsePhoneNumber } from '@/utils/information';
import { phone } from '@/constants/information';
import { formatDateToDash } from '@/utils/editResume';
import AddTimeIcon from '@/assets/icons/FileAddIcon.svg?react';
import WorkDayTimeWithRestBottomSheet from '@/components/Common/WorkDayTimeWithRestBottomSheet';
import RadioButton from '@/components/Information/RadioButton';
import CheckIcon from '@/assets/icons/CheckOfBoxIcon.svg?react';

type LaborContractFormProps = {
  document?: LaborContractDataResponse;
  isEdit: boolean;
};

const EmployerLaborContractForm = ({
  document,
  isEdit,
}: LaborContractFormProps) => {
  const { id } = useParams();
  const [newDocumentData, setNewDocumentData] =
    useState<LaborContractEmployerInfo>(initialLaborContractEmployerInfo);
  // 세 부분으로 나누어 입력받는 방식을 위해 전화번호만 별도의 state로 분리, 추후 유효성 검사 단에서 통합
  const [phoneNum, setPhoneNum] = useState({
    start: newDocumentData.phone_number
      ? parsePhoneNumber(newDocumentData.phone_number).start
      : '',
    middle: newDocumentData.company_registration_number
      ? parsePhoneNumber(newDocumentData.phone_number).middle
      : '',
    end: newDocumentData.company_registration_number
      ? parsePhoneNumber(newDocumentData.phone_number).end
      : '',
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
  const [isInvalid, setIsInvalid] = useState(false);
  // 근무시간, 요일 선택 모달 활성화 플래그
  const [isModal, setIsModal] = useState(false);
  const { data, isSuccess } = useGetGeoInfo(setCurrentGeoInfo); // 현재 좌표 기준 주소 획득
  // 키워드로 주소 검색
  const { searchAddress } = useSearchAddress({
    onSuccess: (data) => setAddressSearchResult(data),
  });
  // 입력 완료 시 제출
  const { mutate: putDocument } = usePutLaborContractEmployer(Number(id));
  useEffect(() => {
    if (isEdit && document?.employer_information)
      setNewDocumentData(document?.employer_information);
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

  /* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */
  useEffect(() => {
    setIsInvalid(
      !validateLaborContractEmployerInformation({
        ...newDocumentData,
        phone_number: formatPhoneNumber(phoneNum),
      }),
    );
  }, [newDocumentData, phoneNum]);

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

  // 주휴일 선택/선택 해제 핸들러
  const handleClickDayOfWeek = (day: DayOfWeek) => {
    if (newDocumentData.weekly_last_days.includes(day)) {
      setNewDocumentData({
        ...newDocumentData,
        weekly_last_days: [
          ...newDocumentData.weekly_last_days.filter((value) => value !== day),
        ],
      });
    } else {
      setNewDocumentData({
        ...newDocumentData,
        weekly_last_days: [...newDocumentData.weekly_last_days, day],
      });
    }
  };


  return (
    <div className="w-full p-6 flex flex-col">
      <div className="[&>*:last-child]:mb-40 flex flex-col gap-4">
        {/* 회사/점포명 입력 */}
        <InputLayout title="회사/점포명" isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="회사/점포명을 작성해주세요"
            value={newDocumentData.company_name}
            onChange={(value) =>
              setNewDocumentData({
                ...newDocumentData,
                company_name: value,
              })
            }
            canDelete={false}
          />
        </InputLayout>
        {/* 사업자등록번호 입력 */}
        <InputLayout title="사업자등록번호 " isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="회사/점포명을 작성해주세요"
            value={newDocumentData.company_registration_number}
            onChange={(value) =>
              setNewDocumentData({
                ...newDocumentData,
                company_registration_number: String(
                  parseStringToSafeNumber(value),
                ),
              })
            }
            canDelete={false}
          />
        </InputLayout>
        {/* 사업체 전화 번호 입력 */}
        <InputLayout title="사업체 전화번호" isEssential>
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
        {/* 근무 시작일 선택 입력 */}
        <InputLayout title="근무 시작일" isEssential>
          <Dropdown
            value={
              newDocumentData.start_date === null
                ? ''
                : newDocumentData.start_date
            }
            placeholder="날짜선택"
            options={[]}
            isCalendar={true}
            setValue={(value) =>
              setNewDocumentData({
                ...newDocumentData,
                start_date: formatDateToDash(value),
              })
            }
          />
        </InputLayout>
        {/* 근무 종료일 선택 입력 */}
        <InputLayout title="근무 종료일" isEssential>
          <Dropdown
            value={
              newDocumentData.end_date === null ? '' : newDocumentData.end_date
            }
            placeholder="날짜선택"
            options={[]}
            isCalendar={true}
            setValue={(value) =>
              setNewDocumentData({
                ...newDocumentData,
                end_date: formatDateToDash(value),
              })
            }
          />
        </InputLayout>
        {/* 대표자 이름 입력 */}
        <InputLayout title="대표자 이름" isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="이름을 작성해주세요"
            value={newDocumentData.name}
            onChange={(value) =>
              setNewDocumentData({
                ...newDocumentData,
                name: value,
              })
            }
            canDelete={false}
          />
        </InputLayout>
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
          <InputLayout title="상세주소" isEssential={false}>
            <Input
              inputType={InputType.TEXT}
              placeholder="ex) 101동"
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
        {/* 상세요강 입력 */}
        <InputLayout title="업무의 내용" isEssential>
          <div className="w-full self-stretch flex flex-col items-center justify-start body-3">
            <div className="w-full flex flex-col items-start justify-start">
              <div className="w-full flex flex-col items-center justify-start">
                <textarea
                  className="w-full h-[10vh] px-[1rem] py-[0.75rem] border border-[#E2E5EB] rounded-[0.75rem] body-2 outline-none resize-none"
                  placeholder="업무의 내용을 작성해주세요"
                  value={newDocumentData.description}
                  maxLength={100}
                  onChange={(e) =>
                    setNewDocumentData({
                      ...newDocumentData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </InputLayout>
        {/* 근로일 및 근로일별 근로 시간 선택 */}
        <InputLayout title="근무 시간" isEssential>
          <div className="w-full relative body-3 px-1 pb-1.5 text-[#222] text-left">
            원하는 근무 시간을 추가해주세요.
          </div>
          <div className="w-full h-8">
            <div className="w-full h-full overflow-x-auto flex items-center gap-2">
              {newDocumentData.work_day_time_list.length > 0 &&
                newDocumentData.work_day_time_list.map((workdaytime, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0"
                    style={{ width: '124px' }}
                  >
                    <div className="w-full h-6 flex items-center justify-center px-3 py-1 bg-[#FEF387] button-2 rounded-[1.125rem] whitespace-nowrap">
                      {workDayTimeToString(workdaytime)}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div
            className="w-full flex gap-2 items-center justify-center text-left body-2 border rounded-xl shadow-sm border-[#eae9f6] [--input-color:#bdbdbd] bg-white py-[10px] pl-4 pr-[14px]"
            onClick={() => setIsModal(true)}
          >
            <AddTimeIcon />
          </div>
        </InputLayout>
        {/* 매주 주휴일 선택 */}
        <InputLayout title="매주 주휴일" isEssential>
          <div className="w-full relative body-3 px-1 pb-1.5 text-[#222] text-left">
            다중 선택 가능합니다.
          </div>
          <div className="flex flex-wrap gap-[0.5rem] w-full">
            {Object.keys(DAYS).map((value, index) => (
              <button
                className={`py-[0.375rem] px-[0.875rem] body-3 border border-[#EFEFEF] rounded-[1.125rem] ${newDocumentData.weekly_last_days.includes(Object.values(DAYS)[index] as DayOfWeek) ? 'bg-[#FEF387]' : 'bg-white'}`}
                key={`${value}_${index}`}
                onClick={() =>
                  handleClickDayOfWeek(Object.values(DAYS)[index] as DayOfWeek)
                }
              >
                {value}
              </button>
            ))}
          </div>
        </InputLayout>
        {/* 시급 입력 */}
        <InputLayout title="시급" isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="시급을 입력해주세요"
            value={String(newDocumentData.hourly_rate)}
            onChange={(value) =>
              setNewDocumentData({
                ...newDocumentData,
                hourly_rate: parseStringToSafeNumber(value),
              })
            }
            canDelete={false}
            isUnit
            unit="원"
          />
        </InputLayout>
        {/* 상여급 입력 */}
        <InputLayout title="상여급" isEssential>
          <div className="w-full flex flex-row gap-[1.75rem]">
            <RadioButton
              value="있음"
              setValue={() =>
                setNewDocumentData({ ...newDocumentData, bonus: 0 })
              }
              isOn={newDocumentData.bonus !== null}
            />
            <RadioButton
              value="없음"
              setValue={() =>
                setNewDocumentData({ ...newDocumentData, bonus: null })
              }
              isOn={newDocumentData.bonus === null}
            />
          </div>
          {newDocumentData.bonus !== null && (
            <div className="w-full mt-2.5">
              <Input
                inputType={InputType.TEXT}
                placeholder="0"
                value={String(newDocumentData.bonus)}
                onChange={(value) =>
                  setNewDocumentData({
                    ...newDocumentData,
                    bonus: parseStringToSafeNumber(value),
                  })
                }
                canDelete={false}
                isUnit
                unit="원"
              />
            </div>
          )}
        </InputLayout>
        {/* 기타급여(제수당 등) 입력 */}
        <InputLayout title="기타급여 (제수당 등)" isEssential>
          <div className="w-full flex flex-row gap-[1.75rem]">
            <RadioButton
              value="있음"
              setValue={() =>
                setNewDocumentData({ ...newDocumentData, additional_salary: 0 })
              }
              isOn={newDocumentData.additional_salary !== null}
            />
            <RadioButton
              value="없음"
              setValue={() =>
                setNewDocumentData({
                  ...newDocumentData,
                  additional_salary: null,
                })
              }
              isOn={newDocumentData.additional_salary === null}
            />
          </div>
          {newDocumentData.additional_salary !== null && (
            <div className="w-full mt-2.5">
              <Input
                inputType={InputType.TEXT}
                placeholder="0"
                value={String(newDocumentData.additional_salary)}
                onChange={(value) =>
                  setNewDocumentData({
                    ...newDocumentData,
                    additional_salary: parseStringToSafeNumber(value),
                  })
                }
                canDelete={false}
                isUnit
                unit="원"
              />
            </div>
          )}
        </InputLayout>
        {/* 초과근로에 대한 가산임금률 입력 */}
        <InputLayout title="초과근로에 대한 가산임금률" isEssential>
          <div className="w-full relative body-3 px-1 pb-1.5 text-[#222] text-left">
            {
              "단시간근로자와 사용자 사이에 근로하기로 정한 시간을 초과하여 근로하면 법정근로시간 내라도 통상임금의 100분의 50% 이상의 가산임금 지급('14.9.19 시행)"
            }
          </div>
          <Input
            inputType={InputType.TEXT}
            placeholder="0"
            value={String(newDocumentData.wage_rate)}
            onChange={(value) =>
              setNewDocumentData({
                ...newDocumentData,
                wage_rate: parseStringToSafeNumber(value),
              })
            }
            canDelete={false}
            isUnit
            unit="%"
          />
        </InputLayout>
        {/* 임금 지급일 입력 */}
        <InputLayout title="임금 지급일" isEssential>
          <Input
            inputType={InputType.TEXT}
            placeholder="0"
            value={String(newDocumentData.payment_day)}
            onChange={(value) =>
              setNewDocumentData({
                ...newDocumentData,
                payment_day: parseStringToSafeNumber(value),
              })
            }
            canDelete={false}
            isPrefix
            prefix="매월"
            isUnit
            unit="일"
          />
        </InputLayout>
        {/* 임금 지급방법 입력 */}
        <InputLayout title="임금 지급방법" isEssential>
          <div className="w-full flex flex-row gap-[1.75rem]">
            <RadioButton
              value="근로자에게 직접지급"
              setValue={() =>
                setNewDocumentData({
                  ...newDocumentData,
                  payment_method: PaymentMethod.DIRECT,
                })
              }
              isOn={newDocumentData.payment_method === PaymentMethod.DIRECT}
            />
            <RadioButton
              value="근로자 명의 예금통장에 입금"
              setValue={() =>
                setNewDocumentData({
                  ...newDocumentData,
                  payment_method: PaymentMethod.BANK_TRANSFER,
                })
              }
              isOn={
                newDocumentData.payment_method === PaymentMethod.BANK_TRANSFER
              }
            />
          </div>
        </InputLayout>
        {/* 사회보험 적용 여부 입력 */}
        <InputLayout
          title="사회보험 적용 여부 (해당란에 모두 체크)"
          isEssential
        >
          <div className="w-full flex">
            {Object.keys(INSURANCES).map((value, index) => (
              <div
                className="w-full relative flex items-center justify-start py-2 gap-2 text-left body-3 text-[#656565]"
                key={`${value}_${index}`}
              >
                <div className="w-6 h-6 relative">
                  <div
                    className={`w-full h-full border border-[#f4f4f9] flex items-center justify-center ${newDocumentData.insurance.includes(value as Insurance) ? 'bg-[#1E1926]' : 'bg-white'}`}
                    onClick={() => {
                      const newInsurance = newDocumentData.insurance.includes(
                        value as Insurance,
                      )
                        ? newDocumentData.insurance.filter(
                            (insurance) => insurance !== value,
                          )
                        : [...newDocumentData.insurance, value];

                      setNewDocumentData({
                        ...newDocumentData,
                        insurance: newInsurance as Insurance[],
                      });
                    }}
                  >
                    <CheckIcon />
                  </div>
                </div>
                <div className="flex items-start justify-start">{value}</div>
              </div>
            ))}
          </div>
        </InputLayout>
        {/* 서명 입력 */}
        <InputLayout title="서명" isEssential>
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
      </div>
      <BottomButtonPanel>
        {/* 정보 입력 시마다 유효성을 검사해 모든 값이 유효하면 버튼이 활성화 */}
        <Button
          type="large"
          bgColor={isInvalid ? 'bg-[#F4F4F9]' : 'bg-[#fef387]'}
          fontColor={isInvalid ? '' : 'text-[#222]'}
          isBorder={false}
          title="완료"
          onClick={
            isInvalid
              ? undefined
              : () =>
                  putDocument({
                    id: Number(id),
                    document: {
                      ...newDocumentData,
                      phone_number: formatPhoneNumber(phoneNum),
                    },
                  })
          }
        />
      </BottomButtonPanel>
      {isModal && (
        <WorkDayTimeWithRestBottomSheet
          onClose={(value: WorkDayTimeWithRest[]) => {
            setNewDocumentData({
              ...newDocumentData,
              work_day_time_list: value,
            });
            setIsModal(false);
          }}
          isShowBottomsheet={isModal}
        />
      )}
    </div>
  );
};

export default EmployerLaborContractForm;
