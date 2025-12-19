import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

interface MemeCardProps {
  id: string;
  name: string;
  url: string;
}

const MemeCard = ({ id, name, url }: MemeCardProps) => {
  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem', margin: "10px" }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Button
          variant="primary"
          onClick={() =>
            navigate(`/edit?id=${id}&url=${url}`)
          }
        >
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MemeCard;
