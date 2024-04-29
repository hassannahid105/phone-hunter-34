const loadData = async (searchText, isShowAll) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await response.json();
  const phones = data.data;
  displayPhone(phones, isShowAll);
};

// ! phone data  display
const displayPhone = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  const showBtn = document.getElementById("show-btn");
  phoneContainer.textContent = "";
  // * phones value reassign
  if (phones.length > 9 && !isShowAll) {
    showBtn.classList.remove("hidden");
  } else {
    showBtn.classList.add("hidden");
  }
  if (!isShowAll) {
    phones = phones.slice(0, 9);
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
                <button class="btn btn-primary w-full text-xl font-bold text-white" id="${phone.slug}" onclick="showDetails()">Details</button>
              </div>   
    `;
    phoneContainer.appendChild(createDiv);
  });
  spinner(false);
};
//! search impliment
const searchText = (isShowAll) => {
  const search = document.getElementById("search");
  const searchValue = search.value;
  loadData(searchValue, isShowAll);
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
const showAll = (isShowAll) => {
  searchText(true);
  loadData("iphone", true);
};
loadData("iphone");

// ! details button modal show
const showDetails = async () => {
  const singlePhone = await fetch(
    "https://openapi.programming-hero.com/api/phone/apple_iphone_12-10509"
  );
  const response = await singlePhone.json();
  console.log(response);
};
