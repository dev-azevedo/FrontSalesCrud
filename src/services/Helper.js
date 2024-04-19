export const formatMoney = (money) => {
  return money.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};
