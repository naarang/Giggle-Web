import { EducationType } from '@/types/postApply/resumeDetailItem';
import { formatDate } from '@/utils/editResume';
import EditIcon from '@/assets/icons/ManageResume/EditIcon.svg?react';
import DeleteIcon from '@/assets/icons/ManageResume/DeleteIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { useDeleteEducation } from '@/hooks/api/useResume';

type EducationDetailProps = {
  data: EducationType[];
};

const EducationDetail = ({ data }: EducationDetailProps) => {
  const navigate = useNavigate();
  const { mutate } = useDeleteEducation();

  const handleDelete = (id: number) => {
    mutate(id);
  };

  return (
    <>
      {data.map((education) => (
        <div
          key={education.id}
          className="relative px-3 py-4 flex items-start bg-[#F4F4F9] rounded-xl"
        >
          {/* 수정, 삭제 아이콘 */}
          <div className="absolute top-4 right-3 flex justify-center items-center gap-2.5 ml-1">
            <EditIcon
              onClick={() => navigate(`/resume/education/edit/${education.id}`)}
              className="cursor-pointer"
            />
            <DeleteIcon
              onClick={() => handleDelete(education.id)}
              className="cursor-pointer"
            />
          </div>
          {/* 학력 정보 */}
          <div className="text-[#656565]">
            <p className="head-3 mb-1">{education.education_level}</p>
            <div className="flex gap-1 body-3 mb-4 mr-4">
              <p>{education.school_name}</p>
              <p>•</p>
              <p>{education.major}</p>
            </div>
            <p className="caption-1">
              {formatDate(education.start_date)} ~{' '}
              {formatDate(education.end_date)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default EducationDetail;
