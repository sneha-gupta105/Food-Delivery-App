import React, { Component, useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import Carousal from "../Components/Carousal";

export default function Home() {
  const[search, setSearch]= useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]); //We have sent an array from backend and, map is used for array, map isn't used for object.
  //for in is used to loop in an object

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    //console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          {/* Position relative to allow children to be positioned absolutely */}
          <div
            className="carousel-inner"
            id="carousal"
            style={{ position: "relative" }}
          >
            {/* Search bar with position absolute */}
            <div
              className="carousel-caption"
              style={{
                zIndex: 10,
                position: "absolute",
                top: "50%", // Vertical centering
                left: "50%", // Horizontal centering
                transform: "translate(-50%, -50%)", // To properly center the form
                width: "80%", // Adjust width as needed
                background: "rgba(0, 0, 0, 0.5)", // Adding a semi-transparent background for visibility
                padding: "10px", // Add padding around the search bar
                borderRadius: "8px", // Optional: Add rounded corners
              }}
            >
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{ background: "white", opacity: 0.9 }} // To ensure the input is visible
                  value = {search}
                  onChange={(e)=>{setSearch(e.target.value)}}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="/steak.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="Steak"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/fettuccineAlfredo.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="Fettuccine Alfredo"
              />
            </div>
            <div className="carousel-item active">
              <img
                src="/burger.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="Burger"
              />
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem.length > 0 ? (
                  foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName)  && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodName={filterItems.name}
                            options={filterItems.options[0]}
                            imgSrc={filterItems.img}
                          ></Card>
                        </div>
                      );
                    })
                ) : (
                  <div>No such data found.m</div>
                )}
              </div>
            );
          })
        ) : (
          <div>No data available</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
