export type JobPostingSummariesType = {
  address: string; // 위치 정보
  work_period: string; // 근무 기간
  work_days_per_week: number; // // 근무 일자
};

export type JobPostingTagType = {
  is_recruiting: boolean; // “모집중/마감"
  visa: string; // “비자종류"
  job_category: string; // “업직종종류",
};

export type JobPostingItemType = {
  id: number;
  is_book_marked?: boolean; // 북마크 여부(로그인 시에만!)
  icon_img_url?: string; // 회사 로고
  title: string; // 공고 제목
  summaries: JobPostingSummariesType;
  tags: JobPostingTagType;
  hourly_rate: number; // 시급
  recruitment_dead_line: string; // 마감일자
  created_at: string; // 등록일자
};
