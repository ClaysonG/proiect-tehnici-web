exports.convertDate = (date) => {
  let processedDate = "";
  const weekDays = [
    "duminica",
    "luni",
    "marti",
    "miercuri",
    "joi",
    "vineri",
    "sambata",
  ];
  const weekDay = weekDays[new Date(date).getDay()];
  const day = new Date(date).getDate();
  const months = [
    "ianuarie",
    "februarie",
    "martie",
    "aprilie",
    "mai",
    "iunie",
    "iulie",
    "august",
    "septembrie",
    "octombrie",
    "noiembrie",
    "decembrie",
  ];
  const month = months[new Date(date).getMonth()];
  const year = new Date(date).getFullYear();
  processedDate = `${weekDay}, ${day} ${month} ${year}`;
  return processedDate;
};
