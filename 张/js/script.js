
document.addEventListener("DOMContentLoaded",()=>{
  const form=document.getElementById("messageForm");
  const list=document.getElementById("messageList");
  if(form&&list){
    const saved=JSON.parse(localStorage.getItem("zhangMessages")||"[]");
    const render=()=>{
      list.innerHTML="";
      if(saved.length===0){list.innerHTML='<div class="empty">暂时还没有留言，欢迎留下第一条留言。</div>';return}
      saved.slice().reverse().forEach(m=>{
        const div=document.createElement("div");
        div.className="message fade";
        div.innerHTML=`<div class="meta"><strong>${escapeHtml(m.name)}</strong> · ${escapeHtml(m.time)}</div><div>${escapeHtml(m.text)}</div>`;
        list.appendChild(div);
      });
    };
    form.addEventListener("submit",e=>{
      e.preventDefault();
      const name=document.getElementById("name").value.trim();
      const msg=document.getElementById("message").value.trim();
      if(!name||!msg){alert("请填写昵称和留言内容。");return}
      saved.push({name:name,text:msg,time:new Date().toLocaleString("zh-CN",{hour12:false})});
      localStorage.setItem("zhangMessages",JSON.stringify(saved));
      form.reset(); render();
    });
    render();
  }
});
function escapeHtml(str){
 return str.replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[s]));
}
