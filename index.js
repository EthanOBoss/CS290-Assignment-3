// Get elements for modal and buttons
const sellButton = document.getElementById("sell-something-button");
const modalBackdrop = document.getElementById("modal-backdrop");
const sellModal = document.getElementById("sell-something-modal");
const modalCloseButton = document.getElementById("modal-close");
const modalCancelButton = document.getElementById("modal-cancel");
const modalAcceptButton = document.getElementById("modal-accept");

// Get input fields
const postTextInput = document.getElementById("post-text-input");
const postPhotoInput = document.getElementById("post-photo-input");
const postPriceInput = document.getElementById("post-price-input");
const postCityInput = document.getElementById("post-city-input");
const postConditionInputs = document.getElementsByName("post-condition");

// Helper function to show modal
function showModal() {
  modalBackdrop.classList.remove("hidden");
  sellModal.classList.remove("hidden");
}

// Helper function to hide modal and clear inputs
function hideModal() {
  modalBackdrop.classList.add("hidden");
  sellModal.classList.add("hidden");
  clearModalInputs();
}

// Helper function to clear input fields in modal
function clearModalInputs() {
  postTextInput.value = "";
  postPhotoInput.value = "";
  postPriceInput.value = "";
  postCityInput.value = "";
  postConditionInputs.forEach(input => input.checked = input.id === "post-condition-new");
}

// Show modal when "sell something" button is clicked
sellButton.addEventListener("click", showModal);

// Close modal when "X" or "Cancel" button is clicked
modalCloseButton.addEventListener("click", hideModal);
modalCancelButton.addEventListener("click", hideModal);

// Handle form submission
modalAcceptButton.addEventListener("click", function() {
  const itemDescription = postTextInput.value.trim();
  const photoURL = postPhotoInput.value.trim();
  const price = postPriceInput.value.trim();
  const city = postCityInput.value.trim();
  const condition = Array.from(postConditionInputs).find(input => input.checked)?.value;

  // Validate input fields
  if (!itemDescription || !photoURL || !price || !city || !condition) {
    alert("Please fill in all fields to create a post.");
    return;
  }

  // Create the new post element
  const post = document.createElement("div");
  post.classList.add("post");
  post.setAttribute("data-price", price);
  post.setAttribute("data-city", city);
  post.setAttribute("data-condition", condition);

  post.innerHTML = `
    <div class="post-contents">
      <div class="post-image-container">
        <img src="${photoURL}" alt="${itemDescription}">
      </div>
      <div class="post-info-container">
        <a href="#" class="post-title">${itemDescription}</a> <span class="post-price">$${price}</span> <span class="post-city">(${city})</span>
      </div>
    </div>
  `;

  // Append the new post to the posts container
  const postsContainer = document.getElementById("posts");
  postsContainer.appendChild(post);

  // Close and clear modal inputs
  hideModal();
});
