// src/app/image-demo/page.tsx
import Image from "next/image";

export default function ImageDemoPage() {
  // 예시 이미지 URL (원하시는 주소로 변경)
  const imageUrl =
    "https://7team-bucket-yjh.s3.ap-northeast-2.amazonaws.com/uploads/1762762171981-img_m.png";

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">이미지 데모 (next/image)</h1>

        <div className="relative w-full aspect-[3/2] rounded overflow-hidden">
          <Image
            src={imageUrl}
            alt="Demo image"
            fill // 부모 컨테이너에 맞춰 채움 (position: absolute 필요)
            sizes="(max-width: 768px) 100vw, 800px"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <p className="mt-4 text-sm text-gray-500">
          외부 이미지 예시: <code className="break-all">{imageUrl}</code>
        </p>
      </div>
    </main>
  );
}
