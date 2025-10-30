import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: '운동', description: '달리기, 등산, 요가 등 운동 활동', icon: 'ri-basketball-line' },
  { name: '요리', description: '베이킹, 요리 클래스, 맛집 투어', icon: 'ri-restaurant-line' },
  { name: '독서', description: '북클럽, 작가 강연, 독서 모임', icon: 'ri-book-open-line' },
  { name: '사진', description: '사진 촬영, 출사, 사진 편집', icon: 'ri-camera-line' },
  { name: '음악', description: '악기 연주, 밴드, 노래 모임', icon: 'ri-music-line' },
  { name: '미술', description: '그림 그리기, 공예, 전시회 관람', icon: 'ri-palette-line' },
  { name: '언어', description: '외국어 스터디, 언어 교환', icon: 'ri-translate-2' },
  { name: '게임', description: '보드게임, e스포츠, 게임 모임', icon: 'ri-gamepad-line' },
  { name: '여행', description: '국내외 여행, 캠핑, 트레킹', icon: 'ri-map-pin-line' },
  { name: '그외', description: '기타 다양한 취미 활동', icon: 'ri-more-line' },
];

const locations = [
  { name: '서울', code: '02', description: '대한민국 수도' },
  { name: '인천', code: '032', description: '인천광역시' },
  { name: '대전', code: '042', description: '대전광역시' },
  { name: '대구', code: '053', description: '대구광역시' },
  { name: '광주', code: '062', description: '광주광역시' },
  { name: '울산', code: '052', description: '울산광역시' },
  { name: '부산', code: '051', description: '부산광역시' },
  { name: '세종', code: '044', description: '세종특별자치시' },
  { name: '경기도', code: '031', description: '경기도' },
  { name: '강원도', code: '033', description: '강원특별자치도' },
  { name: '충청북도', code: '043', description: '충청북도' },
  { name: '충청남도', code: '041', description: '충청남도' },
  { name: '전라북도', code: '063', description: '전북특별자치도' },
  { name: '전라남도', code: '061', description: '전라남도' },
  { name: '경상북도', code: '054', description: '경상북도' },
  { name: '경상남도', code: '055', description: '경상남도' },
  { name: '제주도', code: '064', description: '제주특별자치도' },
];

async function main() {
  console.log('🌱 시드 데이터 생성 시작...');

  // 기존 데이터 삭제 (순서 중요!) - 소문자로 변경
  await prisma.activity.deleteMany();
  await prisma.category.deleteMany();
  await prisma.location.deleteMany();

  // 카테고리 생성 - 소문자로 변경
  console.log('\n📂 카테고리 생성 중...');
  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
    console.log(`  ✅ ${category.name} (${category.icon})`);
  }

  // 지역 생성 - 소문자로 변경
  console.log('\n📍 지역 생성 중...');
  for (const location of locations) {
    await prisma.location.create({
      data: location,
    });
    console.log(`  ✅ ${location.name} (코드: ${location.code})`);
  }

  console.log('\n🎉 시드 데이터 생성 완료!');
  console.log(`  - 카테고리: ${categories.length}개`);
  console.log(`  - 지역: ${locations.length}개`);
}

main()
  .catch((e) => {
    console.error('❌ 시드 데이터 생성 실패:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });