const calendarContainer = document.getElementById('calendar-container');
const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function getNoteKey(year, month, day) {
  return `note-${year}-${month + 1}-${day}`;
}

function createCalendar(year) {
  for (let m = 0; m < 12; m++) {
    const monthDiv = document.createElement('div');
    monthDiv.className = 'month';
    const monthTitle = document.createElement('h2');
    monthTitle.textContent = months[m];
    monthDiv.appendChild(monthTitle);

    const daysInMonth = new Date(year, m + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'day';
      dayDiv.textContent = d;

      const noteKey = getNoteKey(year, m, d);
      const savedNote = localStorage.getItem(noteKey);
      if (savedNote) {
        dayDiv.setAttribute('data-note', 'true');
        dayDiv.title = savedNote;
      }

      dayDiv.onclick = () => {
        const note = prompt(`Nota para ${d} de ${months[m]}:`, savedNote || "");
        if (note !== null) {
          if (note.trim() === "") {
            localStorage.removeItem(noteKey);
            dayDiv.removeAttribute('data-note');
            dayDiv.title = "";
          } else {
            localStorage.setItem(noteKey, note);
            dayDiv.setAttribute('data-note', 'true');
            dayDiv.title = note;
          }
        }
      };

      monthDiv.appendChild(dayDiv);
    }

    calendarContainer.appendChild(monthDiv);
  }
}

createCalendar(2025);
