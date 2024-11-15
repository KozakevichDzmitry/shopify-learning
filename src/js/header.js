import '../styles/header.scss'
import getHeaderHeight from "./calc-header-height";
const header = document.querySelector('.heading');

class BurgerButton extends HTMLButtonElement {
    constructor() {
        super();
    }
    connectedCallback(){
        this.addEventListener('click', () => header.classList.toggle('menu--open'));
    }
}
customElements.define('burger-button', BurgerButton, {extends: 'button'});
class MenuOverlay extends HTMLDivElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.addEventListener('click', () => {
            header.classList.remove('menu--open')
        });
    }
}
customElements.define('menu-overlay', MenuOverlay,{extends: 'div'} );

class HeaderScrolling extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback(){
        document.addEventListener('DOMContentLoaded', () => {
            const firstSection = document.querySelector('main > section');
            console.log(firstSection)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        console.log('Sticky header проскролил первую секцию');
                        header.classList.add('scrolled-through-first');
                    } else {
                        console.log('Sticky header виден над первой секцией');
                        header.classList.remove('scrolled-through-first');
                    }
                });
            }, {
                rootMargin: `-${header.offsetHeight}px 0px 0px 0px`,
                threshold: 0
            });

            if (firstSection) {
                observer.observe(firstSection);
            }
        });
    }
}
customElements.define('header-scrolling', HeaderScrolling, {extends: 'header'});

document.addEventListener('DOMContentLoaded', setPropertyHeaderHeight)
window.addEventListener('resize', setPropertyHeaderHeight)
header.addEventListener('transitionend',setPropertyHeaderHeight)


function setPropertyHeaderHeight() {
    const headerHeight = getHeaderHeight(header)
    if (headerHeight > 0) document.documentElement.style.setProperty('--headerHeight', `${headerHeight}px`)
}