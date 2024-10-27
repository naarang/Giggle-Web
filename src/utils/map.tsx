import { Address } from '@/types/api/users';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

/**
 * 객체에서 지정된 속성들만 선택하여 새 객체를 반환하는 함수
 * @param obj 원본 객체
 * @param keys 선택할 속성들의 배열
 * @returns 선택된 속성들로 이루어진 새 객체
 */
export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> =>
  keys.reduce(
    (result, key) => {
      if (key in obj) {
        result[key] = obj[key];
      }
      return result;
    },
    {} as Pick<T, K>,
  );

// 입력된 주소지 지도로 렌더링하는 함수
export const renderMap = (address: Address) => {
  return (
    <>
      <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex flex-col items-center justify-start py-2.5 pr-3.5 pl-4">
        <div className="w-full flex-1 relative body-2">
          {address.address_name}
        </div>
      </div>
      <div className="w-full rounded-xl">
        <Map
          center={{
            lat: Number(address.latitude),
            lng: Number(address.longitude),
          }}
          style={{ width: '100%', height: '200px' }}
          className="rounded-xl"
        >
          <MapMarker
            position={{
              lat: Number(address.latitude),
              lng: Number(address.longitude),
            }}
          ></MapMarker>
        </Map>
      </div>
    </>
  );
};
