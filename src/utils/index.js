export function bytesToMB(bytes, decimalPlaces = 1) {
  return (bytes / 1000000).toFixed(decimalPlaces) + " MB";
}
