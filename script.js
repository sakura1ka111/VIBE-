// =====================================================
// VIBE
// Основной JavaScript
// =====================================================

let selectedPlatform = "";
let currentRoom = "";
let currentVideoUrl = "";
let currentRoomName = "";

// =====================================================
// ELEMENTS
// =====================================================

const roomModal = document.getElementById("roomModal");
const createRoomHero = document.getElementById("createRoomHero");
const joinRoomHero = document.getElementById("joinRoomHero");
const closeModal = document.getElementById("closeModal");
const roomStepPlatform = document.getElementById("roomStepPlatform");
const roomStepVideo = document.getElementById("roomStepVideo");
const roomStepReady = document.getElementById("roomStepReady");
const platforms = document.querySelectorAll(".platform");
const videoUrl = document.getElementById("videoUrl");
const roomName = document.getElementById("roomName");
const urlError = document.getElementById("urlError");
const platformDescription = document.getElementById("platformDescription");
const openPlatform = document.getElementById("openPlatform");
const createRoomFinal = document.getElementById("createRoomFinal");
const backToPlatforms = document.getElementById("backToPlatforms");
const generatedRoomCode = document.getElementById("generatedRoomCode");
const createdRoomName = document.getElementById("createdRoomName");
const createdPlatform = document.getElementById("createdPlatform");
const copyRoomCode = document.getElementById("copyRoomCode");
const enterRoom = document.getElementById("enterRoom");
const watchPage = document.getElementById("watchPage");
const backHome = document.getElementById("backHome");
const watchRoomCode = document.getElementById("watchRoomCode");
const watchTitle = document.getElementById("watchTitle");
const watchPlatform = document.getElementById("watchPlatform");
const inviteButton = document.getElementById("inviteButton");
const playButton = document.getElementById("playButton");
const playerPlay = document.getElementById("playerPlay");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

// Rooms page
const roomsPage = document.getElementById("roomsPage");
const roomsBack = document.getElementById("roomsBack");
const roomsCreateButton = document.getElementById("roomsCreateButton");
const roomLinkInput = document.getElementById("roomLinkInput");
const roomLinkButton = document.getElementById("roomLinkButton");
const roomLinkError = document.getElementById("roomLinkError");
const homePage = document.getElementById("homePage");
const detailPage = document.getElementById("detailPage");
const detailBack = document.getElementById("detailBack");
const detailBrand = document.getElementById("detailBrand");
const detailPoster = document.getElementById("detailPoster");
const detailKicker = document.getElementById("detailKicker");
const detailTitle = document.getElementById("detailTitle");
const detailOriginalTitle = document.getElementById("detailOriginalTitle");
const detailKp = document.getElementById("detailKp");
const detailImdb = document.getElementById("detailImdb");
const detailDirector = document.getElementById("detailDirector");
const detailYear = document.getElementById("detailYear");
const detailCountry = document.getElementById("detailCountry");
const detailDuration = document.getElementById("detailDuration");
const detailTags = document.getElementById("detailTags");
const detailDescription = document.getElementById("detailDescription");
const detailWatchButton = document.getElementById("detailWatchButton");
const roomsBrand = document.getElementById("roomsBrand");
const catalogPage = document.getElementById("catalogPage");
const catalogBack = document.getElementById("catalogBack");
const catalogBrand = document.getElementById("catalogBrand");
const catalogSearch = document.getElementById("catalogSearch");
const catalogGrid = document.getElementById("catalogGrid");
const catalogEmpty = document.getElementById("catalogEmpty");
const catalogCount = document.getElementById("catalogCount");
const catalogFilters = [
    document.getElementById("catalogType"),
    document.getElementById("catalogGenre"),
    document.getElementById("catalogYear"),
    document.getElementById("catalogSort")
];

// Mobile nav
const mobileRooms = document.getElementById("mobileRooms");
const mobileLogin = document.getElementById("mobileLogin");
const authModal = document.getElementById("authModal");
const authClose = document.getElementById("authClose");
const mobileNavItems = document.querySelectorAll(".mobile-nav-item");

// Auth
const authSwitch = document.getElementById("authSwitch");
const authTitle = document.getElementById("authTitle");
const authSubtitle = document.getElementById("authSubtitle");
const authPasswordConfirm = document.getElementById("authPasswordConfirm");
const authSubmit = document.getElementById("authSubmit");
let authRegisterMode = false;

