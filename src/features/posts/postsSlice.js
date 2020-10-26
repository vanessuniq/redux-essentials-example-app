import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { client } from '../../api/client'

const reactions = { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
const initialState = {
    data: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
    const response = await client.get('/fakeApi/posts')
    return response.posts
})
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.data.push(action.payload)
            },
            prepare(postAttributes) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        reactions,
                        ...postAttributes
                    }
                }
            }
        },
        postUpdated(state, action) {
            const existingPost = state.data.find(post => post.id === action.payload.id)
            if (existingPost) {
                existingPost.title = action.payload.title
                existingPost.content = action.payload.content
            }
        },
        reactionAdded(state, action) {
            const { id, reaction } = action.payload
            const existingPost = state.data.find(post => post.id === id)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.data = state.data.concat(action.payload)
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.data
export const selectPostById = (state, postId) => state.posts.data.find(post => post.id === postId)