import { fetchWarnings } from '@/actions/fetchWarnings'
import { WarningDetails } from '@/components/WarningDetails'
import { Warning } from '@/types/warnings'

export default async function WarningPage({ params }: { params: { id: string } }) {
  const warnings = await fetchWarnings()
  const warning = warnings.find(w => w.id.toString() === params.id)

  if (!warning) {
    return <div>Warning not found</div>
  }

  return <WarningDetails warning={warning} />
}

