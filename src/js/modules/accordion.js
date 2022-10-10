const accordionsArr = document.querySelectorAll('[data-accordion]')

window.matchMedia('(orientation: landscape)').onchange = () => {
  const activeButtons = document.querySelectorAll('[data-accordion] * button[aria-expanded="true"]')

  activeButtons.forEach(activeButton => {
    const expandedContent = activeButton.parentNode.nextElementSibling
    expandedContent.style.maxHeight = `${expandedContent.scrollHeight}px`
  })
}

export function accordion() {
  accordionsArr.forEach(accordion => {
    const buttonsArr = accordion.querySelectorAll('[data-accordion-button]')
    const contentsArr = accordion.querySelectorAll('[data-accordion-content]')
    const accordionAttrValue = accordion.dataset.accordion

    buttonsArr.forEach((button, btnNum) => {
      button.id = `accordion-${accordionAttrValue}-header-${btnNum + 1}`
      button.setAttribute('aria-controls', `accordion-${accordionAttrValue}-panel-${btnNum + 1}`)
      button.setAttribute('aria-expanded', 'false')
      button.addEventListener('click', accordionToggler)

      const content = contentsArr[btnNum]
      content.id = `accordion-${accordionAttrValue}-panel-${btnNum + 1}`
      content.setAttribute('aria-labelledby', `${button.id}`)

      function accordionToggler() {
        if (button.classList.contains('active')) {
          button.classList.remove('active')
          content.classList.remove('active')
          button.setAttribute('aria-expanded', 'false')
          content.style.maxHeight = null
          return
        }

        button.classList.add('active')
        content.classList.add('active')
        button.setAttribute('aria-expanded', 'true')
        content.style.maxHeight = `${content.scrollHeight}px`
      }
    })
  })
}
