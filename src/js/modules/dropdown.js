/*
1. Select container element with data-dropdown attribute. Default behavior (no value) - hover. Add "click" value to make dropdown that activates on click.
2. Container element must have button element inside. 
3. Container element must have content container after button. 


EXAMPLE: 
<a href="tel:1800843695" data-tooltip="top-right" aria-label="Make a phone call">1800843695</a>
*/

const dropdownsArr = document.querySelectorAll('[data-dropdown]')

export function dropdown() {
  dropdownsArr.forEach(dropdown => {
    const dropdownButton = dropdown.querySelector('button')
    const dropdownContent = dropdownButton.nextElementSibling
    dropdownButton.setAttribute('aria-expanded', 'false')
    //dropdownButton.addEventListener('click', toggle)

    if (dropdown.dataset.dropdown === 'hover') {
      dropdown.addEventListener('mouseenter', toggle)
      dropdown.addEventListener('mouseleave', close)
    }

    /* ====================   functions   ==================== */

    function toggle() {
      if (dropdown.classList.contains('active')) return close()
      dropdown.classList.add('active')
      document.addEventListener('keydown', closeWithEsc)
      dropdownButton.setAttribute('aria-expanded', 'true')
      setTimeout(() => {
        document.addEventListener('click', clickOutside)
      }, 1)
    }

    function close() {
      document.removeEventListener('keydown', closeWithEsc)
      dropdown.classList.remove('active')
      dropdownButton.setAttribute('aria-expanded', 'false')
      document.removeEventListener('click', clickOutside)
    }

    function clickOutside(e) {
      if (!dropdownContent.contains(e.target)) close()
    }

    function closeWithEsc(e) {
      if (e.code === 'Escape') close()
    }
  })
}
/* 
let desktop
let mobile

window.matchMedia('(orientation: landscape)').onchange = () => {
  const openContents = document.querySelectorAll('[data-dropdown] > [aria-hidden="false"]')

  openContents.forEach(openContent => {
    openContent.style.maxHeight = `${openContent.scrollHeight}px`
  })
}

export function dropdown(breakpoint = 1200) {
  const dropdownsMedia = window.matchMedia(`(max-width: ${breakpoint}px)`)
  console.log(dropdownsMedia)

  if (dropdownsMedia.matches) {
    desktop = false
    mobile = true
  } else {
    mobile = false
    desktop = true
  }

  dropdownsMedia.onchange = e => {
    dropdownsArr.forEach(dropdown => {
      dropdown.replaceWith(dropdown.cloneNode(true))
    })

    if (e.matches) {
      desktop = false
      mobile = true
    } else {
      mobile = false
      desktop = true
    }

    renderDropdowns()
  }

  renderDropdowns()
}

function renderDropdowns() {
  dropdownsArr.forEach(dropdown => {
    const dropdownButton = dropdown.querySelector('button')
    const dropdownContent = dropdownButton.nextElementSibling 

    dropdownButton.setAttribute('aria-expanded', 'false')
    dropdownContent.style.maxHeight = null

    close()

    dropdownButton.addEventListener('click', toggle)

    if (desktop) {
      if (!dropdown.dataset.dropdown) {
        dropdown.addEventListener('mouseenter', open)
        dropdown.addEventListener('mouseleave', close)
      }
    }


    function toggle() {
      if (dropdown.classList.contains('active')) return close()
      open()
      setTimeout(() => {
        document.addEventListener('click', clickOutside)
      }, 1)
    }

    function open() {
      if (desktop) {
        document.querySelectorAll('[data-dropdown]').forEach(activeDropdown => {
          activeDropdown.classList.remove('active')
          document.removeEventListener('click', clickOutside)
        })
      }

      dropdown.classList.add('active')
      document.addEventListener('keydown', closeWithEsc)

      dropdownButton.setAttribute('aria-expanded', 'true')
      

      if (mobile) {
        let dropdownContentHeight = dropdownContent.scrollHeight
        dropdownContent.style.maxHeight = `${dropdownContentHeight}px`
      }
    }

    function close() {
      document.removeEventListener('keydown', closeWithEsc)
      dropdown.classList.remove('active')
      dropdownButton.setAttribute('aria-expanded', 'false')
      

      if (mobile) dropdownContent.style.maxHeight = null
    }

    function clickOutside(e) {
      if (desktop) {
        if (e.target.closest('[aria-label="submenu"][aria-hidden="false"]')) return
        close()
        document.removeEventListener('click', clickOutside)
      }
    }

    function closeWithEsc(e) {
      if (e.code === 'Escape') {
        close()
        if (dropdown.contains(document.activeElement)) dropdownButton.focus()
      }
    }
  })
} */
