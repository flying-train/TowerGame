//// Control panel functions
function addCard() {
    var rand = Math.floor(Math.random() * 3);
    var colors = ["red", "green", "blue"];

    $("#cp-list").append($("<li class='card " + colors[rand] + "''></li>"));
    cardCount++;
    // Not a nice solution WIP
    $(".card").unbind("click");
    $(".card").click(function() {
        $(this).playCard();
    });
}

function playButton() {
    if (selectedCount > 0) {
        makeCube();
        $(".selected").removeCard();
        selectedCount = 0;
    }
}

$.fn.playCard = function playCard() {
    if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
        selectedCount--;
    } else if (selectedCount < 5) {
        $(this).addClass("selected");
        selectedCount++;
    }
};

$.fn.removeCard = function removeCard() {
    // WIP
    cardCount = cardCount - selectedCount;
    $(this).remove();
};

//// Element logic
// function detectColor() {
//     colors = [];
//     $(".selected").each(function(index, el) {
//         $(this).removeClass("selected");
//         $(this).removeClass("card");      
//         colors.push($(this).attr("class"));
//         $(this).addClass("card");
//         $(this).addClass("selected");
//     })
//     colors.sort()
//     var max = 0,
//         result, freq = 0;
//     for (var i = 0; i < colors.length; i++) {
//         if (colors[i] === colors[i + 1]) {
//             freq++;
//         } else {
//             freq = 0;
//         }
//         if (freq > max) {
//             result = colors[i];
//             max = freq;
//         } else {
//             result = colors[Math.floor(Math.random() * colors.length)]
//         }
//     }
//     return (result)
// }
