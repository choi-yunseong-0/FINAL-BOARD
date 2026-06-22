let essayPanelsInitialized = false;

function showDetailEssay() {
  showDetailView('essay');
  if (!essayPanelsInitialized) {
    initPanel01();
    initPanel01Bottom();
    initPanel02();
    initPanel03();
    initPanel04();
    initPanel04Contributors();
    initPanel04TopCited();
    initPanel05Treemap();
    initPanel05Breakdown();
    initGhostPapersPanel();
    essayPanelsInitialized = true;
  }
}

function initPanel01() {
  if (typeof ESSAY_DATA === 'undefined') return;

  // 1. Spike Chart
  const spikeDom = document.getElementById('essay-panel1-spike');
  if (spikeDom) {
    const spikeChart = echarts.init(spikeDom);
    const years = ESSAY_DATA.yearly_data.years;
    const totals = ESSAY_DATA.yearly_data.uos.map((u, i) => u + ESSAY_DATA.yearly_data.non_uos[i]);
    
    spikeChart.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { data: ['서울시립대', '타 기관', '전체 논문 수'], top: 0, right: 10, textStyle: { fontFamily: "'Pretendard', sans-serif" } },
      grid: { left: '3%', right: '4%', bottom: '8%', top: '15%', containLabel: true },
      xAxis: { 
        type: 'category', 
        data: years, 
        axisLine: { show: false }, 
        axisTick: { show: false },
        axisLabel: { color: '#94a3b8', margin: 15, fontFamily: "'Pretendard', sans-serif" }
      },
      yAxis: { 
        type: 'value', 
        min: -5,
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { 
          color: '#94a3b8', 
          fontFamily: "'Pretendard', sans-serif",
          formatter: (val) => val >= 0 ? val : ''
        }
      },
      series: [
        {
          name: '전체 논문 수',
          type: 'bar',
          data: totals.map((val, idx) => ({
            value: val,
            itemStyle: {
              color: (years[idx] === '2017' || years[idx] === '2018') ? '#3b82f6' : '#dbeafe',
              borderRadius: [4, 4, 0, 0]
            }
          })),
          barWidth: '50%',
          markLine: {
            symbol: ['none', 'none'],
            label: { 
              show: true, 
              position: 'end', 
              formatter: '{b}',
              fontSize: 11,
              backgroundColor: 'rgba(255,255,255,0.8)',
              padding: [2, 4],
              borderRadius: 3
            },
            lineStyle: { type: 'dashed', width: 1 },
            data: [
              { name: '학술지 창간', xAxis: '2009', lineStyle: { color: '#60a5fa' }, label: { color: '#60a5fa' } },
              { name: 'COVID-19 팬데믹', xAxis: '2019', lineStyle: { color: '#f472b6' }, label: { color: '#f472b6' } }
            ]
          }
        },
        {
          name: '서울시립대',
          type: 'line',
          data: ESSAY_DATA.yearly_data.uos,
          smooth: false,
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: { color: '#fff', borderColor: '#10b981', borderWidth: 2 },
          lineStyle: { color: '#10b981', width: 2 },
          markLine: {
            symbol: ['arrow', 'arrow'],
            symbolSize: 8,
            label: { position: 'insideMiddle', formatter: '{b}', fontSize: 11, color: '#10b981', backgroundColor: '#fff', padding: [2, 4] },
            lineStyle: { type: 'solid', color: '#10b981', width: 1.5 },
            data: [
              [ 
                { name: '인문한국(HK) 지원사업기 (2007.11~2017.10)', coord: ['2007', -2] }, 
                { coord: ['2017', -2] } 
              ]
            ]
          }
        },
        {
          name: '타 기관',
          type: 'line',
          data: ESSAY_DATA.yearly_data.non_uos,
          smooth: false,
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: { color: '#fff', borderColor: '#ef4444', borderWidth: 2 },
          lineStyle: { color: '#ef4444', width: 2 },
          markLine: {
            symbol: ['arrow', 'arrow'],
            symbolSize: 8,
            label: { position: 'insideMiddle', formatter: '{b}', fontSize: 11, color: '#ef4444', backgroundColor: '#fff', padding: [2, 4] },
            lineStyle: { type: 'solid', color: '#ef4444', width: 1.5 },
            data: [
              [ 
                { name: '인문사회연구소 지원사업기 (2019.09~2025.08)', coord: ['2019', -2] }, 
                { coord: ['2025', -2] } 
              ]
            ]
          }
        },
        {
          name: '급감 표시',
          type: 'line',
          markLine: {
            symbol: ['none', 'arrow'],
            symbolSize: 10,
            label: { position: 'middle', formatter: '-57%', color: '#ef4444', fontSize: 12, fontWeight: 'bold' },
            lineStyle: { color: '#ef4444', type: 'solid', width: 2 },
            data: [
              [
                { coord: ['2018', 49] },
                { coord: ['2018', 22] }
              ]
            ]
          }
        },
        {
          name: 'KCI 등재',
          type: 'line',
          markLine: {
            symbol: 'none',
            label: { 
              position: 'end', 
              formatter: '2015 KCI 등재', 
              color: '#8b5cf6', 
              fontSize: 11, 
              fontWeight: 'bold', 
              backgroundColor: '#fff', 
              padding: [2, 4] 
            },
            lineStyle: { color: '#c4b5fd', type: 'dashed', width: 1.5 },
            data: [
              { xAxis: '2015' }
            ]
          }
        },
        {
          name: '인문도시 지원사업',
          type: 'line',
          markLine: {
            symbol: ['arrow', 'arrow'],
            symbolSize: 8,
            label: { position: 'insideMiddle', formatter: '인문도시지원사업 본격화 (2014~현재)', fontSize: 11, color: '#f59e0b', backgroundColor: '#fff', padding: [2, 4] },
            lineStyle: { type: 'solid', color: '#f59e0b', width: 1.5 },
            data: [
              [ 
                { coord: ['2014', -4.5] }, 
                { coord: ['2025', -4.5] } 
              ]
            ]
          }
        }
      ]
    });
    window.addEventListener('resize', () => spikeChart.resize());
    setTimeout(() => spikeChart.resize(), 500);
  }

  // 2. Researcher Donut
  const rDonutDom = document.getElementById('essay-panel1-researcher-donut');
  if (rDonutDom) {
    const rChart = echarts.init(rDonutDom);
    rChart.setOption({
      tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
      legend: { bottom: 0, textStyle: { fontSize: 11 }, data: ['서울시립대', '타 기관'] },
      color: ['#10b981', '#ef4444'], // UOS: 초록색, 타 기관: 빨간색
      series: [
        {
          name: '연구자 수 비중 (머릿수)',
          type: 'pie',
          radius: ['15%', '40%'],
          center: ['50%', '45%'],
          itemStyle: { borderRadius: 2, borderColor: '#fff', borderWidth: 2 },
          label: { show: true, position: 'inner', formatter: '{b}\n{d}%', fontSize: 10, fontWeight: 'bold', color: '#fff', textBorderColor: 'rgba(0,0,0,0.3)', textBorderWidth: 1 },
          data: [ { name: '서울시립대', value: 15 }, { name: '타 기관', value: 135 } ]
        },
        {
          name: '논문 수 비중 (생산량)',
          type: 'pie',
          radius: ['50%', '75%'],
          center: ['50%', '45%'],
          itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
          label: { show: true, position: 'outside', formatter: '논문 {c}편\n({d}%)', fontSize: 11, fontWeight: 'bold' },
          labelLine: { length: 10, length2: 10 },
          data: [ { name: '서울시립대', value: 196 }, { name: '타 기관', value: 251 } ]
        }
      ]
    });
    
    // 그래프 클릭 시 연구자 생태계(kpi) 상세 뷰로 이동
    rChart.on('click', function() {
      showDetailView('kpi');
    });
    
    // 마우스 오버 시 커서 변경을 위해 zrender에 이벤트 추가 가능 (선택적)
    rChart.getZr().on('mousemove', function(params) {
      rChart.getZr().setCursorStyle('pointer');
    });

    window.addEventListener('resize', () => rChart.resize());
    setTimeout(() => rChart.resize(), 500);
  }
}


