// Task 2: Basic CRUD Operations
// Find all books in a specific genre
db.books.find({ genre: 'Fiction' });

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2010 } });

// Find books by a specific author
db.books.find({ author: 'Author Name' });

// Update the price of a specific book
db.books.updateOne({ title: 'Book Title' }, { $set: { price: 29.99 } });

// Delete a book by its title
db.books.deleteOne({ title: 'Book Title' });

// Task 3: Advanced Queries
// Find books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// Use projection to return only the title, author, and price fields
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// Implement sorting to display books by price (ascending)
db.books.find().sort({ price: 1 });

// Implement sorting to display books by price (descending)
db.books.find().sort({ price: -1 });

// Use the limit and skip methods to implement pagination (5 books per page)
db.books.find().skip(0).limit(5); // First page
db.books.find().skip(5).limit(5); // Second page

// Task 4: Aggregation Pipeline
// Calculate the average price of books by genre
db.books.aggregate([
  { $group: { _id: '$genre', avgPrice: { $avg: '$price' } } }
]);

// Find the author with the most books in the collection
db.books.aggregate([
  { $group: { _id: '$author', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// Group books by publication decade and count them
db.books.aggregate([
  { $group: { _id: { $floor: { $divide: ['$published_year', 10] } }, count: { $sum: 1 } } }
]);

// Task 5: Indexing
// Create an index on the title field for faster searches
db.books.createIndex({ title: 1 });

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// Use the explain() method to demonstrate the performance improvement with your indexes
db.books.find({ title: 'Book Title' }).explain('executionStats');
db.books.find({ author: 'Author Name', published_year: 2015 }).explain('executionStats'); 