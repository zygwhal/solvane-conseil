
(function(){
  var r=document.documentElement.getAttribute('data-racine')||'';
  var h=document.getElementById('horloge');
  if(h){h.textContent=new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});}
  var p=document.getElementById('promo');
  if(p){fetch(r+'data/promo.json').then(function(x){return x.json()}).then(function(d){
    p.innerHTML='<a href="'+r+d.lien+'" style="color:inherit">'+d.texte+' →</a>';});}
  var l=document.getElementById('liste-postes');
  if(l){fetch(r+'data/postes.json').then(function(x){return x.json()}).then(function(d){
    var t='<table><tr><th>Poste</th><th>Ville</th><th>Contrat</th><th>Salaire</th></tr>';
    d.postes.forEach(function(o){t+='<tr><td>'+(o.page?'<a href="'+o.slug+'.html">'+o.titre+'</a>':o.titre)+'</td><td>'+o.ville+'</td><td>'+o.contrat+'</td><td>'+o.salaire+'</td></tr>';});
    l.innerHTML='<p>'+d.postes.length+' postes ouverts.</p>'+t+'</table>';});}
  var q=document.getElementById('q');
  if(q){fetch(r+'data/recherche.json').then(function(x){return x.json()}).then(function(idx){
    q.addEventListener('input',function(){var v=q.value.toLowerCase(),o='';
      if(v.length>1){idx.filter(function(i){return i.t.toLowerCase().indexOf(v)>=0}).slice(0,30).forEach(function(i){o+='<li><a href="'+r+i.u+'">'+i.t+'</a></li>';});}
      document.getElementById('resultats').innerHTML=o;});});}
})();
