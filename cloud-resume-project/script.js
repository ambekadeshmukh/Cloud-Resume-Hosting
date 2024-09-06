async function getVisitorCount() {
    const response = await fetch('https://l87arummtg.execute-api.us-east-1.amazonaws.com/prod');
    const data = await response.json();
    document.getElementById('visitor-count').innerText = data.count;
  }
  
  getVisitorCount();