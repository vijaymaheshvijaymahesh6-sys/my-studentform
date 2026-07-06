let students = JSON.parse(localStorage.getItem('students')) || []

function addStudent() {
    let name = document.getElementById('studentName').value
    if (name.trim() === '') {
        alert("Please Enter student name")
        return
    }
    students.push({ name, attendance: 'Absent' })
    console.log(students)
    localStorage.setItem('students', JSON.stringify(students))
    renderTable()
}

function markAttendance(index, status) {
    students[index].attendance = status
    localStorage.setItem('students', JSON.stringify(students))
    renderTable()
}
function editStudent(index) {
    let newName = prompt("Enter new", students[index].name)
    if (newName && newName.trim() !== "") {
        students[index].name = newName
        localStorage.setItem('students', JSON.stringify(students))
    }
    renderTable()
}

function removeAttendance(index) {
    if (confirm("Are you sure you want delete student")) {
        students.splice(index, 1)
        localStorage.setItem('students', JSON.stringify(students))
    }
    renderTable()
}

function renderTable() {
    const tableBody = document.getElementById('studentTable')
    tableBody.innerHTML = ''
    students.forEach((student, index) => {
        tableBody.innerHTML += `
        <tr>
        <td>${index + 1}</td>
        <td>${student.name}</td>
        <td>
       <button class="btn btn-success" onclick='markAttendance(${index},"Present")'>Present</button>
    <button class="btn btn-warning" onclick='markAttendance(${index},"Absent")'>Absent</button>
       </td>
       <td>
    <button class="btn btn-success" onclick='editStudent(${index})'>Edit</button>
    <button class="btn btn-danger" onclick='removeAttendance(${index})'>Delete</button>
       
       </td>
        </tr>`

    })
    updateSummary()
}   

function filterAttendance(status){
    let tableBody=document.getElementById('studentTable')
    tableBody.innerHTML=''
    students.filter(student=>student.attendance===status).forEach((student,index)=>{
        tableBody.innerHTML+=`
        <tr>
        <td>${index+1}</td>
        <td>${student.name}</td>
        <td>${student.attendance}</td>
        </tr>
        `
    })

}

function resetFilter(){
    renderTable()
}

function updateSummary(){
    document.getElementById('totalStudents').innerText=students.length
    document.getElementById('presentCount').innerHTML=students.filter(s=>s.attendance==='Present').length
    document.getElementById('absentCount').innerHTML=students.filter(s=>s.attendance==='Absent').length
}

function clearAll(){
    if(confirm("Are you sure clear all Data")){
        students=[]
        localStorage.removeItem('students')
        renderTable()
    }
}


