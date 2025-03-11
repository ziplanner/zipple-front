import React, { useEffect, useState } from "react";
import InputWithButton from "@/app/components/input/inputWithButton";

const AddressSearch = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (address: string) => void;
}) => {
  const [isDaumLoaded, setIsDaumLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.daum) {
      const script = document.createElement("script");
      script.src =
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.onload = () => setIsDaumLoaded(true);
      document.body.appendChild(script);
    } else {
      setIsDaumLoaded(true);
    }
  }, []);

  const handleAddressSearch = () => {
    if (!isDaumLoaded) {
      alert(
        "주소 검색 API가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요."
      );
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data: any) => {
        onChange(data.address);
      },
    }).open();
  };

  return (
    <InputWithButton
      label="주소"
      name="generalAddress"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      buttonText="검색"
      onButtonClick={handleAddressSearch}
    />
  );
};

export default AddressSearch;
