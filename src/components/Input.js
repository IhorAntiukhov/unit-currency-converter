import classNames from 'classnames';

function Input({ value, onChange, type, placeholder, icon }) {
  const inputClass = classNames('flex', 'justify-between', 'items-center', 'w-full', 'grow',
    'px-3', 'py-2', 'bg-neutral-2', 'rounded-full', 'duration-200', 'focus-within:bg-neutral-4',
    { 'space-x-2 px-3': !!icon, 'px-4': !icon });

  return (
    <div className={inputClass}>
      {icon}
      <input className="grow text-xl bg-[transparent] outline-none" value={value}
        onInput={(event) => onChange(event.target.value)} type={type} placeholder={placeholder} />
    </div>
  );
}

export default Input;
