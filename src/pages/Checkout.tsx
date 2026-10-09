import { useEffect } from "react";
import { useParams } from "react-router";

function Checkout() {
  const { _id } = useParams();
  async function fetchCarData() {
    try {
      const res = await fetch(`https://rentacar-uq9f.onrender.com/cars/${_id}`);
      const response = await res.json();
      console.log(response);
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    fetchCarData();
  }, [_id]);
  console.log(_id);
  return <div>Checkout</div>;
}

export default Checkout;
