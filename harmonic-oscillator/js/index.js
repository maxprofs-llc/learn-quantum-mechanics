"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var utils = require("utils"),
    chart = require("chart.js");

var ui = {
    elements: {
        form: document.getElementById("qho-form"),
        canvas: document.getElementById("qho-canvas"),
        switcher: document.getElementById("qho-switcher"),
        checkboxes: document.body.querySelectorAll("#qho-switcher input[type='checkbox']")
    },

    init: function init() {
        if (utils.getQuery("controls") !== "0") {
            this.syncInputs();
            this.addEventHandlers();
        } else {
            this.elements.form.classList.add("hidden");
        }
    },
    addEventHandlers: function addEventHandlers() {
        this.elements.switcher.addEventListener("change", function (_ref) {
            var target = _ref.target;

            chart.toggleSeries(Number(target.value));
        }, false);
    },
    syncInputs: function syncInputs() {
        [].concat(_toConsumableArray(this.elements.checkboxes)).forEach(function (checkbox, index) {
            checkbox.checked = chart.isSeriesVisible(index);
        });
    }
};

var visibleSeries = (utils.getQuery("n") || "0,1,2,3").split(",").map(Number);
chart.create(ui.elements.canvas, { visibleSeries: visibleSeries });

ui.init();

document.body.classList.remove("loading");

module.exports = chart;