// Пример на Node.js/Express
app.post('/api/upload-file', async (req, res) => {
    try {
        const file = req.files.file;
        const chatId = req.body.chat_id;
        
        // Здесь используйте ваш Bytescale API ключ из переменных окружения
        const bytescaleApiKey = process.env.BYTESCALE_API_KEY;
        
        // Загрузка на Bytescale
        const formData = new FormData();
        formData.append('file', file.data, file.name);
        
        const uploadResponse = await fetch('https://api.bytescale.com/v2/accounts/G22nj22/uploads/binary', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${bytescaleApiKey}`
            }
        });
        
        const result = await uploadResponse.json();
        
        res.json({
            success: true,
            fileUrl: result.fileUrl
        });
        
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            error: 'Ошибка при загрузке файла'
        });
    }
});
