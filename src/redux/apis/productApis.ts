import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import PaginationQuery from "../../types.ts/PaginationQuery";
import Product from "../../types.ts/Product";

const productApis = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.escuelajs.co/api/v1/products",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query<Product[], PaginationQuery>({
      query: ({limit, offset}) => `?limit=${limit}&offset=${offset}`,
      providesTags: ["Products"]
    }),
    deleteProduct: builder.mutation<boolean, string>({
      query: (productId) => ({url: `${productId}`, method: "DELETE"}),
      invalidatesTags: ["Products"]
    })
  }),
});

export const {useFetchAllProductsQuery, useDeleteProductMutation} = productApis
export default productApis