import { useEffect } from 'react';
import CanvasShow from '../components/canvas-show';
import { srv } from '../fetch_';
///////////////////////////////////////////////////////////
export default function Show({drawings, setDrawings}) {
  useEffect(()=>{
    srv.get_drawings_by_user((data)=>{
       if(data.length > 0) setDrawings(data);
    })
  },[setDrawings])
  return (
    <div className="columns col-gapless" >
      {drawings.map((el,idx)=><CanvasShow key={idx} drawing={el} idx={idx}/>)}
    </div>
  )
}