function initPanel02() {
  if (typeof ESSAY_DATA === 'undefined') return;

  // 1. Donut
  const donutDom = document.getElementById('essay-panel2-donut');
  if (donutDom) {
    const dChart = echarts.init(donutDom);
    dChart.setOption({
      title: {
        text: '총 논문 수\n447편',
        left: 'center',
        top: 'center',
        textStyle: { fontSize: 14, fontWeight: 'bold', color: '#475569', lineHeight: 20 }
      },
      tooltip: { trigger: 'item', formatter: '{b}: {c}편 ({d}%)' },
      color: ['#3b82f6', '#94a3b8'],
      series: [
        {
          name: '학술지 점유율', type: 'pie', radius: ['50%', '85%'], center: ['50%', '50%'],
          startAngle: 270,
          itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 3 },
          label: { show: true, position: 'inner', formatter: '{b}\n{d}%', fontSize: 13, fontWeight: 'bold', color: '#fff', textBorderColor: 'rgba(0,0,0,0.4)', textBorderWidth: 2 },
          data: ESSAY_DATA.journal_distribution
        }
      ]
    });
    dChart.on('click', function() {
      if (window.showLoyaltyPieModal) window.showLoyaltyPieModal();
    });
    dChart.getZr().on('mousemove', function(params) {
      dChart.getZr().setCursorStyle('pointer');
    });

    window.addEventListener('resize', () => dChart.resize());
    setTimeout(() => dChart.resize(), 500);
  }

  // 2. Bar
  const barDom = document.getElementById('essay-panel2-bar');
  if (barDom) {
    const barChart = echarts.init(barDom);
    barChart.setOption({
      title: { text: '기타 학술지의 연구 분야 분류', left: 'center', top: 0, textStyle: { fontSize: 12, color: '#475569', fontWeight: 'bold' } },
      tooltip: { trigger: 'item', formatter: '{a}: {c}개 학술지' },
      grid: { left: '2%', right: '2%', top: 30, bottom: 5, containLabel: false },
      xAxis: { type: 'value', show: false, max: 85 },
      yAxis: { type: 'category', data: ['분야'], show: false },
      series: [
        { name: '문학/어학', type: 'bar', stack: 'total', data: [21], itemStyle: { color: '#ef4444' }, label: { show: true, formatter: '{a}\n{c}개', fontSize: 10, color: '#fff' } },
        { name: '언론/사회과학', type: 'bar', stack: 'total', data: [12], itemStyle: { color: '#3b82f6' }, label: { show: true, formatter: '{a}\n{c}개', fontSize: 10, color: '#fff' } },
        { name: '역사학', type: 'bar', stack: 'total', data: [10], itemStyle: { color: '#f59e0b' }, label: { show: true, formatter: '{a}\n{c}개', fontSize: 10, color: '#fff' } },
        { name: '철학/사상', type: 'bar', stack: 'total', data: [8], itemStyle: { color: '#10b981' }, label: { show: true, formatter: '{c}개', fontSize: 10, color: '#fff' } },
        { name: '여성학/젠더', type: 'bar', stack: 'total', data: [3], itemStyle: { color: '#ec4899' }, label: { show: false } },
        { name: '복합학/기타', type: 'bar', stack: 'total', data: [31], itemStyle: { color: '#94a3b8' }, label: { show: true, formatter: '{a}\n{c}개', fontSize: 10, color: '#fff' } }
      ]
    });
    window.addEventListener('resize', () => barChart.resize());
    setTimeout(() => barChart.resize(), 500);
  }

  // 3. Treemap
  const treemapDom = document.getElementById('essay-panel2-treemap');
  if (treemapDom) {
    const tmChart = echarts.init(treemapDom);
    tmChart.setOption({
      title: { text: '기타 학술지 상세 분포 (총 118개 학술지)', left: 'center', top: 0, textStyle: { fontSize: 12, color: '#475569', fontWeight: 'bold' } },
      tooltip: { formatter: '{b}: {c}편' },
      series: [
        {
          type: 'treemap',
          left: '2%', right: '2%', top: 30, bottom: '2%', roam: false,
          nodeClick: false, breadcrumb: { show: false },
          itemStyle: { borderColor: '#fff', borderWidth: 1, gapWidth: 1 },
          label: { show: true, formatter: '{b}\n{c}편', fontSize: 11, color: '#fff' },
          data: GLOBAL_OTHER_JOURNALS
        }
      ]
    });
    window.addEventListener('resize', () => tmChart.resize());
    setTimeout(() => tmChart.resize(), 500);
  }
}

