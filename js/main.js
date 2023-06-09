const input = document.querySelector(".input > input"),
    btn = document.querySelector(".btn"),
    copy = document.querySelector(".copy"),
    pwdLength = document.querySelector("[data-pwd-length]"),
    form = document.querySelector("[data-form]"),
    clientName = document.querySelector("[data-client-input]"),
    clientPassword = document.querySelector("[data-pwd-input]");

// Array of cred objects
let credsList = [];

// Password string
// Excluded zero's and letter O's from string for their ease of confusion
let passwordKeys = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz123456789-=[]';/.,!@#$%^&*()|{}";

btn.addEventListener('click', () => {
    let password = "";
    let passwordLength = pwdLength.value;
    for(let i = 0; i < passwordLength; i++) {
        password += passwordKeys.charAt(Math.floor(Math.random() * passwordKeys.length));
    }

    input.value = password;
});

// Copy to clipboard implementation
copy.addEventListener('click', () => {
    const inputValue = input.value;
    if(!inputValue) {
        notification("Generate Password");
    } else {
        navigator.clipboard.writeText(input.value).then(() => {
            notification("Password is Copied");
        });
    }
});

function notification(text) {
    const notify = document.querySelector(".container .notify");
    const div = document.createElement('div');
    div.className = 'alert';
    div.innerHTML = `
    <p>${text}</p>
    `;
    
    notify.appendChild(div);

    // Remove "Password is Copied" notification from UI after 2 secs
    setTimeout(() => {
        div.remove();
    }, 2000);
}

form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent page refresh
    let id = Math.random() * 1000000;
    let cred = new Credential(id, clientName.value, clientPassword.value);
    // Add credential to credsList array
    credsList = [...credsList, cred];
    Storage.addToLocalStorage(credsList);
    let myCred = Storage.getFromLocalStorage("cred");
    console.log(myCred);
});

class Credential {
    constructor(passId, clientName, clientPassword) { //'client' is the site the password is for
        this.id = passId;
        this.client = clientName;
        this.password = clientPassword;
    }
}

class Storage {
    static addToLocalStorage(credsList) {
        let storage = localStorage.setItem("cred", JSON.stringify(credsList));
        return storage;
    }

    static getFromLocalStorage() {
        let storage = localStorage.getItem("cred") === null ? [] : JSON.parse(localStorage.getItem("cred"));
        return storage;
    }
}





























let drafts = `Search Class, Storage Class, UI Class`;





let ideas = `
    when you click on the copy button, the notification will pop up telling you that the password has been copied and disappear after
    two seconds. On the third second, a pop up should appear and ask you 'Save password to Manager?' If you want it saved, click yes and 
    no otherwise. If you click yes, the notification will ask you to enter the site the password should be saved for. Enter this answer
    in an input field and this info will be saved in local storage as a key and value pair and the info also populated on the UI with the
    password displayed as asterics. You could then implement an eye icon that shows you the password on click.
`