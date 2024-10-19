export type Group = {
    id: number,
    groupName: string,
    members: string[],
}

export function CreateGroup(groupName: string): Group {
    const newGroup: Group = {
        id: Date.now(),
        groupName: groupName,
        members: [],
    };

    return newGroup;
}

export function saveGroupToLocalStorage(group: Group) {
    const groupsString = localStorage.getItem("groups");
    const groups = groupsString ? JSON.parse(groupsString) : [];

    groups.push(group);

    localStorage.setItem("groups", JSON.stringify(groups));
}

export function addMemberToGroup(groupId: number, memberName: string) {
    // Retrieve existing groups from localStorage
    const groupsString = localStorage.getItem('groups');
    const groups: Group[] = groupsString ? JSON.parse(groupsString) : [];

    // Find the group by its ID
    const group = groups.find(g => g.id === groupId);
    if (group) {
        group.members.push(memberName);
        localStorage.setItem('groups', JSON.stringify(groups));
    }
}
