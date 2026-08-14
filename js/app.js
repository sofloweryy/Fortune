const App = {
  init(){
    this.bindNav();
    this.bindModeSwitch();
    this.bindMeihuaNum();
    this.bindMeihuaTime();
    this.bindLiuyao();
    this.bindSaveCopy();
    this.loadRecords();
    this.refreshTime();
    setInterval(()=>this.refreshTime(),1000*10);
  },
  refreshTime(){
    const t = CalendarUtil.getNowTime();
    const info = CalendarUtil.getMeihuaNum(t.year,t.month,t.day,t.hour);
    document.getElementById("show-greg").innerText = info.greg;
    document.getElementById("show-lunar").innerText = info.lunar;
  },
  // 侧边导航切换
  bindNav(){
    document.querySelectorAll(".nav-btn").forEach(btn=>{
      btn.onclick = ()=>{
        const target = btn.dataset.target;
        document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));
        document.getElementById(target).classList.add("active");
        document.querySelectorAll(".nav-btn").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
      }
    })
  },
  // 起卦模式切换
  bindModeSwitch(){
    document.querySelectorAll(".mode-btn").forEach(btn=>{
      btn.onclick = ()=>{
        const mode = btn.dataset.mode;
        document.querySelectorAll(".mode-btn").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        document.querySelectorAll(".mode-panel").forEach(p=>p.classList.add("hidden"));
        document.getElementById("panel-"+mode).classList.remove("hidden");
      }
    })
  },
  // 梅花数字起卦
  bindMeihuaNum(){
    document.getElementById("btn-meihua-num").onclick = ()=>{
      const up = +document.getElementById("num-up").value;
      const down = +document.getElementById("num-down").value;
      const dong = +document.getElementById("num-dong").value;
      const res = GuaUtil.buildMeihua(up,down,dong);
      document.getElementById("result-text").innerText = res;
    }
  },
  // 梅花时间起卦
  bindMeihuaTime(){
    document.getElementById("btn-meihua-time").onclick = ()=>{
      const t = CalendarUtil.getNowTime();
      const info = CalendarUtil.getMeihuaNum(t.year,t.month,t.day,t.hour);
      const res = GuaUtil.buildMeihua(info.up,info.down,info.dong);
      document.getElementById("result-text").innerText = res;
    }
  },
  // 六爻铜钱
  bindLiuyao(){
    const listEl = document.getElementById("coin-list");
    document.getElementById("btn-coin-shake").onclick = ()=>{
      if(GuaUtil.coinRecords.length>=6)return alert("已经摇满6爻！");
      const r = GuaUtil.shakeCoin();
      GuaUtil.coinRecords.push(r);
      listEl.innerHTML = GuaUtil.coinRecords.map((v,i)=>`第${i+1}爻：${GuaUtil.coinText(v)}`).join("<br>");
      if(GuaUtil.coinRecords.length===6){
        document.getElementById("result-text").innerText = GuaUtil.buildLiuyao(GuaUtil.coinRecords);
      }
    }
    document.getElementById("btn-coin-reset").onclick = ()=>{
      GuaUtil.coinRecords = [];
      listEl.innerHTML = "";
      document.getElementById("result-text").innerText = "等待起卦……";
    }
  },
  // 保存、复制
  bindSaveCopy(){
    const storeKey = "gua_records";
    document.getElementById("btn-copy-text").onclick = ()=>{
      const txt = document.getElementById("result-text").innerText;
      navigator.clipboard.writeText(txt).then(()=>alert("已复制"));
    }
    document.getElementById("btn-save-record").onclick = ()=>{
      const guaTxt = document.getElementById("result-text").innerText;
      const query = document.getElementById("query-text").value.trim();
      if(!guaTxt||guaTxt.includes("等待起卦"))return alert("先起卦！");
      const all = JSON.parse(localStorage.getItem(storeKey)||"[]");
      all.unshift({time:new Date().toLocaleString(),query,content:guaTxt});
      localStorage.setItem(storeKey,JSON.stringify(all));
      this.loadRecords();
      alert("保存成功");
    }
    document.getElementById("btn-clear-all").onclick = ()=>{
      if(!confirm("确定清空所有卦例？无法恢复"))return;
      localStorage.removeItem(storeKey);
      this.loadRecords();
    }
  },
  loadRecords(){
    const key = "gua_records";
    const list = JSON.parse(localStorage.getItem(key)||"[]");
    const wrap = document.getElementById("record-list");
    if(list.length===0){
      wrap.innerHTML = "<p>暂无存档卦例</p>";
      return;
    }
    wrap.innerHTML = list.map((item,idx)=>`
    <div class="record-item">
【${item.time}】
问：${item.query||"无记录事项"}
${item.content}
    </div>`).join("");
  }
}
window.onload = ()=>App.init();
