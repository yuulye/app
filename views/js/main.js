function item(i) {
  console.log(items[i]);
  el = document.getElementById('draggable-'+i)
  el.style.display = 'block';
}

function closePopup(i) {
  console.log(items[i]);
  el = document.getElementById('draggable-'+i)
  el.style.display = 'none';
}
