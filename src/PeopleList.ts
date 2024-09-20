import { loadListFromLocalStorage, saveListToLocalStorage } from './LocalStorage';

let names: string[] = loadListFromLocalStorage();

export function addPerson(name: string) {
    if(!names.includes(name)) {
        names.push(name);
        saveListToLocalStorage(names);
    } else {
        alert("This user already exists!");
    }
}

export function removePerson(name: string) {
    names = names.filter(n => n !== name);
    saveListToLocalStorage(names);
}
