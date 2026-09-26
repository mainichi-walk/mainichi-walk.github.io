(() => {
  "use strict";

  const STORAGE_KEY = "mainichiWalkAnalyticsDisabled";
  const TOKEN = "804c4762321e4286bf5fa280c9795864";
  const params = new URLSearchParams(window.location.search);
  const requestedMode = params.get("analytics");
  const disabledForThisPage = requestedMode === "off";
  let disabled = false;

  try {
    if (requestedMode === "off") {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } else if (requestedMode === "on") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    disabled = window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch (_) {
    disabled = disabledForThisPage;
  }

  if (requestedMode === "off" || requestedMode === "on") {
    params.delete("analytics");
    const query = params.toString();
    const cleanUrl =
      window.location.pathname +
      (query ? "?" + query : "") +
      window.location.hash;
    window.history.replaceState(null, "", cleanUrl);
  }

  if (disabled) return;

  const beacon = document.createElement("script");
  beacon.type = "module";
  beacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
  beacon.dataset.cfBeacon = JSON.stringify({ token: TOKEN });
  document.body.appendChild(beacon);
})();
