// selection for  regForm
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

console.log(users)
;(function () {
	users = JSON.parse(localStorage.getItem('users'))
		? JSON.parse(localStorage.getItem('users'))
		: []
	if (!Array.isArray(users)) {
		users = []
		localStorage.setItem('users', JSON.stringify(users))
	}
	read()
})()

function deleteUser(index) {
	users.splice(index, 1)
	localStorage.setItem('users', JSON.stringify(users))
	read()
}

window.addEventListener('storage', event => {
	if (event.key === 'users') {
		location.reload()
	}
})

function read() {
	liderBordTable.innerHTML = ''
	if (!Array.isArray(users) || users.length === 0) {
		return
	}
	users.forEach((obj, index) => {
		liderBordTable.innerHTML += `
			<tr class = "border-solid border-black">
					<td class ="px-[30px] text-center bg-red-300 py-[20px]">${index + 1}</td>
					<td class ="px-[30px] bg-orange-200 text-center">${obj.name}</td>
					<td class ="px-[30px] text-center bg-red-300">${obj.surname}</td>
					<td class ="px-[30px] bg-orange-200 text-center">${obj.shade}</td>
					<td class ="px-[30px] text-center bg-red-300">
					<button onclick="deleteUser(${index})">
						<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" 	class="bi bi-x-lg" viewBox="0 0 16 16">
  					<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
						</svg>
					</button></td>
					<td class ="px-[30px] bg-orange-200 text-center">
					<button onclick="editUser(${obj.id})">
					<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z"></path></svg>
					</button></td>
			</tr>
			`
	})
}

function editUser(index) {
	let updateUsers = users.find(object => {
		return object.id === index
	})

	openModal(updateUsers, index)
}
function openModal(userObj, index) {
	nameEditeInput.value = userObj.name
	surnameEditeInput.value = userObj.surname
	shadeEditeInput.value = userObj.shade
	modalForm.dataset.valueID = index
	modalContainer.classList.remove('scale-0')
}
closeModalBtn.addEventListener('click', function () {
	modalContainer.classList.add('scale-0')
})

modalForm.addEventListener('submit', function (event) {
	event.preventDefault()

	let updateID = modalForm.dataset.valueID

	testUser(
		nameEditeInput,
		surnameEditeInput,
		shadeEditeInput,
		nameError,
		surnameError,
		shadeError,
		updateID
	)
})

function update(index) {
	let newID = users.findIndex(obj => {
		return obj.id == index
	})
	users[newID].name = nameEditeInput.value
	users[newID].surname = surnameEditeInput.value
	users[newID].shade = shadeEditeInput.value
	localStorage.setItem('users', JSON.stringify(users))
	read()
	modalContainer.classList.add('scale-0')
}

function testUser(name, surname, shade, nameEr, surnameEr, shadeEr, updateID) {
	let nameset = ''
	let surnameSet = ''
	let ball = ''
	users.map(obj => {
		if (obj.id == updateID) {
			nameset = obj.name
			surnameSet = obj.surname
			ball = obj.shade
		}
	})
	let count = 0
	if (name.value.trim() == '' || nameset == name.value) {
		nameEr.innerHTML = 'Ism sorovini toldiring'
	} else {
		count++
		nameEr.innerHTML = ''
	}
	if (surname.value.trim() == '' || surnameSet == surname.value) {
		surnameEr.innerHTML = 'Familya sorovini toldiring'
	} else {
		count++
		surnameEr.innerHTML = ''
	}
	if (shade.value.trim() == '' || ball == shade.value) {
		shadeEr.innerHTML = "<p class= 'mt-[20px]'>Baho sorovini toldiring</p>"
	} else {
		count++
		shadeEr.innerHTML = ''
	}
	if (count == 3) {
		update(updateID)
	}
}
