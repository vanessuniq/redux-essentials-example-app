import { createSlice } from "@reduxjs/toolkit"

const initialState = [
    { id: 0, name: 'Tianna Jenkins' },
    { id: 1, name: 'Juana Lopez' },
    { id: 2, name: 'Pierre Leroi' }
]
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export default usersSlice.reducer