document.getElementById('generate-button').addEventListener('click', async () => {
  const prompt = document.getElementById('prompt-input').value;

  try {
    // Make a request to the serverless function
    const response = await fetch('/.netlify/functions/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    // Get the response data
    const data = await response.json();

    // If there's an error, show it to the user
    if (response.status !== 200) {
      document.getElementById('response').innerText = `Error: ${data.error}`;
      return;
    }

    // Display the generated text to the user
    document.getElementById('response').innerText = data.response;
  } catch (error) {
    // Handle any errors
    document.getElementById('response').innerText = 'Error generating response';
  }
});

// Step 3: Update your HTML to include the input field, button, and response area
// File: index.html
/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Prompt Generator</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>AI Prompt Generator</h1>
  <input id="prompt-input" type="text" placeholder="Enter your prompt...">
  <button id="generate-button">Generate</button>
  <p id="response"></p>
  <script src="app.js"></script>
</body>
</html>
*/
