/* ====================   REFRESH SITE ON TOP   ==================== */

export function refreshSiteOnTOp() {
  history.scrollRestoration = 'manual';
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}


