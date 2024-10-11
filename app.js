document.getElementById('prompt-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const prompt = document.getElementById('prompt').value;
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Generating...';

    try {
        const response = await fetch('/.netlify/functions/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });
        const data = await response.json();
        resultDiv.textContent = data.generated_text || 'No result returned';
    } catch (error) {
        resultDiv.textContent = 'Error generating text';
    }
});
