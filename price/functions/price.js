const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async function () {
  try {
    const url = "https://myonion.fun/trade?tokenId=8a674cbf53bed652403a5fbd92da127f0f4a122da7d366152519fc1ce5bd0f00";
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const $ = cheerio.load(response.data);
    const price = $("div.text-lg.font-bold").first().text().trim();

    return {
      statusCode: 200,
      body: `🦉 Owlphium current price: ${price}`
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "⚠️ Failed to retrieve Owlphium price"
    };
  }
};