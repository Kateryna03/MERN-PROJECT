const express = require("express");
const mongoose = require("mongoose"); //для подключения к монгоДБ
const config = require("config"); //для получения констант из моего конфиг
const path = require("path");

const app = express(); //мой будующий сервер

app.use(express.json({ extended: true })); //добавляю мидлвар встроенный в експресс чтобы распарсить параметры запроса

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/links", require("./routes/api/links"));
app.use("/t", require("./routes/api/redirect"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = config.get("port") || 3456;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
    }); //жду выполнения промисса
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (err) {
    console.log("Server Error", err.message);
    process.exit(1);
  }
}
start();
