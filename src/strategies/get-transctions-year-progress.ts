import { TransactionChartData } from "@/components/transactions/transactions-chart"
import { HTTPGetYearProgress } from "@/http/get-year-progress"
import { HTTPError } from "ky"
import { YearProgressMapper } from "./mappers/year-progress-mapper"

export async function getTransctionsYearProgress(): Promise<TransactionChartData[]> {
    try {
        const progress = await HTTPGetYearProgress()

        return YearProgressMapper.toTransactionsChart(progress)
    } catch (err) {
        if (err instanceof HTTPError) {
            console.error(err)
        }

        return []
    }
}
