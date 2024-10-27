import React from "react";
import { useCart, useDispatchCart } from "../Components/ContextReducer";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3" style={{ color: "black" }}>
          The Cart is Empty!
        </div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    if (data.length === 0) {
        console.error("Cart is empty. Add items before checking out.");
        return;
    }

    let userEmail = localStorage.getItem("userEmail");
    try {
        let response = await fetch("http://localhost:5000/api/orderData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString(),
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
            dispatch({ type: "DROP" });
        } else {
            console.error("Order creation failed.");
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div style={{ backgroundColor: "#d7e3d8", minHeight: "100vh" }}>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="fs-4" style={{ color: "black" }}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index} className="fs-5" style={{ color: "black" }}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <img
                      src={`${process.env.PUBLIC_URL}/trash.svg`}
                      alt="Delete"
                      onClick={() => dispatch({ type: "REMOVE", index })}
                      style={{ width: "28px", height: "28px" }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2" style={{ color: "black" }}>
            Total Price: {totalPrice}/-
          </h1>
        </div>
        <div>
          <button
            className="btn bg-success mt-5"
            onClick={handleCheckOut}
            style={{ color: "white" }}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
