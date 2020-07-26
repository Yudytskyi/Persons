"use strict";

import DataLoader from "./DataLoader.js";

const state = {
  error: null,
  isFathing: false,
  src: null,
  setSrc: (srs) => {
    state.isFathing = true;
    dataLoader.src = srs;
  },
};

addDOMElement({
  name: "ul",
  attributes: [
    ["id", "usersList"],
    ["class", "container"],
  ],
});

const ul = document.getElementById("usersList");

const dataLoader = new DataLoader();

dataLoader.addEventListener("load", ({ detail: users }) => {
  document
    .getElementById("usersList")
    ?.append(...users.map((user) => createUserListItem(user)));
});
dataLoader.addEventListener("error", ({ detail: error }) => {
  state.error = error;
  state.isFathing = false;
});

// state.isFathing = true;
// dataLoader.src = "../../persons.json";
state.setSrc("../../persons.json");

function onDataLoadHandler(e) {
  const data = e.detail;
}
// onDataLoadHandler();

const colorCodesMap = {};

/**
 *
 * @param {object} user
 * @param {number | string} user.id
 * @param {string} user.firstName
 * @param {string} user.lastName
 * @param {string} user.profilePicture
 * @returns {HTMLLIElement}
 */
function createUserListItem(user) {
  const userListItemElem = document.createElement("li"); // <LI>
  userListItemElem.setAttribute("id", user.id);
  userListItemElem.append(createUserCard(user)); //<LI><ARTICLE><IMG></ARTICLE></LI>
  return userListItemElem;
}

/**
 *
 * @param {object} user
 * @returns {HTMLArticleElement}
 */
function createUserCard(user) {
  const userCardElem = document.createElement("article"); // <ARTICLE>
  userCardElem.classList.add("userCard");
  userCardElem.append(
    createUserImage(user),
    createUserFullNameElem(user),
    createDeleteUserBtn(user)
  ); // <ARTICLE><IMG><DIV></ARTICLE>
  return userCardElem;
}

/**
 *
 * @param {object} user
 * @returns {HTMLDivElement}
 */
function createUserImage({ id, firstName, lastName, profilePicture }) {
  const container = document.createElement("div");
  container.setAttribute("id", `imageContainer${id}`);
  container.classList.add("userPictureContainer", "flexCenter");
  container.append(createUserInitialsElem({ firstName, lastName }));
  container.style.setProperty(
    "background-color",
    stringToColorCode(`${id}${firstName}${lastName}`)
  );
  const image = document.createElement("img"); // <IMG>
  image.setAttribute("data-container-id", `imageContainer${id}`);
  image.addEventListener("load", onImageLoadHandler);

  image.addEventListener("error", onImageErrorHandler);

  image.setAttribute("src", profilePicture);
  image.setAttribute("alt", `${firstName} ${lastName} picture`);
  image.classList.add("userPicture");

  return container;
}
/**
 *
 * @param {object} param0
 * @returns {HTMLDivElement}
 */
function createUserFullNameElem({ firstName, lastName }) {
  const fullNameElem = document.createElement("div"); // <DIV>
  fullNameElem.classList.add("userFullName");
  fullNameElem.append(document.createTextNode(`${firstName} ${lastName}`));
  return fullNameElem;
}
/**
 *
 * @param {object} param0
 * @returns {HTMLSpanElement}
 */
function createUserInitialsElem({ firstName, lastName }) {
  const initialsElem = document.createElement("span");
  initialsElem.setAttribute("title", `${firstName} ${lastName} initials`);
  initialsElem.append(
    document.createTextNode(`${firstName[0] || ""}${lastName[0] || ""}`)
  );
  return initialsElem;
}
/**
 * @param {object} user
 * @returns {HTMLButtomElement}
 */
function createDeleteUserBtn({ id }) {
  const btn = document.createElement("button");
  const btnImg = document.createElement("img");
  btnImg.setAttribute("src", "./icons/del-user.svg");
  btn.setAttribute("data-card-id", id);
  btn.append(btnImg);
  btn.addEventListener("click", onRemoveBtnClickHandler);

  return btn;
}

/**
 * Events Handlers
 */

function onRemoveBtnClickHandler(e) {
  document.getElementById(e.target.dataset.cardId)?.remove();
}
function onImageLoadHandler({ target }) {
  document.getElementById(target.dataset.containerId)?.append(target);
}
function onImageErrorHandler({ target }) {
  target.remove();
}

/**
 * Utils
 */

function stringToColorCode(str) {
  let userValue = 0;

  for (const char of str) {
    userValue += char.charCodeAt(0);
  }

  while (userValue > 1) {
    userValue /= 10;
  }

  return localStorage.getItem(str)
    ? localStorage.getItem(str)
    : localStorage.setItem(
        str,
        "#" + ("000000" + ((userValue * 0xffffff) << 0).toString(16)).slice(-6)
      );
}
