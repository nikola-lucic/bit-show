const uiModule = (() => {
    return {

        searchInput: $(".search-box"),

        displayTop50(list) {
            const row = $(".main-page");

            list.forEach(show => {
                const card = $(`
                <div class="col-12 col-md-6 col-lg-4 show" id="${show.id}">
                    <a href='#'>
                        <img src="${show.posterUrl}" id="${show.id}">
                        <h3 class="show-title" id="${show.id}">${show.name}</h3>
                    </a>
                </div>
                `)
                row.append(card);
            })
        },
        failed() {
            alert(`Somthing went wrong`);
        },
        setLocalStorage(id) {
            localStorage.setItem("id", id);
        },
        displayOnShowInfo(chosenShow, listOfSeasons, listOfActors) {
            const mainContainer = $(".info-page").empty();
            const chosenShowTitle = $(`<h3>${chosenShow.name}</h3>`)
            const ulSeasons = $(`<ul>`);
            const seasonsTitle = $(`<h4 class='showTitle'>`);
            const ulACtors = $(`<ul>`);
            listOfSeasons.forEach(season => {
                const li = $(`<li>`);
                li.text(`${season.startDate} - ${season.endDate}`);
                ulSeasons.append(li);
            })
            listOfActors.forEach(actor => {
                const liActors = $(`<li>`);
                liActors.text(`${actor.name}`);
                ulACtors.append(liActors);
            })
            const infoDisplay = $(`
                <div class='col-12 col-md-6'>
                    <img src='${chosenShow.posterUrl}' id='${chosenShow.id}' class='info-img'>
                </div>
                <div class='col-12 col-md-6'>
                    <div class='row'> 
                        <div class='col-12'>
                        <h4>Seasons (${listOfSeasons.length})</h4>
                            <ul class='seasons'>
                                ${ulSeasons.html()}
                            </ul>
                        </div>
                    </div>
                    <div class='row'> 
                        <div class='col-12'>
                            <h4 class='cast'>Cast</h4>
                            <ul class='actors'>
                                ${ulACtors.html()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class='row description'>
                <div class='col-12'>
                    ${chosenShow.description}
                </div>
            `);
            mainContainer.append(chosenShowTitle);
            mainContainer.append(infoDisplay);
        },
        displaySearchList(listToDisplay) {
            const searchDiv = $(`.search-dropdown`);
            searchDiv.css("display", "block")
            const ulSearch = $(`.dropdown-ul`);
            ulSearch.empty();
            listToDisplay.forEach(show => {
                const $liSearch = $(`
                    <li >
                        <a href='#' id='${show.id}'> ${show.name}</a>
                    </li>
                `);

                ulSearch.append(liSearch);
            })

        },
        reset() {
            $(`.search-box`).val("");
            $(`.dropdown-ul`).empty();
        }
    }
})();