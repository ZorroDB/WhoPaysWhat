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
    console.log("Hello dit is een test.");
    if (storedGroupName) {
        document.getElementById("groupNameTitle")!.innerHTML = storedGroupName;
    } else {
        document.getElementById("groupNameTitle")!.innerHTML = "No group name found!";
    }
}



