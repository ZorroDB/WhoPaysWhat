import { getGroups, getNames } from '.';
import { addPerson, displayNames } from './DOMManipulation';
import { saveGroupListToLocalStorage, saveListToLocalStorage } from './LocalStorage';
import { addMemberToGroup, CreateGroup, saveGroupToLocalStorage } from './utils';

document.addEventListener("DOMContentLoaded", () => {
    const eventSubmitBtn: HTMLElement | null = document.getElementById("planTrip");
    const addPersonBtn: HTMLElement | null = document.getElementById("addPerson");
    const saveGroupBtn: HTMLElement | null = document.getElementById("saveGroup");

    if (addPersonBtn) {
        addPersonBtn.addEventListener("click", addPerson);
    }
    if (eventSubmitBtn) {
        eventSubmitBtn.addEventListener("click", getTripName);
    }
    if (saveGroupBtn) {
        saveGroupBtn.addEventListener("click", saveGroup);
    }
});

function getTripName(): void {
    const inputUitje: HTMLInputElement | null = document.getElementById("uitjeName") as HTMLInputElement;
    if (inputUitje !== null) {
        const tripName: string = inputUitje.value.trim();
        if (tripName) {
            try {
                const newGroup = CreateGroup(tripName); // Create the group
                saveGroupToLocalStorage(newGroup); // Save the group in localStorage
                localStorage.setItem("myGroupNameKey", tripName);

                // Redirect to the dashboard after saving the group
                loadNewField();
            } catch (e) {
                console.error("Could not save group name.");
            }
        } else {
            alert("No name entered!");
        }
    }
}

function saveGroup(): void {
    const names = getNames();
    const groupIdString = localStorage.getItem('currentGroupId');
    if (groupIdString) {
        const groupId = parseInt(groupIdString, 10);

        if (names.length >= 2) {
            names.forEach(name => addMemberToGroup(groupId, name));
            alert("Group has been saved!");
        } else {
            alert("Please add at least 2 people to the group!");
        }
    }
}

function loadNewField(): void {
    window.location.href = "existingTrips.html";
}
