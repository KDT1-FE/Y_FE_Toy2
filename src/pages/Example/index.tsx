import { Button } from "@chakra-ui/react";
import { serverTimestamp } from "firebase/firestore";
import useFireFetch from "../../hooks/useFireFetch";
import useFetch from "../../hooks/useFetch";

const Example = () => {
  const fireFetch = useFireFetch();
  const notice = fireFetch.useGetAll("notice");
  const users = useFetch({
    url: "https://fastcampus-chat.net/users",
    method: "GET",
    start: true,
  });

  const noticeData = {
    id: "asdasdasdasdasd",
    title: "Asdasda",
    body: "asdasdasdw",
    createdAt: serverTimestamp(),
  };

  const postData = () => {
    fireFetch.usePostData("notice", noticeData.id, noticeData, () => {
      const copy = [...notice.data];
      copy.push(noticeData);
      notice.setData(copy);
    });
  };

  const deleteData = () => {
    fireFetch.deleteById("notice", "asdasdasdasdasd");
    const copy = [...notice.data];
    const deleted = copy.filter((v) => v.id !== "asdasdasdasdasd");

    notice.setData(deleted);
  };

  const getData = () => {
    console.log(notice.data);
  };

  const updateData = () => {
    const newData = {
      id: "asdasdasdasdasd",
      title: "Asdasda",
      body: "updated",
      createdAt: serverTimestamp(),
    };
    fireFetch.updateData("notice", "asdasdasdasdasd", newData);
    const copy = [...notice.data];
    const index = copy.findIndex((v) => v.id === "asdasdasdasdasd");
    copy[index] = newData;

    notice.setData(copy);
  };

  const postData_A = () => {
    console.log(1);
  };

  const deleteData_A = () => {
    console.log(2);
  };

  const getData_A = () => {
    console.log(users.result, users.loading, users.statusCode);
  };

  const updateData_A = () => {
    console.log(4);
  };

  return (
    <>
      <h1>라이어 게임</h1>
      <div>
        <Button onClick={postData}>Post</Button>
        <Button onClick={deleteData}>Delete</Button>
        <Button onClick={getData}>Get</Button>
        <Button onClick={updateData}>update</Button>
      </div>

      <div>
        <Button onClick={postData_A}>Post</Button>
        <Button onClick={deleteData_A}>Delete</Button>
        <Button onClick={getData_A}>Get</Button>
        <Button onClick={updateData_A}>Update</Button>
      </div>
    </>
  );
};

export default Example;
