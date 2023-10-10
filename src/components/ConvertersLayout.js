import { Link, Outlet } from 'react-router-dom';
import { FaRuler, FaWeightHanging } from 'react-icons/fa';
import { FaTemperatureHalf, FaClock, FaDatabase, FaBolt } from 'react-icons/fa6';
import { LuMoveDiagonal } from 'react-icons/lu';
import { WiBarometer } from 'react-icons/wi';
import { IoSpeedometer } from 'react-icons/io5';
import classNames from 'classnames';

function ConvertersLayout() {
  const converters = [
    { name: 'Length', icon: <FaRuler className="w-8 h-8" /> },
    { name: 'Mass', icon: <FaWeightHanging className="w-8 h-8" /> },
    { name: 'Temperature', icon: <FaTemperatureHalf className="w-8 h-8" /> },
    { name: 'Area', icon: <LuMoveDiagonal className="w-8 h-8" /> },
    {
      name: 'Pressure', icon: <div className="relative w-8 h-8">
        <WiBarometer className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3.6rem] h-[3.6rem]" />
      </div>
    },
    { name: 'Time', icon: <FaClock className="w-8 h-8" /> },
    { name: 'Speed', icon: <IoSpeedometer className="w-8 h-8" /> },
    { name: 'Data', icon: <FaDatabase className="w-8 h-8" /> },
    { name: 'Voltage', icon: <FaBolt className="w-8 h-8" /> },
  ];

  const linkClass = classNames(
    'flex', 'flex-col', 'justify-center', 'items-center', 'space-y-3', 'aspect-square',
    'bg-gradient-to-b', 'from-neutral-2', 'to-neutral-4', 'rounded-xl', 'shadow-md', 'shadow-neutral-2'
  );

  const renderedLinks = converters.map((converter) => (
    <Link to={`/units/${converter.name.toLowerCase()}`} key={converter.name}>
      <div className={linkClass}>
        {converter.icon}
        <p className="text-lg">{converter.name}</p>
      </div>
    </Link>
  ));

  return (
    <div className="px-4 py-10 space-y-4">
      <Outlet />
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(6.8rem,_1fr))] gap-3">
        {renderedLinks}
      </div>
    </div>
  );
}

export default ConvertersLayout;
