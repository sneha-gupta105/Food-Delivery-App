import React from "react";

function Card() {
  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
          <img src="/paneerTikka.jpg" className="card-img-top" alt="Paneer Tikka"/>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This is some important text.</p>
            {/*Mobile first approach. We need to define breakpoints */}
            <div className="container w-100">
              <select className="m-2 h-100 text-white bg-success rounded">
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 text-white bg-success rounded">
                <option value="half">Half</option>
                <option value="full">Full</option>
              </select>
              <div className="d-inline h-100 fs-6">Total Price</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
