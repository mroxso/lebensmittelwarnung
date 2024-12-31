import { fetchWarnings } from './actions/fetchWarnings'
import { WarningList } from './components/WarningList'

export default async function Home() {
  const initialWarnings = await fetchWarnings()

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Lebensmittelwarnung</h1>
      <WarningList initialWarnings={initialWarnings} />
    </main>
  )
}

