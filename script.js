// Check links when button clicked
document.getElementById('checkButton').addEventListener('click', () => {

  const url = document.getElementById('urlInput').value;

  if(!url) return;

  fetch(`proxy.php?url=${encodeURIComponent(url)}`)
    .then(resp => resp.text()) 
    .then(html => {

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const links = Array.from(doc.getElementsByTagName('a'));
      const totalLinks = links.length;  
      let brokenLinks = 0;

      const fetchPromises = links.map(link =>
        fetch(`proxy.php?url=${encodeURIComponent(link.href)}`)
          .then(resp => {
            if (!resp.ok) {
              brokenLinks++;
            }
          })
      );


      displayResults(totalLinks, brokenLinks);

    });
});

// Display total and broken links
function displayResults(total, broken) {
  document.getElementById('countsResult').innerText =
    `Total Links: ${total} | Broken Links: ${broken}`;
}
