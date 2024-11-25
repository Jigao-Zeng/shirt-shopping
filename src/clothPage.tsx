import React, { useEffect, useState, useRef } from "react";
import "./styles.css";
import { fetchClothInfo } from "./data.ts";
import { Cloth } from "./types.ts";

const ClothPage = () => {
  const [cloth, setCloth] = useState<Cloth | null>(null);
  const [cart, setCart] = useState<any[]>([]); // Cart state to hold added items
  const [selectedSize, setSelectedSize] = useState<string | null>(null); // Track selected size
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    const getClothInfo = async () => {
      try {
        const clothInfo = await fetchClothInfo();
        console.log({ clothInfo });
        setCloth(clothInfo); // Set the fetched product data
      } catch (err) {
        console.error(err);
      }
    };

    getClothInfo();

  }, []);

  const addToCart = (size: string) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.title === title && item.size === size
      );
  
      if (existingItemIndex !== -1) {
        // If item exists, create a shallow copy of the cart and update the quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex], // Copy the existing item
          quantity: updatedCart[existingItemIndex].quantity + 1, // Increment quantity
        };
        return updatedCart;
      } else {
        // If item does not exist, add it with quantity 1
        return [
          ...prevCart,
          {
            title,
            price,
            size,
            imageURL,
            quantity: 1,
          },
        ];
      }
    });
  };
  

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size); // Update selected size state
  };

  if (!cloth) {
    return <div>Loading...</div>;
  }

  const { title, description, imageURL, price, sizeOptions } = cloth;

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

        <p>SIZE </p>
        {userError && <p className="error-message">{userError}</p>}
        <div className="size-options">
          {sizeOptions.map((size) => (
            <button
              key={size.id}
              onClick={() => handleSizeSelect(size.label)}
              className={size.label === selectedSize ? "selected" : ""}
            >
              {size.label}
            </button>
          ))}
        </div>

        <button
          className="add-to-cart"
          onClick={() => {
            if (!selectedSize) {
              setUserError("Please select a size first");
            } else {
              setUserError(null);
              addToCart(selectedSize);
            }
          }}
        >
          ADD TO CART
        </button>
      </div>

      {/* Cart Panel */}
      <div id="cart-panel" className="cart-panel">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.imageURL}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <p>{item.title}</p>
                  <p>Size: {item.size}</p>
                  <p>${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
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
