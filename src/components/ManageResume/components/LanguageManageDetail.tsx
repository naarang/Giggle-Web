import { LanguageListType } from '@/types/postApply/resumeDetailItem';

type LanguageManageDetailProps = {
  data: LanguageListType;
};

const LanguageManageDetail = ({ data }: LanguageManageDetailProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <p className="bg-[#FEF387] rounded-md px-4 py-1.5 text-[#1E1926] caption-1">
        TOPIK Level {data.topik}
      </p>

      <p className="bg-[#FEF387] rounded-md px-4 py-1.5 text-[#1E1926] caption-1">
        Social Intergration Level {data.social_integration}
      </p>

      <p className="bg-[#FEF387] rounded-md px-4 py-1.5 text-[#1E1926] caption-1">
        Sejong Institute Level {data.sejong_institute}
      </p>
      {data.etc.length > 0 &&
        data.etc.map((lang) => (
          <p
            key={lang.id}
            className="bg-[#FEF387] rounded-md px-4 py-1.5 text-[#1E1926] caption-1"
          >
            {lang.language_name} Level {lang.level}
          </p>
        ))}
    </div>
  );
};

export default LanguageManageDetail;
