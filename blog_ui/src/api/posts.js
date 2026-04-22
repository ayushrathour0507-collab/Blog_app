import client from './client'

export const getPosts = (params) => client.get('/posts', { params })

export const getPostById = (id) => client.get(`/posts/${id}`)

export const createPost = (payload) => client.post('/posts', payload)

export const updatePost = (id, payload) => client.put(`/posts/${id}`, payload)

export const deletePost = (id) => client.delete(`/posts/${id}`)
