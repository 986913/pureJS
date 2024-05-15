(() => {
  /***************************** Write your JS code here******************************************/

  const form = document.querySelector('form');
  const passwordConfirmInput = document.querySelector(
    '#password-confirm-input'
  );
  const passwordNotMatchErrHint = document.querySelector(
    '#password-mismatch-error'
  );
  const nameErrHint = document.querySelector('#name-error');

  /* 给form表单添加submit事件: 注意是async/await哦，因为submit data form是异步的 */
  form.addEventListener('submit', async (event) => {
    /* 1.  一定要记得e.preventDefault() */
    event.preventDefault();

    /* 2. Reset the error hints */
    passwordConfirmInput.removeAttribute('aria-invalid');
    nameErrHint.classList.add('hidden');
    passwordNotMatchErrHint.classList.add('hidden');

    /* 3. Get All Form Data, then validate some data before submit */
    const formData = new FormData(form);
    const name = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const passwordConfirm = formData.get('password_confirm');
    const isNameValid = (str) => /^[a-zA-Z0-9]+$/.test(str);
    if (!isNameValid(name)) {
      nameErrHint.classList.remove('hidden');
      return;
    }
    if (password !== passwordConfirm) {
      passwordConfirmInput.setAttribute('aria-invalid', 'true');
      passwordNotMatchErrHint.classList.remove('hidden');
      return;
    }

    /* 4. submit data to an url */
    await submitForm(name, email, password, passwordConfirm);

    /* 5. reset form all filed */
    form.reset();
  });
})();

/**
 * Helper function:
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {string} passwordConfirm
 */
async function submitForm(username, email, password, passwordConfirm) {
  try {
    const response = await fetch(
      'https://www.greatfrontend.com/api/questions/sign-up',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          password_confirm: passwordConfirm,
        }),
      }
    );
    const { message } = await response.json();
    alert(message);
  } catch (_) {
    alert('Error submitting form!');
  }
}
