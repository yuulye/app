function item(i) {
  el = document.getElementById('draggable-'+i)
  el.style.display = 'block';
  $(el).mousedown();
}

function closePopup(i) {
  el = document.getElementById('draggable-'+i)
  el.style.display = 'none';
}
