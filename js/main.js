const modalContainer = document.querySelector(".modal-container");
var buttons = document.querySelectorAll("main .btn-primary");
var radios = document.querySelectorAll(".modal input[type='radio']");
var close = document.querySelector(".close-modal");
var modalPledge = document.querySelector(".modal-pledge");
var modalSuccess = document.querySelector(".modal-success");
var closeSuccess = document.querySelector(".modal-success button");
var mobileMenu = document.querySelector(".mobile-menu");
var bookmark = document.querySelector(".bookmark input");
var bookmarkText = document.querySelector(".bookmark label span");
var amountBacked = 89914;
var backers = 5007;

for (i = 0; i < buttons.length; i++) {
   buttons[i].addEventListener("click", openModal);
}

function openModal(e) {
   if (e.target.id == "no-reward-btn") {
      var radiobtns = document.querySelectorAll(".card input[type='radio']");
      for (i = 0; i < radiobtns.length; i++) {
         radiobtns[i].checked = false;
      }
      var pledgebox = document.getElementById("no-reward-card");
      clearPledgeBoxes();
      // pledgebox.classList.toggle("selected");
   }
   if (e.target.id == "bamboo-reward-btn") {
      var radiobtn = document.getElementById("bamboo-reward");
      radiobtn.checked = true;
      var pledgebox = document.getElementById("bamboo-reward-card");
      clearPledgeBoxes();
      pledgebox.classList.toggle("selected");
   }
   if (e.target.id == "blackedition-reward-btn") {
      var radiobtn = document.getElementById("blackedition-reward");
      radiobtn.checked = true;
      var pledgebox = document.getElementById("blackedition-reward-card");
      clearPledgeBoxes();
      pledgebox.classList.toggle("selected");
   }

   modalContainer.style.display = "grid";
   modalPledge.style.display = "block";
}

for (i = 0; i < radios.length; i++) {
   radios[i].addEventListener("change", openPledge);
}

function openPledge(e) {
   if (e.target.id == "no-reward") {
      var pledgebox = document.getElementById("no-reward-card");
      clearPledgeBoxes();
      pledgebox.classList.toggle("selected");
   }
   if (e.target.id == "bamboo-reward") {
      var pledgebox = document.getElementById("bamboo-reward-card");
      clearPledgeBoxes();
      pledgebox.classList.toggle("selected");
   }
   if (e.target.id == "blackedition-reward") {
      var pledgebox = document.getElementById("blackedition-reward-card");
      clearPledgeBoxes();
      pledgebox.classList.toggle("selected");
   }
}

function clearPledgeBoxes() {
   var pledgeBoxes = document.querySelectorAll(".card.selected");
   for (i = 0; i < pledgeBoxes.length; i++) {
      pledgeBoxes[i].classList.remove("selected");
   }
}

/* Closes the modal when X is clicked */
close.addEventListener("click", closeModal);

function closeModal() {
   modalContainer.style.display = "none";
}

var pledgeSubmitButtons = document.querySelectorAll(".pledge button");

for (i = 0; i < pledgeSubmitButtons.length; i++) {
   pledgeSubmitButtons[i].addEventListener("click", submitPledge);
}

function submitPledge(e) {
   if (validateForm(true)) {
      var rewardsLeft = document.querySelectorAll(".rewards .amount-left span");
      if (e.target.id == "pledge1submit") {
         var addedAmount = e.target.previousElementSibling.childNodes[1].value;
         backers++;
         updateStats(addedAmount, backers);
      }
      if (e.target.id == "pledge2submit") {
         var addedAmount = e.target.previousElementSibling.childNodes[1].value;
         backers++;
         rewardsLeft[0].innerHTML = Number(rewardsLeft[0].innerHTML) - 1;
         rewardsLeft[3].innerHTML = Number(rewardsLeft[3].innerHTML) - 1;
         updateStats(addedAmount, backers);
      }
      if (e.target.id == "pledge3submit") {
         var addedAmount = e.target.previousElementSibling.childNodes[1].value;
         backers++;
         rewardsLeft[1].innerHTML = Number(rewardsLeft[1].innerHTML) - 1;
         rewardsLeft[4].innerHTML = Number(rewardsLeft[4].innerHTML) - 1;
         updateStats(addedAmount, backers);
      }

      modalPledge.style.display = "none";
      modalSuccess.style.display = "block";
   }
}

/* Updates becked amount, backers and progress bar */
function updateStats(amount, backers) {
   amountBacked += Number(amount);
   document.querySelector(".amount .number span").innerHTML = amountBacked.toLocaleString("en-US");
   if (amountBacked <= 100000) {
      document.querySelector(".progress").style.width = "calc(" + String(amountBacked) + " / 100000 * 100%)";
   } else {
      document.querySelector(".progress").style.width = "100%";
   }
   document.querySelector(".backers .number").innerHTML = backers.toLocaleString("en-US");
}

/* Closes modal on pledge submit */
closeSuccess.addEventListener("click", function () {
   modalSuccess.style.display = "none";
   closeModal();
});

/* Handles the hamburger menu on mobile */
mobileMenu.addEventListener("click", openMenu);

function openMenu() {
   document.querySelector(".nav-list").classList.add("open");
   document.body.classList.add("overlay");
   mobileMenu.removeEventListener("click", openMenu);
   mobileMenu.addEventListener("click", closeMenu);
   console.log(mobileMenu);
   mobileMenu.childNodes[0].src = "./images/icon-close-menu.svg";
}

function closeMenu() {
   document.querySelector(".nav-list").classList.remove("open");
   document.body.classList.remove("overlay");
   mobileMenu.removeEventListener("click", closeMenu);
   mobileMenu.addEventListener("click", openMenu);
   mobileMenu.childNodes[0].src = "./images/icon-hamburger.svg";
}

function validateForm() {
   var pledge2valid = document.getElementById("pledge2").value;
   var pledge3valid = document.getElementById("pledge3").value;
   if (pledge2valid == null || pledge2valid < 25) {
      alert("Pledge must be $25 or higher");
      return false;
   }
   if (pledge3valid == null || pledge3valid < 75) {
      alert("Pledge must be $75 or higher");
      return false;
   } else {
      return true;
   }
}

bookmark.addEventListener("click", bookmarked);

function bookmarked() {
   if (bookmark.checked) {
      bookmarkText.innerHTML = "Bookmarked";
   } else {
      bookmarkText.innerHTML = "Bookmark";
   }
}
