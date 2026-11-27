/* Presentation enhancement of the frozen Bolivia population panel. */
(() => {
  'use strict';
  const labels={
    es:{zoomIn:'Acercar',zoomOut:'Alejar',focus:'Enfocar municipio',reset:'Ajustar mapa completo',selected:'Cian y recuadro: municipio seleccionado. Los demás colores representan población.',context:'Población · {year} · 339 municipios · ranking nacional',top:'Mayor población',bottom:'Menor población',rank:'Posición nacional',select:'Seleccionar',legendTitle:'Población · intervalos comunes 1992–2024',legendToggle:'Ver los 8 intervalos',legendRange:'0 a 500.000 o más',downloadNote:'El PNG descargable conserva la paleta original.',legendAria:'Población: ocho intervalos fijos, de azul para menor población a rojo para mayor población.'},
    en:{zoomIn:'Zoom in',zoomOut:'Zoom out',focus:'Focus municipality',reset:'Fit full map',selected:'Cyan and outline: selected municipality. Other colours represent population.',context:'Population · {year} · 339 municipalities · national ranking',top:'Highest population',bottom:'Lowest population',rank:'National rank',select:'Select',legendTitle:'Population · common intervals 1992–2024',legendToggle:'View all 8 intervals',legendRange:'0 to 500,000 or more',downloadNote:'The downloadable PNG retains the original palette.',legendAria:'Population: eight fixed intervals, from blue for lower population to red for higher population.'}
  };
  Object.assign(labels.es,{clear:'Quitar selección',clearShort:'Limpiar',emptyTitle:'Sin municipio seleccionado',emptyHint:'Selecciona un municipio en el mapa, la tabla o los rankings para consultar su población.',unselected:'Mapa sin selección. Los colores representan población.'});
  Object.assign(labels.en,{clear:'Clear selection',clearShort:'Clear',emptyTitle:'No municipality selected',emptyHint:'Select a municipality on the map, table or rankings to see its population.',unselected:'No selection. Colours represent population.'});
  Object.assign(labels.es,{legendTitle:'Población · escala logarítmica común 1992–2024',legendToggle:'Intervalos de los PNG originales',legendAria:'Población: degradado continuo logarítmico, de azul a amarillo y rojo. Rango común a los cuatro censos.',mapIntro:'Selecciona un año y un municipio para comparar su población. Los colores utilizan una escala logarítmica continua común a los cuatro censos.',sources:'Fuentes y cartografía',allocation:'Notas de asignación',zeroNote:'El cero se representa en azul.'});
  Object.assign(labels.en,{legendTitle:'Population · common logarithmic scale 1992–2024',legendToggle:'Original PNG intervals',legendAria:'Population: continuous logarithmic gradient, from blue through yellow to red. Common range across all four censuses.',mapIntro:'Select a year and municipality to compare its population. Colours use one continuous logarithmic scale across all four censuses.',sources:'Sources and cartography',allocation:'Allocation notes',zeroNote:'Zero is shown in blue.'});
  // One visual panel. Move existing nodes so their content and listeners survive.
  const workspace=document.querySelector('.workspace'),mapcard=document.querySelector('.mapcard'),wrap=document.querySelector('.map-wrap');
  document.getElementById('explore').removeAttribute('id');workspace.id='explore';
  const controls=document.querySelector('.controls'),yearButtons=document.querySelector('.years');
  wrap.prepend(yearButtons);mapcard.insertBefore(document.querySelector('.stats'),wrap);
  const notes=document.createElement('div');notes.className='visual-notes';workspace.append(notes);
  notes.append(document.querySelector('.reference-chip'));controls.remove();
  function disclosure(id,content){const d=document.createElement('details'),s=document.createElement('summary');d.className='visual-disclosure';s.id=id;d.append(s,content);notes.append(d);return d;}
  disclosure('sourcesToggle',document.querySelector('.footnote'));
  const allocationDetails=disclosure('allocationToggle',document.getElementById('allocationnote'));
  notes.append(document.querySelector('.legend-intervals'));
  const detail=document.querySelector('.selection-detail'),info=document.createElement('div'),chartGroup=document.createElement('div');
  info.className='selection-info';chartGroup.className='selection-chart';
  for(const node of [...detail.children]){if(node.id==='series'||node.id==='serieslist')chartGroup.append(node);else info.append(node);}
  detail.append(info,chartGroup);
  const svg=document.getElementById('map'),vp=document.getElementById('mapViewport');
  const nav=document.querySelector('.topbar');
  const syncAnchorOffset=()=>document.documentElement.style.scrollPaddingTop=(nav.offsetHeight+16)+'px';
  new ResizeObserver(syncAnchorOffset).observe(nav);syncAnchorOffset();
  const paths=new Map([...svg.querySelectorAll('.municipality')].map(p=>[p.dataset.id,p]));
  const byCode=new Map(D.rows.map(r=>[r.target_code,r]));
  // Fit Bolivia's actual paths, not Cambodia's fixed 640 × 560 coordinates.
  const bounds=[...paths.values()].map(p=>p.getBBox());
  const pathBounds=new Map([...paths.keys()].map((id,i)=>[id,bounds[i]]));
  let seriesWidth=document.getElementById('series').clientWidth;
  const x0=Math.min(...bounds.map(b=>b.x)),y0=Math.min(...bounds.map(b=>b.y));
  const x1=Math.max(...bounds.map(b=>b.x+b.width)),y1=Math.max(...bounds.map(b=>b.y+b.height));
  const pad=Math.max(x1-x0,y1-y0)*.035;
  const base={x:x0-pad,y:y0-pad,width:x1-x0+2*pad,height:y1-y0+2*pad};
  svg.setAttribute('viewBox',`${base.x} ${base.y} ${base.width} ${base.height}`);
  svg.setAttribute('preserveAspectRatio','xMidYMid meet');
  svg.style.setProperty('--map-ratio',`${base.width} / ${base.height}`);
  // Cambodia's continuous interpolation; a single Bolivia domain for all censuses.
  const stops=[[43,92,159],[116,173,209],[254,224,144],[244,109,67],[215,48,39]];
  const values=D.rows.flatMap(r=>years.map(y=>r['population_'+y]));
  const domain={min:Math.min(...values.filter(v=>v>0)),max:Math.max(...values),zeros:values.filter(v=>v===0).length};
  const logMin=Math.log10(domain.min),logSpan=Math.log10(domain.max)-logMin;
  function rampColor(t){
    const pos=Math.max(0,Math.min(1,t))*4,k=Math.min(3,Math.floor(pos)),u=pos-k;
    return 'rgb('+stops[k].map((v,j)=>Math.round(v+(stops[k+1][j]-v)*u)).join(',')+')';
  }
  color=function(value){return rampColor(value>0?(Math.log10(value)-logMin)/logSpan:0);};
  const palette=stops.map(s=>'rgb('+s.join(',')+')');
  let zoom=1,tx=0,ty=0,drag=null,suppressClickUntil=0,rankKey='';
  const oldChoose=chooseMunicipality,oldYear=chooseYear,oldLang=chooseLanguage,oldTable=table;
  const text=()=>labels[lang];
  const compareCode=(a,b)=>String(a.target_code).localeCompare(String(b.target_code))||Number(a.asdf_id)-Number(b.asdf_id);
  function rankRows(rows,year){
    const key='population_'+year;
    const descending=[...rows].sort((a,b)=>b[key]-a[key]||compareCode(a,b));
    const ascending=[...rows].sort((a,b)=>a[key]-b[key]||compareCode(a,b));
    const positions=new Map(descending.map((r,i)=>[String(r.asdf_id),i+1]));
    const max=descending.length?descending[0][key]:0;
    const pack=r=>({id:String(r.asdf_id),code:r.target_code,name:r.target_name_census2012,value:r[key],position:positions.get(String(r.asdf_id)),ratio:max>0?r[key]/max:0});
    return {top:descending.slice(0,10).map(pack),bottom:ascending.slice(0,10).map(pack)};
  }
  function updateFocus(){
    const p=paths.get(String(selected));
    document.getElementById('focusOverlay').style.display=p?'':'none';
    if(!p)return;
    const overlay=document.getElementById('focusOverlay');
    if(overlay.previousElementSibling!==p)vp.insertBefore(p,overlay);
    const b=pathBounds.get(String(selected)),side=Math.max(28,Math.max(b.width,b.height)+12);
    const x=b.x+b.width/2-side/2,y=b.y+b.height/2-side/2;
    for(const id of ['focusBox','focusBoxInner']){
      const r=document.getElementById(id);
      for(const [k,v] of Object.entries({x,y,width:side,height:side}))r.setAttribute(k,String(v));
    }
  }
  function syncSelection(){
    const hasSelection=paths.has(String(selected));
    paths.forEach((p,id)=>{p.classList.toggle('selected',hasSelection&&id===String(selected));p.setAttribute('aria-pressed',String(hasSelection&&id===String(selected)));});
    document.querySelectorAll('.rank-button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.id===String(selected))));
    document.querySelectorAll('#datatable tbody tr').forEach(tr=>tr.setAttribute('aria-selected',String(tr.dataset.id===String(selected))));
    document.querySelector('.selection-detail').hidden=!hasSelection;
    document.getElementById('selectionEmpty').hidden=hasSelection;
    allocationDetails.hidden=!hasSelection;
    document.getElementById('selectionEmptyTitle').textContent=text().emptyTitle;
    document.getElementById('selectionEmptyHint').textContent=text().emptyHint;
    document.getElementById('zoomFocus').disabled=!hasSelection;
    document.getElementById('clearSelection').disabled=!hasSelection;
    document.getElementById('selectionKey').textContent=hasSelection?text().selected:text().unselected;
    document.getElementById('selectionKey').classList.toggle('is-empty',!hasSelection);
    updateFocus();
  }
  function renderRankings(){
    const key=currentYear+':'+lang;
    if(key!==rankKey){
      const data=rankRows(D.rows,currentYear);
      for(const [kind,id] of [['top','topRanking'],['bottom','bottomRanking']]){
        const fragment=document.createDocumentFragment();
        for(const row of data[kind]){
          const li=document.createElement('li'),b=document.createElement('button');
          b.type='button';b.className='rank-button';b.dataset.id=row.id;b.dataset.value=String(row.value);b.dataset.position=String(row.position);
          b.dataset.code=row.code;
          b.setAttribute('aria-label',`${text().select} ${row.name}, ${fmt(row.value)} ${t('persons')}, ${text().rank} ${row.position}`);
          const position=document.createElement('span');position.className='rank-position';position.textContent=String(row.position);
          const name=document.createElement('span');name.className='rank-name';name.textContent=row.name;
          const value=document.createElement('span');value.className='rank-value';value.textContent=fmt(row.value);
          const track=document.createElement('span');track.className='rank-track';track.setAttribute('aria-hidden','true');
          const bar=document.createElement('span');bar.className='rank-bar';bar.style.setProperty('--share',String(row.ratio));bar.style.width='calc(var(--share) * 100%)';bar.style.background=color(row.value);track.append(bar);
          b.append(position,name,value,track);li.append(b);fragment.append(li);
        }
        document.getElementById(id).replaceChildren(fragment);
      }
      rankKey=key;
    }
    document.getElementById('rankingContext').textContent=text().context.replace('{year}',currentYear);
    document.getElementById('topDirection').textContent=text().top;
    document.getElementById('bottomDirection').textContent=text().bottom;
    syncSelection();
  }
  function decorateTable(){
    for(const tr of document.querySelectorAll('#datatable tbody tr')){
      const code=tr.cells[0].textContent,r=byCode.get(code);
      tr.dataset.id=String(r.asdf_id);tr.tabIndex=0;
      tr.setAttribute('aria-label',text().select+' '+r.target_name_census2012+', '+code);
      tr.setAttribute('aria-selected',String(r.asdf_id===selected));
    }
  }
  function clearSelection(){selected=null;document.getElementById('tooltip').style.display='none';syncSelection();}
  function renderSeries(){
    if(selected==null)return;
    const r=byId.get(String(selected)),chart=document.getElementById('series');
    const width=Math.max(160,seriesWidth),height=116;
    const values=years.map(y=>r['population_'+y]),maximum=Math.max(...values)*1.15;
    const points=values.map((v,i)=>[20+(years[i]-1992)/32*(width-40),90-v/maximum*76]);
    chart.setAttribute('viewBox',`0 0 ${width} ${height}`);
    chart.innerHTML=`<line x1="20" y1="90" x2="${width-20}" y2="90" stroke="#ffffff25"/><polyline points="${points.map(p=>p.join(',')).join(' ')}" fill="none" stroke="#5ad6c6" stroke-width="2"/>`+points.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="${years[i]===currentYear?5:3}" fill="${years[i]===currentYear?'#ff8597':'#5ad6c6'}"/><text x="${p[0]}" y="112" text-anchor="middle">${years[i]}</text>`).join('');
    const list=document.getElementById('serieslist');
    if(list.firstElementChild?.tagName==='SPAN'){
      const nodes=[...list.children],fragment=document.createDocumentFragment();
      for(let i=0;i<nodes.length;i+=2){const pair=document.createElement('div');pair.className='series-point';pair.append(nodes[i],nodes[i+1]);fragment.append(pair);}
      list.replaceChildren(fragment);
    }
  }
  chooseMunicipality=function(id){if(id==null){clearSelection();return;}oldChoose(id);syncSelection();renderSeries();};
  chooseYear=function(y){oldYear(y);renderRankings();};
  table=function(){oldTable();decorateTable();};
  function renderLegend(){
    const ramp=document.getElementById('legendRamp');
    ramp.replaceChildren();
    ramp.style.background='linear-gradient(90deg,'+palette.map((fill,i)=>fill+' '+i*25+'%').join(',')+')';
    ramp.setAttribute('aria-label',text().legendAria);
    const ticks=document.getElementById('legendTicks');
    ticks.replaceChildren(...[0,.25,.5,.75,1].map(p=>{const s=document.createElement('span');const value=Math.round(10**(logMin+p*logSpan));s.style.left=p*100+'%';s.dataset.value=String(value);s.textContent=fmt(value);return s;}));
    document.getElementById('legendLabel').textContent=text().legendTitle;
    document.getElementById('legendRange').textContent=domain.zeros?text().zeroNote:'';
    document.getElementById('legendToggle').textContent=text().legendToggle;
    document.getElementById('downloadPaletteNote').textContent=text().downloadNote;
    document.querySelectorAll('#legend i').forEach((e,i)=>e.style.background=D.colors[i]);
  }
  function translateEnhancement(){
    for(const [id,key] of [['zoomIn','zoomIn'],['zoomOut','zoomOut'],['zoomFocus','focus'],['zoomReset','reset'],['clearSelection','clear']]){
      const b=document.getElementById(id);b.setAttribute('aria-label',text()[key]);b.title=text()[key];
    }
    document.getElementById('clearSelection').textContent=text().clearShort;
    document.querySelector('[data-i18n="mapIntro"]').textContent=text().mapIntro;
    document.getElementById('sourcesToggle').textContent=text().sources;
    document.getElementById('allocationToggle').textContent=text().allocation;
    renderRankings();decorateTable();renderLegend();
  }
  chooseLanguage=function(next){
    oldLang(next);translateEnhancement();
  };
  document.querySelector('.rankings').addEventListener('click',e=>{
    const b=e.target.closest('.rank-button');if(b)chooseMunicipality(b.dataset.id);
  });
  // The frozen input listener retains its original function reference. Decorate
  // its freshly built rows afterwards, without replacing that source listener.
  document.getElementById('search').addEventListener('input',decorateTable);
  document.querySelector('#datatable tbody').addEventListener('keydown',e=>{
    if(e.key==='Enter'||e.key===' '){const tr=e.target.closest('tr[data-id]');if(tr){e.preventDefault();chooseMunicipality(tr.dataset.id);}}
  });
  function applyTransform(){
    const minX=(1-zoom)*(base.x+base.width)-base.width*.35,maxX=(1-zoom)*base.x+base.width*.35;
    const minY=(1-zoom)*(base.y+base.height)-base.height*.35,maxY=(1-zoom)*base.y+base.height*.35;
    tx=Math.min(maxX,Math.max(minX,tx));ty=Math.min(maxY,Math.max(minY,ty));
    if(zoom===1){tx=0;ty=0;}
    vp.setAttribute('transform',`translate(${tx},${ty}) scale(${zoom})`);
    svg.style.touchAction=zoom>1?'none':'pan-y';
  }
  function point(clientX,clientY){return new DOMPoint(clientX,clientY).matrixTransform(svg.getScreenCTM().inverse());}
  function zoomAt(factor,cx=base.x+base.width/2,cy=base.y+base.height/2){
    const next=Math.max(1,Math.min(12,zoom*factor)),ratio=next/zoom;
    tx=cx-(cx-tx)*ratio;ty=cy-(cy-ty)*ratio;zoom=next;applyTransform();
  }
  function focus(){
    if(selected==null)return;
    const b=paths.get(String(selected)).getBBox();
    const span=Math.max(46,Math.max(b.width,b.height)*3.2);
    zoom=Math.max(1,Math.min(10,Math.min(base.width,base.height)/span));
    tx=base.x+base.width/2-(b.x+b.width/2)*zoom;
    ty=base.y+base.height/2-(b.y+b.height/2)*zoom;applyTransform();
  }
  function reset(){zoom=1;tx=0;ty=0;applyTransform();}
  document.getElementById('zoomIn').addEventListener('click',()=>zoomAt(1.45));
  document.getElementById('zoomOut').addEventListener('click',()=>zoomAt(1/1.45));
  document.getElementById('zoomFocus').addEventListener('click',focus);
  document.getElementById('zoomReset').addEventListener('click',reset);
  document.getElementById('clearSelection').addEventListener('click',clearSelection);
  svg.addEventListener('wheel',e=>{e.preventDefault();const p=point(e.clientX,e.clientY);zoomAt(e.deltaY<0?1.25:1/1.25,p.x,p.y);},{passive:false});
  svg.addEventListener('pointerdown',e=>{
    if(e.button!==0||zoom===1)return;
    const p=point(e.clientX,e.clientY);drag={id:e.pointerId,x:p.x,y:p.y,clientX:e.clientX,clientY:e.clientY,tx,ty,moved:false};
  });
  window.addEventListener('pointermove',e=>{
    if(!drag||e.pointerId!==drag.id)return;
    if(Math.hypot(e.clientX-drag.clientX,e.clientY-drag.clientY)>4){
      if(!drag.moved){svg.setPointerCapture(e.pointerId);drag.moved=true;}
      const p=point(e.clientX,e.clientY);tx=drag.tx+p.x-drag.x;ty=drag.ty+p.y-drag.y;
      svg.classList.add('dragging');document.getElementById('tooltip').style.display='none';applyTransform();
    }
  });
  function endDrag(e){
    if(!drag||e.pointerId!==drag.id)return;
    if(drag.moved)suppressClickUntil=performance.now()+250;
    if(svg.hasPointerCapture(e.pointerId))svg.releasePointerCapture(e.pointerId);
    drag=null;svg.classList.remove('dragging');
  }
  window.addEventListener('pointerup',endDrag);window.addEventListener('pointercancel',endDrag);
  svg.addEventListener('click',e=>{if(performance.now()<suppressClickUntil){e.preventDefault();e.stopImmediatePropagation();}},true);
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href^="#"]');if(!a)return;
    const target=document.getElementById(a.getAttribute('href').slice(1));
    if(target){let parent=target.parentElement;while(parent){if(parent.tagName==='DETAILS')parent.open=true;parent=parent.parentElement;}}
    if(target?.id==='explore'){
      e.preventDefault();history.replaceState(null,'','#explore');
      window.scrollTo({top:workspace.getBoundingClientRect().top+scrollY-nav.offsetHeight-12,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    }
  });
  // Small pure functions/state exposed for reproducible local QA; no remote API.
  window.C06={rankRows,labels,palette,domain,rampColor,focus,reset,zoomAt,clearSelection,state:()=>({zoom,tx,ty,selected,year:currentYear,lang,dragging:!!drag}),base};
  new ResizeObserver(entries=>{const width=Math.round(entries[0].contentRect.width);if(width!==seriesWidth){seriesWidth=width;renderSeries();}}).observe(document.querySelector('.selection-chart'));
  reset();
  paths.forEach((p,id)=>p.setAttribute('fill',color(byId.get(id)['population_'+currentYear])));
  renderSeries();translateEnhancement();
})();
