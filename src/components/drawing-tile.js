import { useEffect } from 'react';
import './drawing-tile.css';
import { redraw_universal } from './obj-db';

const thirty_second = 3000000;
export default function DrawingTile({ drawing, idx }) {

  let { id, name, description, board_size, moves } = drawing;
  const { height, width } = JSON.parse(board_size);

  useEffect(() => {
    let json_moves = JSON.parse(moves);
    let total_time = json_moves.reduce((acc, pv) => acc + (pv.move.reduce((s_acc, s_pv) => s_acc + Number(s_pv[2]), 0)), 0);
    setTimeout(() => {
      redraw_universal(document.querySelector(`#drawing-tile-id-${id}`), json_moves, total_time > thirty_second? (thirty_second / total_time) * 0.5 : undefined);
    }, 500 * idx);
    setTimeout(() => {
      document.querySelector(`#drawing-tile-id-${id}`).parentElement.classList.add("loaded");
    }, 500 * idx - 100);
  }, [id, moves, idx])
  return (
    <div key={id} className="tile-d c-hand" style={{ paddingBottom: `${(height / width * 100).toFixed(2)}%` }}>

      <p>{name} - {description}</p>
      <canvas id={`drawing-tile-id-${id}`} width={width} height={height} />
    </div>
  )
}