// server.js
const express = require('express');
const axios = require('axios');
const ytdl = require('ytdl-core');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/download', async (req, res) => {
    const videoUrl = req.query.url; // Get the video URL from the query

    try {
        // Validate the URL
        if (!ytdl.validateURL(videoUrl)) {
            return res.status(400).json({ error: 'Invalid YouTube URL' });
        }

        // Start downloading the video
        res.header('Content-Disposition', 'attachment; filename="video.mp4"');
        ytdl(videoUrl, { quality: 'highestvideo' }).pipe(res); // Stream the video to the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching video data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
