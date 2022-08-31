const cors = require("cors");
const axios = require("axios");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/proxy", async (req, res) => {
  try {
    const { src, url } = req.query;

    const options = {
      responseType: "stream",
      headers: {
        referer: String(url),
      },
    };

    const response = await axios.get(String(src), options);

    return response.data.pipe(res);
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

app.listen(5555, "0.0.0.0", () => {
  console.log(`⚡️[server]: Server is running at 5555`);
});
