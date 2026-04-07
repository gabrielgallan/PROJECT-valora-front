import { HTTPGetYearProgress } from "@/http/get-year-progress"
import { HTTPError } from "ky"
import { YearProgressMapper } from "./mappers/year-progress-mapper"

export async function getYearSavingsProgress() {
    try {
        const response = await HTTPGetYearProgress()

        return YearProgressMapper.toSavingsChart(response)
    } catch (err) {
        if (err instanceof HTTPError) {
            console.error(err)
        }

        throw err
    }
}