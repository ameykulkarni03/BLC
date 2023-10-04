document.getElementById('checkButton').addEventListener('click', function () {
    const url = document.getElementById('urlInput').value;

    // Basic URL validation
    if (!url || !isValidURL(url)) {
        document.getElementById('status').innerText = 'Invalid URL';
        document.getElementById('result').classList.remove('hidden');
        return;
    }

    // Send the request to the PHP proxy script
    fetch(`proxy.php?url=${encodeURIComponent(url)}`)
        .then(response => {
            if (response.ok) {
                document.getElementById('status').innerText = 'URL is working';
            } else {
                document.getElementById('status').innerText = 'URL is broken';
            }
            document.getElementById('result').classList.remove('hidden');
        })
        .catch(error => {
            console.error(error);
            document.getElementById('status').innerText = 'An error occurred';
            document.getElementById('result').classList.remove('hidden');
        });
});

// Basic URL validation (same as before)
function isValidURL(url) {
    const pattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,4}([/].*)?$/i;
    return pattern.test(url);
}
