import { CreateGroup } from './utils';

let groups: CreateGroup[] = [];
export function getGroups(): CreateGroup[] {
    return groups;
}

export function setGroups(newGroups: CreateGroup[]): void {
    groups = newGroups;
}

export function getGroupById(groupId: string): CreateGroup | undefined {
    return groups.find(group => group.UniqueId === groupId);
}
