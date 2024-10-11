const fetch = require('node-fetch');

exports.handler = async function (event) {
    try {
        // הדפסת מפתח ה-API כדי לוודא שהוא מוגדר כראוי
        console.log('HUGGING_FACE_API_KEY:', process.env.HUGGING_FACE_API_KEY);

        // בדיקת גוף הבקשה והוצאת ה-prompt
        const { prompt } = JSON.parse(event.body);

        // הדפסת ה-prompt שנשלח
        console.log('Prompt:', prompt);

        // ביצוע קריאה ל-API של Hugging Face
        const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: prompt })
        });

        // הדפסת סטטוס התשובה והטקסט המתקבל מה-API ליומן השגיאות
        console.log('API Response Status:', response.status);
        console.log('API Response Text:', await response.text());

        // בדיקה אם הקריאה ל-API הצליחה
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        // עיבוד התוצאה שהתקבלה מ-Hugging Face
        const result = await response.json();

        // החזרת התוצאה
        return {
            statusCode: 200,
            body: JSON.stringify({ generated_text: result[0].generated_text })
        };

    } catch (error) {
        // טיפול בשגיאות והחזרת שגיאה מתאימה למשתמש
        console.error('Error:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
