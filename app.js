let allData = [];

fetch("./db.json")
  .then((response) => response.json())
  .then((data) => {
    allData = data; 
    displayCards(allData); 
  })
  .catch((error) => console.error("Xatolik:", error));

function createCard(item) {
  return `
    <div class="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <img src="${item.image}" alt="${
    item.title
  }" class="w-full h-48 object-cover">
      <div class="p-4">
        <h2 class="text-lg font-semibold text-gray-800">${item.title}</h2>
        <p class="text-sm text-gray-600 mt-2">${item.description}</p>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-lg font-bold text-blue-600">$${item.price}</span>
          <span class="text-sm text-gray-500">${item.rating.rate} ★ (${
    item.rating.count
  })</span>
        </div>
        <div class="flex mt-4" id="rating-${item.id}" data-rating="${
    item.rating.rate
  }">
          
          ${[1, 2, 3, 4, 5]
            .map((star) => {
              return `
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 cursor-pointer star" data-star="${star}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path d="M12 17.75l-3.6 2.15 1.36-4.91-3.64-3.04 4.98-.39L12 2l2.9 9.56 5.07.39-3.57 3.03 1.28 4.91z"/>
              </svg>
            `;
            })
            .join("")}
        </div>
      </div>
    </div>
  `;
}

function displayCards(data) {
  const container = document.getElementById("cards-container");
  container.innerHTML = data.map((item) => createCard(item)).join("");

  data.forEach((item) => {
    const stars = document.querySelectorAll(`#rating-${item.id} .star`);
    const initialRating = item.rating.rate;
    updateStars(stars, initialRating);

    stars.forEach((star) => {
      star.addEventListener("click", (e) => {
        const rating = parseInt(e.target.dataset.star);
        updateStars(stars, rating);
      });
    });
  });
}

function updateStars(stars, rating) {
  stars.forEach((star) => {
    const starRating = parseInt(star.dataset.star);
    if (starRating <= rating) {
      star.classList.add("text-yellow-400");
      star.classList.remove("text-gray-500");
    } else {
      star.classList.remove("text-yellow-400");
      star.classList.add("text-gray-500");
    }
  });
}

document.getElementById("search-input").addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();

  const filteredData = allData.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    );
  });

  displayCards(filteredData);
});
