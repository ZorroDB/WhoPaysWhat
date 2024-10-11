const key: string = "myGroupNameKey";

let names: string[] = [];
let groups: string[] = [];

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
                localStorage.setItem(key, tripName);

                groups.push(tripName);
                saveGroupListToLocalStorage();

                names = [];
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

function loadNewField(): void {
    window.location.href = "dashboard.html";
}

function displayGroupName(): void {
    const storedGroupName: string | null = localStorage.getItem(key);
    const groupNameTitle: HTMLElement | null = document.getElementById("groupNameTitle");
    if (groupNameTitle) {
        groupNameTitle.innerHTML = storedGroupName ?? "No group name found!";
    }
}

function addPerson(): void {
    const inputValueName: string | null = prompt("Vul naam van de gebruiker in");
    if (inputValueName && names.length < 9) {
        if (!names.includes(inputValueName)) {
            names.push(inputValueName);
            displayNames();
        } else {
            alert("This user already exists!");
        }
    }
}

function saveListToLocalStorage(): void {
    localStorage.setItem("peopleList", JSON.stringify(names));
}

function saveGroupListToLocalStorage(): void {
    localStorage.setItem("groupList", JSON.stringify(groups));
}

function loadListFromLocalStorage(): void {
    const storedList: string | null = localStorage.getItem("peopleList");
    if (storedList) {
        names = JSON.parse(storedList);
    }
}

function loadGroupListFromLocalStorage(): void {
    const storedList: string | null = localStorage.getItem("groupList");
    if (storedList) {
        groups = JSON.parse(storedList);
    }
}

function displayNames(): void {
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

function removePerson(index: number): void {
    const confirmationRemove: boolean = confirm("Are you sure you wish to remove this user?");
    if (confirmationRemove) {
        names.splice(index, 1);
        displayNames();
    }
}

function saveGroup(): void {
    if (names.length >= 2) {
        alert("Group has been saved!");
        saveListToLocalStorage();
        saveGroupListToLocalStorage();
    }
    else {
        alert("Maak alstublieft zeker om meer dan 2 personen toe te voegen!");
    }
}

function loadExistingGroups(): void {
    loadGroupListFromLocalStorage();
    const tripsNames: HTMLElement | null = document.getElementById("existingTrips");
    if (tripsNames) {
        tripsNames.innerHTML = "";
        groups.forEach((group: string, index: number) => {
            const li: HTMLLIElement = document.createElement("li");
            const uniqueId = `group-${Date.now()}-${index}`; 
            li.id = uniqueId;
            const groupText: Text = document.createTextNode(group);
            li.appendChild(groupText);
            tripsNames.appendChild(li);
        });
    }
}

window.onload = (): void => {
    displayGroupName();
    loadListFromLocalStorage();
    displayNames();
    loadExistingGroups();
};
