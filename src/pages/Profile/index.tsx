import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from "react-icons/fi";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Container, Content, AvatarInput } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import api from "../../services/api";
import getValidationErros from "../../utils/getInputErrors";
import { useToast } from "../../hooks/Toast";
import { useAuth } from "../../hooks/Auth";

interface ProfileFormdata {
  username: string;
  email: string;
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(
    ""
  );

  // const formRef = useRef(null);
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setUsernameError("");
      setPasswordError("");
      setEmailError("");
      setOldPasswordError("");

      const schema = Yup.object().shape({
        username: Yup.string(),
        email: Yup.string().email("Digite um email valido"),
        oldPassword: Yup.string().min(6, "Necessário confirmar a senha"),
        password: Yup.string(),
        // password: Yup.string().when("oldPassword", {
        //   is: (val) => !!val.length,
        //   then: Yup.string().required("Campo obrigatório"),
        //   otherwise: Yup.string(),
        // }),
        passwordConfirmation: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "A senha de confirmação não confere"
        ),
      });

      const validationData: ProfileFormdata = {
        username,
        email,
        oldPassword,
        password,
        passwordConfirmation,
      };

      schema
        .validate(validationData, { abortEarly: false })
        .then((yup) => {
          api
            .put("/profile", {
              name: yup.username,
              email: yup.email,
              old_password: yup.oldPassword,
              password: yup.password,
            })
            .then((res) => {
              addToast({
                type: "success",
                title: "Seus dados foram alterados",
              });
              updateUser(res.data);
            })
            .catch(() => {
              addToast({
                type: "error",
                title: "Não foi possivel alterar os dados",
                description: "Tente de novo",
              });
            });
        })
        .catch((err) => {
          const errors = getValidationErros(err);
          setUsernameError(errors.username);
          setEmailError(errors.email);
          setOldPasswordError(errors.oldPassword);
          setPasswordError(errors.password);
          setPasswordConfirmationError(errors.passwordConfirmation);
        });
    },
    [
      username,
      email,
      password,
      addToast,
      oldPassword,
      passwordConfirmation,
      updateUser,
    ]
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append("avatar", e.target.files[0]);
        api.patch("/users/avatar", data).then((res) => {
          updateUser(res.data);
          addToast({
            type: "success",
            title: "Avatar atualizado",
          });
        });
      }
    },
    [addToast, updateUser]
  );

  return (
    <Container>
      <header>
        <Link to="/dashboard">
          <FiArrowLeft />
        </Link>
      </header>
      <Content>
        <AvatarInput>
          <img src={user.avatar_url} alt={user.name} />
          <label htmlFor="avatar">
            <FiCamera />
            <input type="file" id="avatar" onChange={handleAvatarChange} />
          </label>
        </AvatarInput>
        <form onSubmit={handleSubmit} method="post">
          <h1>Meu perfil</h1>

          <Input
            icon={FiUser}
            name="username"
            error={usernameError}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            icon={FiMail}
            name="email"
            error={emailError}
            value={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={FiLock}
            name="old_password"
            type="password"
            error={oldPasswordError}
            placeholder="senha"
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <div style={{ marginTop: 15 }} />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            error={passwordError}
            placeholder="nova senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            icon={FiLock}
            name="password_confirmation"
            type="password"
            error={passwordConfirmationError}
            placeholder="confirmar nova senha"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <Button type="submit">Confirmar mudanças</Button>
        </form>
      </Content>
    </Container>
  );
};

export default Profile;
