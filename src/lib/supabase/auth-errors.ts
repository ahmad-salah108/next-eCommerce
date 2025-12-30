export function mapSignUpError(message: string) {
  if (message.includes("User already registered")) {
    return { general: "An account with this email already exists." };
  }

  if (message.includes("Password should be at least")) {
    return { password: "Password must be at least 8 characters long." };
  }

  if (message.includes("Invalid email")) {
    return { email: "Please enter a valid email address." };
  }

  if (message.includes("Email rate limit exceeded")) {
    return { general: "Too many attempts. Please try again later." };
  }

  return { general: "Something went wrong. Please try again." };
}

export function mapSignInError(message: string): string {
  if (message.includes("Invalid login credentials")) {
    return "Email or password is incorrect.";
  }

  if (message.includes("Email not confirmed")) {
    return "Please verify your email before logging in.";
  }

  if (message.includes("Email rate limit exceeded")) {
    return "Too many attempts. Please try again later.";
  }

  return "Unable to log in. Please try again.";
}
