export const formatToKoreanDate = (isoString: string | null | undefined) => {
  if (!isoString) return { yyyyMmDd: "날짜 없음", yyyyDotMmDotDd: "날짜 없음" };

  const date = new Date(isoString);

  // 유효하지 않은 날짜 처리
  if (isNaN(date.getTime())) {
    return { yyyyMmDd: "잘못된 날짜", yyyyDotMmDotDd: "잘못된 날짜" };
  }

  // 한국 시간 (UTC+9) 적용
  const koreaDate = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  // yyyy-mm-dd 형식 변환
  const yyyyMmDd = koreaDate.replace(/\. /g, "-").replace(/\.$/, "");

  // yyyy.mm.dd 형식 변환
  const yyyyDotMmDotDd = koreaDate.replace(/\. /g, ".").replace(/\.$/, "");

  return { yyyyMmDd, yyyyDotMmDotDd };
};

// 사용 예시
const isoDate = "2025-03-10T00:43:53.132031";
const formatted = formatToKoreanDate(isoDate);

console.log(formatted.yyyyMmDd); // "2025-03-10"
console.log(formatted.yyyyDotMmDotDd); // "2025.03.10"
