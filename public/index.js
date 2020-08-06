Array.from(document.querySelectorAll('.info .title')).forEach(el => {
  el.style.width = `${document.querySelector('.info').clientWidth}px`
})