const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// Об'єкт для зберігання даних форми
let formData = {
  email: '',
  message: '',
};

// Спроба завантажити дані з локального сховища
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    formData = JSON.parse(savedData);
    form.elements.email.value = formData.email || '';
    form.elements.message.value = formData.message || '';
  } catch (e) {
    console.error('Error parsing localStorage:', e);
  }
}

// Обробка події input
form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trimStart(); // не обрізай весь trim() — користувач може навмисно мати пробіл в середині
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// Обробка події submit
form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email.trim() || !message.trim()) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);

  // Очистити всі дані
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData = { email: '', message: '' };
});
