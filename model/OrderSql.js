const db = require('../utils/dataSql');

module.exports = class Order {
  static save(order) {
    console.log("🧪 Saving order to SQL:", order);

    return db.execute(
      'INSERT INTO buy (home_id, home_title, name, email, phone, address, order_date) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
      [
        order.home_id,
        order.home_title,
        order.name,
        order.email,
        order.phone,
        order.address
      ]
    );
  }
};