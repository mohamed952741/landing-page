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
//Factory returning an item to be appended to the Fragment
function itemFactory(section){
        const item = document.createElement('li');
        const sectionId = section.id;
        const sectionNav = section.getAttribute('data-nav');
        item.innerHTML = `<a class = 'menu__link' id ='ar-${sectionId}'>${sectionNav}</a>`;
        return item;
}
//returns a fragment that includes all list items found in the HTML.
function navFragment(sections){
    const fragment = document.createDocumentFragment();
    for(const section of sections){
        const item=itemFactory(section);
        fragment.appendChild(item);
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
    const sections2 = document.querySelectorAll("section");
    window.addEventListener("scroll", () => {
        if(window.pageYOffset>374){
        let current = "";
      sections2.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            if (typeof(section.getAttribute("id")) != "undefined"){
            current = section.getAttribute("id");}
        }
      });
      if (typeof(current) != "undefined"){
      sections2.forEach((section) => {

        if (section.getAttribute("id") == current) {
                  section.classList.add('your-active-class');
                  document.getElementById("ar-"+section.getAttribute("id")).classList.add('active-nav');
              }
              else {
                  section.classList.remove('your-active-class');
                  document.getElementById("ar-"+section.getAttribute("id")).classList.remove('active-nav');
              }
          });}
    }});
    
}

// Scroll to anchor ID using scrollTO event
function scroll(){

    navList.addEventListener('click', function (sectionClicked){
        const ar = sectionClicked.target;

        if(ar.nodeName === 'A'){
            const sectionID = ar.id.slice(3);
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

