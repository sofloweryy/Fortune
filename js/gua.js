const GuaUtil = {
  numToGua(n){
    const idx = (n-1)%8;
    return {name:Bagua.names[idx],symbol:Bagua.symbols[idx],wuxing:Bagua.wuxing[idx]}
  },
  buildMeihua(upNum,downNum,dongNum){
    const up = this.numToGua(upNum);
    const down = this.numToGua(downNum);
    let text = `【梅花易数卦象】
上卦：${up.symbol} ${up.name}（${up.wuxing}）
下卦：${down.symbol} ${down.name}（${down.wuxing}）
动爻：第${dongNum}爻
本卦：${up.name}上${down.name}下
`;
    return text;
  },
  // 六爻铜钱记录
  coinRecords:[],
  shakeCoin(){
    const r = Math.random();
    if(r<0.25)return CoinType.LAOYANG;
    if(r<0.5)return CoinType.YANG;
    if(r<0.75)return CoinType.YIN;
    return CoinType.LAOYIN;
  },
  coinText(t){
    if(t===CoinType.YANG)return "少阳 ○";
    if(t===CoinType.YIN)return "阴爻 ×";
    if(t===CoinType.LAOYANG)return "老阳 ○（动）";
    if(t===CoinType.LAOYIN)return "老阴 ×（动）";
  },
  buildLiuyao(list){
    let str = "【六爻铜钱卦】\n自下而上：\n";
    list.forEach((v,i)=>{
      str += `第${i+1}爻：${this.coinText(v)}\n`;
    })
    return str;
  }
}
