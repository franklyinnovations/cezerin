'use strict';

var OrdersService = require('../services/orders/orders');
var OrderAddressService = require('../services/orders/order_address');
var OrderItemsService = require('../services/orders/order_items');
var OrdertTansactionsService = require('../services/orders/order_transactions');
var OrdertDiscountsService = require('../services/orders/order_discounts');

class OrdersController {
  constructor(router) {
        this.router = router;
        this.registerRoutes();
  }

  registerRoutes() {
      this.router.get('/orders', this.getOrders.bind(this));
      this.router.post('/orders', this.addOrder.bind(this));
      this.router.get('/orders/:id', this.getSingleOrder.bind(this));
      this.router.put('/orders/:id', this.updateOrder.bind(this));
      this.router.delete('/orders/:id', this.deleteOrder.bind(this));

      this.router.put('/orders/:id/recalculate', this.recalculateOrder.bind(this));
      this.router.put('/orders/:id/checkout', this.checkoutOrder.bind(this));

      this.router.put('/orders/:id/billing_address', this.updateBillingAddress.bind(this));
      this.router.put('/orders/:id/shipping_address', this.updateShippingAddress.bind(this));

      this.router.post('/orders/:id/items', this.addItem.bind(this));
      this.router.put('/orders/:id/items/:item_id', this.updateItem.bind(this));
      this.router.delete('/orders/:id/items/:item_id', this.deleteItem.bind(this));

      this.router.post('/orders/:id/transactions', this.addTransaction.bind(this));
      this.router.put('/orders/:id/transactions/:transaction_id', this.updateTransaction.bind(this));
      this.router.delete('/orders/:id/transactions/:transaction_id', this.deleteTransaction.bind(this));

      this.router.post('/orders/:id/discounts', this.addDiscount.bind(this));
      this.router.put('/orders/:id/discounts/:discount_id', this.updateDiscount.bind(this));
      this.router.delete('/orders/:id/discounts/:discount_id', this.deleteDiscount.bind(this));
   }

   getOrders(req, res, next) {
     OrdersService.getOrders(req.query)
      .then(data => { res.send(data) })
      .catch(next);
   }

   getSingleOrder(req, res, next) {
     OrdersService.getSingleOrder(req.params.id)
      .then(data => {
        if(data) {
          res.send(data)
        } else {
          res.status(404).end()
        }
      })
      .catch(next);
   }

   addOrder(req, res, next) {
     OrdersService.addOrder(req.body)
      .then(data => { res.send(data) })
      .catch(next);
   }

   updateOrder(req, res, next) {
     OrdersService.updateOrder(req.params.id, req.body)
      .then(data => {
        if(data) {
          res.send(data)
        } else {
          res.status(404).end()
        }
       })
      .catch(next);
   }

   deleteOrder(req, res, next) {
     OrdersService.deleteOrder(req.params.id)
      .then(data => { res.status(data ? 200 : 404).end() })
      .catch(next);
   }

   recalculateOrder(req, res, next) {
     OrderItemsService.calculateAndUpdateAllItems(req.params.id)
      .then(data => {
        if(data) {
          res.send(data)
        } else {
          res.status(404).end()
        }
       })
      .catch(next);
   }

   checkoutOrder(req, res, next) {
     OrdersService.checkoutOrder(req.params.id)
      .then(data => {
        setTimeout(() => {res.send(data)}, 5000)
       })
      .catch(next);
   }

   updateBillingAddress(req, res, next) {
     OrderAddressService.updateBillingAddress(req.params.id, req.body)
      .then(data => {
        if(data) {
          res.send(data)
        } else {
          res.status(404).end()
        }
       })
      .catch(next);
   }

   updateShippingAddress(req, res, next) {
     OrderAddressService.updateShippingAddress(req.params.id, req.body)
      .then(data => {
        if(data) {
          res.send(data)
        } else {
          res.status(404).end()
        }
       })
      .catch(next);
   }

   addItem(req, res, next) {
     const order_id = req.params.id;
     OrderItemsService.addItem(order_id, req.body)
      .then(data => { res.send(data) })
      .catch(next);
   }

   updateItem(req, res, next) {
     const order_id = req.params.id;
     const item_id = req.params.item_id;
     OrderItemsService.updateItem(order_id, item_id, req.body)
      .then(data => {
        if(data) {
          res.send(data)
        } else {
          res.status(404).end()
        }
       })
      .catch(next);
   }

   deleteItem(req, res, next) {
     const order_id = req.params.id;
     const item_id = req.params.item_id;
     OrderItemsService.deleteItem(order_id, item_id)
      .then(data => { res.send(data) })
      .catch(next);
   }

   addTransaction(req, res, next) {
     const order_id = req.params.id;
     OrdertTansactionsService.addTransaction(order_id, req.body)
      .then(data => { res.send(data) })
      .catch(next);
   }

   updateTransaction(req, res, next) {
     const order_id = req.params.id;
     const transaction_id = req.params.item_id;
     OrdertTansactionsService.updateTransaction(order_id, transaction_id, req.body)
      .then(data => {
        if(data) {
          res.send(data)
        } else {
          res.status(404).end()
        }
       })
      .catch(next);
   }

   deleteTransaction(req, res, next) {
     const order_id = req.params.id;
     const transaction_id = req.params.item_id;
     OrdertTansactionsService.deleteTransaction(order_id, transaction_id)
      .then(data => { res.send(data) })
      .catch(next);
   }

   addDiscount(req, res, next) {
     const order_id = req.params.id;
     OrdertDiscountsService.addDiscount(order_id, req.body)
      .then(data => { res.send(data) })
      .catch(next);
   }

   updateDiscount(req, res, next) {
     const order_id = req.params.id;
     const discount_id = req.params.item_id;
     OrdertDiscountsService.updateDiscount(order_id, discount_id, req.body)
      .then(data => {
        if(data) {
          res.send(data)
        } else {
          res.status(404).end()
        }
       })
      .catch(next);
   }

   deleteDiscount(req, res, next) {
     const order_id = req.params.id;
     const discount_id = req.params.item_id;
     OrdertDiscountsService.deleteDiscount(order_id, discount_id)
      .then(data => { res.send(data) })
      .catch(next);
   }
}

module.exports = OrdersController;