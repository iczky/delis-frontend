import { CartItem } from "@/types/cart";
import { Customer } from "@/types/customer";
import { formatToIDR } from "./currencyFormatter";

interface Message {
  cart: CartItem[];
  totalPrice: number;
  customerDetails: Customer;
}

export const generateWhatsAppLink = ({
  cart,
  totalPrice,
  customerDetails,
}: Message): string => {
  const formatPhoneNumber = (phone: string): string => {
    if (phone.startsWith("08")) {
      return `62${phone.slice(1)}`;
    }
    return phone;
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}, ${date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}`;
  };

  const formattedPhone = formatPhoneNumber(customerDetails.phone);

  const baseUrl = `https://wa.me/6281364937316${formattedPhone}`;
  const message = [
    `Pesanan Baru:`,
    ...cart.map((item) => `   *${item.name}: ${item.quantity} pcs*`), // Add indentation
    `Nama Pelanggan:\n   ${customerDetails.name}`, // Add newline and indent the value
    `Total:\n   ${formatToIDR(totalPrice)}`, // Add newline and indent the value
    `Tanggal Pengiriman:\n   ${formatDate(customerDetails.deliveryDate)}`, // Add newline and indent the value
    `Lokasi Pengiriman:\n   ${customerDetails.address}`, // Add newline and indent the value
  ].join("\n");

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
};
