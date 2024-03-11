import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Config } from "./config";
import compression from "compression";

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }
  private middleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    this.app.use(express.static(__dirname + "/../public/"));

    mongoose.connection.on("connected", () => {
      console.log("[server]: Connected to database successfully!");
    });
    mongoose.connect(Config.mongoUrl);

    this.app.use(compression());
  }
  private routes(): void {
    this.app.use("/", (req, res) => {
      res.json({ message: "Hi!" });
    });
  }
}

export default new App().app;
