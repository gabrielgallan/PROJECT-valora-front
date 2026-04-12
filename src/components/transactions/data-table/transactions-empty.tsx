import { IconCash } from "@tabler/icons-react"

import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type TrasactionsEmptyProps = {
    onCreateClick: () => void
}

export function TrasactionsEmpty({ onCreateClick }: TrasactionsEmptyProps) {
    return (
        <Empty className="border border-dashed">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconCash />
                </EmptyMedia>
                <EmptyTitle>No transactions yet</EmptyTitle>
                <EmptyDescription className="w-60">
                    Start registering your cash flow to view your wallet analytics
                </EmptyDescription>
                <EmptyContent>
                    <Button className="mt-2" size="sm" onClick={onCreateClick}>
                        <Plus />
                        New
                    </Button>
                </EmptyContent>
            </EmptyHeader>
        </Empty>
    )
}
