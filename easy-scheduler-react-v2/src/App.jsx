import React,{useEffect,useMemo,useReducer,useState}from'react';
import{CalendarDays,Plus,Download,Settings,Search,FlaskConical,BookOpen,GraduationCap,Trash2,Clock,ChevronDown,Calendar,Grid3X3,CalendarDays as DayIcon,AlertTriangle,X,FileSpreadsheet,FileImage,FileJson,Printer,Palette,RotateCcw}from'lucide-react';
import{DAYS,DEFAULT_CONFIG,minutes,time,display,slotsFor,conflictsFor,uid}from'./lib/scheduler.js';
const KEY='easy-scheduler-react-v2';
const initial=()=>({title:'My Weekly Schedule',subtitle:'Academic · Research · Personal',config:DEFAULT_CONFIG,categories:[],activities:[]});
function reducer(s,a){switch(a.type){case'load':return a.value;case'config':return{...s,config:{...s.config,...a.patch}};case'meta':return{...s,...a.patch};case'category-add':return{...s,categories:[...s.categories,a.value]};case'category-update':return{...s,categories:s.categories.map(c=>c.id===a.value.id?a.value:c)};case'category-delete':return{...s,categories:s.categories.filter(c=>c.id!==a.id),activities:s.activities.map(x=>x.categoryId===a.id?{...x,categoryId:''}:x)};case'activity-save':return{...s,activities:[...s.activities.filter(x=>x.id!==a.value.id),...a.value.days.map(day=>({...a.value,day,days:undefined}))]};case'activity-delete':return{...s,activities:s.activities.filter(x=>x.id!==a.id)};case'clear':return{...s,activities:[]};default:return s}}
function App(){const[state,dispatch]=useReducer(reducer,undefined,initial);const[view,setView]=useState('week');const[day,setDay]=useState('Monday');const[query,setQuery]=useState('');const[modal,setModal]=useState(false);const[editing,setEditing]=useState(null);const[form,setForm]=useState(null);const[clash,setClash]=useState(null);const[categoryName,setCategoryName]=useState('');const[categoryColor,setCategoryColor]=useState('#64748b');const[showSetup,setShowSetup]=useState(true);const[toast,setToast]=useState('');
useEffect(()=>{try{const saved=localStorage.getItem(KEY);if(saved){const p=JSON.parse(saved);dispatch({type:'load',value:{...initial(),...p,config:{...DEFAULT_CONFIG,...p.config}}})}}catch(e){console.error(e)}},[]);
useEffect(()=>{localStorage.setItem(KEY,JSON.stringify(state))},[state]);
const slots=useMemo(()=>slotsFor(state.config),[state.config]);const visibleDays=state.config.activeDays;const notify=m=>{setToast(m);setTimeout(()=>setToast(''),2600)};
const openNew=(d,start)=>{setEditing(null);setForm({id:uid(),title:'',categoryId:'',badge:'',location:'',notes:'',days:[d||day],start:start||slots[0]?.start||state.config.start,end:time(Math.min(minutes(start||slots[0]?.start||state.config.start)+Number(state.config.interval),minutes(state.config.end)))});setModal(true)};
const openEdit=a=>{setEditing(a);setForm({...a,days:[a.day]});setModal(true)};
const save=()=>{if(!form?.title.trim()||!form.days.length||minutes(form.end)<=minutes(form.start)){notify('Enter a title, day and valid time range.');return}const conflicts=conflictsFor(state.activities,form,editing?.id);if(conflicts.length){setClash({activity:form,conflicts});return}commit(form)};
const commit=a=>{dispatch({type:'activity-save',value:a});setClash(null);setModal(false);setForm(null);notify('Activity saved.')};
const remove=()=>{dispatch({type:'activity-delete',id:editing.id});setModal(false);notify('Activity deleted.')};
const addCategory=()=>{if(!categoryName.trim())return;dispatch({type:'category-add',value:{id:uid(),name:categoryName.trim(),color:categoryColor}});setCategoryName('');notify('Category added.')};
const filtered=state.activities.filter(a=>(a.title+' '+a.location+' '+a.notes).toLowerCase().includes(query.toLowerCase()));
const categoryHours=id=>state.activities.filter(a=>a.categoryId===id).reduce((n,a)=>n+(minutes(a.end)-minutes(a.start)),0)/60;
const totalScheduled=state.activities.reduce((n,a)=>n+minutes(a.end)-minutes(a.start),0)/60;
const exportExcel = async () => {
  const XLSX = await import('xlsx');

  const rows = [
    ['Time', ...visibleDays],
    ...slots.map(s => [
      `${s.start}–${s.end}`,
      ...visibleDays.map(d => {
        const a = state.activities.find(
          x => x.day === d &&
          minutes(x.start) < s.to &&
          minutes(x.end) > s.from
        );

        return a
          ? `${a.title}${a.location ? ' · ' + a.location : ''}`
          : 'Free';
      })
    ])
  ];

  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.aoa_to_sheet(rows),
    'Timetable'
  );

  XLSX.writeFile(wb, 'Easy-Scheduler.xlsx');
};
const exportPDF = async () => {const { jsPDF } = await import('jspdf');
const pdf=new jsPDF({orientation:'landscape',unit:'mm',format:'a4'});const w=pdf.internal.pageSize.getWidth();pdf.setFontSize(18);pdf.text(state.title,10,13);pdf.setFontSize(9);pdf.text(state.subtitle,10,19);const left=10,top=26,timeW=25,col=(w-20-timeW)/Math.max(visibleDays.length,1),rh=Math.min(12,Math.max(6,150/Math.max(slots.length,1)));pdf.setFillColor(30,41,59);pdf.rect(left,top,timeW+col*visibleDays.length,8,'F');pdf.setTextColor(255);pdf.text('TIME',left+2,top+5.5);visibleDays.forEach((d,i)=>pdf.text(d.slice(0,3).toUpperCase(),left+timeW+i*col+col/2,top+5.5,{align:'center'}));slots.forEach((s,i)=>{let y=top+8+i*rh;if(y+rh>pdf.internal.pageSize.getHeight()-12){pdf.addPage();y=15}pdf.setTextColor(30,41,59);pdf.setFillColor(241,245,249);pdf.rect(left,y,timeW,rh,'FD');pdf.setFontSize(7);pdf.text(`${s.start}-${s.end}`,left+1,y+rh/2+1);visibleDays.forEach((d,j)=>{const x=left+timeW+j*col;const a=state.activities.find(q=>q.day===d&&minutes(q.start)<s.to&&minutes(q.end)>s.from);pdf.setFillColor(255);pdf.rect(x,y,col,rh,'FD');if(a){const c=state.categories.find(q=>q.id===a.categoryId);const hex=(c?.color||'#cbd5e1').replace('#','');const rgb=[0,2,4].map(k=>parseInt(hex.slice(k,k+2),16));pdf.setFillColor(...rgb);pdf.roundedRect(x+.5,y+.5,col-1,rh-1,1,1,'F');pdf.setTextColor(20,30,45);pdf.text(a.title.slice(0,25),x+1,y+rh/2+1)}})});pdf.save('Easy-Scheduler.pdf')};
const exportPNG = async () => {
  const html2canvas = (await import('html2canvas')).default;

  const el = document.getElementById('schedule-capture');

  if (!el) {
    notify('Schedule element not found.');
    return;
  }

  const canvas = await html2canvas(el, {
    scale: 2,
    backgroundColor: '#fff'
  });

  const a = document.createElement('a');
  a.download = 'Easy-Scheduler.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
};
const exportJSON=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));a.download='easy-scheduler.json';a.click();URL.revokeObjectURL(a.href)};
const importJSON=e=>{const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const p=JSON.parse(r.result);if(!p.config||!Array.isArray(p.activities)||!Array.isArray(p.categories))throw Error();dispatch({type:'load',value:{...initial(),...p}});notify('Schedule imported.')}catch{notify('Invalid scheduler JSON file.')}};r.readAsText(f);e.target.value=''};
return <div className="app"><header className="topbar"><div className="brand"><CalendarDays/><div><b>Easy Scheduler</b><small>Academic Timetable & Smart Slot Planner · React v2</small></div></div><div className="tools"><label className="search"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search activities, rooms, notes…"/></label><button className="primary" onClick={()=>openNew()}><Plus/> Add Activity</button><button onClick={()=>setShowSetup(!showSetup)}><Settings/> Setup</button><div className="dropdown"><button><Download/> Export <ChevronDown/></button><div className="dropmenu"><button onClick={exportPDF}>PDF timetable</button><button onClick={exportExcel}>Excel workbook</button><button onClick={exportPNG}>PNG image</button><button onClick={exportJSON}>JSON backup</button><label>Import JSON<input type="file" accept=".json,application/json" onChange={importJSON}/></label><button onClick={()=>window.print()}><Printer/> Print</button></div></div></div></header>
{showSetup&&<section className="setup panel"><div className="section-title"><div><h2>Schedule setup</h2><p>Configure your timetable and create your own categories.</p></div><button className="subtle" onClick={()=>setShowSetup(false)}>Hide</button></div><div className="setup-grid"><label>Timetable title<input value={state.title} onChange={e=>dispatch({type:'meta',patch:{title:e.target.value}})}/></label><label>Subtitle<input value={state.subtitle} onChange={e=>dispatch({type:'meta',patch:{subtitle:e.target.value}})}/></label><label>Start time<input type="time" value={state.config.start} onChange={e=>dispatch({type:'config',patch:{start:e.target.value}})}/></label><label>End time<input type="time" value={state.config.end} onChange={e=>dispatch({type:'config',patch:{end:e.target.value}})}/></label><label>Slot interval<select value={state.config.interval} onChange={e=>dispatch({type:'config',patch:{interval:Number(e.target.value)}})}>{[15,30,45,60,90,120].map(n=><option key={n} value={n}>{n} minutes</option>)}</select></label></div><div className="days-picker">{DAYS.map(d=><label key={d}><input type="checkbox" checked={visibleDays.includes(d)} onChange={e=>dispatch({type:'config',patch:{activeDays:e.target.checked?[...visibleDays,d]:visibleDays.filter(x=>x!==d)}})}/>{d.slice(0,3)}</label>)}</div><div className="category-editor"><h3><Palette/> Subject categories & colours</h3><div className="category-add"><input value={categoryName} onChange={e=>setCategoryName(e.target.value)} placeholder="Category name (e.g. Teaching)"/><input aria-label="Category colour" type="color" value={categoryColor} onChange={e=>setCategoryColor(e.target.value)}/><button className="primary" onClick={addCategory}>Add category</button></div><div className="category-list">{state.categories.map(c=><div className="category-chip" key={c.id}><input type="color" value={c.color} onChange={e=>dispatch({type:'category-update',value:{...c,color:e.target.value}})}/><span>{c.name}</span><button aria-label={`Delete ${c.name}`} onClick={()=>dispatch({type:'category-delete',id:c.id})}><Trash2/></button></div>)}{!state.categories.length&&<p className="muted">No categories yet. Add only the categories you need.</p>}</div></div></section>}
<section className="metrics"><div className="metric"><span>Scheduled time</span><b>{totalScheduled.toFixed(1)} h</b></div><div className="metric"><span>Activities</span><b>{state.activities.length}</b></div><div className="metric"><span>Categories</span><b>{state.categories.length}</b></div><div className="metric"><span>Available time</span><b>{Math.max(0,slots.reduce((n,s)=>n+s.to-s.from,0)*visibleDays.length/60-totalScheduled).toFixed(1)} h</b></div></section>
<section className="panel timetable" id="schedule-capture"><div className="schedule-head"><div><h1>{state.title}</h1><p>{state.subtitle} · {state.config.start}–{state.config.end}</p></div><div className="view-switch"><button className={view==='week'?'selected':''} onClick={()=>setView('week')}><Grid3X3/> Weekly grid</button><button className={view==='day'?'selected':''} onClick={()=>setView('day')}><DayIcon/> Day view</button></div></div>
{view==='week'?<div className="grid-scroll"><table className="schedule-grid"><thead><tr><th className="time-col">Time</th>{visibleDays.map(d=><th key={d}>{d}</th>)}</tr></thead><tbody>{slots.map(s=><tr key={s.start}><th className="time-col"><b>{display(s.start)} – {display(s.end)}</b><small>{s.to-s.from} min</small></th>{visibleDays.map(d=>{const a=filtered.find(x=>x.day===d&&minutes(x.start)<s.to&&minutes(x.end)>s.from);const starts=a&&minutes(a.start)>=s.from&&minutes(a.start)<s.to;return <td key={d}>{a?<button className="activity-card" style={{'--card-color':state.categories.find(c=>c.id===a.categoryId)?.color||'#64748b'}} onClick={()=>openEdit(a)}><strong>{starts?a.title:'↳ '+a.title}</strong><span><Clock/> {display(a.start)}–{display(a.end)}</span>{a.badge&&<small>{a.badge}</small>}{a.location&&<small>{a.location}</small>}</button>:<button className="empty-card" onClick={()=>openNew(d,s.start)}><Plus/> Add activity</button>}</td>})}</tr>)}</tbody></table></div>:<div className="day-view"><div className="day-tabs">{visibleDays.map(d=><button key={d} className={day===d?'selected':''} onClick={()=>setDay(d)}>{d}</button>)}</div>{slots.map(s=>{const a=filtered.find(x=>x.day===day&&minutes(x.start)<s.to&&minutes(x.end)>s.from);return <div className="day-row" key={s.start}><time>{display(s.start)}–{display(s.end)}</time>{a?<button className="activity-card" style={{'--card-color':state.categories.find(c=>c.id===a.categoryId)?.color||'#64748b'}} onClick={()=>openEdit(a)}>{a.title} · {display(a.start)}–{display(a.end)}</button>:<button className="empty-card" onClick={()=>openNew(day,s.start)}><Plus/> Add activity</button>}</div>})}</div>}
</section>
{modal&&form&&<div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&setModal(false)}><form className="dialog" onSubmit={e=>{e.preventDefault();save()}}><div className="dialog-head"><div><h2>{editing?'Edit activity':'Add activity'}</h2><p>Enter the activity details and schedule.</p></div><button type="button" className="icon-btn" onClick={()=>setModal(false)}><X/></button></div><label>Activity title<input required autoFocus value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="e.g. Research meeting"/></label><label>Category<select value={form.categoryId} onChange={e=>setForm({...form,categoryId:e.target.value})}><option value="">Uncategorised</option>{state.categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label><label>Day(s)<div className="days-picker">{visibleDays.map(d=><label key={d}><input type="checkbox" checked={form.days.includes(d)} onChange={e=>setForm({...form,days:e.target.checked?[...form.days,d]:form.days.filter(x=>x!==d)})}/>{d.slice(0,3)}</label>)}</div></label><div className="form-two"><label>Start<input type="time" value={form.start} onChange={e=>setForm({...form,start:e.target.value})}/></label><label>End<input type="time" value={form.end} onChange={e=>setForm({...form,end:e.target.value})}/></label></div><div className="form-two"><label>Tag / batch<input value={form.badge} onChange={e=>setForm({...form,badge:e.target.value})}/></label><label>Room / location<input value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/></label></div><label>Notes<input value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/></label><div className="dialog-actions">{editing&&<button type="button" className="danger" onClick={remove}>Delete</button>}<button type="button" onClick={()=>setModal(false)}>Cancel</button><button className="primary" type="submit">Save activity</button></div></form></div>}
{clash&&<div className="overlay top-overlay"><section className="clash-dialog" role="alertdialog" aria-modal="true"><div className="warning-icon"><AlertTriangle/></div><button className="icon-btn close-clash" onClick={()=>setClash(null)}><X/></button><h2>Schedule clash detected</h2><p>This activity overlaps with an existing activity. You can go back and change the time, or save it anyway.</p><div className="conflict-list">{clash.conflicts.map((c,i)=><div key={i}><b>{c.day}: {c.title}</b><span>Existing: {display(c.start)}–{display(c.end)}</span><strong>Overlap: {display(c.overlapStart)}–{display(c.overlapEnd)}</strong></div>)}</div><div className="dialog-actions"><button onClick={()=>setClash(null)}>Go back and edit</button><button className="primary" onClick={()=>commit(clash.activity)}>Save anyway</button></div></section></div>}
{toast&&<div className="toast">{toast}</div>}<footer>Easy Scheduler · React v2 · Your timetable stays in this browser.</footer></div>}
export default App;
