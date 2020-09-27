import { contentService } from "./Connections"

export const addContentFN = async ({ time, category, url, title, id }) => {
    const response = await contentService.post("/addContent", { time, category, url, title, id })
    return response.data
}

export const getContentFN = async () => {
    const response = await contentService.get("/findAll")
    return response.data
}

export const getCategoryFn = async ({ category, time }) => {
    const response = await contentService.post("/findCategory", { category, time })
    return response.data
}

export const likeBtn = async ({ like_1, id_cnt, id_user }) => {
    console.log("LIKE BUTTON", like_1, id_cnt, id_user)
    const response = await contentService.post("/likeButton", { like_1, id_cnt, id_user })
    return response.data
}
