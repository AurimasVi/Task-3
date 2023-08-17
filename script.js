/* ------------------------------ TASK 3 -----------------------------------
Parašykite JS kodą, kuris leis vartotojui paspaudus ant mygtuko "Show users"
pamatyti vartotojus iš Github API (endpoint'as pateiktas žemiau).

Paspaudus mygtuką "Show users":
1. Pateikiamas informacijos atvaizdavimas <div id="output"></div> bloke
1.1. Infrmacija, kuri pateikiama: "login" ir "avatar_url" reikšmės (kortelėje)
2. Žinutė "Press "Show Users" button to see users" turi išnykti;
"
Pastaba: Informacija apie user'į (jo kortelė) bei turi turėti bent minimalų stilių;
-------------------------------------------------------------------------- */

const ENDPOINT = "https://api.github.com/users";
let savedData = [];
const showUsersBtn = document.querySelector("#btn");

const getData = async () => {
  try {
    const response = await fetch(ENDPOINT);
    let data = await response.json();

    data.forEach((element) => savedData.push(element)); //nemanau kad reikia bet palieku jog daug kartu galima prideti. kitu atveju tiesiog deaktyvuoti btn
  } catch (error) {
    console.error(error);
  }
};

const showUsers = () => {
  const outputElement = document.querySelector("#output");
  outputElement.innerHTML = "";

  savedData.forEach((user) => {
    const userWrapper = document.createElement("div");
    const imgElement = document.createElement("img");
    const loginElement = document.createElement("p");

    imgElement.classList.add("avatar");
    loginElement.classList.add("login");
    userWrapper.classList.add("userWrapper");

    imgElement.src = user.avatar_url;
    loginElement.textContent = user.login;

    outputElement.append(userWrapper);
    userWrapper.append(imgElement, loginElement);
  });
};

showUsersBtn.addEventListener("click", async () => {
  try {
    await getData();
    showUsers();
  } catch (error) {
    console.error(error);
  }
});
