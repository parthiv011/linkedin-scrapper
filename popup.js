document.getElementById("scrapeBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: scrapeQuotes,
  });
});

function scrapeQuotes() {
  const quotes = Array.from(document.querySelectorAll(".quote")).map((q) => ({
    text: q.querySelector(".text")?.innerText,
    author: q.querySelector(".author")?.innerText,
  }));

  console.log("Scraped Quotes:", quotes);
  alert(JSON.stringify(quotes, null, 2));
}
