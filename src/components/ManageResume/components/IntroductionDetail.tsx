import EditIcon from '@/assets/icons/ManageResume/EditIcon.svg?react';
import DeleteIcon from '@/assets/icons/ManageResume/DeleteIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { useDeleteIntroduction } from '@/hooks/api/useResume';

type IntroductionDetailProps = {
  data: string;
};

const IntroductionDetail = ({ data }: IntroductionDetailProps) => {
  const navigate = useNavigate();
  const { mutate } = useDeleteIntroduction();

  const handleDelete = () => {
    mutate();
  };

  return (
    <div className="px-3 py-4 flex justify-between items-start bg-[#F4F4F9] rounded-xl">
      <div className="text-[#656565] flex flex-col gap-4">
        <p className="caption-1-sb">{data}</p>
      </div>
      <div className="flex justify-center items-center gap-2.5 ml-1">
        <EditIcon
          onClick={() => navigate('/resume/introduction', { state: { data } })}
          className="cursor-pointer"
        />
        <DeleteIcon onClick={handleDelete} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default IntroductionDetail;
