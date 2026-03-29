"use client"

import { AlertTriangle, Ban } from "lucide-react"

import type { Category } from "@/components/categories/types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type DeleteCategoryAlertDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: Category | null
  onConfirmDelete: (id: string) => void
}

export function DeleteCategoryAlertDialog({
  open,
  onOpenChange,
  category,
  onConfirmDelete,
}: DeleteCategoryAlertDialogProps) {
  const isBlocked = Boolean(category && category.usageCount > 0)

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir categoria</AlertDialogTitle>
          <AlertDialogDescription>
            {category
              ? `Tem certeza que deseja excluir a categoria ${category.name}?`
              : "Selecione uma categoria para excluir."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {isBlocked ? (
          <Alert variant="destructive">
            <Ban />
            <AlertTitle>Exclusao bloqueada</AlertTitle>
            <AlertDescription>
              Esta categoria possui {category?.usageCount ?? 0} transacao(oes) vinculada(s). Inative a categoria para preservar o historico.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <AlertTriangle />
            <AlertTitle>Acao irreversivel</AlertTitle>
            <AlertDescription>Esta acao remove a categoria de forma permanente.</AlertDescription>
          </Alert>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={(event) => {
              if (!category || isBlocked) {
                event.preventDefault()
                return
              }

              onConfirmDelete(category.id)
            }}
          >
            Confirmar exclusao
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
