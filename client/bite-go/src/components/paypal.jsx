import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PaypalPayment({price, onSuccess, onCancel, onError, onClick, paymentMethod }) {
  return (
    <PayPalScriptProvider options={{ clientId: "AXWiiXWsWfEh42TBlz2m4rlsoimCKb1TMpV2Kn2hz4iZ3u0MVeJtITo1nfNWyZ_38ITewkzmHwB3xrr_", currency: "USD"}}>
      <div className="p-4 w-full flex flex-col justify-center items-center bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4! capitalize">order total amount - ${price}</h2>
        <PayPalButtons 
          onClick={onClick}
          className='w-full'
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",  
                    value: price,  
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            onSuccess();
            const details = await actions.order.capture();
            paymentMethod(details);
          }}
          onCancel={() => {
            onCancel();
          }}
          onError={(err) => {
            onError();
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};