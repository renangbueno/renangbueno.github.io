const secoes = [...document.querySelectorAll("section")];
const getLinkById = (id) => document.querySelector(`a[href='#${id}']`);

const inView = (section) => {
    let top = section.offsetTop;
    let height = section.offsetHeight;
  
    while (section.offsetParent) {
      section = section.offsetParent;
      top += section.offsetTop;
    }
  
    return (
      top < window.scrollY + window.innerHeight &&
      top + height/1.2 > window.scrollY
    );
  };
  
  window.onscroll = () => {
    let next = false;
  
    secoes.forEach((secoes) => {
      const a = getLinkById(secoes.id);
  
      if (inView(secoes) && !next) {
        a.classList.add("barra_navegacao--current");
        next = true;
      } else {
        a.classList.remove("barra_navegacao--current");
      }
    });
  };

