/*Listeners that control the opening, closing, and posting of the Sell Something Modal*/
document.getElementById('sell-something-button').addEventListener('click', openModal);
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-cancel').addEventListener('click', closeModal);
document.getElementById('modal-accept').addEventListener('click', createPost);

/*Listener that controls the Update Filters button*/
document.getElementById('filter-update-button').addEventListener('click', applyFilters);

/*Function that unhides the Sell Something Modal*/
function openModal() 
{
  document.getElementById('sell-something-modal').classList.remove('hidden');
  document.getElementById('modal-backdrop').classList.remove('hidden');
}

/*Function that closes the Sell Something Modal and sets all its values to nothing*/
function closeModal() 
{
  document.getElementById('sell-something-modal').classList.add('hidden');
  document.getElementById('modal-backdrop').classList.add('hidden');

  document.getElementById('post-text-input').value = '';
  document.getElementById('post-photo-input').value = '';
  document.getElementById('post-price-input').value = '';
  document.getElementById('post-city-input').value = '';
  document.querySelector('input[name="post-condition"]:checked').checked = false;
}

/*Function that creates a post using the Sell Something Modal. (Creates a new post value, populates it, posts the post, then clears the modal and closes it)*/
function createPost() 
{
  const description = document.getElementById('post-text-input').value;
  const photoURL = document.getElementById('post-photo-input').value;
  const price = document.getElementById('post-price-input').value;
  const city = document.getElementById('post-city-input').value;
  const condition = document.querySelector('input[name="post-condition"]:checked')?.value;
  
  if (!description || !photoURL || !price || !city || !condition) 
    {
      alert('Uh Oh! A field has been left blank. Please fill in all fields.');
      return;
    }

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

  document.querySelector('#posts').appendChild(postContainer);

  closeModal();
}

/*Function that shows or hides posts based on filter criteria inputted by the user*/
function applyFilters() 
{
  const filterText = document.getElementById('filter-text').value.toLowerCase();
  const filterMinPrice = parseFloat(document.getElementById('filter-min-price').value) || -Infinity;
  const filterMaxPrice = parseFloat(document.getElementById('filter-max-price').value) || Infinity;
  const filterCity = document.getElementById('filter-city').value.toLowerCase();
  const selectedConditions = Array.from(document.querySelectorAll('input[name="filter-condition"]:checked')).map(input => input.value);

  const posts = document.querySelectorAll('.post');

  posts.forEach(post => 
  {
    const postDescription = post.querySelector('.post-title').textContent.toLowerCase();
    const postPrice = parseFloat(post.getAttribute('data-price'));
    const postCity = post.getAttribute('data-city').toLowerCase();
    const postCondition = post.getAttribute('data-condition');

    const matchesText = filterText === '' || postDescription.includes(filterText);
    const matchesPrice = postPrice >= filterMinPrice && postPrice <= filterMaxPrice;
    const matchesCity = filterCity === '' || postCity === filterCity;
    const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(postCondition);

    if (matchesText && matchesPrice && matchesCity && matchesCondition) 
    {
      post.style.display = 'inline-block';
    } else 
    {
      post.style.display = 'none';
    }
  });
}
