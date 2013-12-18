$(function() {
  // Enable drag/drop of CSV files.
  $('body').bind('dragenter', function(e) {
    $('body').addClass('drag-active');
  });
  $('.drop-target').bind('dragleave', function(e) {
    $('body').removeClass('drag-active');
  });
  $('.drop-target').bind('dragover', function(e) {
    e.preventDefault();
  });
  $('.drop-target').bind('drop', function(e) {
    $('body').removeClass('drag-active');
    e.preventDefault();

    if (e.originalEvent.dataTransfer.files.length != 1) {
      return true;
    }
    var sourceFile = e.originalEvent.dataTransfer.files.item(0);
    if (sourceFile.type != 'text/csv') {
      return true;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
      Cohorts.visualize(reader.result);
    };
    reader.readAsText(e.originalEvent.dataTransfer.files.item(0));
  });

  Cohorts.visualize();
});