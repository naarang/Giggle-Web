export type RESTYPE<T> = {
  success: boolean;
  data: T;
  error: null | string;
};
