import { FolderOpen, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type CategoriesEmptyStateProps = {
  onCreateClick: () => void
}

export function CategoriesEmptyState({ onCreateClick }: CategoriesEmptyStateProps) {
  return (
    <Card className="border-dashed py-8">
      <CardHeader className="items-center gap-2 text-center">
        <FolderOpen className="size-6 text-muted-foreground" />
        <CardTitle>Nenhuma categoria cadastrada</CardTitle>
        <CardDescription>
          Crie a primeira categoria para organizar suas transacoes e relatarios.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center">
        <Button onClick={onCreateClick}>
          <Plus data-icon="inline-start" />
          Nova categoria
        </Button>
      </CardContent>
    </Card>
  )
}