function initPanel03() {
  const lineDom = document.getElementById('essay-panel3-stream');
  if (lineDom && typeof LINE_DATA !== 'undefined') {
    const sChart = echarts.init(lineDom);
    sChart.setOption({
      tooltip: { trigger: 'axis' },
      legend: { data: LINE_DATA.series.map(s => s.name), bottom: 0, textStyle: { fontFamily: "'Pretendard', sans-serif" } },
      grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
      xAxis: { type: 'category', data: LINE_DATA.categories, axisLabel: { fontFamily: "'Pretendard', sans-serif", fontSize: 13, fontWeight: 'bold' } },
      yAxis: { type: 'value', name: '이론가 활용 논문 수', splitLine: { lineStyle: { type: 'dashed', color: '#e2e8f0' } }, axisLabel: { fontFamily: "'Pretendard', sans-serif" } },
      color: ['#1e3a8a', '#3b82f6', '#93c5fd', '#10b981', '#f59e0b', '#ef4444'],
      series: LINE_DATA.series.map(s => ({
        name: s.name,
        type: 'line',
        data: s.data,
        smooth: false,
        symbol: 'circle',
        symbolSize: 10,
        lineStyle: { width: 4 }
      }))
    });
    window.addEventListener('resize', () => sChart.resize());
    setTimeout(() => sChart.resize(), 500);
  }

  const themeDom = document.getElementById('essay-panel3-themes');
  if (themeDom && typeof THEME_DATA !== 'undefined') {
    const thChart = echarts.init(themeDom);
    
    // 글로벌폴리스 의제 vs 디지털폴리스 의제 직접 분류 키워드 (학술지 전체 생태계)
    // 학술지 전체의 HK사업(글로벌폴리스) 핵심 키워드 + 외부 연구자 키워드 통합
    const gpData = [2, 7, 8, 4, 1, 4, 7, 7, 18, 3, 0, 2, 1, 2, 2, 2, 1];
    const dpData = [0, 0, 0, 0, 1, 0, 1, 0, 2, 1, 1, 2, 2, 4, 6, 5, 4];

    thChart.setOption({
      tooltip: { 
        trigger: 'axis',
        formatter: function (params) {
          let tooltipHtml = `<div style="font-family: 'Pretendard', sans-serif; max-width: 320px; white-space: normal; line-height: 1.4;">`;
          tooltipHtml += `<strong style="font-size:14px;">${params[0].name}년</strong><br/>`;
          
          params.forEach(param => {
            tooltipHtml += `<div style="margin-top: 8px;">`;
            tooltipHtml += `${param.marker} <strong style="font-size:13px;">${param.seriesName}</strong>: ${param.value}건<br/>`;
            if (param.seriesName === '글로벌폴리스 의제') {
              tooltipHtml += `<div style="font-size:11px; color:#64748b; margin-top: 4px; word-break: keep-all;">포함 키워드: 창조도시, 문화도시, 지구화, 상하이, 상해, 근대성, 글로벌, 제국, 글로벌폴리스, 동아시아, 아시아, 세계시민, 기본소득, 공유지, 공유사회, 도시인문학, 장소성, 백년전쟁, 필리프 6세, 탈산업주의, 포스트모더니티, 모더니티, 조선후기, 정의, 분배정의, 서양중세사, 장 2세</div>`;
            } else if (param.seriesName === '디지털폴리스 의제') {
              tooltipHtml += `<div style="font-size:11px; color:#64748b; margin-top: 4px; word-break: keep-all;">포함 키워드: 디지털, 스마트시티, 메타버스, 인공지능, 빅데이터, 미디어아트, 기술, 포스트휴먼, 사이보그, 인류세, 웹소설, 비인간, 가상현실, 증강현실, 디지털 폴리스, AI, 플랫폼, 자동화, 인터넷, 해킹, 모더레이션</div>`;
            }
            tooltipHtml += `</div>`;
          });
          tooltipHtml += `</div>`;
          return tooltipHtml;
        }
      },
      legend: { data: ['글로벌폴리스 의제', '디지털폴리스 의제'], bottom: 0, textStyle: { fontFamily: "'Pretendard', sans-serif" } },
      grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
      xAxis: { type: 'category', data: THEME_DATA.years, axisLabel: { fontFamily: "'Pretendard', sans-serif", fontSize: 13, fontWeight: 'bold' } },
      yAxis: { type: 'value', name: '아젠다 키워드 등장 횟수', splitLine: { lineStyle: { type: 'dashed', color: '#e2e8f0' } }, axisLabel: { fontFamily: "'Pretendard', sans-serif" }, minInterval: 1 },
      color: ['#14b8a6', '#6366f1'], 
      series: [
        {
          name: '글로벌폴리스 의제',
          type: 'line',
          data: gpData,
          smooth: false,
          symbol: 'circle',
          symbolSize: 10,
          lineStyle: { width: 4 }
        },
        {
          name: '디지털폴리스 의제',
          type: 'line',
          data: dpData,
          smooth: false,
          symbol: 'circle',
          symbolSize: 10,
          lineStyle: { width: 4 }
        }
      ]
    });
    window.addEventListener('resize', () => thChart.resize());
    setTimeout(() => thChart.resize(), 500);
  }
}

