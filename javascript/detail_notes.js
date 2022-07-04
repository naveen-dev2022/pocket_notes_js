// var heading = Request.QueryString["heading"] ?? string.Empty;
// var url = Request.QueryString["url"] ?? string.Empty;
// var date = Request.QueryString["date"] ?? string.Empty;
// var color = Request.QueryString["color"] ?? string.Empty;
// var content = Request.QueryString["content"] ?? string.Empty;
const urlParams = new URLSearchParams(window.location.search);
const heading = urlParams.get("heading");
const url = urlParams.get("url");
const date = urlParams.get("date");
var color = urlParams.get("color");
const content = urlParams.get("content");
const textArea = document.querySelectorAll("textarea");
const colorContainer = document.querySelectorAll(".color-group");
const colorMarkers = document.querySelectorAll(".fa");
const saveButton = document.querySelector(".save-button");
const currentDate = Date().toLocaleString("en-us", { month: "short" });
var choosedColor = color;

const notesColor = document.createElement("div");
const headingContainer = document.querySelector(".heading");
const noteHeading = document.createElement("h1");
const main = document.querySelector("main");
const notesDate = document.createElement("p");
const notesImg = document.createElement("img");
const notesContent = document.createElement("p");
const titleContainer = document.createElement("div");
const deleteButton = document.querySelector(".delete-button");

notesColor.classList.add("color");
notesContent.classList.add("content");

notesColor.style.backgroundColor = color;
noteHeading.innerText = heading;
notesDate.innerText = date;
notesImg.src = url;
notesContent.innerText = content;

titleContainer.append(noteHeading, notesDate);

headingContainer.prepend(notesColor, titleContainer);

if (url !== "") {
  main.append(headingContainer, notesImg, notesContent);
} else {
  main.append(headingContainer, notesContent);
}

function openDeletePage() {
  document.querySelector(".delet-all").style.width = "100%";
}

function closeDeletePage() {
  console.log("dked");
  document.querySelector(".delet-all").style.width = "0";
}

deleteButton.addEventListener("click", function () {
  let oldNotes = JSON.parse(localStorage.getItem("notes"));
  oldNotes.forEach((element, index) => {
    console.log(element.heading);
    if (element.heading === heading) {
      oldNotes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(oldNotes));
      window.location = document.referrer;
    } else {
      console.log("false");
    }
  });
});

function openNav() {
  textArea[0].value = heading;
  textArea[1].value = url;
  textArea[2].value = content;
  document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

const colors = {
  notesBgColor: [
    "rgb(230, 205, 235)",
    `rgb(253, 252, 252)`,
    `rgb(248, 204, 127)`,
    `rgb(231, 238, 115)`,
    `rgb(243, 171, 144)`,
  ],
};

colorContainer.forEach((colorMarker, index) => {
  colorMarker.style.backgroundColor = colors.notesBgColor[index];
  index === 0
    ? (colorMarkers[index].style.display = "block")
    : (colorMarkers[index].style.display = "none");

  if (colors.notesBgColor[index] === color) {
    hideMarker();
    colorMarkers[index].style.display = "block";
  }

  colorMarker.addEventListener("click", function () {
      hideMarker();
      choosedColor = colors.notesBgColor[index];
      colorMarkers[index].style.display = "block";
      console.log(choosedColor);
  });
});

function hideMarker() {
  colorMarkers.forEach((colorMarker) => {
    colorMarker.style.display = "none";
  });
}

textArea.forEach((input) => {
    input.addEventListener("keyup", (e) => {
      input.style.height = "auto";
      let scrollHeight = e.target.scrollHeight;
      input.style.height = `${scrollHeight}px`;
    });
  });

saveButton.addEventListener('click', function () { 
   JSON.parse(localStorage.getItem("notes")).forEach((value,index) =>
    {
        
       if (JSON.parse(localStorage.getItem("notes"))[index].heading === heading) {
    
           let newNote = {
               heading: `${textArea[0].value}`,
               url: textArea[1].value,
               color: choosedColor,
               content: `${textArea[2].value}`,
               time: currentDate.slice(4, 15),
           };
           let updatedNotes = JSON.parse(localStorage.getItem("notes"));
           updatedNotes.splice(index, 1, newNote);
           localStorage.setItem("notes", JSON.stringify(updatedNotes));
           window.location = document.referrer;
           console.log(JSON.parse(localStorage.getItem("notes")))
       }
    })
   
})