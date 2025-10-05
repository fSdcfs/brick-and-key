

const db = require('../utils/dataSql');

module.exports = class Home {
  constructor(title, location, price, type, description, photo, id) {
    this.title = title;
    this.location = location;
    this.price = price;
    this.type = type;
    this.description = description;
    this.photo = photo;
    this.id = id;
  }

  save() {
    if (this.id) {
      // Update existing record
      return db.execute(
        'UPDATE home SET title=?, location=?, price=?, type=?, description=?, photo=? WHERE id=?',
        [this.title, this.location, this.price, this.type, this.description, this.photo, this.id]
      );
    } else {
      // Insert new record — no id needed
      return db.execute(
        'INSERT INTO home (title, location, price, type, description, photo) VALUES (?, ?, ?, ?, ?, ?)',
        [this.title, this.location, this.price, this.type, this.description, this.photo]
      );
    }
  }

  static fetchAll() {
    return db.execute('SELECT * FROM home');
  }

  static findById(productId) {
    return db.execute('SELECT * FROM home WHERE id=?', [productId]);
  }

  static deleteById(productId) {
    return db.execute('DELETE FROM home WHERE id=?', [productId]);
  }
};