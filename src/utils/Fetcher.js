import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// const BASE_URL = 'https://jsonplaceholder.typicode.com/'

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({baseUrl:"https://jsonplaceholder.typicode.com/"}),
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: () => "posts",
        }),
        getPost: builder.query({
            query: (id) => `posts/${id}`,
        })
    }),
});

export const {useGetAllPostsQuery, useGetPostQuery} = postsApi

