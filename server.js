// server.js
const express = require('express');
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

        // Set response headers to download the video
        res.header('Content-Disposition', 'attachment; filename="video.mp4"');

        // Start downloading the video
        ytdl(videoUrl, { quality: 'highestvideo' })
            .pipe(res)
            .on('error', (error) => {
                console.error('Stream error:', error);
                res.status(500).json({ error: 'Error streaming video' });
            });
    } catch (error) {
        console.error('Error fetching video data:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
