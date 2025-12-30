export type SignUpFormStateType = {
  errors: {
    full_name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
    general?: string;
  } | null;

  values: {
    email?: string;
    full_name?: string;
  } | null;
};
