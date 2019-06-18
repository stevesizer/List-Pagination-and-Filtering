/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing



const studentList = document.querySelector('.student-list').children;
const numberOfItemsToShow = 10;

/*** 
   Shows the results based on the paged result we are on and the list.
   If the indexes dont match they are hidden from the user.
***/
const showPage = (list, page) => {
  const startIndex = startIndexValue(page);
  const endIndex = endIndexValue(page);

  for (let i = 0; i < list.length; i += 1) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
}

// gets the start index value based on page number
function startIndexValue(page) {
  return (page * numberOfItemsToShow) - numberOfItemsToShow;
}

// gets the end index value based on page number.
function endIndexValue(page) {
  return page * numberOfItemsToShow;
}

// Sets the active state of the clicked pagination link.
function setActiveClass(link) {
  oldActiveLink = document.querySelector('.pagination .active');
  oldActiveLink.className = '';
  link.className = 'active';
}

/***
  Searches the list of users and marks the ones that include the 
  search value as a match. We can then generate a sub list from the match class.
***/
function searchList(value) {
  for (let i = 0; i < studentList.length; i += 1) {
    const li = studentList[i];
    li.style.display = '';
    li.classList.remove('match');

    const name = li.querySelector('h3').textContent;

    if (name.includes(value.toLowerCase())) {
      li.classList.add("match");
    } else {
      li.style.display = "none"; 
    }
  }

  showSearchResultItems();
}

/***
  Gets the new list of results from the serach input result and displays these. If 
  there are no results a message will appear saying 'No results'. It also updates 
  the pagination
***/
function showSearchResultItems() {
  const results = document.querySelectorAll('.student-list .match');
  const pageDiv = document.querySelector('.page');
  const pagination = document.querySelector('.pagination');
  if (pagination) {
  pageDiv.removeChild(pagination);
  }
  const p = document.querySelector('.page p');
  if (p) {
    pageDiv.removeChild(p);
  }
  if (results.length > 0) {
    showPage(results, 1);
    appendPageLinks(results);
    console.log(results.length);
  }
  else {
    const noResultsP = document.createElement('p');
    noResultsP.textContent = 'No results.'
    pageDiv.appendChild(noResultsP);
  }
}


/*** 
   Adds the pagination links to the bottom of the page with a event listener
   to caputure button click, to change the paged results.
***/
const appendPageLinks = (list) => {
  const numberOfPages = Math.ceil(list.length / numberOfItemsToShow);
  const pageDiv = document.querySelector('.page');
  const div = document.createElement('div');
  div.className = 'pagination';
  pageDiv.appendChild(div);

  const ul = document.createElement('ul');
  div.appendChild(ul);

  for (let i = 1; i <= numberOfPages; i += 1){
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = i;
    a.href = '#';
    if (i === 1) {
      a.className = 'active';
    }
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const page = parseInt(e.target.textContent);
      showPage(list, page);
      console.log("show page: " + page);
      setActiveClass(e.target);
    });
    li.appendChild(a);
    ul.appendChild(li);
  }
}

/***
  Adds a search input and button to the page. This has two event listeners an
  on click for the button and keyup for the input. This will then update the results
  based on user input.
***/
const appendSearchInput = () => {
  const pageHead = document.querySelector('.page-header');
  const searchDiv = document.createElement('div');
  searchDiv.className = 'student-search';
  pageHead.appendChild(searchDiv);

  const input = document.createElement('input');
  input.placeholder = 'Search for students...';
  searchDiv.appendChild(input);

  const button = document.createElement('button');
  button.textContent = 'Search';
  searchDiv.appendChild(button);

  button.addEventListener('click', () => {
    const searchValue = input.value;
    input.value = '';
    
    searchList(searchValue);
  });

  input.addEventListener('keyup', () => {
    searchList(input.value);
  });

}

/***
  Calls the functions initially to get the party started.
***/
showPage(studentList, 1);
appendPageLinks(studentList);
appendSearchInput();



