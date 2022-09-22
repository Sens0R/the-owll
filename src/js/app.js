import './modules/swiper.js'
import 'particles.js'
import { notification } from './modules/notification.js'
import { fixedHeader, headroomHeader } from './modules/headers.js'
import { accordion } from './modules/accordion.js'
import { activePageHighlight } from './modules/active-page-highlight.js'
import { dropdown } from './modules/dropdown.js'
import { hamburger } from './modules/hamburger.js'
import { animateOnScroll } from './modules/animate-on-scroll.js'
import { search } from './modules/search.js'
import { md, lg, sm } from './modules/breakpoints.js'

particlesJS('banner__particles', {
  particles: {
    number: {
      value: 8,
      density: {
        enable: true,
        value_area: 400
      }
    },
    color: {
      value: '#348ACC'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#348ACC'
      },
      polygon: {
        nb_sides: 5
      },
      image: {
        src: '',
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 1,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 250,
      color: '#348ACC',
      opacity: 1,
      width: 1
    },
    move: {
      enable: true,
      speed: 3,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'bounce',
      bounce: false,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: false,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 300,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 300,
        size: 9,
        duration: 10,
        opacity: 1,
        speed: 1
      },
      repulse: {
        distance: 400,
        duration: 0.1
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
})

activePageHighlight()
animateOnScroll()

fixedHeader(lg)

hamburger({
  notification: '[data-notification] button'
})

dropdown()
