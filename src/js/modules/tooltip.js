export function tooltip() {
  const tooltips = document.querySelectorAll('[data-tooltip]')
  tooltips.forEach(tooltipInstance => {
    let tooltipEl

    createTooltip()
    if (!tooltipInstance.getAttribute('data-tooltip')) tooltipInstance.setAttribute('data-tooltip', 'bottom')

    tooltipInstance.addEventListener('mouseenter', () => {
      checkBoundingBox()
      tooltipEl.classList.add('active')
    })

    tooltipInstance.addEventListener('mouseleave', () => {
      tooltipEl.classList.remove('active')
    })

    tooltipInstance.addEventListener('focus', () => {
      tooltipEl.classList.add('active')
      document.addEventListener('keydown', closeWithEsc)
      checkBoundingBox()
    })

    tooltipInstance.addEventListener('blur', () => {
      tooltipEl.classList.remove('active')
      document.removeEventListener('keydown', closeWithEsc)
    })

    /* ====================   FUNCTIONS   ==================== */

    function createTooltip() {
      tooltipInstance.style.position = 'relative'
      const createTooltipEl = document.createElement('span')
      createTooltipEl.classList.add('tooltip')
      tooltipInstance.prepend(createTooltipEl)
      tooltipEl = tooltipInstance.firstElementChild
      const tooltipElAttr = tooltipInstance.getAttribute('aria-label')
      tooltipEl.textContent = tooltipElAttr
    }

    function closeWithEsc(e) {
      if (e.key === 'Escape' || e.key === 'Esc' || e.code === 27) tooltipEl.classList.remove('active')
    }

    function checkBoundingBox() {
      let bounds = tooltipEl.getBoundingClientRect()
      const tooltipDirection = tooltipInstance.getAttribute('data-tooltip')

      // bottom > top
      if (bounds.bottom > window.innerHeight) {
        tooltipInstance.setAttribute('data-tooltip', 'top')
        if (bounds.left < 0) tooltipInstance.setAttribute('data-tooltip', 'top-left')
        if (bounds.right > window.innerWidth) tooltipInstance.setAttribute('data-tooltip', 'top-right')
        return
      }

      // top > bottom
      if (bounds.top < 0) {
        tooltipInstance.setAttribute('data-tooltip', 'bottom')
        if (bounds.left < 0) tooltipInstance.setAttribute('data-tooltip', 'bottom-left')
        if (bounds.right > window.innerWidth) tooltipInstance.setAttribute('data-tooltip', 'bottom-right')
        return
      }

      // right > left
      if (bounds.right > window.innerWidth) {
        if (tooltipDirection === 'top') tooltipInstance.setAttribute('data-tooltip', 'top-right')
        if (tooltipDirection === 'right') tooltipInstance.setAttribute('data-tooltip', 'left')
        if (tooltipDirection === 'bottom') tooltipInstance.setAttribute('data-tooltip', 'bottom-right')
        return
      }

      // left > right
      if (bounds.left < 0) {
        if (tooltipDirection === 'top') tooltipInstance.setAttribute('data-tooltip', 'top-left')
        if (tooltipDirection === 'left') tooltipInstance.setAttribute('data-tooltip', 'right')
        if (tooltipDirection === 'bottom') tooltipInstance.setAttribute('data-tooltip', 'bottom-left')
      }
    }
  })
}
