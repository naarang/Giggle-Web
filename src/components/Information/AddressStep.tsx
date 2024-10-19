import { InputType } from '@/types/common/input';
import Input from '@/components/Common/Input';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import {
  Address,
  initialAddress,
  UserInfoRequestBody,
} from '@/types/api/users';
import { useEffect, useState } from 'react';
import BottomButtonPanel from '../Common/BottomButtonPanel';
import { useGetGeoInfo } from '@/hooks/api/useKaKaoMap';

const AddressStep = ({
  userInfo,
  onNext,
}: {
  userInfo: UserInfoRequestBody;
  onNext: (newInfo: UserInfoRequestBody) => void;
}) => {
  const [newAddress, setNewAddress] = useState<Address>(initialAddress);
  const [currentGeoInfo, setCurrentGeoInfo] = useState({
    lat: 0,
    lon: 0,
  });
  const { data, isSuccess } = useGetGeoInfo(setCurrentGeoInfo);
  useEffect(() => {
    if (isSuccess)
      setNewAddress({
        ...newAddress,
        address_name: data?.documents[0].address_name,
      });
  }, []);

  return (
    <div className="w-full mx-auto">
      <div className="w-full flex flex-col gap-[1.125rem]">
        <div className="w-full">
          <div className="w-full flex items-center justify-start text-xs font-[Pretendard] color-[#222] px-[0.25rem] py-[0.375rem]">
            Main Address
          </div>
          <Input
            inputType={InputType.SEARCH}
            placeholder="Search Your Address"
            value={newAddress.address_name}
            onChange={(value) =>
              setNewAddress({ ...newAddress, address_name: value })
            }
            canDelete={false}
          />
          {}
        </div>
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
      </div>
      <BottomButtonPanel>
        {newAddress.region_1depth_name !== undefined ? (
          <button className="w-[15rem] bg-[#F4F4F9]">Next</button>
        ) : (
          <button
            className="w-[15rem] bg-[#fef387]"
            onClick={() =>
              onNext({
                ...userInfo,
                address: newAddress,
              })
            }
          >
            Next
          </button>
        )}
      </BottomButtonPanel>
    </div>
  );
};

export default AddressStep;
