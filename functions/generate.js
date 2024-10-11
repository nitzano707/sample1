const fetch = require('node-fetch');

exports.handler = async function (event) {
    try {
        // הדפסת מפתח ה-API ליומני השגיאות כדי לבדוק שהוא מוגדר כראוי
        console.log('HUGGING_FACE_API_KEY:', process.env.HUGGING_FACE_API_KEY);

        // בדיקה אם יש גוף בקשה (body) ואם הוא לא ריק
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "No input provided" })
            };
        }

        // קבלת ה-prompt מתוך גוף הבקשה
        const { prompt } = JSON.parse(event.body);

        // בדיקה אם ה-prompt אינו ריק
        if (!prompt) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "No prompt provided" })
            };
        }

        // שליחה של הבקשה ל-API של Hugging Face
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

        // עיבוד התוצאה שהתקבלה מ-Hugging Face
        const result = await response.json();

        // החזרת התוצאה למשתמש
        return {
            statusCode: 200,
            body: JSON.stringify({ generated_text: result[0].generated_text })
        };

    } catch (error) {
        // טיפול בשגיאות והחזרת שגיאה מתאימה למשתמש
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
