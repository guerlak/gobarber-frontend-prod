import React, { useState, useCallback, FormEvent } from "react";
import { FiLogIn, FiMail, FiUser, FiLock } from "react-icons/fi";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { Container, Content, Background } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import logo from "../../assets/logo.svg";
import api from "../../services/api";
import getValidationErros from "../../utils/getInputErrors";
import { useToast } from "../../hooks/Toast";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setUsernameError("");
      setPasswordError("");
      setEmailError("");
      const schema = Yup.object().shape({
        username: Yup.string().required("Nome obrigatório"),
        email: Yup.string()
          .required("Email obrigatório")
          .email("Digite um email valido"),
        password: Yup.string().min(6, "Minimo 6 digitos"),
      });

      const data = {
        username,
        email,
        password,
      };

      schema
        .validate(data, { abortEarly: false })
        .then((res) => {
          // call API
          api
            .post("/users", {
              name: res.username,
              email: res.email,
              password: res.password,
            })
            .then(() => {
              addToast({
                type: "success",
                title: "Registro efetuado com sucesso",
              });
              history.push("/");
            })
            .catch(() => {
              addToast({
                type: "error",
                title: "Não foi possivel cadastrar o user",
                description: "Verifique sua conexão",
              });
            });
        })
        .catch((err) => {
          const errors = getValidationErros(err);
          setUsernameError(errors.username);
          setEmailError(errors.email);
          setPasswordError(errors.password);
        });
    },
    [username, email, password, addToast, history]
  );

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="GoBarber" />
        <form onSubmit={handleSubmit} method="post">
          <h1>Faça seu login</h1>
          <Input
            icon={FiUser}
            name="username"
            error={usernameError}
            placeholder="nome"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            icon={FiMail}
            name="email"
            error={emailError}
            placeholder="e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            error={passwordError}
            placeholder="senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Cadastrar</Button>
        </form>
        <Link to="/">
          <FiLogIn />
          Já sou cadastratado
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
