const query = `
  {
    pools(first: 5) {
      id
      volumeUSD
      totalValueLockedUSD
      feeTier
    }
  }
  `;

  try {
    console.log('Sending request to The Graph...');
    const response = await axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', {
      query: query
    });

    console.log('Request successful, processing data...');
    const data = response.data.data.pools;

    console.log('Writing data to poolData.json...');
    fs.writeFileSync('poolData.json', JSON.stringify(data, null, 2));

    console.log('Data successfully written to poolData.json');
  } catch (error) {
    console.error('Error fetching data:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
  }

fetchData();