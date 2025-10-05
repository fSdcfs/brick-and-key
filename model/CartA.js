const db = require('../utils/dataSql'); // your SQL connection




module.exports = class Cart {
  // Add a home to the cart
  static addToCart(homeObj, callback) {
    db.execute('SELECT * FROM cart WHERE home_id = ?', [homeObj.home_id])
      .then(([rows]) => {
        if (rows.length > 0) {
          callback('already in cart', homeObj.home_id);
        } else {
          db.execute(
            'INSERT INTO cart (home_id, title, location, price, type, photo) VALUES (?, ?, ?, ?, ?, ?)',
            [
              homeObj.home_id,
              homeObj.title,
              homeObj.location,
              homeObj.price,
              homeObj.type,
              homeObj.photo
            ]
          ).then(() => callback(null, homeObj.home_id));
        }
      })
      .catch(err => callback(err));
  }

  // Get all cart items
  static getCart(callback) {
    db.execute('SELECT * FROM cart')
      .then(([rows]) => {
        console.log('Cart loaded:', rows);
        callback(rows);
      })
      .catch(err => {
        console.error('Error loading cart:', err);
        callback([]);
      });
  }

  // Delete a cart item by home_id
 static deleteById(home_id) {
  return db.execute('DELETE FROM cart WHERE home_id = ?', [home_id]);
}
};