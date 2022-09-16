export default function MinHelper(value = "", min_len = 0) {
  if (!min_len) return true;
  return value.length >= min_len;
}
