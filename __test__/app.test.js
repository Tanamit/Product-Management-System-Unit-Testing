const request = require('supertest');
const { pool, app } = require('../server.js')


// Test GET Method
describe('GET /products', () => {
    it('should return a list of products', async () => {
      const response = await request(app).get('/products');
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
  });

  
// Test POST Method
describe('POST /products', () => {
    it('should add a new product', async () => {
      const newProduct = {
        name: 'Product1',
        category: 'Category1',
        price: 10.99,
        stock: 100,
      };
  
      // Send a POST request with the new product data
      const response = await request(app)
        .post('/products')
        .send(newProduct);
  
      // Assert the response
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Product added successfully');
    });
  
    it('should handle errors when adding a product', async () => {
      // Create a test case where you intentionally send invalid data
      const invalidProduct = {
        name: 'Product2',
        // Missing 'category' field
      };
  
      // Send a POST request with invalid data
      const response = await request(app)
        .post('/products')
        .send(invalidProduct);
  
      // Assert the response when an error occurs
      expect(response.status).toBe(500);
      expect(response.body.error).toMatch(/Error occurred while adding a product/); // Match the error message
    });
  });

// Test PUT Method
  describe('PUT /products/:id', () => {
    it('should update an existing product', async () => {
      const productId = 2; // Replace with the actual ID of a product
      const updatedProduct = {
        name: 'Updated Product',
        category: 'Updated Category',
        price: 19.99,
        stock: 50,
      };
  
      // Send a PUT request to update the product with the specified ID
      const response = await request(app)
        .put(`/products/${productId}`)
        .send(updatedProduct);
  
      // Assert the response
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Product updated successfully');
    });
  
    it('should handle errors when updating a product', async () => {
      const invalidProductId = 999; // Replace with a non-existent ID
      const updatedProduct = {
        name: 'Updated Product',
        category: 'Updated Category',
        price: 19.99,
        stock: 50,
      };
  
      // Send a PUT request to update a product with an invalid ID
      const response = await request(app)
        .put(`/products/${invalidProductId}`)
        .send(updatedProduct);
  
      // Assert the response when an error occurs
      expect(response.status).toBe(404); // Expect a 404 status when the product doesn't exist
      expect(response.body.error).toBe('Product not found');
    });
  });

// Test DELETE Method
  describe('DELETE /products/:id', () => {
    it('should delete an existing product', async () => {
      const productId = 6; // Replace with the actual ID of a product
  
      // Send a DELETE request to delete the product with the specified ID
      const response = await request(app).delete(`/products/${productId}`);
  
      // Assert the response
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Product deleted successfully');
    });
  
    it('should handle errors when deleting a product', async () => {
      const invalidProductId = 999; // Replace with a non-existent ID
  
      // Send a DELETE request to delete a product with an invalid ID
      const response = await request(app).delete(`/products/${invalidProductId}`);
  
      // Assert the response when an error occurs
      expect(response.status).toBe(404); // Expect a 404 status when the product doesn't exist
      expect(response.body.error).toBe('Product not found');
    });
  });