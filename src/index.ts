const groupName: string = "";

function getTripName() {
    const inputUitje: HTMLInputElement | null = document.getElementById("uitjeName") as HTMLInputElement | null;

    if (inputUitje !== null) {
        const tripName: string = inputUitje.value;

        try{
            localStorage.setItem(groupName, tripName);
        } catch (e) {
            console.error("Could not save group name.");
        }
        let getGroupName = localStorage.getItem(groupName);
        console.log(getGroupName);
    }
    else {
        console.error("Geen naam gevonden!");
    }
}
// function testShowLocalStorage() {
//     let getGroupName = localStorage.getItem(groupName);
//     console.log(getGroupName);
// }
