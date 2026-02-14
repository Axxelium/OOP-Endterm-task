const API_URL = "http://localhost:8080/api";

// ЛОГИКА АВТОРИЗАЦИИ

//  Проверка при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const path = window.location.pathname;

    // Если мы на странице профиля, а юзера нет -> кидаем на главную
    if (path.includes("profile.html") && !user) {
        window.location.href = "index.html";
        alert("Please login first!");
        return;
    }

    // Если юзер есть, обновляем интерфейс (аватарку и имя)
    if (user) {
        updateUIForLoggedUser(user);
    }

    // Заполняем данные если мы на странице профиля
    if (path.includes("profile.html") && user) {
        fillProfilePage(user);
    }

    // Загрузка машин
    if (document.getElementById("vehicle-grid")) {
        loadVehicles();
    }
});

// Login
async function handleLogin(event) {
    event.preventDefault(); // Остановить перезагрузку формы

    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;
    const btn = event.target.querySelector("button");

    try {
        btn.innerHTML = '<div class="loader"></div>'; // Крутилка

        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: usernameInput, password: passwordInput })
        });

        if (response.ok) {
            const user = await response.json();
            // сохранение в браузера
            localStorage.setItem("user", JSON.stringify(user));

            window.location.href = "profile.html"; // Переходим в профиль
        } else {
            alert("Wrong username or password!");
        }
    } catch (error) {
        console.error(error);
        alert("Server error. Is Java running?");
    } finally {
        btn.innerText = "Sign In";
    }
}

// Logout
function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}

//  Обновление интерфейса (Меняем кнопку входа на аватарку)
function updateUIForLoggedUser(user) {
    // Находим все кнопки "Sign In" или иконки человечка
    const authButtons = document.querySelectorAll(".auth-btn");

    authButtons.forEach(btn => {
        // Меняем HTML внутри кнопки на аватарку
        btn.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-blue-600 border border-blue-400 flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                ${user.name[0]}${user.surname[0]}
            </div>
        `;
        // При клике теперь идем в профиль
        btn.onclick = () => window.location.href = "profile.html";
    });
}

// Заполнение страницы Профиля
function fillProfilePage(user) {
    // Ищем элементы по ID и вставляем текст
    safeSetText("profile-name", `${user.name} ${user.surname}`);
    safeSetText("profile-balance", `$ ${user.balance.toLocaleString()}`);
    safeSetText("profile-phone", user.number || "No number");
    safeSetText("profile-username", `@${user.username || "user"}`);

    // Аватарка с инициалами
    const avatarEl = document.getElementById("profile-avatar");
    if (avatarEl) {
        avatarEl.innerHTML = `<span class="text-3xl font-bold text-white">${user.name[0]}${user.surname[0]}</span>`;
    }
}

function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}



function openLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Блокируем скролл
    }
}

function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Возвращаем скролл
    }
}

// --- ПОЛУЧЕНИЕ КАРТИНКИ ПО НАЗВАНИЮ ---
function getCarImage(brand, model) {
    const name = (brand + " " + model).toLowerCase();

    // ПУТИ К КАРТИНКАМ
    if (name.includes("mercedes") || name.includes("s600") || name.includes("w140")) return "img/w140.jpg";
    if (name.includes("bmw") || name.includes("7")) return "img/bmw7.jpg";
    if (name.includes("toyota") || name.includes("camry")) return "img/camry.jpg";
    if (name.includes("rolls")) return "img/rolls.jpg";
    if (name.includes("truck") || name.includes("volvo")) return "img/truck.jpg";

    // Заглушка
    return "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2672&auto=format&fit=crop";
}

// --- ЗАГРУЗКА МАШИН  ---
async function loadVehicles() {
    const container = document.getElementById('vehicle-grid');
    if (!container) return; // Если мы не на странице магазина, выходим

    container.innerHTML = '<div class="text-white text-center col-span-full">Loading fleet data...</div>';

    try {
        const response = await fetch(`${API_URL}/vehicles`);
        const vehicles = await response.json();

        container.innerHTML = ''; // Очищаем

        if (vehicles.length === 0) {
            container.innerHTML = '<div class="text-gray-500 text-center col-span-full">Garage is empty.</div>';
            return;
        }

        vehicles.forEach(v => {
            const isRented = v.rentingStatus;
            const statusColor = isRented ? 'text-red-400 border-red-500/30' : 'text-green-400 border-green-500/30';
            const statusText = isRented ? 'Rented' : 'Available';
            const btnState = isRented ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(60,131,246,0.5)]';

            // Генерируем HTML карточки
            const cardHTML = `
            <article class="glass-panel rounded-xl overflow-hidden group hover:border-blue-500/50 transition-all duration-500">
                <div class="flex flex-col md:flex-row h-full">
                    <div class="w-full md:w-1/3 aspect-square md:aspect-auto relative overflow-hidden bg-gray-900">
                        <img src="${getCarImage(v.brand, v.model)}" 
                             class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div class="absolute top-4 left-4">
                            <span class="px-2 py-1 bg-black/50 backdrop-blur-sm border ${statusColor} rounded text-xs font-bold uppercase tracking-wider">
                                ${statusText}
                            </span>
                        </div>
                    </div>

                    <div class="w-full md:w-2/3 p-6 md:p-8 flex flex-col justify-between relative">
                        <div>
                            <div class="flex justify-between items-start mb-2">
                                <h3 class="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                    ${v.brand} ${v.model}
                                </h3>
                                <p class="text-gray-500 font-mono">ID: ${v.id}</p>
                            </div>
                            <p class="text-gray-400 text-sm mb-6">Premium Fleet Selection • Year ${v.year}</p>

                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div class="flex flex-col gap-1 p-3 rounded bg-white/5 border border-white/5">
                                    <span class="text-xs text-gray-500 uppercase">Year</span>
                                    <div class="flex items-center gap-1"><span class="material-icons text-blue-500 text-sm">calendar_today</span><span class="font-semibold text-white">${v.year}</span></div>
                                </div>
                                <div class="flex flex-col gap-1 p-3 rounded bg-white/5 border border-white/5">
                                    <span class="text-xs text-gray-500 uppercase">Type</span>
                                    <div class="flex items-center gap-1"><span class="material-icons text-blue-500 text-sm">directions_car</span><span class="font-semibold text-white">${v.seats ? 'Sedan' : 'Truck'}</span></div>
                                </div>
                                <div class="flex flex-col gap-1 p-3 rounded bg-white/5 border border-white/5">
                                    <span class="text-xs text-gray-500 uppercase">Rate</span>
                                    <div class="font-bold text-blue-400">${v.pricePerDay} ₸</div>
                                </div>
                            </div>
                        </div>

                        <div class="flex gap-4 mt-auto pt-6 border-t border-white/10">
                            <button onclick="alert('Booking for ID ${v.id}')" 
                                    class="flex-1 px-6 py-3 text-white rounded font-semibold transition-all duration-300 ${btnState}" ${isRented ? 'disabled' : ''}>
                                ${isRented ? 'Unavailable' : 'Rent Now'}
                            </button>
                        </div>
                    </div>
                </div>
            </article>
            `;
            container.innerHTML += cardHTML;
        });

    } catch (error) {
        console.error("Error fetching vehicles:", error);
        container.innerHTML = '<div class="text-red-500 text-center col-span-full">Error connecting to server. Is Java running?</div>';
    }
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadVehicles();
});