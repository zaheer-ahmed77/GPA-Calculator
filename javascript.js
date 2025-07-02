window.addEventListener('DOMContentLoaded', function () {
  function toggleVisibility(semesterId) {
    const semester = document.getElementById(semesterId);
    const button = semester.querySelector('button');
    const courses = semester.querySelectorAll('.course');
    courses.forEach(course => course.classList.toggle('hidden'));
    button.innerText = button.innerText === 'See more' ? 'See less' : 'See more';
  }

  function resetSemester(semesterId) {
    const courses = document.querySelectorAll(`#${semesterId} .course input.grade`);
    courses.forEach(course => {
      course.value = '';
    });
  }

  function resetAll() {
    const courses = document.querySelectorAll('.course input.grade');
    courses.forEach(course => {
      course.value = '';
    });
    const resultDiv = document.getElementById('result');
    if (resultDiv) resultDiv.innerText = '';
  }

  function calculateGradePoints(grade) {
    switch (grade.toUpperCase()) {
      case 'A+': return 4.0;
      case 'A': return 3.5;
      case 'B+': return 3.0;
      case 'B': return 2.5;
      case 'C+': return 2.0;
      case 'C': return 1.5;
      case 'C-': return 1.0;
      case 'D': return 0.5;
      case 'F': return 0.0;
      default: return 0.0;
    }
  }

  function setupSemesterGpaCalc(semesterId) {
    const button = document.getElementById(`calculateSemester${semesterId}`);
    if (!button) return;

    button.addEventListener('click', function () {
      const inputs = document.querySelectorAll(`#semester${semesterId} .course input.grade`);
      let totalPoints = 0, totalCredits = 0;

      inputs.forEach(input => {
        const grade = input.value.trim();
        const credit = parseFloat(input.getAttribute('data-credit-hours'));
        if (grade && !isNaN(credit)) {
          totalPoints += calculateGradePoints(grade) * credit;
          totalCredits += credit;
        }
      });

      const gpa = totalPoints / totalCredits || 0;
      alert(`Your GPA for Semester ${semesterId} is: ${gpa.toFixed(2)}`);
    });
  }

  // Setup all semesters (1–8)
  for (let i = 1; i <= 8; i++) {
    setupSemesterGpaCalc(i);
  }

  const calculateBtn = document.getElementById('calculate');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', function () {
      const inputs = document.querySelectorAll('.course input.grade');
      let totalPoints = 0, totalCredits = 0;

      inputs.forEach(input => {
        const grade = input.value.trim();
        const credit = parseFloat(input.getAttribute('data-credit-hours'));
        if (grade && !isNaN(credit)) {
          totalPoints += calculateGradePoints(grade) * credit;
          totalCredits += credit;
        }
      });

      const gpa = totalPoints / totalCredits || 0;
      document.getElementById('result').innerText = `Your Overall GPA is: ${gpa.toFixed(2)}`;
      alert(`Your Overall GPA is: ${gpa.toFixed(2)}`);
    });
  }

  // Make required functions global so HTML buttons can call them
  window.toggleVisibility = toggleVisibility;
  window.resetSemester = resetSemester;
  window.resetAll = resetAll;
});
