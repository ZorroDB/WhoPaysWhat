export interface CreateGroup {
    UniqueId: string;
    GroupName: string;
    PeopleInGroup: string[];
}

export let groupsArray: CreateGroup[] = [];

export function addGroupToArray(groupName: string, people: string[]) {
    const group: CreateGroup = {
        UniqueId: Date.now().toString(),
        GroupName: groupName,
        PeopleInGroup: people
    };

    groupsArray.push(group);
    localStorage.setItem('groups', JSON.stringify(groupsArray));
}
