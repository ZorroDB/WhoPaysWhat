export function getNames(): string[] {
    const storedList: string | null = localStorage.getItem("peopleList");
    return storedList ? JSON.parse(storedList) : [];
}

export function getGroups(): string[] {
    const storedList: string | null = localStorage.getItem("groupList");
    return storedList ? JSON.parse(storedList) : [];
}
