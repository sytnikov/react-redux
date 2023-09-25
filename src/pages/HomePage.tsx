import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../redux/store";
import { addNewUser } from "../redux/reducers/usersReducer";

const HomePage = () => {
  const products = useSelector((state: AppState) => state.productsReducer);
  const users = useSelector((state: AppState) => state.usersReducer)
  const dispatch = useDispatch()

  const onCheckItems = () => {
    console.log("Product list: ", products);
    console.log("Users list: ", users);
  };

  const onAddNewUser = () => {
    dispatch(addNewUser({
      id: "uuu",
      name: "Igor"
    }))
  }


  return (
    <div>
      <button onClick={onCheckItems}>Check Product List</button>
      <button onClick={onAddNewUser}>Add New User</button>
    </div>
  );
};

export default HomePage;
