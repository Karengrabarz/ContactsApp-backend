"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const app_1 = require("./app");
const data_source_1 = require("./data-source");
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("database is running");
    const PORT = process.env.PORT || 3002;
    app_1.app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
})
    .catch((err) => console.log(err));
