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

const JSparticleEl = document.getElementById('banner__particles')
particlesJS(
  'banner__particles',

  {
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
        value: 8,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          size_min: 0.25,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 300,
        color: '#348ACC',
        opacity: 1,
        width: 0
      },
      move: {
        enable: true,
        speed: 2,
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

        resize: true
      },
      modes: {
        repulse: {
          distance: 250,
          duration: 0.4
        }
      }
    },
    retina_detect: true
  }
)

const obsParticles = new IntersectionObserver(entries =>
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      pJSDom[0].pJS.fn.vendors.start()
    }

    if (!entry.isIntersecting) {
      cancelRequestAnimFrame(pJSDom[0].pJS.fn.checkAnimFrame)
      cancelRequestAnimFrame(pJSDom[0].pJS.fn.drawAnimFrame)
      pJSDom[0].pJS.fn.particlesEmpty()
      pJSDom[0].pJS.fn.canvasClear()
    }
  })
)

obsParticles.observe(JSparticleEl)

activePageHighlight()
animateOnScroll()

fixedHeader(lg)

hamburger({
  notification: '[data-notification] button'
})

dropdown()
