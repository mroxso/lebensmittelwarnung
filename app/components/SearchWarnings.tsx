'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SearchWarningsProps {
  onSearch: (fromDate: string) => void;
}

export function SearchWarnings({ onSearch }: SearchWarningsProps) {
  const [fromDate, setFromDate] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(fromDate)
  }

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="fromDate">From Date</Label>
        <Input
          type="date"
          id="fromDate"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  )
}

