document.addEventListener("DOMContentLoaded", () => {
  const summaries = document.querySelectorAll(".custom-nav-summary");
  for (const summary of summaries) {
    summary.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLAnchorElement || target?.closest("a")) {
        return;
      }
    });
  }
});
