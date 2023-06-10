const input = document.querySelector(".input > input"),
    btn = document.querySelector(".btn"),
    copy = document.querySelector(".copy"),
    pwdLength = document.querySelector("[data-pwd-length]"),
    formPost = document.querySelector("[data-form]"),
    clientNameInput = document.querySelector("[data-client-input]"),
    clientPassword = document.querySelector("[data-pwd-input]"),
    dataSearch = document.querySelector("[data-search]"),
    searchBtn = document.querySelector(".search-btn"),
    displayPassDiv = document.querySelector(".display-password");

// Class Declaration for Storage
class Storage {
    static addToLocalStorage(list) {
        let storage = localStorage.setItem("cred", JSON.stringify(list));
    }

    static getFromLocalStorage() {
        let storage = (!localStorage.getItem('cred')) ? [] : JSON.parse(localStorage.getItem("cred"));
        return storage;
    }

    static search(searchQuery) {
        let res;
        searchQuery = searchQuery.toLowerCase();
        if(localStorage.getItem("cred")) {
            let storage = JSON.parse(localStorage.getItem("cred"));

            storage.forEach((cred) => {
                if(cred.client === searchQuery) {
                    res = cred.password; // Assuming just one instance of the search query exists in storage
                }
            });

        } else {
            res = `Match not found`;
        }

        return res;
    }
}

// Array of cred objects
let credsList = Storage.getFromLocalStorage();

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

formPost.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent page refresh
    // Create a unique id for instance of Credential class
    let id = Math.random() * 1000000;
    // Convert primaryId to lowerCase
    clientName = clientNameInput.value.toLowerCase();
    // Create instance of Credential class
    const cred = new Credential(id, clientName, clientPassword.value);
    credsList = [...credsList, cred];
    Storage.addToLocalStorage(credsList);
    notification("Credentials saved successfully");
});

class Credential {
    constructor(passId, clientName, clientPassword) { //'client' is the site the password is for
        this.id = passId;
        this.client = clientName;
        this.password = clientPassword;
    }
}

searchBtn.addEventListener('click', () => {
    if(dataSearch.value) {
        let query = dataSearch.value;
        let response = Storage.search(query);
        console.log(response);

        // Display password
        let inputDisplay = document.createElement('input');
        inputDisplay.value = response;
        displayPassDiv.appendChild(inputDisplay);
        notification("Copy password now!");

        setTimeout(() => {
            inputDisplay.remove();
        }, 8000);
    }
});

























let drafts = `Search Class, Storage Class, UI Class. It would be better to have a way to know what sites' passwords I have in my manager`;





let ideas = `
    when you click on the copy button, the notification will pop up telling you that the password has been copied and disappear after
    two seconds. On the third second, a pop up should appear and ask you 'Save password to Manager?' If you want it saved, click yes and 
    no otherwise. If you click yes, the notification will ask you to enter the site the password should be saved for. Enter this answer
    in an input field and this info will be saved in local storage as a key and value pair and the info also populated on the UI with the
    password displayed as asterics. You could then implement an eye icon that shows you the password on click.
`