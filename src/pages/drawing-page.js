import { useParams } from "react-router-dom";
import DrawingBoard from "../components/drawingboard";

export default function DrawingPage({drawings, setDrawings}) {
  let { id } = useParams();
  return (
    <>
      {id !== undefined
        ?<DrawingBoard id={id} drawings={drawings} setDrawings={setDrawings}/>
        :<DrawingBoard />
      }
    </>
  )
}