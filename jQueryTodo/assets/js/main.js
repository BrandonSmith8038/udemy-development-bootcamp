// Check off specific todos by clicking
$('ul').on('click', 'li', function() {
  $(this).toggleClass('completed');
});

//Remove todo when clicking on the X

$('ul').on('click', 'span', function(e) {
  $(this)
    .parent()
    .fadeOut(500, function() {
      $(this).remove();
    });
  e.stopPropagation();
});

$("input[type='text']").on('keydown', function(e) {
  let keyCode = e.which;
  if (keyCode === 13) {
    const todo = $(this).val();
    $('ul').append(`<li><span><i class="fa fa-trash"></i></span> ${todo}</li>`);
    $(this).val('');
  }
});

$('.fa-plus').on('click', function() {
  $("input[type = 'text']").fadeToggle();
});
