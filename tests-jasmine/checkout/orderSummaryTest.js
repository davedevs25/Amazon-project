import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage,getCartQuantity,cart} from '../../data/cart.js';


describe('test suite: renderOrderSummary', () => {
  let mockCartQuantity;
  let mockElement;
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  beforeEach(() => {
    // Mock the getCartQuantity function
    mockCartQuantity = jasmine.createSpy('getCartQuantity');

    // Mock the DOM element
    mockElement = document.createElement('a');
    mockElement.classList.add('js-return-to-home-link');
    document.body.appendChild(mockElement);

    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
  `;
  spyOn(localStorage, 'setItem');

  spyOn(localStorage, 'getItem').and.callFake(() => {
    return JSON.stringify([{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1',
      },{
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
      }]) 
  
    mockCartQuantity.and.returnValue(1);

    const cartQuantity = mockCartQuantity();
    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity === 1 ? `${cartQuantity} item` : `${cartQuantity} items`}`;

    expect(mockElement.innerHTML).toBe('1 item');
    expect(mockCartQuantity).toHaveBeenCalled();

  });

  loadFromStorage();
  renderOrderSummary();
  });

  afterEach(() => {
    document.body.removeChild(mockElement);

    document.querySelector('.js-test-container').innerHTML = ''; 
  }); 

  it('displays the cart', () => {
    
    expect(
      document.querySelectorAll('.js-cart-item-container')
    .length).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');

  });

  it('removes item from the cart', () => {

    document.querySelector(`.js-delete-link-${productId1}`).click();
    
    expect(
      document.querySelectorAll('.js-cart-item-container')
    .length).toEqual(1);
    
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);

    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);

    expect(cart.length).toEqual(1);

    expect(cart[0].productId).toEqual(productId2);

  })
});