// selection for  regForm
let regForm = document.getElementById('registration')
let nameInput = document.getElementById('name')
let surnameInput = document.getElementById('surname')
let shadeInput = document.getElementById('shade')
let users = []
// selection for madalForm
let modalContainer = document.getElementById('modalContainer')
let modalForm = document.getElementById('modal')
let nameEditeInput = document.getElementById('nameEdite')
let surnameEditeInput = document.getElementById('surnameEdite')
let shadeEditeInput = document.getElementById('shadeEdite')
let closeModalBtn = document.getElementById('closeModal')

//selector for error
let nameError = document.getElementById('nameError')
let surnameError = document.getElementById('surnameError')
let shadeError = document.getElementById('shadeError')

// selection for table
let liderBordTable = document.getElementById('liderBord')

regForm.addEventListener('submit', function (event) {
	event.preventDefault();
	// testUser funksiyasi ichkariga kiritilgan malumotni bosh emasligiga tekshiradi va bosh bolmasa creat funksiyasini ishga tushuradi
	testUser(
		nameInput,
		surnameInput,
		shadeInput,
		nameError,
		surnameError,
		shadeError,
		users
	)
})

function testUser(name, surname, shade, nameEr, surnameEr, shadeEr, usersArr) {
	let count = 0
	if (name.value.trim() == '') {
		nameEr.innerHTML = 'Ism sorovini toldiring'
	} else {
		count++
		nameEr.innerHTML = ''
	}
	if (surname.value.trim() == '') {
		surnameEr.innerHTML = 'Familya sorovini toldiring'
	} else {
		count++
		surnameEr.innerHTML = ''
	}
	if (shade.value.trim() == '') {
		shadeEr.innerHTML = "<p class= 'mt-[20px]'>Baho sorovini toldiring</p>"
	} else {
		count++
		shadeEr.innerHTML = ''
	}
	if (count == 3) {
		create(usersArr, name, surname, shade)
	}
}

function creatID(usersID) {
	if (!usersID.length) {
		return 1
	} else {
		return usersID[usersID.length - 1].id + 1
	}
}

function create(user, name, surname, shade) {
	user.push({
		id: creatID(users),
		name: name.value,
		surname: surname.value,
		shade: shade.value,
	})

	localStorage.setItem('users', JSON.stringify(user));
}
;(function () {
	users = JSON.parse(localStorage.getItem('users'))
		? JSON.parse(localStorage.getItem('users'))
		: []
})()


window.addEventListener('storage', event => {
	if (event.key === 'users') {
		location.reload()
	}
})

