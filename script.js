const userList = document.getElementById('user-list');
const searchInput = document.getElementById('search');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pageInfo = document.getElementById('page-info');

let currentPage = 1;
const usersPerPage = 5;
let users = [];

async function fetchUsers() {
    try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        users = data.users;
        renderUsers();
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

function renderUsers() {
    userList.innerHTML = '';
    const start = (currentPage - 1) * usersPerPage;
    const end = start + usersPerPage;
    const paginatedUsers = users.slice(start, end);

    paginatedUsers.forEach(function (user) {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML =
            '<img src="' + user.image + '" alt="' + user.firstName + ' ' + user.lastName + '">' +
            '<h2>' + user.firstName + ' ' + user.lastName + '</h2>' +
            '<p>Age: ' + user.age + '</p>' +
            '<p>Email: ' + user.email + '</p>' +
            '<p>Phone: ' + user.phone + '</p>';
        userList.appendChild(userCard);
    });

    pageInfo.textContent = 'Page ' + currentPage;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = end >= users.length;
}

function searchUsers() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredUsers = users.filter(function (user) {
        return (user.firstName + ' ' + user.lastName).toLowerCase().includes(searchTerm);
    });

    userList.innerHTML = '';
    filteredUsers.slice(0, usersPerPage).forEach(function (user) {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML =
            '<img src="' + user.image + '" alt="' + user.firstName + ' ' + user.lastName + '">' +
            '<h2>' + user.firstName + ' ' + user.lastName + '</h2>' +
            '<p>Age: ' + user.age + '</p>' +
            '<p>Email: ' + user.email + '</p>' +
            '<p>Phone: ' + user.phone + '</p>';
        userList.appendChild(userCard);
    });
}

searchInput.addEventListener('input', searchUsers);

prevButton.addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        renderUsers();
    }
});

nextButton.addEventListener('click', function () {
    if ((currentPage * usersPerPage) < users.length) {
        currentPage++;
        renderUsers();
    }
});

fetchUsers();
