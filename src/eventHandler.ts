import { getGroups } from './index';
import { saveGroupListToLocalStorage } from './LocalStorage';
import { addGroupToArray, addPersonToGroup } from './utils';

document.addEventListener("DOMContentLoaded", () => {
    const eventSubmitBtn: HTMLElement | null = document.getElementById("planTrip");
    const addPersonBtn: HTMLElement | null = document.getElementById("addPerson");

    if (eventSubmitBtn) {
        eventSubmitBtn.addEventListener("click", getTripName);
    }
    if (addPersonBtn) {
        addPersonBtn.addEventListener("click", addPersonToCurrentGroup);
    }
});

function getTripName(): void {
    const inputUitje: HTMLInputElement | null = document.getElementById("uitjeName") as HTMLInputElement;
    if (inputUitje !== null) {
        const tripName: string = inputUitje.value.trim();
        if (tripName) {
            addGroupToArray(tripName);
            saveGroupListToLocalStorage(); 
            window.location.href = "dashboard.html"; 
        } else {
            alert("No name entered!");
        }
    }
}

function addPersonToCurrentGroup(): void {
    const groupId = localStorage.getItem("currentGroupId"); 
    if (groupId) {
        const personName = prompt("Enter the name of the person");
        if (personName) {
            addPersonToGroup(groupId, personName);
            saveGroupListToLocalStorage(); 
        }
    }
}
