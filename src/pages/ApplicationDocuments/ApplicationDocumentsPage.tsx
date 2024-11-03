import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import DocumentCardList from '@/components/Document/DocumentCardList';
import { useGetDocumentsEmployee } from '@/hooks/api/useDocument';
import { useCurrentPostIdEmployeeStore } from '@/store/url';
import { DocumentsSummaryResponse } from '@/types/api/document';
import { useNavigate } from 'react-router-dom';

const ApplicationDocumentsPage = () => {
  const navigate = useNavigate();
  const { currentPostId } = useCurrentPostIdEmployeeStore();
  const { data, isPending } = useGetDocumentsEmployee(Number(currentPostId));
  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate(-1)}
        hasMenuButton={true}
        title="Application Documents"
      />
      {!isPending && (
        <>
          <DocumentCardList
            documents={data?.data as DocumentsSummaryResponse}
          />
          <BottomButtonPanel>
            <Button
              type="large"
              bgColor="bg-[#F4F4F9]"
              fontColor="text-[#bdbdbd]"
              isBorder={false}
              title="Next"
            />
          </BottomButtonPanel>
        </>
      )}
    </div>
  );
};

export default ApplicationDocumentsPage;
