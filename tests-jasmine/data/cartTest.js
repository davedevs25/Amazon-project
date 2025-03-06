import {cart,loadFromStorage,addToCart} from '../../data/cart.js';

describe('Test suite: addToCart', () => {
  it('adds an existing product to the cart',() => {
    
    spyOn(document, 'querySelector').and.returnValue({
      value: '1'  // Mock value of the quantity input
    });

    spyOn(localStorage, 'setItem');
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]) 
    });

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    // how many times the method have been called
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    });

    it('adds a new product to the cart', ()=> {
      spyOn(document, 'querySelector').and.returnValue({
        value: '3'  }); // Mock value of the quantity input
  
      spyOn(localStorage, 'setItem');

  
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([])
      });  // spyOn mocks the method to create an empty array
  
      loadFromStorage();

      addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart.length).toEqual(1);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(3);
    })
  })

