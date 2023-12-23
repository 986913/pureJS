/*
  知识点：
  
  1. input的pattern可用正则

  2. 🟢需JS配合的组合: 
      🟢form的submit事件 和 button(type="submit")是很好的combo,🟢 
      form的submit事件记得要e.preventDefault(), 因为默认情况下，表单提交后页面会刷新(通过action指定提交地址),所以我们一般提交表单时都是e.preventDefault()后自行实现提交逻辑；

  3.  const formdata = new FormData($form)的使用：
      formdata有一系列的方法可使用，常见的是formdata.get("name"), name refer to input name attr
      详情看：https://zh.javascript.info/formdata
  
  4. submitDataform是一个异步过程，所以addEventListener的第二参数callback是async的
*/

(() => {
  /* Step1: get dom selectors: */
  const $form = document.querySelector('form');
  const $passwordConfirmInput = document.getElementById(
    'password-confirm-input'
  );
  const $passwordMismatchError = document.getElementById(
    'password-mismatch-error'
  );

  /* Step2: 给form表单添加submit事件: 注意是async/await哦，因为submit data form是异步的 */
  $form.addEventListener('submit', async (event) => {
    /* Step2.1:  一定要记得e.preventDefault() */
    event.preventDefault();

    /* Step2.2: Reset the password confirm field. */
    $passwordConfirmInput.removeAttribute('aria-invalid');
    $passwordMismatchError.classList.add('hidden');

    /* Step2.3: validate password confirmation before submit form data */
    const formData = new FormData($form);
    const password = formData.get('password');
    const passwordConfirm = formData.get('password_confirm');
    if (password !== passwordConfirm) {
      $passwordConfirmInput.setAttribute('aria-invalid', 'true');
      $passwordMismatchError.classList.remove('hidden');
      return;
    }

    /* Step2.4: submit data to an url */
    await submitForm(
      formData.get('username'),
      formData.get('email'),
      formData.get('password'),
      formData.get('password_confirm')
    );

    /* Step2.5: submit data to an url */
    $form.reset();
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
