import React, { useState, useEffect } from "react";
import "./Product.css";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import axios from "axios";

const Product = () => {
  const urlApi = process.env.REACT_APP_API_URL;

  const [preferenceId, setPreferenceId] = useState(null);
  //const urlAPI = process.env.REACT_APP_SERVER_BACKEND;
  initMercadoPago(`${process.env.REACT_APP_MERCADOPAGO_KEY}`, {
    locale: "es-CO",
  });

  ////createPreference();
  const createPreference = async () => {
    try {
      const response = await axios.post(`${urlApi}api/PAYMENT`, {
        title: "Product Name",
        description: "Product Description",
        quantity: 1,
        currency_id: "COP",
        unit_price: 10000,
      });
      console.log(response.data);
      const { id } = response.data;
      return id;
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayment = async () => {
    try {
      const id = await createPreference();
      if (id) {
        setPreferenceId(id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(preferenceId);

  return (
    <>
      <div id="contenedor">
        <h1>Product</h1>
        <img
          src="https://imgs.search.brave.com/EPEN7gy0Vn8GjhBpkjQVFECVwEwxWshNk3gcaTUVu9Y/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvNDE1LzQxNTcz/My5wbmc"
          alt="product"
        ></img>
        <h3>Product Name</h3>
        <p>Product Description</p>
        <p>Price: $100</p>
        <button onClick={handlePayment}>PAGAR</button>
        {preferenceId && (
          <Wallet
            initialization={{ preferenceId: preferenceId }}
            //customization={{ texts: { valueProp: "smart_option" } }}
          />
        )}
      </div>
    </>
  );
};

export default Product;
