'use client'

import { useState } from 'react'
import { WarningCard } from './WarningCard'
import { Button } from "@/components/ui/button"
import { Warning } from '../types/warnings'
import { fetchWarnings } from '../actions/fetchWarnings'

export function WarningList({ initialWarnings }: { initialWarnings: Warning[] }) {
  const [warnings, setWarnings] = useState<Warning[]>(initialWarnings)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    setLoading(true)
    try {
      const newWarnings = await fetchWarnings(page * 20)
      setWarnings(prevWarnings => [...prevWarnings, ...newWarnings])
      setPage(prevPage => prevPage + 1)
    } catch (error) {
      console.error('Failed to load more warnings:', error)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      {warnings.map(warning => (
        <WarningCard key={warning.id} warning={warning} />
      ))}
      <div className="flex justify-center">
        <Button onClick={loadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </Button>
      </div>
    </div>
  )
}

