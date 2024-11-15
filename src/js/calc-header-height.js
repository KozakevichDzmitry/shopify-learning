export default function getHeaderHeight(selector){
    let header
    if(!selector) {
        return 0
    } else if(typeof selector === 'string') {
        header = document.querySelector(selector)
    }else {
        header = selector
    }

    return  header ? parseFloat(header.getBoundingClientRect().height) +  parseFloat(header.getBoundingClientRect().y): 0;
}



