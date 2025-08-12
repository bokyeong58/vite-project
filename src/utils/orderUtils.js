import img1 from '../assets/celeb1.jpg';
import img2 from '../assets/celeb1.jpg';
import img3 from '../assets/celeb3.jng';

const customerImages = [img1, img2, img3];

export function getRandomCustomerImage() {
  const randomIndex = Math.floor(Math.random() * customerImages.length);
  return customerImages[randomIndex];
}



export function getRandomNormalOrder(menuList) {
  const count = 1 + Math.floor(Math.random() * 3); // 1~3종류
  const orders = [];
  const menuCopy = [...menuList];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * menuCopy.length);
    const menu = menuCopy.splice(idx, 1)[0];
    const qty = 1 + Math.floor(Math.random() * 3);
    orders.push({ name: menu.name, qty });
  }
  return orders;
}
