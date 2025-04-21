const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  const filePath = path.join(__dirname, '../scores.json');
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      const scores = JSON.parse(data);
      scores.sort((a, b) => b.score - a.score);
      return {
        statusCode: 200,
        body: JSON.stringify(scores.slice(0, 5)) // enviar top 5
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify([])
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error retrieving scores' })
    };
  }
};
