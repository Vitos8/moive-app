import {onError} from "../utils/toasts"; 

class FilmService {

     private _apiKey:string = 'f2806dca9da61eeec0705fa9fceccb1a';
     private _apiBase:string = 'https://api.themoviedb.org/3/';
     private _basePage:number = 1;
     private _imgPath:string = "https://image.tmdb.org/t/p/original/";
     private _videoPath:string = 'https://www.youtube.com/watch?v=';

     // function template to get resource from db
     getResource = async (url:string) => {
     let result = await fetch(url);

     if (!result.ok) {
          onError(`Something went wrong with API call ((`);
     }

     return await result.json();
     }


     getTrending = async () => {
          const res = await this.getResource(`${this._apiBase}trending/movie/week?api_key=${this._apiKey}`);           
          return res.results.map((item:any) => this._transcriptFilm(item)).slice(0,10);
     }

     getSearch = async (query: string) => {
          const res = await this.getResource(`${this._apiBase}search/movie?api_key=${this._apiKey}&language=en-US&query=${query}&page=${this._basePage}&include_adult=false`);           
          return res.results.map((item:any) => this._transcriptFilm(item)).slice(0,5);
     }

     getFilmByID = async (id:number) => {
          const res = await this.getResource(`${this._apiBase}movie/${id}?api_key=${this._apiKey}&language=en-US`); //Request to DBі
          return this._transcriptFilmId(res);
     }

     getPopular = async (page = this._basePage) => {
          const res = await this.getResource(`${this._apiBase}movie/popular?api_key=${this._apiKey}&language=en-US&page=${page}`); // required page number
          return res.results.map((item:any) => this._transcriptFilm(item));
     }

     getSearched = async (query:string) => {
          const res = await this.getResource(`${this._apiBase}search/movie?query=${query}&api_key=${this._apiKey}`);
          return res.results.map((item:any) => this._transcriptFilm(item));
     }

     getSimiliar = async(id:number) => {
          const res = await this.getResource(`${this._apiBase}movie/${id}/similar?api_key=${this._apiKey}&language=en-US&${this._basePage}`); // required page number
          return res.results.map((item:any) => this._transcriptFilm(item));
     }

     getVideo = async(id:number) => {
          const res = await this.getResource(`${this._apiBase}movie/${id}/videos?api_key=${this._apiKey}&language=en-US&$`); 
          return res.results.map((item:any) => this._transcriptVideo(item));
     }

     getPeople = async() => {
          const res = await this.getResource(`${this._apiBase}person/popular?api_key=${this._apiKey}&language=en-US&page=2`);           
          return res.results.map((item:any) => this._transcriptPeople(item));
     }

     getNew = async(page =this._basePage) => {
          const res = await this.getResource(`${this._apiBase}movie/upcoming?api_key=${this._apiKey}&language=en-US&page=${page}`); // required page number
          return res.results.map((item:any) => this._transcriptFilm(item));
     }

     private _transcriptVideo(film:any) {
     return {
          name: film.name,
          src: film.key,
          site: film.site,
          size: film.size
     }
     }

     private _transcriptFilm(film:any) {
     return {
          id: film.id,
          title: film.title,
          genres_ids: film.genre_ids,
          description: film.overview,
          rate: film.vote_average,
          poster: 'https://image.tmdb.org/t/p/w500' + film.poster_path,
          miniPoster: 'https://image.tmdb.org/t/p/w500' + film.poster_path,
          backdrop:this._imgPath + film.backdrop_path,
          onLike: false,
          }
     }

     private _transcriptFilmId(film:any) {
          return {
               id: film.id,
               title: film.original_title,
               genres: [...film.genres],
               rate: film.vote_average,
               description: film.overview,
               poster: 'https://image.tmdb.org/t/p/w500' + film.poster_path,
          }
     }

     private _transcriptPeople(people:any) {
          return {
               id: people.id,
               title: people.name,
               poster: 'https://image.tmdb.org/t/p/w500' + people.profile_path,
          }
     }
}

export default FilmService;