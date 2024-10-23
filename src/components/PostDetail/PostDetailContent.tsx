import { useRef, useState } from 'react';
import PostDetailContentMenuBar from '@/components/PostDetail/PostDetailContentMenuBar';
import { PostDetailContentMenu } from '@/constants/postDetail';
import Tag from '@/components/Common/Tag';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const PostDetailContent = () => {
  const scrollRef = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedMenu, setSelectedMenu] = useState<PostDetailContentMenu>(
    PostDetailContentMenu.RECUITMENT,
  );

  const scrollToSelectedMenu = (menu: PostDetailContentMenu) => {
    const scrollIndex: { [key: string]: number } = {
      RECUITMENT: 0,
      WORPLACE: 1,
      COMPANY: 2,
    };

    const target = scrollRef.current[scrollIndex[menu]];
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
    setSelectedMenu(menu);
  };

  return (
    <section className="w-full pb-[8rem] px-[1.5rem] bg-white">
      <PostDetailContentMenuBar
        selectedMenu={selectedMenu}
        scrollToSelectedMenu={scrollToSelectedMenu}
      />
      <div className="flex flex-col gap-[1.125rem] w-full pt-[1.5rem]">
        <div ref={(e) => (scrollRef.current[0] = e)}>
          <h3 className="px-[0.5rem] pb-[0.5rem] text-[#1E1926] head-3">
            Recruiment Conditions
          </h3>
          <div className="flex flex-col gap-[1rem] w-full p-[1rem] rounded-[0.563rem] bg-[#F4F4F9]">
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Recruitment Period
              </h5>
              <p className="text-[#656565] caption-1">Open recruitment</p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">Education</h5>
              <p className="text-[#656565] caption-1">No requirement</p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Number of recruits
              </h5>
              <p className="text-[#656565] caption-1">5 people</p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">Visa</h5>
              <p className="text-[#656565] caption-1">D-2</p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">Gender</h5>
              <p className="text-[#656565] caption-1">Female</p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Preferred Conditions
              </h5>
              <p className="text-[#656565] caption-1">Experienced candidates</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="px-[0.5rem] pb-[0.5rem] text-[#1E1926] head-3">
            Detailed Overview
          </h3>
          <div className="flex flex-col gap-[1rem] w-full p-[1rem] rounded-[0.563rem] bg-[#F4F4F9]">
            <p className="text-[#656565] body-3">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem ...
            </p>
            <button>
              <Tag
                value={'Read more'}
                padding="0.375rem 0.875rem"
                isRounded={true}
                hasCheckIcon={false}
                backgroundColor="#FEF387"
                color="#1E1926"
                fontStyle="body-3"
              />
            </button>
          </div>
        </div>
        <div ref={(e) => (scrollRef.current[1] = e)}>
          <div className="flex flex-col gap-[0.25rem] px-[0.5rem] pb-[0.5rem]">
            <h3 className="text-[#1E1926] head-3">Workplace Information</h3>
            <p className="text-[#656565] button-2">Recruitment Period</p>
            <p className="text-[#656565] caption-1">Open recruitment</p>
          </div>
          <Map
            center={{ lat: 37.5665, lng: 126.978 }}
            style={{ width: '100%', height: '151px' }}
            className="rounded-xl"
          >
            <MapMarker position={{ lat: 37.5665, lng: 126.978 }}></MapMarker>
          </Map>
        </div>
        <div>
          <h3 className="px-[0.5rem] pb-[0.5rem] text-[#1E1926] head-3">
            Working Conditions
          </h3>
          <div className="flex flex-col gap-[1rem] w-full p-[1rem] rounded-[0.563rem] bg-[#F4F4F9]">
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">Salary</h5>
              <p className="text-[#656565] caption-1">10,000 KRW</p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Work Period
              </h5>
              <p className="text-[#656565] caption-1">6 months</p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Working Days
              </h5>
              <p className="text-[#656565] caption-1">Monday, Tuesday</p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Working Hours
              </h5>
              <p className="text-[#656565] caption-1">09:00 - 17:00</p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Job Category
              </h5>
              <p className="text-[#656565] caption-1">Restaurant</p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Employment Type
              </h5>
              <p className="text-[#656565] caption-1">Part-time</p>
            </div>
          </div>
        </div>
        <div ref={(e) => (scrollRef.current[2] = e)}>
          <h3 className="px-[0.5rem] pb-[0.5rem] text-[#1E1926] head-3">
            Company Information
          </h3>
          <div className="flex flex-col gap-[1rem] w-full p-[1rem] rounded-[0.563rem] bg-[#F4F4F9]">
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Company Address
              </h5>
              <p className="text-[#656565] caption-1">Blahblah</p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Representative Name
              </h5>
              <p className="text-[#656565] caption-1">Name</p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">Recruiter</h5>
              <p className="text-[#656565] caption-1">Name</p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">Contact</h5>
              <p className="text-[#656565] caption-1">010-0000-0000</p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">Email</h5>
              <p className="text-[#656565] caption-1">email@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetailContent;
