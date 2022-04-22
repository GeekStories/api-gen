const app = `
    const { 
        errors
    } = require("celebrate");

    const cors = require("cors");
    const express = require("express");
    const app = express();

    app.use(cors());
    app.use(express.json());

    /* Routes will be generated here */

    module.exports = app;
    `;

export default app;
