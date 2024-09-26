const groupNameKey: string = "myGroupNameKey";

const tabs = document.querySelectorAll(".tab");

let names: string[] = [];
let groups: string[] = [];

const existingIds = new Set();

function getTripName() {
    const inputUitje = document.getElementById("uitjeName") as HTMLInputElement | null;

    if (inputUitje !== null) {
        const tripName = inputUitje.value.trim();
        if (tripName) {

            //maakt nieuw object aan
            const newGroup = {
                id: generateUniqueId(),
                name: tripName,
                people: [],
            };

            groups.push();
            localStorage.setItem(groupNameKey, JSON.stringify(groups));
            loadNewField();
        } else {
            console.error("No name found!");
        }
    }
}
function loadGroups() {
    const storedGroups = localStorage.getItem(groupNameKey);
    if (storedGroups) {
        groups = JSON.parse(storedGroups);
    }
}


function loadNewField() {
    window.location.href = "dashboard.html";
}
function displayGroupName() {
    const storedGroupName = localStorage.getItem(groupNameKey);
    if (storedGroupName) {
        document.getElementById("groupNameTitle")!.innerHTML = storedGroupName;
    } else {
        document.getElementById("groupNameTitle")!.innerHTML = "No group name found!";
    }
}
function existingGroups() {
    const existingGroupsList = document.getElementById("existingTrips");

    if (existingGroupsList) {
        existingGroupsList.innerHTML = "";

        groups.forEach((name, index) => {
            const li = document.createElement("li");

            const nameText = document.createTextNode(name);

            const icon = document.createElement("i");
            icon.classList.add("fa-solid", "fa-trash-can");

            icon.addEventListener("click", () => {
                removePerson(index);
            });

            li.appendChild(nameText);
            li.appendChild(icon);

            existingGroupsList.appendChild(li);
        });
    }
}
function displayNames() {
    const peopleList = document.getElementById("peopleList");

    if (peopleList) {
        peopleList.innerHTML = "";

        names.forEach((name, index) => {
            const li = document.createElement("li");

            const nameText = document.createTextNode(name);

            const icon = document.createElement("i");
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
function handleTabClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (target && target.classList.contains("tab")) {
        document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
        document.querySelectorAll(".content").forEach((content) => content.classList.remove("active"));

        const selectedTab = target.getAttribute("data-tab");
        if (selectedTab) {
            target.classList.add("active");
            const contentElement = document.getElementById(selectedTab);
            if (contentElement) {
                contentElement.classList.add("active");
            }
        }
    }
}
tabs.forEach((tab) => {
    tab.addEventListener("click", handleTabClick);
});
function addPerson() {
    const inputValueName: string | null = prompt("Vul naam van de gebruiker in");
    if (inputValueName && names.length < 9) {
        if (!names.includes(inputValueName)) {
            const userName = inputValueName.trim();
            names.push(userName);
            displayNames();
        } else {
            alert("This user already exists!");
        }
    }
}
function saveListToLocalStorage() {
    localStorage.setItem("peopleList", JSON.stringify(names));
}
function loadListFromLocalStorage() {
    const storedList = localStorage.getItem("peopleList");
    if (storedList) {
        names = JSON.parse(storedList);
    }
}
function removePerson(index: number) {
    const result = prompt("Are you sure you want to delete this user?");
    if (result) {
        names.splice(index, 1);

        saveGroup();
        displayNames();
    } else {
        alert("Cancelled!");
    }

}
function reset() {
    localStorage.clear();
    location.reload();
}
function saveGroup() {
    if (names.length >= 2) {
        console.log("it's working!");
        saveListToLocalStorage();
    } else {
        console.log("it works!");
        alert("Maak alstublieft zeker om meer dan 2 personen toe te voegen!");
    }
}
function generateUniqueId() {
    let id;
    do {
        id = Math.floor(Math.random() * 99);
    } while (existingIds.has(id));
    existingIds.add(id);
    return id;
}
window.onload = () => {
    displayGroupName();
    loadListFromLocalStorage();
    displayNames();
};
