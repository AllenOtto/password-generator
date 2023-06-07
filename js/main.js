const input = document.querySelector(".input > input"),
    btn = document.querySelector(".btn"),
    copy = document.querySelector(".copy");

// Password string
let passwordKeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-=[]';/.,!@#$%^&*()|{}";

btn.addEventListener('click', () => {
    let password = "";
    let passwordLength = 12;
    for(let i = 0; i < passwordLength; i++) {
        password += passwordKeys.charAt(Math.floor(Math.random() * passwordKeys.length));
    }

    input.value = password;
});