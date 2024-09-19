let names: string[] = [];

function addPerson(name: string, id: string) {
    const inputValueName: string | null = prompt("Vul naam van de gebruiker in");

    const peopleList = document.getElementById("peopleList");
    
    if (peopleList) {
        peopleList.innerHTML = "";

        names.forEach((name) => {
            const li = document.createElement("li");
            li.textContent = name;
            peopleList.appendChild(li);
        });
    }


    //-----------------------------//
    if (inputValueName) {
        if(!names.includes(inputValueName))
        names.push(inputValueName);
        saveListToLocalStorage();
    } else {
        alert("this user already exists!");
    }
}
