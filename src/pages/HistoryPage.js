import { useDispatch, useSelector } from 'react-redux';
import HistoryConvertion from '../components/HistoryConversion';
import { MdDelete } from 'react-icons/md';
import { deleteSelectedConversions, toggleAllSelectedConversions } from '../store';
import Button from '../components/Button';

function HistoryPage() {
  const dispatch = useDispatch();
  const { allConversions, selectedConversions } = useSelector((state) => state.historyReducer);

  const renderedConversions = allConversions.toReversed().map((conversion) =>
    <HistoryConvertion key={conversion.date} converter={conversion.converter}
      date={conversion.date} result={conversion.result} link={conversion.link} />)

  return (
    <div className="grow px-4 py-10 overflow-hidden">
      <div className="flex flex-col max-h-full p-4 space-y-3 rounded-2xl shadow-md overflow-auto">
        {(allConversions.length > 0) ?
          <><div className="flex justify-between items-center mb-2">
            <Button onClick={() => dispatch(toggleAllSelectedConversions())}>
              <span>{(selectedConversions.length === 0) ? 'Select all' : 'Deselect all'}</span>
            </Button>

            <button className="p-2 bg-neutral-2 rounded-full" onClick={() => dispatch(deleteSelectedConversions())}>
              <MdDelete className="w-6 h-6" />
            </button>
          </div>

            {renderedConversions}</>
          : <p className="text-center font-bold text-neutral-3">You haven't made any conversions</p>}
      </div>
    </div>
  );
}

export default HistoryPage;
