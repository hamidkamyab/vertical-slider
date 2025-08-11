



const wrapper = $('#main');
let sliderContent;
let sliderItemWrapper;
let sliderBtn;
let timerId;

window.onload = () => { init() };



/////////Parametrs////////
let news = [
    {
        "id": 1,
        "title": "ثبت درخواست گذرنامه؛ حضوری یا غیرحضوری؟/ چگونه از ممنوع‌الخروج بودن خود مطلع شویم؟",
        "descript": "گروه فراجا- رئیس پلیس گذرنامه فراجا در خصوص نحوه ثبت درخواست گذرنامه و چگونگی اطلاع از وضعیت افراد برای خروج از کشور توضیح می دهد.",
        "image": "./assets/imgs/1.jpg",
        "view": 10
    },
    {
        "id": 2,
        "title": "آغاز موج دوم سفر زائران اربعین حسینی",
        "descript": "گروه استان ها-همدان- فرمانده قرارگاه اربعين فراجا با اشاره به پایان موج اول سفر زائران اربعین حسینی(ع) در روز گذشته از آغاز موج دوم سفرها خبر داد.",
        "image": "./assets/imgs/2.jpg",
        "view": 20
    },
    {
        "id": 3,
        "title": "آيين بدرقه بازرسان اعزامي به ماموريت تامين نظم و امنيت اربعين حسینی (ع) برگزار شد ",
        "descript": "گروه فراجا -رئيس بازرسي کل فراجا در آيين بدرقه بازرسان اعزامي به مأموريت پياده‌روي اربعين حسینی(ع) اولويت نخست را امنيت دانست و گفت: در اجراي مأموريت‌ها هيچ موضوعي بر امنيت تقدم ندارد.",
        "image": "./assets/imgs/3.jpg",
        "view": 80
    },
    {
        "id": 4,
        "title": "آخرین تمهیدات پلیس برای خدمات رسانی به زائران اربعین حسینی",
        "descript": "گروه فراجا- فرمانده قرارگاه اربعین فراجا از آخرین تمهیدات پلیس برای خدمات رسانی به زائران اربعین حسینی گفت.",
        "image": "./assets/imgs/4.jpg",
        "view": 5
    },
    {
        "id": 5,
        "title": "ثبت درخواست گذرنامه؛ حضوری یا غیرحضوری؟/ چگونه از ممنوع‌الخروج بودن خود مطلع شویم؟",
        "descript": "گروه فراجا- رئیس پلیس گذرنامه فراجا در خصوص نحوه ثبت درخواست گذرنامه و چگونگی اطلاع از وضعیت افراد برای خروج از کشور توضیح می دهد.",
        "image": "./assets/imgs/5.jpg",
        "view": 10
    },
    {
        "id": 6,
        "title": "آغاز موج دوم سفر زائران اربعین حسینی",
        "descript": "گروه استان ها-همدان- فرمانده قرارگاه اربعين فراجا با اشاره به پایان موج اول سفر زائران اربعین حسینی(ع) در روز گذشته از آغاز موج دوم سفرها خبر داد.",
        "image": "./assets/imgs/6.jpg",
        "view": 16
    },
    {
        "id": 7,
        "title": "آيين بدرقه بازرسان اعزامي به ماموريت تامين نظم و امنيت اربعين حسینی (ع) برگزار شد ",
        "descript": "گروه فراجا -رئيس بازرسي کل فراجا در آيين بدرقه بازرسان اعزامي به مأموريت پياده‌روي اربعين حسینی(ع) اولويت نخست را امنيت دانست و گفت: در اجراي مأموريت‌ها هيچ موضوعي بر امنيت تقدم ندارد.",
        "image": "./assets/imgs/7.jpg",
        "view": 80
    },
    {
        "id": 8,
        "title": "آخرین تمهیدات پلیس برای خدمات رسانی به زائران اربعین حسینی",
        "descript": "گروه فراجا- فرمانده قرارگاه اربعین فراجا از آخرین تمهیدات پلیس برای خدمات رسانی به زائران اربعین حسینی گفت.",
        "image": "./assets/imgs/8.jpg",
        "view": 5
    }

]

let currentNews = 0;
let textLength = 210;
let currentItemPage = 1;

/////////////////////////


const init = () => {
    initVaribales()
    initEvents()
}

const initVaribales = () => {
    sliderContent = wrapper.find("#sliderContent")
    sliderItemWrapper = wrapper.find("#sliderItemWrapper")
    sliderBtn = wrapper.find(".slider__btn")
}

const initEvents = () => {
    mappingData();
    sliderItemEvent();
    sliderBtnEvent();
    autoSlide();
}

const mappingData = async () => {

    const contentTag = news.map((item, index) => {

        return `<div id="sliderContentItem-${index}" class="slider__content-item ${index === 0 ? 'active' : ''}" >
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



    const thumbnailTag = news.map((item, index) => {

        return `<li id="item-${index}" data-title="${item.title

            }" data-index="${index}" class="${index == 0 ? 'active' : ''

            } slider__thumbnail-item" >

                        <figure class="slider__thumbnail-img-wrapper">

                            <img class="slider__thumbnail-img" src="${item.image

            }" alt="">

                        </figure>

                    </li>`;

    })

        .join("");

    sliderContent.append(contentTag);
    sliderItemWrapper.append(thumbnailTag);

};



const sliding = (action) => {

    const items = wrapper.find(".slider__thumbnail-item");
    const itemHeight = items[0].offsetHeight + 6;
    const visibleHeight = sliderItemWrapper[0].offsetHeight;
    const itemsPerPage = Math.ceil(visibleHeight / itemHeight);
    const totalItems = items.length;

    let newIndex = currentNews;

    if (action === "next") {
        newIndex = currentNews >= totalItems - 1 ? 0 : currentNews + 1;
    } else if (action === "prev") {
        newIndex = currentNews <= 0 ? totalItems - 1 : currentNews - 1;
    }

    const newPage = Math.floor(newIndex / itemsPerPage);
    sliderItemWrapper[0].scrollTo({
        top: itemHeight * itemsPerPage * newPage,
        behavior: "smooth"
    });

    wrapper.find(".slider__thumbnail-item").removeClass("active");
    wrapper.find(".slider__content-item").removeClass("active");
    wrapper.find(`#item-${newIndex}`).addClass("active");
    wrapper.find(`#sliderContentItem-${newIndex}`).addClass("active");
    currentNews = newIndex;

};


const sliderItemEvent = () => {

    sliderItemWrapper.on("click", (e) => {
        const index = e.target.getAttribute("data-index");
        if (index) {
            handleSelectNews(index);
        }
    });

};



const handleSelectNews = (index) => {
    currentNews = Number(index);

    clearInterval(timerId);

    sliding();

    autoSlide();

};



const sliderBtnEvent = () => {

    sliderBtn.each(function () {
        $(this).on("click", function (e) {
            clearInterval(timerId);

            const action = $(this).attr("data-action");

            if (action === "next") {
                nextSlide(action);
            }

            if (action === "prev") {
                prevSlide(action);
            }

            autoSlide();
        });
    });


};



const nextSlide = (action) => {

    sliding(action);

};



const prevSlide = (action) => {

    sliding(action);

};



const autoSlide = () => {

    timerId = setInterval(() => {

        nextSlide("next");

    }, 5000);

};


function truncateText(text) {
    if (text.length > textLength) {
        return text.slice(0, textLength) + '...';
    }
    return text;
}