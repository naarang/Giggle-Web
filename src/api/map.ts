import { Document, GeoPosition } from '@/types/api/map';
import { apiKaKao } from '.';
import { Dispatch, SetStateAction } from 'react';

export const getGeoInfo = (
  setCurrentPosition: Dispatch<SetStateAction<GeoPosition>>,
): Promise<Document> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          try {
            const response = await apiKaKao.get(
              `geo/coord2address.json?x=${position.coords.longitude}&y=${position.coords.latitude}`,
            );
            if (response.data.documents && response.data.documents.length > 0) {
              resolve(response.data.documents[0]);
            } else {
              reject(new Error('No location data found'));
            }
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        },
      );
    }
  });
};

export const searchAddress = async (input: string): Promise<Document[]> => {
  const response = await apiKaKao.get(
    `search/address.json?query=${input}&size=3`,
  );
  return response.data.documents;
};
