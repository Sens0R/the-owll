/*
1. Select container element with data-dropdown attribute. Default behavior (no value) - click. Add "hover" value to make dropdown that activates on click.
2. Container element must have button element inside. This button opens dropdown. 
3. Select container element that holds dropdown content with data-dropdown-content. 

EXAMPLE: 
<div data-dropdown="hover">
  <button type="button"></button>  
  <div data-dropdown-content>
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
    const activeDropdownContent = activeDropdownEl.querySelector('[data-dropdown-content]')
    activeDropdownContent.style.maxHeight = activeDropdownContent.scrollHeight + 'px'
  })
}

export function dropdown() {
  dropdownsArr.forEach(dropdownEl => {
    const dropdownButton = dropdownEl.querySelector('button')
    const dropdownContent = dropdownEl.querySelector('[data-dropdown-content]')
    dropdownButton.setAttribute('aria-expanded', 'false')
    dropdownContent.style.maxHeight = 0
    const dropdownContentLinksArr = dropdownContent.querySelectorAll('a[href]')

    if (dropdownEl.dataset.dropdown === 'hover' && !mobileDevice) {
      dropdownEl.addEventListener('mouseenter', toggle)
      dropdownEl.addEventListener('mouseleave', close)
    }

    dropdownContentLinksArr.forEach((dropdownContentLink, i) => {
      dropdownContentLink.addEventListener('keydown', e => {
        if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
          const nextLink = dropdownContentLinksArr[i + 1]
          e.preventDefault()
          if (nextLink) nextLink.focus()
        }

        if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') {
          const prevLink = dropdownContentLinksArr[i - 1]
          e.preventDefault()
          if (prevLink) prevLink.focus()
        }
      })
    })

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
      dropdownButton.addEventListener('keydown', selectFirstLink)
    }

    function close() {
      dropdownContent.style.maxHeight = 0
      document.removeEventListener('keydown', closeWithEsc)
      dropdownEl.classList.remove('active')
      dropdownButton.setAttribute('aria-expanded', 'false')
      document.removeEventListener('click', clickOutside)
      resetBoundingBox()
      dropdownButton.removeEventListener('keydown', selectFirstLink)
    }

    function selectFirstLink(e) {
      if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
        e.preventDefault()
        dropdownContentLinksArr[0].focus()
      }
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
