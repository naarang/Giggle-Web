/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import { InputType } from '@/types/common/input';
import Input from '@/components/Common/Input';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { documentTranslation } from '@/constants/translation';
import DaumPostcodeEmbed from 'react-daum-postcode';
import type { Address } from 'react-daum-postcode';
import { convertToAddress, getAddressCoords } from '@/utils/map';
import { useState } from 'react';
import { GiggleAddress } from '@/types/api/users';

interface AddressInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  placeholder: string;
  label?: string;
}

const AddressInput = <T extends FieldValues>({
  name,
  placeholder,
  label = 'Detailed Address',
}: AddressInputProps<T>) => {
  const [isAddressSearch, setIsAddressSearch] = useState<boolean>(false);
  const { control } = useFormContext<T>();
  return (
    <>
      {isAddressSearch ? (
        <div className="w-full h-screen fixed inset-0 bg-white z-20">
          <Controller
            control={control}
            name={name as FieldPath<T>}
            render={({ field: { onChange } }) => (
              <DaumPostcodeEmbed
                style={{
                  position: 'absolute',
                  top: '50px',
                  width: '100%',
                  height: 'calc(100vh - 100px)',
                  marginTop: '3.125rem',
                  paddingBottom: '6.25rem',
                }}
                theme={{ pageBgColor: '#ffffff', bgColor: '#ffffff' }}
                onComplete={async (data: Address) => {
                  const convertedAddress = convertToAddress(data);
                  const coords = await getAddressCoords(
                    convertedAddress.address_name as string,
                  );

                  onChange({
                    ...convertedAddress,
                    longitude: coords.getLng(),
                    latitude: coords.getLat(),
                  });
                  setIsAddressSearch(false);
                }}
                onClose={() => setIsAddressSearch(false)}
              />
            )}
          />
        </div>
      ) : (
        <Controller
          control={control}
          name={name as FieldPath<T>}
          render={({ field: { value } }) => (
            <>
              <div onClick={() => setIsAddressSearch(true)}>
                <Input
                  inputType={InputType.TEXT}
                  placeholder={placeholder}
                  value={(value as GiggleAddress)?.address_name || ''}
                  onChange={() => {}}
                  canDelete={false}
                />
              </div>
              {(value as GiggleAddress)?.address_name && (
                <>
                  <div className="w-full rounded-xl mt-3">
                    <Map
                      center={{
                        lat: (value as GiggleAddress)?.latitude ?? 0,
                        lng: (value as GiggleAddress)?.longitude ?? 0,
                      }}
                      style={{ width: '100%', height: '200px' }}
                      className="rounded-xl"
                    >
                      <MapMarker
                        position={{
                          lat: (value as GiggleAddress)?.latitude ?? 0,
                          lng: (value as GiggleAddress)?.longitude ?? 0,
                        }}
                      ></MapMarker>
                    </Map>
                  </div>
                  <Controller
                    control={control}
                    name={`${name}.address_detail` as any}
                    render={({ field: detailField }) => (
                      <InputLayout title={label}>
                        <Input
                          inputType={InputType.TEXT}
                          placeholder="ex) 101-dong"
                          value={detailField.value || ''}
                          onChange={detailField.onChange}
                          canDelete={false}
                        />
                        {detailField.value && detailField.value.length > 50 && (
                          <p className="text-text-error text-xs p-2">
                            {documentTranslation.detailAddressTooLong.en}
                          </p>
                        )}
                      </InputLayout>
                    )}
                  />
                </>
              )}
            </>
          )}
        />
      )}
    </>
  );
};

export default AddressInput;
