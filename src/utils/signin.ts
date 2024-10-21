// ID 유효성 검사 함수
export const validateId = (id: string, setIdError: (error: string | null) => void): boolean => {
  const idRegex = /^[A-Za-z0-9]{1,320}$/;
  if (!idRegex.test(id)) {
    setIdError('Invalid id format');
    return false;
  }
  setIdError(null);
  return true;
};

// 비밀번호 유효성 검사 함수
export const validatePassword = (password: string, setPasswordError: (error: string | null) => void): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    setPasswordError(
      'Password must be at least 8 characters, including numbers, letters, and symbols.'
    );
    return false;
  }
  setPasswordError(null);
  return true;
};

// 이메일 유효성 검사 함수
export const validateEmail = (email: string, setEmailError: (error: string | null) => void): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)){
    setEmailError('Invalid email format')
    return false;
  };
  setEmailError(null)
  return true;
};