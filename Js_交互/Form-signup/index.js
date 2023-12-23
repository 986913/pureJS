// <!-- 知识点： -->
// <!-- 1. input的pattern可用正则 -->
// <!-- 2. form的submit事件 和 button(type="submit")是很好的combo,   form的submit事件记得 e.preventDefault -->
// <!-- 3. const formdata = new FormData($form)的使用, formdata有一系列的方法可使用，常见的是formdata.get("name"), name refer to input name attr -->

/**
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

(() => {
  const $form = document.querySelector('form');
  const $passwordConfirmInput = document.getElementById(
    'password-confirm-input'
  );
  const $passwordMismatchError = document.getElementById(
    'password-mismatch-error'
  );

  $form.addEventListener('submit', async (event) => {
    event.preventDefault();
    // Reset the password confirm field.
    $passwordConfirmInput.removeAttribute('aria-invalid');
    $passwordMismatchError.classList.add('hidden');

    // Construct a FormData object based on form values.
    const formData = new FormData($form);
    const password = formData.get('password');
    const passwordConfirm = formData.get('password_confirm');

    // The only fields we cannot leverage the browser to validate
    // is the password confirmation, so we use JavaScript to achieve that.
    if (password !== passwordConfirm) {
      $passwordConfirmInput.setAttribute('aria-invalid', 'true');
      $passwordMismatchError.classList.remove('hidden');
      return;
    }

    await submitForm(
      formData.get('username'),
      formData.get('email'),
      formData.get('password'),
      formData.get('password_confirm')
    );
  });
})();
