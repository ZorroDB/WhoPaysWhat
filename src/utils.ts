export type Payment = {
    name: string,
    date: Date,
    description: string,
    payments: number
}

export type Group = {
    id: number,
    groupName: string,
    members: string[],
    payments: Payment[]
}

export function CreateGroup(groupName: string): Group {
    const newGroup: Group = {
        id: Date.now(),
        groupName: groupName,
        members: [],
        payments: []
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
    const groupsString = localStorage.getItem('groups');
    const groups: Group[] = groupsString ? JSON.parse(groupsString) : [];

    const group = groups.find(g => g.id === groupId);
    if (group) {
        group.members.push(memberName);
        localStorage.setItem('groups', JSON.stringify(groups));
    }
}
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(amount);
}
