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

particlesJS(
  'banner__particles',

  {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 300
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
        value: 3,
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
        distance: 150,
        color: '#348ACC',
        opacity: 0.75,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'bounce',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 800,
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
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: 350,
          duration: 0.4
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
  }
)

activePageHighlight()
animateOnScroll()

fixedHeader(lg)

hamburger({
  notification: '[data-notification] button'
})

dropdown()
