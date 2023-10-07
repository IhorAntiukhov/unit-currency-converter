import classNames from 'classnames';

function Input({ value, onChange, type, placeholder, icon }) {
  const handleInput = (event) => {
    if ((event.target.value).match(/^[0-9]*\.?[0-9]*$/)) {
      onChange(event.target.value);
    }
  };

  const inputClass = classNames('flex', 'justify-between', 'items-center', 'w-full', 'space-x-2',
    'px-3', 'py-2', 'bg-neutral-2', 'rounded-full', 'duration-200', 'focus-within:bg-neutral-4');

  return (
    <div className={inputClass}>
      {icon}
      <input className="grow text-xl bg-[transparent] outline-none" value={value}
        onInput={handleInput} type={type} placeholder={placeholder} />
    </div>
  );
}

export default Input;
