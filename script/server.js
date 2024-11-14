const express = require('express');
const admin = require('firebase-admin');
const app = express();

// Initialize Firebase Admin
const serviceAccount = require('../lingualab-9832e-firebase-adminsdk-5e284-e92ebd2980.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Route to fetch 5 random words
app.get('/api/words', async (req, res) => {
  try {
    const wordsCollection = await db.collection('words').get();
    const wordsArray = wordsCollection.docs.map(doc => doc.data());

    // Shuffle array and take the first 5 words
    const randomWords = wordsArray.sort(() => 0.5 - Math.random()).slice(0, 5);
    res.json(randomWords);
  } catch (error) {
    console.error('Error fetching words:', error);
    res.status(500).send('Error fetching words');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
