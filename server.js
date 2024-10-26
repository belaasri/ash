// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/download', async (req, res) => {
    const videoId = req.query.id;

    try {
        const response = await axios.get(`https://youtube-v31.p.rapidapi.com/videos`, {
            params: {
                part: 'contentDetails,snippet,statistics',
                id: videoId
            },
            headers: {
                'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
                'x-rapidapi-key': 'd1c53133acmsh2e7c470c0bfbb2ep1a074cjsne9dd522da151'
            }
        });

        const videoData = response.data.items[0];
        // Placeholder for video download link
        const downloadLink = `https://example.com/download/${videoId}`; // Implement actual download logic here

        res.json({ title: videoData.snippet.title, downloadLink });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching video data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
