import { fetchWarnings } from './actions/fetchWarnings'
import { WarningList } from './components/WarningList'

export default async function Home() {
  const initialWarnings = await fetchWarnings()

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">Lebensmittelwarnung</h1>
      <p className="text-xl mb-8">Aktuelle Lebensmittel- und Produktwarnungen</p>
      <WarningList initialWarnings={initialWarnings} />
    </main>
  )
}

