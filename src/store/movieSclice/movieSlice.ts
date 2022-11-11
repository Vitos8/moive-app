import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface movieState {
	//popular: any
	//new: any
	//videos: any
	//people:any

}

const initialState:movieState = {
	
}

export const movieSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
	
	},
	extraReducers: {

	}
})

export const {} = movieSlice.actions

export default movieSlice.reducer