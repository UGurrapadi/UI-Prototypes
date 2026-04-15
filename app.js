(function () {
  const uwReviewFlag = document.getElementById("uwReviewFlag");
  const justificationRow = document.getElementById("justificationRow");
  const justification = document.getElementById("justification");

  const effectiveDate = document.getElementById("effectiveDate");
  const expirationDate = document.getElementById("expirationDate");

  const uwRow = document.getElementById("uwReviewRow");
  const justificationAsterisk = document.getElementById("justificationAsterisk");

  function toInputDate(d) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function addOneYear(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00"); // reduce timezone issues
    d.setFullYear(d.getFullYear() + 1);
    return toInputDate(d);
  }

  function syncExpirationDate() {
    expirationDate.value = addOneYear(effectiveDate.value);
  }

  function syncUWFields() {
    const isYes = (uwReviewFlag.value || "").toLowerCase() === "yes";

    // show/hide
    justificationRow.style.display = isYes ? "" : "none";

    // required only when visible
    justification.required = isYes;

    // asterisk only when visible
    if (justificationAsterisk) {
      justificationAsterisk.style.display = isYes ? "" : "none";
    }

    // highlight handling
    if (uwRow) uwRow.classList.toggle("attention", true);
    justificationRow.classList.toggle("attention", isYes);

    // clear when hiding
    if (!isYes) justification.value = "";
  }

  // defaults
  uwReviewFlag.value = "no";

  // events
  uwReviewFlag.addEventListener("change", syncUWFields);
  effectiveDate.addEventListener("change", syncExpirationDate);

  // initial sync
  syncExpirationDate();
  syncUWFields();

  // Make expiration date effectively non-editable across browsers
  ["keydown", "mousedown", "click"].forEach((evt) => {
    expirationDate.addEventListener(evt, (e) => e.preventDefault());
  });
})();
