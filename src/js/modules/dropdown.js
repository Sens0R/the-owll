/*
1. Select container element with data-dropdown attribute. Default behavior (no value) - click. Add "hover" value to make dropdown that activates on click.
2. Container element must have button element inside. 
3. Container element must have content container after button. 

EXAMPLE: 
<div data-dropdown="hover">
  <button type="button"></button>  
  <div>
    <a href="#"></a>
    <a href="#"></a>
  </div>
</div>
*/

let mobileDevice
if (window.matchMedia('(pointer: coarse)').matches) mobileDevice = true

const dropdownsArr = document.querySelectorAll('[data-dropdown]')

window.matchMedia('(orientation: landscape)').onchange = () => {
  const activeDropdownsArr = document.querySelectorAll('[data-dropdown].active')
  activeDropdownsArr.forEach(activeDropdownEl => {
    const activeDropdownButton = activeDropdownEl.querySelector('button')
    const activeDropdownContent = activeDropdownButton.nextElementSibling
    activeDropdownContent.style.maxHeight = activeDropdownContent.scrollHeight + 'px'
  })
}

export function dropdown() {
  dropdownsArr.forEach(dropdownEl => {
    const dropdownButton = dropdownEl.querySelector('button')
    const dropdownContent = dropdownButton.nextElementSibling
    dropdownButton.setAttribute('aria-expanded', 'false')
    dropdownContent.style.maxHeight = 0

    if (dropdownEl.dataset.dropdown === 'hover' && !mobileDevice) {
      dropdownEl.addEventListener('mouseenter', toggle)
      dropdownEl.addEventListener('mouseleave', close)
    }

    dropdownButton.addEventListener('click', toggle)

    function toggle() {
      if (dropdownEl.classList.contains('active')) return close()
      dropdownContent.style.maxHeight = dropdownContent.scrollHeight + 'px'
      dropdownEl.classList.add('active')
      document.addEventListener('keydown', closeWithEsc)
      dropdownButton.setAttribute('aria-expanded', 'true')
      checkBoundingBox()
      setTimeout(() => {
        document.addEventListener('click', clickOutside)
      }, 1)
    }

    function close() {
      dropdownContent.style.maxHeight = 0
      document.removeEventListener('keydown', closeWithEsc)
      dropdownEl.classList.remove('active')
      dropdownButton.setAttribute('aria-expanded', 'false')
      document.removeEventListener('click', clickOutside)
      resetBoundingBox()
    }

    function clickOutside(e) {
      if (!dropdownContent.contains(e.target)) close()
    }

    function closeWithEsc(e) {
      if (e.code === 'Escape') close()
    }

    function checkBoundingBox() {
      let bounds = dropdownContent.getBoundingClientRect()

      if (bounds.right > window.innerWidth) {
        dropdownContent.style.right = '0'
        dropdownContent.style.left = 'inherit'
        dropdownContent.style.translate = '0'
      }

      if (bounds.left < 0) {
        dropdownContent.style.right = 'inherit'
        dropdownContent.style.left = '0'
        dropdownContent.style.translate = '0'
      }
    }

    function resetBoundingBox() {
      dropdownContent.style.right = null
      dropdownContent.style.left = null
      dropdownContent.style.translate = null
    }
  })
}
