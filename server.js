app.get('/download', async (req, res) => {
    const videoUrl = req.query.url;

    try {
        // Validate the URL
        if (!ytdl.validateURL(videoUrl)) {
            return res.status(400).json({ error: 'Invalid YouTube URL' });
        }

        // Start downloading the video
        res.header('Content-Disposition', 'attachment; filename="video.mp4"');
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
