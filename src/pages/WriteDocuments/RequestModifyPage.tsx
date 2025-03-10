import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import { usePostRequest } from '@/hooks/api/useDocument';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RequestModifyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reasonInput, setReasonInput] = useState('');
  const { mutate: sendRequest } = usePostRequest(Number(id));
  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        hasMenuButton={true}
        title="Reason for Request"
        onClickBackButton={() => navigate(`/application-documents/${id}`)}
      />
      <div className="w-full relative flex flex-col items-center justify-start text-left text-[#1e1926] head-1">
        <div className="self-stretch flex items-center justify-start p-6">
          Reason for Request
        </div>
        <div className="w-full self-stretch flex flex-col items-center justify-start pb-[10rem] px-6 body-3">
          <div className="w-full flex flex-col items-start justify-start">
            <div className="w-full flex flex-col items-center justify-start">
              <textarea
                className="w-full h-[7.5rem] px-[1rem] py-[0.75rem] border border-[#E2E5EB] rounded-[0.75rem] body-2 outline-none resize-none"
                placeholder="Write a contract review"
                value={reasonInput}
                maxLength={100}
                onChange={(e) => setReasonInput(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <BottomButtonPanel>
        <Button
          type="large"
          isBorder={false}
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          title="Request"
          onClick={() => {
            sendRequest({ id: Number(id), reason: reasonInput });
          }}
        />
      </BottomButtonPanel>
    </div>
  );
};

export default RequestModifyPage;
