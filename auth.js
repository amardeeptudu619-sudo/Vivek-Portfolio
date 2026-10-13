
import { createClient } from
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL =
  "https://zessyuwdncorjhanxpyy.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_52xDOrQau8BhqQnKY6x1kg_EORx2a_R";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const form = document.getElementById("auth-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");

function showMessage(text) {
  message.textContent = text;
}

loginBtn.addEventListener("click", () => {
  passwordInput.autocomplete = "current-password";
});

signupBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || password.length < 8) {
    showMessage("Enter a valid email and password of at least 8 characters.");
    return;
  }

  signupBtn.disabled = true;
  showMessage("Creating your account...");

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + "/auth.html"
      }
    });

    if (error) throw error;

    if (data.session) {
      showMessage("Account created and signed in successfully.");
    } else {
      showMessage("Account request received. Check your email to confirm signup.");
    }
  } catch (error) {
    showMessage(error.message);
  } finally {
    signupBtn.disabled = false;
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  loginBtn.disabled = true;
  showMessage("Signing in...");

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    showMessage("Login successful! Signed in as " + data.user.email);
  } catch (error) {
    showMessage(error.message);
  } finally {
    loginBtn.disabled = false;
  }
});
