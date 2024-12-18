import { useState, useEffect } from "react";
import { getCartByUserId } from "@/app/api/cart/cart";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import QuantitySelectorCart from "@/components/core/Input/QuantitySelectorCart";
import CartSkeleton from "@/components/core/Skeleton/CartSkeleton";
import Cart from "@/app/lib/model/cart";
import updateCartItem from "@/app/api/cart/update_cart";
import removeCartItem from "@/app/api/cart/remove_cart";
import Swal from "sweetalert2";

import { useRouter } from "next/navigation";
import CartItem from "@/app/lib/model/cartItem";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const session = localStorage.getItem("userSession");
  const userData = JSON.parse(session!);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      const Carts = await getCartByUserId(userData.user_id);
      setCartItems(Carts);
      setIsLoading(false);
    };

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    fetchCart();
    return () => clearTimeout(timeout);
  }, []);

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.cart_id));
    }
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cart_id === id
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: item.price * newQuantity,
            }
          : item,
      ),
    );

    const updatedItem = cartItems.find((item) => item.cart_id === id);
    if (updatedItem) {
      const newTotalPrice = updatedItem.price * newQuantity;
      updateCartItem(id, newQuantity, newTotalPrice);
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to remove this item from your cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        
        if (result.isConfirmed) {
          removeCartItem(id);
          setCartItems(cartItems.filter((item) => item.cart_id !== id));
          Swal.fire("Success", "Item has been removed from the cart.", "success");
        }

      });

    } catch (error) {
      Swal.fire("Failed", "Failed to remove the item from the cart.", "error");
    }
  };

  const total = selectedItems
    .map((id) => cartItems.find((item) => item.cart_id === id)?.totalPrice || 0)
    .reduce((acc, prices) => acc + prices, 0);

  const handleProceedToPayment = async () => {
    const selectedCartItems: CartItem[] = [];

    selectedItems.forEach((id) => {
      const matchedItem = cartItems.find((item) => item.cart_id === id);

      if (matchedItem) {
        selectedCartItems.push({
          cart_id: matchedItem.cart_id,
          product_id: matchedItem.product!.product_id,
          image_url: matchedItem.product?.image_url,
          name: matchedItem.product?.name,
          description: matchedItem.product?.description,
          selectedColor: matchedItem.selectedColor,
          selectedSize: matchedItem.selectedSize,
          quantity: matchedItem.quantity,
          price: matchedItem.price,
          total_price: matchedItem.totalPrice,
        });
      }
    });

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to checkout you cart?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add it!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          if (selectedCartItems.length > 0) {
            localStorage.setItem("cartSession", JSON.stringify(selectedCartItems));
            router.push("/payment");
            console.log("Selected items saved to localStorage:", selectedCartItems);
          } else {
            Swal.fire({
              icon: "warning",
              title: "Oops...",
              text: "No matching items found",
            });
          }          
        }
      });

    } catch (error) {
      Swal.fire("Failed", "Failed to remove the item from the cart.", "error");
    }
  };

  return (
    <div className="mt-[100px] flex min-h-[700px] justify-between p-8">
      <div className="w-2/3">
        <h1 className="mb-4 text-2xl font-semibold">Cart</h1>
        <div className="mb-4 rounded-md p-4 shadow-md">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedItems.length === cartItems.length}
              onChange={toggleSelectAll}
              className="mr-3 h-[20px] w-[20px]"
            />
            <span className="font-medium">Select All ({cartItems.length})</span>
          </label>
        </div>

        {isLoading ? (
          Array.from({ length: 1 }).map((_, index) => (
            <CartSkeleton key={index} />
          ))
        ) : cartItems.length === 0 ? (
          <h1 className="text-center text-2xl font-semibold text-gray-500">
            Not Matching Item Found
          </h1>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.cart_id}
              className="border-1 mb-5 flex items-center justify-between rounded-lg border-[#f4f1eb] px-4 py-8 shadow-md"
            >
              <label className="flex w-full items-start">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.cart_id)}
                  onChange={() => toggleSelectItem(item.cart_id)}
                  className="mr-3 h-[20px] w-[20px]"
                />
                <img
                  src={"assets" + item.product?.image_url}
                  alt={item.product?.name}
                  className="mr-4 h-[100px] w-[100px] rounded-md"
                />
                <div className="w-full pr-5">
                  <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                      {item.product?.name}
                    </h2>
                    <p className="text-md ml-5 font-semibold">
                      Rp{item.totalPrice.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <p className="mb-5 text-justify text-gray-600">
                    {item.product!.description.length > 200
                      ? `${item.product!.description.slice(0, 200)}...`
                      : item.product!.description}
                  </p>

                  <div className="mt-5 flex w-full justify-between">
                    <div className="flex">
                      <button
                        className={`rounded-md bg-[#f9f7f3] px-4 py-2 font-semibold text-[#a7a39b]`}
                      >
                        {item.selectedColor}
                      </button>

                      <button
                        className={`ml-5 rounded-md bg-[#f9f7f3] px-4 py-2 font-semibold text-[#a7a39b]`}
                      >
                        {item.selectedSize}
                      </button>
                    </div>

                    <div className="flex">
                      <button
                        onClick={() => handleRemoveItem(item.cart_id)}
                        className="mr-4 text-gray-500 transition duration-300 hover:text-gray-600"
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="text-lg"
                        />
                      </button>

                      <QuantitySelectorCart
                        quantity={item.quantity}
                        onQuantityChange={(newQuantity) =>
                          handleQuantityChange(item.cart_id, newQuantity)
                        }
                      />
                    </div>
                  </div>
                </div>
              </label>
            </div>
          ))
        )}
      </div>

      <div className="w-1/4 rounded-md p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Shopping Summary</h2>
        <div className="mb-4 flex justify-between">
          <span className="text-gray-600">Total</span>
          <span className="text-lg font-bold">
            Rp{total.toLocaleString("id-ID")}
          </span>
        </div>
        <button
          onClick={handleProceedToPayment}
          className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Checkout ({selectedItems.length})
        </button>
      </div>
    </div>
  );
}
