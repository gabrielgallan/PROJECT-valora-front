import { Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { CategoriesOverview } from "@/components/categories/types"

type CategoriesPageHeaderProps = {
  overview: CategoriesOverview
  onCreateClick: () => void
}

export function CategoriesPageHeader({ overview, onCreateClick }: CategoriesPageHeaderProps) {
  return (
    <Card className="h-full gap-0 bg-transparent py-0">
      <CardHeader className="gap-3 border-b px-4 py-4 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="text-2xl tracking-tight">Categories</CardTitle>
            <CardDescription>
              Organize transaction grouping with safe status and deletion controls.
            </CardDescription>
          </div>

          <Badge variant="secondary" className="shrink-0">
            {overview.total} total
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-center gap-4 px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={onCreateClick}>
            <Plus data-icon="inline-start" />
            Nova categoria
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Dica: inative categorias sem uso recente antes de considerar exclusao.
        </p>
      </CardContent>
    </Card>
  )
}
