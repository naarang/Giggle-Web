import { usePostSearchStore } from '@/store/postSearch';
import { useEmailTryCountStore } from '@/store/signup';
import {
  useCurrentApplicantIdStore,
  useCurrentDocumentIdStore,
  useCurrentPostIdEmployeeStore,
  useCurrentPostIdStore,
} from '@/store/url';
import { useUserStore } from '@/store/user';

// store 전역 변수 초기화
export const clearAllStore = () => {
  useUserStore.persist.clearStorage();
  usePostSearchStore.persist.clearStorage();
  useEmailTryCountStore.persist.clearStorage();
  useCurrentPostIdStore.persist.clearStorage();
  useCurrentApplicantIdStore.persist.clearStorage();
  useCurrentDocumentIdStore.persist.clearStorage();
  useCurrentPostIdEmployeeStore.persist.clearStorage();
};
