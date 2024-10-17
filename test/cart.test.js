const { Cart, Product, Discount } = require("../src/models/cart");

describe("test create cart", () => {
  test("cart created product null", () => {
    let cart = Cart.Create();

    expect(cart.isEmpty()).toBe(true);
  });
});

describe("test cart with product", () => {
  test("cart can add product", () => {
    let cart = Cart.Create();

    const products = [new Product(1, 2, 100)];

    cart.setProduct(products);

    expect(cart.products.length == 1).toBe(true);
  });

  test("cart can add product with correct number", () => {
    let cart = Cart.Create();

    const products = [new Product(1, 2, 100)];

    cart.setProduct(products);

    expect(cart.products.length).toBe(1);
  });

  test("cart can check product with product id", () => {
    let cart = Cart.Create();

    const products = [new Product(1, 2, 100)];

    cart.setProduct(products);

    const isExists = cart.isProductExists(1);

    expect(isExists).toBe(true);
  });

  test("cart can not check product with product id if not set product", () => {
    let cart = Cart.Create();

    const isExists = cart.isProductExists(1);

    expect(isExists).toBe(false);
  });

  test("cart can check product with not exists product id", () => {
    let cart = Cart.Create();

    const products = [new Product(1, 2, 100)];

    cart.setProduct(products);

    const isExists = cart.isProductExists(2);

    expect(isExists).toBe(false);
  });

  test("cart can list all product", () => {
    let cart = Cart.Create();

    const products = [new Product(1, 2, 100), new Product(2, 2, 100)];

    cart.setProduct(products);

    let isExists = cart.isProductExists(1);

    expect(isExists).toBe(true);

    isExists = cart.isProductExists(2);

    expect(isExists).toBe(true);
  });

  test("cart count number of product in cart", () => {
    let cart = Cart.Create();

    const products = [new Product(1, 2, 100), new Product(2, 2, 100)];

    cart.setProduct(products);

    expect(cart.listAllProduct()).toBe(4);
  });

  test("cart can destroy", () => {
    let cart = Cart.Create();

    cart = null;

    expect(cart).toBe(null);
  });

  test("cart can show correct amount", () => {
    let cart = Cart.Create();

    const products = [new Product(1, 2, 100), new Product(2, 2, 100)];

    cart.setProduct(products);

    const amount = cart.calculateAmount(false,false)
    
    expect(amount).toBe(400);
  });

  test("cart can show incorrect amount", () => {
    let cart = Cart.Create();

    const products = [new Product(1, 2, 100), new Product(2, 2, 100)];

    cart.setProduct(products);

    const amount = cart.calculateAmount(false,false)
    
    expect(amount == 300).toBe(false);
  });

  test("cart can list unique item", () => {
    let cart = Cart.Create();

    const products = [new Product(1, 2, 100), new Product(2, 2, 100)];

    cart.setProduct(products);

    const total = cart.listUniqueProduct(false,false)
    
    expect(total).toBe(2);
  });


});

describe("test cart discount", () => {
    test("cart can set discount", () => {
      let cart = Cart.Create();

      cart.setDiscount(cart,'fixed',new Discount(false,0,100))

      const isExists = cart.checkDiscount();

      expect(isExists).toBe(true)
  
    });

    test("cart can check discount by name", () => {
        let cart = Cart.Create();
  
        cart.setDiscount(cart,'fixed',new Discount(false,0,100))
  
        const isExists = cart.checkDiscountByName('fixed');
  
        expect(isExists).toBe(true)
    
      });

      test("cart can remove cart by name", () => {
        let cart = Cart.Create();
  
        cart.setDiscount(cart,'fixed',new Discount(false,0,100))
  
        cart.removeDiscountByName('fixed');
  
        expect(cart.discounts['fixed']).toBe(undefined)
    
      });

      test("cart can show correct amount with fixed discount", () => {
        let cart = Cart.Create();
  
        cart.setDiscount(cart,'fixed',new Discount(false,0,100))

        const products = [new Product(1, 2, 100), new Product(2, 2, 100)];

        cart.setProduct(products);

        const amount = cart.calculateAmount(false,true)
  
  
        expect(amount).toBe(300)
    
      });

      test("cart can show correct amount with percentage discount with limit", () => {
        let cart = Cart.Create();
  
        cart.setDiscount(cart,'percentage',new Discount(true,100,10,2000))

        const products = [new Product(1, 1, 2000), new Product(2, 2, 100)];

        cart.setProduct(products);

        const amount = cart.calculateAmount(false,true)
  
  
        expect(amount).toBe(2100)
    
      });

      test("cart can show correct amount with percentage discount without limit", () => {
        let cart = Cart.Create();
  
        cart.setDiscount(cart,'percentage',new Discount(true,100,10,4000))

        const products = [new Product(1, 1, 2000), new Product(2, 2, 100)];

        cart.setProduct(products);

        const amount = cart.calculateAmount(false,true)

        const discount = 2200 * (10 / 100);
  
        expect(amount).toBe(discount)
    
      });
  });


describe("test cart with freebie", () => {
    test("cart can set freebie", () => {
      let cart = Cart.Create();

      const products = [new Product(1, 1, 2000)];

      cart.setProductWithFreebie(products);

      const isExists = cart.isProductExists(2)
  
      expect(isExists).toBe(true);
    });
  });
  
