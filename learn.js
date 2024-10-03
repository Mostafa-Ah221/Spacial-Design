//check if there's local storage option color
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main--color", mainColors);
  //remove active class from all colors list items
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    //add class active on element with data color === local storage items
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}
//
// random backgroun option
let backgrounOption = true;
//variable to control the interval
let backgrounInterval;

//check if there's local storage random backgroun item
let backgroundLocalItem = localStorage.getItem("background_option");
//check random local storage
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgrounOption = true;
  } else {
    backgrounOption = false;
  }
  //remove active class from all span
  document.querySelectorAll(".random-Backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-Backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-Backgrounds .no").classList.add("active");
  }
}

//click on toggle settings
document.querySelector(".toggle-setting i").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};
////switch color
const colorLi = document.querySelectorAll(".colors-list li");
//loop in all list li
colorLi.forEach((li) => {
  //click ion event list Itemd
  li.addEventListener("click", (e) => {
    //set color on root
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );
    //set color on local storage
    localStorage.setItem("color-option", e.target.dataset.color);
    //remove active class from all children
    handleActive(e);
  });
});
//
//switch background
const randomBackEl = document.querySelectorAll(".random-Backgrounds span");
//loop in all span
randomBackEl.forEach((span) => {
  //click ion event span
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgrounOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgrounOption = false;
      clearInterval(backgrounInterval);
      localStorage.setItem("background_option", false);
    }
  });
});
//select landing page Element
let landingPage = document.querySelector(".landing-page");
//Get Array Of Imgs
let imagArrar = [
  "cat-01.jpg",
  "cat-02.jpg",
  "cat-03.jpg",
  "cat-04.jpg",
  "cat-05.jpg",
];

//function to randomize imgs
function randomizeImgs() {
  if (backgrounOption === true) {
    backgrounInterval = setInterval(() => {
      //get random number
      let randomNumber = Math.floor(Math.random() * imagArrar.length);
      //change backgroun Image Url
      landingPage.style.backgroundImage =
        'url("/Spacil-Desgin/image/' + imagArrar[randomNumber] + '")';
    }, 1000);
    //
  }
}
randomizeImgs();
//
//
//
//
//select skills selector
let ourSkills = document.querySelector(".skills");
let allSkills = document.querySelectorAll(".skill-box span");
window.onscroll = function () {
  if (window.scrollY >= ourSkills.offsetTop) {
    allSkills.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};
//
//
//
//create popup with the image
let ourGallary = document.querySelectorAll(".gallery img");

ourGallary.forEach((img) => {
  img.addEventListener("click", (e) => {
    //create overlay to the body
    let overlay = document.createElement("div");
    //add the class to element
    overlay.className = "popup-overlay";
    //append the overlay to body
    document.body.appendChild(overlay);
    // create popup img
    let popupBox = document.createElement("div");
    //add the class to element
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      //create heading
      let imgHeading = document.createElement("h3");
      let textNood = document.createTextNode(img.alt);
      imgHeading.appendChild(textNood);
      popupBox.appendChild(imgHeading);
    }
    //create the image
    let popupImage = document.createElement("img");
    //set image sourse
    popupImage.src = img.src;
    //add image of the popup
    popupBox.appendChild(popupImage);
    //add popupBox of body
    document.body.appendChild(popupBox);
    //
    let closeButton = document.createElement("span");
    let textClose = document.createTextNode("X");
    closeButton.appendChild(textClose);
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);
  });
});

document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    //remove popup
    e.target.parentNode.remove();
    //remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});
//
//
//select all bullets
const allbullets = document.querySelectorAll(".nav-bullets .bullet");
//
//
const allinks = document.querySelectorAll(".links a");
//
function linkWhere(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
linkWhere(allbullets);
linkWhere(allinks);
//
//
let bulletsSpan = document.querySelectorAll(".bullets-option span");
//
let bulletsContainer = document.querySelector(".nav-bullets");
//
let bulletLocalItem = localStorage.getItem("bullets_option");
if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
//
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    //
    if (span.dataset.display === "show") {
      //
      bulletsContainer.style.display = "block";
      //
      localStorage.setItem("bullets_option", "block");
      //
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none ");
    }
    handleActive(e);
  });
});
function handleActive(ev) {
  //remove active class from all children
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  //add active class on self
  ev.target.classList.add("active");
}
//
//
//
//buuton reset option
document.querySelector(".reset-options").onclick = function () {
  //
  localStorage.clear();
  // localStorage.removeItem("color_option");
  // localStorage.removeItem("background_option");
  // localStorage.removeItem("bullets_option");
  //reload window
  window.location.reload();
};
//
//toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
//
toggleBtn.onclick = function (e) {
  //stop propagation
  e.stopPropagation();
  //Toggle class "menu-active" on Button
  this.classList.toggle("menu-active");
  //Toggle class "open" on links
  tLinks.classList.toggle("open");
};

//click anywhere outside menu and toggle button
document.addEventListener("click", (e) => {
  //
  if (e.target !== toggleBtn && e.target !== tLinks) {
    //
    if (tLinks.classList.contains("open")) {
      //Toggle class "menu-active" on Button
      toggleBtn.classList.toggle("menu-active");
      //Toggle class "open" on links
      tLinks.classList.toggle("open");
    }
  }
});

tLinks.onclick = function (e) {
  e.stopPropagation();
};
//
// let n1 = [10, 30, 10, 20];
// let n2 = [30, 20, 10];
// // console.log(
// //   Math.max(...n2) * Math.min(...n1) -
// //     Math.min(...n1) * Math.min(...n1) +
// //     Math.min(...n1)
// // );

// // console.log(
// //   new Set(n1).size * Math.max(...n1) * new Set(n1).size -
// //     new Set(n1).size * Math.min(...n1) -
// //     Math.max(...n2)
// // );
// console.log([...n1, ...n2].length * Math.max(...n2));
// // console.log([...n1, ...n2].length);
// // console.log([...n1, ...n2].length);

// let job = "";
// let salary = 0;

// // if (job === "Manager") {
// //   salary = 8000;
// // } else if (job === "IT" || job === "Support") {
// //   salary = 6000;
// // } else if (job === "Developer" || job === "Designer") {
// //   salary = 7000;
// // } else {
// //   salary = 4000;
// // }
// switch (job) {
//   case "Manager":
//     console.log(`salary ${8000}`);
//     break;
//   case "IT":
//   case "Support":
//     console.log(`salary ${6000}`);
//     break;
//   case "Developer":
//   case "Designer":
//     console.log(`salary ${7000}`);
//     break;
//   default:
//     console.log(`salary ${4000}`);
// }

//
let st = "Elzero Web School";

// if (st.charAt(7) === "W") {
//   console.log("Good");
// }
// if (st !== "string") {
// //   console.log("Good");
// // }
if (typeof st.length === "number") {
  console.log("Good");
}
// // if (st.slice(0, 6).repeat(2) === "ElzeroElzero") {
// //   console.log("Good");
// // }
// let st = "Elzero Web School";
// console.log(st.slice(2, 6));
// console.log();

let numbers = [
  15.6,
  2,
  2,
  2,
  4,
  5,
  "True",
  "True",
  7,
  "A",
  2,
  "False",
  2,
  8,
  9,
];
if (e === "True") {
  console.log(numbers.toLowerCase());
}
// Output
// 15
// 9
// 8
// 7
// 5
// 4
// 2
// 1
// 0
