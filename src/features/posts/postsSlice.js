import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { client } from '../../api/client'

const initialState = {
    data: [],
    status: 'idle',
    saving: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
    const response = await client.get('/fakeApi/posts')
    return response.posts
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async initialPost => {
    const response = await client.post('/fakeApi/posts', { post: initialPost })
    return response.post
})
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
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
        },
        [addNewPost.fulfilled]: (state, action) => {
            state.error = ''
            state.data.push(action.payload)
        },
        [addNewPost.pending]: (state, action) => {
            state.saving = 'saving'
        },
        [addNewPost.rejected]: (state, action) => {
            state.saving = 'idle'
            state.error = `Failed saving your post: ${action.error.message}`
        }
    }
})

export const { postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.data
export const selectPostById = (state, postId) => state.posts.data.find(post => post.id === postId)
export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.user === userId)
)