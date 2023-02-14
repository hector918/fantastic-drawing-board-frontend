import { useEffect } from 'react';
import './drawing-tile.css';
import { redraw_universal } from './obj-db';
export default function DrawingTile({drawing, idx}) {

	let {id, name, description, board_size, moves, timestamp } = drawing;
	const {height, width} = JSON.parse(board_size);


	useEffect(()=>{
		console.log(idx*500)
		setTimeout(()=>{
			redraw_universal(document.querySelector(`#drawing-tile-id-${id}`),JSON.parse(moves));
		},500*idx);
		setTimeout(()=>{
			
			document.querySelector(`#drawing-tile-id-${id}`).parentElement.classList.add("loaded")
		},500*idx-100);

	},[id, moves, idx])
	return (
		<div key={id} className="tile-d" style={{paddingBottom:`${(height/width*100).toFixed(2)}%`}}>
			<canvas id={`drawing-tile-id-${id}`} width={width} height={height} />
		</div>
	)
}