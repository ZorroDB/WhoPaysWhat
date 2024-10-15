export interface CreateGroup {
    UniqueId: string;
    GroupName: string;
    PeopleInGroup: string[];
}

export let groupsArray: CreateGroup[] = [];

export function addGroupToArray(groupName: string) {
    const group: CreateGroup = {
        UniqueId: Date.now().toString(),
        GroupName: groupName,
        PeopleInGroup: []
    };

    groupsArray.push(group);
    localStorage.setItem('groups', JSON.stringify(groupsArray));
}

export function addPersonToGroup(groupId: string, personName: string): void {
    const group = groupsArray.find(group => group.UniqueId === groupId);
    if (group) {
        group.PeopleInGroup.push(personName);
        localStorage.setItem('groups', JSON.stringify(groupsArray));
    }
}
