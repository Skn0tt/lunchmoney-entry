import * as cookieStore from "./store";

function fillInCategories() {
  const categorySelect = document.getElementById(
    "categories"
  ) as HTMLSelectElement;

  for (const cat of cookieStore.getCategories()) {
    if (cat.categories) {
      const el = document.createElement("optgroup");
      el.label = cat.name;
      cat.categories.forEach((cat) => {
        const subEl = document.createElement("option");
        subEl.value = "" + cat.id;
        subEl.innerText = cat.name;
        el.appendChild(subEl);
      });
      categorySelect.appendChild(el);
    } else {
      const el = document.createElement("option");
      el.value = "" + cat.id;
      el.innerText = cat.name;
      categorySelect.appendChild(el);
    }
  }
}

function fillInAccounts() {
  const select = document.getElementById("accounts") as HTMLSelectElement;

  for (const asset of cookieStore.getAssets()) {
    const el = document.createElement("option");
    el.value = "" + asset.id;
    el.innerText = asset.name;
    select.appendChild(el);
  }
}

function checkIfAccessTokenIsSet() {
  if (!cookieStore.getAccessToken()) {
    window.alert(
      "You need to supply an access token to your Lunch Money site. Continue to open the settings page."
    );
    location.pathname = "/settings";
  }
}

function main() {
  checkIfAccessTokenIsSet();
  fillInCategories();
  fillInAccounts();
}

main();

document.getElementById("entry").onsubmit = async (evt) => {
  evt.preventDefault();

  const target = evt.target as HTMLFormElement;

  const form = new FormData(target);

  await fetch("https://dev.lunchmoney.app/v1/transactions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookieStore.getAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transactions: [
        {
          date: new Date(),
          amount: form.get("amount"),
          category_id: +form.get("category"),
          asset_id: +form.get("account"),
          payee: form.get("payee"),
        },
      ],
      apply_rules: true,
    }),
  });

  target.reset();
};
