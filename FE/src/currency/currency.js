import dayjs from "dayjs";

export const formatMoneyToVND = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
export function formatDateVN(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day} tháng ${month}, ${year}`;
}
export function formatTimeRange(isoString) {
  if (!isoString) return "Đang cập nhật";
  const start = dayjs(isoString);
  if (!start.isValid()) return "Đang cập nhật";
  const end = start.add(4, "hour");

  const timeRange = `${start.format("HH:mm")} - ${end.format("HH:mm")}`;
  const dateStr = start.format("DD [Tháng] MM, YYYY");

  return `${timeRange}, ${dateStr}`;
}
