var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

var myName = "";

$(window).load(function() {

  myName = prompt("İsiminizi girin ");

  document.getElementById("name").innerHTML = myName;


  $messages.mCustomScrollbar();

  firebase.database().ref("messages").on("child_added", function (snapshot) {
    if (snapshot.val().sender == myName) {
      $('<div class="message message-personal"><figure class="avatar"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdX6tPX96Zk00S47LcCYAdoFK8INeCElPeJrVDrh8phAGqUZP_g" /></figure><div id="message-' + snapshot.key + '">' + snapshot.val().message + '<button class="btn-delete" data-id="' + snapshot.key + '" onclick="deleteMessage(this);">sil</button></div></div>').appendTo($('.mCSB_container')).addClass('new');
      $('.message-input').val(null);
    } else {
      $('<div class="message new"><figure class="avatar"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdX6tPX96Zk00S47LcCYAdoFK8INeCElPeJrVDrh8phAGqUZP_g" /></figure><div id="message-' + snapshot.key + '">' + '<span id="color" style="font-family: , sans-serif; font-weight:bold; background-color:#fff; padding:0xp 10px; margin-right:10px; color:#000; border-radius:30px;">&nbsp;' + ' ' + snapshot.val().sender + '&nbsp;</span>' + snapshot.val().message + '</div></div>').appendTo($('.mCSB_container')).addClass('new');
    }

    setDate();
    updateScrollbar();
  });

  if (myName.toLowerCase() === "zehra") {
    document.getElementById("name").innerHTML = "PRENSES✨";
  } else if (myName === undefined || myName === "") {

    window.alert('Boş Alan Bırakmayın');
    location.reload()
  }

});


function randomHero() {

var hour = new Date().getHours();
if (hour < 18) {
    var heroPics = ['https://www.pixel4k.com/wp-content/uploads/2018/10/desert-sun-day-4k-minimalism_1540749108.jpg',
    'https://images.hdqwalls.com/wallpapers/sun-desert-art-4x.jpg',
    'https://www.hdwallpapers.in/download/mountains_sunny_day_4k-wide.jpg',
    'https://www.setaswall.com/wp-content/uploads/2017/03/4K-Mountain-Forest-Trees-Wallpaper-3840x2160.jpg'];
} else {
    var heroPics = ['https://www.setaswall.com/wp-content/uploads/2017/03/4K-Road-Forest-Night-Wallpaper-3840x2160.jpg',
    'https://papers.co/wallpaper/papers.co-mj52-forest-dark-night-trees-nature-36-3840x2400-4k-wallpaper.jpg',
    'https://images5.alphacoders.com/100/1000491.jpg',
    'https://wallpaperaccess.com/full/253796.jpg'];
}

$('#random').css({
    'background' : 'url('+ heroPics[Math.floor(Math.random() * heroPics.length)] + ') no-repeat',
    'background-attachment' : 'scroll',
    'background-position' : '50% 50%',
    'background-size' : 'cover'
});
}

randomHero();


function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}


function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }

  sendMessage();
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
});
