import { dataService } from "./Connections"

export const sendTimeFN = async ({ id, seconds }) => {
    const response = await dataService.post("/sendtime", { id, seconds })
    return response.data
}