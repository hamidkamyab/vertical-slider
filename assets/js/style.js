const horizontalSlider = {

  news: [],

  currentNews: 0,

  timerId: null,
  textLength: 210

};



window.onload = () => {

  fetchData();

  sliderItemEvent();

  sliderBtnEvent();

  autoSlide();

};



const fetchData = async () => {

  //Fetch Data

  try {

    const response = await fetch("assets/data.json");

    const data = await response.json();

    horizontalSlider.news = [...data];



    //Mapping Data

    const contentTag = data

      .map((item, index) => {

        return `<div id="sliderContentItem-${index}" class="slider__content-item ${index === 0 ? 'active' : '' }" >
                        <figure class="slider__img-wrapper">
                            <img class="slider__img-main" src="${item.image}" alt="">
                        </figure>
                        <div class="slider__text">
                            <h1 class="slider__title">${item.title}</h1>
                            <p class="slider__desc">${truncateText(item.descript)}</p>
                        </div>
                    </div>`;
      })

      .join("");



    const thumbnailTag = data

      .map((item, index) => {

        return `<li id="item-${index}" data-title="${

          item.title

        }" data-index="${index}" class="${

          index == 0 ? 'active' : ''

        } slider__thumbnail-item" >

                        <figure class="slider__thumbnail-img-wrapper">

                            <img class="slider__thumbnail-img" src="${

                              item.image

                            }" alt="">

                        </figure>

                    </li>`;

      })

      .join("");



    document.getElementById("sliderContent").innerHTML = contentTag;

    document.getElementById("sliderItemWrapper").innerHTML = thumbnailTag;

  } catch (error) {

    console.log("Failed Slider: ", error);

    alert("خطایی در بارگزاری اسلایدر رخ داده است:");

  }

};



const sliding = () => {

  document.querySelectorAll(".slider__thumbnail-item").forEach((item) => {

    item.classList.remove("active");

  });

  document.querySelectorAll(".slider__content-item").forEach((item) => {

    item.classList.remove("active");

  });

  document

    .getElementById(`item-${horizontalSlider.currentNews}`)

    .classList.add("active");

  document

    .getElementById(`sliderContentItem-${horizontalSlider.currentNews}`)

    .classList.add("active");

};



const sliderItemEvent = () => {

  document

    .getElementById("sliderItemWrapper")

    .addEventListener("click", (e) => {

      const index = e.target.getAttribute("data-index");

      if (index) {

        handleSelectNews(index);

      }

    });

};



const handleSelectNews = (index) => {

  horizontalSlider.currentNews = Number(index);

  clearInterval(horizontalSlider.timerId);

  sliding();

  autoSlide();

};



const sliderBtnEvent = () => {

  document.querySelectorAll(".slider__btn").forEach((item) =>

    item.addEventListener("click", (e) => {

      clearInterval(horizontalSlider.timerId);

      const action = e.currentTarget.getAttribute("data-action");

      if (action == "next") {

        nextSlide();

      }



      if (action == "prev") {

        prevSlide();

      }

      autoSlide();

    })

  );

};



const nextSlide = () => {

  if (horizontalSlider.currentNews < horizontalSlider.news.length - 1) {

    horizontalSlider.currentNews++;

  } else {

    horizontalSlider.currentNews = 0;

  }

  sliding();

};



const prevSlide = () => {

  if (horizontalSlider.currentNews > 0) {

    horizontalSlider.currentNews--;

  } else {

    horizontalSlider.currentNews = horizontalSlider.news.length - 1;

  }

  sliding();

};



const autoSlide = () => {

  horizontalSlider.timerId = setInterval(() => {

    nextSlide();

  }, 5000);

};


function truncateText(text) {
  if (text.length > horizontalSlider.textLength) {
    return text.slice(0, horizontalSlider.textLength) + '...';
  }
  return text;
}