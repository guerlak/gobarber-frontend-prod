import { renderHook, act } from "@testing-library/react-hooks";
import MockAdapter from "axios-mock-adapter";
import { useAuth, AuthProvider } from "../../hooks/Auth";
import api from "../../services/api";

const apiMock = new MockAdapter(api);

describe("Auth Hook", () => {
  it("should be able to sign in", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    apiMock.onPost("session").reply(200, {
      user: {
        id: "123",
        name: "Martina Leite",
        email: "martina@hotmail.com",
      },
      token: "token-123",
    });

    act(() => {
      result.current.signIn({
        email: "martina@hotmail.com",
        password: "aloha99",
      });
    });

    await waitForNextUpdate();
    expect(result.current.user.email).toEqual("martina@hotmail.com");
  });

  it("should be able to update user", async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    apiMock.onPost("session").reply(200, {
      user: {
        id: "123",
        name: "Martina Leite",
        email: "martina@hotmail.com",
      },
      token: "token-123",
    });

    const user = {
      id: "123",
      name: "Martina Leite",
      email: "martina@hotmail.com",
      avatar_url: "image_user.jpg",
    };

    act(() => {
      result.current.signIn({
        email: "guerlak@hotmail.com",
        password: "aloha99",
      });
    });

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      "@GoBarber:user",
      JSON.stringify(user)
    );

    expect(result.current.user).toEqual(user);
  });
});
