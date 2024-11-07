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

/*Function that makes sure all Sell Something Modal fields are filled in*/
function checkAlert()
{
  if(itemDescription.value == "" || photoURL.value == "" || sellingPrice.value == "" || city.value =="")
  {
    return true;
  }
  else
  {
    return false;
  }
}

/*Function that finds the new post condition and checks it*/
function getCondition()
{
  for(var i = 0; i < condition.length, i++)
      {
        if(condition[i].checked == true)
        {
          return condition[i].value;
        }
      }
}

/*Function that calls prior functions to create a post on the main page*/
function createNewPost(itemDescription, photoURL, sellingPrice, city, condition)
{
  var postDiv = document.createElement('div');
  postDiv.classList.add('post');
  postDiv.setAttribute('data-price', sellingPrice);
  poatDiv.setAttribute('data-city', city);
  postDiv.setAttribute('data-condition', condition);

  var postContentsDiv = document.createElement('div');
  postContentsDiv.classList.add('post-contents');
  postDiv.appendChild(postContentsDiv);

  var postImageContainerDiv = document.createElement('div');
  postImageContainerDiv.classList.add('post-image-container');
  postContentsDiv.appendChild(postImageContainerDiv);

  var imageImg = document.createElement('img');
  imageImg.src = photoURL;
  postImageContainerDiv.appendChild(imageImg);

  var postInfoContainerDiv = document.createElement('div');
  postInfoContainerDiv.classList.add('post-info-container');
  postContentsDiv.appendChild(postInfoContainerDiv);

  var linkA = document.createElement('a');
  linkA.classList.add('post-title');
  linkA.href = "#";
  linkA.textContent = itemDescription;
  postInfoContainerDiv.appendChild(linkA);

  var postPriceSpan = document.createElement('span');
  postPriceSpan.classList.add('post-price');
  postPriceSpan.textContent = "$" + sellingPrice;
  postInfoContainerDiv.appendChild(postPriceSpan);

  var postCitySpan = document.createElement('span');
  postCitySpan.classList.add('post-city');
  postCitySpan.textContent = "(" + city + ")";
  postInfoContainerDiv.appendChild(postCitySpan);

  posts.appendChild(postDiv);
}
