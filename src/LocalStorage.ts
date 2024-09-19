function saveListToLocalStorage() {
    localStorage.setItem("peopleList", JSON.stringify(names));
}

function loadListFromLocalStorage() {
    const storedList = localStorage.getItem("peopleList");
    if (storedList) {
        names = JSON.parse(storedList);
    }
}
