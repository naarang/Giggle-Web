import BaseHeader from '@/components/Common/Header/BaseHeader';
import PostSearchFilterSelect from '@/components/PostSearchFilter/PostSearchFilterAreaSelect';
import { useEffect, useState } from 'react';
import PostSearchFilterBottomSheet from '@/components/PostSearchFilter/PostSearchFilterBottomSheet';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { FILTER_CATEGORY } from '@/constants/postSearch';

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
  filterList: PostSearchFilterItemType[];
  setFilterList: React.Dispatch<
    React.SetStateAction<PostSearchFilterItemType[]>
  >;
};

const PostSearchFilterArea = ({
  setIsOpenAreaFilter,
  filterList,
  setFilterList,
}: PostSearchFilterAreaType) => {
  const [currentRegion, setCurrentRegion] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);

  const [region1Depth, setRegion1Depth] = useState<string | null>(null);
  const [region2Depth, setRegion2Depth] = useState<string | null>(null);
  const [region3Depth, setRegion3Depth] = useState<string | null>(null);

  const [region2DepthData, setRegion2DepthData] = useState<string[]>([]);
  const [region3DepthData, setRegion3DepthData] = useState<string[]>([]);

  useEffect(() => {
    const region1Depth = filterList.find(
      (value) => value.category === FILTER_CATEGORY.REGION_1DEPTH,
    );

    const region2Depth = filterList.find(
      (value) => value.category === FILTER_CATEGORY.REGION_2DEPTH,
    );
    const region3Depth = filterList.find(
      (value) => value.category === FILTER_CATEGORY.REGION_3DEPTH,
    );

    setCurrentRegion([
      region1Depth?.value ?? null,
      region2Depth?.value ?? null,
      region3Depth?.value ?? null,
    ]);
  }, [filterList]);

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
    setCurrentRegion([region1Depth, region2Depth, region]);
  };

  const onClickSubmit = () => {
    const resetRegionFilterList = filterList.filter(
      (value) => !value.category.includes('Region'),
    );
    const region1 = {
      category: FILTER_CATEGORY.REGION_1DEPTH,
      value: currentRegion[0],
    };
    const region2 = {
      category: FILTER_CATEGORY.REGION_2DEPTH,
      value: currentRegion[1],
    };
    const region3 = {
      category: FILTER_CATEGORY.REGION_3DEPTH,
      value: currentRegion[2],
    };
    setFilterList([...resetRegionFilterList, region1, region2, region3]);
    setIsOpenAreaFilter(false);
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
      <PostSearchFilterBottomSheet
        currentRegion={currentRegion}
        setCurrentRegion={setCurrentRegion}
        onClickSubmit={onClickSubmit}
      />
    </>
  );
};

export default PostSearchFilterArea;
