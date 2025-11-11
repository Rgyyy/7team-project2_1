"use client";

import { loginUser } from "@/actions/userLogin";
import { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
          // console.error("Error fetching GPS location:", error);
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
    <div className="flex flex-col items-center">
      <form
        className="border-2 rounded-lg border-purple-600 p-4 m-4 w-full max-w-lg"
        action={handleSubmit}
      >
        {state.error && (
          <div className="text-red-500 border-1 p-2 border-red-500 bg-red-50 w-full">
            {state.error}
          </div>
        )}
        <div className="flex flex-col items-center m-4">
          <Link href="/">
            <Image src="/img_b.png" alt="Logo" width={150} height={100} />
          </Link>
          <h1 className="text-2xl font-bold m-4">로그인</h1>
          <input
            className="p-2 border-1 bg-gray-50 focus:bg-gray-200 border-gray-300 rounded-t-lg "
            name="userId"
            type="text"
            required
            placeholder="ID"
          />

          <input
            className="p-2 border-1 bg-gray-50 focus:bg-gray-200 border-gray-300 rounded-b-lg"
            name="userPassword"
            type="password"
            required
            placeholder="비밀번호"
          />
        </div>

        <input type="hidden" name="gpsLocation" value={locationInfo} />
        <input type="hidden" name="deviceInfo" value={deviceInfo} />

        <div className="flex justify-end">
          <button
            className="bg-purple-600 hover:bg-purple-700 active:bg-purple-600 text-white rounded-lg p-2 m-2"
            type="submit"
          >
            로그인
          </button>
        </div>
      </form>
    </div>
  );
}
