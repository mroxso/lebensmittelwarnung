import Image from 'next/image'
import Link from 'next/link'
import { Warning } from '@/types/warnings'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function WarningDetails({ warning }: { warning: Warning }) {
  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/" className="mb-4 inline-block">
        <Button variant="outline">← Back to all warnings</Button>
      </Link>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span>{warning.title}</span>
            <Badge variant={warning._type === '.FoodWarning' ? 'default' : 'secondary'}>
              {warning._type === '.FoodWarning' ? 'FOOD' : 'PRODUCT'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            {warning.product?.imageUrls?.[0] && (
              <div className="w-full md:w-1/3">
                <Image
                  src={warning.product.imageUrls[0]}
                  alt={warning.product.designation || 'Product image'}
                  width={400}
                  height={400}
                  className="rounded-lg object-cover w-full"
                />
              </div>
            )}
            <div className="w-full md:w-2/3 space-y-4">
              <p className="text-lg">
                <span className="font-semibold">Published:</span> {new Date(warning.publishedDate).toLocaleDateString()}
              </p>
              {warning.warning && (
                <p className="text-lg">
                  <span className="font-semibold">Warning:</span> {warning.warning}
                </p>
              )}
              {warning.product?.designation && (
                <p className="text-lg">
                  <span className="font-semibold">Product:</span> {warning.product.designation}
                </p>
              )}
              {warning.product?.manufacturer && (
                <p className="text-lg">
                  <span className="font-semibold">Manufacturer:</span> {warning.product.manufacturer}
                </p>
              )}
              {warning.affectedStates && warning.affectedStates.length > 0 && (
                <div>
                  <p className="font-semibold text-lg">Affected States:</p>
                  <ul className="list-disc list-inside">
                    {warning.affectedStates.map((state, index) => (
                      <li key={index}>{state}</li>
                    ))}
                  </ul>
                </div>
              )}
              {warning.link && (
                <p>
                  <a href={warning.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    More Information
                  </a>
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

