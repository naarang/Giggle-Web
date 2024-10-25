const Notice = ({ title, content }: { title: string; content: string }) => {
  return (
      <div className="self-stretch flex flex-col items-start justify-start gap-2">
        <div className="self-stretch relative button-2">{title}</div>
        <div className="self-stretch relative text-[#ff6f61]">{content}</div>
      </div>
  );
};

export default Notice;
