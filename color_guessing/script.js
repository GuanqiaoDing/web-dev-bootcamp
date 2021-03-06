let colors = [];
let themeColor = "#0EB3AC";
let colorTarget;
let curDifficulty = "Easy";

let difficulties = {
	Easy: 3,
	Medium: 6,
	Hard: 9
};

let defaultStyle = {
	color: themeColor,
	background: "#ffffff"
};

let highlightStyle = {
	color: "#ffffff",
	background: themeColor
};

$(document).ready(function () {
	updateTheme();
	initColors();
	setUpSquares();
	setUpMenu();
});

function updateTheme () {
	$("h1").css(highlightStyle);
	$(".bar-item").css(defaultStyle);
	$(".dropdown-item").each(function () {
		if ($(this).text() === curDifficulty) {
			$(this).css(highlightStyle);
		} else {
			$(this).css(defaultStyle);
		}
	});
	$("#themeColor").val(themeColor);
	$("#message").css("color", themeColor);
}

function initColors () {
	let num = difficulties[curDifficulty];
	colors = generateColors(num);
	colorTarget = pickColor(num);
	$("#colorDisplay").text(colorTarget.rgb().toUpperCase());
}

function generateColors (num) {
	let arr = [];
	for (let i = 0; i < num; i++) {
		arr.push(new Color());
	}
	return arr;
}

function Color () {
	this.r = Math.floor(Math.random() * 256);
	this.g = Math.floor(Math.random() * 256);
	this.b = Math.floor(Math.random() * 256);
	this.rgb = function () {
		return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
	};
	this.hex = function () {
		let r = this.r.toString(16);
		let g = this.g.toString(16);
		let b = this.b.toString(16);
		if (this.r < 16) r = "0" + r;
		if (this.g < 16) g = "0" + g;
		if (this.b < 16) b = "0" + b;
		let value = "#" + r + g + b;
		return value.toUpperCase();
	};
}

function pickColor (num) {
	return colors[Math.floor(Math.random() * num)];
}

function setUpSquares () {
	$(".square").each(function (index) {
		if (index < colors.length) {
			$(this).css("background", colors[index].rgb());
			$(this).on("click", function () {
				if ($(this).css("background-color") === colorTarget.rgb()) {
					$("#message").text("Correct!");
					changeColors();
				} else {
					$("#message").text("Try Again!");
					$(this).css("background", "#141414");
				}
			});
		}
	});
}

function changeColors () {
	themeColor = colorTarget.hex();
	defaultStyle.color = themeColor;
	highlightStyle.background = themeColor;
	updateTheme();
	$("#themeColor").val(themeColor);
	$(".square").each(function (index) {
		if (index < colors.length) {
			$(this).css("background", colorTarget.rgb());
		}
	});
}

function setUpMenu () {
	$("#reset").on("click", function () {
		initColors();
		setUpSquares();
		$("#message").text("");
	});

	$("#themeColor").on("change", function () {
		themeColor = $(this).val();
		defaultStyle.color = themeColor;
		highlightStyle.background = themeColor;
		updateTheme();
	});

	$(".bar-item").each(function () {
		$(this).on("mouseover", function () {
			$(this).css(highlightStyle);
		});
		$(this).on("mouseout", function () {
			if ($(this).text() !== curDifficulty) {
				$(this).css(defaultStyle);
			}
		});
	});

	$(".dropdown-toggle").on("mouseover", function () {
		$(this).dropdown("toggle");
	});

	$(".dropdown").on({
		mouseleave: function () {
			$(".dropdown-toggle").dropdown("toggle");
		},
		"show.bs.dropdown": function () {
			$(this).find(".dropdown-menu").slideDown();
		},
		"hide.bs.dropdown": function () {
			$(this).find(".dropdown-menu").slideUp();
		}
	});

	$(".dropdown-item").each(function () {
		$(this).on("click", function (event) {
			event.stopPropagation();
			if ($(this).text() !== curDifficulty) {
				curDifficulty = $(this).text();
				changeDifficulty();
			}
		});
	});
}

function changeDifficulty () {
	initColors();
	setUpSquares();
	$(".square").each(function (index) {
		if (index < colors.length) {
			$(this).fadeIn(600);
		} else {
			$(this).fadeOut(600);
		}
	});
	$("#message").text("");
	updateTheme();
}