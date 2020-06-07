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
 * Define Global Variables
 * 
*/
let numberOfSections = document.querySelectorAll("section"); 
let firstList = true; //make first section active
let activeSection = "section1";
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function topButton(){
    window.addEventListener("scroll",function(){
        if (document.documentElement.scrollTop > window.innerHeight/2) {
            document.getElementById("toTopButton").style.display = "block";
          } else {
            document.getElementById("toTopButton").style.display = "none";
          }
    })
}

function navigation(event){
    const target = event.target;
    if(target.tagName != "LI" || target.getAttribute("id") == "nav_collap_menu")return;
    document.getElementById(target.getAttribute("id").substring(3)).scrollIntoView();
}
function buildNav(){
    document.getElementById("nav_collap_menu").style.display = "none";
    let windowWidth = window.innerWidth;
    const liItem = document.createDocumentFragment();
    for(const numberOfSection of numberOfSections){
        if(document.getElementById("nav"+numberOfSection.getAttribute("id")) != null)
        {continue;}
        const navLi = document.createElement("li");
        navLi.innerText = numberOfSection.getAttribute("data-nav");
        navLi.setAttribute("id","nav"+numberOfSection.getAttribute("id"));
        // navLi.classList.add("menu__link");
        if(firstList){
            firstList = false;
            navLi.classList.add("nav__active");
        }
        liItem.appendChild(navLi);  
    }
    document.getElementById("navbar__list").appendChild(liItem);
    document.getElementById("navbar__list").addEventListener("click",navigation);
    // console.log(windowWidth);
    for(const numberOfSection of numberOfSections){
        const asdd= document.getElementById("nav"+numberOfSection.getAttribute("id"));
        asdd.classList.remove("menu__link", "hide");
        windowWidth -= asdd.offsetWidth;
        // console.log(windowWidth,asdd.offsetWidth);
        if(windowWidth < asdd.offsetWidth-document.getElementById("nav_collap_menu").offsetWidth){
            // windowWidth += asdd.offsetWidth;
            asdd.classList.add("menu__link" , "hide");
            document.getElementById("nav_collap_menu").style.display = "block";
            // console.log(windowWidth);
        }
    }
}

function detectActiveSection(){
    window.addEventListener("scroll",function(){
        for(const numberOfSection of numberOfSections){
           const rec =  numberOfSection.getBoundingClientRect();
           if(rec.top <= window.innerHeight/2){
            document.getElementById(activeSection).classList.remove("your-active-class");
            document.getElementById("nav"+activeSection).classList.remove("nav__active");
            activeSection = numberOfSection.getAttribute("id");
            numberOfSection.classList.add("your-active-class");
            document.getElementById("nav"+activeSection).classList.add("nav__active");
           }
        } 
    });
}
let setTimeOutToStop ;
function hideNavWhenStopScroll(){
    document.getElementsByTagName("nav")[0].style.display = "none";

}
function hideNav(){
    // buildNav();
    document.getElementsByTagName("nav")[0].style.display = "block";
    clearTimeout(setTimeOutToStop);
    setTimeOutToStop = setTimeout(hideNavWhenStopScroll,3000);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
buildNav();

// Add class 'active' to section when near top of viewport
detectActiveSection();

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active



/* observe dynamically adding section*/

const mainElemnt = document.querySelector("main");
const config = {childList: true};
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            numberOfSections = document.querySelectorAll("section");
            buildNav();
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(mainElemnt, config);


/* end oservition of dynamically addin section*/


topButton();
document.getElementById("toTopButton").addEventListener("click",function(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});


window.onresize = buildNav;
window.onscroll = hideNav;
document.getElementById("nav_collap_menu").addEventListener("click",function(){
    const hidedLists = document.getElementsByClassName("menu__link");
    
    for(const hidedList of hidedLists){
        hidedList.classList.toggle("hide");
    }
});

function collapseSection(event){
    const target = event.target;
    if(target.tagName == "section" ){
        // target.nexts;
        console.log("clicked");
    }
}
document.body.addEventListener("click",collapseSection);