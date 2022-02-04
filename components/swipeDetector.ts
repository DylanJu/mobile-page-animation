// patch CustomEvent to allow constructor creation (IE/Chrome)
// if (typeof window.CustomEvent !== 'function') {
//   window.CustomEvent = function (event, params) {
//     params = params || { bubbles: false, cancelable: false, detail: undefined };

//     let evt = document.createEvent('CustomEvent');
//     evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
//     return evt;
//   };

//   window.CustomEvent.prototype = window.Event.prototype;
// }

let xDown: number = 0;
let yDown: number = 0;
let xDiff: number = 0;
let yDiff: number = 0;
let timeDown: number = 0;
let startEl: Element | null = null;

/**
 * Fires swiped event if swipe detected on touchend
 * @param {object} e - browser event object
 * @returns {void}
 */
export function handleTouchEnd(e: TouchEvent) {
  // if the user released on a different target, cancel!
  if (startEl !== e.target) return;

  const swipeThreshold = parseInt(getNearestAttribute(startEl, 'data-swipe-threshold', '20'), 10); // default 20px
  const swipeTimeout = parseInt(getNearestAttribute(startEl, 'data-swipe-timeout', '500'), 10); // default 500ms
  const timeDiff = Date.now() - timeDown;
  const changedTouches = e.changedTouches || e.touches || [];
  let eventType = '';

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    // most significant
    if (Math.abs(xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
      if (xDiff > 0) {
        eventType = 'swiped-left';
      } else {
        eventType = 'swiped-right';
      }
    }
  } else if (Math.abs(yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
    if (yDiff > 0) {
      eventType = 'swiped-up';
    } else {
      eventType = 'swiped-down';
    }
  }

  if (eventType !== '') {
    const eventData: {
      dir: string;
      touchType: string;
      xStart: number;
      xEnd: number;
      yStart: number;
      yEnd: number;
    } = {
      dir: eventType.replace(/swiped-/, ''),
      touchType: ((changedTouches[0] || {}) as any).touchType || 'direct',
      xStart: parseInt(xDown.toString(), 10),
      xEnd: parseInt((changedTouches[0] || {}).clientX.toString() || '-1', 10),
      yStart: parseInt(yDown.toString(), 10),
      yEnd: parseInt((changedTouches[0] || {}).clientY.toString() || '-1', 10),
    };

    // fire `swiped` event event on the element that started the swipe
    startEl!.dispatchEvent(new CustomEvent('swiped', { bubbles: true, cancelable: true, detail: eventData }));

    // fire `swiped-dir` event on the element that started the swipe
    startEl!.dispatchEvent(new CustomEvent(eventType, { bubbles: true, cancelable: true, detail: eventData }));
  }

  // reset values
  xDown = 0;
  yDown = 0;
  timeDown = 0;
}

/**
 * Records current location on touchstart event
 * @param {object} e - browser event object
 * @returns {void}
 */
export function handleTouchStart(e: any) {
  // if the element has data-swipe-ignore="true" we stop listening for swipe events
  if (e.target.getAttribute('data-swipe-ignore') === 'true') return;

  startEl = e.target;

  timeDown = Date.now();
  xDown = e.touches[0].clientX;
  yDown = e.touches[0].clientY;
  xDiff = 0;
  yDiff = 0;
}

/**
 * Records location diff in px on touchmove event
 * @param {object} e - browser event object
 * @returns {void}
 */
export function handleTouchMove(e: TouchEvent) {
  if (!xDown || !yDown) return;

  const xUp = e.touches[0].clientX;
  const yUp = e.touches[0].clientY;

  xDiff = xDown - xUp;
  yDiff = yDown - yUp;
}

/**
 * Gets attribute off HTML element or nearest parent
 * @param {object} el - HTML element to retrieve attribute from
 * @param {string} attributeName - name of the attribute
 * @param {any} defaultValue - default value to return if no match found
 * @returns {any} attribute value or defaultValue
 */
function getNearestAttribute(el: any, attributeName: any, defaultValue: any) {
  // walk up the dom tree looking for attributeName
  while (el && el !== document.documentElement) {
    const attributeValue = el.getAttribute(attributeName);

    if (attributeValue) {
      return attributeValue;
    }
    // eslint-disable-next-line no-param-reassign
    el = el.parentNode;
  }

  return defaultValue;
}
