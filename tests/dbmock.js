// tests/db.mock.js

/**
 * Mock data to be returned by our mock database queries.
 * This simulates the documents we'd typically get from MongoDB.
 */
const mockProducts = [
    { description: 'Product 1' },
    { description: 'Product 2' }
];

/**
 * Mock Mongoose Query object.
 * This simulates Mongoose's chainable query interface.
 * For example, in real Mongoose you can do: Model.find().sort().skip().limit()
 * 
 * mockReturnThis() is used to make methods chainable by returning 'this'
 * exec() and then() both resolve with our mockProducts to simulate a DB response
 */
const mockQuery = {
    sort: jest.fn().mockReturnThis(),  // Returns 'this' to allow chaining
    skip: jest.fn().mockReturnThis(),  // Returns 'this' to allow chaining
    limit: jest.fn().mockReturnThis(), // Returns 'this' to allow chaining
    exec: jest.fn().mockResolvedValue(mockProducts),  // Simulates DB query execution
    then: function(resolve) { resolve(mockProducts) }  // Makes the query thenable (Promise-like)
};

/**
 * Mock Mongoose Model object.
 * This simulates the methods available on a Mongoose model (e.g., Product model).
 * The find() method returns our mockQuery to allow for method chaining.
 */
const mockModel = {
    find: jest.fn().mockReturnValue(mockQuery)
};

/**
 * Mock DB object that simulates the mongoose db interface.
 * In real code, we use db.model('Product') to get the Product model.
 * Here, we return our mockModel whenever model() is called.
 */
const mockDb = {
    model: jest.fn().mockReturnValue(mockModel)
};

module.exports = {
    mockDb,        
    mockProducts, 
    mockModel,     
    mockQuery     
};


// Next,let's update our `product.test.js` file so that it uses our mocks instead of the actual database module.

//js
// tests/product.test.js
const { mockDb, mockProducts } = require('./db.mock');
const { list } = require('../products');

// Mock the db module to use our mockDb
jest.mock('../db', () => mockDb);

describe('Product Module', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // your tests go here
});


// Lastly, we'll need to modify our test that checks for the list of products to be returned:

js
// tests/products.test.js


// replace your current list test with this below:
  describe('list', () => {
      it('should list products', async () => {
          const products = await list();
          expect(products.length).toBe(2);
          expect(products[0].description).toBe('Product 1');
          expect(products[1].description).toBe('Product 2');
      });
  });