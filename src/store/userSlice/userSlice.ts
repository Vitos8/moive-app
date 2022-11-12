import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface userState {
	user: {
		name:string
		email: string	
		uid?: string
	}
}

let initialState:userState = {
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
			state.user = action.payload
		}
	},
})

const { actions, reducer } = userSlice;
export const {setUser} = actions;
export default reducer
