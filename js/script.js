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

console.log(studentList);



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

  for (let i = 0; i < studentList.length; i += 1) {
    if (i >= startIndex && i < endIndex) {
      studentList[i].style.display = "";
    } else {
      studentList[i].style.display = "none";
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



/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = (list) => {
  const numberOfPages = Math.ceil(studentList.length / numberOfItemsToShow);
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
      showPage(studentList, page);
      console.log("show page: " + page);
      setActiveClass(e.target);
    });
    li.appendChild(a);
    ul.appendChild(li);
  }
}

showPage(studentList, 1);
appendPageLinks(studentList);




