import React, { useState } from "react";

export const PaymentMethod = () => {
  const [selectedPayment, setSelectedPayment] = useState("cash");

  return (
    <div className="bg-card rounded-lg shadow-sm mt-4 p-4 border border-green-100">
      <h2 className="font-bold text-gray-800 mb-3 flex items-center">
        <span className="w-1 h-5 bg-background rounded-full mr-2"></span>
        Payment Method
      </h2>
      <div className="space-y-2">
        <label
          className={`flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer transition-colors ${
            selectedPayment === "cash" ? "bg-button" : "hover:bg-green-50"
          }`}>
          <input
            type="radio"
            name="payment"
            value="cash"
            className="mr-3 accent-green-500"
            checked={selectedPayment === "cash"}
            onChange={(e) => setSelectedPayment(e.target.value)}
          />
          <div>
            <p className="font-medium text-white">Cash on Delivery</p>
            <p className="text-sm text-white">
              Pay when you receive your order
            </p>
          </div>
        </label>
        <label
          className={`flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer transition-colors ${
            selectedPayment === "bank" ? "bg-button" : "hover:bg-green-50"
          }`}>
          <input
            type="radio"
            name="payment"
            value="bank"
            className="mr-3 accent-green-500"
            checked={selectedPayment === "bank"}
            onChange={(e) => setSelectedPayment(e.target.value)}
          />
          <div>
            <p className="font-medium text-white">Bank Transfer</p>
            <p className="text-sm text-white">
              Manual transfer to our bank account
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethod;
