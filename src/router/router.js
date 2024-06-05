import { notFoundRouter } from "./notFoundRouter/notFoundRouter"
import { userRouter } from "./userRouter/userRouter"

export const router = {
    users: userRouter,
    notFound: notFoundRouter
}