import { html } from '../../node_modules/lit-html/lit-html.js';

import * as userService from '../services/user.js';

const loginTemplate = submitHandler => html`
  <section id="login">
    <form id="login-form" @submit=${submitHandler}>
      <div class="container">
        <h1>Login</h1>
        <label for="email">Email</label>
        <input id="email" placeholder="Enter Email" name="email" type="text" />
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter Password"
          name="password"
        />
        <input type="submit" class="registerbtn button" value="Login" />
        <div class="container signin">
          <p>Dont have an account?<a href="/register">Sign up</a>.</p>
        </div>
      </div>
    </form>
  </section>
`;

export const loginView = ctx => {
  const submitHandler = e => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

    if (email.trim().length === 0 || password.trim().length === 0) {
      const notification = document.querySelector('.notification');
      const notifMsg = notification.querySelector('span');

      notifMsg.innerText = 'Invalid fields!';
      notification.style.display = 'block';

      setTimeout(() => {
        notification.style.display = 'none';
      }, 3000);
      return;
    }

    userService
      .login(email, password)
      .then(() => {
        ctx.page.redirect('/memes');
      })
      .catch(error => {
        alert(error);
      });
  };

  ctx.render(loginTemplate(submitHandler));
};
