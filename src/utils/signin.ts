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
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)){
    return false;
  };
  return true;
};

// 인증 코드 유횽성 검사 함수
export const validateCode = (code: string): boolean =>{
  const codeRegex =  /^\d$/;
  if(!codeRegex.test(code)){
    return false;
  }
  return true;
}