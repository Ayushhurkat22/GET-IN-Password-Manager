function maskPassword(pass) {
  let str = "";
  for (let index = 0; index < pass.length; index++) {
    str += "*";
  }
  return str;
}

const copyText = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Text copied to clipboard!");
    })
    .catch((error) => {
      console.error("Unable to copy text: ", error);
    });
};

const deletePasswords = (url) => {
  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data);
  arrUpdated = arr.filter((e) => {
    return e.url != url;
  });
  localStorage.setItem("passwords", JSON.stringify(arrUpdated));
  alert(`Successfully deleted ${url}'s password`);
  showPasswords();
};

const showPasswords = () => {
  let table = document.querySelector("table");
  let data = localStorage.getItem("passwords");
  if (data == null || JSON.parse(data).length == 0) {
    table.innerHTML = "No Data To Show";
  } else {
    table.innerHTML = `<tr>
      <th>Website URL</th>
      <th>UserName</th>
      <th>Password</th>
      <th>Date</th>
      <th>User Logged In</th>
      <th>Delete</th>
    </tr>`;
    let arr = JSON.parse(data);
    let str = "";
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (element.userLoggedIn === loggedInUser) {
      str += `<tr>
                <td>${element.url}</td>
                <td>${element.username} <img onclick="copyText('${element.username}')" src="./copybtn.svg" alt="Copy Button" width="18" height="18"> </td>
                <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copybtn.svg" alt="Copy Button" width="18" height="18"> </td>
                <td>${element.date}</td>
                <td>${element.userLoggedIn}</td>
                <td><button class="btndel" onclick="deletePasswords('${element.url}')">Delete</button></td>
            </tr>`;
    }
  }
    table.innerHTML = table.innerHTML + str;
  }
  url.value = "";
  username.value = "";
  password.value = "";
  confirmPassword.value = "";
  dateofcreation.value = "";
};

console.log("working");

// Retrieve the logged-in user from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const loggedInUser = urlParams.get('user');

showPasswords(loggedInUser);

document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();

  console.log("submit button clicked");
  console.log(
    url.value,
    username.value,
    password.value,
    confirmPassword.value,
    dateofcreation.value
  );

  // Retrieve values from input fields
  const urlValue = url.value.trim();
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();
  const dateValue = dateofcreation.value.trim();

  // Check if any field is empty
  if (
    urlValue === "" ||
    usernameValue === "" ||
    passwordValue === "" ||
    confirmPasswordValue === "" ||
    dateValue === ""
  ) {
    // If any field is empty, show an error message to the user
    alert("Please fill in all fields.");
    return; // Exit the function early
  }

  // Check if password and confirm password match
  if (passwordValue !== confirmPasswordValue) {
    // If passwords don't match, show an error message to the user
    alert("Passwords do not match. Please try again.");
    return; // Exit the function early
  }

  // All fields are filled and passwords match, proceed with saving the password
  let passwords = localStorage.getItem("passwords");
  console.log(passwords);
  if (passwords === null) {
    let json = [];
    json.push({
      url: urlValue,
      username: usernameValue,
      password: passwordValue,
      date: dateValue,
      userLoggedIn: loggedInUser // Include the user logged in attribute
    });
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(passwords);
    json.push({
      url: urlValue,
      username: usernameValue,
      password: passwordValue,
      date: dateValue,
      userLoggedIn: loggedInUser // Include the user logged in attribute
    });
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPasswords();
});
