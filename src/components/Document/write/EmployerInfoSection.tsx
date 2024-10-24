import { PartTimeEmployPermitEmployerInfo } from '@/constants/documents';
import {
  EmployerInfoProperty,
  EmployerInformation,
} from '@/types/api/document';
import { Address } from '@/types/api/users';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const renderMap = (address: Address) => {
  return (
    <>
      <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex flex-col items-center justify-start py-2.5 pr-3.5 pl-4">
        <div className="w-full flex-1 relative">{address.address_name}</div>
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

const EmployerInfoSection = ({ employ }: { employ: EmployerInformation }) => {
  return (
    <div className="w-full relative rounded-3xl flex flex-col items center justify-center px-6 py-3 text-left body-3 text-[#1e1926] bg-[#f4f4f9]">
      <div className="w-full self-stretch flex flex-col items-center jusitfy-center">
        <div className="w-full self-stretch flex flex-col items-center justify-start">
          {Object.entries(employ).map(([key, value]) => (
            <>
              <div className="w-full self-stretch flex flex-col text-left items-center justify-start px-1 py-1.5">
                <div className="w-full flex-1 flex flex-col items-start justify-start">
                  <div className="w-full self-stretch flex items-center justify-start">
                    <div className="w-full relative">
                      {
                        PartTimeEmployPermitEmployerInfo[
                          key as EmployerInfoProperty
                        ].name
                      }
                    </div>
                  </div>
                </div>
                {/* .textfield1 */}
                {key !== 'address' && (
                  <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
                    <div className="w-full flex-1 relative">
                      {value as string}
                    </div>
                  </div>
                )}
                {key === 'address' && renderMap(value as Address)}
              </div>
              {key === 'address' && (
                <div className="w-full self-stretch flex flex-col text-left items-center justify-start px-1 py-1.5">
                  <div className="w-full flex-1 flex flex-col items-start justify-start">
                    <div className="w-full self-stretch flex items-center justify-start">
                      <div className="w-full relative">
                        Detailed Address
                      </div>
                    </div>
                  </div>
                  {/* .textfield1 */}
                  {key === 'address' && (
                    <div className="w-full self-stretch drop-shadow-[0_1px_2px_rgba(107,110,116,0.04)] rounded-xl flex items-center justify-start py-2.5 pr-3.5 pl-4">
                      <div className="w-full flex-1 relative">
                        {typeof value !== 'string' && value.address_detail as string}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerInfoSection;
