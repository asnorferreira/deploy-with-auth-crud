import express from "express";
import controller from "../controller/index.js";
import middleware from "../middleware/index.js";

export const routes = express();

routes.post("/user/login", controller.postLogin);
routes.post(
  "/user",
  middleware.verifyEmail,
  middleware.verifyUser,
  controller.postUser
);

routes.use(middleware.verifyAuth);

routes.get("/user", controller.getUser);
