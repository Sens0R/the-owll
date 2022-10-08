/*  
1. Select tab container element (tabbed interface) with data-tabs attribute.
2. Select element that holds tabs (tablist) by adding role="tablist" attribute. Tabs in tablist element should have html button tag.
3. Select elements that contain the corresponding content (tabpanel) by adding role="tabpanel" attribute.
4. Activate one tab and corresponding content (tabpanel) to that tab by adding active class.
5. If you have multiple tab containers (tabbed interfaces) add value to data-tabs attribute. Example: data-tabs="two", data-tabs="secondary". Value is used for tab and corresponding tablist ID's. 

OPTIONAL A11Y IMPROVEMENTS:
1. Add data-tabs-manual attribute to tab container element (tabbed interface) if you need manual tab selection (activating tab with enter or space key). Default behavior: tab is automatically selected when receives focus.
2. Add aria-orientation="vertical" attribute to tab container element (tabbed interface) if you have vertically ordered tabs in tablist. This will change tab keyboard selection to ArrowUp and ArrowDown. Default behavior: ArrowLeft and ArrowRight. 

EXAMPLE: 
<div data-tabs>
  <div role="tablist">
    <button class="active"></button>
    <button></button>
  </div>
  <div role="tabpanel" class="active"></div>
  <div role="tabpanel"></div>
</div> 
*/

const defaultOptions = {
  mainElement: '[data-hamburger]',
  togglerOpen: '[data-hamburger-btn="open"]',
  togglerClose: '[data-hamburger-btn="close"]',
  aria: 'navigation',
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
  let { togglerOpen, togglerClose, aria, breakpoint } = options

  const createBackdrop = document.createElement('div')
  createBackdrop.classList.add('backdrop')
  mainElement.after(createBackdrop)
  const backdrop = document.querySelector('.backdrop')

  togglerOpen = document.querySelector(togglerOpen)
  togglerClose = document.querySelector(togglerClose)

  if (aria) {
    mainElement.id = aria
    togglerOpen.setAttribute('aria-label', `Open ${aria}`)
    togglerOpen.setAttribute('aria-controls', aria)
    togglerOpen.setAttribute('aria-haspopup', 'dialog')
    togglerClose.setAttribute('aria-label', `Close ${aria}`)
  }

  const focusableElements = Array.from(
    mainElement.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
  )

  const firstFocusableElement = focusableElements.at(0)
  const lastFocusableElement = focusableElements.at(-1)

  mainElement.classList.add('stop-transition')
  togglerOpen.addEventListener('click', open)
  togglerClose.addEventListener('click', close)
  backdrop.addEventListener('click', close)
  togglerOpen.addEventListener('keydown', focusTrap)

  // media
  if (breakpoint) {
    const watchBreakpoint = window.matchMedia(`(max-width: ${breakpoint}px)`)
    watchBreakpoint.onchange = e => {
      if (mainElement.classList.contains('active') && !e.matches) {
        mainElement.classList.add('stop-transition')
        backdrop.remove()
        close()
        return
      }

      mainElement.after(createBackdrop)
    }
  }

  /* ====================   FUNCTIONS   ==================== */

  function open() {
    document.addEventListener('keydown', closeWithEsc)
    document.body.style.overflow = 'hidden'
    mainElement.classList.add('active')
    mainElement.setAttribute('aria-modal', 'true')
    mainElement.setAttribute('role', 'dialog')
    mainElement.classList.remove('stop-transition')
    backdrop.classList.add('active')
  }

  function close() {
    document.removeEventListener('keydown', closeWithEsc)
    document.body.style.overflow = null
    mainElement.classList.remove('active')
    mainElement.removeAttribute('aria-modal')
    mainElement.removeAttribute('role')
    mainElement.addEventListener('transitionend', () => mainElement.classList.add('stop-transition'), { once: true })
    backdrop.classList.remove('active')
  }

  function focusTrap() {
    mainElement.addEventListener('transitionend', () => firstFocusableElement.focus(), {
      once: true,
    })

    mainElement.addEventListener('keydown', e => {
      if (e.code === 9) {
        if (e.shiftKey && document.activeElement === firstFocusableElement) {
          e.preventDefault()
          lastFocusableElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
          e.preventDefault()
          firstFocusableElement.focus()
        }
      }
    })
  }

  function closeWithEsc(e) {
    if (e.code === 'Escape') {
      close()
      if (mainElement.contains(document.activeElement)) togglerOpen.focus()
    }
  }
}
