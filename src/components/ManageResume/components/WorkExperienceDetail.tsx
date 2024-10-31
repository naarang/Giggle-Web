import { WorkExperienceType } from '@/types/postApply/resumeDetailItem';
import { formatDate } from '@/utils/editResume';
import EditIcon from '@/assets/icons/ManageResume/EditIcon.svg?react';
import DeleteIcon from '@/assets/icons/ManageResume/DeleteIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { useDeleteWorkExperience } from '@/hooks/api/useResume';

type WorkExperienceDetailProps = {
  data: WorkExperienceType[];
};

const WorkExperienceDetail = ({ data }: WorkExperienceDetailProps) => {
  const navigate = useNavigate();
  const { mutate } = useDeleteWorkExperience();

  const handleDelete = (id: number) => {
    mutate(id);
  };

  return (
    <>
      {data.map((work) => (
        <div
          key={work.id}
          className="px-3 py-4 flex justify-between items-start bg-[#F4F4F9] rounded-xl"
        >
          <div className="text-[#656565] flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="head-3">{work.title}</p>
              <p className="body-3">{work.work_place}</p>
            </div>
            <p className="caption-1">
              {formatDate(work.start_date)} ~{' '}
              {work.end_date ? `${formatDate(work.end_date)}• ` : '현재 • '}
              {(work.duration / 30).toFixed(0)} months
            </p>
            <p className="body-3">{work.description}</p>
          </div>
          <div className="flex justify-center items-center gap-2.5 ml-1">
            <EditIcon
              onClick={() =>
                navigate(`/resume/work-experience/edit/${work.id}`)
              }
              className="cursor-pointer"
            />
            <DeleteIcon
              onClick={() => handleDelete(work.id)}
              className="cursor-pointer"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default WorkExperienceDetail;