function initPanel04() {
  const netDom = document.getElementById('essay-panel4-network');
  if (netDom && typeof NETWORK_DATA !== 'undefined') {
    const nChart = echarts.init(netDom);
    nChart.setOption({
      tooltip: { formatter: '{b}' },
      legend: { bottom: 0, data: ['기본소득 클러스터', '디지털 페미니즘 클러스터', '고립된 연구자'], textStyle: { fontFamily: "'Pretendard', sans-serif" } },
      color: ['#3b82f6', '#10b981', '#94a3b8'],
      graphic: {
        elements: [{
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: '내부 인용\\n20건',
            textAlign: 'center',
            fill: '#475569',
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: "'Pretendard', sans-serif"
          }
        }]
      },
      series: [{
        type: 'graph',
        layout: 'circular',
        circular: { rotateLabel: true },
        roam: true,
        label: { show: true, position: 'right', formatter: '{b}', fontSize: 11, fontWeight: 'bold', fontFamily: "'Pretendard', sans-serif" },
        lineStyle: { color: 'source', curveness: 0.3 },
        itemStyle: { borderColor: '#fff', borderWidth: 2, shadowColor: 'rgba(0,0,0,0.2)', shadowBlur: 10 },
        categories: [
          { name: '기본소득 클러스터' },
          { name: '디지털 페미니즘 클러스터' },
          { name: '고립된 연구자' }
        ],
        data: NETWORK_DATA.nodes,
        links: NETWORK_DATA.edges
      }]
    });

    // 노드 클릭 시 전공 테이블 팝업 띄우기
    nChart.on('click', function(params) {
      if (params.dataType === 'node' || params.dataType === 'edge') {
        document.getElementById('researcher-majors-modal').style.display = 'flex';
      }
    });

    window.addEventListener('resize', () => nChart.resize());
    setTimeout(() => nChart.resize(), 500);
  }

  // [패널 2 하단] 인용 매트릭스 히트맵
  const matrixDom = document.getElementById('essay-panel4-matrix');
  if (matrixDom && typeof CITATION_MATRIX_DATA !== 'undefined') {
    const mChart = echarts.init(matrixDom);
    mChart.setOption({
      tooltip: {
        position: 'top',
        formatter: function(p) {
          const from = p.data[1] === 0 ? '타 기관' : '서울시립대';
          const to = p.data[0] === 0 ? '타 기관' : '서울시립대';
          return `${from} → ${to}: <b>${p.data[2]}건</b>`;
        }
      },
      grid: { top: '15%', bottom: '15%', left: '25%', right: '10%' },
      xAxis: {
        type: 'category',
        data: ['인용 대상:\n타 기관', '인용 대상:\n서울시립대'],
        splitArea: { show: true },
        axisLabel: { fontFamily: "'Pretendard', sans-serif", fontSize: 12 }
      },
      yAxis: {
        type: 'category',
        data: ['인용 주체:\n타 기관', '인용 주체:\n서울시립대'],
        splitArea: { show: true },
        axisLabel: { fontFamily: "'Pretendard', sans-serif", fontSize: 12, fontWeight: 'bold' }
      },
      visualMap: {
        min: 0, max: 70,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 0,
        inRange: { color: ['#f1f5f9', '#93c5fd', '#3b82f6', '#1e3a8a'] }
      },
      series: [{
        name: '인용 건수',
        type: 'heatmap',
        data: CITATION_MATRIX_DATA.data,
        label: { show: true, fontSize: 20, fontWeight: 'bold', color: '#000' },
        itemStyle: { borderColor: '#fff', borderWidth: 2 }
      }]
    });
    window.addEventListener('resize', () => mChart.resize());
    setTimeout(() => mChart.resize(), 500);
  }
}

