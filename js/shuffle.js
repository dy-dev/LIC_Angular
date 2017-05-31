
window.onload = function () {
    'use strict';

    // data-target
    var filters = document.getElementsByClassName('filter'),
        // data-category
        items = document.getElementsByClassName('item'),
        itemsLen = items.length - 1,
        shuffleGrid = document.getElementsByClassName('shuffle-grid')[0],
        shuffleGridWidth = shuffleGrid.clientWidth,
        shuffleGridHeight = shuffleGrid.clientHeight,
        itemsPerRow = Math.floor(shuffleGridWidth / items[0].clientWidth),
        itemHeight = items[0].clientHeight,
        // @type {Number}
        // item margin-top or margin-bottom / 2 at css file
        itemMarginTop = 10,
        target,
        categories,
        topTemp = [],
        leftTemp = [],
        passedTemp = [],
        once,
        tx, ty,
        v;

        // check for test implementation
        console.log("Shuffle.js\n");
        console.log("itemsLen = " + items.length - 1 +"\n");

        console.log("***********")
    
    forEach(items, function (i,e) {
        topTemp[i] = e.offsetTop;
        leftTemp[i] = e.offsetLeft;
    });
    
    
    
    window.onresize = function () {
        forEach(items, function (i,e) {
            topTemp[i] = e.offsetTop;
            leftTemp[i] = e.offsetLeft;
        });
        shuffleGridWidth = shuffleGrid.clientWidth;
        itemsPerRow = Math.floor(shuffleGridWidth / items[0].clientWidth);
    };
    
    forEach(filters, function (i, li) {
        li.onclick = function () {
            forEach(filters, function (i, e) {
                e.classList.remove('active');
            });
            this.classList.add('active');
            v = 0;
            once = true;
            passedTemp = [];
            target = li.getAttribute('data-target');
            
            (function (cb) {
                if (target === 'all') {
                    forEach(items, function (ia, e) {
                        e.style.transform = '';
                        e.style.opacity = '';
                        passedTemp.push(ia);
                    });
                    items[0].addEventListener('transitionend', function () {
                        cb(passedTemp.length)
                    });
                    return;
                }
                forEach(items, function (ib, item) {
                    item.style.transitionDuration = '';
                    categories = item.getAttribute('data-category').split(' ');
                    if (categories.indexOf(target) != -1) {
                        // animation fadein
                        ty = topTemp[v] - topTemp[ib];
                        tx = leftTemp[v] - leftTemp[ib];
                        item.style.transform = 'scale(1) translate3d('+ tx + 'px,'+ ty +'px,0) scale3d(1,1,1) rotate3d(0,1,0,0)';
                        item.style.opacity = '1';
                        v++;
                        passedTemp.push(ib);
                    } else {
                        // animation fadeout
                        item.style.transform = 'scale(0) translateZ(0) scale3d(0,0,1) rotate3d(0,1,0,70deg)';
                        item.style.opacity = '0';
                    }
                });
                items[v].addEventListener('transitionend', function () {
                    cb(passedTemp.length)
                });
            }(function (itemsCount) {
                // height for container
                shuffleGrid.style.height = (Math.ceil(itemsCount/itemsPerRow) * itemHeight) + (itemMarginTop * itemsCount) + 'px';
            }));
        };
    });
};

function forEach(elem, cb) {
    var e = elem,
        i = 0, l = e.length;
    for (; i < l; i++) {
        cb.call(e[i], i, e[i]);
    }
}