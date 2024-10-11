const fetch = require('node-fetch');

exports.handler = async function (event) {
    try {
        const { prompt } = JSON.parse(event.body);
        
        // קריאה ל-API של Hugging Face
        const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: prompt })
        });

        // בדיקה אם הקריאה ל-API הצליחה
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const result = await response.json();
        
        return {
            statusCode: 200,
            body: JSON.stringify({ generated_text: result[0].generated_text })
        };
    } catch (error) {
        // טיפול בשגיאות והחזרת תגובה מתאימה
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
