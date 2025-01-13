export const PaymentMethod = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm mt-4 p-4 border border-green-100">
      <h2 className="font-bold text-gray-800 mb-3 flex items-center">
        <span className="w-1 h-5 bg-green-400 rounded-full mr-2"></span>
        Payment Method
      </h2>
      <div className="space-y-2">
        <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-green-50 transition-colors">
          <input
            type="radio"
            name="payment"
            className="mr-3 accent-green-500"
            defaultChecked
          />
          <div>
            <p className="font-medium text-gray-800">Cash on Delivery</p>
            <p className="text-sm text-gray-500">
              Pay when you receive your order
            </p>
          </div>
        </label>
        <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-green-50 transition-colors">
          <input
            type="radio"
            name="payment"
            className="mr-3 accent-green-500"
          />
          <div>
            <p className="font-medium text-gray-800">Bank Transfer</p>
            <p className="text-sm text-gray-500">
              Manual transfer to our bank account
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};
