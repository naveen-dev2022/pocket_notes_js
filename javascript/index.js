const newButton = document.querySelectorAll("button");
const textArea = document.querySelectorAll("textarea");
const colorContainer = document.querySelectorAll(".color-group");
const colorMarkers = document.querySelectorAll(".fa");
const colorAdd = document.querySelector(".color-add-button");
var notesItemAll = document.querySelectorAll(".notes-item");
const notesList = document.querySelector(".notes-list");
const loadMore = document.querySelector(".load-more");
const deleteAll = document.querySelector(".delete-all-button");
var choosedColor = "rgb(230, 205, 235)";
const d = new Date();

// add notes button disable or enable functionality

var isNoteHeadingEmpty = true;
var isNoteContentEmpty = true;

const date = Date().toLocaleString("en-us", { month: "short" });

console.log(localStorage.getItem("notes"));

textArea.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    input.style.height = "auto";
    let scrollHeight = e.target.scrollHeight;
    input.style.height = `${scrollHeight}px`;
    if (textArea[0].value !== "" && textArea[2].value !== "") {
      colorAdd.style.backgroundColor = "rgb(167, 89, 178)";
      colorAdd.style.color = "#ffffff";
    } else {
      colorAdd.style.backgroundColor = "rgb(75, 40, 81)";
      colorAdd.style.color = "grey";
    }
  });
});

if (isNoteHeadingEmpty && isNoteContentEmpty) {
  colorAdd.style.backgroundColor = "rgb(75, 40, 81)";
  colorAdd.style.color = "grey";
}

colorAdd.addEventListener("click", () => {
  if (textArea[0].value !== "" && textArea[2].value !== "") {
    saveNotes();
  }
});

//check weather notes are there

function noNotesElement() {
  let noNotes = document.createElement("p");
  let img = document.createElement("img");
  noNotes.innerText = "Notes you add appear here";
  noNotes.style.color = "#ffff";
  img.src =
    "../images/images-removebg-preview.png";
  // notesList.style.flexDirection='column'
  img.style.color = "white";
  img.style.height = "120px";
  img.style.width = "120px";
  img.style.margin = "4em 0 0 0";
  noNotes.style.margin = "1em";
  noNotes.style.fontSize = "0.9em";
  notesList.style.justifyContent = "center";
  notesList.style.alignItems = "center";
  notesList.style.flexDirection = "column";
  notesList.append(img, noNotes);
  console.log("INITIAL RENDER NO DATA!!!");
}

// localStorage.setItem(
//   "notes",
//   JSON.stringify([
//  ])
// );
//console.log(JSON.parse(localStorage.getItem("notes")));
if (JSON.parse(localStorage.getItem("notes")).length === 0) {
  noNotesElement();
} else {
  if (JSON.parse(localStorage.getItem("notes")).length > 5) {
    loadMore.style.display = "flex";
  }
  retriveData();
}

// retrive data from db
function retriveData() {
  notesList.innerText = "";
  let storedBlogs = JSON.parse(localStorage.getItem("notes"));
  storedBlogs.forEach((data) => {
    console.log("retrive data from db HAS DATA!!!");

    let notesItem = document.createElement("div");
    let heading = document.createElement("h2");
    let dateNow = document.createElement("p");
    let content = document.createElement("p");
    let pageNavAnchor = document.createElement("a");

    notesItem.classList.add("notes-item");
    heading.classList.add("notes-heading");
    dateNow.classList.add("notes-date");
    content.classList.add("notes-disc");
    pageNavAnchor.href = `../html/notes_detail.html?heading=${data.heading}&url=${data.url}&date=${data.time}&color=${data.color}&content=${data.content}`;

    if (data.url !== "") {
      let image = document.createElement("img");
      image.src = `${data.url}`;
      image.style.borderRadius = "10px";
      image.style.height = "140px";
      image.style.width = "100%";
      heading.innerText = `${data.heading}`;
      dateNow.innerText = `${data.time}`;
      content.innerText = `${data.content}`;
      notesItem.style.backgroundColor = `${data.color}`;
        notesItem.append(heading, dateNow, image, content);
        pageNavAnchor.append(notesItem)
        console.log(notesItem);
    } else {
      heading.innerText = `${data.heading}`;
      dateNow.innerText = `${data.time}`;
      content.innerText = `${data.content}`;
      notesItem.style.backgroundColor = `${data.color}`;
      notesItem.append(heading, dateNow, content);
      pageNavAnchor.append(notesItem)
    }

    notesList.prepend(pageNavAnchor);
    console.log("FINISH!!");
  });
}

// save data to local storage


function saveNotes() {
  notesList.style.justifyContent = "flex-start";
  notesList.style.alignItems = "none";
  notesList.style.flexDirection = "row";
  let newNote = {
    heading: `${textArea[0].value}`,
    url: textArea[1].value,
    color: choosedColor,
    content: `${textArea[2].value}`,
    time: date.slice(4, 15),
  };

  let oldNotes = JSON.parse(localStorage.getItem("notes"));
  oldNotes.push(newNote);

  localStorage.setItem("notes", JSON.stringify(oldNotes));

  if (oldNotes.length > 5) {
    loadMore.style.display = "flex";
  }
  retriveData();
  closeNav();
}

//

newButton[1].addEventListener("click", function () {
  openNav();
});

function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
  textArea[0].value = "";
  textArea[1].value = "";
  textArea[2].value = "";
  choosedColor = "rgb(230, 205, 235)";
  // colorMarkers.forEach((colorMarker, index) => {
  //   index === 0
  //     ? (colorMarker.style.display = "block")
  //     : (colorMarker.style.display = "none");
  // });
  isNoteHeadingEmpty = true;
  isNoteContentEmpty = true;
  colorAdd.style.backgroundColor = "rgb(75, 40, 81)";
  colorAdd.style.color = "grey";
  document.getElementById("mySidenav").style.width = "0";
}

// choosing the color for a new note

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

  colorMarker.addEventListener("click", function () {
   
    hideMarker();
    choosedColor = colors.notesBgColor[index];
    colorMarkers[index].style.display = "block";
  });
});

function hideMarker() {
  colorMarkers.forEach((colorMarker) => {
    colorMarker.style.display = "none";
  });
}

function openDeletePage() {
  document.querySelector(".delet-all").style.width = "100%";
}

function closeDeletePage() {
  console.log("dked");
  document.querySelector(".delet-all").style.width = "0";
}

// delete all notes

deleteAll.addEventListener("click", function () {
  localStorage.setItem("notes", JSON.stringify([]));
  notesList.innerText = "";
  noNotesElement();
  document.querySelector(".delet-all").style.width = "0";
});

// on click one item redirect to detail page

console.log(`log------>>>${notesItemAll}`);

notesItemAll.forEach(function (notes) {
  console.log(`NOTES------>>>${notes}`);
});
