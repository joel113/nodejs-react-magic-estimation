import { RefObject } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import joelLogo from '../../img/joel.svg';
import { generateId } from './generateId';
import classes from './LoginPage.module.css';
import {
  ALT_JOEL_LOGO,
  APP_NAME_FIRST,
  APP_NAME_SECOND,
  BUTTON_CONNECTING,
  BUTTON_LOGIN,
  LABEL_SESSION,
  LABEL_USERNAME,
  JOEL_URL,
} from '../../constants';

// During server-side-rendering, window/history cannot be accessed
const isSSR = typeof window === 'undefined';

const ProtoLoginPage = () => (
  <form class={classes.loginPage} onSubmit={(event) => {
      // TODO: Implementation needed
    }}
  >
    <div class={classes.heading}>
      {APP_NAME_FIRST}
      <br />
      {APP_NAME_SECOND}
    </div>
    <label for="user" class={classes.userLabel}>
      {LABEL_USERNAME}
    </label>
    <input
      id="user"
      type="text"
      class={classes.userInput}
    />
    <label for="session" class={classes.sessionLabel}>
      {LABEL_SESSION}
    </label>
    <a id="session" class={classes.sessionLink}>
      SESSION_ID
    </a>
    <input
      type="submit"
      value={BUTTON_LOGIN}
      class={classes.submit}
    />
    <a href={JOEL_URL} target="_blank" class={classes.logo}>
      <img src={joelLogo} alt={ALT_JOEL_LOGO} class={classes.logoImage} />
    </a>
  </form>
);

export const LoginPage = ProtoLoginPage;
