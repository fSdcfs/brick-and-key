// THIS IS A COMPLETE WEBSITE THAT USES SQL TABLES CART, BUY, HOMES
// TO TAKE DATA OF CART, PRODUCTS, AS WELL AS CUSTOMER EMAIL, NUMBER,
// PRODUCT THEY ORDERED ETC.
// { MADE ON DATE: 5/10/2025 | TIME: 3:25 PM }

// ─────────────────────────────────────────────────────────────
// External Modules
// ─────────────────────────────────────────────────────────────
const express = require('express');
const body = require('body-parser');
const app = express();

// ─────────────────────────────────────────────────────────────
// EJS Setup
// ─────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', 'views');

// ─────────────────────────────────────────────────────────────
// Body Parser
// ─────────────────────────────────────────────────────────────
app.use(body.urlencoded({ extended: false }));

// ─────────────────────────────────────────────────────────────
// All Routes
// ─────────────────────────────────────────────────────────────
const homeRouter     = require('./routes/home-Page');
const { hostRouter } = require('./routes/host');
const storeRouter    = require('./routes/store');
const detailsRouter  = require('./routes/details');
const editRouter     = require('./routes/edit');
const cartRouter     = require('./routes/cart');
const deleteRouter   = require('./routes/delete');
const buyRouter      = require('./routes/buy');

// ─────────────────────────────────────────────────────────────
// Route Connections
// ─────────────────────────────────────────────────────────────
app.use(homeRouter);           // Home Page
app.use(hostRouter);           // Admin or Host
app.use(storeRouter);          // Store or EJS
app.use(detailsRouter);        // Details
app.use('/host', editRouter);  // Edit
app.use(cartRouter);           // Cart
app.use(deleteRouter);         // Delete
app.use(buyRouter);            // Buy

// ─────────────────────────────────────────────────────────────
// Max Listeners for Express
// ─────────────────────────────────────────────────────────────
require('events').EventEmitter.defaultMaxListeners = 20;

// ─────────────────────────────────────────────────────────────
// Server Port
// ─────────────────────────────────────────────────────────────
const port = 3001;
app.listen(port, () => {
  console.log(`✅ Server is running at: http://localhost:${port}`);
});