function initPanel04Contributors() {
  const dom = document.getElementById('essay-panel4-contributors');
  if (!dom || typeof JOURNAL_CONTRIBUTOR_DATA === 'undefined') return;
  const chart = echarts.init(dom);
  chart.setOption({
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } } },
    legend: { data: ['해외 기관', '국내 타 기관', '서울시립대'], bottom: 0, textStyle: { fontFamily: "'Pretendard', sans-serif" } },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: JOURNAL_CONTRIBUTOR_DATA.years,
        axisLabel: { fontFamily: "'Pretendard', sans-serif", color: '#64748b' }
      }
    ],
    yAxis: [ { type: 'value', axisLabel: { fontFamily: "'Pretendard', sans-serif", color: '#64748b' } } ],
    series: [
      {
        name: '해외 기관', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' },
        color: '#3b82f6', data: JOURNAL_CONTRIBUTOR_DATA.foreign
      },
      {
        name: '국내 타 기관', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' },
        color: '#10b981', data: JOURNAL_CONTRIBUTOR_DATA.domestic
      },
      {
        name: '서울시립대', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' },
        color: '#ef4444', data: JOURNAL_CONTRIBUTOR_DATA.uos
      }
    ]
  });
  
  // 클릭 이벤트 추가
  chart.on('click', function(params) {
    const year = params.name;
    const listDom = document.getElementById('essay-panel4-foreign-list');
    if (!listDom || typeof FOREIGN_PAPERS_DATA === 'undefined') return;
    
    const papers = FOREIGN_PAPERS_DATA[year];
    if (!papers || papers.length === 0) {
      listDom.innerHTML = `<div style="color: #64748b; font-size: 0.95rem; text-align: center; margin-top: 40%;"><b>${year}년</b>에는 해외 투고자 논문이 없습니다.</div>`;
      return;
    }
    
    let html = `<div style="margin-bottom: 1rem; color: #3b82f6; font-weight: bold; font-size: 1.1rem;">${year}년 해외 투고 논문 (${papers.length}편)</div>`;
    papers.forEach((p, idx) => {
      html += `
        <div onclick="showForeignPaperModal('${year}', ${idx})" style="padding: 0.8rem; background: #f1f5f9; border-radius: 6px; margin-bottom: 0.8rem; border-left: 4px solid #3b82f6; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='#f1f5f9'">
          <div style="font-size: 0.95rem; font-weight: bold; color: #1e293b; margin-bottom: 0.4rem; line-height: 1.4;">${p.title}</div>
          <div style="font-size: 0.85rem; color: #475569;">
            <span style="color: #3b82f6; font-weight: bold;">${p.author}</span> | ${p.inst}
          </div>
        </div>
      `;
    });
    listDom.innerHTML = html;
  });

  window.addEventListener('resize', () => chart.resize());
}

function showForeignPaperModal(year, index) {
  const paper = FOREIGN_PAPERS_DATA[year][index];
  if (!paper) return;

  document.getElementById('fp-modal-year').innerText = year + '년';
  document.getElementById('fp-modal-title').innerText = paper.title;
  document.getElementById('fp-modal-author-inst').innerHTML = `<span style="color: #2563eb; font-weight: bold;">${paper.author}</span> | ${paper.inst}`;
  document.getElementById('fp-modal-abstract').innerText = paper.abstract || '초록 정보가 없습니다.';
  document.getElementById('fp-modal-keyword').innerText = paper.keyword || '키워드 정보가 없습니다.';
  
  const urlBtn = document.getElementById('fp-modal-url');
  if (paper.url && paper.url !== '#') {
    urlBtn.href = paper.url;
    urlBtn.style.display = 'inline-block';
  } else {
    urlBtn.style.display = 'none';
  }

  document.getElementById('foreign-paper-detail-modal').style.display = 'flex';
}

function initPanel04TopCited() {
  const dom = document.getElementById('essay-panel4-topcited');
  if (!dom || typeof TOP_CITED_DATA === 'undefined') return;
  const chart = echarts.init(dom);
  chart.setOption({
    color: ['#ef4444', '#3b82f6'],
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: ['서울시립대', '외부 기관'], bottom: 0, textStyle: { fontFamily: "'Pretendard', sans-serif" } },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '5%', containLabel: true },
    xAxis: { type: 'value', axisLabel: { fontFamily: "'Pretendard', sans-serif" } },
    yAxis: {
      type: 'category',
      data: TOP_CITED_DATA.map(d => d.title).reverse(),
      axisLabel: { 
        fontFamily: "'Pretendard', sans-serif", 
        width: 140, 
        overflow: 'truncate',
        lineHeight: 14
      }
    },
    series: [
      {
        name: '서울시립대', type: 'bar', stack: 'total',
        data: TOP_CITED_DATA.map(d => ({
          value: d.type === '시립대' ? d.cites : '-',
          itemStyle: { color: '#ef4444' }
        })).reverse(),
        label: { show: true, position: 'right', fontFamily: "'Pretendard', sans-serif", fontWeight: 'bold' }
      },
      {
        name: '외부 기관', type: 'bar', stack: 'total',
        data: TOP_CITED_DATA.map(d => ({
          value: d.type !== '시립대' ? d.cites : '-',
          itemStyle: { color: '#3b82f6' }
        })).reverse(),
        label: { show: true, position: 'right', fontFamily: "'Pretendard', sans-serif", fontWeight: 'bold' }
      }
    ]
  });

  chart.on('click', function(params) {
    // data in series is reversed, so actual index in TOP_CITED_DATA is reversed
    const actualIndex = TOP_CITED_DATA.length - 1 - params.dataIndex;
    const paper = TOP_CITED_DATA[actualIndex];
    if (!paper) return;
    
    document.getElementById('top10-modal-rank').innerText = `피인용 ${paper.rank}위 (${paper.cites}회)`;
    document.getElementById('top10-modal-title').innerText = paper.title.replace('\n', ' ');
    document.getElementById('top10-modal-author').innerText = paper.author;
    
    let keywords = '키워드 데이터가 없습니다.';
    if (typeof TOP10_KEYWORDS_DATA !== 'undefined' && TOP10_KEYWORDS_DATA[actualIndex]) {
      keywords = TOP10_KEYWORDS_DATA[actualIndex];
    }
    
    if (keywords !== '키워드 정보가 없습니다.') {
      const kwHtml = keywords.split(',').map(k => `<span style="display:inline-block; padding:0.3rem 0.8rem; background:#f1f5f9; border:1px solid #cbd5e1; border-radius:6px; margin-right:0.5rem; margin-bottom:0.5rem; font-size:0.95rem; font-weight:bold; color:#0f172a;">#${k.trim()}</span>`).join('');
      document.getElementById('top10-modal-keywords').innerHTML = kwHtml;
    } else {
      document.getElementById('top10-modal-keywords').innerHTML = `<span style="color:#64748b;">${keywords}</span>`;
    }
    
    document.getElementById('top10-paper-modal').style.display = 'flex';
  });

  window.addEventListener('resize', () => chart.resize());
}

