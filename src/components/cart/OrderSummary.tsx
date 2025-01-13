import { formatToIDR } from "@/utils/currencyFormatter";

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export const OrderSummary = ({
  subtotal,
  deliveryFee,
  total,
}: OrderSummaryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm mt-4 p-4 border border-blue-100">
      <h2 className="font-bold text-gray-800 mb-3 flex items-center">
        <span className="w-1 h-5 bg-blue-400 rounded-full mr-2"></span>
        Order Summary
      </h2>
      <div className="space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatToIDR(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span>{formatToIDR(deliveryFee)}</span>
        </div>
        <div className="h-px bg-gray-200 my-2" />
        <div className="flex justify-between font-bold text-gray-800">
          <span>Total</span>
          <span>{formatToIDR(total)}</span>
        </div>
      </div>
    </div>
  );
};
