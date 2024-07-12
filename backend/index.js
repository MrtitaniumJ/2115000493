const express = require('express');
const app = express();
const productRoutes = require('./files/routes/products');

app.use(express.json());
app.use('/categories/:categoryname/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});