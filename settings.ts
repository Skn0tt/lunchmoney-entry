import * as cookieStore from "./store";

async function refreshCategories() {
  const response = await fetch("https://dev.lunchmoney.app/v1/categories", {
    headers: {
      Authorization: `Bearer ${cookieStore.getAccessToken()}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Request Failed");
  }

  const { categories } = await response.json();

  const result = [];

  for (const { id, name, is_group, group_id } of categories) {
    if (group_id) {
      continue;
    }

    result.push({
      id,
      name,
      categories: is_group
        ? categories
            .filter((c) => c.group_id === id)
            .map((c) => ({
              id: c.id,
              name: c.name,
            }))
        : undefined,
    });
  }

  cookieStore.setCategories(result);
}

async function refreshAccounts() {
  const response = await fetch("https://dev.lunchmoney.app/v1/assets", {
    headers: {
      Authorization: `Bearer ${cookieStore.getAccessToken()}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Request Failed");
  }

  const { assets } = await response.json();

  cookieStore.setAssets(assets.map(({ id, name }) => ({ id, name })));
}

const accessTokenInput = document.getElementById(
  "access-token-input"
) as HTMLInputElement;
accessTokenInput.value = cookieStore.getAccessToken();

document.getElementById("access-token-form").onsubmit = async (evt) => {
  evt.preventDefault();

  cookieStore.setAccessToken(accessTokenInput.value);

  try {
    await Promise.all([refreshCategories(), refreshAccounts()]);

    window.alert("Successfully updated the token!");
  } catch (error) {
    window.alert(
      "Something didn't work - are you sure this is the right access token?"
    );
  }
};

document.getElementById("refresh").onclick = async () => {
  try {
    await Promise.all([refreshCategories(), refreshAccounts()]);

    window.alert("Successfully refreshed.");
  } catch (error) {
    window.alert("Something didn't work.");
  }
};
