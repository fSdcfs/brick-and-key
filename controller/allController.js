const Home = require('../model/Home Sql');
const Cart = require('../model/CartA');
const Order = require('../model/OrderSql');

// ─────────────────────────────────────────────────────────────
// 1ST BLOCK: HOST & EJS VIEWS
// ─────────────────────────────────────────────────────────────

// GET /host → Show host edit page
exports.gethost = (req, res, next) => {
  console.log("host of BRICK AND KEY");
  res.render("host/edit", {
    editing: false
  });
};

// POST /host → Save new home
exports.posthost = (req, res, next) => {
  console.log("Post:host of BRICK AND KEY", req.body);
  const { title, location, price, type, description, photo } = req.body;
  const newHome = new Home(title, location, price, type, description, photo);
  newHome.save();
  res.redirect('/store');
};

// GET /hoststore → Show all homes for host
exports.gethostProduct = (req, res, next) => {
  Home.fetchAll(Home)
    .then(([rows]) => {
      const Home = rows[0];
      console.log("hoststore of BRICK AND KEY", Home);
      res.render("host/hostProduct", {
        home: rows
      });
    });
};

// GET /store → Show store page
exports.getstore = (req, res, next) => {
  Home.fetchAll(Home)
    .then(([rows]) => {
      console.log("store of BRICK AND KEY");
      res.render("store/store", {
        Home: rows
      });
    });
};

// GET / → Home page
exports.gethome = (req, res, next) => {
  Home.fetchAll()
    .then(([rows]) => {
      res.render("homePage", {
        Home: rows
      });
    })
    .catch(err => {
      console.error("❌ Error fetching home data:", err);
      res.redirect('/');
    });
};

// GET /host/edit/:itemId → Edit home
exports.getEdit = (req, res, next) => {
  console.log("edit of BRICK AND KEY");
  const itemId = req.params.itemId;
  const editing = req.query.editing === 'true';
  console.log("came to edit page:", itemId, editing);

  Home.findById(itemId)
    .then(([rows]) => {
      const home = rows[0];
      if (!home) {
        console.log("error in editing");
        res.redirect('/');
      } else {
        console.log("success in edit");
        res.render("host/edit", {
          editing: editing,
          item: home
        });
      }
    });
};

// POST /host/edit → Save edited home
exports.postEdit = (req, res, next) => {
  console.log("edit of BRICK AND KEY");
  const { id, title, location, price, type, description, photo } = req.body;
  const newHome = new Home(title, location, price, type, description, photo, id);
  newHome.save();
  res.redirect('/hoststore');
};

// POST /host/delete/:itemId → Delete home
exports.PostHostdelete = (req, res, next) => {
  console.log("HOST DELETE of BRICK AND KEY");
  const itemId = req.params.itemId;
  console.log("came to deleted:", itemId);

  Home.deleteById(itemId)
    .then(() => {
      res.redirect('/hoststore');
    })
    .catch(error => {
      console.log("❌ Error in delete SQL:", error);
      res.redirect('/hoststore');
    });
};

// ─────────────────────────────────────────────────────────────
// 2ND BLOCK: DETAILS, CART, BUY
// ─────────────────────────────────────────────────────────────

// GET /details/:productId → Show product details
exports.getdetails = (req, res, next) => {
  console.log("details of BRICK AND KEY");
  const productId = req.params.productId;
  console.log("came to details:", productId);

  Home.findById(productId)
    .then(([rows]) => {
      const product = rows[0];
      if (!product) {
        console.log("error in details:", productId);
      } else {
        console.log("details-page success:", productId);
        res.render("store/details", {
          item: product
        });
      }
    });
};

// GET /cart → Show cart
exports.getCart = (req, res, next) => {
  console.log("🛒 Cart of BRICK & KEY");
  Cart.getCart((cartItems) => {
    console.log("✅ Cart loaded:", cartItems);
    res.render("store/cart", {
      Cart: cartItems
    });
  });
};

// POST /cart → Add item to cart
exports.postCart = (req, res, next) => {
  console.log("🛒 Cart :Post:host of BRICK & KEY", req.body);
  const homeId = req.body.id;

  Home.findById(homeId)
    .then(([rows]) => {
      const home = rows[0];
      if (!home) {
        console.error("❌ Home not found:", homeId);
        return res.redirect("/cart");
      }

      const homeObj = {
        home_id: home.id,
        title: home.title,
        location: home.location,
        price: home.price,
        type: home.type,
        photo: home.photo
      };

      Cart.addToCart(homeObj, (err, result) => {
        if (err === 'already in cart') {
          console.log("⚠️ Home already in cart:", homeObj.home_id);
        } else if (err) {
          console.error("❌ Error adding to cart:", err);
        } else {
          console.log("✅ Added to cart:", result);
        }
        res.redirect("/cart");
      });
    })
    .catch(err => {
      console.error("❌ Error fetching home:", err);
      res.redirect("/cart");
    });
};

// POST /cart/delete/:itemId → Delete item from cart
exports.postdeleteCart = (req, res, next) => {
  const itemId = Number(req.params.itemId);
  Cart.deleteById(itemId)
    .then(() => res.redirect('/cart'))
    .catch(err => {
      console.error("❌ SQL delete error:", err);
      res.redirect('/cart');
    });
};

// GET /buy/:itemId → Show buy form
exports.getBuy = (req, res, next) => {
  const itemId = Number(req.params.itemId);
  console.log("GET BUY 🛒 Buy page for home_id:", itemId);

  Home.findById(itemId)
    .then(([rows]) => {
      const item = rows[0];
      if (!item) {
        console.log("❌ Item not found");
        console.log("🧪 item.id from SQL:", item.id);
        return res.redirect('/cart');
      }

      res.render("store/buy", { item });
    })
    .catch(err => {
      console.error("❌ Error fetching item:", err);
      res.redirect('/cart');
    });
};

// POST /buy → Save order
exports.postBuy = (req, res, next) => {
  console.log("📦 POST /buy triggered");
  console.log("🧪 req.body:", req.body);

  const order = {
    home_id: Number(req.body.homeId),
    home_title: req.body.homeTitle,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address
  };

  Order.save(order)
    .then(() => res.redirect('/cart'))
    .catch(err => {
      console.error("❌ Error saving order:", err);
      res.redirect('/cart');
    });
};