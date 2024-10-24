import { getGroups, getNames } from ".";

export function saveListToLocalStorage(): void {
    const names: string[] = getNames();
    localStorage.setItem("peopleList", JSON.stringify(names));
}

export function saveGroupListToLocalStorage(): void {
    const groups: string[] = getGroups();
    localStorage.setItem("groupList", JSON.stringify(groups));
}
