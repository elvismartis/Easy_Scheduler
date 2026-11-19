export const DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
export const DEFAULT_CONFIG={activeDays:['Monday','Tuesday','Wednesday','Thursday','Friday'],start:'08:30',end:'17:30',interval:60};
export const minutes=t=>{const [h,m]=t.split(':').map(Number);return h*60+m};
export const time=m=>`${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;
export const display=t=>{const [h,m]=t.split(':').map(Number);return `${h%12||12}:${String(m).padStart(2,'0')} ${h>=12?'PM':'AM'}`};
export const slotsFor=c=>{let out=[];const s=minutes(c.start),e=minutes(c.end),step=Number(c.interval);if(!step||e<=s)return out;for(let n=s;n<e;n+=step)out.push({start:time(n),end:time(Math.min(n+step,e)),from:n,to:Math.min(n+step,e)});return out};
export const conflictsFor=(activities,a,ignoreId)=>activities.filter(x=>x.id!==ignoreId&&a.days.includes(x.day)&&minutes(a.start)<minutes(x.end)&&minutes(a.end)>minutes(x.start)).map(x=>({...x,overlapStart:time(Math.max(minutes(a.start),minutes(x.start))),overlapEnd:time(Math.min(minutes(a.end),minutes(x.end)))}));
export const uid=()=>crypto.randomUUID?.()||`${Date.now()}-${Math.random()}`;
