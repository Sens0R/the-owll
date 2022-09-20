import './modules/swiper.js';
import { notification } from './modules/notification.js';
import { fixedHeader, headroomHeader } from './modules/headers.js';
import { accordion } from './modules/accordion.js';
import { activePageHighlight } from './modules/active-page-highlight.js';
import { dropdown } from './modules/dropdown.js';
import { hamburger } from './modules/hamburger.js';
import { animateOnScroll } from './modules/animate-on-scroll.js';
import { search } from './modules/search.js';
import { md, lg, sm } from './modules/breakpoints.js';

activePageHighlight();
animateOnScroll();

fixedHeader(lg);


hamburger({
  notification: '[data-notification] button',
});

dropdown();



 