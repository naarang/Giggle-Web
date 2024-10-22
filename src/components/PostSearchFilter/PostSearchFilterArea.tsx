import BaseHeader from '@/components/Common/Header/BaseHeader';
import PostSearchFilterSelect from '@/components/PostSearchFilter/PostSearchFilterAreaSelect';
import { useState } from 'react';
import BottomSheetLayout from '@/components/Common/BottomSheetLayout';

type RegionDataType = {
  [key: string]: {
    [key: string]: string[];
  };
};

// 더미데이터
const REGION_DATA: RegionDataType = {
  Seoul: {
    Gyeonggi: ['성남', '분당', '강남'],
    Inchon: ['연수구', '계양구'],
  },
  Busan: {
    Dong: ['동래구', '해운대구'],
    Suyeong: ['수영구', '광안리'],
  },
  Daegu: {
    Suseong: ['수성구', '달서구'],
    Dalseo: ['달성군', '달서군'],
  },
};

type PostSearchFilterAreaType = {
  setIsOpenAreaFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostSearchFilterArea = ({
  setIsOpenAreaFilter,
}: PostSearchFilterAreaType) => {
  const [region1Depth, setRegion1Depth] = useState<string | null>(null);
  const [region2Depth, setRegion2Depth] = useState<string | null>(null);
  const [region3Depth, setRegion3Depth] = useState<string | null>(null);

  const [region2DepthData, setRegion2DepthData] = useState<string[]>([]);
  const [region3DepthData, setRegion3DepthData] = useState<string[]>([]);

  const onClickBackButton = () => {
    setIsOpenAreaFilter(false);
  };

  const onSelectRegion1Depth = (region: string) => {
    setRegion1Depth(region);
    setRegion2Depth(null);
    setRegion3Depth(null);

    const isValidRegionData = REGION_DATA[region];
    if (isValidRegionData) {
      setRegion2DepthData(Object.keys(isValidRegionData));
    } else {
      setRegion2DepthData([]);
    }
    setRegion3DepthData([]);
  };

  const onSelectRegion2Depth = (region: string) => {
    if (!region1Depth) return;
    setRegion2Depth(region);
    setRegion3Depth(null);

    const isValidRegionData = REGION_DATA[region1Depth];
    if (isValidRegionData && isValidRegionData[region]) {
      setRegion3DepthData(isValidRegionData[region]);
    } else {
      setRegion3DepthData([]);
    }
  };

  const onSelectRegion3Depth = (region: string) => {
    if (!region1Depth || !region2Depth) return;
    setRegion3Depth(region);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <BaseHeader
          hasBackButton={true}
          onClickBackButton={onClickBackButton}
          hasMenuButton={false}
          title="Area"
        />
        <section className="flex-1 flex w-full">
          <PostSearchFilterSelect
            selectedRegion={region1Depth}
            onSelect={onSelectRegion1Depth}
            regionData={Object.keys(REGION_DATA)}
          />
          <PostSearchFilterSelect
            selectedRegion={region2Depth}
            onSelect={onSelectRegion2Depth}
            regionData={region2DepthData}
          />
          <PostSearchFilterSelect
            selectedRegion={region3Depth}
            onSelect={onSelectRegion3Depth}
            regionData={region3DepthData}
          />
        </section>
      </div>
      <BottomSheetLayout
        hasHandlebar={false}
        isAvailableHidden={false}
        isShowBottomsheet={true}
      >
        <div>앙야야ㅑ양</div>
        <div>앙야야ㅑ양</div>
      </BottomSheetLayout>
    </>
  );
};

export default PostSearchFilterArea;
