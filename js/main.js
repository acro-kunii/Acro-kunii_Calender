'use strict';

console.clear();

{
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  // let month = 4; //月は0から始まる為、5月は4
  
  // 先月分の日付を取得
  function getCalendarHead() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();//先月末日のオブジェクトを取得
    const n = new Date(year, month, 1).getDay(); //今月の初日のオブジェクトを取得

    for (let i = 0; i < n; i++){
      //30
      //29,30
      //28,29,30
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }

  // カレンダー本体の処理
  function getCalendarBody() {
    const dates = [];//date: 日付、day: 曜日
    const lastDate = new Date(year, month + 1, 0).getDate();//翌月の0日目を指定することで今月の末日を指定できる
    
    for(let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }

    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;//1日の要素は0のように、現在の日を取得するには-1する。
    } 
    return dates;
  }

  function getCalendarTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();
    for (let i= 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }
  
  function clearCarender() {
    const tbody = document.querySelector('tbody');//tbody要素を取得してtbodyに代入
  
    while (tbody.firstChild) { //最初の子要素がある限りtbodyからその要素を削除してね(テクニック)
      tbody.removeChild(tbody.firstChild);
    }
    
  }

  function renderTitle() {
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;//テンプレートリテラルを使って、タイトル作成
    document.getElementById('title').textContent = title;//title idを取得してtitleを代入
    //スプレっと演算子で配列を前に出す

  }

  function renderWeeks() {
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];
    const weeks =[];//週ごとに配列を分ける為に宣言
    const weeksCount = dates.length / 7;//何週かを計算
    for (let i = 0; i< weeksCount; i++) { //7日ごとに配列を分ける
      weeks.push(dates.splice(0, 7));//先頭の7このデータを削除して、今週分を追加する
      
    }
    weeks.forEach(week => { //取り出したい配列をweekとしつつ、以下処理を行う。
      const tr = document.createElement('tr');//weekごとに行を作るので、tr要素を作る
      week.forEach(date =>{ //weekに対してforEachを回す。
        const td = document.createElement('td');//td要素をHTMLに作成する。

        td.textContent = date.date; //textContentプロパティをdateのdateプロパティにしてあげれば、日付が入る。最初のdateはオブジェクトが入っている変数・2つ目はこのオブジェクトのdateプロパティを表している。
        if (date.isToday){
          td.classList.add('today');//trueならtodayクラスを付ける
        }
        if (date.isDisabled){
          td.classList.add('disabled');//trueならdisabledクラスを付ける
          //[取得したHTML要素].classList.add('[追加するclass名]');
        }

        tr.appendChild(td);//tr要素の子要素の末尾にtdを追加していく。
      });
      document.querySelector('tbody').appendChild(tr);//作ったtrをtbodyを取得した後にappendchild()を使ってtrに追加
    });
  }

  function createCarendar() {
    clearCarender();
    renderTitle();
    renderWeeks();
  }

  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }
    createCarendar();
  });
  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }
    createCarendar();
  });
  document.getElementById('today').addEventListener('click', () => {
    year = today.getFullYear();
    month = today.getMonth();
    createCarendar();
  });
  createCarendar();

}