import React, { useEffect, useRef, useState } from "react";

interface KakaoMapModalProps {
  address: string;
  name?: string; // Optional name parameter
  onClose: () => void;
}

const KakaoMapModal = ({ address, name, onClose }: KakaoMapModalProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

  // 카카오 맵 API 스크립트 로딩
  const loadKakaoMapScript = () => {
    return new Promise<void>((resolve, reject) => {
      // 이미 스크립트가 로드된 경우
      if (window.kakao && window.kakao.maps) {
        setIsScriptLoaded(true);
        resolve();
        return;
      }

      // 스크립트가 로드되지 않은 경우
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&libraries=services&autoload=false`;
      script.async = true;

      script.onload = () => {
        // autoload=false일 경우 명시적으로 로드
        window.kakao.maps.load(() => {
          console.log("Kakao Maps script loaded successfully");
          setIsScriptLoaded(true);
          resolve();
        });
      };

      script.onerror = (error) => {
        console.error("Kakao Maps script loading failed:", error);
        reject(error);
      };

      document.head.appendChild(script);
    });
  };

  // 카카오 맵 초기화
  useEffect(() => {
    // 컴포넌트 마운트 시 스크립트 로딩
    loadKakaoMapScript().catch((error) => {
      console.error("Failed to load Kakao Maps script:", error);
      alert("지도를 로드할 수 없습니다.");
    });
  }, []);

  // 주소 변경 및 스크립트 로드 후 지도 렌더링
  useEffect(() => {
    if (isScriptLoaded && address && mapRef.current) {
      try {
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 좌표 변환
        geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const lat = result[0].y;
            const lng = result[0].x;

            const mapOption = {
              center: new window.kakao.maps.LatLng(lat, lng), // 변환된 좌표로 맵의 중심 설정
              level: 3, // 확대/축소 정도
            };

            const map = new window.kakao.maps.Map(mapRef.current, mapOption);

            // 마커 추가
            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(lat, lng),
              map: map,
            });

            // 인포윈도우 내용 (이름이 있으면 이름과 주소, 없으면 주소만)
            const infoWindowContent = name
              ? //   ? `<div style="padding:5px;"><strong>${name}</strong><br/>${address}</div>`
                `<div style="padding:5px;"><strong>${name}</strong></div>`
              : `<div style="padding:5px;">${address}</div>`;

            // 지도에 인포윈도우 추가
            const infowindow = new window.kakao.maps.InfoWindow({
              content: infoWindowContent,
            });
            infowindow.open(map, marker);
          } else {
            console.error("Geocoder search failed:", status);
            alert("주소를 찾을 수 없습니다.");
          }
        });
      } catch (error) {
        console.error("Map rendering error:", error);
        alert("지도를 렌더링할 수 없습니다.");
      }
    }
  }, [isScriptLoaded, address, name]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 w-full max-w-md">
        {/* 카카오 맵 */}
        <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default KakaoMapModal;
