export type RESTYPE<T> = {
  success: boolean;
  data: T;
  error: ErrorType | null;
};

type ErrorType = {
  code: number;
  message: string;
};
