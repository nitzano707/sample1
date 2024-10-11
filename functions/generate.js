const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    // Set the Hugging Face API endpoint and model
    // const API_URL = 'https://api-inference.huggingface.co/models/EleutherAI/gpt-j-6B';
    const API_URL = 'https://api-inference.huggingface.co/models/gpt2';

    // Set the Hugging Face API token (retrieve it from your environment variables)
    const API_TOKEN = process.env.HUGGING_FACE_API_KEY;

    // Parse user input from the request body
    const body = JSON.parse(event.body);
    const userInput = body.prompt;

    // Prepare the request payload
    const payload = {
      inputs: userInput,
    };

    // Define the headers for the API request
    const headers = {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    };

    // Make the request to the Hugging Face Inference API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    });

    // Get the response JSON
    const responseData = await response.json();

    // If there was an error, return it
    if (response.status !== 200) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: responseData.error || 'Error generating response' }),
      };
    }

    // Extract the generated text from the response
    const generatedText = responseData.generated_text || responseData[0]?.generated_text;

    // Return the generated response
    return {
      statusCode: 200,
      body: JSON.stringify({ response: generatedText }),
    };
  } catch (error) {
    // Handle any errors
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
