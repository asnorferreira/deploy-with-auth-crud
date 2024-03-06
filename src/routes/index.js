import express from "express";
import controller from "../controller/index.js";
import middleware from "../middleware/index.js";

export const routes = express();

routes.post(
  "/",
  middleware.verifyEmail,
  middleware.verifyUser,
  controller.postUser
);
