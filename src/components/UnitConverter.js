import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { MdSwapHoriz } from 'react-icons/md';
import Input from './Input';
import Dropdown from './Dropdown';
import converters from '../converters';
import { addConversion } from '../store';

function UnitConverter() {
  const { converter } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    to: 0,
    from: 0,
    fromUnit: converters[converter].default,
    toUnit: converters[converter].default,
    accurate: false
  });

  const dispatch = useDispatch();
  const [flipButton, setFlipButton] = useState(false);

  const toFixed = (number) => {
    if (searchParams.get('accurate') !== 'true') return parseFloat(number.toFixed(3))
    return number;
  }

  const saveToHistory = (from, to, fromUnit, toUnit) => {
    const now = new Date();
    const result = `${from} ${fromUnit} = ${to} ${toUnit}`;
    const searchParamsLink = `from=${from}&to=${to}&fromUnit=${fromUnit}&toUnit=${toUnit}`;

    dispatch(addConversion(
      {
        converter: converter[0].toUpperCase() + converter.slice(1),
        date: now.getTime(),
        result,
        link: `/units/${converter}?${searchParamsLink}`
      }
    ));
  }

  const swapUnits = () => {
    let to;
    if (converter === 'temperature') {
      to = toFixed(converters[converter].convert(searchParams.get('from'), searchParams.get('toUnit'), searchParams.get('fromUnit')));
    } else {
      to = toFixed(
        Number(searchParams.get('from')) *
        (1 / converters[converter].rate[searchParams.get('toUnit')]) *
        converters[converter].rate[searchParams.get('fromUnit')]);
    }

    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      fromUnit: searchParams.get('toUnit'),
      toUnit: searchParams.get('fromUnit'),
      to
    });
    saveToHistory(searchParams.get('from'), to, searchParams.get('toUnit'), searchParams.get('fromUnit'));
  }

  const toggleAccuracy = () => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      accurate: (searchParams.get('accurate') === 'true') ? false : true
    });

    setFlipButton(true);
    setTimeout(() => setFlipButton(false), 600);
  }

  const convertFirstUnit = (text) => {
    let result;
    if (converter === 'temperature') {
      result = toFixed(converters[converter].convert(Number(text), searchParams.get('fromUnit'), searchParams.get('toUnit')));
    } else {
      result = toFixed(
        Number(text) * (1 / converters[converter].rate[searchParams.get('fromUnit')]) *
        converters[converter].rate[searchParams.get('toUnit')]);
    }

    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      from: text,
      to: result
    });
    saveToHistory(text, result, searchParams.get('fromUnit'), searchParams.get('toUnit'));
  }

  const changeFirstUnit = (unit) => {
    let result;
    if (converter === 'temperature') {
      result = toFixed(converters[converter].convert(Number(searchParams.get('from')), unit, searchParams.get('toUnit')));
    } else {
      result = toFixed(
        Number(searchParams.get('from')) *
        (1 / converters[converter].rate[unit]) *
        converters[converter].rate[searchParams.get('toUnit')]);
    }

    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      fromUnit: unit,
      to: result
    });
    saveToHistory(searchParams.get('fromUnit'), result, unit, searchParams.get('toUnit'));
  }

  const convertSecondUnit = (text) => {
    let result;
    if (converter === 'temperature') {
      result = toFixed(converters[converter].convert(Number(text), searchParams.get('toUnit'), searchParams.get('fromUnit')));
    } else {
      result = toFixed(
        Number(text) * (1 / converters[converter].rate[searchParams.get('toUnit')]) *
        converters[converter].rate[searchParams.get('fromUnit')]);
    }

    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      to: text,
      from: result
    });
    saveToHistory(result, text, searchParams.get('fromUnit'), searchParams.get('toUnit'));
  }

  const changeSecondUnit = (unit) => {
    let result;
    if (converter === 'temperature') {
      result = toFixed(converters[converter].convert(searchParams.get('from'), searchParams.get('fromUnit'), unit));
    } else {
      result = toFixed(
        Number(searchParams.get('from')) *
        (1 / converters[converter].rate[searchParams.get('fromUnit')]) *
        converters[converter].rate[unit]);
    }

    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      toUnit: unit,
      to: result
    });
    saveToHistory(searchParams.get('from'), result, searchParams.get('fromUnit'), unit);
  }

  const buttonClass = classNames('px-3', 'py-2', 'bg-neutral-2', 'rounded-full',
    { 'animate-flip-button': flipButton });

  return (
    <div className="flex flex-col space-y-2 -mx-4 px-4 pb-4 border-b-[1.5px] border-neutral-2">
      <div className="flex justify-center space-x-2">
        <button className="p-2 bg-neutral-2 rounded-full" onClick={swapUnits}>
          <MdSwapHoriz className="w-6 h-6" />
        </button>

        <button className={buttonClass} onClick={toggleAccuracy}>
          {(searchParams.get('accurate') === 'true') ? 'High accuracy' : 'Low accuracy'}
        </button>
      </div>

      <div className="flex space-x-2">
        <Input value={searchParams.get('from')} onChange={(text) => convertFirstUnit(text)} type="number" placeholder="Enter value ..." />
        <Dropdown value={searchParams.get('fromUnit')} onChange={(unit) => changeFirstUnit(unit)} options={converters[converter].units} alignRight units />
      </div>

      <div className="flex space-x-2">
        <Input value={searchParams.get('to')} onChange={(text) => convertSecondUnit(text)} type="number" placeholder="Enter value ..." />
        <Dropdown value={searchParams.get('toUnit')} onChange={(unit) => changeSecondUnit(unit)} options={converters[converter].units} alignRight units />
      </div>
    </div>
  );
}

export default UnitConverter;