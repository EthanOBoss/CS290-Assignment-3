// Event listeners for opening and closing the modal
document.getElementById('sell-something-button').addEventListener('click', openModal);
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-cancel').addEventListener('click', closeModal);

// Event listener for the "Create Post" button
document.getElementById('modal-accept').addEventListener('click', createPost);

// Event listener for the "Update" button to apply filters
document.getElementById('filter-update-button').addEventListener('click', applyFilters);

// Open the modal
function openModal() {
  document.getElementById('sell-something-modal').classList.remove('hidden');
  document.getElementById('modal-backdrop').classList.remove('hidden');
}

// Close the modal
function closeModal() {
  document.getElementById('sell-something-modal').classList.add('hidden');
  document.getElementById('modal-backdrop').classList.add('hidden');

  // Clear input fields when modal is closed
  document.getElementById('post-text-input').value = '';
  document.getElementById('post-photo-input').value = '';
  document.getElementById('post-price-input').value = '';
  document.getElementById('post-city-input').value = '';
  document.querySelector('input[name="post-condition"]:checked').checked = false;
}

// Create a new post
function createPost() {
  const description = document.getElementById('post-text-input').value.trim();
  const photoURL = document.getElementById('post-photo-input').value.trim();
  const price = document.getElementById('post-price-input').value.trim();
  const city = document.getElementById('post-city-input').value.trim();
  const condition = document.querySelector('input[name="post-condition"]:checked')?.value;

  // Validate input fields
  if (!description || !photoURL || !price || !city || !condition) {
    alert('Please fill in all fields before submitting.');
    return;
  }

  // Create the new post element
  const postContainer = document.createElement('div');
  postContainer.classList.add('post');
  postContainer.setAttribute('data-price', price);
  postContainer.setAttribute('data-city', city.toLowerCase());
  postContainer.setAttribute('data-condition', condition);

  postContainer.innerHTML = `
    <div class="post-contents">
      <div class="post-image-container">
        <img src="${photoURL}" alt="${description}">
      </div>
      <div class="post-info-container">
        <a href="#" class="post-title">${description}</a>
        <span class="post-price">$${price}</span>
        <span class="post-city">(${city})</span>
      </div>
    </div>
  `;

  // Add the new post to the DOM
  document.querySelector('#posts').appendChild(postContainer);

  // Close the modal after creating the post
  closeModal();
}

// Apply filters to the posts
function applyFilters() {
  const filterText = document.getElementById('filter-text').value.toLowerCase();
  const filterMinPrice = parseFloat(document.getElementById('filter-min-price').value) || -Infinity;
  const filterMaxPrice = parseFloat(document.getElementById('filter-max-price').value) || Infinity;
  const filterCity = document.getElementById('filter-city').value.toLowerCase();
  const selectedConditions = Array.from(document.querySelectorAll('input[name="filter-condition"]:checked')).map(input => input.value);

  // Get all posts
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const postDescription = post.querySelector('.post-title').textContent.toLowerCase();
    const postPrice = parseFloat(post.getAttribute('data-price'));
    const postCity = post.getAttribute('data-city').toLowerCase();
    const postCondition = post.getAttribute('data-condition');

    const matchesText = filterText === '' || postDescription.includes(filterText);
    const matchesPrice = postPrice >= filterMinPrice && postPrice <= filterMaxPrice;
    const matchesCity = filterCity === '' || postCity === filterCity;
    const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(postCondition);

    // Show or hide the post based on the filter criteria
    if (matchesText && matchesPrice && matchesCity && matchesCondition) {
      post.style.display = 'inline-block'; // Show the post
    } else {
      post.style.display = 'none'; // Hide the post
    }
  });
}
