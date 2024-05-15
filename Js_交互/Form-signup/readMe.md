## Requirements:

The form should contain the following elements:Name field, Email field, Message field,Submit button that contains the text "Sent" and clicking on the submit button submits the form.

The form should contain the following elements with the following criteria:

- Username field
  - Minimum of 4 characters.
  - Alphanumeric only.
- Email field
  - Valid email format. A reasonable validation will suffice, you don't have to strictly follow any specification.
- Password field
  - Minimum of 6 characters.
- Confirm password field
  - Must match the password field.
- Submit button
  - Contains the text "Sign Up".
  - Clicking on the submit button submits the form.

You are free to decide when (during typing/after blur/upon submission) and how (native HTML validation or custom validation) to validate the form. If the validation fails, show the relevant errors near (beside or below) the corresponding `<input>` fields.

#### Submission API:

A `submitForm` function has been implemented for you in `index.js` which makes an AJAX `POST` request to a server-side API which validates the fields using the same criteria. You can use it to verify that your form is not allowing invalid input.If all the form fields are filled up, you will see an alert containing a success message. Congratulations!

## [🟢](https://emojipedia.org/large-green-circle) 知识点

- 表单元素的`name`属性很重要，这个`name`属性是 form data 的 key. (比如 FormData 抓取表单元素时,就要找对应的`name`属性)
- [new FormData( )](https://zh.javascript.info/formdata) 的使用，传入参数是 form DOM 元素，常见 API 是`.get("key")`, 其中`"key"`就是 input 表单元素的`name`属性！
- `<form/>表单.addEventListener("submit", function(e){ })` 和 <button type='submit /> 是经常使用的套餐
  - 在其`submit`的 event handler 里面，一般先要`e.preventDefault( )`
  - 再后来用[new FormData( )](https://zh.javascript.info/formdata)得到所有 form 数据
  - 得到 form 数据后，开始写 validation function. 如果数据不行，那就`return false`
  - 数据验证通过后，开始正式提交数据
  - 提交完成后，记得清空 form 的所有 input filed
