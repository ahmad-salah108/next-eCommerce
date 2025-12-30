import Breadcrumbs from "@/components/Breadcrumbs";
import React from "react";
import CartItem, { CartItemType } from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";

const LINKS = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Cart",
  },
];

const CART_ITEMS: CartItemType[] = [
  {
    id: "1",
    name: "Gradient Graphic T-shirt",
    size: "Large",
    color: "White",
    price: 145,
    quantity: 1,
    image: "/assets/images/shirt1.png", // Placeholder, will rely on what's available or use a generic one if needed
  },
  {
    id: "2",
    name: "Checkered Shirt",
    size: "Medium",
    color: "Red",
    price: 180,
    quantity: 1,
    image: "/assets/images/shirt2.png",
  },
  {
    id: "3",
    name: "Skinny Fit Jeans",
    size: "Large",
    color: "Blue",
    price: 240,
    quantity: 1,
    image: "/assets/images/shirt1.png",
  },
];

function CartPage() {
  return (
    <main className="container mx-auto py-6 md:py-12 px-4 md:px-0">
      <Breadcrumbs links={LINKS} />
      
      <h1 className="text-[32px] md:text-[40px] font-black uppercase mt-4 md:mt-6 mb-6 md:mb-8 font-integral">
        Your Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-5 md:gap-8">
        {/* Cart Items List */}
        <div className="lg:basis-[60%] border border-gray-200 rounded-main p-4 md:p-6 h-fit space-y-4 md:space-y-6">
          {CART_ITEMS.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:basis-[40%]">
          <OrderSummary />
        </div>
      </div>
    </main>
  );
}

export default CartPage;
