import { Customer } from "@/types/customer";

interface CustomerDetailsProps {
  customerDetails: Customer;
  setCustomerDetails: (details: Customer) => void;
}

export const CustomerDetails = ({
  customerDetails,
  setCustomerDetails,
}: CustomerDetailsProps) => {
  // Get tomorrow's date for minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mt-4 p-4 border border-purple-100 text-left">
      <h2 className="font-bold text-gray-800 mb-3 flex items-center">
        <span className="w-1 h-5 bg-purple-400 rounded-full mr-2"></span>
        Customer Details
      </h2>
      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-600 block mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={customerDetails.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 block mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={customerDetails.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400"
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 block mb-1">
            Delivery Address
          </label>
          <textarea
            name="address"
            value={customerDetails.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400"
            rows={3}
            placeholder="Enter your complete address"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 block mb-1">
            Pickup Date & Time
          </label>
          <input
            type="datetime-local"
            name="deliveryDate"
            value={customerDetails.deliveryDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400"
            min={tomorrow.toISOString().slice(0, 16)}
          />
        </div>
      </div>
    </div>
  );
};
