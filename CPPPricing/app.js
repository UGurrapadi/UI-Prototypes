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
})();