function initPanel05Treemap() {
  const dom = document.getElementById('essay-panel5-treemap');
  if (!dom || typeof CITATION_FIELD_DATA === 'undefined') return;
  const chart = echarts.init(dom);
  chart.setOption({
    tooltip: { formatter: '{b}: {c}건' },
    series: [{
      type: 'treemap',
      left: '2%', right: '2%', top: '2%', bottom: '2%',
      roam: false, nodeClick: false, breadcrumb: { show: false },
      label: { show: true, formatter: '{b}\n({c}건)', fontFamily: "'Pretendard', sans-serif" },
      itemStyle: { borderColor: '#fff' },
      data: CITATION_FIELD_DATA.map(d => ({
        name: d.name, value: d.value,
        itemStyle: { color: d.category === 'urban' ? '#ef4444' : (d.category === 'humanities' ? '#64748b' : '#94a3b8') }
      }))
    }]
  });
  window.addEventListener('resize', () => chart.resize());
}

function initPanel05Breakdown() {
  const dom = document.getElementById('essay-panel5-breakdown');
  if (!dom || typeof PAPER_CITATION_BREAKDOWN === 'undefined') return;
  const chart = echarts.init(dom);
  chart.setOption({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: ['원 전공', '기타', '도시/공간'], bottom: 0, textStyle: { fontFamily: "'Pretendard', sans-serif" } },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '5%', containLabel: true },
    xAxis: { type: 'value', axisLabel: { fontFamily: "'Pretendard', sans-serif" } },
    yAxis: {
      type: 'category',
      data: PAPER_CITATION_BREAKDOWN.papers.slice().reverse(),
      axisLabel: { fontFamily: "'Pretendard', sans-serif" }
    },
    series: [
      { name: '원 전공', type: 'bar', stack: 'total', color: '#3b82f6', data: PAPER_CITATION_BREAKDOWN.major.slice().reverse() },
      { name: '기타', type: 'bar', stack: 'total', color: '#cbd5e1', data: PAPER_CITATION_BREAKDOWN.other.slice().reverse() },
      { name: '도시/공간', type: 'bar', stack: 'total', color: '#ef4444', data: PAPER_CITATION_BREAKDOWN.urban.slice().reverse(),
        label: { show: true, position: 'inside', formatter: (p) => p.value === 0 ? '0' : p.value, color: '#fff', fontWeight: 'bold' }
      }
    ]
  });
  window.addEventListener('resize', () => chart.resize());
}

function initGhostPapersPanel() {
  if (typeof SECTION2_DATA === 'undefined') return;

  // 1. Horizontal Bar Chart (Ghost Papers vs Normal Papers)
  const barDom = document.getElementById('essay-panel2-horizontal-bar');
  if (barDom) {
    const wChart = echarts.init(barDom);
    const total = SECTION2_DATA.total_papers;
    const ghost = SECTION2_DATA.without_keyword;
    const normal = SECTION2_DATA.with_keyword;

    wChart.setOption({
      tooltip: { 
        trigger: 'axis', 
        axisPointer: { type: 'shadow' },
        formatter: function(params) {
          return params.map(p => `${p.seriesName}: ${p.value}편 (${Math.round((p.value/total)*100)}%)`).join('<br/>');
        }
      },
      legend: { bottom: 0, textStyle: { fontFamily: "'Pretendard', sans-serif" } },
      grid: { left: '2%', right: '5%', top: '15%', bottom: '30%', containLabel: true },
      xAxis: { type: 'value', show: false, max: total },
      yAxis: { type: 'category', data: ['논문 분포'], show: false },
      series: [
        {
          name: '관련어 미포함 논문',
          type: 'bar',
          stack: 'total',
          barWidth: 40,
          itemStyle: { color: '#94a3b8', borderRadius: [4, 0, 0, 4] },
          label: { show: true, position: 'inside', formatter: '{c}편\n(미포함)', color: '#fff', fontSize: 13, fontWeight: 'bold' },
          data: [ghost]
        },
        {
          name: '관련어 포함 논문',
          type: 'bar',
          stack: 'total',
          barWidth: 40,
          itemStyle: { color: '#10b981', borderRadius: [0, 4, 4, 0] },
          label: { show: true, position: 'inside', formatter: '{c}편\n(포함)', color: '#fff', fontSize: 13, fontWeight: 'bold' },
          data: [normal]
        }
      ]
    });
    window.addEventListener('resize', () => wChart.resize());
    setTimeout(() => wChart.resize(), 500);
  }

  // 2. Ghost Keywords Word Cloud
  const bubbleDom = document.getElementById('essay-panel2-ghost-bubble');
  if (bubbleDom) {
    const bChart = echarts.init(bubbleDom);
    bChart.setOption({
      tooltip: { show: true, formatter: '{b}: {c}번 출현' },
      series: [{
        type: 'wordCloud',
        shape: 'circle',
        left: 'center',
        top: 'center',
        width: '90%',
        height: '90%',
        right: null,
        bottom: null,
        sizeRange: [12, 50],
        rotationRange: [-45, 0, 45, 90],
        rotationStep: 45,
        gridSize: 8,
        drawOutOfBound: false,
        textStyle: {
          fontFamily: "'Pretendard', sans-serif",
          fontWeight: 'bold',
          color: function () {
            return 'rgb(' + [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') + ')';
          }
        },
        data: SECTION2_DATA.ghost_keywords
      }]
    });
    window.addEventListener('resize', () => bChart.resize());
    setTimeout(() => bChart.resize(), 500);
  }
}


