import { saveGroupListToLocalStorage } from "./LocalStorage";

export interface Group {
    id: number;
    groupName: string;
    members: string[];
}

export let groups: Group[] = [];

export function createGroup(groupName: string, memberNames: string[]): void {
    const newGroup: Group = {
        id: groups.length,
        groupName: groupName,
        members: memberNames,
    };
    groups.push(newGroup);
    saveGroupListToLocalStorage();
}
