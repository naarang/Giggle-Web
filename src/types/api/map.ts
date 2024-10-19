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

export type GeoApiResponse = {
  documents: GeoDocument[];
};

export type GeoPosition = {
  lon: number;
  lat: number;
};
