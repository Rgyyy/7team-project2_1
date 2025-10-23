"use client";

import { loginUser } from "@/actions/userLogin";
import { useActionState, useEffect, useState } from "react";

const initialState = { error: "" };

export default function Login() {
  const [state, formAction] = useActionState(loginUser, initialState);
  const [locationInfo, setLocationInfo] = useState<string>("");
  const [deviceInfo, setDeviceInfo] = useState<string>("");

  useEffect(() => {
    // GPS 정보 수집
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationInfo(`${latitude},${longitude}`);
        },
        (error) => {
          setLocationInfo("GPS 비허용");
          console.error("Error fetching GPS location:", error);
        },
        {
          timeout: 10000,
          enableHighAccuracy: true,
        }
      );
    } else {
      setLocationInfo("GPS 지원 안함");
    }

    // 디바이스 정보 수집
    const platform = navigator.platform || "Unknown";
    const language = navigator.language || "Unknown";
    const cookieEnabled = navigator.cookieEnabled;
    const screenInfo = `${screen.width}x${screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const device = {
      platform,
      language,
      cookieEnabled,
      screenInfo,
      timezone,
      userAgent: navigator.userAgent,
    };

    setDeviceInfo(JSON.stringify(device));
  }, []);

  const handleSubmit = (formData: FormData) => {
    // 클라이언트에서 수집한 정보 추가
    if (locationInfo) {
      formData.append("gpsLocation", locationInfo);
    }
    if (deviceInfo) {
      formData.append("deviceInfo", deviceInfo);
    }

    return formAction(formData);
  };

  return (
    <div>
      <h1>로그인</h1>
      <form action={handleSubmit}>
        {state.error && (
          <div
            style={{ color: "red", border: "1px solid red", padding: "10px" }}
          >
            {state.error}
          </div>
        )}

        <div>
          <label>사용자 ID</label>
          <input name="userId" type="text" required placeholder="사용자 ID" />
        </div>

        <div>
          <label>비밀번호</label>
          <input
            name="userPassword"
            type="password"
            required
            placeholder="비밀번호"
          />
        </div>

        <input type="hidden" name="gpsLocation" value={locationInfo} />
        <input type="hidden" name="deviceInfo" value={deviceInfo} />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