function initPanel01Bottom() {
  const dom = document.getElementById('essay-panel1-wc-split');
  if (dom) {
    const chart = echarts.init(dom);
    const nodes = [
      { name: '도시', category: 2, symbolSize: 50 },
      { name: '도시인문학', category: 2, symbolSize: 55 },
      { name: '기억', category: 2, symbolSize: 45 },
      { name: '문화', category: 1, symbolSize: 35 },
      { name: '창조도시', category: 1, symbolSize: 40 },
      { name: '도시재생', category: 1, symbolSize: 45 },
      { name: '공동체', category: 1, symbolSize: 40 },
      { name: '정체성', category: 1, symbolSize: 40 },
      { name: '상하이', category: 1, symbolSize: 40 },
      { name: '인문도시', category: 1, symbolSize: 40 },
      { name: '인문학', category: 1, symbolSize: 40 },
      { name: '인문학 대중화', category: 1, symbolSize: 35 },
      { name: '평생교육', category: 1, symbolSize: 30 },
      { name: '공유지', category: 0, symbolSize: 40 },
      { name: '기본소득', category: 0, symbolSize: 40 },
      { name: '국가', category: 0, symbolSize: 35 },
      { name: '돌봄', category: 0, symbolSize: 35 },
      { name: '박완서', category: 0, symbolSize: 35 },
      { name: '장소성', category: 0, symbolSize: 35 },
      { name: '웹소설', category: 0, symbolSize: 35 },
      { name: '사이보그', category: 0, symbolSize: 40 },
      { name: '비인간', category: 0, symbolSize: 35 },
      { name: '라투르', category: 0, symbolSize: 35 }
    ];
    const links = [
      { source: '도시', target: '도시인문학' },
      { source: '도시', target: '도시재생' },
      { source: '도시', target: '상하이' },
      { source: '도시', target: '공유지' },
      { source: '도시', target: '장소성' },
      { source: '도시인문학', target: '인문도시' },
      { source: '도시인문학', target: '인문학' },
      { source: '도시재생', target: '창조도시' },
      { source: '창조도시', target: '문화' },
      { source: '도시재생', target: '공동체' },
      { source: '공동체', target: '정체성' },
      { source: '정체성', target: '기억' },
      { source: '상하이', target: '기억' },
      { source: '장소성', target: '기억' },
      { source: '인문도시', target: '인문학 대중화' },
      { source: '인문학 대중화', target: '평생교육' },
      { source: '공유지', target: '기본소득' },
      { source: '기본소득', target: '국가' },
      { source: '국가', target: '돌봄' },
      { source: '돌봄', target: '박완서' },
      { source: '웹소설', target: '사이보그' },
      { source: '사이보그', target: '비인간' },
      { source: '사이보그', target: '라투르' },
      { source: '비인간', target: '라투르' }
    ];
    chart.setOption({
      tooltip: { formatter: '{b}' },
      legend: { bottom: 0, data: ['서울시립대 의제', '타 기관 의제', '교차 의제'], textStyle: { fontSize: 12, color: '#475569' }, icon: 'roundRect' },
      color: ['#ef4444', '#3b82f6', '#a855f7'],
      series: [{
        type: 'graph', layout: 'force',
        force: { repulsion: 400, edgeLength: [50, 100], gravity: 0.05, layoutAnimation: false },
        roam: true,
        label: { show: true, position: 'inside', formatter: '{b}', fontSize: 12, fontWeight: 'bold', color: '#000' },
        itemStyle: { borderColor: '#fff', borderWidth: 1, shadowColor: 'rgba(0, 0, 0, 0.1)', shadowBlur: 5 },
        lineStyle: { color: '#bae6fd', width: 2, opacity: 0.8 },
        categories: [{ name: '서울시립대 의제' }, { name: '타 기관 의제' }, { name: '교차 의제' }],
        data: nodes, links: links
      }]
    });
    window.addEventListener('resize', () => chart.resize());
    setTimeout(() => chart.resize(), 500);
  }

  const theoristsDom = document.getElementById('essay-panel1-theorists');
  if (theoristsDom) {
    const tChart = echarts.init(theoristsDom);
    tChart.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { bottom: 0, data: ['서울시립대 인용', '타 기관 인용'], textStyle: { fontSize: 12 } },
      grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
      xAxis: { type: 'value', show: false },
      yAxis: { type: 'category', data: ['라깡', '라투르', '마르크스', '벤야민', '해러웨이', '르페브르', '하비'].reverse(), axisLabel: { fontSize: 12, fontWeight: 'bold', color: '#334155' }, axisLine: { show: false }, axisTick: { show: false } },
      color: ['#ef4444', '#3b82f6'],
      series: [
        { name: '서울시립대 인용', type: 'bar', stack: 'total', label: { show: true, position: 'inside' }, itemStyle: { borderRadius: [4, 0, 0, 4] }, data: [4, 6, 13, 5, 6, 3, 5].reverse() },
        { name: '타 기관 인용', type: 'bar', stack: 'total', label: { show: true, position: 'inside' }, itemStyle: { borderRadius: [0, 4, 4, 0] }, data: [1, 1, 4, 16, 2, 3, 5].reverse() }
      ]
    });
    window.addEventListener('resize', () => tChart.resize());
    setTimeout(() => tChart.resize(), 500);
  }
}


