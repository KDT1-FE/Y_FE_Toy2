import useInput from "../../../hooks/useInput";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Data {
  id: string;
  password: string;
  name: string;
  picture?: string;
}

const SignUpModal = () => {
  const idInput = useInput("");
  const pwInput = useInput("");
  const nameInput = useInput("");
  const [data, setData] = useState<Data>({
    id: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    const copy = { ...data };
    copy.id = idInput.value;
    copy.password = pwInput.value;
    copy.name = nameInput.value;

    setData(copy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idInput.value, pwInput.value, nameInput.value]);

  const handleSignup = () => {
    axios
      .post("https://fastcampus-chat.net/signup", data, {
        headers: {
          "content-type": "application/json",
          serverId: "6603aca7",
        },
      })
      .then((res) => console.log(res));
  };
  return (
    <>
      <div>회원가입</div>
      <Input type="text" value={idInput.value} onChange={idInput.onChange} />
      <Input type="text" value={pwInput.value} onChange={pwInput.onChange} />
      <Input
        type="text"
        value={nameInput.value}
        onChange={nameInput.onChange}
      />
      <Button onClick={handleSignup}>가입</Button>
    </>
  );
};

export default SignUpModal;
