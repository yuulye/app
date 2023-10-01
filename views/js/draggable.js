(function ($) {
  var margin = 2;
  var extra_margin_right = 0;
  var extra_margin_bottom = 0;
  var z_index = 100;

  if (document.body.scrollHeight > window.innerHeight) {
    extra_margin_right = 8;
  }

  if (document.body.scrollWidth > window.innerWidth) {
    extra_margin_bottom = 8;
  }

  $.fn.draggableTouch = function (action) {
    if (!("ontouchstart" in document.documentElement)) {
      return this.draggableMouse(action);
    }

    if (action == "disable") {
      this.unbind("touchstart.draggableTouch");
      this.unbind("touchmove.draggableTouch");
      this.unbind("touchend.draggableTouch");
      this.unbind("touchcancel.draggableTouch");
      this.trigger("dragdisabled");
      return this;
    }

    this.each(function () {
      var $element = $(this);
      var offset = null;
      var draggingTouchId = null;

      var end = function (e) {
        var orig = e.originalEvent;
        for (var i = 0; i < orig.changedTouches.length; i++) {
          var touch = orig.changedTouches[i];
          if (touch.identifier != draggingTouchId) {
            continue;
          }
          $element.trigger("dragend", {
            top: orig.changedTouches[0].pageY - offset.y,
            left: orig.changedTouches[0].pageX - offset.x
          });
          draggingTouchId = null;
        }
      };

      $element.bind("touchstart.draggableTouch", function (e) {
        var orig = e.originalEvent;
        if (draggingTouchId) {
          return;
        }

        draggingTouchId = orig.changedTouches[0].identifier;
        var pos = $(this).position();

        z_index++;
        $element.css('z-index', z_index);

        offset = {
          x: orig.changedTouches[0].pageX - pos.left,
          y: orig.changedTouches[0].pageY - pos.top
        };

        $element.trigger("dragstart", pos);
      });

      $element.bind("touchmove.draggableTouch", function (e) {
        e.preventDefault();
        var orig = e.originalEvent;
        for (var i = 0; i < orig.changedTouches.length; i++) {
          var touch = orig.changedTouches[i];
          if (touch.identifier != draggingTouchId) {
            continue;
          }
          setCss(
            $element
            , touch.pageY - offset.y, touch.pageX - offset.x
          );
        }
      });

      $element.bind("touchend.draggableTouch touchcancel.draggableTouch", end);
    });

    return this;
  };


  $.fn.draggableMouse = function (action) {
    if (action == "disable") {
      this.unbind("mousedown.draggableTouch");
      this.unbind("mouseup.draggableTouch");
      $(document).unbind("mousemove.draggableTouch");
      this.trigger("dragdisabled");
      return this;
    }

    this.each(function () {
      var $element = $(this);
      var offset = null;

      var move = function (e) {
        setCss($element, e.pageY - offset.y, e.pageX - offset.x);
      };

      var up = function (e) {
        $element.unbind("mouseup.draggableTouch", up);
        $(document).unbind("mousemove.draggableTouch", move);
        $element.trigger("dragend", {
          top: e.pageY - offset.y,
          left: e.pageX - offset.x
        });
      };

      $element.bind("mousedown.draggableTouch", function (e) {
        var pos = $element.position();
        offset = {
          x: e.pageX - pos.left,
          y: e.pageY - pos.top
        };
        $(document).bind("mousemove.draggableTouch", move);
        $element.bind("mouseup.draggableTouch", up);
        $element.trigger("dragstart", pos);
        z_index++;
        $element.css('z-index', z_index);
      });
    });

    return this;
  };

  function setCss($element, top, left) {
    if (top < margin) {
      top = margin;
    } else if (
      top + $element.height() + margin + extra_margin_bottom
      > window.innerHeight
    ) {
      top = window.innerHeight - margin
        - $element.height() - extra_margin_bottom;
    }

    if (left < margin) {
    left = margin;
    } else if (
      left + $element.width() + margin + extra_margin_right
      > window.innerWidth
    ) {
      left = window.innerWidth - margin
        - $element.width() - extra_margin_right;
    }

    $element.css({
      top: top,
      left: left,
    });
  }
})(jQuery);
