export const formatMoneyPtBr = (money) => {
  return money.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const FormatDateTimePtBr = (dateTime) => {
  var data = new Date(dateTime);

  var dataFormatada = data.toLocaleString("pt-BR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return dataFormatada;
};
