const key: string = "myGroupNameKey";

const eventSubmitBtn = document.getElementById("planTrip");
const addPersonBtn = document.getElementById("addPerson");
const saveGroupBtn = document.getElementById("saveGroup");

addPersonBtn?.addEventListener("click", addPerson);
eventSubmitBtn?.addEventListener("click", getTripName);
saveGroupBtn?.addEventListener("click", saveGroup);


function getTripName() {
    const inputUitje: HTMLInputElement | null = document.getElementById(
        "uitjeName"
    ) as HTMLInputElement | null;

    if (inputUitje !== null) {
        const tripName: string = inputUitje.value;

        try {
            localStorage.setItem(key, tripName);
        } catch (e) {
            console.error("Could not save group name.");
        }
        loadNewField();
    } else {
        console.error("No name found!");
    }
}

function loadNewField() {
    window.location.href = "dashboard.html";
}

function displayGroupName() {
    const storedGroupName = localStorage.getItem(key);
    if (storedGroupName) {
        document.getElementById("groupNameTitle")!.innerHTML = storedGroupName;
    } else {
        document.getElementById("groupNameTitle")!.innerHTML = "No group name found!";
    }
}

let names: string[] = [];

function addPerson() {
    const inputValueName: string | null = prompt("Vul naam van de gebruiker in");
    console.log(inputValueName);
    if (inputValueName && names.length < 9) {
        if (!names.includes(inputValueName)) {
            names.push(inputValueName);
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

function removePerson(index: number) {
    let confirmationRemove: boolean = confirm("Are you sure you wish to remove this user?");

    if (confirmationRemove) {
        names.splice(index, 1);
    }
    displayNames();
}

function saveGroup() {
    if (names.length >= 2) {
        alert("Group has been saved!");
        saveListToLocalStorage();
    }
    else {
        alert("Maak alstublieft zeker om meer dan 2 personen toe te voegen!");
    }
}

window.onload = () => {
    displayGroupName();
    loadListFromLocalStorage();
    displayNames();
};
