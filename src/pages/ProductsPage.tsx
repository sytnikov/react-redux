import React, { useEffect, useState } from "react";

import {
  addProduct,
  fetchAllProductsAsync,
  removeProduct,
  sortByPrice,
} from "../redux/reducers/productsReducer";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import getFilteredProducts from "../redux/selectors/getFilteredProducts";
import Product from "../types.ts/Product";
import { addToCart } from "../redux/reducers/cartReducer";
import { useDeleteProductMutation, useFetchAllProductsQuery } from "../redux/apis/productApis";

const ProductsPage = () => {
  const [search, setSearch] = useState<string | undefined>();
  // const { products, loading, error } = useAppSelector(
  //   (state) => state.productsReducer
  // );
  const {data, error, isLoading, isError} = useFetchAllProductsQuery({limit: 300, offset:0})
  const [deleteProduct] = useDeleteProductMutation()
    // implementing filtering within the component, not changing the global state
  const filteredProducts = useAppSelector((state) =>
    getFilteredProducts(state, search)
  );
  const cart = useAppSelector(state => state.cartReducer)

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync({ offset: 0, limit: 300 }));
  }, []);

  const onSortAsc = () => {
    dispatch(sortByPrice("asc"));
  };

  const onSortDesc = () => {
    dispatch(sortByPrice("desc"));
  };

  const onAddNew = () => {
    dispatch(
      addProduct({
        id: "qwerty",
        title: "T-shirt",
        price: 50,
        description: "The best T-shirt in the area",
      })
    );
  };

  const onRemove = () => {
    dispatch(removeProduct("qwerty"));
  };

  const onAddToCart = (payload: Product) => {
    dispatch(addToCart(payload))
  }

  return (
    <div>
      <button onClick={onAddNew}>Add new product</button>
      {/* <button onClick={onRemove}>Delete a product</button> */}
      <button onClick={onSortAsc}>Sort ASC</button>
      <button onClick={onSortDesc}>Sort DESC</button>
      <input
        type="text"
        placeholder="Search products by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <p>Items in the cart:</p>
      {cart && cart.map(item => (
        <div key={item.id}>
          {item.title} {item.quantity}
        </div>
      ))}
      <br />
      {filteredProducts.map((p) => (
        <div key={p.id}>
          {p.id} {p.title} {p.price}
          <button onClick={() => onAddToCart(p)}>Add To Cart</button>
          <button onClick={() => deleteProduct(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
