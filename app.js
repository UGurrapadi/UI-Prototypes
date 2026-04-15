(function () {
  const uwReviewFlag = document.getElementById("uwReviewFlag");
  const justificationRow = document.getElementById("justificationRow");
  const justification = document.getElementById("justification");

  const pleaseSpecifyRow = document.getElementById("pleaseSpecifyRow");
  const pleaseSpecify = document.getElementById("pleaseSpecify");
  const pleaseSpecifyAsterisk = document.getElementById("pleaseSpecifyAsterisk");

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

  function syncOtherSpecify() {
    // Only relevant when justification is visible (UW Review = Yes)
    const justificationValue = (justification.value || "").toLowerCase();
    const justificationVisible = justificationRow.style.display !== "none";
    const show = justificationVisible && justificationValue === "other";

    pleaseSpecifyRow.style.display = show ? "" : "none";
    pleaseSpecify.required = show;

    if (pleaseSpecifyAsterisk) {
      pleaseSpecifyAsterisk.style.display = show ? "" : "none";
    }

    // Same attention/highlight behavior as Justification (only when shown)
    pleaseSpecifyRow.classList.toggle("attention", show);

    // Clear when hiding
    if (!show) pleaseSpecify.value = "";
  }

  function syncUWFields() {
    const isYes = (uwReviewFlag.value || "").toLowerCase() === "yes";

    // show/hide justification
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
    if (!isYes) {
      justification.value = "";

      // also reset the "Other" follow-up field
      pleaseSpecifyRow.style.display = "none";
      pleaseSpecify.required = false;
      pleaseSpecify.value = "";
      if (pleaseSpecifyAsterisk) pleaseSpecifyAsterisk.style.display = "none";
      pleaseSpecifyRow.classList.remove("attention");
    }

    // ensure the dependent field is in sync after any UW change
    syncOtherSpecify();
  }

  // defaults
  uwReviewFlag.value = "no";

  // events
  uwReviewFlag.addEventListener("change", syncUWFields);
  justification.addEventListener("change", syncOtherSpecify);
  effectiveDate.addEventListener("change", syncExpirationDate);

  // initial sync
  syncExpirationDate();
  syncUWFields();
  syncOtherSpecify();

  // Make expiration date effectively non-editable across browsers
  ["keydown", "mousedown", "click"].forEach((evt) => {
    expirationDate.addEventListener(evt, (e) => e.preventDefault());
  });
})();
