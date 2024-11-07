/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Ethan Hickman
 * Email: hickmaet@oregonstate.edu
 */

/*Sell something button and modal variables*/
var openButton = document.getElementById('sell-something-button');
var closeButton = document.getElementById('modal-close');
var cancelButton = document.getElementById('modal-cancel');
var postButton = document.getElementByUd('modal-accept');
var sellSomethingModal = document.getElementById('sell-something-modal');
var backdrop = document.getElementById('modal-backdrop');
var itemDescription = document.getElementById('post-text-input');
var photoURL = document.getElementById('post-photo-input');
var sellingPrice = document.getElementById('post-price-input');
var city = document.getElementById('post-city-input');
var condition = document.getElementsByName('post-condition');

/*Filtering button and modal variables*/
var posts = document.getElementById('posts');
var filterButton = document.getElementById('filter-update-button');
var filterText = document.getElementById('filter-text');
var filterLowerValue = document.getElementById('filter-min-price');
var filterUpperValue = document.getElementById('filter-max-price');
var filterCity = document.getElementById('filter-city');
var filterCondition = document.getElementByName('filter-condition');

/*Listens for clicks on the Sell Something modal*/
openButton.addEventListener('click', openSellModal);
closeButton.addEventListener('click', closeSellModal);
cancelButton.addEventListener('click', closeSellModal);
postButton.addEventListener('click', createPostButton);

/*Listener for clicks on the Filter modal*/
filterButton.addEventListener('click', filteredPosts);

/*Function that displays the Sell Something modal*/
function openSellModal()
{
  sellSomethingModal.style.display = 'block';
  backdrop.style.display = 'block';
}

/*Function that closes the Sell Something modal*/
function closeSellModal()
{
  sellSomethingModal.style.display = 'none';
  backdrop.style.display = 'none';
}

/*Function that creates a post using the Sell Something modal*/
function createPostButton()
{
  if(checkAlert() == true)
  {
    alert("Please fill in all the fields!");
  }
  else
  {
    createNewPost(itemDescription.value, photoURL.value, sellingPrice.value, city.value, getCondition());
    closeSellModal();
  }
}
