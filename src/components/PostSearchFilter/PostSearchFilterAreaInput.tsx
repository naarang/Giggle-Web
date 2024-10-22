import PostSearchFilterToggle from '@/components/PostSearchFilter/PostSearchFilterToggle';
import Tag from '@/components/Common/Tag';
import SearchIcon from '@/assets/icons/MagnifyGlassIcon.svg?react';

type PostSearchFilterAreaInputProps = {
  setIsOpenAreaFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostSearchFilterAreaInput = ({
  setIsOpenAreaFilter,
}: PostSearchFilterAreaInputProps) => {
  return (
    <PostSearchFilterToggle title={'Select Areas'}>
      <div
        className={`w-full flex gap-2 items-center justify-between text-left text-sm font-[Pretendard] border rounded-xl border-[#BDBDBD] bg-white py-[0.625rem] pl-4 pr-[14px] mb-[0.5rem]`}
        onClick={() => setIsOpenAreaFilter(true)}
      >
        <SearchIcon />
        <input
          placeholder={'Select Area'}
          className={
            'w-full outline-none placeholder:text-[var(--input-color)]'
          }
          readOnly
        />
      </div>
      <div className="flex flex-wrap gap-[0.5rem] mb-[0.5rem] px-[0.5rem] w-full">
        <Tag
          value={'Tag'}
          padding="0.375rem 0.875rem"
          isRounded={true}
          hasCheckIcon={false}
          backgroundColor="#FEF387"
          color="#1E1926"
          borderWidth="1px"
          fontStyle="body-3"
          onDelete={(value) => console.log(value)}
        />
      </div>
      <p className="caption-1 text-[#BDBDBD]">
        Multiple selection is available.
      </p>
    </PostSearchFilterToggle>
  );
};

export default PostSearchFilterAreaInput;
