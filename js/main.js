const input = document.querySelector(".input > input"),
    btn = document.querySelector(".btn"),
    copy = document.querySelector(".copy");

// Password string
// Excluded zero's and letter O's from string for their ease of confusion
let passwordKeys = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz123456789-=[]';/.,!@#$%^&*()|{}";

btn.addEventListener('click', () => {
    let password = "";
    let passwordLength = 12;
    for(let i = 0; i < passwordLength; i++) {
        password += passwordKeys.charAt(Math.floor(Math.random() * passwordKeys.length));
    }

    input.value = password;
});

// Copy to clipboard implementation
copy.addEventListener('click', () => {
    navigator.clipboard.writeText(input.value).then(() => {
        notification("Password is Copied");
    });
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