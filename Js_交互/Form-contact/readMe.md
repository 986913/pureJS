## Requirements:

The form should contain the following elements:Name field, Email field, Message field,Submit button that contains the text "Sent" and clicking on the submit button submits the form.

The form and submission should be implemented entirely in HTML. **No JavaScript** should be used for this question.

There is no need to do any validation on the fields. Validation will be done on the server side.

#### Submission API:

Upon submission, `POST` the form data to `https://www.greatfrontend.com/api/questions/contact-form`with the following fields in the request body:`name`, `email`, `message`.

If all the form fields are filled up, you will see an alert containing a success message. Congratulations!

## [🟢](https://emojipedia.org/large-green-circle) 知识点

- 表单元素的`name`属性很重要，这个`name`属性是 form data 的 key. (比如 FormData 抓取表单元素时,就要找对应的`name`属性)
- `<form>`元素的两个主要属性：
  - `action` - 接受 URL 为值, 告诉`<form/>`应该把 form data 传到 URL
  - `method` - 哪种方式传，有下面 2 种：
    - `post` : 密文提交, 安全，能提交大数据
    - `get` : 明文提交，快速，但不安全，不能提交大数据
- 当一个`form`表单内有`type="submit"`的`button`时, 在某个`input`框内按下回车键就会自动提交表单. 很方便，不用我们针对每一个`input`框处理`keydown`事件了
