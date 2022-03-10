'use strict';
const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat)

function Film(id, title, favorite, date, rating){
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.date = date;
    this.rating = rating;
    this.toString = () => {
        let date;
        let rating;
        if (this.date === undefined)
            date = "<not defined>";
        else
            date = this.date.format("MMMM DD, YYYY");
        if(this.rating === undefined)
            rating = "<not assigned>";
        else
            rating = this.rating;
        return "Id: "+ this.id+", Title: "+ this.title + ", Favorite: "  + this.favorite +", Watch date: " + date +", Score: " + rating;  
    }
    this.resetWatchDate = () =>{
        this.date = undefined;
    }
}

function sortFilm(film1,film2){
    if(film1.date === film2.date){
        return 0;
    }
    else if(film1.date === undefined){
        return 1;
    }
    else if(film2.date === undefined){
        return -1;
    }
    else if(film1.date.isSameOrAfter(film2.date))
        return 1;
    else 
        return -1;

}

function FilmLibrary(){
    this.films = [];
    this.addNewFilm =  (film) =>{
        if (film instanceof Film)
            this.films.push(film);
    }
    this.toString = () =>{
        return this.films.map(f => f.toString()).reduce((previous,current) => previous + current + '\n',"");
    }

    this.sortByDate = () =>{
        let newFilmLibrary = new FilmLibrary();
        newFilmLibrary.films = [...this.films];
        newFilmLibrary.films.sort(sortFilm);
        return newFilmLibrary;

    }
    this.filmInLibrary = (id) =>{
        for (f in films){
            if (f.id === id)
                return true;
        }
        return false;
    }
    this.deleteFilm = (id) => {
        let i = 0;
        for (const f of this.films){
            i++;
            if (f.id === id){
                this.films.splice(i);
                return;
            }
        }        
    }
    this.resetWatchedFilms = () =>{
        this.films.forEach((f) => f.resetWatchDate());
    }

    this.getRated = () => {
        return this.films.filter((f) => f.rating )
    }
}


let lib = new FilmLibrary();



let film1 = new Film(1, 'Pulp Fiction', true, dayjs("March 10 2022","MMMM DD YYYY",true), 5);
let film2 = new Film(2, '21 Grams' , true,  dayjs("March 09 2022","MMMM DD YYYY",true),  4);
let film3 = new Film(3, 'Star Wars' , true,  undefined,  undefined);
let film4 = new Film(4, 'Matrix', false, undefined, undefined);
let film5 = new Film(5, 'Shrek', false, dayjs("March 21 2022","MMMM DD YYYY",3));

lib.addNewFilm(film1);
lib.addNewFilm(film2);
lib.addNewFilm(film4);
ddd;
lib.addNewFilm(film3);
console.log('***** List of films *****')
console.log(lib.toString())

console.log('***** List of films sorted by date *****')
console.log(lib.sortByDate().toString())

lib.deleteFilm(3);
console.log('***** List of films without film whose id is 3 *****')
console.log(lib.toString())

lib.resetWatchedFilms()
console.log('***** List of films with watch dates reset *****')
console.log(lib.toString())

console.log('***** List of rated films *****')
lib.getRated().forEach((f)=> console.log(f.toString()))
//console.log(lib.films.length)

