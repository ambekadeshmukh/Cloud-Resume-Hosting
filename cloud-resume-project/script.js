
  async function getVisitorCount() {
    try {
        const response = await fetch('https://l87arummtg.execute-api.us-east-1.amazonaws.com/prod');
        const data = await response.json();
        document.getElementById('visitor-count').innerText = data.count;
    } catch (error) {
        console.error('Error fetching visitor count:', error);
        document.getElementById('visitor-count').innerText = 'Error loading count';
    }
}

getVisitorCount();