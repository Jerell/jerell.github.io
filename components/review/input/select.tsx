export default function Select({
  label,
  options,
  update,
}: {
  label: string;
  options: string[];
  update: (s: string) => void;
}) {
  function handleChange(e) {
    update(e.target.value);
  }

  return (
    <div className='text-sm'>
      <select
        name={label}
        className='outline-none w-full p-0.5 text-j-blue'
        onChange={(e) => handleChange(e)}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
