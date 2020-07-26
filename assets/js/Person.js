"use strict";

class Person {
  constructor(person = {}) {
    this.id = person.id;
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.profilePicture = person.profilePicture;
    this.isMale = person.isMale;
    this.isDeleted = person.isDeleted;
    this.isSelected = person.isSelected;
    this.contacts = person.contacts;
  }

  addDOMElement({
    parents = document.body,
    name = "div",
    attributes = [],
    innerText = "",
  }) {
    const attr = new Map(attributes);
    const chaildDOMElem = document.createElement(name);
    attr.forEach((value, name) => {
      chaildDOMElem.setAttribute(name, value);
    });
    chaildDOMElem.innerText = innerText;
    parents?.append(chaildDOMElem);
  }

  createUserListItem(user) {
    const userListItemElem = document.createElement("li"); // <LI>
    userListItemElem.setAttribute("id", person.id);
    userListItemElem.append(createUserCard(person)); //<LI><ARTICLE><IMG></ARTICLE></LI>
    return userListItemElem;
  }
}

export default Person;
