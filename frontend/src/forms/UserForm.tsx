import { Autocomplete, TextField } from "@mui/material";
import { useField } from "formik";

interface UserFormProps {
  isRegister: boolean;
}

const UserForm = ({ isRegister }: UserFormProps) => {
  const validateEmail = (value: string) => {
    if (!value) return "El email es obligatorio";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value) ? undefined : "Ingrese un correo válido";
  };

  const [usernameField, usernameMeta] = useField({
    name: "email",
    validate: validateEmail,
  });
  const [passwordField, passwordMeta] = useField("password");
  const [confirmPasswordField, confirmPasswordMeta] =
    useField("confirmPassword");
  const [roleField, , roleHelpers] = useField("role");

  const roleOptions = [
    { name: "Usuario", value: "user" },
    { name: "Administrador", value: "admin" },
  ];

  return (
    <>
      <TextField
        {...usernameField}
        label="Email"
        type="email"
        error={Boolean(usernameMeta.touched && usernameMeta.error)}
        helperText={
          usernameMeta.touched && usernameMeta.error ? usernameMeta.error : ""
        }
        required
      />
      <TextField
        {...passwordField}
        label="Contraseña"
        type="password"
        error={Boolean(passwordMeta.touched && passwordMeta.error)}
        helperText={
          passwordMeta.touched && passwordMeta.error ? passwordMeta.error : ""
        }
        required
      />
      {isRegister && (
        <>
          <TextField
            {...confirmPasswordField}
            label="Confirmar contraseña"
            type="password"
            error={Boolean(
              confirmPasswordMeta.touched && confirmPasswordMeta.error
            )}
            helperText={
              confirmPasswordMeta.touched && confirmPasswordMeta.error
                ? confirmPasswordMeta.error
                : ""
            }
            required
          />
          <Autocomplete
            fullWidth
            id="role"
            options={roleOptions}
            value={
              roleOptions.find((option) => option.value === roleField.value) ||
              null
            }
            getOptionLabel={(option) => option?.name}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            onChange={(_event, value) => {
              roleHelpers.setValue(value ? value.value : "");
            }}
            renderInput={(params) => (
              <TextField {...params} label="Rol" required />
            )}
          />
        </>
      )}
    </>
  );
};

export default UserForm;
