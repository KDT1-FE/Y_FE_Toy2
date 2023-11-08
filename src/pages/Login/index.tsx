import useInput from "../../hooks/useInput";
import SignUpModal from "../../components/Login/SignUpModal";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

interface Data {
  id: string;
  password: string;
}

const Login = () => {
  const idInput = useInput("");
  const pwInput = useInput("");
  const [data, setData] = useState<Data>({
    id: "",
    password: "",
  });

  const [result, loading, statusCode, refresh] = useFetch({
    url: "https://fastcampus-chat.net/login",
    method: "POST",
    data: data,
    start: false,
  });

  useEffect(() => {
    const copy = { ...data };
    copy.id = idInput.value;
    copy.password = pwInput.value;

    setData(copy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idInput.value, pwInput.value]);

  const handleLogin = () => {
    refresh();
  };

  useEffect(() => {
    if (result) {
      const text = JSON.stringify(result);
      localStorage.setItem("token", text);
    }
    console.log(result, loading, statusCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <>
      <div>로그인</div>
      <Input type="text" value={idInput.value} onChange={idInput.onChange} />
      <Input type="text" value={pwInput.value} onChange={pwInput.onChange} />
      <Button onClick={handleLogin}>로그인</Button>
      <SignUpModal />
    </>
  );
};

export default Login;
