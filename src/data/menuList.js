// 커피, 논커피, 에이드, 베이커리 분류별 메뉴 및 이미지 (경로는 public/assets 또는 src/assets 등 사이트 환경에 맞게 조정 필요)
const menuList = [
  // 커피
  { name: "아메리카노", price: 3000, category: "coffee", img:"https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/10/%E1%84%8B%E1%85%A1%E1%84%86%E1%85%A6%E1%84%85%E1%85%B5%E1%84%8F%E1%85%A1%E1%84%82%E1%85%A9-1280x1280-1.jpg", ingredients: { 원두: 1, 물: 1 } },
  { name: "바닐라라떼", price: 4000, category: "coffee", img:"https://ecimg.cafe24img.com/pg299b34409484036/baekih1001/web/product/big/20240412/b00b232c5bd19efac07075916bf66f4e.jpg", ingredients: { 원두: 1, 우유: 1, 바닐라시럽: 1 } },
  { name: "돌체라떼", price: 4500, category: "coffee", img:"https://image.istarbucks.co.kr/upload/store/skuimg/2025/06/[128695]_20250626095652050.jpg", ingredients: { 원두: 1, 우유: 1, 연유: 1 } },
  { name: "큰 아메리카노", price: 5000, category: "coffee", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6n9pwuu4WP_E_PJMz4S5wvJHHLnbr7san1TdGPebyrlp-T1bv_TtnwONmm9b-trOnSio&usqp=CAU", ingredients: { 원두: 2, 물: 2 } },
  { name: "큰 바닐라라떼", price: 6000, category: "coffee", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4d7nk-mJIf6jqnL7gx9YTMX_IgadPB-1xrQ&s", ingredients: { 원두: 2, 우유: 2, 바닐라시럽: 2 } },
  { name: "큰 돌체라떼", price: 6500, category: "coffee", img:"https://image2.lotteimall.com/goods/80/47/49/1370494780_1.jpg/dims/resizemc/550x550/optimize", ingredients: { 원두: 2, 우유: 2, 연유: 2 } },

  // 논커피
  { name: "딸기라떼", price: 3500, category: "noncoffee", img:"https://sitem.ssgcdn.com/65/51/75/item/1000535755165_i1_750.jpg", ingredients: { 딸기: 1, 우유: 1 } },
  { name: "바나나라떼", price: 3500, category: "noncoffee", img:"https://www.yogerpresso.co.kr/upload/all_menu/202302/1676002011_m0139496_20230210130651.jpg", ingredients: { 바나나: 1, 우유: 1 } },
  { name: "녹차라떼", price: 3500, category: "noncoffee", img:"https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2025/03/%EC%95%84%EC%9D%B4%EC%8A%A4%EB%85%B9%EC%B0%A8%EB%9D%BC%EB%96%BC-%EC%8D%B8%EB%84%AC.jpg", ingredients: { 녹차파우더: 1, 우유: 1 } },
  { name: "복숭아아이스티", price: 3000, category: "noncoffee", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjYjW-R3Xyas6aOs3WP95WU2Z9pVwiAyXvBg&s", ingredients: { 복숭아시럽: 1, 물: 1 } },
  { name: "큰 딸기라떼", price: 4500, category: "noncoffee", img:"https://item.elandrs.com/upload/prd/orgimg/617/2211493617_0000001.jpg?w=750&h=&q=100", ingredients: { 딸기: 2, 우유: 2 } },
  { name: "큰 바나나라떼", price: 4500, category: "noncoffee", img:"https://mcdn.twosome.co.kr/menu_image/P_MA_Z_TSPLC_MENU_REG/1000/1000/PITEM/10191981_01_01_20240924093738.jpg?width=600&height=600&q=100", ingredients: { 바나나: 2, 우유: 2 } },
  { name: "큰 녹차라떼", price: 4500, category: "noncoffee", img:"https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/201008-%E1%84%8B%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%E1%84%82%E1%85%A9%E1%86%A8%E1%84%8E%E1%85%A1%E1%84%85%E1%85%A1%E1%84%84%E1%85%A6ice-1280x1280.jpg", ingredients: { 녹차파우더: 2, 우유: 2 } },

  // 에이드
  { name: "청포도에이드", price: 4000, category: "ade", img:"https://www.biz-con.co.kr/upload/images/202209/400_20220913183235364_%EC%B2%AD%ED%8F%AC%EB%8F%84%EC%97%90%EC%9D%B4%EB%93%9C-ICE.jpg", ingredients: { 청포도베이스: 1, 탄산수: 1 } },
  { name: "청사과에이드", price: 4000, category: "ade", img:"https://cdn.imweb.me/upload/S201904245cbfeaeb57b7d/05ae2f2e8fad7.jpg", ingredients: { 청사과베이스: 1, 탄산수: 1 } },
  { name: "자몽에이드", price: 4000, category: "ade", img:"https://thebreadbag.co.kr/wp-content/uploads/2025/06/%EB%B9%B5%EB%B0%B1%ED%99%94%EC%A0%90-%EC%9E%90%EB%AA%BD%EC%97%90%EC%9D%B4%EB%93%9C.jpg", ingredients: { 자몽베이스: 1, 탄산수: 1 } },
  { name: "레몬에이드", price: 4000, category: "ade", img:"https://ynpoint.com/web/product/big/202302/4a42a1bd4cfecc22b703f53fea4dc84e.jpg", ingredients: { 레몬베이스: 1, 탄산수: 1 } },
  { name: "망고에이드", price: 4500, category: "ade", img:"https://media.sodagift.com/img/image/1736131480921.jpg", ingredients: { 망고베이스: 1, 탄산수: 1 } },

  // 베이커리
  { name: "초코크레이프", price: 3500, category: "bakery", img:"https://www.dessertco.co.kr/data/item/1705633940/thumb-KakaoTalk_Photo_20240119121257_450x450.jpg", ingredients: { 계란: 1, 코코아파우더: 1, 우유: 1 } },
  { name: "핫도그", price: 4500, category: "bakery", img:"https://www.yakup.com/data/editor/news/202107/LrJ7tUF34JsL.jpg", ingredients: { 계란: 1, 소시지: 1, 우유: 1 } },
  { name: "롤케익", price: 5000, category: "bakery", img:"https://img3.yna.co.kr/etc/inner/KR/2018/11/16/AKR20181116036700030_01_i_P4.jpg", ingredients: { 계란: 2, 생크림: 1, 우유: 1 } },
  { name: "큰 초코크레이프", price: 6500, category: "bakery", img:"https://goldenbrown.co.kr/uploaded/shop_good/180/6a9e6397dd5c0943c0c17039ecc956c00.jpg", ingredients: { 계란: 2, 코코아파우더: 2, 우유: 2 } },
  { name: "큰 핫도그", price: 7000, category: "bakery", img:"https://img.siksinhot.com/place/1482805238791188.jpg", ingredients: { 계란: 2, 소시지: 2, 우유: 2 } },
  { name: "큰 롤케익", price: 8000, category: "bakery", img:"https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2025/06/%EC%8B%A4%ED%82%A4%EB%A1%A4%EC%BC%80%EC%9D%B5-%EC%8D%B8%EB%84%AC2.jpg", ingredients: { 계란: 2, 생크림: 2, 우유: 2 } }
];

export default menuList;
