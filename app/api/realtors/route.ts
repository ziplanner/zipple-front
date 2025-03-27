import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// 인증키 환경변수 불러오기
const VWORLD_API_KEY = process.env.NEXT_PUBLIC_VWORLD_API_KEY;
const VWORLD_API_URL = "https://api.vworld.kr/ned/data/getEBBrokerInfo";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchType = searchParams.get("searchType");
  const searchValue = searchParams.get("searchValue");
  const pageNo = searchParams.get("pageNo") || "1";
  const numOfRows = searchParams.get("numOfRows") || "10";

  try {
    if (!VWORLD_API_KEY) {
      return NextResponse.json(
        { error: "인증키가 설정되지 않았습니다." },
        { status: 400 }
      );
    }

    const response = await axios.get(VWORLD_API_URL, {
      params: {
        key: VWORLD_API_KEY,
        domain: "https://www.zipple.co.kr/",
        pageNo,
        numOfRows,
        ...(searchType === "brkrNm" && { brkrNm: searchValue }),
        ...(searchType === "bsnmCmpnm" && { bsnmCmpnm: searchValue }),
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API 호출 중 오류:", error);
    return NextResponse.json(
      { error: "API 호출 중 오류 발생" },
      { status: 500 }
    );
  }
}
