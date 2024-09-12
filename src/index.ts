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
    const inputValueName: string | null = prompt("Vul naam van de gebruiker in");

    if (inputValueName) {
        const li = document.createElement("li");
        li.textContent = inputValueName;

        const peopleList = document.getElementById("peopleList");
        if (peopleList) {
            peopleList.appendChild(li);
        } else {
            console.error("peopleList element not found");
        }
    } else {
        console.log("No name was entered.");
    }
}
