"use strict";

import DataLoader from "./DataLoader.js";
import Person from "./Person.js";

const state = {
  error: null,
  isFathing: false,
  src: null,
  setSrc: (srs) => {
    state.isFathing = true;
    dataLoader.src = srs;
  },
  persons: {},
  selected: [],
};

const section = document.createElement("section");
section.setAttribute("id", "content-container");
document.body.append(section);

const usersSelectedList = document.createElement("ul");
usersSelectedList.setAttribute("id", "usersSelectedList");
usersSelectedList.setAttribute("class", "usersSelectedList");
document.getElementById("content-container").append(usersSelectedList);

const usersList = document.createElement("ul");
usersList.setAttribute("id", "usersList");
usersList.setAttribute("class", "content");
document.getElementById("content-container").append(usersList);

const dataLoader = new DataLoader();

dataLoader.addEventListener("load", ({ detail: users }) => {
  state.persons = users;
  document.getElementById("usersList")?.append(
    ...state.persons.forEach((user) => {
      const person = new Person({
        person: user,
        control: {
          select: onSelectedBtnClickHandler,
          remove: onRemoveBtnClickHandler,
        },
      });
      person.addPersonCard(usersList);
    })
  );
});

dataLoader.addEventListener("error", ({ detail: error }) => {
  state.error = error;
  state.isFathing = false;
});

state.setSrc("../../persons.json");

const colorCodesMap = {};

function onSelectedBtnClickHandler(e) {
  addOnSelestList(e.target.dataset.selectId);
}
function onRemoveBtnClickHandler(e) {
  document.getElementById(e.target.dataset.removeId)?.remove();
  state.persons = state.persons.filter(
    (person) => person.id != [e.target.dataset.removeId]
  );
}
function addOnSelestList(id) {
  if (true) {
    const person = state.persons.filter((person) => person.id == id)[0];
    const usersSelectedListItem = document.createElement("li");
    usersSelectedListItem.classList.add("select-user");
    usersSelectedListItem.setAttribute("data-select-user-id", id);
    usersSelectedListItem.append(
      document.createTextNode(`${person.firstName} ${person.lastName}`)
    );
    usersSelectedList.append(usersSelectedListItem);
  }
}
