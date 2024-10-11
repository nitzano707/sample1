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
