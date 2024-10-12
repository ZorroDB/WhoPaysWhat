import { getGroups, getNames, setGroups, setNames } from './index';

export function saveListToLocalStorage(): void {
    localStorage.setItem("peopleList", JSON.stringify(getNames()));
}

export function saveGroupListToLocalStorage(): void {
    localStorage.setItem("groupList", JSON.stringify(getGroups()));
}

export function loadListFromLocalStorage(): void {
    const storedList: string | null = localStorage.getItem("peopleList");
    if (storedList) {
        setNames(JSON.parse(storedList));
    }
}

export function loadGroupListFromLocalStorage(): void {
    const storedList: string | null = localStorage.getItem("groupList");
    if (storedList) {
        setGroups(JSON.parse(storedList));
    }
}
