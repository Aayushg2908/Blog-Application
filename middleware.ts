export { default } from "next-auth/middleware";

export const config = { matcher: ["/blogs", "/blogs/:id*", "/create-blog"] };