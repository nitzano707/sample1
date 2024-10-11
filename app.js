document.addEventListener('DOMContentLoaded', () => {
  const generateButton = document.getElementById('generate-button');
  const promptInput = document.getElementById('prompt-input');
  const responseElement = document.getElementById('response');

  if (generateButton && promptInput && responseElement) {
    generateButton.addEventListener('click', async () => {
      const prompt = promptInput.value;

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
          responseElement.innerText = `Error: ${data.error}`;
          return;
        }

        // Display the generated text to the user
        responseElement.innerText = data.response || 'No response generated';
      } catch (error) {
        // Handle any errors
        responseElement.innerText = 'Error generating response';
      }
    });
  }
});
