/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name:
 * Email:
 */
/********************************************************************
** Type: Variables
** Description: Variables for the Sell Something buttons and modal.
** Parameters: Get an element
** Pre-Conditions: None
** Post-Conditions: Setting a varaible equal to html Id's and Names.
** *****************************************************************/

var openButton = document.getElementById('sell-something-button');
var closeButton = document.getElementById('modal-close');
var cancelButton = document.getElementById('modal-cancel');
var postButton = document.getElementById('modal-accept');

var sellSomethingModal = document.getElementById('sell-something-modal');
var backdrop = document.getElementById('modal-backdrop');

var itemDescription = document.getElementById('post-text-input');
var photoURL = document.getElementById('post-photo-input');
var sellingPrice = document.getElementById('post-price-input');
var city = document.getElementById('post-city-input');
var condition = document.getElementsByName('post-condition');

/********************************************************************
** Type: Variables
** Description: Variables for the filtering button and modal.
** Parameters: Get an element
** Pre-Conditions: None
** Post-Conditions: Setting a varaible equal to html Id's and Names.
** *****************************************************************/

var posts = document.getElementById('posts');
var filterButton = document.getElementById('filter-update-button');
var filterText = document.getElementById('filter-text');
var filterLowerValue = document.getElementById('filter-min-price');
var filterUpperValue = document.getElementById('filter-max-price');
var filterCity = document.getElementById('filter-city');
var filterCondition = document.getElementsByName("filter-condition");

/********************************************************************
** Type: Listeners
** Description: Listeners for clicks pertaining to the Sell Something modal.
** Parameters: Clicks pertaining to specific buttons
** Pre-Conditions: Variable must be created before hand.
** Post-Conditions: The specific button has a corresponding listener.
** *****************************************************************/

openButton.addEventListener('click', openSellModal);
closeButton.addEventListener('click', closeSellModal);
cancelButton.addEventListener('click', closeSellModal);
postButton.addEventListener('click', createPostButton);

/********************************************************************
** Type: Listeners
** Description: Listeners for clicks pertaining to the Filter modal.
** Parameters: Clicks pertaining to specific buttons
** Pre-Conditions: Variable must be created before hand.
** Post-Conditions: The specific button has a corresponding listener.
** *****************************************************************/

filterButton.addEventListener('click', filteredPosts)

/********************************************************************
** Type: Function
** Description: Displays the Sell Something modal and backdrop.
** Parameters: None
** Pre-Conditions: None
** Post-Conditions: Sell Something and Backdrop's display are set to block.
** *****************************************************************/

function openSellModal()
{
  sellSomethingModal.style.display = 'block';
  backdrop.style.display = 'block';
}

/********************************************************************
** Type: Function
** Description: Closes the Sell Something modal and backdrop.
** Parameters: None
** Pre-Conditions: None
** Post-Conditions: Sell Something and Backdrop's display are set to none.
** *****************************************************************/

function closeSellModal()
{
  sellSomethingModal.style.display = 'none';
  backdrop.style.display = 'none';
  itemDescription.value = "";
  photoURL.value = "";
  sellingPrice.value = "";
  city.value = "";
  condition[0].checked = true;
}

/********************************************************************
** Type: Function
** Description: Creates a new post and adds it to the Banny's List page.
** Parameters: Checks to see if all fields are satisfied, if so new post is created.
** Pre-Conditions: None
** Post-Conditions: Checks for alert, and adds new post.
** *****************************************************************/

function createPostButton()
{
  if(checkAlert() == true)
  {
    alert("Not all fields have been specified!");
  }
  else
  {
    createNewPost(itemDescription.value, photoURL.value, sellingPrice.value, city.value, getCondition());
    closeSellModal();
  }
}

/********************************************************************
** Type: Function
** Description: Checks the Sell Something modal fields to see if they are valid.
** Parameters: The modals fields must be filled out completely.
** Pre-Conditions: None
** Post-Conditions: Returns a boolean value based on if the conditions were met.
** *****************************************************************/

function checkAlert()
{
  if(itemDescription.value == "" || photoURL.value == "" || sellingPrice.value == "" || city.value == "")
  {
    return true;
  }
  else
  {
    return false;
  }
}

/********************************************************************
** Type: Function
** Description: Finds the condition that was checked for new post.
** Parameters: None
** Pre-Conditions: Condition field must be have at least one checked.
** Post-Conditions: Returns the condition that was checked.
** *****************************************************************/

function getCondition()
{
  for(var i = 0; i < condition.length; i++)
  {
    if(condition[i].checked == true)
    {
      return condition[i].value;
    }
  }
}

