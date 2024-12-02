// Dependencies
const express = require('express');
const router = express.Router();
const Jimp = require('jimp');
const path = require('path');

// Constants
const FONT_PATH = path.join(__dirname, '..', 'public', 'impact.fnt');
const IMAGE_BASE_PATH = path.join(__dirname, '..', 'public', 'images');
const IMAGES = {
  boromir: 'boromir.png',
  doge: 'doge.jpg',
  raptor: 'raptor.jpg',
  buzz: 'buzz.jpg',
  bernie: 'bernie.jpg',
  confessionbear: 'Confession-Bear.jpg',
  wonka:'wonka.jpg'
};

// Routes
router.get('/memes', (req, res) => {
  res.json(Object.keys(IMAGES).map((key) => ({ name: key, link: `/memes/${key}` })));
});

router.get('/memes/:key', async (req, res, next) => {
  const imageName = IMAGES[req.params['key']];
  if (!imageName) {
    return next();
  }

  const { x, y, x2, y2, text, text2 } = req.query;

  const imagePath = path.join(IMAGE_BASE_PATH, imageName);
  const imageOutPath = path.join(IMAGE_BASE_PATH, `${path.basename(imageName)}_out${path.extname(imageName)}`);

  const img = await Jimp.read(imagePath);
  const font = await Jimp.loadFont(FONT_PATH);

  const image = {
    data: img.scale(2),
    width: img.getWidth(),
    height: img.getHeight(),
  };

  const upperCaption = {
    text: text || '',
    x: (image.width - Jimp.measureText(font, text || '')) / 2 + (parseInt(x) || 0),
    y: 50 + (parseInt(y) || 0),
  };
  const lowerCaption = {
    text: text2 || '',
    x: (image.width - Jimp.measureText(font, text2 || '')) / 2 + (parseInt(x2) || 0),
    y: (image.height - Jimp.measureTextHeight(font, text2 || '') - 50) + (parseInt(y2) || 0),
  };

  const imageWithText = image.data
    .print(font, upperCaption.x, upperCaption.y, upperCaption.text)
    .print(font, lowerCaption.x, lowerCaption.y, lowerCaption.text)

  await imageWithText.writeAsync(imageOutPath);

  res.contentType = 'image/png';
  res.sendFile(imageOutPath);
});

module.exports = router;
