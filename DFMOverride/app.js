(function () {
  // UM/UIM Acceptance collapse toggle
  var umHeader = document.getElementById("umHeader");
  var umBody   = document.getElementById("umBody");
  var umToggle = document.getElementById("umToggle");

  if (umHeader && umBody && umToggle) {
    umHeader.addEventListener("click", function () {
      var collapsed = umBody.style.display === "none";
      umBody.style.display  = collapsed ? "" : "none";
      umToggle.classList.toggle("collapsed", !collapsed);
    });
  }

  // Show/hide "Override Recommended Scheduled Mod" based on pricing guidance dropdown
  var overridePricingGuidance = document.getElementById("overridePricingGuidance");
  var overrideSchedModRow     = document.getElementById("overrideSchedModRow");

  if (overridePricingGuidance && overrideSchedModRow) {
    overridePricingGuidance.addEventListener("change", function () {
      overrideSchedModRow.style.display = this.value === "Yes" ? "" : "none";
    });
  }
})();
