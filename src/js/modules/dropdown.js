let dropdowns
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

  if (dropdownsMedia.matches) {
    desktop = false
    mobile = true
  } else {
    mobile = false
    desktop = true
  }

  dropdownsMedia.onchange = e => {
    dropdowns.forEach(dropdown => {
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
  dropdowns = document.querySelectorAll('[data-dropdown]')
  if (dropdowns.length === 0) {
    console.error(
      '%c Dropdown element is not set. Use' +
        '%c data-dropdown' +
        '%c attribute for hover-dropdown or' +
        '%c data-dropdown="click"' +
        '%c for click-dropdown',
      'color: red;',
      'color: white;',
      'color: red;',
      'color: white;',
      'color: red;'
    )
    return
  }

  dropdowns.forEach(dropdown => {
    const dropdownButton = dropdown.querySelector('button')
    if (!dropdownButton) {
      console.error('%c Dropdown button is not set.')
      return
    }

    const dropdownContent = dropdownButton.nextElementSibling // content after button

    dropdownButton.setAttribute('aria-expanded', 'false')
    dropdownContent.setAttribute('aria-hidden', 'true')
    dropdownContent.setAttribute('aria-label', 'submenu')
    dropdownContent.style.maxHeight = null

    close()

    dropdownButton.addEventListener('click', toggle)

    if (desktop) {
      if (!dropdown.dataset.dropdown) {
        dropdown.addEventListener('mouseenter', open)
        dropdown.addEventListener('mouseleave', close)
      }
    }

    /* ====================   FUNCTIONS  ==================== */

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
      dropdownContent.setAttribute('aria-hidden', 'false')

      if (mobile) {
        let dropdownContentHeight = dropdownContent.scrollHeight
        dropdownContent.style.maxHeight = `${dropdownContentHeight}px`
      }
    }

    function close() {
      document.removeEventListener('keydown', closeWithEsc)
      dropdown.classList.remove('active')
      dropdownButton.setAttribute('aria-expanded', 'false')
      dropdownContent.setAttribute('aria-hidden', 'true')

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
      if (e.key === 'Escape' || e.key === 'Esc' || e.code === 27) {
        close()
        if (dropdown.contains(document.activeElement)) dropdownButton.focus()
      }
    }
  })
}
