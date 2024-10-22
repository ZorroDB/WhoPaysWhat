import { Group } from './utils';

document.addEventListener("DOMContentLoaded", () => {
    displayGroupName();
    displayNames();
    loadExistingGroups();
    displayGroupDetails();
});

export function displayGroupName(): void {
    const storedGroupName: string | null = localStorage.getItem("myGroupNameKey");
    const groupNameTitle: HTMLElement | null = document.getElementById("groupNameTitle");
    if (groupNameTitle) {
        groupNameTitle.innerHTML = storedGroupName ?? "No group name found!";
    }
}

export function addPerson(): void {
    const groupIdString = localStorage.getItem("currentGroupId");
    if (!groupIdString) {
        alert("No group selected!");
        return;
    }

    const groupId = parseInt(groupIdString, 10);
    const groupsString = localStorage.getItem("groups");
    const groups: Group[] = groupsString ? JSON.parse(groupsString) : [];
    
    const group = groups.find(g => g.id === groupId);
    if (!group) {
        alert("Group not found!");
        return;
    }

    const inputValueName: string | null = prompt("Enter the name of the person");
    if (inputValueName && group.members.length < 9) {
        if (!group.members.includes(inputValueName)) {
            group.members.push(inputValueName);
            localStorage.setItem("groups", JSON.stringify(groups));
            displayNames();
        } else {
            alert("This user already exists!");
        }
    }
}

export function displayNames(): void {
    const groupIdString = localStorage.getItem("currentGroupId");
    if (!groupIdString) {
        alert("No group selected!");
        return;
    }

    const groupId = parseInt(groupIdString, 10);
    const groupsString = localStorage.getItem("groups");
    const groups: Group[] = groupsString ? JSON.parse(groupsString) : [];
    
    const group = groups.find(g => g.id === groupId);
    if (!group) {
        alert("Group not found!");
        return;
    }

    const peopleList: HTMLElement | null = document.getElementById("peopleList");
    if (peopleList) {
        peopleList.innerHTML = "";

        group.members.forEach((name: string, index: number) => {
            const li: HTMLLIElement = document.createElement("li");
            const nameText: Text = document.createTextNode(name);

            const icon: HTMLElement = document.createElement("i");
            icon.classList.add("fa-solid", "fa-trash-can");
            icon.addEventListener("click", () => {
                removePerson(index);
            });

            li.appendChild(nameText);
            li.appendChild(icon);
            peopleList.appendChild(li);
        });
    }
}

export function removePerson(index: number): void {
    const confirmationRemove: boolean = confirm("Are you sure you wish to remove this person?");
    const groupIdString = localStorage.getItem('currentGroupId');
    if (groupIdString && confirmationRemove) {
        const groupId = parseInt(groupIdString, 10);
        
        const groupsString = localStorage.getItem('groups');
        const groups: Group[] = groupsString ? JSON.parse(groupsString) : [];
        const group = groups.find(g => g.id === groupId);
        
        if (group) {
            group.members.splice(index, 1);
            
            const updatedGroups = groups.map(g => g.id === groupId ? group : g);
            localStorage.setItem('groups', JSON.stringify(updatedGroups));
            
            displayGroupDetails();
        }
    }
}

export function loadExistingGroups(): void {
    const groupsString = localStorage.getItem("groups");
    const groups: Group[] = groupsString ? JSON.parse(groupsString) : [];
    const tripsNames: HTMLElement | null = document.getElementById("existingTrips");

    if (tripsNames) {
        tripsNames.innerHTML = "";
        groups.forEach(group => {
            const li: HTMLLIElement = document.createElement("li");
            li.id = group.id.toString();
            const groupText: Text = document.createTextNode(group.groupName);
            li.appendChild(groupText);
            tripsNames.appendChild(li);

            li.addEventListener("click", () => {
                handleGroupClick(group.id);
            });
        });
    }
}

export function handleGroupClick(groupId: number): void {
    localStorage.setItem("currentGroupId", groupId.toString());
    window.location.href = "dashboard.html";
}

export function displayGroupDetails(): void {
    const groupIdString = localStorage.getItem("currentGroupId");
    if (groupIdString) {
        const groupId = parseInt(groupIdString, 10);
        const groupsString = localStorage.getItem("groups");
        const groups: Group[] = groupsString ? JSON.parse(groupsString) : [];
        const group = groups.find(g => g.id === groupId);

        if (group) {
            const groupNameTitle = document.getElementById("groupNameTitle");
            if (groupNameTitle) groupNameTitle.textContent = group.groupName;

            const peopleList = document.getElementById("peopleList");
            if (peopleList) {
                peopleList.innerHTML = "";
                group.members.forEach(member => {
                    const li = document.createElement("li");
                    li.textContent = member;
                    peopleList.appendChild(li);
                });
            }
        }
    }
}
