// 커피, 논커피, 에이드, 베이커리 분류별 메뉴 및 이미지 (경로는 public/assets 또는 src/assets 등 사이트 환경에 맞게 조정 필요)
const menuList = [
  // 커피
  { name: "아메리카노", price: 3000, category: "coffee", img:"/assets/americano.jpg", ingredients: { 원두: 1, 물: 1 } },
  { name: "바닐라라떼", price: 4000, category: "coffee", img:"/assets/vanilla_latte.jpg", ingredients: { 원두: 1, 우유: 1, 바닐라시럽: 1 } },
  { name: "돌체라떼", price: 4500, category: "coffee", img:"/assets/dolce_latte.jpg", ingredients: { 원두: 1, 우유: 1, 연유: 1 } },
  { name: "큰 아메리카노", price: 5000, category: "coffee", img:"/assets/americano_large.jpg", ingredients: { 원두: 2, 물: 2 } },
  { name: "큰 바닐라라떼", price: 6000, category: "coffee", img:"/assets/vanilla_latte_large.jpg", ingredients: { 원두: 2, 우유: 2, 바닐라시럽: 2 } },
  { name: "큰 돌체라떼", price: 6500, category: "coffee", img:"/assets/dolce_latte_large.jpg", ingredients: { 원두: 2, 우유: 2, 연유: 2 } },

  // 논커피
  { name: "딸기라떼", price: 3500, category: "noncoffee", img:"/assets/strawberry_latte.jpg", ingredients: { 딸기: 1, 우유: 1 } },
  { name: "바나나라떼", price: 3500, category: "noncoffee", img:"/assets/banana_latte.jpg", ingredients: { 바나나: 1, 우유: 1 } },
  { name: "녹차라떼", price: 3500, category: "noncoffee", img:"/assets/green_tea_latte.jpg", ingredients: { 녹차파우더: 1, 우유: 1 } },
  { name: "복숭아아이스티", price: 3000, category: "noncoffee", img:"/assets/peach_ice_tea.jpg", ingredients: { 복숭아시럽: 1, 물: 1 } },
  { name: "큰 딸기라떼", price: 4500, category: "noncoffee", img:"/assets/strawberry_latte_large.jpg", ingredients: { 딸기: 2, 우유: 2 } },
  { name: "큰 바나나라떼", price: 4500, category: "noncoffee", img:"/assets/banana_latte_large.jpg", ingredients: { 바나나: 2, 우유: 2 } },
  { name: "큰 녹차라떼", price: 4500, category: "noncoffee", img:"/assets/green_tea_latte_large.jpg", ingredients: { 녹차파우더: 2, 우유: 2 } },

  // 에이드
  { name: "청포도에이드", price: 4000, category: "ade", img:"/assets/green_grape_ade.jpg", ingredients: { 청포도베이스: 1, 탄산수: 1 } },
  { name: "청사과에이드", price: 4000, category: "ade", img:"/assets/green_apple_ade.jpg", ingredients: { 청사과베이스: 1, 탄산수: 1 } },
  { name: "자몽에이드", price: 4000, category: "ade", img:"/assets/grapefruit_ade.jpg", ingredients: { 자몽베이스: 1, 탄산수: 1 } },
  { name: "레몬에이드", price: 4000, category: "ade", img:"/assets/lemon_ade.jpg", ingredients: { 레몬베이스: 1, 탄산수: 1 } },
  { name: "망고에이드", price: 4500, category: "ade", img:"/assets/mango_ade.jpg", ingredients: { 망고베이스: 1, 탄산수: 1 } },

  // 베이커리
  { name: "초코크레이프", price: 3500, category: "bakery", img:"/assets/choco_crepe.jpg", ingredients: { 계란: 1, 코코아파우더: 1, 우유: 1 } },
  { name: "핫도그", price: 4500, category: "bakery", img:"/assets/hotdog.jpg", ingredients: { 계란: 1, 소시지: 1, 우유: 1 } },
  { name: "롤케익", price: 5000, category: "bakery", img:"/assets/roll_cake.jpg", ingredients: { 계란: 2, 생크림: 1, 우유: 1 } },
  { name: "큰 초코크레이프", price: 6500, category: "bakery", img:"/assets/choco_crepe_large.jpg", ingredients: { 계란: 2, 코코아파우더: 2, 우유: 2 } },
  { name: "큰 핫도그", price: 7000, category: "bakery", img:"/assets/hotdog_large.jpg", ingredients: { 계란: 2, 소시지: 2, 우유: 2 } },
  { name: "큰 롤케익", price: 8000, category: "bakery", img:"/assets/roll_cake_large.jpg", ingredients: { 계란: 2, 생크림: 2, 우유: 2 } }
];

export default menuList;
