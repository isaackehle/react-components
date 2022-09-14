export default function SearchHelper({ value = "", min_search_len = 0 }) {
  const minHelper = () => {
    if (!min_search_len) return <></>;
    return <span className="search-value-min-len">(minimum of {min_search_len} characters)</span>;
  };

  return (
    <p>
      <span className="search-value-helper">Search value: '{value}'</span> {minHelper()}
    </p>
  );
}
