$(function() {
  const $spans = $("#star span")
    .on("click", function() {
    const cls = this.id;
    $spans.each(function() { $("body").removeClass(this.id)})
    $("body").addClass(cls)
  });
});
