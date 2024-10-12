import { getGroups, getNames } from '.';
import { addPerson, displayNames, loadExistingGroups } from './DOMManipulation';
import { saveGroupListToLocalStorage, saveListToLocalStorage } from './LocalStorage';

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

function getTripName(): void {
    const inputUitje: HTMLInputElement | null = document.getElementById("uitjeName") as HTMLInputElement;
    if (inputUitje !== null) {
        const tripName: string = inputUitje.value.trim();
        if (tripName) {
            try {
                localStorage.setItem("myGroupNameKey", tripName);

                const groups = getGroups();
                groups.push(tripName);
                saveGroupListToLocalStorage();

                const names = getNames();
                names.length = 0;
                saveListToLocalStorage();
                displayNames();
            } catch (e) {
                console.error("Could not save group name.");
            }
            loadNewField();
        }
        else {
            alert("no name entered!");
        }
    }
}

function saveGroup(): void {
    const names = getNames();
    if (names.length >= 2) {
        alert("Group has been saved!");
        saveListToLocalStorage();
        saveGroupListToLocalStorage();
    }
    else {
        alert("Please add at least 2 people to the group!");
    }
}

function loadNewField(): void {
    window.location.href = "dashboard.html";
}
