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
  filterList: PostSearchFilterItemType;
  setFilterList: React.Dispatch<React.SetStateAction<PostSearchFilterItemType>>;
};

const PostSearchFilterArea = ({
  setIsOpenAreaFilter,
  filterList,
  setFilterList,
}: PostSearchFilterAreaType) => {
  // TODO: 전체 옵션인 경우 region3 선택 안해도 가능하도록 조건 추가하기
  const [currentRegion1, setCurrentRegion1] = useState<string[]>([]);
  const [currentRegion2, setCurrentRegion2] = useState<string[]>([]);
  const [currentRegion3, setCurrentRegion3] = useState<string[]>([]);

  const [region1Depth, setRegion1Depth] = useState<string | null>(null);
  const [region2Depth, setRegion2Depth] = useState<string | null>(null);
  const [region3Depth, setRegion3Depth] = useState<string | null>(null);

  const [region2DepthData, setRegion2DepthData] = useState<string[]>([]);
  const [region3DepthData, setRegion3DepthData] = useState<string[]>([]);

  useEffect(() => {
    const region1Depth = filterList[FILTER_CATEGORY.REGION_1DEPTH];
    const region2Depth = filterList[FILTER_CATEGORY.REGION_2DEPTH];
    const region3Depth = filterList[FILTER_CATEGORY.REGION_3DEPTH];

    setCurrentRegion1(region1Depth ?? []);
    setCurrentRegion2(region2Depth ?? []);
    setCurrentRegion3(region3Depth ?? []);
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

    if (currentRegion1.length === 3) {
      alert('지역은 3개까지만 선택할 수 있습니다');
      return;
    }

    if (isExistedFilter(region1Depth, region2Depth, region)) {
      alert('이미 선택된 지역입니다.');
      return;
    }

    setCurrentRegion1([...currentRegion1, region1Depth]);
    setCurrentRegion2([...currentRegion2, region2Depth]);
    setCurrentRegion3([...currentRegion3, region]);
  };

  // 중복 선택 검사하기
  const isExistedFilter = (
    region1Depth: string,
    region2Depth: string,
    region: string,
  ) => {
    const isSameRegion1 = currentRegion1.find(
      (value) => value === region1Depth,
    );
    const isSameRegion2 = currentRegion2.find(
      (value) => value === region2Depth,
    );
    const isSameRegion3 = currentRegion3.find((value) => value === region);

    if (isSameRegion1 && isSameRegion2 && isSameRegion3) return true;
    return false;
  };

  const onClickSubmit = () => {
    const updatedFilterList = {
      ...filterList,
      [FILTER_CATEGORY.REGION_1DEPTH]: [...currentRegion1],
      [FILTER_CATEGORY.REGION_2DEPTH]: [...currentRegion2],
      [FILTER_CATEGORY.REGION_3DEPTH]: [...currentRegion3],
    };
    setFilterList(updatedFilterList);
    setIsOpenAreaFilter(false);
  };

  const onClickDelete = (regionIndex: number) => {
    const newCurrentRegion1 = currentRegion1.filter(
      (_value, index) => index !== regionIndex,
    );
    setCurrentRegion1(newCurrentRegion1);
    const newCurrentRegion2 = currentRegion2.filter(
      (_value, index) => index !== regionIndex,
    );
    setCurrentRegion2(newCurrentRegion2);
    const newCurrentRegion3 = currentRegion3.filter(
      (_value, index) => index !== regionIndex,
    );
    setCurrentRegion3(newCurrentRegion3);
  };

  const onClickReset = () => {
    setCurrentRegion1([]);
    setCurrentRegion2([]);
    setCurrentRegion3([]);
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
        currentRegion1={currentRegion1}
        currentRegion2={currentRegion2}
        currentRegion3={currentRegion3}
        onClickDelete={onClickDelete}
        onClickReset={onClickReset}
        onClickSubmit={onClickSubmit}
      />
    </>
  );
};

export default PostSearchFilterArea;
