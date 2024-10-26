type NoticeProps = {
  title: string;
  content: string;
  notWarning?: boolean;
};

const Notice = ({ title, content, notWarning }: NoticeProps) => {
  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-2">
      <div className="self-stretch relative button-2">{title}</div>
      <div
        className={`self-stretch relative ${notWarning ? 'text-[#656565]' : 'text-[#ff6f61]'}`}
      >
        {content}
      </div>
    </div>
  );
};

export default Notice;
