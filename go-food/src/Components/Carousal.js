import React from "react";

function Carousal() {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
      <div className="carousel-inner" id="carousal" style={{ position: "relative" }}>
        <div
          className="carousel-caption"
          style={{
            zIndex: 10,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            background: "rgba(0, 0, 0, 0.5)",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ background: "white", opacity: 0.9 }}
            />
            <button className="btn btn-outline-success text-white bg-success" type="submit">
              Search
            </button>
          </form>
        </div>

        {/* Only the first carousel item has the "active" class */}
        <div className="carousel-item active">
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
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousal;
