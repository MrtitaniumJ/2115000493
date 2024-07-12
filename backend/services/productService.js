const { fetchFromEcommerceAPI } = require('../utils/httpClient');

const fetchProducts = async (categoryname, n = 10, page = 1, sort) => {
    // Implement logic to fetch products from all e-commerce APIs
    // Apply sorting, pagination, and top N logic here
    
    const products = await fetchFromEcommerceAPI(`/test/companies/ANZ/categories/${categoryname}/products`);

    // Apply sorting, pagination, and filtering logic
    // Generate custom unique identifiers for each product

    // Example sorting and filtering logic (you can customize this):
    let sortedProducts = products;
    if (sort) {
        const [key, order] = sort.split('_');
        sortedProducts = products.sort((a, b) => (order === 'asc' ? a[key] - b[key] : b[key] - a[key]));
    }

    const paginatedProducts = sortedProducts.slice((page - 1) * n, page * n);

    return paginatedProducts.map((product, index) => ({
        id: `${categoryname}-${page}-${index}`,
        ...product,
    }));
};

const fetchProductDetails = async (categoryname, productid) => {
    // Implement logic to fetch a specific product's details from all e-commerce APIs
    const products = await fetchFromEcommerceAPI(`/test/companies/ANZ/categories/${categoryname}/products`);

    const product = products.find(p => `${categoryname}-${productid}` === productid);

    if (!product) {
        throw new Error('Product not found');
    }

    return product;
};

module.exports = { fetchProducts, fetchProductDetails };
