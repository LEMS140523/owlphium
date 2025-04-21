const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { nickname, telegram, code, score } = JSON.parse(event.body);

  if (!nickname || !telegram || !code || !score) {
    return { statusCode: 400, body: 'Missing fields' };
  }

  const filePath = path.join(__dirname, '../scores.json');
  let scores = [];

  try {
    if (fs.existsSync(filePath)) {
      scores = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (e) {
    return { statusCode: 500, body: 'Error reading file' };
  }

  const alreadyClaimed = scores.find(entry => entry.telegram === telegram);
  if (alreadyClaimed) {
    return {
      statusCode: 409,
      body: JSON.stringify({ message: 'Ya has reclamado el premio antes.' })
    };
  }

  const newEntry = {
    nickname,
    telegram,
    code,
    score,
    timestamp: new Date().toISOString()
  };

  scores.push(newEntry);

  try {
    fs.writeFileSync(filePath, JSON.stringify(scores, null, 2));
  } catch (e) {
    return { statusCode: 500, body: 'Error saving file' };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Registro exitoso' })
  };
};