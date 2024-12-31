import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Warning } from "../types/warnings"

export function WarningCard({ warning }: { warning: Warning }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{warning.title}</span>
          <Badge variant={warning.type === 'FOOD' ? 'default' : 'secondary'}>
            {warning.type}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-2">
          Published: {new Date(warning.publishedDate).toLocaleDateString()}
        </p>
        <p>{warning.text}</p>
      </CardContent>
    </Card>
  )
}

