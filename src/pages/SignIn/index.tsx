import React, { useState, useCallback, ChangeEvent } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Container, Content, Background } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import logo from "../../assets/logo.svg";
import getValidationErrors from "../../utils/getInputErrors";
import { useAuth } from "../../hooks/Auth";
import { useToast } from "../../hooks/Toast";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setPasswordError("");
      setEmailError("");

      const schema = Yup.object().shape({
        email: Yup.string()
          .required("Email obrigatório")
          .email("Digite um email valido"),
        password: Yup.string().min(6, "Minimo 6 digitos"),
      });

      const data = {
        email,
        password,
      };

      schema
        .validate(data, { abortEarly: false })
        .then((res) => {
          signIn(res)
            .then(() => {
              addToast({
                type: "success",
                title: "Login efetuado",
                description: "Bem vindo ao GoBarber",
              });
            })
            .catch(() => {
              addToast({
                type: "error",
                title: "Erro",
                description: "Login/Senha invalido",
              });
            });
        })
        .catch((err) => {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
            setEmailError(errors.email);
            setPasswordError(errors.password);
          }
        });
    },
    [email, password, signIn, addToast]
  );

  function handleInputEmail(e: ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  function handleInputPassword(e: ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />
        <form onSubmit={handleSubmit} method="POST">
          <h1>Faça seu login</h1>
          <Input
            error={emailError}
            icon={FiMail}
            name="email"
            placeholder="e-mail"
            onChange={handleInputEmail}
          />
          <Input
            error={passwordError}
            icon={FiLock}
            name="password"
            type="password"
            placeholder="senha"
            onChange={handleInputPassword}
          />

          <Button type="submit">Entrar</Button>
          <Link to="forgot-password">Esqueci minha senha</Link>
        </form>

        <Link to="register">
          <FiLogIn />
          Criar conta
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
