import { Search } from 'lucide-react'
import { useState } from 'react'

export default function SearchBar({ searchFilters, setSearchFilters }) {
  const [tagInput, setTagInput] = useState('')

  const handleAddTag = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const newTag = tagInput.trim()
      if (newTag && !searchFilters.tags.includes(newTag)) {
        setSearchFilters({
          ...searchFilters,
          tags: [...searchFilters.tags, newTag],
        })
        setTagInput('')
      }
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setSearchFilters({
      ...searchFilters,
      tags: searchFilters.tags.filter(tag => tag !== tagToRemove),
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">🔍 Пошук та фільтрування</h3>

      <div className="space-y-4">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Search className="inline mr-2 w-4 h-4" />
            Пошук по:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <select
                value={searchFilters.searchType}
                onChange={(e) => setSearchFilters({
                  ...searchFilters,
                  searchType: e.target.value,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="name">За назвою</option>
                <option value="description">За описом</option>
                <option value="tag">За тегом</option>
              </select>
            </div>
            <input
              type="text"
              value={searchFilters.query}
              onChange={(e) => setSearchFilters({
                ...searchFilters,
                query: e.target.value,
              })}
              placeholder="Введіть пошуковий запит..."
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={() => setSearchFilters({
                query: '',
                searchType: 'name',
                priority: null,
                tags: [],
              })}
              className="px-3 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg text-sm font-medium"
            >
              Очистити
            </button>
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Фільтр за пріоритетом:
          </label>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSearchFilters({
                ...searchFilters,
                priority: null,
              })}
              className={`px-3 py-1 rounded text-sm font-medium ${
                searchFilters.priority === null
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Всі
            </button>
            <button
              onClick={() => setSearchFilters({
                ...searchFilters,
                priority: 'high',
              })}
              className={`px-3 py-1 rounded text-sm font-medium ${
                searchFilters.priority === 'high'
                  ? 'bg-red-500 text-white'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              🔴 Високий
            </button>
            <button
              onClick={() => setSearchFilters({
                ...searchFilters,
                priority: 'medium',
              })}
              className={`px-3 py-1 rounded text-sm font-medium ${
                searchFilters.priority === 'medium'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              }`}
            >
              🟡 Середній
            </button>
            <button
              onClick={() => setSearchFilters({
                ...searchFilters,
                priority: 'low',
              })}
              className={`px-3 py-1 rounded text-sm font-medium ${
                searchFilters.priority === 'low'
                  ? 'bg-green-500 text-white'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              🟢 Низький
            </button>
          </div>
        </div>

        {/* Tag Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Фільтр за тегами:
          </label>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleAddTag}
            placeholder="Введіть тег та натисніть Enter"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mb-2"
          />
          <div className="flex flex-wrap gap-2">
            {searchFilters.tags.map((tag) => (
              <span
                key={tag}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                #{tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-purple-700 hover:text-purple-900 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