// Quick actions
const quickCreate = document.getElementById("quickCreate");
const quickJoin = document.getElementById("quickJoin");
const openCatalog = document.getElementById("openCatalog");

// =====================================================
// SUPABASE
// =====================================================

const SUPABASE_URL = "https://eyeopuiomtuuebgidcow.supabase.co";
const SUPABASE_KEY = "sb_publishable_A7Px99MPvVcbQD-dlHsB-A_8DctMq9l";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// =====================================================
// AUTH
// =====================================================

const accountPage = document.getElementById("accountPage");
const accountBack = document.getElementById("accountBack");
const accountLogout = document.getElementById("accountLogout");
const accountEmail = document.getElementById("accountEmail");

if (authClose && authModal) {
    authClose.addEventListener("click", function () {
        authModal.classList.add("hidden");
    });
}

if (mobileLogin && authModal) {
    mobileLogin.addEventListener("click", function () {
        authModal.classList.remove("hidden");
    });
}

if (authSwitch && authTitle && authSubtitle && authPasswordConfirm && authSubmit) {
    authSwitch.addEventListener("click", function () {
        authRegisterMode = !authRegisterMode;

        if (authRegisterMode) {
            authTitle.textContent = "Создать аккаунт";
            authSubtitle.textContent = "Зарегистрируйтесь в VIBE";
            authPasswordConfirm.classList.remove("hidden");
            authSubmit.textContent = "Зарегистрироваться";
            authSwitch.textContent = "Войти";
        } else {
            authTitle.textContent = "С возвращением";
            authSubtitle.textContent = "Войдите в свой аккаунт VIBE";
            authPasswordConfirm.classList.add("hidden");
            authSubmit.textContent = "Войти";
            authSwitch.textContent = "Зарегистрироваться";
        }
    });
}

if (authSubmit) {
    authSubmit.addEventListener("click", async function () {
        const email = document.getElementById("authEmail").value.trim();
        const password = document.getElementById("authPassword").value;
        const passwordConfirm = document.getElementById("authPasswordConfirm").value;

        if (!email || !password) {
            alert("Введите email и пароль.");
            return;
        }

        if (authRegisterMode) {
            if (password !== passwordConfirm) {
                alert("Пароли не совпадают.");
                return;
            }
            if (password.length < 6) {
                alert("Пароль должен содержать минимум 6 символов.");
                return;
            }

            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: password
            });

            if (error) {
                alert(error.message);
                return;
            }

            if (data.user) {
                authModal.classList.add("hidden");
                accountPage.classList.remove("hidden");
                accountEmail.textContent = data.user.email;
            }
            return;
        }

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            alert(error.message);
            return;
        }

        if (data.user) {
            authModal.classList.add("hidden");
            accountPage.classList.remove("hidden");
            accountEmail.textContent = data.user.email;
        }
    });
}

if (accountBack && accountPage) {
    accountBack.addEventListener("click", function () {
        accountPage.classList.add("hidden");
    });
}

if (accountLogout) {
    accountLogout.addEventListener("click", async function () {
        await supabaseClient.auth.signOut();
        accountPage.classList.add("hidden");
    });
}

// =====================================================
// ROOMS PAGE
// =====================================================

