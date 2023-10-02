let itemID = 0;

function item(i) {
  itemID = i;
  el = document.getElementById('draggable-'+i)
  el.style.display = 'block';
  $(el).mousedown();
}

function closePopup(i) {
  el = document.getElementById('draggable-'+i)
  el.style.display = 'none';
}

function saveImage() {
  const element = document.getElementById("draggable-"+itemID);
  const canvas = document.getElementById("my-canvas");

  html2canvas(element).then(function(canvas) {
    const dataURL = canvas.toDataURL();
    const link = document.createElement("a");
    link.download = "item.png";
    link.href = dataURL;
    link.click();
  });
}
