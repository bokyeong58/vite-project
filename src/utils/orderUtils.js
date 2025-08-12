export function getRandomCustomerImage() {
  const imgs = [
    '/img/customer1.png',
    '/img/customer2.png',
    '/img/customer3.png'
  ];
  return imgs[Math.floor(Math.random() * imgs.length)];
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