window.showLoyaltyPieModal = function() {
  const modal = document.getElementById('loyalty-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  
  const dom = document.getElementById('modal-loyalty-pie');
  if (!dom) return;
  const chart = echarts.init(dom);
  chart.setOption({
    tooltip: { trigger: 'item', formatter: '{a}<br/>{b}: {c}명 ({d}%)' },
    legend: { bottom: 0, icon: 'circle', textStyle: { fontSize: 12, color: '#475569' } },
    color: ['#ef4444', '#f59e0b', '#3b82f6'],
    title: [
      { text: '내부 투고자\n(서울시립대)', left: '25%', top: '42%', textAlign: 'center', textStyle: { fontSize: 13, color: '#475569', fontWeight: 'bold', lineHeight: 18 } },
      { text: '외부 투고자\n(타 기관)', left: '75%', top: '42%', textAlign: 'center', textStyle: { fontSize: 13, color: '#475569', fontWeight: 'bold', lineHeight: 18 } }
    ],
    series: [
      {
        name: '서울시립대 소속 투고자',
        type: 'pie',
        radius: ['45%', '65%'],
        center: ['25%', '45%'],
        itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
        label: { show: true, position: 'outside', formatter: '{c}명\n({d}%)', fontSize: 11, fontWeight: 'bold', color: '#475569' },
        labelLine: { length: 10, length2: 10 },
        data: [
          { name: '1회 게재 후 이탈', value: 43 },
          { name: '2회 게재', value: 10 },
          { name: '3회 이상 (단골)', value: 9 }
        ]
      },
      {
        name: '타 기관 소속 투고자',
        type: 'pie',
        radius: ['45%', '65%'],
        center: ['75%', '45%'],
        itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
        label: { show: true, position: 'outside', formatter: '{c}명\n({d}%)', fontSize: 11, fontWeight: 'bold', color: '#475569' },
        labelLine: { length: 10, length2: 10 },
        data: [
          { name: '1회 게재 후 이탈', value: 113 },
          { name: '2회 게재', value: 9 },
          { name: '3회 이상 (단골)', value: 9 }
        ]
      }
    ]
  });
  
  const lineDom = document.getElementById('modal-loyalty-line');
  if (lineDom) {
    const lineChart = echarts.init(lineDom);
    lineChart.setOption({
      tooltip: { trigger: 'axis', formatter: '{b}년: {c}명' },
      grid: { left: '8%', right: '5%', bottom: '15%', top: '25%' },
      xAxis: {
        type: 'category',
        data: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        axisLabel: { fontSize: 10, color: '#64748b' },
        axisLine: { lineStyle: { color: '#cbd5e1' } }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { type: 'dashed', color: '#e2e8f0' } },
        axisLabel: { fontSize: 10, color: '#64748b' },
        minInterval: 1
      },
      series: [
        {
          name: '1회성 투고',
          type: 'line',
          data: [5, 4, 5, 3, 3, 7, 0, 2, 1, 2, 0, 0, 1, 1, 2, 1, 6],
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: { color: '#ef4444' },
          lineStyle: { color: '#ef4444', width: 3 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(239, 68, 68, 0.4)' },
              { offset: 1, color: 'rgba(239, 68, 68, 0.0)' }
            ])
          },
          label: { show: true, position: 'top', formatter: '{c}', fontSize: 10, color: '#ef4444', fontWeight: 'bold' },
          markArea: {
            itemStyle: { color: 'rgba(241, 245, 249, 0.7)' },
            data: [
              [
                { xAxis: '2009' },
                { xAxis: '2014' }
              ]
            ]
          },
          markLine: {
            symbol: 'none',
            label: { position: 'insideStartTop', formatter: 'KCI 등재 전 (머릿수 동원기)', color: '#475569', fontSize: 11, fontWeight: 'bold' },
            lineStyle: { type: 'solid', color: 'transparent' },
            data: [
              { xAxis: '2009', yAxis: 7 }
            ]
          }
        }
      ]
    });
    setTimeout(() => lineChart.resize(), 100);
  }
  
  setTimeout(() => chart.resize(), 100);
};