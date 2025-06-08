import { DocumentType, EmployDocumentInfo } from '@/types/api/document';
import FolderIcon from '@/assets/icons/FolderIcon.svg?react';
import DownloadIcon from '@/assets/icons/DownloadIcon.svg?react';
import BlackFolderIcon from '@/assets/icons/BlackFolder.svg?react';
import ArrowrightIcon from '@/assets/icons/Chevron.svg?react';
import { useNavigate, useParams } from 'react-router-dom';
import { DocumentStatusEmployer } from '@/constants/documents';
import {
  useGetPartTimeEmployPermit,
  useGetStandardLaborContract,
  usePatchStatusSubmissionEmployer,
} from '@/hooks/api/useDocument';
import { ReactNode, useEffect, useState } from 'react';
import { SuccessModalContent } from '@/pages/ApplicationDocuments/ApplicationDocumentsPage';
import { useQueryClient } from '@tanstack/react-query';

type DocumentCardProps = {
  tagText?: string;
  tagStyle?: string;
  children?: ReactNode;
  title: string;
  content: string;
  reason?: string;
  preview?: string;
  onPreview?: () => void;
};

const DocumentCardLayout = ({
  tagText,
  tagStyle,
  children,
  title,
  content,
  reason,
  preview,
  onPreview,
}: DocumentCardProps) => {
  return (
    <div className="w-full p-4 flex flex-col rounded-lg bg-white border border-border-disabled">
      <div
        className={`w-fit caption-12-regular px-1 py-1 mb-1 ${tagStyle} rounded-sm justify-center items-center inline-flex`}
      >
        {tagText}
      </div>
      <div className="w-full pb-2 border-b border-border-disabled">
        <p className="heading-18-semibold py-1">{title}</p>
      </div>
      <div className="w-full pb-2 caption-12-regular text-text-alternative">
        <p className="py-2">{content}</p>
      </div>
      {reason && (
        <div className="w-full pb-2 caption-12-regular text-text-strong">
          <p className="py-2">{'사유 : ' + reason}</p>
        </div>
      )}
      {preview && (
        <div
          className="relative w-full button-14-semibold bg-surface-secondary rounded-lg px-3 py-2 flex flex-row items-center justify-start gap-1"
          onClick={onPreview}
        >
          <BlackFolderIcon />
          <p>{preview}</p>
          <div className="absolute right-3">
            <ArrowrightIcon />
          </div>
        </div>
      )}
      <div className="w-full flex flex-row gap-2">{children}</div>
    </div>
  );
};

type DocumentCardDispenserProps = {
  documentInfo: EmployDocumentInfo;
  title: string;
  type: string;
  reason: string | null;
  setModalContent: (content: SuccessModalContent) => void;
};

