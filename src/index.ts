import { link } from "fs";

const groupNameKey: string = "myGroupNameKey";

function getTripName() {
    const inputUitje: HTMLInputElement | null = document.getElementById(
        "uitjeName"
    ) as HTMLInputElement | null;

    if (inputUitje !== null) {
        const tripName: string = inputUitje.value;

        try {
            localStorage.setItem(groupNameKey, tripName);
        } catch (e) {
            console.error("Could not save group name.");
        }
        loadNewField();
    } else {
        console.error("Geen naam gevonden!");
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
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
    tab.addEventListener("click", handleTabClick);
});

function addPerson() {
    const peopleList = document.getElementById("peopleList");

    function addPersonToList(name: string) {
        if (peopleList) {
            const li = document.createElement("li");
            li.textContent = name;
            peopleList.appendChild(li);

            saveListToLocalStorage();
        }
    }

    function saveListToLocalStorage() {
        if (peopleList) {
            const listItems = peopleList.querySelectorAll("li");
            const names = Array.from(listItems).map((li) => li.textContent || ""); // Get all names from the list
            localStorage.setItem("peopleList", JSON.stringify(names)); // Save as JSON string
        }
    }

    // Function to load the list from localStorage
    function loadListFromLocalStorage() {
        const storedList = localStorage.getItem("peopleList");
        if (storedList && peopleList) {
            const names = JSON.parse(storedList);
            names.forEach((name: string) => {
                const li = document.createElement("li");
                li.textContent = name;
                peopleList.appendChild(li);
            });
        }
    }

    loadListFromLocalStorage();

    const inputValueName: string | null = prompt("Vul naam van de gebruiker in");
    if (inputValueName) {
        addPersonToList(inputValueName);
    }
}
