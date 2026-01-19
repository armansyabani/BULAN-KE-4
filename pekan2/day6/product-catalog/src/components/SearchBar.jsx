export default function SearchBar({ value, onChange }) {
  return (
    <div className="control">
      <label className="label" htmlFor="search">Search</label>
      <input
        id="search"
        className="input"
        type="text"
        placeholder="Cari produk..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}