/********************************************************************
** Type: Function
** Description: Creates a new post and adds it to the Benny's List page.
** Parameters: Takes in all fields of the modal and creates a post from them.
** Pre-Conditions: Must have all fields filled out completely.
** Post-Conditions: Creates a new post.
** *****************************************************************/

function createNewPost(itemDescription, photoURL, sellingPrice, city, condition)
{
  var postDiv = document.createElement('div');
  postDiv.classList.add('post');
  postDiv.setAttribute('data-price', sellingPrice);
  postDiv.setAttribute('data-city', city);
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

/********************************************************************
** Type: Function
** Description: Filters the page based off all information.
** Parameters: Takes information and finds corresponding item based on input.
** Pre-Conditions: Must have an input of somekind.
** Post-Conditions: Filters results based on provided information.
** *****************************************************************/

function filteredPosts()
{
  filterTextBox();
  filterValues();
  filterCities();
  filterConditions();
}

/********************************************************************
** Type: Function
** Description: Filters the page based of the text box.
** Parameters: Takes text and finds corresponding item based on input.
** Pre-Conditions: Must have text input.
** Post-Conditions: Filters results based on text.
** *****************************************************************/

function filterTextBox()
{
  var postSelector = document.querySelectorAll('.post');
  var clean = cleanText(filterText.value)
  var text = clean.toLowerCase();

  for(var i = 0; i < postSelector.length; i++)
  {
    if(postSelector[i].querySelector(".post-title").textContent.toLowerCase().indexOf(text) == -1)
    {
      postSelector[i].parentNode.removeChild(postSelector[i]);
    }
  }
}

/********************************************************************
** Type: Function
** Description: Filters the page based on the min and max values.
** Parameters: Takes values and finds corresponding item based on input.
** Pre-Conditions: Must have number input.
** Post-Conditions: Filters results based on the values.
** *****************************************************************/

function filterValues()
{
  var postSelector = document.querySelectorAll('.post');
  var min = Number(filterLowerValue.value);
  var max = Number(filterUpperValue.value);

  if(max == '')
  {
    max = Number.MAX_VALUE;
  }
  if(min == '')
  {
    min = Number.MIN_VALUE;
  }

  for(var i = 0; i < postSelector.length; i++)
  {
    if(Number(postSelector[i].getAttribute("data-price")) < min || Number(postSelector[i].getAttribute("data-price")) > max)
    {
      postSelector[i].parentNode.removeChild(postSelector[i]);
    }
  }
}

/********************************************************************
** Type: Function
** Description: Filters the page based on the city.
** Parameters: Takes the city and finds corresponding item based on input.
** Pre-Conditions: Must have at least one city selected.
** Post-Conditions: Filters results based on the selected city.
** *****************************************************************/

function filterCities()
{
  var postSelector = document.querySelectorAll('.post');
  var city = filterCity.value;

  if(city != 0)
  {
    for(var i = 0; i < postSelector.length; i++)
    {
      if(city != postSelector[i].getAttribute("data-city"))
      {
        postSelector[i].parentNode.removeChild(postSelector[i]);
      }
    }
  }
}

/********************************************************************
** Type: Function
** Description: Filters the page based on the condition.
** Parameters: Takes the condition and finds corresponding item based on input.
** Pre-Conditions: None
** Post-Conditions: Filters results based on the selected condition.
** *****************************************************************/

function filterConditions()
{
  var postSelector = document.querySelectorAll('.post');

  if(findCondition() != 0)
  {
    for(var i = 0; i < postSelector.length; i++)
    {
      if(findCondition().indexOf(postSelector[i].getAttribute("data-condition")) == -1)
      {
        postSelector[i].parentNode.removeChild(postSelector[i]);
      }
    }
  }
}

/********************************************************************
** Type: Function
** Description: Finds the conditons that were selected.
** Parameters: None
** Pre-Conditions: None
** Post-Conditions: Returns what conditions were selected.
** *****************************************************************/

function findCondition()
{
  var conditionArray = [];

  for (var i = 0; i < filterCondition.length; i++)
  {
    if(filterCondition[i].checked !=  false)
    {
      conditionArray.push(filterCondition[i].value);
    }
  }

  if(conditionArray.length != 0)
  {
    return conditionArray;
  }
  else
  {
    return 0;
  }
}

/********************************************************************
** Type: Function
** Description: Cleans the text.
** Parameters: Takes text in a text input.
** Pre-Conditions: Must have text input.
** Post-Conditions: Returns a cleaned text input.
** *****************************************************************/

function cleanText(text)
{
  var clean = text.replace(/[!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~]/g, '');

  return clean;
}
