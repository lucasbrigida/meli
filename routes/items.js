var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var Item = require('../models/item');

var options = {
  headers: {
    'User-Agent': 'MELI Front End-3342184372699420'
  },
  json: true
};


/* GET /api/items/:id */
router.get('/:id', function(req, res, next) {
  let query = Object.keys(req.query).map(key => key + '=' + req.query[key]).join('&');   
  console.log(req.query);

  // get item details
  let detail = rp(Object.assign(options, {
    uri: `https://api.mercadolibre.com/items/${req.params.id}?${query}`
  }));

  // get item description
  let description = rp(Object.assign(options, {
    uri: `https://api.mercadolibre.com/items/${req.params.id}/description?${query}`
  }));

  Promise.all([detail, description])
  .then(function (resp) {
    let item = resp.reduce((a, b) => Object.assign(a, b));
    let itemDetail = {
      author: {
        name: 'Lucas P',
        lastname: 'Brigida'
      },
      item: {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: parseInt(String(item.price).split('.')[0] || 0),
          decimals: parseInt(String(item.price).split('.')[1] || 0) 
        },
        picture: (item.pictures || [])[0].url,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity,
        description: item.text || item.plain_text
      }
    };
    res.status(200).json(itemDetail);
  })
  .catch(function (err) {
    res.status(500).json(err);
  });
});

/* GET /api/items */
router.get('/', function(req, res, next) {
  let query = Object.keys(req.query).map(key => key + '=' + req.query[key]).join('&');  

  rp(Object.assign(options, {
    uri: `https://api.mercadolibre.com/sites/MLA/search?${query}`
  }))
  .then(function (resp = {}) {
    let items = (resp.results || []).map(item => {
      return {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: parseInt(String(item.price).split('.')[0] || 0),
          decimals: parseInt(String(item.price).split('.')[1] || 0) 
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      };
    });

    let filter = resp.filters.length > 0 ? resp.filters[0].values[0].path_from_root : [];
    let categories = filter.map(path => path.name);

    let listItems = Object.assign({
      author: {
        name: 'Lucas P',
        lastname: 'Brigida'
      },
      categories: categories
    }, {items});

    res.status(200).json(listItems);
  })
  .catch(function (err) {
    console.error(err);
    res.status(500).json(err);
  });
});

module.exports = router;