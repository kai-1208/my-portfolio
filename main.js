function toggleFingers() {
    const fingers = document.getElementById("fingers");
    fingers.parentElement.classList.toggle("show");
}

function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

document.addEventListener("DOMContentLoaded", () => {
    const ageElement = document.getElementById("age");
    const birthday = "2007-12-08";
    ageElement.textContent = calculateAge(birthday)+"歳";歳
});