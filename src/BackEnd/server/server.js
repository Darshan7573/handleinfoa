const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require ('cors');

const app = express();
const port = 8000;

app.use(cors());

mongoose.connect("mongodb+srv://darshu7573:FVmQyf44mK3dC2nz@cluster0.3stidio.mongodb.net/hodlinfo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const tickerSchema = new mongoose.Schema({
//   platform: String,
    id:Number,
  name: String,
  last: Number,
  buy: Number,
  sell: Number,
});

const Tick = mongoose.model("Tick", tickerSchema);

const fetchAndStoreData = async () => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const tickers = response.data;

    // Clear existing data
    await Tick.deleteMany({}).maxTimeMS(30000);

    // Extract ticker data and sort by volume in descending order
    const tickerArray = Object.values(tickers);
    tickerArray.sort((a, b) => b.volume - a.volume);

    // Store the top 10 tickers
    const top10Tickers = tickerArray.slice(0, 10);
    await Tick.insertMany(top10Tickers);

    console.log("Data fetched and stored successfully.");
  } catch (err) {
    console.error("Error fetching and storing data", err);
  }
};

fetchAndStoreData();



app.get("/", async (req, res) => {
  try {
    const data = await Tick.find({});
    res.json(data);
  } catch (err) {
    console.log("Error fetching Data", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
