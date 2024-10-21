// 좌표로 주소 검색 시 사용되는 api 반환 양식
export type GeoDocument = {
  region_type: 'B' | 'H'; // 'B'와 'H'만 가능한 것으로 가정
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_4depth_name: string;
  code: string;
  x: number;
  y: number;
};

// 좌표로 주소 검색 시 사용되는 api 반환 양식
export type GeoApiResponse = {
  documents: GeoDocument[];
};

export type GeoPosition = {
  lon: number;
  lat: number;
};

// Document 타입에서 사용되는 주소 타입
export enum AddressType {
  REGION = 'REGION',
  ROAD = 'ROAD',
  REGION_ADDR = 'REGION_ADDR',
  ROAD_ADDR = 'ROAD_ADDR',
}

// Document 타입
export type Document = {
  address_name: string;
  address_type: AddressType;
  x: string;
  y: string;
  address: KaKaoAddress;
  road_address: KaKaoRoadAddress;
};

// 구 주소 타입
export type KaKaoAddress = {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_3depth_h_name?: string;
  h_code: string;
  b_code: string;
  mountain_yn: 'Y' | 'N';
  main_address_no: string;
  sub_address_no: string;
  zip_code?: string;
  x: string;
  y: string;
};

// 도로명 주소 타입
export type KaKaoRoadAddress = {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name?: string;
  underground_yn: 'Y' | 'N';
  main_building_no: string;
  sub_building_no: string;
  building_name: string;
  zone_no: string;
  x: string;
  y: string;
};

export type UseSearchAddressProps = {
  onSuccess?: (data: Document[]) => void;
  onError?: (error: unknown) => void;
};
