import { Calendar } from 'lucide-react'

export default function DateFilter({ dateFilter, setDateFilter }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        <Calendar className="inline mr-2 w-5 h-5" />
        Фільтр за датою
      </h3>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setDateFilter({
            type: 'all',
            startDate: null,
            endDate: null,
          })}
          className={`px-4 py-2 rounded font-medium transition ${
            dateFilter.type === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Всі справи
        </button>

        <button
          onClick={() => setDateFilter({
            type: 'day',
            startDate: null,
            endDate: null,
          })}
          className={`px-4 py-2 rounded font-medium transition ${
            dateFilter.type === 'day'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          📅 На день
        </button>

        <button
          onClick={() => setDateFilter({
            type: 'week',
            startDate: null,
            endDate: null,
          })}
          className={`px-4 py-2 rounded font-medium transition ${
            dateFilter.type === 'week'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          📆 На тиждень
        </button>

        <button
          onClick={() => setDateFilter({
            type: 'month',
            startDate: null,
            endDate: null,
          })}
          className={`px-4 py-2 rounded font-medium transition ${
            dateFilter.type === 'month'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          📊 На місяць
        </button>
      </div>

      {dateFilter.type !== 'all' && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
          {dateFilter.type === 'day' && '📌 Показуються справи на сьогодні'}
          {dateFilter.type === 'week' && '📌 Показуються справи на поточний тиждень'}
          {dateFilter.type === 'month' && '📌 Показуються справи на поточний місяць'}
        </div>
      )}
    </div>
  )
}
