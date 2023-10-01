function item(i) {
  el = document.getElementById('draggable-'+i)
  el.style.display = 'block';
  $(el).mousedown();
  console.log(items[i], el);
}

function closePopup(i) {
  console.log(items[i]);
  el = document.getElementById('draggable-'+i)
  el.style.display = 'none';
}
