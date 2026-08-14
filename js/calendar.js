// 简易公历转农历、时辰、年月日取数（适配梅花时间起卦）
const CalendarUtil = {
  getNowTime(){
    const d = new Date();
    return {
      year:d.getFullYear(),
      month:d.getMonth()+1,
      day:d.getDate(),
      hour:d.getHours()
    }
  },
  // 简易时辰换算
  getShiChen(hour){
    const arr = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
    let idx;
    if(hour>=23||hour<1)idx=0;
    else if(hour>=1&&hour<3)idx=1;
    else if(hour>=3&&hour<5)idx=2;
    else if(hour>=5&&hour<7)idx=3;
    else if(hour>=7&&hour<9)idx=4;
    else if(hour>=9&&hour<11)idx=5;
    else if(hour>=11&&hour<13)idx=6;
    else if(hour>=13&&hour<15)idx=7;
    else if(hour>=15&&hour<17)idx=8;
    else if(hour>=17&&hour<19)idx=9;
    else if(hour>=19&&hour<21)idx=10;
    else idx=11;
    return arr[idx];
  },
  // 梅花时间起卦取数：年支数(子1…) 月 日 时
  getMeihuaNum(y,m,d,h){
    const dz = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
    const yearZhi = dz[(y-4)%12];
    const nian = dz.indexOf(yearZhi)+1;
    const shi = this.getShiChen(h);
    const shiNum = dz.indexOf(shi)+1;
    const up = (nian + m + d) %8 ||8;
    const down = (nian + m + d + shiNum) %8 ||8;
    const dong = (nian + m + d + shiNum) %6 ||6;
    return {up,down,dong,greg:`${y}年${m}月${d}日 ${h}时`,lunar:`待完善简易农历`}
  }
}
