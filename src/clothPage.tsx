import React from 'react';
import { clothInfo } from './data.tsx';

const ClothPage = () => {
  const { name, price, description, sizeOptions } = clothInfo;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
   
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{name}</h2>

  
        <div className="text-xl text-gray-700 font-semibold mb-6">
          ${price.amount} {price.unit}
        </div>

     
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{description}</p>

     
        <div className="mb-6">
          <span className="text-gray-800 font-medium">Size: </span>
          <div className="flex space-x-2 mt-2">
            {sizeOptions.map((size, index) => (
              <button
                key={index}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 active:bg-gray-200"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

 
        <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ClothPage;
