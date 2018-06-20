(function($) {
  $(document).ready(function() {
    var path = (window.location.pathname).substring(1);

    $.getJSON('js/menu.json', function(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].link === path) {
          data[i].isActive = true;
        }
      }

      var menu = data;
      render('templates/menu.mst', '#menu', { menu: menu });
      render('templates/header.mst', '#header', {});

    });
  });

  function render(url, target, data) {
    $.get(url, function(template) {
      var rendered = Mustache.render(template, data);
      $(target).html(rendered);
    });
  }

})(jQuery);
