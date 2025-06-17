import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import logger from "./logger.js";
import expressPinoFactory from "express-pino-logger";
import natural from "natural";

const expressPino = expressPinoFactory({ logger });
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(expressPino);

app.post("/sentiment", async (req, res) => {
  const { sentence } = req.body;

  if (!sentence) {
    logger.error("No sentence provided");
    return res.status(400).json({ error: "No sentence provided" });
  }

  // Initialize the sentiment analyzer with the Natural's PorterStemmer and "English" language
  const Analyzer = natural.SentimentAnalyzer;
  const stemmer = natural.PorterStemmer;
  const analyzer = new Analyzer("English", stemmer, "afinn");

  // Perform sentiment analysis
  try {
    const analysisResult = analyzer.getSentiment(sentence.split(" "));

    let sentiment = "neutral";

    if (analysisResult < 0) sentiment = "negative";
    else if (analysisResult > 0.33) sentiment = "positive";

    logger.info(`Sentiment analysis result: ${analysisResult}`);
    res.json({ analysisResultScore: analysisResult, sentiment });
  } catch (error) {
    logger.error(`Error performing sentiment analysis: ${error}`);
    res.status(500).json({ message: "Error performing sentiment analysis" });
  }
});

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
