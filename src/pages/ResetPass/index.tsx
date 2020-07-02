import React, { useState, useCallback, ChangeEvent } from "react";
import { FiLock } from "react-icons/fi";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Content, Background } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import logo from "../../assets/logo.svg";
import getValidationErros from "../../utils/getInputErrors";
import { useToast } from "../../hooks/Toast";
import api from "../../services/api";

const ResetPass: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setPasswordError("");
      setPasswordConfirmError("");

      const schema = Yup.object().shape({
        password: Yup.string().min(6, "Minimo 6 digitos"),
        confirmPassword: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "As senhas não estão iguais"
        ),
      });

      const data = {
        password,
        confirmPassword,
      };

      schema
        .validate(data, { abortEarly: false })
        .then(() => {
          const token = location.search.replace("?token=", "");

          if (!token) {
            addToast({ type: "error", title: "Erro ao alterar a senha" });
            return;
          }

          api
            .post("password/reset", {
              password: data.password,
              // eslint-disable-next-line @typescript-eslint/camelcase
              password_confirmation: data.confirmPassword,
              token,
            })
            .then(() => {
              addToast({ type: "success", title: "Senha alterada" });
              history.push("/");
            })
            .catch(() => {
              addToast({ type: "error", title: "Erro ao alterar a senha" });
            });
        })
        .catch((err) => {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErros(err);
            setPasswordError(errors.password);
            setPasswordConfirmError(errors.confirmPassword);
          }
        });
    },
    [password, addToast, history, confirmPassword, location]
  );

  function handleInputPassword(e: ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  function handleInputConfirmPassword(e: ChangeEvent<HTMLInputElement>): void {
    setConfirmPassword(e.target.value);
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />
        <form onSubmit={handleSubmit} method="POST">
          <h1>Alterar senha</h1>

          <Input
            error={passwordError}
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Nova senha"
            onChange={handleInputPassword}
          />
          <Input
            error={passwordConfirmError}
            icon={FiLock}
            name="confirmPassword"
            type="password"
            placeholder="Confirme a sua senha"
            onChange={handleInputConfirmPassword}
          />

          <Button type="submit">Alterar</Button>
        </form>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPass;
