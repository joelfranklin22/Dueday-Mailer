const form = document.getElementById("reminderForm");
const successMsg = document.getElementById("successMsg");
const submitBtn = document.getElementById("submitBtn");
const taskType = document.getElementById("type");
const taskName = document.getElementById("title");
const dateInput = document.getElementById("datetime");
const contactBox = document.getElementById("contactBox");
const mailAddress = document.getElementById("mailAddress");

const MY_EMAIL = "joeljeyam22@gmai.com";

mailAddress.textContent = MY_EMAIL;

const today = new Date().toISOString().split("T")[0];
dateInput.min = today;

const placeholders = {
  "🧾 Bill Payment": "e.g. Water Bill, Semester Fees",
  "📚 Study Task": "e.g. Complete Chapter 5, Revise Physics",
  "🏢 Work/Office Task": "e.g. Finish Report, Attend Team Meeting",
  "🛒 Personal Errands": "e.g. Grocery Shopping, Buy Medicines",
  "💬 Call/Message Someone": "e.g. Call Mom, Message Boss",
  "⏳ Project Deadline": "e.g. Submit Website Project",
  "🧘 Self-Care / Habits": "e.g. 30-min Meditation, Morning Walk",
  "💼 Appointments": "e.g. Doctor at 10am, Dentist Visit",
};

taskType.addEventListener("change", () => {
  const selected = taskType.value;
  taskName.placeholder = placeholders[selected] || "e.g. Task name";
});

function showMessage(text, isError) {
  successMsg.textContent = text;
  successMsg.classList.toggle("error", isError);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    task_type: taskType.value,
    task_name: taskName.value,
    due_datetime: dateInput.value,
    email: document.getElementById("email").value,
    reminder_message: document.getElementById("message").value,
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Saving...";
  showMessage("", false);
  contactBox.hidden = true;

  try {
    const webhookURL =
      "https://4ecc9f0e7db7868ea6e10ba74fa07786.n8n.selfmade.codes/webhook-test/Remainder_Task";

    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const text = await response.text();
      showMessage(text, false);
      form.reset();
      taskName.placeholder = "e.g. Task name";
    } else {
      showMessage("Could not save the reminder.", true);
      contactBox.hidden = false;
    }
  } catch (error) {
    console.error("Error:", error);
    showMessage("Could not reach the server.", true);
    contactBox.hidden = false;
  }

  submitBtn.disabled = false;
  submitBtn.textContent = "Set reminder";
});
