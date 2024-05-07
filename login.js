document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Submit Button Clicked");
    
    const usernameValue = document.getElementById("username").value.trim();
    const passwordValue = document.getElementById("password").value.trim();
    
    if(usernameValue === "" || passwordValue === ""){
        alert("Please fill in all fields.");
        return;
    }

    let users = localStorage.getItem("users");
    console.log(users);

    if(users !== null){
        let userlist = JSON.parse(users);
        const existingUser = userlist.find(user => user.username === usernameValue && user.password === passwordValue);
        if(existingUser){
            alert("Login successful!");
            window.location.href = "main.html?user=" + encodeURIComponent(usernameValue);
        } else {
            alert("Invalid username or password. Please try again.");
        }
    } else {
        alert("No users found. Please sign up first.");
    }
});
