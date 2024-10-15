import { getGroups, setGroups } from './index';

export function saveGroupListToLocalStorage(): void {
    localStorage.setItem("groups", JSON.stringify(getGroups()));
}

export function loadGroupListFromLocalStorage(): void {
    const storedGroups: string | null = localStorage.getItem("groups");
    if (storedGroups) {
        setGroups(JSON.parse(storedGroups));
    }
}
