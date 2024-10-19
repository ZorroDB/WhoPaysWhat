import { Group } from './utils';
// Assuming getNames is a function that retrieves the names array from localStorage or another source
import { getNames } from './index';

// Use a single DOMContentLoaded listener
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
    const inputValueName: string | null = prompt("Enter the name of the person");
    if (inputValueName) {
        const names = getNames(); // Fetch the current names
        if (names.length < 9) {
            if (!names.includes(inputValueName)) {
                names.push(inputValueName); // Add new person to names array
                localStorage.setItem("names", JSON.stringify(names)); // Save updated names
                displayNames(); // Refresh the displayed names
            } else {
                alert("This user already exists!");
            }
        } else {
            alert("Maximum of 9 names reached.");
        }
    }
}

export function displayNames(): void {
    const peopleList: HTMLElement | null = document.getElementById("peopleList");
    if (peopleList) {
        peopleList.innerHTML = "";
        const names = getNames(); // Ensure you fetch the latest names
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
    const names = getNames(); // Fetch the current names
    if (confirmationRemove) {
        names.splice(index, 1); // Remove the person
        localStorage.setItem("names", JSON.stringify(names)); // Save updated names
        displayNames(); // Refresh the displayed names
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
            li.id = group.id.toString(); // Use group ID
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
    localStorage.setItem("currentGroupId", groupId.toString()); // Save selected group ID
    window.location.href = "dashboard.html"; // Redirect to dashboard
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
