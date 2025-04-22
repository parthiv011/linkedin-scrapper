document.getElementById("scrapeBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: scrapeLinkedInData,
  });
});

function scrapeLinkedInData() {
  const profiles = Array.from(document.getElementById('search-results-container'));

  console.log(profiles);

  const data = profiles.map((profile) => {
    const name = profile.querySelector('.entity-result__title-text')?.innerText.trim();
    const occupation = profile.querySelector('.entity-result__primary-subtitle')?.innerText.trim();
    const location = profile.querySelector('.entity-result__secondary-subtitle')?.innerText.trim(); 

    return { name, occupation, location };
  });

  const csv = [
    ["Name", "Occupation", "Location"],
    ...data.map((row) => [row.name, row.occupation, row.location])
  ].map(e => e.join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "linkedin_sales_data.csv";
  a.click();
  URL.revokeObjectURL(url);
}
