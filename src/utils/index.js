export function bytesToMB(bytes, decimalPlaces = 1) {
  return (bytes / 1000000).toFixed(decimalPlaces) + " MB";
}
export function validateAddress(address) {
  const list = address.split(":");
  return (
    list.length !== 2 ||
    typeof Number(list[1]) !== "number" ||
    Number(list[1]) > 65535 ||
    Number(list[1]) < 0
  );
}
