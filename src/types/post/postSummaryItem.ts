import { SummariesType, TagType } from '@/types/postDetail/postDetailItem';

export type PostSummaryItemType = {
  icon_img_url: string;
  company_name: string;
  title: string;
  tags: TagType;
  summaries: SummariesType;
};
