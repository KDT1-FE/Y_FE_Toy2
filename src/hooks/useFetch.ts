import { useEffect, useState } from "react";
import axios from "axios";

interface BaseProps {
  url: string;
  start: boolean;
}
type GetProps = {
  method: "GET";
  data?: never;
};
type PostProps = {
  method: "POST" | "PATCH";
  data: object;
};
type ConditionalProps = GetProps | PostProps;
type Props = BaseProps & ConditionalProps;

const useFetch = ({
  url,
  method,
  data,
  start,
}: Props): [object | undefined, boolean, number, () => void] => {
  const [result, setResult] = useState<object>();
  const [loading, setLoading] = useState(false);
  const [statusCode, setCode] = useState(-1);

  const fetchData = async () => {
    if (loading) return;

    const token = JSON.parse(localStorage.getItem("token") as string);

    setLoading(true);

    let headers;
    if (
      url === "https://fastcampus-chat.net/signup" ||
      url === "https://fastcampus-chat.net/login"
    ) {
      headers = {
        "content-type": "application/json",
        serverId: "6603aca7",
      };
    } else {
      headers = {
        "content-type": "application/json",
        serverId: "6603aca7",
        Authorization: `Bearer ${token.accessToken}`,
      };
    }

    if (method === "GET") {
      const response = await axios.get(url, {
        headers: headers,
      });

      setCode(response.status);

      try {
        setResult(response.data);
      } catch (err) {
        setResult({});
      }

      setLoading(false);
    } else if (method === "POST") {
      const response = await axios.post(url, data, {
        headers: headers,
      });
      setCode(response.status);
      try {
        setResult(response.data);
      } catch (err) {
        setResult({});
      }

      setLoading(false);
      return response;
    } else if (method === "PATCH") {
      const response = await axios.patch(url, data, {
        headers: headers,
      });
      setCode(response.status);

      try {
        setResult(response.data);
      } catch (err) {
        setResult({});
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    if (start) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, url]);

  const refresh = async () => {
    await fetchData();
  };

  return [result, loading, statusCode, refresh];
};

export default useFetch;
