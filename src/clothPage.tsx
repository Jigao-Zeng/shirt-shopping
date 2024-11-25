import React, { useEffect, useState } from 'react';
import './styles.css';
import { fetchClothInfo } from './data.ts';
import { Cloth } from "./types.ts";

const ClothPage = () => {
  const [cloth, setCloth] = useState<Cloth | null>(null);


  useEffect(() => {
    const getClothInfo = async () => {
      try {
        const clothInfo = await fetchClothInfo();
        console.log({clothInfo})
        setCloth(clothInfo); // Set the fetched product data
      } catch (err) {
        
        console.error(err);
      }
    };

    getClothInfo();
  },[]);
  


  if (!cloth) {
    return <div>Loading...</div>;
  }

  const {title, description, imageURL, price, sizeOptions} = cloth;

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
            <button key={size.id}>{size.label}</button>
          ))}
        </div>
        
        <button className="add-to-cart">ADD TO CART</button>
      </div>
    </div>
  );
};

export default ClothPage;