function openRoomsPage() {
    if (roomModal) {
        roomModal.classList.remove("show");
        roomModal.setAttribute("aria-hidden", "true");
    }
    if (watchPage) watchPage.classList.add("hidden");
    if (detailPage) detailPage.classList.add("hidden");

    const homePage = document.getElementById("homePage");
    if (homePage) homePage.classList.add("hidden");
    if (catalogPage) catalogPage.classList.add("hidden");

    if (roomsPage) roomsPage.classList.remove("hidden");
    document.body.style.overflow = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function openCatalogPage() {
    if (roomModal) {
        roomModal.classList.remove("show");
        roomModal.setAttribute("aria-hidden", "true");
    }
    if (watchPage) watchPage.classList.add("hidden");
    if (detailPage) detailPage.classList.add("hidden");
    if (roomsPage) roomsPage.classList.add("hidden");

    const homePage = document.getElementById("homePage");
    if (homePage) homePage.classList.add("hidden");
    if (catalogPage) catalogPage.classList.remove("hidden");

    document.body.style.overflow = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
    applyCatalogFilters();
}

const movieDetails = {
    "Человек-паук: Новый день": {
        original: "Spider-Man: Brand New Day",
        poster: "poster-1",
        type: "ФИЛЬМ",
        kp: "8.0",
        imdb: "8.1",
        director: "Дестин Дэниел Креттон",
        year: "2026",
        country: "США, Великобритания, Германия, Канада",
        duration: "2 ч 30 м",
        tags: ["фантастика", "приключения", "боевик"],
        description: "Одинокий и повзрослевший Питер Паркер полностью посвящает себя борьбе с преступностью в Нью-Йорке, поскольку 4 года назад после заклинания Доктора Стрэнджа мир и все близкие забыли его. Теперь ему приходится заново определить, кем он хочет быть, пока новая угроза проверяет на прочность его силу, выдержку и обещание защищать город."
    },
    "Одиссея": {
        original: "The Odyssey",
        poster: "poster-2",
        type: "ФИЛЬМ",
        kp: "8.2",
        imdb: "8.4",
        director: "Кристофер Нолан",
        year: "2026",
        country: "США",
        duration: "2 ч 40 м",
        tags: ["приключения", "драма"],
        description: "Большое путешествие героя домой, где миф, море и испытания превращаются в историю о верности, времени и цене возвращения. На пути его ждут загадочные острова, древние враги и испытания, которые заставляют героя сражаться не только за дом, но и за право вернуться к тем, кого он любит."
    },
    "Тёмный рыцарь": {
        original: "The Dark Knight",
        poster: "poster-3",
        type: "ФИЛЬМ",
        kp: "7.9",
        imdb: "8.0",
        director: "Кристофер Нолан",
        year: "2008",
        country: "США, Великобритания",
        duration: "2 ч 32 м",
        tags: ["боевик", "драма", "криминал"],
        description: "Бэтмен вступает в противостояние с противником, который проверит на прочность весь город и его собственные правила. Пока Готэм погружается в хаос, герой вынужден выбирать между местью и ответственностью, а граница между справедливостью и страхом становится всё тоньше."
    },
    "Интерстеллар": {
        original: "Interstellar",
        poster: "poster-4",
        type: "ФИЛЬМ",
        kp: "8.5",
        imdb: "8.7",
        director: "Кристофер Нолан",
        year: "2014",
        country: "США, Великобритания, Канада",
        duration: "2 ч 49 м",
        tags: ["фантастика", "драма", "приключения"],
        description: "Команда исследователей отправляется через червоточину в поисках нового дома для человечества, оставляя позади самое дорогое. За пределами Солнечной системы их ждут неизвестные миры, искажение времени и выбор, от которого зависит будущее всей цивилизации."
    },
    "1+1": {
        original: "Intouchables",
        poster: "poster-5",
        type: "ФИЛЬМ",
        kp: "8.9",
        imdb: "8.5",
        director: "Оливье Накаш, Эрик Толедано",
        year: "2011",
        country: "Франция",
        duration: "1 ч 52 м",
        tags: ["комедия", "драма"],
        description: "Неожиданная дружба двух людей из совершенно разных миров меняет их жизнь и возвращает каждому вкус к настоящему моменту. Уход за богатым аристократом становится для бывшего заключённого неожиданным шансом начать всё заново, а их ежедневные приключения постепенно превращаются в настоящую взаимную поддержку."
    },
    "Громовержцы": {
        original: "Thunderbolts*",
        poster: "poster-1",
        type: "ФИЛЬМ",
        kp: "8.3",
        imdb: "8.2",
        director: "Джейк Шрейер",
        year: "2026",
        country: "США",
        duration: "2 ч 6 м",
        tags: ["боевик", "фантастика"],
        description: "Команда необычных героев получает опасное задание и вынуждена научиться действовать вместе, несмотря на взаимное недоверие. Каждый из них привык работать один и скрывать прошлое, но теперь только совместные решения помогут пережить миссию и доказать, что из сложных людей тоже может получиться команда."
    }
};

function openMovieDetails(title) {
    const details = movieDetails[title] || movieDetails["Человек-паук: Новый день"];
    if (!detailPage) return;

    if (homePage) homePage.classList.add("hidden");
    if (catalogPage) catalogPage.classList.add("hidden");
    if (roomsPage) roomsPage.classList.add("hidden");
    if (watchPage) watchPage.classList.add("hidden");
    if (roomModal) roomModal.classList.remove("show");

    detailPage.classList.remove("hidden");
    detailPage.dataset.poster = details.poster;
    detailTitle.textContent = title;
    detailOriginalTitle.textContent = details.original;
    detailKicker.textContent = details.type;
    detailKp.textContent = details.kp;
    detailImdb.textContent = details.imdb;
    detailDirector.textContent = details.director;
    detailYear.textContent = details.year;
    detailCountry.textContent = details.country;
    detailDuration.textContent = details.duration;
    detailDescription.textContent = details.description;
    detailPoster.className = "detail-poster " + details.poster;
    detailTags.innerHTML = details.tags.map(function (tag) {
        return "<span>" + tag + "</span>";
    }).join("");
    document.title = "VIBE — " + title;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeMovieDetails() {
    if (detailPage) detailPage.classList.add("hidden");
    if (homePage) homePage.classList.remove("hidden");
    document.title = "VIBE — Смотри вместе";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeCatalogPage() {
    if (catalogPage) catalogPage.classList.add("hidden");

    const homePage = document.getElementById("homePage");
    if (homePage) homePage.classList.remove("hidden");

    document.body.style.overflow = "";
    document.title = "VIBE — Смотри вместе";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeRoomsPage() {
    if (roomsPage) roomsPage.classList.add("hidden");

    const homePage = document.getElementById("homePage");
    if (homePage) homePage.classList.remove("hidden");

    document.body.style.overflow = "";
    document.title = "VIBE — Смотри вместе";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// =====================================================
// MAIN BUTTONS
// =====================================================

// "Смотреть" на featured → открыть комнаты
if (createRoomHero) {
    createRoomHero.addEventListener("click", openRoomsPage);
}

// "Подробнее" → открыть страницу фильма
if (joinRoomHero) {
    joinRoomHero.addEventListener("click", function () {
        openMovieDetails("Человек-паук: Новый день");
    });
}

if (detailBack) detailBack.addEventListener("click", closeMovieDetails);
if (detailBrand) detailBrand.addEventListener("click", function (event) {
    event.preventDefault();
    closeMovieDetails();
});
if (roomsBrand) roomsBrand.addEventListener("click", function (event) {
    event.preventDefault();
    closeRoomsPage();
});
if (detailWatchButton) detailWatchButton.addEventListener("click", openRoomsPage);

document.querySelectorAll(".movie-card, .catalog-card").forEach(function (card) {
    const titleElement = card.querySelector(".movie-title, h2");
    if (!titleElement) return;
    card.addEventListener("click", function () {
        openMovieDetails(titleElement.textContent.trim());
    });
});

// Quick actions
if (quickCreate) {
    quickCreate.addEventListener("click", openRoomsPage);
}

if (quickJoin) {
    quickJoin.addEventListener("click", openRoomsPage);
}

if (openCatalog) {
    openCatalog.addEventListener("click", function () {
        openCatalogPage();
    });
}

if (catalogBack) {
    catalogBack.addEventListener("click", closeCatalogPage);
}

function applyCatalogFilters() {
    if (!catalogGrid) return;

    const type = document.getElementById("catalogType");
    const genre = document.getElementById("catalogGenre");
    const year = document.getElementById("catalogYear");
    const sort = document.getElementById("catalogSort");
    const searchQuery = catalogSearch ? catalogSearch.value.trim().toLowerCase() : "";
    const cards = Array.from(catalogGrid.querySelectorAll(".catalog-card"));

    cards.forEach(function (card) {
        const matchesType = !type || type.value === "all" || card.dataset.type === type.value;
        const matchesGenre = !genre || genre.value === "all" || card.dataset.genre === genre.value;
        const matchesYear = !year || year.value === "all" || card.dataset.year === year.value;
        const matchesSearch = !searchQuery || card.querySelector("h2").textContent.toLowerCase().includes(searchQuery);
        card.hidden = !(matchesType && matchesGenre && matchesYear && matchesSearch);
    });

    cards.sort(function (first, second) {
        if (sort && sort.value === "rating") return Number(second.dataset.rating) - Number(first.dataset.rating);
        if (sort && sort.value === "newest") return Number(second.dataset.year) - Number(first.dataset.year);
        return Number(first.dataset.popularity) - Number(second.dataset.popularity);
    });
    cards.forEach(function (card) { catalogGrid.appendChild(card); });

    const visibleCount = cards.filter(function (card) { return !card.hidden; }).length;
    if (catalogCount) catalogCount.textContent = visibleCount + " " + (visibleCount === 1 ? "фильм" : "фильмов");
    if (catalogEmpty) catalogEmpty.classList.toggle("hidden", visibleCount > 0);
}

catalogFilters.forEach(function (filter) {
    if (filter) filter.addEventListener("change", applyCatalogFilters);
});

if (catalogSearch) {
    catalogSearch.addEventListener("input", applyCatalogFilters);
}

if (catalogBrand) {
    catalogBrand.addEventListener("click", function (event) {
        event.preventDefault();
        closeCatalogPage();
    });
}

// =====================================================
// CREATE ROOM MODAL
// =====================================================

function openRoomModal() {
    if (!roomModal) return;
    roomModal.classList.add("show");
    roomModal.setAttribute("aria-hidden", "false");
    resetRoomModal();
}

if (roomsCreateButton) {
    roomsCreateButton.addEventListener("click", openRoomModal);
}

function closeRoomModal() {
    if (!roomModal) return;
    roomModal.classList.remove("show");
    roomModal.setAttribute("aria-hidden", "true");
}

if (closeModal) {
    closeModal.addEventListener("click", closeRoomModal);
}

if (roomModal) {
    roomModal.addEventListener("click", function (event) {
        if (event.target === roomModal) closeRoomModal();
    });
}

function resetRoomModal() {
    selectedPlatform = "";
    if (roomStepPlatform) roomStepPlatform.classList.remove("hidden");
    if (roomStepVideo) roomStepVideo.classList.add("hidden");
    if (roomStepReady) roomStepReady.classList.add("hidden");

    platforms.forEach(function (platform) {
        platform.classList.remove("selected");
    });

    if (videoUrl) videoUrl.value = "";
    if (roomName) roomName.value = "";
    if (urlError) urlError.textContent = "";
}

// =====================================================
// PLATFORM SELECT
// =====================================================

platforms.forEach(function (platform) {
    platform.addEventListener("click", function () {
        selectedPlatform = platform.dataset.platform;

        platforms.forEach(function (item) {
            item.classList.remove("selected");
        });
        platform.classList.add("selected");

        if (roomStepPlatform) roomStepPlatform.classList.add("hidden");
        if (roomStepVideo) roomStepVideo.classList.remove("hidden");
        updatePlatformDescription();
    });
});

function updatePlatformDescription() {
    if (!platformDescription) return;

    if (selectedPlatform === "youtube") {
        platformDescription.textContent = "Найдите фильм или видео на YouTube и вставьте ссылку сюда.";
    } else if (selectedPlatform === "vk") {
        platformDescription.textContent = "Найдите фильм или видео в VK Видео и вставьте ссылку сюда.";
    } else if (selectedPlatform === "rutube") {
        platformDescription.textContent = "Найдите фильм или видео на RUTUBE и вставьте ссылку сюда.";
    } else {
        platformDescription.textContent = "Найдите видео и вставьте его ссылку.";
    }
}

if (openPlatform) {
    openPlatform.addEventListener("click", function () {
        let url = "";
        if (selectedPlatform === "youtube") url = "https://www.youtube.com/";
        if (selectedPlatform === "vk") url = "https://vk.com/video";
        if (selectedPlatform === "rutube") url = "https://rutube.ru/";
        if (url) window.open(url, "_blank", "noopener,noreferrer");
    });
}

if (backToPlatforms) {
    backToPlatforms.addEventListener("click", function () {
        selectedPlatform = "";
        if (roomStepVideo) roomStepVideo.classList.add("hidden");
        if (roomStepPlatform) roomStepPlatform.classList.remove("hidden");
        platforms.forEach(function (platform) {
            platform.classList.remove("selected");
        });
        if (urlError) urlError.textContent = "";
    });
}

// =====================================================
// VALIDATE & CREATE ROOM
// =====================================================

function validateVideoUrl(url) {
    try {
        const parsed = new URL(url);
        const host = parsed.hostname.toLowerCase();

        if (selectedPlatform === "youtube") {
            return (
                host === "youtube.com" ||
                host === "www.youtube.com" ||
                host === "m.youtube.com" ||
                host === "youtu.be" ||
                host === "www.youtu.be"
            );
        }
        if (selectedPlatform === "vk") {
            return (
                host === "vk.com" ||
                host.endsWith(".vk.com") ||
                host === "vkvideo.ru" ||
                host.endsWith(".vkvideo.ru")
            );
        }
        if (selectedPlatform === "rutube") {
            return host === "rutube.ru" || host.endsWith(".rutube.ru");
        }
        return false;
    } catch (error) {
        return false;
    }
}

function getYouTubeVideoId(url) {
    try {
        const parsed = new URL(url);
        const host = parsed.hostname.toLowerCase();

        if (
            (host === "youtube.com" || host === "www.youtube.com" || host === "m.youtube.com") &&
            parsed.searchParams.get("v")
        ) {
            return parsed.searchParams.get("v");
        }
        if (host === "youtu.be" || host === "www.youtu.be") {
            return parsed.pathname.replace(/^\/+/, "").split("/")[0];
        }
        if (host.includes("youtube.com") && parsed.pathname.startsWith("/shorts/")) {
            return parsed.pathname.split("/")[2];
        }
        if (host.includes("youtube.com") && parsed.pathname.startsWith("/embed/")) {
            return parsed.pathname.split("/")[2];
        }
    } catch (error) {
        console.error("VIBE YouTube URL error:", error);
    }
    return null;
}

function generateRoomCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "VIBE-";
    for (let i = 0; i < 4; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

function getPlatformName(platform) {
    if (platform === "youtube") return "YouTube";
    if (platform === "vk") return "VK Видео";
    if (platform === "rutube") return "RUTUBE";
    return "Видео";
}

if (createRoomFinal) {
    createRoomFinal.addEventListener("click", function () {
        const url = videoUrl ? videoUrl.value.trim() : "";
        const name = roomName && roomName.value.trim() ? roomName.value.trim() : "Вечер кино";

        if (!selectedPlatform) {
            if (urlError) urlError.textContent = "Сначала выберите сервис.";
            return;
        }
        if (!url) {
            if (urlError) urlError.textContent = "Вставьте ссылку на видео.";
            return;
        }
        if (!validateVideoUrl(url)) {
            if (urlError) urlError.textContent = "Ссылка не соответствует выбранному сервису.";
            return;
        }

        currentRoom = generateRoomCode();
        currentVideoUrl = url;
        currentRoomName = name;

        const roomData = {
            code: currentRoom,
            platform: selectedPlatform,
            videoUrl: currentVideoUrl,
            name: currentRoomName,
            createdAt: Date.now()
        };

        localStorage.setItem("vibe_room_" + currentRoom, JSON.stringify(roomData));

        if (generatedRoomCode) generatedRoomCode.textContent = currentRoom;
        if (createdRoomName) createdRoomName.textContent = currentRoomName;
        if (createdPlatform) createdPlatform.textContent = getPlatformName(selectedPlatform);

        if (roomStepVideo) roomStepVideo.classList.add("hidden");
        if (roomStepReady) roomStepReady.classList.remove("hidden");
    });
}

if (copyRoomCode) {
    copyRoomCode.addEventListener("click", async function () {
        if (!currentRoom) return;
        try {
            await navigator.clipboard.writeText(currentRoom);
            copyRoomCode.textContent = "Скопировано ✓";
            setTimeout(function () {
                copyRoomCode.textContent = "Копировать";
            }, 1800);
        } catch (error) {
            prompt("Скопируйте код комнаты:", currentRoom);
        }
    });
}

if (enterRoom) {
    enterRoom.addEventListener("click", function () {
        closeRoomModal();
        openWatchRoom();
    });
}

function getRoomLink() {
    if (!currentRoom) return "";
    return window.location.origin + window.location.pathname + "?room=" + encodeURIComponent(currentRoom);
}

// =====================================================
// OPEN WATCH ROOM
// =====================================================

function openWatchRoom() {
    if (!watchPage) {
        console.error("VIBE: watchPage не найден.");
        return;
    }

    const homePage = document.getElementById("homePage");
    if (homePage) homePage.classList.add("hidden");
    if (roomsPage) roomsPage.classList.add("hidden");
    if (catalogPage) catalogPage.classList.add("hidden");
    if (detailPage) detailPage.classList.add("hidden");

    watchPage.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    if (watchRoomCode) watchRoomCode.textContent = currentRoom;
    if (watchTitle) watchTitle.textContent = currentRoomName || "Вечер кино";
    if (watchPlatform) watchPlatform.textContent = getPlatformName(selectedPlatform);

    document.title = "VIBE — " + (currentRoomName || "Комната");
    addSystemMessage("Вы вошли в комнату.");

    if (selectedPlatform === "youtube") {
        const youtubeId = getYouTubeVideoId(currentVideoUrl);
        if (!youtubeId) {
            showVideoError("Не удалось определить YouTube-видео.");
            return;
        }
        loadYouTubeVideo(youtubeId);
        return;
    }

    showVideoMessage("Этот сервис подключим следующим этапом.");
}

function loadYouTubeVideo(videoId) {
    const placeholder = document.querySelector(".video-placeholder");
    if (!placeholder) {
        console.error("VIBE: .video-placeholder не найден.");
        return;
    }
    if (!videoId) {
        showVideoError("Не удалось определить YouTube-видео.");
        return;
    }

    placeholder.innerHTML = "";
    placeholder.style.position = "relative";
    placeholder.style.overflow = "hidden";

    const iframe = document.createElement("iframe");
    const origin = encodeURIComponent(window.location.origin);

    iframe.src =
        "https://www.youtube.com/embed/" +
        encodeURIComponent(videoId) +
        "?autoplay=0&controls=1&rel=0&playsinline=1&enablejsapi=1&origin=" +
        origin;

    iframe.title = "VIBE — YouTube";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;border:0;display:block;";

    placeholder.appendChild(iframe);
}

function showVideoMessage(text) {
    const placeholder = document.querySelector(".video-placeholder");
    if (!placeholder) return;

    placeholder.innerHTML = "";
    const logo = document.createElement("div");
    logo.className = "video-v";
    logo.textContent = "V";

    const title = document.createElement("div");
    title.className = "video-placeholder-title";
    title.textContent = "VIBE";

    const message = document.createElement("div");
    message.className = "video-placeholder-text";
    message.textContent = text;

    placeholder.appendChild(logo);
    placeholder.appendChild(title);
    placeholder.appendChild(message);
}

function showVideoError(text) {
    showVideoMessage(text);
}

// =====================================================
// JOIN ROOM
// =====================================================

function askJoinRoom() {
    const code = prompt("Введите код комнаты VIBE:");
    if (!code) return;

    const cleanCode = code.trim().toUpperCase();
    const savedRoom = localStorage.getItem("vibe_room_" + cleanCode);

    if (!savedRoom) {
        alert("Комната " + cleanCode + " не найдена.");
        return;
    }

    try {
        const room = JSON.parse(savedRoom);
        currentRoom = room.code;
        selectedPlatform = room.platform;
        currentVideoUrl = room.videoUrl;
        currentRoomName = room.name || "Вечер кино";
        openWatchRoom();
    } catch (error) {
        console.error("VIBE room error:", error);
        alert("Не удалось открыть комнату.");
    }
}

// =====================================================
// BACK HOME
// =====================================================

if (backHome) {
    backHome.addEventListener("click", function () {
        if (watchPage) watchPage.classList.add("hidden");
        if (roomsPage) roomsPage.classList.add("hidden");

        const homePage = document.getElementById("homePage");
        if (homePage) homePage.classList.remove("hidden");

        document.body.style.overflow = "";
        document.title = "VIBE — Смотри вместе";
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// =====================================================
// SHARE
// =====================================================

if (inviteButton) {
    inviteButton.addEventListener("click", async function () {
        const link = getRoomLink();
        const text = "Присоединяйся к моей комнате VIBE!\n\n" + link;

        try {
            await navigator.clipboard.writeText(text);
            inviteButton.textContent = "Ссылка скопирована ✓";
            setTimeout(function () {
                inviteButton.textContent = "Поделиться";
            }, 1800);
        } catch (error) {
            prompt("Скопируйте ссылку:", link);
        }
    });
}

// =====================================================
// CHAT
// =====================================================

if (chatForm) {
    chatForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!chatInput) return;

        const text = chatInput.value.trim();
        if (!text) return;

        addChatMessage("Вы", text);
        chatInput.value = "";
    });
}

function addChatMessage(username, text) {
    if (!chatMessages) return;

    const message = document.createElement("div");
    message.className = "chat-message";

    const avatar = document.createElement("div");
    avatar.className = "chat-avatar";
    avatar.textContent = username === "Вы" ? "В" : username.charAt(0).toUpperCase();

    const content = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = username;
    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    content.appendChild(name);
    content.appendChild(paragraph);
    message.appendChild(avatar);
    message.appendChild(content);
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addSystemMessage(text) {
    addChatMessage("VIBE", text);
}

// =====================================================
// PLAY BUTTON
// =====================================================

function focusVideo() {
    const iframe = document.querySelector(".video-player iframe");
    if (iframe) {
        iframe.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

if (playButton) playButton.addEventListener("click", focusVideo);
if (playerPlay) playerPlay.addEventListener("click", focusVideo);

// =====================================================
// ROOMS PAGE — BACK & JOIN BY LINK
// =====================================================

if (roomsBack) {
    roomsBack.addEventListener("click", closeRoomsPage);
}

if (roomLinkButton) {
    roomLinkButton.addEventListener("click", function () {
        if (!roomLinkInput) return;

        const value = roomLinkInput.value.trim();
        if (roomLinkError) roomLinkError.classList.add("hidden");

        if (!value) {
            if (roomLinkError) {
                roomLinkError.textContent = "Вставьте ссылку на комнату.";
                roomLinkError.classList.remove("hidden");
            }
            return;
        }

        let roomCode = "";
        try {
            const url = new URL(value);
            roomCode = url.searchParams.get("room") || url.searchParams.get("code") || "";
        } catch (error) {
            roomCode = value;
        }

        roomCode = roomCode.trim().toUpperCase();

        if (!roomCode && /^VIBE-[A-Z0-9]+$/i.test(value)) {
            roomCode = value.trim().toUpperCase();
        }

        if (!roomCode) {
            if (roomLinkError) {
                roomLinkError.textContent = "Неверная ссылка на комнату.";
                roomLinkError.classList.remove("hidden");
            }
            return;
        }

        const roomKey = "vibe_room_" + roomCode;
        const roomData = localStorage.getItem(roomKey);

        if (!roomData) {
            if (roomLinkError) {
                roomLinkError.textContent = "Комната не найдена. Проверьте ссылку.";
                roomLinkError.classList.remove("hidden");
            }
            return;
        }

        try {
            const room = JSON.parse(roomData);
            currentRoom = room.code;
            currentVideoUrl = room.videoUrl;
            currentRoomName = room.name || "Вечер кино";
            selectedPlatform = room.platform;
            openWatchRoom();
        } catch (error) {
            console.error("VIBE link error:", error);
            if (roomLinkError) {
                roomLinkError.textContent = "Не удалось открыть комнату.";
                roomLinkError.classList.remove("hidden");
            }
        }
    });
}

// =====================================================
// MOBILE NAVIGATION
// =====================================================

mobileNavItems.forEach(function (item) {
    item.addEventListener("click", function () {
        mobileNavItems.forEach(function (nav) {
            nav.classList.remove("active");
        });
        item.classList.add("active");

        const nav = item.dataset.nav;

        if (nav === "home") {
            closeMovieDetails();
            closeCatalogPage();
            closeRoomsPage();
            return;
        }

        if (nav === "catalog") {
            openCatalogPage();
            return;
        }

        if (nav === "rooms") {
            openRoomsPage();
            return;
        }

        if (nav === "news") {
            // Заглушка для новостей
            alert("Раздел «Новости» скоро появится!");
            return;
        }

        if (nav === "login") {
            if (authModal) authModal.classList.remove("hidden");
        }
    });
});

// =====================================================
// AUTO OPEN ROOM FROM URL
// =====================================================

function openRoomFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const roomCode = params.get("room");
    if (!roomCode) return;

    const cleanCode = roomCode.trim().toUpperCase();
    const roomData = localStorage.getItem("vibe_room_" + cleanCode);
    if (!roomData) return;

    try {
        const room = JSON.parse(roomData);
        currentRoom = room.code;
        selectedPlatform = room.platform;
        currentVideoUrl = room.videoUrl;
        currentRoomName = room.name || "Вечер кино";
        openWatchRoom();
    } catch (error) {
        console.error("VIBE URL room error:", error);
    }
}

// =====================================================
// ESC
// =====================================================

document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;

    if (watchPage && !watchPage.classList.contains("hidden")) {
        if (backHome) backHome.click();
    } else if (roomModal && roomModal.classList.contains("show")) {
        closeRoomModal();
    } else if (roomsPage && !roomsPage.classList.contains("hidden")) {
        closeRoomsPage();
    } else if (catalogPage && !catalogPage.classList.contains("hidden")) {
        closeCatalogPage();
    }
});



// =====================================================
// START
// =====================================================



openRoomFromUrl();
console.log("VIBE успешно запущен.");