const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * 이메일 검증 스키마
 * @param email 입력한 이메일
 * @returns
 */
export const validateEmail = (email: string): string | null => {
  if (!email) return "이메일 주소는 필수 입력 사항입니다.";
  if (!emailRegex.test(email)) return "유효한 이메일 주소를 입력해 주세요.";
  return null;
};
