import React, { useEffect, useState } from "react";
import InputWithButton from "@/app/components/input/inputWithButton";
import CustomInput from "../input/customInput";

const AddressSearch = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (address: string) => void;
}) => {
  const [isDaumLoaded, setIsDaumLoaded] = useState<boolean>(false);
  const [searchAddress, setSearchAddress] = useState<string>(value);
  const [detailAddress, setDetailAddress] = useState<string>("");

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
        setSearchAddress(data.address);
        onChange(`${data.address} ${detailAddress}`.trim()); // 주소 + 상세 주소 결합 후 전송
      },
    }).open();
  };

  const handleDetailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDetailAddress(e.target.value);
    onChange(`${searchAddress} ${e.target.value}`.trim()); // 주소 + 상세 주소 결합 후 전송
  };

  return (
    <div className="flex flex-col">
      <InputWithButton
        label="주소"
        name="generalAddress"
        value={searchAddress}
        onChange={() => {}} // 사용자가 변경 못하게 함
        buttonText="검색"
        onButtonClick={handleAddressSearch}
        readOnly={true}
      />
      <CustomInput
        label={"상세주소"}
        placeholder={"상세주소"}
        name={"detailAddress"}
        value={detailAddress}
        onChange={handleDetailAddressChange}
      />
    </div>
  );
};

export default AddressSearch;
