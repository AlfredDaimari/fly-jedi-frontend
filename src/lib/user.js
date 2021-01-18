// file for various user fetch requests

async function checkUserToken() {
  var user = await fetch("http://localhost/user", {
    method: "POST",
  });
  if (user.status !== 401) {
    user = await user.json();
    return user;
  } else {
    return false;
  }
}

async function updateUser(email, firstName, lastName, phoneNumber) {
  const response = await fetch(
    "http://localhost/user/" +
      email +
      "/" +
      firstName +
      "/" +
      lastName +
      "/" +
      phoneNumber,
    {
      method: "PATCH",
      credentials: "same-origin",
    }
  );
  if (response.status === 400) {
    return false;
  } else {
    return true;
  }
}

async function getUserInfo() {
  var user = await fetch("http://localhost/user", {
    method: "GET",
  });
  user = await user.json();
  return user;
}

async function updateUserPassword(password) {
  await fetch("http://localhost/user/" + password, {
    method: "PATCH",
    credentials: "same-origin",
  });
}

async function getUserRecommendations() {
  var recomm = await fetch("http://localhost/user/recom", {
    method: "GET",
    credentials: "same-origin",
  });
  recomm = await recomm.json();
  return recomm;
}

export {
  checkUserToken,
  updateUser,
  updateUserPassword,
  getUserInfo,
  getUserRecommendations,
};
