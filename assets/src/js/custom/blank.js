// TARGET BLANK
(() => {
  const { links } = document;
  for (let i = 0, linksLength = links.length; i < linksLength; i++) {
    if (links[i].hostname !== window.location.hostname) {
      links[i].target = "_blank";
      links[i].className += " is-blank";
      links[i].rel = "noopener";
    }
  }
})();
