import { isTemplateExpression } from "typescript";
import {onError} from "../utils/toasts"; 

class FilmService {

     _apiKey:string = 'f2806dca9da61eeec0705fa9fceccb1a';
     _apiBase:string = 'https://api.themoviedb.org/3/';
     _basePage:number = 1;
     _imgPath:string = "https://image.tmdb.org/t/p/original/";
     _videoPath:string = 'https://www.youtube.com/watch?v=';

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
     return res.results.map((item:any) => this._transcriptFilm(item));
     }

     getFilmByID = async (id:number) => {
     const res = await this.getResource(`${this._apiBase}movie/${id}?api_key=${this._apiKey}`); //Request to DBі
     return this._transcriptFilmId(res);
     }

     getPopular = async (page = this._basePage) => {
     const res = await this.getResource(`${this._apiBase}movie/popular?api_key=${this._apiKey}&language=en-US&page=${page}`); // required page number
     return res.results.map((item:any) => this._transcriptFilm(item));
     }

     getGenres = async() => {
     const res = await this.getResource(`${this._apiBase}genre/movie/list?api_key=${this._apiKey}&language=en-US`);
     return res.genres;
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

     _transcriptVideo(film:any) {
     return {
          name: film.name,
          src: this._videoPath + film.key,
          site: film.site,
          size: film.size
     }
     }

     _transcriptFilm(film:any) {
     return {
          id: film.id,
          title: film.original_title,
          genres_ids: film.genre_ids,
          description: film.overview,
          rate: film.vote_average,
          poster: 'https://image.tmdb.org/t/p/w500' + film.poster_path,
          backdrop:this._imgPath + film.backdrop_path,
     }
     }

     _transcriptFilmId(film:any) {
     return {
          id: film.id,
          title: film.original_title,
          genre_ids: film.genres.map((gen:any) => gen.id),
          description: film.overview,
          poster_path: 'https://image.tmdb.org/t/p/w500' + film.poster_path,
     }
     }
}

export default FilmService;