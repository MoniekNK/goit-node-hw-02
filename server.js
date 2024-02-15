import express from "express";
import userRoutes from "./routes/userRoutes";
import currentUserRoutes from "./routes/currentUserRoutes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/api", currentUserRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
