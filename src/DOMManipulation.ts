import { getGroups } from './index';

export function loadExistingGroups(): void {
    const groups = getGroups();
    const tripsNames: HTMLElement | null = document.getElementById("existingTrips");
    if (tripsNames) {
        tripsNames.innerHTML = "";
        groups.forEach((group) => {
            const li: HTMLLIElement = document.createElement("li");
            li.id = group.UniqueId;
            const groupText: Text = document.createTextNode(group.GroupName);
            li.appendChild(groupText);
            tripsNames.appendChild(li);

            li.addEventListener("click", () => {
                handleGroupClick(group.UniqueId);
            });
        });
    }
}

export function handleGroupClick(id: string): void {
    localStorage.setItem("currentGroupId", id);
    window.location.href = "dashboard.html";
}
