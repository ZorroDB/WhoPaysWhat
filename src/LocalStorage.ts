import { getGroups, getNames } from ".";

export function saveListToLocalStorage(): void {
    const names = getNames();
    localStorage.setItem("peopleList", JSON.stringify(names));
}

export function saveGroupListToLocalStorage(): void {
    const groups = getGroups();
    localStorage.setItem("groupList", JSON.stringify(groups));
}

