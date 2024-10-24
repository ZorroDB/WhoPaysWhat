import { getNames } from '.';
import { addPerson } from './DOMManipulation';
import { addMemberToGroup, CreateGroup, Group, saveGroupToLocalStorage } from './utils';

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

const tabElements: NodeListOf<HTMLLIElement> = document.querySelectorAll('.tab');
const contentSections: NodeListOf<HTMLDivElement> = document.querySelectorAll('.content');

function handleTabClick(this: HTMLLIElement) {
    // Remove 'active' class from all tabs and content sections
    tabElements.forEach(tab => tab.classList.remove('active'));
    contentSections.forEach(content => content.classList.remove('active'));

    // Add 'active' class to the clicked tab
    this.classList.add('active');

    // Get the corresponding content section
    const tabId = this.getAttribute('data-tab');
    if (tabId) {
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
            // Show the selected content section
            targetContent.classList.add('active');
        }
    }
}

// Attach event listeners to each tab element
tabElements.forEach(tab => {
    tab.addEventListener('click', handleTabClick);
});

function getTripName(): void {
    const inputUitje: HTMLInputElement | null = document.getElementById("uitjeName") as HTMLInputElement;
    if (inputUitje !== null) {
        const tripName: string = inputUitje.value.trim();
        if (tripName) {
            try {
                const newGroup = CreateGroup(tripName);
                saveGroupToLocalStorage(newGroup);
                localStorage.setItem("myGroupNameKey", tripName);

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
        
        const groupsString = localStorage.getItem('groups');
        const groups: Group[] = groupsString ? JSON.parse(groupsString) : [];
        const group = groups.find(g => g.id === groupId);

        if (group) {
            if (group.members.length + names.length >= 2) {
                names.forEach(name => addMemberToGroup(groupId, name));
                alert("Group has been saved!");
            } else {
                alert("Please ensure the group has at least 2 people!");
            }
        }
    }
}

function loadNewField(): void {
    window.location.href = "existingTrips.html";
}
