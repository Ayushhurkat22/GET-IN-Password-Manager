
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Submit Button Clicked");
    console.log(
        username.value,
        password.value
    );
    const usernameValue = document.getElementById("username").value.trim();
    const passwordValue = document.getElementById("password").value.trim();
    
    if(usernameValue === "" || passwordValue === ""){
        alert("Please fill in all fields.");
        return;
    }

    let users = localStorage.getItem("users");
    console.log(users);

    let userlist = [];

    if(users !== null){
        userlist = JSON.parse(users);
        const existingUser = userlist.find(user => user.username === usernameValue);
        if(existingUser){
            alert("Username already exists. Please choose a different username.");
            return;
        }
    }

    userlist.push({
        username: usernameValue,
        password: passwordValue,
    });

    localStorage.setItem("users", JSON.stringify(userlist));
    alert("User Saved");
    window.location.href = "main.html?user=" + usernameValue; // Pass username as a query parameter
})
