import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
// import Carousel from '../components/Carousel'
import Footer from '../Components/Footer'
import NavBar from '../Components/NavBar'
export default function Home() {
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [search, setSearch] = useState('')
  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    response = await response.json()
    // console.log(response[1][0].CategoryName)
    setFoodItems(response[0])
    setFoodCat(response[1])
  }

  useEffect(() => {
    loadFoodItems()
  }, [])
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
            <div className="carousel-item">
              <img
                src="/burger.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="Burger"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/ravioli.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="Ravioli"
              />
            </div><div className="carousel-item active">
              <img
                src="/pizza.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="Pizza"
              />
            </div><div className="carousel-item">
              <img
                src="/dosa.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="Dosa"
              />
            </div><div className="carousel-item">
              <img
                src="/tamale.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="Tamale"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/guacamole.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="Guacamole"
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
      <div className='container'> {/* boootstrap is mobile first */}
        {
          foodCat != []
            ? foodCat.map((data) => {
              return (
                // justify-content-center
                <div className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {foodItems != [] ? foodItems.filter(
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                          {console.log(filterItems.url)}
                          <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} ></Card>
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                </div>
              )
            })
            : ""}
      </div>
      <Footer />
    </div>
    
  );
}
