/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const studentList = document.querySelector('.student-list').children;
const numberOfItemsToShow = 10;

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
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

function startIndexValue(page) {
  return (page * numberOfItemsToShow) - numberOfItemsToShow;
}

function endIndexValue(page) {
  return page * numberOfItemsToShow;
}

function setActiveClass(link) {
  oldActiveLink = document.querySelector('.pagination .active');
  oldActiveLink.className = '';
  link.className = 'active';
}

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
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
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





showPage(studentList, 1);
appendPageLinks(studentList);
appendSearchInput();



