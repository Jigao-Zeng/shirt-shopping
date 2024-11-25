import React, { useEffect, useState } from 'react';
import './styles.css';
import { fetchClothInfo } from './data.ts';
import { Cloth } from "./types.ts";

const ClothPage = () => {
  const [cloth, setCloth] = useState<Cloth | null>(null);
  const [cart, setCart] = useState<any[]>([]); // Cart state to hold added items

  useEffect(() => {
    const getClothInfo = async () => {
      try {
        const clothInfo = await fetchClothInfo();
        console.log({clothInfo});
        setCloth(clothInfo); // Set the fetched product data
      } catch (err) {
        console.error(err);
      }
    };

    getClothInfo();
  }, []);

  if (!cloth) {
    return <div>Loading...</div>;
  }

  const { title, description, imageURL, price, sizeOptions } = cloth;

  const addToCart = (size: string) => {
    const item = {
      title,
      price,
      size,
      imageURL,
    };

    setCart(prevCart => [...prevCart, item]);
  };

  const getCartItemCount = () => {
    return cart.length;
  };

  const toggleCart = () => {
    const cartPanel = document.getElementById('cart-panel');
    cartPanel?.classList.toggle('open');
  };

  return (
    <div className="container">
      {/* Image Section */}
      <div className="image-section">
        <img src={imageURL} alt="T-Shirt" />
      </div>

      {/* Details Section */}
      <div className="details-section">
        <h1>{title}</h1>
        <p className="price">${price}</p>
        <p>{description}</p>

        <p>Size: </p>
        <div className="size-options">
          {sizeOptions.map((size) => (
            <button key={size.id} onClick={() => addToCart(size.label)}>
              {size.label}
            </button>
          ))}
        </div>

        <button className="add-to-cart" onClick={() => addToCart('M')}>
          ADD TO CART
        </button>
      </div>

      {/* Cart Button */}
      <button className="cart-button" onClick={toggleCart}>
        My Cart ({getCartItemCount()})
      </button>

      {/* Cart Panel */}
      <div id="cart-panel" className="cart-panel">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.imageURL} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <p>{item.title}</p>
                  <p>Size: {item.size}</p>
                  <p>${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClothPage;
