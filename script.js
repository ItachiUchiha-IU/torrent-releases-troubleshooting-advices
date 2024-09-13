$(function() {
  $("#toggle_checkbox").on("click", () => {
    $('body').toggleClass("dark",this.checked)
  });
});
