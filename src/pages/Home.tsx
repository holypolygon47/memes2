import { useEffect, useState } from "react";
import { getAllMemes } from "../api/memes";
import MemeCard from "../components/card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

const Home = () => {
  const [data, setData] = useState<Meme[]>([]);

    useEffect(() => {
    getAllMemes().then((res: any) => {
        console.log(res); // <-- посмотри, что возвращается
        setData(res?.data?.memes || []);
    });
    }, []);

  return (
    <Container>
      <h1 className="text-center my-3">Memes</h1>
      <Row>
        {data.map((meme) => (
          <MemeCard
            key={meme.id}
            id={meme.id}
            name={meme.name}
            url={meme.url}
          />
        ))}
      </Row>
    </Container>
  );
};

export default Home;
