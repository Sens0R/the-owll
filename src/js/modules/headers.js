import Headroom from 'headroom.js'

/* function headroomCreate() {
  header.classList.add('slide-down')
  headroom = new Headroom(header, {
    classes: {
      initial: 'headroom',
      pinned: 'slide-down',
      unpinned: 'slide-up',
      top: 'top',
      notTop: 'not-top',
      bottom: 'bottom',
      notBottom: 'not-bottom',
    },
  })
  headroom.init()
} */

export function fixedHeader() {
  const header = document.querySelector('header')

  document.addEventListener('scroll', () => {
    if (scrollY === 0) return header.classList.remove('header-top')

    header.classList.add('header-top')
  })
}
