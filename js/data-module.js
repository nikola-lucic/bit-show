const dataModule = (() => {

    class Show {
        constructor(name, id, posterUrl, description, rating) {
            this.name = name;
            this.id = id;
            this.posterUrl = posterUrl;
            this.description = description;
            this.rating = rating;
        }

        getShowName() {
            return `${this.name}`;
        }
    }

    class Season {
        constructor(startDate, endDate, numOfSeasons) {
            this.startDate = startDate;
            this.endDate = endDate;
            this.numOfSeasons = numOfSeasons;
        }

        getStartDateEndDate() {
            return `${this.startDate} - ${this.endDate}`;
        }
    }

    class Person {
        constructor(name) {
            this.name = name;
        }
    }

    class Actor extends Person {
        constructor(name) {
            super(name);
            this.person = this.name;
        }
    }

    return {
        listOfAllShows: [],
        top50Shows: [],
        listOfActors: [],
        listOfSeasons: [],
        fetchShow(success, failed) {
            const request = $.ajax({
                url: `http://api.tvmaze.com/shows`,
                method: "GET"
            }).done((response) => {
                response.map(show => {
                    const createdShow = new Show(show.name, show.id, show.image.original, show.summary, show.rating);
                    this.listOfAllShows.push(createdShow);
                })
                this.listOfAllShows.sort((a, b) => {
                    a = a.rating.average;
                    b = b.rating.average;
                    return b - a;
                })
                this.top50Shows = this.listOfAllShows.slice(0, 50);
                success(this.top50Shows);


            }).fail((jq, textStatus) => {
                failed();
            })
        },
        chosenShow(evId) {
            const clickedShow = this.listOfAllShows.find(show => {
                return parseInt(evId) === show.id;
            })
            return clickedShow;
        },
        fetchSeasonsAndCast(success, fail, clickedShow) {
            const request = $.ajax({
                url: `http://api.tvmaze.com/shows/${clickedShow.id}/seasons`,
                method: "GET"
            }).done(response => {
                response.map(season => {
                    const createdSeason = new Season(season.premiereDate, season.endDate, response.length);
                    this.listOfSeasons.push(createdSeason);
                })
            }).fail((jq, textStatus) => {
                fail();
            });

            const castRequest = $.ajax({
                url: `http://api.tvmaze.com/shows/${clickedShow.id}/cast`,
                method: "GET"
            }).done(response => {
                response.map(actor => {
                    const createdActor = new Actor(name);
                    this.listOfActors.push(createdActor);
                })
                success(clickedShow, this.listOfSeasons, this.listOfActors);
            }).fail((jq, textStatus) => {
                fail();
            })
        },

        findSearchShows(searchValue, showSearched) {
            const completeList = this.listOfAllShows;
            const listOfSearchedSuggestions = [];
            completeList.forEach(show => {
                const lowercaseName = show.name.toLowerCase();
                if (lowercaseName.includes(searchValue)) {
                    listOfSearchedSuggestions.push(show);
                }
            })
            const slicedList = listOfSearchedSuggestions.slice(0, 10);
            showSearched(slicedList);
        }
    }

})();