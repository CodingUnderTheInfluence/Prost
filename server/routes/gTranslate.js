const { Router } = require('express');

// Imports the Google Cloud client library
const { Translate } = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate({ projectId: process.env.PROJECT_ID, keyFilename: 'serviceacc.json' });

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const text = 'The text to translate, e.g. Hello, world!';
// const target = 'The target language, e.g. ru';

async function translateText(text, target) {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  translations.forEach((translation, i) => {
    console.info(`${text[i]} => (${target}) ${translation}`);
  });
}

const gTranslateRouter = Router();

gTranslateRouter.get('/', (req, res) => {
  const { text, target } = req.query;
  translate.translate(text, target)
    .then((results) => res.send(results))
    .catch((err) => res.send(err));
});

module.exports = {
  gTranslateRouter,
};
