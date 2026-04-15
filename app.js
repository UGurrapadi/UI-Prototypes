(function () {
  const uwReviewFlag = document.getElementById("uwReviewFlag");
  const justificationRow = document.getElementById("justificationRow");
  const justification = document.getElementById("justification");

  function sync() {
    const isYes = (uwReviewFlag.value || "").toLowerCase() === "yes";
    justificationRow.style.display = isYes ? "" : "none";
    if (!isYes) justification.value = "";
  }

  // Ensure default is No (as requested)
  uwReviewFlag.value = "no";

  uwReviewFlag.addEventListener("change", sync);
  sync();
})();
