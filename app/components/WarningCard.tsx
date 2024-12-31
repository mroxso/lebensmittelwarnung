import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Warning } from "../types/warnings"

export function WarningCard({ warning }: { warning: Warning }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{warning.title}</span>
          <Badge variant={warning._type === '.FoodWarning' ? 'default' : 'secondary'}>
            {warning._type === '.FoodWarning' ? 'FOOD' : 'PRODUCT'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          {warning.product?.imageUrls?.[0] && (
            <div className="w-full md:w-1/3">
              <Image
                src={warning.product.imageUrls[0]}
                alt={warning.product.designation || 'Product image'}
                width={300}
                height={300}
                className="rounded-lg object-cover"
              />
            </div>
          )}
          <div className="w-full md:w-2/3">
            <p className="text-sm text-gray-500 mb-2">
              Published: {new Date(warning.publishedDate).toLocaleDateString()}
            </p>
            {warning.warning && <p className="font-semibold mb-2">Warning: {warning.warning}</p>}
            {warning.product?.designation && <p className="mb-2">{warning.product.designation}</p>}
            {warning.product?.manufacturer && (
              <p className="text-sm mb-2">Manufacturer: {warning.product.manufacturer}</p>
            )}
            {warning.affectedStates && warning.affectedStates.length > 0 && (
              <div className="mb-2">
                <span className="font-semibold">Affected States: </span>
                {warning.affectedStates.join(', ')}
              </div>
            )}
            {warning.link && (
              <a href={warning.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                More Information
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

