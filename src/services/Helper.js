export const formatMoneyPtBr = (money) => {
  return money.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const formatDateTimePtBr = (dateTime) => {
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

export const getMimeType = (extension) => {
  switch (extension) {
    case ".jpg":
      return "image/jpeg";
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    default:
      return "application/octet-stream";
  }
};

export const getExtnsionFile = (mimeType) => {
  switch (mimeType) {
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
  }
};

export const validateEmail = (email) => {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const formatDate = (date) => {
  const [day, month, year] = date.split("/");

    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');

    return `${year}-${formattedMonth}-${formattedDay}`;
}

export const convertCurrencyToFloat = (currencyString) => {
  if(currencyString) {
    let cleanedString = currencyString.replace("R$", "").replace(".", "").replace(",", ".");
    return parseFloat(cleanedString);
  }

  return currencyString;
}