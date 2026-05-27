async function loadItems() {

  const res = await fetch("/items");

  const items = await res.json();

  const container = document.getElementById("items");

  container.innerHTML = "";

  items.forEach(item => {

    const div = document.createElement("div");

    div.className = "card";

    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: ₹${item.price}</p>
      <p>Status: ${item.status}</p>

      ${
        item.status === "available"
        ? `<button onclick="claimItem(${item.id})">Claim</button>`
        : ""
      }

      ${
        item.status === "claimed"
        ? `<button onclick="pickupItem(${item.id})">Confirm Pickup</button>`
        : ""
      }

      <button onclick="removeItem(${item.id})">
        Remove Listing
      </button>
    `;

    container.appendChild(div);

  });

}


async function addItem() {

  const name = document.getElementById("name").value;

  const price = document.getElementById("price").value;

  await fetch("/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      price
    })
  });

  loadItems();
}


async function claimItem(id) {

  const res = await fetch(`/claim/${id}`, {
    method: "POST"
  });

  const data = await res.json();

  alert(data.message);

  loadItems();
}


async function pickupItem(id) {

  const res = await fetch(`/pickup/${id}`, {
    method: "POST"
  });

  const data = await res.json();

  alert(data.message);

  loadItems();
}


async function removeItem(id) {

  await fetch(`/remove/${id}`, {
    method: "DELETE"
  });

  loadItems();
}


loadItems();

setInterval(loadItems, 2000);