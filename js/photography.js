let loader = document.getElementById('preloader');
window.addEventListener('load', function () {
  loader.style.display = 'none';
});

//////////////////// SCROLLING ANIMATION
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#features');

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  const s1coords = section1.getBoundingClientRect();

  section1.scrollIntoView({ behavior: 'smooth' });
});

// Video Slider Main
const videoBtns = document.querySelectorAll('.slider-navBtn');
const videoSlides = document.querySelectorAll('.video-slide');
const videoContents = document.querySelectorAll('.VideoHome-content');

let videoSlidernav = function (manual) {
  videoBtns.forEach((btn) => {
    btn.classList.remove('active');
  });

  videoSlides.forEach((slide) => {
    slide.classList.remove('active');
  });

  videoContents.forEach((content) => {
    content.classList.remove('active');
  });

  videoBtns[manual].classList.add('active');
  videoSlides[manual].classList.add('active');
  videoContents[manual].classList.add('active');
};

videoBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    videoSlidernav(i);
  });
});

// parallax Animation  /////////////////
// document.addEventListener('mousemove', parallax);
// function parallax(e) {
//   this.querySelectorAll('.layer-animation').forEach((layer) => {
//     const speed = layer.getAttribute('data-speed');

//     const x = (window.innerWidth - e.pageX * speed) / 100;
//     const y = (window.innerHeight - e.pageY * speed) / 100;

//     layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
//   });
// }

/////////////////////////
// animation videos youtube
// https://www.youtube.com/watch?v=Tf6qm5JMUXQ
// VanillaTilt.init(document.querySelector('.box'), {
//   max: 25,
//   speed: 400,
// });

//It also supports NodeList
// VanillaTilt.init(document.querySelectorAll('.box'));

// Video player code
let videoPlayer = document.getElementById('videoPlayer');
let myVideo = document.getElementById('myVideo');

function stopVideo() {
  videoPlayer.style.display = 'none';
}

function playVideo(file) {
  myVideo.src = file;
  videoPlayer.style.display = 'block';

  myVideo.controlsList.add('nodownload');
}

// Filter Image Gallery
const filterItem = document.querySelector('.items');
const filterImg = document.querySelectorAll('.image');

window.onload = () => {
  filterItem.onclick = (selectedItem) => {
    if (selectedItem.target.classList.contains('item')) {
      filterItem.querySelector('.active').classList.remove('active');
      selectedItem.target.classList.add('active');
      let filterName = selectedItem.target.getAttribute('data-name');
      filterImg.forEach((image) => {
        let filterImages = image.getAttribute('data-name');
        if (filterImages == filterName || filterName == 'all') {
          image.classList.add('show');
        } else {
          image.classList.add('hide');
          image.classList.remove('show');
        }
      });
    }
  };
  for (let index = 0; index < filterImg.length; index++) {
    filterImg[index].setAttribute('onclick', 'preview(this)');
  }
};

//fullscreen image preview function
//selecting all required elements
const previewBox = document.querySelector('.preview-box'),
  categoryName = previewBox.querySelector('.previewTitle p'),
  previewImg = previewBox.querySelector('img'),
  closeIcon = previewBox.querySelector('.icon'),
  shadow = document.querySelector('.previewShadow');

function preview(element) {
  // Check this below code for scroll , you might get into some issues afterwards......
  document.querySelector('body').style.overflow = 'hidden'; // user cannot scroll while image is clicked
  let selectedPrevImg = element.querySelector('img').src;
  let selectedImgCategory = element.getAttribute('data-name');
  categoryName.textContent = selectedImgCategory;
  previewImg.src = selectedPrevImg;
  console.log(selectedPrevImg);
  previewBox.classList.add('previewShow'); // show  the preview box
  shadow.classList.add('shadowShow'); // show  the background shadow
  closeIcon.onclick = () => {
    previewBox.classList.remove('previewShow'); // hide  the preview box
    shadow.classList.remove('shadowShow'); // hide  the background shadow
    document.querySelector('body').style.overflow = 'scroll'; // show the scroll bar
  };
}
