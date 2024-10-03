let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main--color", mainColors);
  // إزالة الفئة النشطة من جميع عناصر قائمة الألوان
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    // إضافة الفئة النشطة للعنصر المطابق للون المخزن في Local Storage
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

// التحكم في خيار الخلفية العشوائية
let backgroundOption = true;
// متغير للتحكم في الـ Interval الخاص بتغيير الخلفيات
let backgroundInterval;

// التحقق مما إذا كان هناك إعداد للخلفية العشوائية في Local Storage
let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
  backgroundOption = backgroundLocalItem === "true";
  
  // إزالة الفئة النشطة من جميع العناصر
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  
  if (backgroundOption) {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// عند النقر على إعدادات التبديل
document.querySelector(".toggle-setting i").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

// تبديل الألوان
const colorLi = document.querySelectorAll(".colors-list li");
// حلقة تكرار على جميع عناصر قائمة الألوان
colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    // تعيين اللون الجذري
    document.documentElement.style.setProperty("--main--color", e.target.dataset.color);
    // تخزين اللون في Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);
    // إزالة الفئة النشطة من جميع العناصر
    handleActive(e);
  });
});

// تبديل الخلفيات
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
// حلقة تكرار على جميع العناصر
randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// اختيار عنصر الصفحة الرئيسية
let landingPage = document.querySelector(".landing-page");

// مصفوفة الصور
let imgArray = [
  "cat-01.jpg",
  "cat-02.jpg",
  "cat-03.jpg",
  "cat-04.jpg",
  "cat-05.jpg",
];

// دالة لتبديل الخلفيات بشكل عشوائي
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgArray.length);
      landingPage.style.backgroundImage = 'url("./image/' + imgArray[randomNumber] + '")';
    }, 1000);
  }
}
randomizeImgs();

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

