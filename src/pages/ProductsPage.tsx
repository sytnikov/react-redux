import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Product from '../types.ts/Product'
import { AppState } from '../redux/store'
import { addProduct, removeProduct } from '../redux/reducers/productsReducer'

const ProductsPage = () => {
  const products = useSelector((state: AppState) => state.productsReducer) 
  const dispatch = useDispatch()
  
  const onAddNew = () => {
    dispatch(addProduct({
      id: "qwerty",
      title: "T-shirt",
      price: 50,
      description: "The best T-shirt in the area"
    }))
  }

  const onRemove = () => {
    dispatch(removeProduct("qwerty"))
  }

  return (
    <div>
      <button onClick={onAddNew}>Add new product</button>
      <button onClick={onRemove}>Delete a product</button>
    </div>
  )
}

export default ProductsPage
