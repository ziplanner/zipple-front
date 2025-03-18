export const CATEGORY_LIST = [
  "전체",
  "아파트",
  "주택/다가구",
  "빌라/다세대",
  "원룸/투룸",
  "상가 점포",
  "빌딩/상업시설",
  "사무실",
  "공장/창고/지식산업센터",
  "병원/요양원",
  "기타(경매/분양 등)",
  "호텔/모텔/펜션",
  "오피스텔",
  "재건축/재개발",
  "토지",
  "종교시설",
];

// 전문분야 옵션 배열
export const specializationOptions = [
  // 주거용 부동산
  { label: "아파트", value: "APARTMENT" },
  { label: "주택/다가구", value: "HOUSE" },
  { label: "빌라/다세대", value: "VILLA" },
  { label: "원룸/투룸", value: "ONE_ROOM_TWO_ROOM" },
  { label: "오피스텔", value: "OFFICETEL" },

  // 상업/업무용 부동산
  { label: "상가점포", value: "COMMERCIAL_SHOP" },
  { label: "빌딩/상업시설", value: "BUILDING" },
  { label: "사무실", value: "OFFICE" },
  { label: "공장/창고/지식산업센터", value: "FACTORY_WAREHOUSE" },

  // 개발 및 투자 부동산
  { label: "재건축/재개발", value: "RECONSTRUCTION" },
  { label: "토지", value: "LAND" },
  { label: "병원/요양원", value: "HOSPITAL" },
  { label: "경매/분양", value: "AUCTION_SALE" },

  // 특수 목적 부동산
  { label: "종교시설", value: "RELIGIOUS_FACILITY" },
  { label: "호텔/모텔/펜션", value: "HOTEL" },
  { label: "기타", value: "OTHER" },
];
