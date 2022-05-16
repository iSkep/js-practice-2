'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    /* jshint browser: true */
    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector("form.add"),
          addInput = document.querySelector(".adding__input"),
          checkbox = document.querySelector(".add [type=checkbox]");
    
    const deleteAdv = (arr) => {
        arr.forEach (item => {
            item.remove();
        });
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    const makeChanges = () => {
        genre.textContent = "ДРАМА";
        poster.style.backgroundImage = "url('../img/bg.jpg')";
    };

    addForm.addEventListener("submit", function(e) {
        e.preventDefault();
         
        let newFilm = addInput.value;
        const favourite = checkbox.checked;

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
        
            if (favourite) {
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            createMovieList(movieDB.movies, movieList);
        }

        e.target.reset();
    });

    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sortArr(films);
        
        films.forEach((film, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">${i + 1} ${film}
                <div class="delete"></div>
            </li>
            `;
        });

        document.querySelectorAll(".delete").forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(films, parent);
            });
        });
    }

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});