import React, {
  InputHTMLAttributes,
  useRef,
  useState,
  useCallback,
} from "react";
import { IconBaseProps } from "react-icons";
import { Container, Error } from "./style";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, error, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);
  const [filled, setFilled] = useState(false);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocus(false);
    setFilled(!!inputRef.current?.value);
  }, []);

  return (
    <>
      <Container
        isError={error}
        isFocused={focus}
        isFilled={filled}
        data-testid="input-container"
      >
        {Icon && <Icon size={20} />}
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
          {...rest}
        />
      </Container>
      <Error>{error}</Error>
    </>
  );
};
export default Input;
