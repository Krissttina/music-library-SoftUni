import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../data/auth.js";

// TODO replace with actual view
const registerTemplate = (onRegister) => html`
<!-- Register Page (Only for Guest users) -->
<section id="register">
  <div class="form">
    <h2>Register</h2>
    <form  @submit=${onRegister} class="login-form">
      <input type="text" name="email" id="register-email" placeholder="email" />
      <input type="password" name="password" id="register-password" placeholder="password" />
      <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
      <button type="submit">register</button>
      <p class="message">Already registered? <a href="/">Login</a></p>
    </form>
  </div>
</section>
`;

export function registerPage(ctx) {
  ctx.render(registerTemplate(onRegister));

  // TODO change user object based on requirements
  async function onRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const repeatPass = formData.get("re-password");

    if (email == "" || password == "") {
      return alert("All fields are required");
    }

    if (password != repeatPass) {
      return alert("Passwords do not match");
    }

    await register(email, password);
    event.target.reset();
    //TODO use redirect location from requirements
    ctx.page.redirect("/");
  }
}
