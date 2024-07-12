const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const fetchProducts = async (company, category, minPrice, maxPrice) => {
  const url = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?minPrice=${minPrice}&maxPrice=${maxPrice}`;

  const headers = {
    'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,  // Ensure this token is correctly set in your .env file
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = { fetchProducts };
