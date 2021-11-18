/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navList = document.querySelector('ul');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//returns a fragment that includes all list items found in the HTML.

function navFragment(sections){
    const fragment = document.createDocumentFragment();
    for(const section of sections){
        const listItem = document.createElement('li');
        const sectionID = section.id;
        const sectionName = section.getAttribute('data-nav');
        listItem.innerHTML = `<a class = 'menu__link' id ='n-${sectionID}'>${sectionName}</a>`;
        fragment.appendChild(listItem);
    }
    return fragment;
}
//finds the y-position of an element
function findPosition(elementSearched) {
    var currenttop = 0;
    if (elementSearched.offsetParent) {
        do {
            currenttop += elementSearched.offsetTop;
        } while ((elementSearched = elementSearched.offsetParent));
        return [currenttop];
    }
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavBar(){
    const listsFragment = navFragment(sections);
    navList.appendChild(listsFragment);
}

// Add class 'active' to section when near top of viewport
function setSectionActive(){
    const options = {
        root : null,
        threshold : 0.1949,
        rootMargin : '-200px 0px -200px 0px'
    };
    const observer = new IntersectionObserver(function(entries, observer){
        for(const entry of entries){
            const arID = `n-${entry.target.id}`;
            const ar = document.getElementById(arID);
            if(entry.isIntersecting){
                entry.target.classList.add('your-active-class');
                ar.classList.add('active-nav');
                
            }
            else{
                entry.target.classList.remove('your-active-class');
                ar.classList.remove('active-nav');
            }
        }
    }, options);

    for (const section of sections) {
        observer.observe(section);
    }
}

// Scroll to anchor ID using scrollTO event
function scroll(){

    navList.addEventListener('click', function (sectionClicked){
        const ar = sectionClicked.target;

        if(ar.nodeName === 'A'){
            const sectionID = ar.id.slice(2);
            const sectionScrolled = document.getElementById(sectionID);
            window.scrollTo({
                top: findPosition(sectionScrolled),
                left: 0,
                behavior: 'smooth'
              });
        }
    });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNavBar();
// Scroll to section on link click
scroll();
// Set sections as active
setSectionActive();

