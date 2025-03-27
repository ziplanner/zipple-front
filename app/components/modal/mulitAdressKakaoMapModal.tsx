import React, { useEffect, useRef, useState } from "react";

interface AddressInfo {
  address: string;
  name?: string; // 선택적으로 주소에 대한 추가 설명이나 이름
}

const MultiAddressKakaoMapModal = ({
  addresses,
  onClose,
}: {
  addresses: AddressInfo[];
  onClose: () => void;
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 37.5665, lng: 126.978 }); // 기본값을 서울 시청으로 설정

  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

  // 카카오 맵 API 스크립트 로딩
  const loadKakaoMapScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.kakao && window.kakao.maps) {
        setIsScriptLoaded(true);
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&libraries=services&autoload=false`;
      script.async = true;

      script.onload = () => {
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

  // 주소들을 좌표로 변환하고 지도에 마커 추가
  const renderAddressesOnMap = (map: any, geocoder: any) => {
    addresses.forEach((addressInfo, index) => {
      geocoder.addressSearch(
        addressInfo.address,
        (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const lat = parseFloat(result[0].y);
            const lng = parseFloat(result[0].x);

            // 첫 번째 주소를 기본 중심으로 설정 (state 변경)
            if (index === 0 && mapCenter.lat !== lat && mapCenter.lng !== lng) {
              setMapCenter({ lat, lng }); // 최초의 주소일 때만 상태 변경
            }

            // 마커 생성
            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(lat, lng),
              map: map,
            });

            // 인포윈도우 생성 (주소 이름이 있다면 해당 이름 표시, 없으면 주소 전체 표시)
            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="padding:5px;">${
                addressInfo.name || addressInfo.address
              }</div>`,
            });

            // 마커에 마우스 오버/아웃 이벤트 추가
            window.kakao.maps.event.addListener(marker, "mouseover", () => {
              infowindow.open(map, marker);
            });
            window.kakao.maps.event.addListener(marker, "mouseout", () => {
              infowindow.close();
            });
          } else {
            console.error(`${addressInfo.address} 주소 검색 실패:`, status);
          }
        }
      );
    });
  };

  // 스크립트 로딩
  useEffect(() => {
    loadKakaoMapScript().catch((error) => {
      console.error("Failed to load Kakao Maps script:", error);
      alert("지도를 로드할 수 없습니다.");
    });
  }, []);

  // 지도 렌더링
  useEffect(() => {
    if (isScriptLoaded && addresses.length > 0 && mapRef.current) {
      try {
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 기본 맵 옵션 (첫 번째 주소 중심)
        const mapOption = {
          center: new window.kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
          level: addresses.length > 1 ? 7 : 3, // 주소 개수에 따라 확대/축소 레벨 조정
        };

        const map = new window.kakao.maps.Map(mapRef.current, mapOption);

        // 주소들을 지도에 렌더링
        renderAddressesOnMap(map, geocoder);
      } catch (error) {
        console.error("Map rendering error:", error);
        alert("지도를 렌더링할 수 없습니다.");
      }
    }
  }, [isScriptLoaded, addresses, mapCenter]);

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

export default MultiAddressKakaoMapModal;
