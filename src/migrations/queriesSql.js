const insertIntoPosts = 'INSERT INTO posts (text, likes, comments) VALUES (?, ?, ?)';
const getSingleItemFromPostsPerId = 'SELECT * FROM posts WHERE id = ?';
const listingPosts = 'SELECT * FROM posts';

export default {
  insertIntoPosts,
  getSingleItemFromPostsPerId,
  listingPosts,
};