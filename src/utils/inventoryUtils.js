export function deductInventory(inventory, orderList) {
  const newInv = { ...inventory };
  orderList.forEach(menu => {
    Object.entries(menu.ingredients).forEach(([ing, qty]) => {
      newInv[ing] = (newInv[ing] || 0) - (qty * menu.qty);
      if (newInv[ing] < 0) newInv[ing] = 0;
    });
  });
  return newInv;
}
