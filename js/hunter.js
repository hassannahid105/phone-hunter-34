const loadData = async (searchText) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await response.json();
  const phones = data.data;
  displayPhone(phones);
};

// ! phone data  display
const displayPhone = (phones, all) => {
  const phoneContainer = document.getElementById("phone-container");
  const showBtn = document.getElementById("show-btn");
  phoneContainer.textContent = "";
  // * phones value reassign
  if (phones.length > 9) {
    phones = phones.slice(0, 9);
    showBtn.classList.remove("hidden");
  } else if (all) {
    console.log("i can do it");
  } else {
    showBtn.classList.add("hidden");
  }
  // !  display
  phones.forEach((phone) => {
    const createDiv = document.createElement("div");
    createDiv.classList = `card card-compact bg-base-100 shadow-xl border border-5 border-green-500 p-4`;
    createDiv.innerHTML = `
            <figure>
            <img
             src="${phone.image}"
             alt="Shoes"
             />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <div class="card-actions justify-end">
                <button class="btn btn-primary w-full text-xl font-bold text-white">Details</button>
              </div>   
    `;
    phoneContainer.appendChild(createDiv);
  });
  spinner(false);
};
//! search impliment
const searchText = () => {
  const search = document.getElementById("search");
  const searchValue = search.value;
  loadData(searchValue);
  spinner(true);
  //
};
// ! spinner
const spinner = (id) => {
  const spin = document.getElementById("spinner");
  if (id) {
    spin.classList.remove("hidden");
  } else {
    spin.classList.add("hidden");
  }
};
//! show all
const showAll = () => {
  loadData();
};
loadData("iphone");
