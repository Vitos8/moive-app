import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import FilmService from '../../services/FilmService' 

let newService = new FilmService();  

export interface movieState {
	popular: any
	trending: any
	new: any
	videos: any
	people:any
	movieById: any
	similiar: any
	search: any
}

const initialState:movieState = {
	popular: [],
	trending: [],
	new: [],
	videos: [],
	people:[],
	movieById: {},
	similiar: [],
	search: [],
}

export  const  fetchPopular = createAsyncThunk('movies/fetchPopular', 
	async (page:number) => {
		let res = await newService.getPopular(page);
		return res;
	}
)

export  const  fetchTrending = createAsyncThunk('movies/fetchTrending', 
	async () => {
		let res = await newService.getTrending();
		return res;
	}
)

export  const  fetchPeople = createAsyncThunk('movies/fetchPeople', 
	async () => {
		let res = await newService.getPeople();
		return res;
	}
)

export  const  fetchNew = createAsyncThunk('movies/fetchNew', 
	async (page:number) => {
		let res = await newService.getNew(page);
		return res;
	}
)

export  const  fetchById = createAsyncThunk('movies/fetchById', 
	async (id:number) => {		
		let res = await newService.getFilmByID(id);		
		return res;
	}
)

export  const  fetchSimiliar = createAsyncThunk('movies/fetchSimiliar', 
	async (id:number) => {		
		let res = await newService.getSimiliar(id);				
		return res;
	}
)

export  const  fetchVideo = createAsyncThunk('movies/fetchVideo', 
	async (id:number) => {		
		let res = await newService.getVideo(id);				
		return res;
	}
)

export  const  fetchSearch = createAsyncThunk('movies/fetchSearch', 
	async (query:string) => {		
		let res = await newService.getSearch(query);				
		return res;
	}
)


export const movieSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
	
	},
	extraReducers: {
		[fetchPopular.fulfilled.toString()]: (state:any, action:any) => {
			state.popular = action.payload;
		},
		[fetchTrending.fulfilled.toString()]: (state:any, action:any) => {			
			state.trending = action.payload;
		},
		[fetchPeople.fulfilled.toString()]: (state:any, action:any) => {						
			state.people = action.payload;
		},
		[fetchNew.fulfilled.toString()]: (state:any, action:any) => {			
			state.new = action.payload;
		},
		[fetchById.fulfilled.toString()]: (state:any, action:any) => {			
			state.movieById = action.payload;
		},
		[fetchSimiliar.fulfilled.toString()]: (state:any, action:any) => {			
			state.similiar = action.payload;
		},
		[fetchVideo.fulfilled.toString()]: (state:any, action:any) => {			
			state.videos = action.payload;
		},
		[fetchSearch.fulfilled.toString()]: (state:any, action:any) => {			
			state.search = action.payload;
		},
	}	
})

export default movieSlice.reducer