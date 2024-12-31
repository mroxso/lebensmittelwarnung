import Image from 'next/image'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Warning } from "../types/warnings"

export function WarningCard({ warning }: { warning: Warning }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-lg">{warning.title}</span>
          <Badge variant={warning._type === '.FoodWarning' ? 'default' : 'secondary'}>
            {warning._type === '.FoodWarning' ? 'FOOD' : 'PRODUCT'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col gap-4 h-full">
          {warning.product?.imageUrls?.[0] && (
            <div className="w-full">
              <Image
                src={warning.product.imageUrls[0]}
                alt={warning.product.designation || 'Product image'}
                width={300}
                height={300}
                className="rounded-lg object-cover w-full h-48"
              />
            </div>
          )}
          <div className="space-y-2 flex-grow">
            <p className="text-sm text-gray-500">
              Published: {new Date(warning.publishedDate).toLocaleDateString()}
            </p>
            {warning.warning && <p className="font-semibold">Warning: {warning.warning}</p>}
            {warning.product?.designation && <p>{warning.product.designation}</p>}
            {warning.product?.manufacturer && (
              <p className="text-sm">Manufacturer: {warning.product.manufacturer}</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/warning/${warning.id}`} className="w-full">
          <Button variant="outline" className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

