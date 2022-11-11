import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface userState {
	user: {
		name:string
		email: string	
		uid?: number
	}
}

const initialState:userState = {
	user: {
		name: '',
		email: '',
	},
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action:PayloadAction<any>) => {
			state.user =	action.payload;
		}
	},
})

export const {setUser} = userSlice.actions

export default userSlice.reducer