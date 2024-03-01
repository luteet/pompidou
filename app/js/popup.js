export default function Popup(arg) {

	let body = document.querySelector('body'),
		html = document.querySelector('html'),
		saveID = (typeof arg == 'object') ? (arg['saveID']) ? true : false : false,
		popupCheck = true,
		popupCheckClose = true;

	let navPopupTimeout;

	const removeHash = function () {
		let uri = window.location.toString();
		if (uri.indexOf("#") > 0) {
			let clean_uri = uri.substring(0, uri.indexOf("#"));
			window.history.replaceState({}, document.title, clean_uri);
		}
	}

	const open = function (id, initStart) {

		if (popupCheck) {
			popupCheck = false;

			let popup = document.querySelector(id);

			if (popup) {

				if(popup.classList.contains('popup')) {

					popup.style.display = 'flex';

					/* body.classList.remove('is-popup-active');
					html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
					body.classList.add('is-popup-active'); */
					body.classList.add('is-popup-active');

					if (saveID && !popup.classList.contains("not-save-id")) {
						history.pushState('', "", id);
					}
					
					popup.classList.add('is-open');
					arg.onOpen();

					setTimeout(() => {
						if (!initStart) {
							popup.classList.add('is-active');
							setTimeout(() => popupCheck = true, 400)
						} else {
							popup.classList.add('is-transition-none');
							popup.classList.add('is-active');
							popupCheck = true;
						}

					}, 100)
				}

			} else {
				return new Error(`Not found "${id}"`)
			}
		} else setTimeout(() => popupCheck = true, 500);
	}

	const close = function (popupClose) {

		if (popupCheckClose) {
			popupCheckClose = false;

			let popup
			if (typeof popupClose === 'string') {
				popup = document.querySelector(popupClose)
			} else {
				popup = popupClose.closest('.popup');
			}

			if(popup) {
				if (popup.classList.contains('is-transition-none')) popup.classList.remove('is-transition-none')

				document.querySelectorAll(".header__nav_list > li > button.is-open").forEach(button => {
					if(button.dataset.for + popup.getAttribute("id")) {
						clearTimeout(navPopupTimeout);
						navPopupTimeout = setTimeout(() => {if(!popup.classList.contains("is-active")) popup.classList.remove("is-active-2")},400)
						button.classList.remove("is-open")
					}
				})

				setTimeout(() => {

					popup.classList.remove('is-active');

					function closeFunc() {
						const activePopups = document.querySelectorAll('.popup.is-active');

						if (activePopups.length < 1) {
							body.classList.remove('is-popup-active');
							//html.style.setProperty('--popup-padding', '0px');
						}

						if (saveID) {
							removeHash();
							if (activePopups[activePopups.length - 1]) {
								history.pushState('', "", "#" + activePopups[activePopups.length - 1].getAttribute('id'));
							}
						}

						popupCheckClose = true;
						popup.classList.remove('is-open');
						if(!popup.classList.contains("nav_popup") && !popup.classList.contains("nav_popup_2")) popup.style.display = 'none';
					}

					setTimeout(closeFunc, 400)

				}, 0)

			}

		}

	}

	return {

		open: function (id) {
			open(id);
		},

		close: function (popupClose) {
			close(popupClose)
		},

		init: function () {

			let thisTarget
			body.addEventListener('click', function (event) {

				thisTarget = event.target;

				let popupOpen = thisTarget.closest('.open-popup');
				if (popupOpen) {
					event.preventDefault();
					if(popupOpen.getAttribute('href')) {
						open(popupOpen.getAttribute('href'))
					} else if(popupOpen.dataset.for) {
						open(`#${popupOpen.dataset.for}`)
					}
					
				}

				let popupClose = thisTarget.closest('.popup-close');
				if (popupClose) {
					close(popupClose)
				}

			});

			body.addEventListener('keyup', function (event) {

				if(event.key == "Escape" && document.querySelector('.popup.is-active')) {
					close(document.querySelector('.popup.is-active'));
				}

			});

			window.addEventListener('popstate', function(event) {
				event.preventDefault()

				let currentHash = window.location.hash;
				if (currentHash === '' && document.body.classList.contains("is-popup-active")) {
					close(document.querySelector(".popup.is-active"));
				} else if(currentHash !== '' && !document.body.classList.contains("is-popup-active")) {
					open(currentHash, false, false);
				}
			});

			if (saveID) {
				let url = new URL(window.location);
				if (url.hash) {
					open(url.hash, true);
				}
			}
		},

	}
}