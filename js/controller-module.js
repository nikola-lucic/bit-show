const controller = ((ui, data) => {

    function showInfoHandler(event) {
        if (event.target.parentElement.tagName === "A" || event.target.tagName === "A") {
            event.preventDefault();
            ui.setLocalStorage(event.target.id);
            // ui.redirectionToShowInfo();
            const id = localStorage.getItem("id");
            const clickedShow = data.chosenShow(id);
            data.fetchSeasonsAndCast(ui.displayOnShowInfo, ui.failed, clickedShow);
        }
    }

    function searchHandler(event) {
        const searchValue = ui.searchInput.val();
        data.findSearchShows(searchValue, ui.displaySearchList);
    }

    return {
        init() {
            data.fetchShow(ui.displayTop50, ui.failed);
            $(`body`).on("click", showInfoHandler);
            $(`.search-box`).on("keyup", searchHandler);
        },
    }
})(uiModule, dataModule);