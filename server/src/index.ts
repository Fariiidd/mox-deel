import "dotenv/config";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { startBrowser } from "./utils/startbrowser";
import { login } from "./utils/login";
import { otp } from "./utils/otp";
import { scrapeContracts } from "./utils/scrapeContracts";
import { scrapePersonalInfo } from "./utils/scrapePersonal";
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", async (socket) => {
  console.log("user conected", socket.rooms);
  //start scraper
  const { browser, page } = await startBrowser();

  await page.goto("https://app.deel.com/settings/account-settings");

  socket.on("login", async (data) => {
    const status = await login(page, data);

    if (status) {
      socket.emit("error", { type: "login" });
      console.log("error login");
    } else {
      socket.emit("otpPrompt");
    }
  });

  socket.on("otp", async (data) => {
    const status = await otp(page, data.otp);

    if (status) {
      socket.emit("error", { type: "otp" });
      console.log("error otp");
    } else {
      const info = await scrapePersonalInfo(page);
      info.contracts = await scrapeContracts(page);

      console.log(info);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconected");
    browser.close();
  });
});

httpServer.listen(4000, () => console.log("Listening 4000"));
