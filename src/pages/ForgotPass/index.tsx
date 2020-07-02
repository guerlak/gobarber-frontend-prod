import React, { useState, useCallback, ChangeEvent } from "react";
import { FiMail, FiLogIn } from "react-icons/fi";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Container, Content, Background } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import logo from "../../assets/logo.svg";
import getValidationErros from "../../utils/getInputErrors";
import { useToast } from "../../hooks/Toast";
import api from "../../services/api";

const ForgotPass: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setEmailError("");
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("Email obrigatório")
          .email("Digite um email valido"),
        password: Yup.string().min(6, "Minimo 6 digitos"),
      });

      const data = {
        email,
      };

      schema
        .validate(data, { abortEarly: false })
        .then(() => {
          setLoading(true);
          api
            .post("password/forgot", {
              email: data.email,
            })
            .then(() => {
              addToast({
                type: "success",
                title: "Senha enviada",
                description: "Confira seu email",
              });
            })
            .catch(() => {
              addToast({
                type: "error",
                title: "Erro",
                description: "Erro ao tentar realizar a recuperação de senha",
              });
            })
            .finally(() => {
              setLoading(false);
            });
        })
        .catch((err) => {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErros(err);
            setEmailError(errors.email);
          }
        });
    },
    [email, addToast]
  );

  function handleInputEmail(e: ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />
        <form onSubmit={handleSubmit} method="POST">
          <h1>Recupear senha</h1>
          <Input
            error={emailError}
            icon={FiMail}
            name="email"
            placeholder="e-mail"
            onChange={handleInputEmail}
          />
          <Button loading={loading} type="submit">
            Enviar
          </Button>
        </form>
        <Link to="/">
          <FiLogIn />
          Voltar ao login
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPass;
