"use strict";

class Person {
  constructor(props = {}) {
    const {
      person,
      control: { select, remove },
    } = props;
    const personPropertys = Object.keys(person);
    for (const property of personPropertys) {
      this[property] = person[property];
      this.select = select;
      this.remove = remove;
    }
  }

  /**
   *
   * @param {HTMLLIElement} parent
   */
  addPersonCard(parent) {
    const personCard = document.createElement("li");
    personCard.setAttribute("id", this.id);
    personCard.append(this.createUserCard());
    parent.append(personCard);
  }

  /**
   *
   * @param {object} user
   * @returns {HTMLArticleElement}
   */
  createUserCard() {
    const personCardElem = document.createElement("article");
    personCardElem.classList.add("userCard");
    personCardElem.append(
      this.createBtnsBlock(),
      this.createUserImage(),
      this.createUserFullNameElem(),
      this.createBirthDayElem()
    );
    return personCardElem;
  }

  /**
   *
   * @param {object} user
   * @returns {HTMLDivElement}
   */
  createUserImage() {
    const container = document.createElement("div");
    container.setAttribute("id", `imageContainer${this.id}`);
    container.classList.add("userPictureContainer", "flexCenter");
    container.append(this.createUserInitialsElem());
    container.style.setProperty(
      "background-color",
      this.stringToColorCode(`${this.id}${this.firstName}${this.lastName}`)
    );
    const image = document.createElement("img");
    image.setAttribute("data-container-id", `imageContainer${this.id}`);
    image.addEventListener("load", this.onImageLoadHandler);
    image.addEventListener("error", this.onImageErrorHandler);
    image.setAttribute("src", this.profilePicture);
    image.setAttribute("alt", `${this.firstName} ${this.lastName} picture`);
    image.classList.add("userPicture", `${!this.isMale && "male"}`);
    return container;
  }

  /**
   *
   * @param {object} param0
   * @returns {HTMLDivElement}
   */
  createUserFullNameElem() {
    const fullNameElem = document.createElement("div");
    fullNameElem.classList.add("userFullName");
    fullNameElem.append(
      document.createTextNode(`${this.firstName} ${this.lastName}`)
    );
    return fullNameElem;
  }

  createBirthDayElem() {
    const birthDayElem = document.createElement("div");
    birthDayElem.classList.add("userFullName");
    birthDayElem.append(document.createTextNode(this.birthday));
    return birthDayElem;
  }

  /**
   *
   * @param {object} param0
   * @returns {HTMLSpanElement}
   */
  createUserInitialsElem() {
    const initialsElem = document.createElement("span");
    initialsElem.setAttribute(
      "title",
      `${this.firstName} ${this.lastName} initials`
    );
    initialsElem.append(
      document.createTextNode(
        `${this.firstName[0] || ""}${this.lastName[0] || ""}`
      )
    );
    return initialsElem;
  }

  createBtnsBlock() {
    const btnsBlock = document.createElement("div");
    btnsBlock.classList.add("btnsBlock");
    btnsBlock.append(this.createSelectUserBtn());
    btnsBlock.append(this.createDeleteUserBtn());

    return btnsBlock;
  }
  createSelectUserBtn() {
    const btnImg = document.createElement("img");
    btnImg.setAttribute("src", "./assets/fonts/icons/selected.svg");
    btnImg.classList.add("button-img");
    btnImg.setAttribute("data-select-id", this.id);
    btnImg.addEventListener("click", this.select);
    const btn = document.createElement("button");
    btn.classList.add("button", "select");
    btn.append(btnImg);

    return btn;
  }
  createDeleteUserBtn() {
    const btnImg = document.createElement("img");
    btnImg.setAttribute("src", "./assets/fonts/icons/remove.svg");
    btnImg.classList.add("button-img");
    btnImg.setAttribute("data-remove-id", this.id);
    btnImg.addEventListener("click", this.remove);
    const btn = document.createElement("button");
    btn.append(btnImg);
    btn.classList.add("button", "remove");

    return btn;
  }

  stringToColorCode(str) {
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
          "#" +
            ("000000" + ((userValue * 0xffffff) << 0).toString(16)).slice(-6)
        );
  }

  // onRemoveBtnClickHandler(e) {
  //   document.getElementById(e.target.dataset.removeId)?.remove();
  // }
  // onSelectedBtnClickHandler(e) {
  //   console.log(`Person ID:${e.target.dataset.selectId}`);
  // }
  onImageLoadHandler({ target }) {
    document.getElementById(target.dataset.containerId)?.append(target);
  }
  onImageErrorHandler({ target }) {
    target.remove();
  }
}

export default Person;
