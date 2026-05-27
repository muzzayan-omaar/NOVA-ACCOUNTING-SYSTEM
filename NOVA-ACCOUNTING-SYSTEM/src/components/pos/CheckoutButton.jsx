export default function CheckoutButton({ onCheckout, disabled }) {
  return (
    <button
      onClick={onCheckout}
      disabled={disabled}
      className={`w-full p-3 rounded mt-3 font-bold text-white
        ${disabled ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}
      `}
    >
      COMPLETE SALE
    </button>
  );
}