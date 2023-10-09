import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { BiDollar } from 'react-icons/bi';
import { MdSwapHoriz, MdArrowForward, MdWarning } from 'react-icons/md';
import { setAmount, setExchangeRatesDate, setFromCurrency, setToCurrency, showNotification, swapCurrencies, useGetExchangeRatesQuery } from '../store';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';
import Button from '../components/Button';
import CURRENCIES from '../currencies';
import SeparatedInput from '../components/SeparatedInput';

function CurrencyPage() {
  const dispatch = useDispatch();
  const { fromCurrency, toCurrency, amount, exchangeRatesDate } = useSelector((state) => state.currencyReducer);
  const [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    if (searchParams.has('from')) {
      if (searchParams.get('from') !== fromCurrency) dispatch(setFromCurrency(searchParams.get('from')));
      if (searchParams.get('to') !== toCurrency) dispatch(setToCurrency(searchParams.get('to')));
      if (searchParams.get('amount') !== amount) dispatch(setAmount(searchParams.get('amount')));
      if (searchParams.get('date') !== exchangeRatesDate) dispatch(setExchangeRatesDate({ property: 'date', value: searchParams.get('date') }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, error, isLoading } = useGetExchangeRatesQuery(
    { base: searchParams.get('from'), currency: searchParams.get('to'), date: searchParams.get('date') },
    { skip: !searchParams.get('from') }
  );

  const formatedDate = (exchangeRatesDate.year || exchangeRatesDate.month || exchangeRatesDate.day) ?
    `${exchangeRatesDate.year}-${(exchangeRatesDate.month).padStart(2, '0')}-${(exchangeRatesDate.day).padStart(2, '0')}` : '';

  const handleConvert = () => {
    if (amount <= 0 || amount === '') {
      dispatch(showNotification('Enter currency amount'));
      return;
    }

    if (toCurrency === fromCurrency) {
      dispatch(showNotification('Currencies must be different'));
      return;
    }

    setSearchParams({
      from: fromCurrency, to: toCurrency, amount, date: formatedDate
    });
  };

  const unsyncedChanges = (
    (searchParams.get('to') !== toCurrency || searchParams.get('from') !== fromCurrency ||
      searchParams.get('amount') !== amount || searchParams.get('date') !== formatedDate)
    && searchParams.has('amount')
  );

  let result = '';
  if (!!searchParams.get('date')) {
    if (data?.data?.[searchParams.get('date')]?.[searchParams.get('to')]) {
      if (error) {
        result = 'Failed to convert currency';
      } else if (isLoading) {
        result = 'Converting currency ...';
      } else {
        result = (searchParams.get('amount') * data.data[searchParams.get('date')][searchParams.get('to')]).toFixed(2);
      }
    }
  } else {
    if (data?.data?.[searchParams.get('to')]) {
      if (error) {
        result = 'Failed to convert currency';
      } else if (isLoading) {
        result = 'Converting currency ...';
      } else {
        result = (searchParams.get('amount') * data.data[searchParams.get('to')]).toFixed(2);
      }
    }
  }

  return (
    <div className="px-4 py-10">
      <div className="p-4 rounded-2xl shadow-md">
        <p className="-mx-4 mb-5 pb-2 text-lg text-center font-bold border-b-[1.5px] border-neutral-2">
          {(searchParams.has('amount')) ?
            `${searchParams.get('amount')} ${searchParams.get('from')} = ${result} ${searchParams.get('to')}` :
            <span className="text-neutral-3">Currency not converted</span>}
        </p>

        <Input value={amount} onChange={(text) => dispatch(setAmount(text))}
          type="number" placeholder="Enter amount ..." icon={<BiDollar className="w-6 h-6" />} />
        <SeparatedInput />

        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 mt-2 mb-4">
          <Dropdown value={fromCurrency} onChange={(currency) => dispatch(setFromCurrency(currency))} options={CURRENCIES} />
          <button className="p-2 bg-neutral-2 rounded-full" onClick={() => dispatch(swapCurrencies())}>
            <MdSwapHoriz className="w-6 h-6" />
          </button>
          <Dropdown value={toCurrency} onChange={(currency) => dispatch(setToCurrency(currency))} options={CURRENCIES} alignRight />
        </div>

        <Button className="w-full" onClick={handleConvert}>
          <span>Convert</span>
          <MdArrowForward className="w-6 h-6" />
        </Button>
      </div>

      {unsyncedChanges &&
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <MdWarning className="w-6 h-6" />
          <p className="font-bold">Unsynced changes</p>
        </div>}
    </div>
  );
}

export default CurrencyPage;
