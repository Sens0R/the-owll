const defaultOptions = {
  mainElement: '[data-hamburger]',
  togglerOpen: '[data-hamburger-btn="open"]',
  togglerClose: '[data-hamburger-btn="close"]',
  hamburgerId: 'navigation',
  breakpoint: 1200,
}

/*  ---------------------- RUN  -------------------------- */

export function hamburger(userOptions) {
  let options = defaultOptions
  let mainElement

  userOptions && 'mainElement' in userOptions
    ? (mainElement = document.querySelector(userOptions.mainElement))
    : (mainElement = document.querySelector(defaultOptions.mainElement))

  if (userOptions) options = { ...defaultOptions, ...userOptions }
  // destructor
  let { togglerOpen, togglerClose, hamburgerId, breakpoint } = options

  mainElement.id = hamburgerId
  mainElement.after(document.createElement('div'))
  const backdrop = document.querySelector('.backdrop')
  backdrop.classList.add('backdrop')

  togglerOpen = document.querySelector(togglerOpen)
  togglerClose = document.querySelector(togglerClose)

  //toggler.setAttribute('aria-expanded', 'false')
  //toggler.setAttribute('aria-hasPopup', 'true')
  //toggler.setAttribute('aria-label', `Toggle ${hamburgerId}`)
  //toggler.setAttribute('aria-controls', hamburgerId)

  /* const firstFocusableEl = mainElement.querySelector(
    'button, [href]:not(use), input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) */

  //let contentHasTransition = getComputedStyle(mainElement).getPropertyValue('transition-duration')
  //if (contentHasTransition === '0s') contentHasTransition = false

  mainElement.classList.add('stop-transition')

  togglerOpen.addEventListener('click', open)
  togglerClose.addEventListener('click', close)
  backdrop.addEventListener('click', close)
  //toggler.addEventListener('keydown', keyboardNavigation)

  // media
  if (breakpoint) {
    const watchBreakpoint = window.matchMedia(`(max-width: ${breakpoint}px)`)
    watchBreakpoint.onchange = e => {
      if (mainElement.classList.contains('active') && !e.matches) {
        mainElement.classList.add('stop-transition')
        // block backdrop transition
        close()
      }
    }
  }

  /* ====================   FUNCTIONS   ==================== */

  function open() {
    mainElement.classList.add('active')
    mainElement.setAttribute('aria-modal', 'true')
    mainElement.setAttribute('role', 'dialog')
    //toggler.setAttribute('aria-expanded', 'true')
    document.body.style.overflow = 'hidden'
    //document.addEventListener('keydown', closeWithEsc)

    mainElement.classList.remove('stop-transition')

    //addBackdrop(backdrop)
    //backdrop.addEventListener('click', close)

    backdrop.classList.add('active')
  }

  function close() {
    mainElement.classList.remove('active')
    mainElement.removeAttribute('aria-modal')
    mainElement.removeAttribute('role')
    //toggler.classList.remove('active')
    //toggler.setAttribute('aria-expanded', 'false')
    backdrop.classList.remove('active')
    document.body.style.overflow = null
    //document.removeEventListener('keyup', closeWithEsc)
    //removeBackdrop()
    mainElement.addEventListener('transitionend', () => mainElement.classList.add('stop-transition'), { once: true })
  }

  function keyboardNavigation() {
    mainElement.addEventListener('transitionend', () => firstFocusableEl.focus(), {
      once: true,
    })

    mainElement.addEventListener('focusout', focusOut)
  }

  function focusOut() {
    setTimeout(() => {
      if (!mainElement.contains(document.activeElement)) {
        mainElement.removeEventListener('focusout', focusOut)
        close()
        toggler.focus()
      }
    }, 25)
  }

  function closeWithEsc(e) {
    if (e.key === 'Escape' || e.key === 'Esc' || e.code === 27) {
      close()
    }
  }
}
