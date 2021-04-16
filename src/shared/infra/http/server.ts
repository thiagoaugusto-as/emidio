import { app } from "./app";

app.get("/", (request, response) => {
    return response.json({message: "Hello"})
})

app.listen(3333, () => {
    console.log("🚀  Server is running!  🚀");
});