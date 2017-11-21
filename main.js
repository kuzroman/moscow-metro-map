$(function () {

    var scale = 1;
    var shiftX = 0;
    var shiftY = 0;
    var mouseDown = false;

    bindEvents();

    function bindEvents() {

        map_metro.ondragstart = function () {
            return false;
        };

        // viewport - found by id
        if (map_metro.addEventListener && 'onwheel' in document) { // IE9+
            map_metro.addEventListener('wheel', handleScale);
        }

        map_metro.addEventListener('mousedown', function (e) {
            mouseDown = true;
            shiftX = e.pageX - parseInt(map_metro.style.left + pageXOffset, 10);
            shiftY = e.pageY - parseInt(map_metro.style.top + pageYOffset, 10);
        });

        map_metro.addEventListener('mouseup', function () {
            mouseDown = false;
        });

        document.onmousemove = moveAt;
    }

    function handleScale(ev) {
        var delta = ev.deltaY || ev.detail || ev.wheelDelta;
        // отмасштабируем при помощи CSS
        if (delta > 0) scale += 0.05;
        else scale -= 0.05;
        map_metro.style.transform = map_metro.style.WebkitTransform = map_metro.style.MsTransform = 'scale(' + scale + ')';
        // отменим прокрутку
        ev.preventDefault();
    }

    function moveAt(ev) {
        var $el = $(map_metro);
        if (mouseDown) {
            $el.css({left: ev.pageX - shiftX, top: ev.pageY - shiftY});
        }
    }

});
