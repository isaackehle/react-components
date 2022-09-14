export default function MinHelper(value = "", min_search_len = 0) {
  if (!min_search_len) return true;
  return value.length >= min_search_len;
}
