(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Collapsible section toggle
     Triggered by any element with class "collapsible-hdr" and
     a data-target attribute pointing to the body element's id.
  ------------------------------------------------------------------ */
  var collapsibleHeaders = document.querySelectorAll(".collapsible-hdr");
  collapsibleHeaders.forEach(function (hdr) {
    hdr.addEventListener("click", function () {
      var target = hdr.getAttribute("data-target");
      if (!target) return;
      var body = document.getElementById(target);
      if (!body) return;
      var isHidden = body.style.display === "none";
      body.style.display = isHidden ? "" : "none";
      var chevron = hdr.querySelector(".p-chevron");
      if (chevron) chevron.textContent = isHidden ? "\u25BC" : "\u25B6";
    });
  });

  /* ------------------------------------------------------------------
     Pricing Guidance Override logic
     - "Does this policy need a Pricing Guidance Override?" checkbox
       controls visibility of the "Overridden Pricing Guidance" input.
     - When unchecked the input is hidden and its value is cleared.
  ------------------------------------------------------------------ */
  var overrideCheckbox = document.getElementById("pricingGuidanceOverride");
  var overriddenWrap   = document.getElementById("overriddenWrap");
  var overriddenInput  = document.getElementById("overriddenPricingGuidance");

  function syncOverrideFields() {
    if (!overrideCheckbox || !overriddenWrap || !overriddenInput) return;
    if (overrideCheckbox.checked) {
      overriddenWrap.style.display = "";
    } else {
      overriddenWrap.style.display = "none";
      overriddenInput.value = "";
    }
  }

  if (overrideCheckbox) {
    overrideCheckbox.addEventListener("change", syncOverrideFields);
  }

  // Set initial state
  syncOverrideFields();

})();
