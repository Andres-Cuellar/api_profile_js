const searchContent = document.querySelector(".search__content");
let email;
let discord;

function search() {
  email = document.querySelector("#email").value;
  discord = document.querySelector("#discord").value;

  if (email == "" || discord == "" || isNaN(discord) || !isNaN(email)) {
    alert("Escriba una opcion correcta");
    return;
  }

  searchEmailDiscord(email, discord);
}

async function searchEmailDiscord(email, discord) {
  try {
    const result = await axios({
      method: "GET",
      url: "https://larnu-api-upy5mhs63a-rj.a.run.app/api/v1/bootcamp/profile",
      headers: { Email: email, "Discord-id": discord },
    }).then((res) => res.data);

    await showHTML(result);
  } catch (error) {
    console.log(error);
  }
}

function showHTML(data) {
  const {
    email: dataEmail,
    fullName: dataFullName,
    avatar: dataAvatar,
    lastLogin,
    createdAt,
  } = data.user;
  const { discordUsername, batch, hobbies } = data;

  const formatedCreatedAt = new Date(createdAt).toLocaleString();
  const formatedLastLogin = new Date(lastLogin).toLocaleString();

  searchContent.innerHTML = `
    <div class="search__content__profile">
        <div class="search__content__profile__back-edit">
            <a onclick="reload()"><i class="fa-solid fa-arrow-left"></i></a>
            <a href="#modal">Editar</a>
        </div>
        <img src="${dataAvatar}"/>
        <h2>${dataFullName}</h4>
        <p>${dataEmail}</p>
        <br>
        <h4><span>Grupo: </span>${batch}</h4>
        <h4><span>Discord Nick: </span>${discordUsername}</h4>
        <h4><span>Hobbies: </span>${hobbies}</h4>
        <br>
        <hr>
        <br>
        <div class="search__content__profile__row">
            <h5>Creado el</h5>
            <h5>Última conexión</h5>
        </div>
        <div class="search__content__profile__row">
            <p>${formatedCreatedAt}</p>
            <p>${formatedLastLogin}</p>
        </div>
    </div>
  `;
}

function edit() {
  newsHobbies = document.querySelector("#newsHobbies").value;
  newUserNameDiscord = document.querySelector("#newUserNameDiscord").value;

  if (newsHobbies == "" || newUserNameDiscord == "") {
    alert("Escriba una opcion correcta");
    return;
  }

  editNickHobbies(newUserNameDiscord, newsHobbies);
}

async function searchEmailDiscord(email, discord) {
  try {
    const result = await axios({
      method: "get",
      url: "https://larnu-api-upy5mhs63a-rj.a.run.app/api/v1/bootcamp/profile",
      headers: { Email: email, "Discord-id": discord },
    }).then((res) => res.data);

    await showHTML(result);
  } catch (error) {
    console.log(error);
  }
}

async function editNickHobbies(nick, hobbies) {
  try {
    const resultNickHobbies = await axios({
      method: "patch",
      url: "https://larnu-api-upy5mhs63a-rj.a.run.app/api/v1/bootcamp/profile",
      headers: { Email: email, "Discord-id": discord },
      data: {
        discordUsername: nick,
        hobbies: hobbies,
      },
    }).then((res) => res.data);

    await showHTML(resultNickHobbies);
  } catch (error) {
    console.log(error);
  }
  document.getElementById("modal").style.display = "none";
}

function reload() {
  window.location.reload();
}
