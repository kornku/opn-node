class Cart {
  products = [];
  discounts = {};

  static Create() {
    return new Cart();
  }

  setProduct(arr) {
    this.products = [...this.products, ...arr];
  }

  hasFreebie() {
    return this.products.filter((p) => p.id == 1).length;
  }

  setDiscount(cart, name, discount) {
    cart.discounts[name] = discount;
  }

  checkDiscount() {
    return Object.keys(this.discounts).length > 0;
  }

  checkDiscountByName(name) {
    return this.discounts.hasOwnProperty(name);
  }

  removeDiscountByName(name) {
    delete this.discounts[name];
  }

  isEmpty() {
    return this.products.length == 0;
  }

  isProductExists(id) {
    return this.products.filter((p) => p.id == id).length > 0;
  }

  listUniqueProduct() {
    return this.products.length;
  }

  listAllProduct() {
    return this.products.reduce((p, c) => {
      return p + c.total;
    }, 0);
  }

  setProductWithFreebie(product) {
    this.products = [...this.products, ...product];

    if (this.hasFreebie()) {
      this.products.push({
        id: 2,
        total: 1,
        amount: 100,
      });
    }
  }

  calculateAmount(checkFreebie, checkDiscount) {
    let amount = this.products.reduce((p, c) => {
      return p + c.total * c.amount;
    }, 0);

    if (checkFreebie && this.hasFreebie()) {
    } else if (checkDiscount) {
      for (const [key, value] of Object.entries(this.discounts)) {
        if (value.isPercentage) {
          let limit = value.limitAmount;

          if (amount > limit) {
            amount -= value.limitValue;
          } else {
            let discountPercent = value.value / 100;
            amount *= discountPercent;
          }
        } else {
          amount -= value.value;
        }
      }
    } else {
      return amount;
    }

    return amount;
  }
}

class Product {
  id;
  total;
  amount;

  constructor(id, total, amount) {
    this.id = id;
    this.total = total;
    this.amount = amount;
  }
}

class Discount {
  isPercentage;
  limitValue;
  value;
  limitAmount;

  constructor(isPercentage, limitValue, value, limitAmount) {
    this.isPercentage = isPercentage;
    this.limitValue = limitValue;
    this.value = value;
    this.limitAmount = limitAmount;
  }
}

module.exports = {
  Cart,
  Product,
  Discount,
};
