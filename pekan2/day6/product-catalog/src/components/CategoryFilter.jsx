const CATEGORY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "electronics", label: "Electronics" },
  { value: "jewelery", label: "Jewelery" },
  { value: "men's clothing", label: "Men’s Clothing" },
  { value: "women's clothing", label: "Women’s Clothing" },
];

export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="control">
      <label className="label" htmlFor="category">Category</label>
      <select
        id="category"
        className="select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {CATEGORY_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
