import React, { useState, useEffect } from "react";
import "./ProductList.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";
import plantsArray from "../data/plantsData";

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [plants, setPlants] = useState([]);
  const dispatch = useDispatch();

  // Grab cart items directly from Redux
  const cart = useSelector((state) => state.cart.items);

  // Load local data now, API later
  useEffect(() => {
    setPlants(plantsArray);

    // Later, replace with API call:
    // fetch("https://your-api.com/plants")
    //   .then(res => res.json())
    //   .then(data => setPlants(data))
    //   .catch(err => {
    //     console.error(err);
    //     setPlants(plantsArray); // fallback to local data
    //   });
  }, []);

  // Helper: check if a plant is already in the cart
  const isInCart = (plantName) => cart.some((item) => item.name === plantName);

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  const handleAddToCart = (product) => {
    if (!isInCart(product.name)) {
      dispatch(addItem(product));
    }
  };

  return (
    <div>
      <div className="navbar">
        {/* Left: Logo + brand */}
        <div className="navbar-left">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt="Paradise Nursery logo"
            />
            <div className="tag_home_link">
              <h3>Paradise Nursery</h3>
              <i>Where Green Meets Serenity</i>
            </div>
          </div>
        </div>

        {/* Center: Plants link */}
        <div className="navbar-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowCart(false); // ensure product grid shows
            }}
            className="navbar-ul-a"
          >
            Plants
          </a>
        </div>

        {/* Right: Cart */}
        <div className="navbar-right">
          <a href="#" onClick={handleCartClick} className="navbar-ul-a">
            <h1 className="cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                height="68"
                width="68"
              >
                <circle cx="80" cy="216" r="12"></circle>
                <circle cx="184" cy="216" r="12"></circle>
                <path
                  d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                  fill="none"
                  stroke="#faf9f9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
              <span className="cart_quantity_count">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </h1>
          </a>
        </div>
      </div>

      {/* Main content */}
      {!showCart ? (
        <div className="product-grid">
          {plants.map((category, index) => (
            <div key={index}>
              <h1 className="plantname_heading">
                <div className="plant_heading">{category.category}</div>
              </h1>
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img
                      className="product-image"
                      src={plant.image}
                      alt={plant.name}
                    />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">
                      {plant.description}
                    </div>
                    <div className="product-price">{plant.cost}</div>
                    <button
                      className={`product-button ${
                        isInCart(plant.name) ? "added-to-cart" : ""
                      }`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