const DocumentCardDispenserEmployer = ({
  documentInfo,
  title,
  type,
  reason,
  setModalContent,
}: DocumentCardDispenserProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentUserOwnerPostId = useParams().id;
  const handleDownload = (url: string) => {
    // 웹뷰 환경인지 체크
    const isWebView = Boolean(window.ReactNativeWebView);
    if (isWebView) {
      // 웹뷰에서는 DocumentViewer로 이동
      navigate('/document-view/123', {
        state: {
          url,
          filename: url.split('/').pop(), // URL에서 파일명 추출
        },
      });
    } else {
      // 웹 환경에서는 직접 다운로드
      const link = document.createElement('a');
      link.href = url;
      link.download = url.split('/').pop() || 'download';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const { mutate: submitDocument } = usePatchStatusSubmissionEmployer({
    onSuccess: () => {
      setModalContent({
        // TODO: 디자인 변경 되면 문구 수정 적용
        title: 'Registration has been\nsuccessfully completed',
        content: `The employer will check the documents\nsoon and fill them out together.\nWe will send you a notification when I'm\ndone writing it!`,
        onNext: () => {},
      });
    },
    onSettled: async () => {
      setModalContent({ title: '', content: '', onNext: () => {} });
      await queryClient.invalidateQueries({
        queryKey: [
          'application',
          'documents',
          'employer',
          Number(currentUserOwnerPostId),
        ],
      });
    },
  });
  const { mutateAsync: getPartTimeDocument } = useGetPartTimeEmployPermit({
    onSuccess: (data) => {
      return data.data.employer_information;
    },
  });
  const { mutateAsync: getLaborContractDocument } = useGetStandardLaborContract(
    {
      onSuccess: (data) => {
        return data.data.employer_information;
      },
    },
  );

  const checkEmployerWriteDocuments = async () => {
    if (type === DocumentType.PART_TIME_PERMIT) {
      const result = await getPartTimeDocument(documentInfo.id);
      return result?.data.employer_information || null;
    } else {
      const result = await getLaborContractDocument(documentInfo.id);
      return result?.data.employer_information || null;
    }
  };

  const [isEmployerWrote, setIsEmployerWrote] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDocuments = async () => {
      const result = await checkEmployerWriteDocuments();
      setIsEmployerWrote(result !== null);
    };
    checkDocuments();
  }, []);
  switch (documentInfo.status) {
    case DocumentStatusEmployer.TEMPORARY_SAVE:
      return (
        <DocumentCardLayout
          title={title}
          tagText="진행 상황을 확인해보세요! 📝"
          tagStyle="bg-surface-primary text-primary-dark"
          content="유학생이 문서를 보냈어요. 유학생이 작성한 내용을 검토하고,
              내용을 작성해주세요."
        >
          <div className="w-full flex self-stretch items-center justify-center gap-2 text-[#464646]">
            <button
              className={`${isEmployerWrote ? 'bg-surface-secondary' : 'bg-surface-primary'} text-primary-dark w-full py-3 flex justify-center items-center rounded-lg button-14-semibold`}
              onClick={() => {
                navigate(`/employer/write-documents/${documentInfo.id}`, {
                  // EmployerWriteDocumentPage.tsx
                  state: {
                    type: type,
                    isEdit: true,
                    userOwnerPostId: currentUserOwnerPostId,
                  },
                });
              }}
            >
              {isEmployerWrote ? '수정' : '작성'}
            </button>
            <button
              className={`${isEmployerWrote ? 'bg-surface-primary text-primary-dark' : 'bg-surface-secondary text-text-disabled'} w-full py-3 flex justify-center items-center rounded-lg button-14-semibold`}
              onClick={() => {
                if (isEmployerWrote) {
                  submitDocument(Number(documentInfo.id)); // 고용주가 서류 제출
                }
              }}
            >
              제출
            </button>
          </div>
        </DocumentCardLayout>
      );
    case DocumentStatusEmployer.SUBMITTED:
      return (
        <DocumentCardLayout
          title={title}
          tagStyle="bg-primary-neutral text-primary-dark"
          tagText="조금만 기다려주세요 ... 🔄"
          content="유학생이 문서를 확인 중이에요. 조금만 기다려 주세요!"
          preview="서류 확인하기"
          onPreview={() => {
            navigate(`/document-preview/${documentInfo.id}`, {
              state: {
                type: type,
              },
            });
          }}
        />
      );
    case DocumentStatusEmployer.REWRITING:
      if (reason)
        return (
          <DocumentCardLayout
            title={title}
            tagText="유학생이 서류 작성을 재요청했어요 ! 📋"
            tagStyle="bg-surface-primary text-primary-dark"
            content="유학생이 서류 작성을 요청했어요. 유학생이 작성한 내용을 검토하고,
              내용을 작성해주세요."
            reason={reason}
          >
            <div className="w-full flex self-stretch items-center justify-center gap-2 text-[#464646]">
              <button
                className={`bg-surface-secondary text-primary-dark w-full py-3 flex justify-center items-center rounded-lg button-14-semibold`}
                onClick={() => {
                  navigate(`/employer/write-documents/${documentInfo.id}`, {
                    // EmployerWriteDocumentPage.tsx
                    state: {
                      type: type,
                      isEdit: true,
                    },
                  });
                }}
              >
                수정
              </button>
              <button
                className={`bg-surface-primary text-primary-dark w-full py-3 flex justify-center items-center rounded-lg button-14-semibold`}
                onClick={() => {
                  if (isEmployerWrote) {
                    submitDocument(Number(documentInfo.id)); // 고용주가 서류 제출
                  }
                }}
              >
                재제출
              </button>
            </div>
          </DocumentCardLayout>
        );
      break;
    case DocumentStatusEmployer.CONFIRMATION:
      return (
        <>
          <DocumentCardLayout
            title={title}
            tagStyle="bg-[#0066ff]/10 text-text-success"
            tagText="서류 작성이 완료되었어요 ! 🎉"
            content="서류가 최종 승인되었어요 ! 아래 버튼을 통해 다운로드 해보세요."
          >
            <div className="flex flex-col gap-2 w-full items-start justify-start text-text-normal]">
              {documentInfo.word_url && (
                <div className="w-full rounded-lg bg-surface-secondary  flex items-center justify-between border border-surface-disabled px-4 py-2 pl-2.5">
                  <div className="flex items-center justify-start gap-2">
                    <div className="w-[1.375rem] h-[1.375rem] flex items-center justify-center rounded-full bg-primary-dark">
                      <FolderIcon />
                    </div>
                    <div className="relative caption-12-regular opacity-75">
                      word로 다운로드
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      handleDownload(documentInfo.word_url as string)
                    }
                  >
                    <DownloadIcon />
                  </div>
                </div>
              )}
            </div>
          </DocumentCardLayout>
        </>
      );
  }
};

export default DocumentCardDispenserEmployer;
