
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("regForm");
    const liveRegion = document.getElementById("live");
    const cardsContainer = document.getElementById("profileCardsContainer");
    const summaryTable = document
      .getElementById("summaryTable")
      .getElementsByTagName("tbody")[0];
    const searchInput = document.getElementById("searchInput");
  
    let students = JSON.parse(localStorage.getItem("students")) || [];
  
    function renderStudent(student) {
      const { firstName, lastName, email, programme, year, interests, photo } = student;
  
      // For carrds
      const card = document.createElement("div");
      card.classList.add("profile-card");
      card.innerHTML = `
        <img src="${photo}" alt="${firstName} ${lastName}" width="100">
        <h3>${firstName} ${lastName}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Programme:</strong> ${programme}</p>
        <p><strong>Year:</strong> ${year}</p>
        <p><strong>Interests:</strong> ${interests}</p>
        <button class="remove-btn">Remove</button>
      `;
      cardsContainer.appendChild(card);
  
      // Add rows to table
      const row = summaryTable.insertRow();
      row.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${email}</td>
        <td>${programme}</td>
        <td>${year}</td>
        <td>${interests}</td>
        <td><img src="${photo}" alt="Photo" width="50"></td>
        <td><button class="remove-btn">Remove</button></td>
      `;
  
      // Remove button
      const removeFromCard = card.querySelector(".remove-btn");
      const removeFromTable = row.querySelector(".remove-btn");
  
      removeFromCard.addEventListener("click", () => {
        card.remove();
        row.remove();
        students = students.filter(s => s.email !== email);
        localStorage.setItem("students", JSON.stringify(students));
      });
  
      removeFromTable.addEventListener("click", () => {
        card.remove();
        row.remove();
        students = students.filter(s => s.email !== email);
        localStorage.setItem("students", JSON.stringify(students));
      });
    }
  
    // local storage
    students.forEach(renderStudent);
  
    // Search filter
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();
  
        const cards = document.querySelectorAll(".profile-card");
        cards.forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = text.includes(query) ? "block" : "none";
        });
  
        const rows = summaryTable.querySelectorAll("tr");
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(query) ? "" : "none";
        });
      });
    }
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      let isValid = true;
      liveRegion.textContent = "";
  
      const firstName = document.getElementById("firstName");
      const lastName = document.getElementById("lastName");
      const email = document.getElementById("email");
      const programme = document.getElementById("prg");
      const year = document.querySelector('input[name="year"]:checked');
      const interests = document.getElementById("interests");
      const photo = document.getElementById("photo");
  
      if (firstName.value.trim() === "") {
        document.getElementById("err-first").textContent =
          "Please enter your first name";
        isValid = false;
      } else {
        document.getElementById("err-first").textContent = "";
      }
  
      if (lastName.value.trim() === "") {
        document.getElementById("err-last").textContent =
          "Please enter your last name";
        isValid = false;
      } else {
        document.getElementById("err-last").textContent = "";
      }
  
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        document.getElementById("err-email").textContent =
          "Enter a valid email address.";
        isValid = false;
      } else {
        document.getElementById("err-email").textContent = "";
      }
  
      if (!year) {
        liveRegion.textContent = "Please select a year of study.";
        isValid = false;
      }
  
      if (photo.value.trim() === "") {
        liveRegion.textContent = "Please enter a valid URL.";
        isValid = false;
      }
  
      if (!isValid) {
        return;
      }
  
      const student = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        programme: programme.value,
        year: year.value,
        interests: interests.value,
        photo: photo.value
      };
  
      students.push(student);
      localStorage.setItem("students", JSON.stringify(students));
      renderStudent(student);
      liveRegion.textContent = "Profile added successfully!";
      form.reset();
    });
  });
  