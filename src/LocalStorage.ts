export function saveListToLocalStorage(names: string[]) {
    localStorage.setItem("peopleList", JSON.stringify(names));
}

export function loadListFromLocalStorage(): string[] {
    const storedList = localStorage.getItem("peopleList");
    return storedList ? JSON.parse(storedList) : [];
}
