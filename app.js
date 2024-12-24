fetch("./db.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("cards-container");
    container.innerHTML = data.map((item) => createCard(item)).join("");
  })
  .catch((error) => console.error("Xatolik:", error));
function createCard(item) {
  return `
        <div class="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h2 class="text-lg font-semibold text-gray-800">${item.title}</h2>
                <p class="text-sm text-gray-600 mt-2">${item.description}</p>
                <div class="mt-4 flex items-center justify-between">
                    <span class="text-lg font-bold text-blue-600">$${item.price}</span>
                    <span class="text-sm text-gray-500">${item.rating.rate} ★ (${item.rating.count})</span>
                </div>
            </div>
        </div>
    `;
}
