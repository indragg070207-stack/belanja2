import { useState } from "react";
import { ProductCard, Product } from "./components/ProductCard";
import { ShoppingCart, CartItem } from "./components/ShoppingCart";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import { ShoppingCart as CartIcon, Search, Home, Grid3x3, User } from "lucide-react";

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199,
    originalPrice: 299,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzYyNzQzODk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    reviews: 234,
  },
  {
    id: 2,
    name: "Classic Leather Watch",
    price: 349,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NjI3MzI1MTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    reviews: 189,
  },
  {
    id: 3,
    name: "Modern Running Sneakers",
    price: 129,
    originalPrice: 179,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1758702701300-372126112cb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzbmVha2VycyUyMHNob2VzfGVufDF8fHx8MTc2Mjc2NjMzNXww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4,
    reviews: 567,
  },
  {
    id: 4,
    name: "Leather Travel Backpack",
    price: 159,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1549943872-f7ff0b2b51be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwYmFja3BhY2t8ZW58MXx8fHwxNzYyODIwNTUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    reviews: 423,
  },
  {
    id: 5,
    name: "Designer Sunglasses",
    price: 89,
    originalPrice: 129,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1663585703603-9be01a72a62a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjI3MDU4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4,
    reviews: 156,
  },
  {
    id: 6,
    name: "Winter Denim Jacket",
    price: 199,
    category: "Clothing",
    image: "https://images.unsplash.com/flagged/photo-1554033750-2137b5cfd7ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWNrZXQlMjBjb2F0JTIwZmFzaGlvbnxlbnwxfHx8fDE3NjI3NjMwNDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    reviews: 389,
  },
  {
    id: 7,
    name: "Smartphone Pro Max",
    price: 999,
    originalPrice: 1199,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1732998369893-af4c9a4695fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZGV2aWNlfGVufDF8fHx8MTc2MjcyODAwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    reviews: 892,
  },
  {
    id: 8,
    name: "Fashion Store Collection",
    price: 149,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1599012307530-d163bd04ecab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzdG9yZXxlbnwxfHx8fDE3NjI3NzM2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4,
    reviews: 278,
  },
];

const CATEGORIES = ["All", "Electronics", "Clothing", "Footwear", "Accessories", "Bags"];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl">ShopHub</h1>
            
            <Button
              variant="outline"
              size="sm"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <CartIcon className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 rounded-full">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* Categories - Horizontal Scroll */}
        <div className="mb-6 -mx-4 px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="whitespace-nowrap flex-shrink-0"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid - Single Column for Mobile */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex items-center justify-around h-16">
          <button className="flex flex-col items-center justify-center flex-1 text-blue-600">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center flex-1 text-gray-500">
            <Grid3x3 className="w-6 h-6" />
            <span className="text-xs mt-1">Categories</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center flex-1 text-gray-500 relative"
            onClick={() => setIsCartOpen(true)}
          >
            <CartIcon className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <Badge className="absolute top-0 right-1/4 h-5 w-5 flex items-center justify-center p-0 rounded-full text-xs">
                {cartItemsCount}
              </Badge>
            )}
            <span className="text-xs mt-1">Cart</span>
          </button>
          <button className="flex flex-col items-center justify-center flex-1 text-gray-500">
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>

      {/* Shopping Cart */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}