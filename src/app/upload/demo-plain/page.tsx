// src/app/image-demo-plain/page.tsx
export default function PlainImgPage() {
  const imageUrl =
    "https://7team-bucket-yjh.s3.ap-northeast-2.amazonaws.com/uploads/1762748277731-img_s.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAYYS7T5X7NF3SPL66%2F20251110%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20251110T041757Z&X-Amz-Expires=600&X-Amz-Signature=355354617457e83173195269b2df3cc7221ad837e337c6e98fcafb2ab8ae6f7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject";

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">
          이미지 데모 (plain &lt;img&gt;)
        </h1>

        <div className="w-full">
          <img
            src={imageUrl}
            alt="Demo plain"
            style={{ width: "100%", height: "auto", borderRadius: 8 }}
          />
        </div>

        <p className="mt-4 text-sm text-gray-500">
          외부 이미지 예시: <code className="break-all">{imageUrl}</code>
        </p>
      </div>
    </main>
  );
}
