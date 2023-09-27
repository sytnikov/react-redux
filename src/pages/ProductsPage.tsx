import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Product from '../types.ts/Product'
import { AppState } from '../redux/store'
import { addProduct, fetchAllProductsAsync, removeProduct } from '../redux/reducers/productsReducer'
import useAppSelector from '../hooks/useAppSelector'
import useAppDispatch from '../hooks/useAppDispatch'

const ProductsPage = () => {
  const products = useAppSelector(state => state.productsReducer)
  const dispatch = useAppDispatch()
  
  useEffect (()=>{
    dispatch(fetchAllProductsAsync())
  }, [])
  
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
