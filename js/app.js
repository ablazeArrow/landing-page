/*Global variable */
const sections = document.querySelectorAll('section');
const itemsFragment = document.createDocumentFragment();
const navList = document.getElementById('navbar__list');
const togglers = document.getElementsByClassName("toggler");

/*
*function build navigation menu dynamiclly.
*/
const buildNavigation = (() => {
    sections.forEach(section => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a class="menu__link" name="${section.getAttribute('id')}">
            ${section.getAttribute('data-nav')}</a>`;
        itemsFragment.appendChild(listItem)
    })
    navList.appendChild(itemsFragment)
})()

/*
* function navigat to section when click on nav link
*/
function navigatToSection(e){
    if(e.target.nodeName === 'A') {
        e.preventDefault();
        document.getElementById(`${e.target.getAttribute('name')}`)
        .scrollIntoView({behavior: "smooth"});
    }
}

/*
* Add active style to section when scroll or click on nav link
*/
function activateSection(e){
    sections.forEach(section => {//loop over sections
        if(section.getBoundingClientRect().top < (window.innerHeight /3)*2
            && section.getBoundingClientRect().bottom > (window.innerHeight /3))
                section.classList.add('your-active-class')
        else section.classList.remove('your-active-class')
    })
    if(window.scrollY > 600) 
        document.getElementById('up').style.display = 'block';
    else document.getElementById('up').style.display = 'none';
}

/**
 * 
 * back to top function 
 */
function backToTop(e){
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });    
}

/**
 * 
 * highlight nav link when clicked
 */
function highLight(e){
    const links = document.querySelectorAll('a.menu__link');
    links.forEach(link => {
        if(link === e.target) link.classList.add('active__link')
        else link.classList.remove('active__link')
    })
    
}

/*
*Event listeners for nav links, csroll to top botton, and document scrolling
*/
document.getElementById('navbar__list').addEventListener('click', e => {
    navigatToSection(e);
    activateSection(e);
    highLight(e)
})

/*
* document scroll event
*/
document.addEventListener('scroll', activateSection)

//button click event to back to top
document.getElementById('up').addEventListener('click', backToTop)

//dropdown with bars
document.getElementById('bars').addEventListener('click', e => {
    const list = document.querySelector('#navbar__list');
    if (list.style.maxHeight) {
        document.getElementById('bars').style.borderColor = 'transparent'
        list.style.maxHeight = null; 
    } else {
        document.getElementById('bars').style.borderColor = '#04133f'
        list.style.maxHeight = list.scrollHeight + "px"; 
    } 
})

/*
* collaps section function
*/

for (let i = 0; i < togglers.length; i++) {
    togglers[i].addEventListener("click", openClose);
}

function openClose(e) {
    const content = this.nextElementSibling;
    if (content.style.display === 'block'){
        content.style.display = 'none';
        this.classList.add("close_oppen"); 
    } else {
        content.style.display = 'block';
        this.classList.remove("close_oppen"); 
    }  
} 

