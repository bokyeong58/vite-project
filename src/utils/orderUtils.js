import img1 from '../assets/celeb1.jpg';
import img2 from '../assets/celeb2.jpg';
import img3 from '../assets/celeb3.jpg';

// 손님 이미지 경로 (예: src/assets폴더에 복사해두세요)
const customerImages = [img1, img2, img3];

export function getRandomCustomerImage() {
  return customerImages[Math.floor(Math.random() * customerImages.length)];
}

// getRandomNormalOrder 함수 예시 (기존 구현 참고)
export function getRandomNormalOrder(menuList) {
  // 랜덤으로 1~3개 메뉴를 손님 주문으로 생성 (예)
  const count = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...menuList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(m => ({ name: m.name, qty: 1 }));
}
