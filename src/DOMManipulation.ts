import { getGroups, getNames } from './index';
import { loadGroupListFromLocalStorage, loadListFromLocalStorage } from './LocalStorage';

export function displayGroupName(): void {
    const storedGroupName: string | null = localStorage.getItem("myGroupNameKey");
    const groupNameTitle: HTMLElement | null = document.getElementById("groupNameTitle");
    if (groupNameTitle) {
        groupNameTitle.innerHTML = storedGroupName ?? "No group name found!";
    }
}

export function addPerson(): void {
    const inputValueName: string | null = prompt("Enter the name of the person");
    const names = getNames();
    if (inputValueName && names.length < 9) {
        if (!names.includes(inputValueName)) {
            names.push(inputValueName);
            displayNames();
        } else {
            alert("This user already exists!");
        }
    }
}

export function displayNames(): void {
    const names = getNames();
    const peopleList: HTMLElement | null = document.getElementById("peopleList");
    if (peopleList) {
        peopleList.innerHTML = "";
        names.forEach((name: string, index: number) => {
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
    const names = getNames();
    if (confirmationRemove) {
        names.splice(index, 1);
        displayNames();
    }
}

export function loadExistingGroups(): void {
    const groups = getGroups();
    const tripsNames: HTMLElement | null = document.getElementById("existingTrips");
    if (tripsNames) {
        tripsNames.innerHTML = "";
        groups.forEach((group: string) => {
            const li: HTMLLIElement = document.createElement("li");
            const uniqueId = crypto.randomUUID(); 
            li.id = uniqueId;
            const groupText: Text = document.createTextNode(group);
            li.appendChild(groupText);
            tripsNames.appendChild(li);

            localStorage.setItem(uniqueId, group);

            li.addEventListener("click", () => {
                handleGroupClick(uniqueId);
            })
        });
    }
}

export function handleGroupClick(id: string): void {
    const groupName = localStorage.getItem(id);

    console.log("id: " + id);
    console.log("group: " + groupName);
}

window.onload = (): void => {
    displayGroupName();
    loadListFromLocalStorage();
    loadGroupListFromLocalStorage();
    displayNames();
    loadExistingGroups();
};
