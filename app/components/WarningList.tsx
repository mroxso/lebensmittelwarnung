'use client'

import { useState, useEffect } from 'react'
import { WarningCard } from './WarningCard'
import { SearchWarnings } from './SearchWarnings'
import { Button } from "@/components/ui/button"
import { Warning } from '../types/warnings'
import { fetchWarnings } from '../actions/fetchWarnings'

export function WarningList({ initialWarnings }: { initialWarnings: Warning[] }) {
  const [warnings, setWarnings] = useState<Warning[]>(initialWarnings)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [fromDate, setFromDate] = useState<string | undefined>(undefined)

  const loadWarnings = async (reset: boolean = false) => {
    setLoading(true)
    try {
      const newWarnings = await fetchWarnings(reset ? 0 : page * 20, fromDate)
      setWarnings(reset ? newWarnings : prevWarnings => [...prevWarnings, ...newWarnings])
      setPage(reset ? 1 : prevPage => prevPage + 1)
    } catch (error) {
      console.error('Failed to load warnings:', error)
    }
    setLoading(false)
  }

  const handleSearch = (newFromDate: string) => {
    setFromDate(newFromDate)
  }

  useEffect(() => {
    loadWarnings(true)
  }, [fromDate])

  return (
    <div className="space-y-8">
      <SearchWarnings onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warnings.map(warning => (
          <WarningCard key={warning.id} warning={warning} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button onClick={() => loadWarnings()} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </Button>
      </div>
    </div>
  )
}

