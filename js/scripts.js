document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.querySelector('.faq__tabs');
    const tabButtons = tabsContainer.querySelectorAll('.faq__button');
    const tabPanels = tabsContainer.querySelectorAll('.faq__panel');

    tabsContainer.addEventListener('click', (event) => {
        const clickedButton = event.target.closest('.faq__button');

        if (!clickedButton) {
            return;
        }
        tabButtons.forEach(button => {
            button.classList.remove('faq__button--active');
            button.setAttribute('aria-selected', 'false');
            button.setAttribute('tabindex', '-1');
        });

        tabPanels.forEach(panel => {
            panel.classList.remove('faq__panel--active');
            panel.hidden = true;
        });
        clickedButton.classList.add('faq__button--active');
        clickedButton.setAttribute('aria-selected', 'true');
        clickedButton.removeAttribute('tabindex');

        const targetPanelId = clickedButton.getAttribute('aria-controls');
        const targetPanel = document.getElementById(targetPanelId);

        if (targetPanel) {
            targetPanel.classList.add('faq__panel--active');
            targetPanel.hidden = false;
        }
    });
});



function loadGoogleMapsAPI() {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            resolve(window.google.maps);
            return;
        }

        const script = document.createElement('script');
        const apiKey = 'AIzaSyBsxAcoh6ev7WA29dm18KIx0yE_qecHFbk';

        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&v=beta`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            console.log("Google Maps API загружен.");
            resolve(window.google.maps);
        };

        script.onerror = () => {
            console.error("Ошибка загрузки Google Maps API.");
            reject(new Error("Could not load Google Maps API."));
        };

        document.head.appendChild(script);
    });
}


async function createMap() {
    try {
        await loadGoogleMapsAPI();

        const myLatLng = { lat: 59.947833, lng: 30.407799 };

        const { Map } = await google.maps.importLibrary("maps");
        const { Marker } = await google.maps.importLibrary("marker");

        const map = new Map(document.getElementById("map"), {
            zoom: 15,
            center: myLatLng,
            disableDefaultUI: true,
        });

        const marker = new Marker({
            position: myLatLng,
            map: map,
        });

        const infoWindowContent = `
            <h3>Наш офис</h3>
            <p>Улица Стахановцев, 3, Санкт-Петербург, Россия, 195112</p>
        `;

        const customInfoWindow = document.createElement("div");
        customInfoWindow.className = 'custom-info-window';
        customInfoWindow.innerHTML = infoWindowContent;

        map.getPanes().floatPane.appendChild(customInfoWindow);

    } catch (error) {
        console.error("Не удалось создать карту:", error);
    }
}

createMap();


document.addEventListener('DOMContentLoaded', function () {

    var popup = document.getElementById("popupForm");
    var btn = document.getElementById("openPopupBtn");
    var span = document.getElementsByClassName("close-btn")[0];

    if (!popup || !btn || !span) {
        console.error("Не удалось найти один из элементов для popup: #popupForm, #openPopupBtn или .close-btn");
        return;
    }

    btn.onclick = function () {
        popup.style.display = "block";
        document.body.style.overflow = 'hidden';
    }

    function closePopup() {
        popup.style.display = "none";
        document.body.style.overflow = '';
    }

    span.onclick = function () {
        closePopup();
    }

    window.onclick = function (event) {
        if (event.target == popup) {
            closePopup(); 
        }
    }

});


 // JS для мобильного аккордеона
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling; 

            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                }
            });

            header.classList.toggle('active');

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
