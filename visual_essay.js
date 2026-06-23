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
          label: { show: true, position: 'inner', formatter: '{b}\n{c}명', fontSize: 10, fontWeight: 'bold', color: '#fff', textBorderColor: 'rgba(0,0,0,0.3)', textBorderWidth: 1 },
          data: [ { name: '서울시립대', value: 70 }, { name: '타 기관', value: 230 } ]
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
            text: '순수 타인 인용\n20건\n(자기인용 44건 제외)',
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
    
    mChart.on('click', function(params) {
      let type = '';
      if (params.data[0] === 1 && params.data[1] === 1) type = 'uos_uos';
      else if (params.data[0] === 0 && params.data[1] === 0) type = 'non_non';
      else if (params.data[0] === 0 && params.data[1] === 1) type = 'uos_non';
      else if (params.data[0] === 1 && params.data[1] === 0) type = 'non_uos';

      if (type !== '' && typeof showMatrixDetailModal === 'function') {
        showMatrixDetailModal(type);
      }
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
    
    const btn = document.getElementById('btn-show-citing-papers');
    if (btn) {
      btn.onclick = function() {
        document.getElementById('top10-paper-modal').style.display = 'none';
        const topKey = `top${actualIndex + 1}`;
        if (typeof TOP10_CITING_PAPERS !== 'undefined' && TOP10_CITING_PAPERS[topKey]) {
          const shortTitle = paper.title.split('\n')[0];
          showTopCitingPapersModal(`${paper.author} - ${shortTitle}`, TOP10_CITING_PAPERS[topKey]);
        } else {
          alert('해당 논문의 인용 데이터가 없습니다.');
        }
      };
    }
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
      label: { 
        show: true, 
        formatter: function(params) {
          const total = 152;
          const pct = ((params.value / total) * 100).toFixed(1);
          return `${params.name}\n(${params.value}건, ${pct}%)`;
        },
        fontFamily: "'Pretendard', sans-serif" 
      },
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

  chart.on('click', function(params) {
    if (!params.name) return;
    const paperName = params.name;
    const originalIndex = PAPER_CITATION_BREAKDOWN.papers.indexOf(paperName);
    if (originalIndex === -1) return;
    const topKey = `top${originalIndex + 1}`;
    
    if (typeof TOP10_CITING_PAPERS !== 'undefined' && TOP10_CITING_PAPERS[topKey]) {
      showTopCitingPapersModal(paperName, TOP10_CITING_PAPERS[topKey], topKey);
    } else {
      alert('해당 논문의 인용 데이터가 없습니다.');
    }
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
      color: ['#3b82f6', '#ef4444', '#a855f7'],
      series: [{
        type: 'graph', layout: 'force',
        force: { repulsion: 120, edgeLength: [20, 40], gravity: 0.15, layoutAnimation: false },
        roam: true,
        zoom: 0.8,
        center: ['50%', '45%'],
        label: { show: true, position: 'inside', formatter: '{b}', fontSize: 10, fontWeight: 'bold', color: '#000' },
        itemStyle: { borderColor: '#fff', borderWidth: 1, shadowColor: 'rgba(0, 0, 0, 0.1)', shadowBlur: 5 },
        lineStyle: { color: '#bae6fd', width: 2, opacity: 0.8 },
        categories: [{ name: '서울시립대 의제' }, { name: '타 기관 의제' }, { name: '교차 의제' }],
        data: nodes.map(function(n) { return { name: n.name, category: n.category, symbolSize: n.symbolSize * 0.75 }; }),
        links: links
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
      yAxis: { type: 'category', data: ['라깡', '라투르', '마르크스', '벤야민', '푸코', '해러웨이', '르페브르', '하비'].reverse(), axisLabel: { fontSize: 12, fontWeight: 'bold', color: '#334155' }, axisLine: { show: false }, axisTick: { show: false } },
      color: ['#3b82f6', '#ef4444'],
      series: [
        { name: '서울시립대 인용', type: 'bar', stack: 'total', label: { show: true, position: 'inside' }, itemStyle: { borderRadius: [4, 0, 0, 4] }, data: [4, 6, 13, 5, 4, 6, 3, 5].reverse() },
        { name: '타 기관 인용', type: 'bar', stack: 'total', label: { show: true, position: 'inside' }, itemStyle: { borderRadius: [0, 4, 4, 0] }, data: [1, 1, 4, 16, 21, 2, 3, 5].reverse() }
      ]
    });
    
    tChart.on('click', function(params) {
      if(window.showTheoristPapers) window.showTheoristPapers(params.name);
    });

    window.addEventListener('resize', () => tChart.resize());
    setTimeout(() => tChart.resize(), 500);
  }
}

// 이론가 데이터 (샘플)
const DUMMY_THEORIST_PAPERS = {
  "푸코": [
    {
      "title": "미셸 푸코의 '헤테로토피아' - 초기 공간 개념에 대한 비판적 검토",
      "author": "허경",
      "abstract": "본 논문은 미셸 푸코(Michel Foucault)의 1966-1967년의 논문 「헤테로토피아」 및 「다른 공간들」에 나타난 푸코 초기 사유에 있어서의 공간ㆍ지리ㆍ문화에 관한 논의를 비판적으로 소개ㆍ검토하는 것에 목표를 둔다. 칸트의 공간관 및 데이비드 하비의 비판을 다룬 후, 푸코의 헤테로토피아 개념이 갖는 이질성과 권력, 지식의 관계를 분석한다.",
      "keywords": "푸코, 헤테로토피아, 공간, 지리, 권력, 하비",
      "isUOS": false
    },
    {
      "title": "서구근대도시 형성의 계보학 - 미셸 푸코의 도시관",
      "author": "허경",
      "abstract": "푸코에게 서구근대도시의 형성이란 이 시기의 다양한 사건들이 일어난 장소임과 동시에, 그 자체가 이미 서구근대의 시기에 일어난 가장 중요한 사건들 중 하나이다. 초기 구조주의적 함축으로부터 시작하여 말기의 계보학에 이르기까지 푸코의 사유는 근본적으로 공간적 관점에서 전개된다. 도시에 대한 계보학적 관점과 권력 장치로서의 공간을 고찰한다.",
      "keywords": "미셸 푸코, 서구근대도시, 계보학, 공간, 권력, 통치성",
      "isUOS": false
    },
    {
      "title": "미셀 푸코의 헤테로토피아 개념을 구현한 월리엄 포사이드의 <헤테로토피아>",
      "author": "김선화",
      "abstract": "미셀 푸코의 헤테로토피아는 한 사회 내의 일반적인 공간들과는 구분되는 절대적으로 다른 이질적인 공간이다. 이러한 푸코의 헤테로토피아 개념은 윌리엄 포사이드의 작품에서 공간, 언어, 음악, 움직임 등 여러 요소로 확장되어 구현되고 있다.",
      "keywords": "윌리엄 포사이드, 미셀 푸코, 헤테로토피아, 무용, 이질적 공간",
      "isUOS": false
    },
    {
      "title": "우리 시대가 ‘위험에 빠진 신체’에 대처하는 한 방식: 푸코의 『안전, 영토, 인구』를 중심으로",
      "author": "홍기숙",
      "abstract": "푸코의 권력 개념이 근대 국가의 통치적 합리성과 관계된 통치성(gouvernementalité)으로 이행하는 과정을 검토한다. 특히 사목 권력의 세속적 변용이 어떻게 생명과 삶을 전면적으로 관리하는 통치성의 효과로 이동하는지, 신자유주의적 현실에서 신체의 등장과 그 비판적 사유를 추적한다.",
      "keywords": "푸코, 안전, 영토, 인구, 통치성, 생명정치",
      "isUOS": true
    }
  ],
  "라깡": [
    {
      "title": "글로벌 시대의 대도시인의 정체성에 관한 연구: 도시인문학 방법론 논의의 맥락에서―조나단 프리드먼과 짐멜의 이론을 중심으로",
      "author": "홍준기",
      "abstract": "이 논문은 최근 국내에서도 많이 연구되고 있는 도시에 대한 인문학적 연구 방법론을 모색하고자 한다. 전통적으로 도시는 사회과학자들을 통해 이루어졌을 뿐만 아니라, 맑스주의자들에 의해 본격적으로 연구되기 시작했기 때문에 다분히 경제환원주의적 연구가 큰 흐름을 이루었다. 이 논문은 이러한 한계를 극복하고 비환원주의적인 인문학적 도시연구 방법론을 수립하기 위해 짐멜과 조나단 프리드먼의 이론을 소개, 분석, 비판한다. 프리드먼으로부터는 세계화 시대의 도시인들의 다양한 문화적 정체성이 어떻게 형성되며 그것들이 어떤 상관관계를 맺고 있는지, 그리고 그 다양한 문화적 정체성이 갖는 사회, 문화적 의미를 발견한다. 짐멜에서는 도시라는 물리적 한계를 너머 존재하는 총체적 요소의 집합이라는 변증법적 도시이론을 발견하고 더 나아가 프리드먼과 짐멜의 이론을 정신분석과 결합시킴으로써 이 논문은 도시인문학의 방법론이 취해야 할 방향을 모색한다.",
      "keywords": "도시, 짐멜, 조나단 프리드먼, 정신분석, 대도시, 근대성(현대성), 세계화",
      "isUOS": true
    },
    {
      "title": "발터 벤야민과 도시경험-벤야민의 도시인문학 방법론에 대한 고찰",
      "author": "홍준기",
      "abstract": "이 논문은 벤야민의 도시인문학 방법론을 해명하기 위해 정신분석적 관점을 취한다. 우선 벤야민 이론에 대한 탈정신분석적 해석의 역사 및 현황을 살펴보고 이의 문제점을 지적한 후 벤야민이 말하는 도시경험의 의미를 설명한다. 벤야민에 따르면 대도시에서의 현대인의 경험은 충격과 상실의 경험이다. 이 논문은 특히 보들레르로부터 차용한 상실의 개념을 벤야민 특유의 개념인 아우라 상실과 연결시켜 논의하고 아우라 상실의 경험이 새로운 아우라 경험을 위한 전제조건임을 밝힌다. 또한 현대 도시인이 겪는 충격 경험은 사람들을 방어적으로 만들어 그들을 무미건조하고 기계적인 행위와 체험의 차원으로 축소시키지만, 동시에 특히 영화와 같은 기술복제시대의 예술작품을 통해 상실한 ‘진정한 경험’을 찾을 수 있다는 사실을 밝힘으로써 벤야민 이론에 대한 새로운 해석을 모색한다. 끝으로 벤야민이 말하는 ‘촉각적 경험’과 시선의 상관관계를 라깡의 거울단계론과 불안이론과 관련시켜 간략히 논의하면서 논문을 결론짓는다.",
      "keywords": "벤야민, 정신분석, 라깡, 아우라, 도시, 도시경험, 시선, 촉각적 경험, 상실, 충격",
      "isUOS": true
    },
    {
      "title": "At the Crossroad of Psychoanalysis and Marxism -Walter Benjamin's Method of City Philosophy",
      "author": "홍준기",
      "abstract": "Walter Benjamin is one of the most important modern 'classic' thinkerswho took cities as a central theme, as we can read especially in hisunfinished masterpiece 'Passagenwerk'. However, even though manystudies have been made on Benjamin's 'city philosophy' so far, weseem to be far away from the complete and systematic understandingof his thought. So, Examining critically the way how Benjamin hasbeen received in the academic and cultural field, this paper proposes apsychoanalytic perspective for understanding his works andaesthetics/philosophy, especially by focusing on some importantkey-concepts of Benjamin: dialectical image, allegorical image andmelancholia. For Benjamin, the city is a space in which a capitalisticphantasmagoria and urban spectacles made possible by new technologyfunction in order to keep people in an eternal sleep and hinder themfrom waking up from the myth created by capitalism. But he does notgive up hope. Historical ruins, everyday appliance, monuments, arcades,buildings, advertisement posters, beggars, whores, flâneurs, etc. can be'constructed' as a dialectical image that will be blastered out of thecontinuum of history, and this dialectical image 'destroys' the myth ofprogress, and rescues the past from the oppression. Then this paperalso shows the dialectical image as the contradictory co-existence ofthe past and now can be interpreted as an allegorical image contraryto, for example, that of Susan Buck-Morss. The city is according to Benjamin not only the space, in which thecapitalists ring the bell of triumph, but also a space through which therepressed wish of the oppressed can finally come true. So the city canbe a appropriate place for the liberating political act, because, due tothe developed technology, everything in the city is in rapid changesand people in the city feel afflicted with the sense of loss, thereforebecome melancholic. In other words, the feeling of the spleen ormelancholia is not just a pathological state that should be avoided, buta necessary condition for the future revolutionary action, and in thissense I interpret the melancholia as being integrated into Benjamin'sthought as a new category of 'concrete' subject. Benjamin found outthis concrete subject through the study of the baroque Trauerspiel andhe replaced the traditional subject concept of idealism with it.",
      "keywords": "Benjamin, Freud, Lacan, psychoanalysis, dialectical image, allegorical image, melancholia, city. criticism of the idea of progressive history",
      "isUOS": true
    },
    {
      "title": "초현실주의 이념과 라깡 정신분석학의 관련성 연구: 발터 벤야민의 「초현실주의」를 중심으로",
      "author": "남인숙",
      "abstract": "초현실주의는 시적(詩的) 실천을 통해 프로이트가 발견한 ‘무의식’을 삶 속에 구현하려 한 예술운동이다. 브르통의 자동기술법이나 살바도르 달리의 ‘비판적 망상증적 방법’은 구체적인 삶의 현실이 곧 무의식적 삶임을 드러내려는 초현실주의의 대표적인 실천방법이라고 할 수 있다. 벤야민은 일찍이 ‘초현실주의’논문을 통해서 초현실주의 이러한 실천적이고 전복적인 힘을 간파하고 있음을 보여준다. 라깡 또한 자신의 세미나에 등장하는 많은 인용이나 언급을 통해 초현실주의와 고유한 영향관계를 보여주고 있다. 다른 한편으로 예술의 장에서, 현대미술은 초현실주의에 영향 받은 바가 막대함에도 불구하고 이론적, 이념적 조명은 상대적으로 빈약한 편이다. 본 글은 이런 점에 주목하여, 벤야민의 ‘초현실주의’ 논문을 중심으로 초현실주의와 라깡의 정신분석학의 관련성을 해명하는 것이다. 이것은 우선 초현실주의 연구를 한 차원 더 확장하여 초현실주의에 대한 이해를 높이며 따라서 현대미술에 대한 이해의 폭을 넓힌다는 의의를 지닌다. 둘째 벤야민의 유물론적 사유에서 ‘초현실주의’의 이념이 차지하는 위상을 파악해 볼 수 있다. 이로써 벤야민 사유 과정에서, 그의 언어관과 실천방법에 대한 이해를 보충한다는 의의를 지닌다. 셋째 초현실주의에서 논제를 보다 확대하여, 벤야민의 ‘초현실주의’에서 제출한 논점들을 라깡의 정신분석학을 통해서 보충적으로 해명함으로써, 벤야민 사유에 산포해 있는 정신분석학적인 단서를 정신분석학적인 방법을 통해서 ‘실질적으로 구체화’한다는 의의를 지닌다. 이는 벤야민 해명의 지평을 확대할 가능성을 보이는 것이다.",
      "keywords": "초현실주의, 정신분석학, 벤야민, 라깡, 브르통, 뒤샹, 무의식, 범속한 각성, 변증법적 이미지, 미메시스, 발견된 오브제, 충동, 궁정풍 사랑, 욕망, 레디메이드",
      "isUOS": false
    },
    {
      "title": "도시공간 구성의 의미에 관한 인문학적, 정신분석적 고찰:랑시에르와 라깡을 중심으로",
      "author": "홍준기",
      "abstract": "이 논문은 도시 및 도시공간이 갖는 근본적 의미를 탐색하기 위해 랑시에르의 미학과 라깡의 ‘병리적 공간화’의 문제를 연구한다. 현대사회에서 도시는 행정적 편의주의와 대자본의 경제적 이익이 공모하는 가운데, 인간주체의 기본적 욕망과 인권, 자유의 실현에 역행하는, 지극히 비인간적 방식으로 발전하고 있다. 이 논문은 도시의 비인간화에 기여하는 도시개발정책이나 사회과학적 도시론에 반대하면서, 도시가 인간의 본원적인 욕망과 기본권, 자유의 증진에 기여할 수 있기 위해서 참조해야 할 인문학적, 정신분석적 원리가 무엇인지 서술한다. 향유와 예술적 감수성을 중시하는 도시사학자 멈포드의 도시의 기원론으로부터 시작해, 랑시에르의 ‘감성의 분할’이론, 그리고 공간적 고착화로서의 망상증이라는 라깡 이론을 제시함으로써 이 논문은 행정적 효율성과 경제적 이윤 추구를 넘어 도시가 추구해야 할 기본적 가치가 무엇인지 탐구한다.",
      "keywords": "도시, 도시공간, 라깡, 랑시에르, 멈포드, 공간화, 망상증",
      "isUOS": true
    }
  ],
  "라투르": [
    {
      "title": "디지털 폴리스의 정의와 커먼즈를 다시 사유하기",
      "author": "김은주",
      "abstract": "디지털 폴리스는 디지털 매체가 되어가는 도시 공간이며 비유클리드적 관계망으로 나타난다. 스마트 도시와 동일시 된 디지털 폴리스는 안전을 명목 삼아 동질성을강화하는 ‘빗장 공동체(gated community)’가 될 가능성이 높다. 그러나 매체로서 디지털 폴리스는 데이터를 생성하는 환경이자 관계적 실재이다. 이 공간에서는 인간 행위자와 비인간 행위자 그리고 디지털 기술을 공동 작용하게 하는 차이 생성과 관계의 연결이 중요하다. 이 글은 빗장 공동체화를 비판하며, 커먼즈의 논의를 통해 디지털 폴리스의 정의를 모색한다. 슬로터다이커의 거품 도시와 대기 디자인 개념은 커먼즈를 주어진 자원으로 규정하고 분배하는 입장에서 벗어나, 기술과 함께하는 커머닝의 과정 그 자체이자 활동을 커먼즈로 이해할 수 있게 한다. 커머닝의 행위자로서 기술은 브뤼노라투르의 행위자네트워크이론(actor-network theory)의 맥락에서 설명 될 수 있다. 이를 통해, 디지털 폴리스의 정의를 기술에 얽힌 커머닝의 역량을 강화하는 지속가능한 정의로서 사유할 수 있다.",
      "keywords": "디지털 폴리스, 슬로터다이크, 빗장 공동체, 정의, 커먼즈",
      "isUOS": true
    },
    {
      "title": "도시 공간과 허구의 존재자 - ‘미소녀 전사의 도시인류학’을 위한 시론",
      "author": "정헌목",
      "abstract": "본 연구는 1990년대 인기 애니메이션 <미소녀 전사 세일러 문>을 사례로 현실의도시 공간과 대중문화 속 공간의 관계를 ‘존재양식’의 차원에서 고찰하는 시론적논의다. 특히 브뤼노 라투르(Bruno Latour)가『존재양식의 탐구』에서 제시한 ‘허구의존재자’ 개념을 이론적 토대로 삼아 허구와 현실의 상호구성 양상을 탐색한다. <미소녀 전사 세일러 문>은 도쿄의 미나토구 아자부주반이라는 특정 지역을 배경으로, 허구적 서사와 현실 공간이 긴밀하게 결합된 작품이다. 본 연구는 작품 내에서 현실 공간이 어떻게 재현되는지, 그리고 현실에서 작품이 어떻게 활용되는지에 관한 분석을 통해 허구와 현실의 연결망이 형성 및 확장되는 양상을 논의하였다. 이를 위해 서사 분석과 실제 배경 장소와의 비교, 그리고 작품 관련 2차 자료 검토를 병행하여 허구-현실의 교차 지점을 다각적으로 검토하였다. 이러한 논의는 도시 공간 연구에 ‘허구의 존재자’라는 개념을 적용하는 구체적 방법을 제시함과 동시에, 대중문화가 도시 장소성 형성에 기여하는 새로운 경로를 보여준다. 이를 통해 도시 공간을 매개로 한 허구와 현실의 상호구성 기제를 밝히고, 나아가 도시에 관한 인문학 연구의 이론적 확장 가능성을 제시한다.",
      "keywords": "도시 공간, 허구의 존재자, 존재양식, 세일러 문, 도시 재현",
      "isUOS": false
    },
    {
      "title": "인간-기술 관계와 기술철학과 과학철학의 의도하지 않은 조우",
      "author": "이상원",
      "abstract": "기술철학자 아이드는 세 가지 ‘인간-기술 관계’를 제시한다. 그는 기술철학과 과학철학이 근래에 상호 분리 상태를 벗어나 탐구 영역에서 서로 중첩되는 부분을 나타내는 상황을 맞이했다고 본다. 필자는 아이드가 제시하고 있는 세 가지 인간-기계 관계를 중심으로 과학철학에서 라투르와 해킹의 논의를 대상으로 삼아 기술철학과 과학철학의 몇몇 접촉면이 어떻게 형성되고 있는지를 살펴볼 것이다. 도구쓰기를 중심으로, 그러한 접촉면은 주로 TRF(H)를 산출한 실험실과 실험과학의 현미경술과 관계된다. 이러한 접촉면은 기술철학자와 과학철학자가 서로가 만나기를 희구한 결과로 나온 것이라기보다는 의도하지 않은 만남에 가까운 것으로 볼 수 있다. 하지만 의도하지 않은 만남임에도 꽤 유의미한 만남이라고 할 수 있다.",
      "keywords": "아이드, 라투르, 해킹, 기술, 도구쓰기",
      "isUOS": true
    },
    {
      "title": "라투르의 구성주의와 해킹의 실험적 실재론",
      "author": "이상원",
      "abstract": "과학철학자 해킹은 라투르와 울거의 『실험실 생활』에 대해 그의 논문 한 편 전체를 통하여 그 의의를 평가한다. 해킹은 그 책의 철학적 중요성을 강조한다. 이 평가는 그 후 라투르가 과학철학만이 아니라 과학학, 여타 인문학, 사회과학 등에 큰 기여를 하는 학자가 되는 데 많은 영향을 미친다. 해킹은 영미권 과학철학의 분석적 전통에서 출발한 연구자이며 그 논문을 쓰기 몇 년 전 『표상하기와 개입하기』을 낸 바 있고 여기서 실험에 관한 철학적 연구를 제시한다. 반면 라투르와 울거는 영미권 과학철학 바깥에 있었으며, 특히 라투르는 프랑스 학자이고 신학 박사학위를 받은 이였다. 라투르는 인류학적 방법, 혹은 민족지학적 방법으로 실험실을 탐구하였는데, 이는 매우 독창적이었으며 영미권 과학철학에서는 철저히 생소한 연구였다. 당시에 해킹은 실재론/반실재론 논쟁의 맥락에 중점을 두고 실험과학의 철학에 접근했다. 이처럼 과학에 관한 인류학적 논의 맥락과 실재론/반실재론 논의 맥락의 커다란 차이에도 불구하고 『실험실 생활』과 『표상하기와 개입하기』 사이에는 많은 유사성이 있다. 이 논문에서 필자는 유사성과 더불어 차이에 대해서 살펴본다. 각각 과학인류학과 영미권 과학철학의 실재론/반실재론 논쟁 속에서 서로 다르게 시작한 라투르와 해킹의 입장을 대비하고자 한다.",
      "keywords": "라투르, 해킹, 문헌적 기록하기, 현상의 창조, 과학의 실천",
      "isUOS": true
    },
    {
      "title": "다중위기 시대, 비인간 전회와 회절의 정치",
      "author": "김은주",
      "abstract": "이질적 현상들의 복합 위기를 뜻하는 다중 위기의 상황은 코로나19 바이러스로 인한 팬데믹을 기점으로 지구 행성적 재난으로 본격화되고 있다. 이 글은 ‘비인간전회’를 통과해 다중위기상황에서 새로운 정치적 이행을 모색하는 행위자(actor)와 그 연결을 살핀다. 글의 구성은 다음과 같다. 우선 비인간 전회의 의미를 짚고, 브루노 라투르의 행위자 네트워크 개념을 해러웨이가 제안한 광학적 기구가 행하는 회절(diffraction)과 연결하여 설명한다. 행위성은 다양한 행위자들의 행위의 중첩과 얽힘 그리고 연결에 따른 것이라는 점에서, 간섭의 패턴으로서 회절이라는 개념과 연관한다. 이러한 회절은 바라드의 양자적 이해를 통과해 중첩과 얽힘 그리고 전유할 수 없는 타자들의 간섭한 패턴으로 구체화된다. 바라드는 이러한 얽힘이 타자화의 흔적에 얽매여 있는 관계이기에 다른 것과 얽혀 있는 의무의 관계를 드러낸다고 설명한다. 바라드는 특히 회절의 특징은 모호성과 미결정성을 강조하며 이분법적 사유를 넘어서 인간 행위자와 비인간 행위자 연결을 강조하는 회절의 정치의 가능성을 제시한다.",
      "keywords": "다중위기, 바라드, 비인간전회, 해러웨이, 행위자-네트워크, 회절",
      "isUOS": true
    },
    {
      "title": "데리다의 에크리튀르와 라투르의 문헌적 기록하기",
      "author": "이상원",
      "abstract": "데리다의 ‘에크리튀르’ 혹은 ‘그라마’는 우리말로 기록, 쓰기 혹은 그리기라고 부를 만하다. 에크리튀르는 그림, 글자(표의 문자, 표음 문자 등), 컴퓨터 모니터 위의 그래픽, 텔레비전, 비디오 영상 등을 포괄한다. 라투르는 과학 논문 산출을 두 단계로 나누어 이해한다. 하나는 ‘문헌적 기록하기’이고 다른 하나는 ‘논문 쓰기’이다. 문헌적 기록하기는 실험의 결과가 시각화되어 나타나는 바를 말한다. 심전도, 지진도 혹은 수치, 통계표 혹은 기타 그림 등이 문헌적 기록하기에 속한다. 라투르는 그가 ‘기록하기 장치’라고 부르는 실험 도구에서 나오는 상(이미지)이나 도표에 초점을 두고 있다. 논문 쓰기는 이 문헌적 기록하기를 바탕으로 논문을 작성하는 일을 말한다. 라투르가 말하는 문헌적 기록하기와 논문 쓰기 두 가지 모두 데리다의 에크리튀르 혹은 그라마에 속한다. 그의 실험실 철학의 강조점은 실험실 속 실험적 실천과 그러한 실험적 실천에서 나오는 산물로서 문헌적 기록하기의 성격을 파헤친 데 있다.",
      "keywords": "데리다, 에크리튀르, 그라마, 라투르, 문헌적 기록하기",
      "isUOS": true
    },
    {
      "title": "불트만의 신약성서 신학에서 라투르의 과학철학으로: 매개의 수 늘리기 또는 번역의 연결망",
      "author": "이상원",
      "abstract": "라투르의 과학철학은 통상적 기대를 깨는 기원을 갖고 있다. 『실험실 생활』에 드러난 라투르의 사고는 독일 신약성서 신학자 불트만의 영향을 받았다. 이는 라투르 스스로 인정한 것이다. 라투르의 과학철학은 불트만의 신약성서 신학에서 강력한 힌트를 얻었다. 공관복음 전승을 둘러싼 탐구를 통해 역사적 예수에 관한 의혹에 도달한 불트만의 신약성서 텍스트 연구 방법이 라투르의 실험실 철학, 과학적 사실 구성 과정에 끼친 영향을 밝히고자 했다. 매개의 수 늘리기, 번역의 사슬, 번역의 연결망, 또는 혼성이라는 개념을 중심으로 논의를 전개했다.",
      "keywords": "불트만, 라투르, 매개의 수 늘리기, 번역의 사슬, 번역의 연결망",
      "isUOS": true
    }
  ],
  "마르크스": [
    {
      "title": "글로벌 시대의 대도시인의 정체성에 관한 연구: 도시인문학 방법론 논의의 맥락에서―조나단 프리드먼과 짐멜의 이론을 중심으로",
      "author": "홍준기",
      "abstract": "이 논문은 최근 국내에서도 많이 연구되고 있는 도시에 대한 인문학적 연구 방법론을 모색하고자 한다. 전통적으로 도시는 사회과학자들을 통해 이루어졌을 뿐만 아니라, 맑스주의자들에 의해 본격적으로 연구되기 시작했기 때문에 다분히 경제환원주의적 연구가 큰 흐름을 이루었다. 이 논문은 이러한 한계를 극복하고 비환원주의적인 인문학적 도시연구 방법론을 수립하기 위해 짐멜과 조나단 프리드먼의 이론을 소개, 분석, 비판한다. 프리드먼으로부터는 세계화 시대의 도시인들의 다양한 문화적 정체성이 어떻게 형성되며 그것들이 어떤 상관관계를 맺고 있는지, 그리고 그 다양한 문화적 정체성이 갖는 사회, 문화적 의미를 발견한다. 짐멜에서는 도시라는 물리적 한계를 너머 존재하는 총체적 요소의 집합이라는 변증법적 도시이론을 발견하고 더 나아가 프리드먼과 짐멜의 이론을 정신분석과 결합시킴으로써 이 논문은 도시인문학의 방법론이 취해야 할 방향을 모색한다.",
      "keywords": "도시, 짐멜, 조나단 프리드먼, 정신분석, 대도시, 근대성(현대성), 세계화",
      "isUOS": true
    },
    {
      "title": "들뢰즈의 차이와 반복: 그 구조와 의미",
      "author": "신지영",
      "abstract": "근대의 합리적 이성에 대한 비판의식을 공유하고 있는 현대 철학자들이 함께 쓰고 있는 <차이> 개념은 많은 인접 학문에 지대한 영향을 미치고 있다. 소수자를 사유의 대상으로 삼는 정치학, 새로운 민중 개념을 다듬는데 관심을 갖는 마르크스 이후의 사회 과학, 동일성과 차이라는 개념을 중심으로 역사를 만들어왔던 여성주의, 새로운 비평이론의 근거를 필요로 하는 문학, 학문적 근거가 필요한 영화, 생명에 대한 새로운 이념을 필요로 하는 생명 과학, 그 밖에도 탈식민주의, 생태주의 등. 그러나 <차이> 개념에 대한 이러한 광범위한 철학 외부의 관심으로 <차이>에 대한 이해가 성급하게 정착되어 그 수준의 인식이 고착되었다는 문제점을 노출하고 있다. 이 논문은 이러한 문제 인식으로부터 비롯하여 <차이>의 구조와 의미를 진지하게 천착하는 것이 필요하다는 인식하에 철학자 들뢰즈에게 있어서 <차이와 반복>이 구체적으로 어떤 구조와 의미를 가지고 있는지를, 스피노자와 라이프니츠로부터 받아들인 그의 논증의 방법, 헤겔과 라이프니츠의 차이와의 관계, 흄과 베르그손 그리고 니체에게 있어서 나타나는 반복과의 관계 등을 통해 밝히고자 한다.",
      "keywords": "차이, 반복, 습관, 기억, 영원 회귀, 들뢰즈, 헤겔, 라이프니츠, 스피노자",
      "isUOS": true
    },
    {
      "title": "At the Crossroad of Psychoanalysis and Marxism -Walter Benjamin's Method of City Philosophy",
      "author": "홍준기",
      "abstract": "Walter Benjamin is one of the most important modern 'classic' thinkerswho took cities as a central theme, as we can read especially in hisunfinished masterpiece 'Passagenwerk'. However, even though manystudies have been made on Benjamin's 'city philosophy' so far, weseem to be far away from the complete and systematic understandingof his thought. So, Examining critically the way how Benjamin hasbeen received in the academic and cultural field, this paper proposes apsychoanalytic perspective for understanding his works andaesthetics/philosophy, especially by focusing on some importantkey-concepts of Benjamin: dialectical image, allegorical image andmelancholia. For Benjamin, the city is a space in which a capitalisticphantasmagoria and urban spectacles made possible by new technologyfunction in order to keep people in an eternal sleep and hinder themfrom waking up from the myth created by capitalism. But he does notgive up hope. Historical ruins, everyday appliance, monuments, arcades,buildings, advertisement posters, beggars, whores, flâneurs, etc. can be'constructed' as a dialectical image that will be blastered out of thecontinuum of history, and this dialectical image 'destroys' the myth ofprogress, and rescues the past from the oppression. Then this paperalso shows the dialectical image as the contradictory co-existence ofthe past and now can be interpreted as an allegorical image contraryto, for example, that of Susan Buck-Morss. The city is according to Benjamin not only the space, in which thecapitalists ring the bell of triumph, but also a space through which therepressed wish of the oppressed can finally come true. So the city canbe a appropriate place for the liberating political act, because, due tothe developed technology, everything in the city is in rapid changesand people in the city feel afflicted with the sense of loss, thereforebecome melancholic. In other words, the feeling of the spleen ormelancholia is not just a pathological state that should be avoided, buta necessary condition for the future revolutionary action, and in thissense I interpret the melancholia as being integrated into Benjamin'sthought as a new category of 'concrete' subject. Benjamin found outthis concrete subject through the study of the baroque Trauerspiel andhe replaced the traditional subject concept of idealism with it.",
      "keywords": "Benjamin, Freud, Lacan, psychoanalysis, dialectical image, allegorical image, melancholia, city. criticism of the idea of progressive history",
      "isUOS": true
    },
    {
      "title": "현대 시민사회의 지배양식",
      "author": "이성백",
      "abstract": "이 논문은 20세기 서구 비판적 사회철학의 주요 이론들인 그람시의 헤게모니론, 알튀세르의 이데올로기적 국가장치론, 아도르노의 문화산업론, 푸코의 미시권력론, 들뢰즈의 욕망의 영토화론을 권력과 지배의 관점에서 비교 고찰하고, 이로부터 통합적인 현대시민사회의 지배양식론을 구성하고자 시도한다. 맑스주의적 지배양식론에 해당하는 그람시의 헤게모니론과 알튀세르의 이데올로기적 국가장치론은 대중의 의식의 이데올로기적 지배의 측면에 초점이 맞추어져 있다. 물리적 강제력으로서의 국가에 한정되어 있던 시각을 이데올로기 측면으로까지 확장한 것은 이들의 이론적인 기여이나, 다른 한편 이데올로기적 지배와 복합적으로 작동하는 다른 지배양식인 경제적 지배 양식의 문제를 간과하였다. 푸코와 들뢰즈를 위시한 포스트모던 지배양식론은 맑스주의적 지배양식론과 비교할 때, 지배양식의 분석을 확대, 심화하는 새로운 내용들을 발전시키고 있다. 후자의 이데올로기 분석이 주로 의식의 영역에서 이루어졌던 데에 비해, 푸코의 생체권력이나 들뢰즈의 욕망의 영토화론은 이 의식의 영역을 넘어 무의식과 육체, 욕망의 영역으로 확장된다. 그런데 포스트모던 지배양식론도 크게 보면 이데올로기적 지배의 차원에 주로 초점이 맞추어져 있고, 현실적인 물질적인 삶, 즉 경제적 차원에서의 지배의 작동에 대해서는 고찰이 이루어지지 않고 있다. 20세기 서구 비판적 사회철학에서는 경제적 지배양식에 대한 논의는 거의 이루어지지 않았다. 바로 이점이 20세기 서구의 지배양식론의 근본적인 취약점이었다.",
      "keywords": "정치적 이데올로기적 경제적 지배양식, 헤게모니, 이데올로기적 국가장치, 미시권력, 욕망의 영토화",
      "isUOS": true
    },
    {
      "title": "변증법의 변증법적 운동 – 모순 변증법에서 코뮨 변증법으로",
      "author": "이성백",
      "abstract": "변증법의 재구성을 모색하는 본 논문은 크게 두 가지 문제를 다룬다. 첫째는 현대 변증법의 대표적인 사상인 헤겔과 맑스의 변증법을 오늘날의 시대적 지평으로부터 독해한다. 두번째로 20세기 후반기 변증법에 대한 가장 강력한 비판인 들뢰즈의 변증법 비판을 고찰하면서 변증법의 편에서 답변을 시도해 본다. 그리고 이 두 가지 문제를 종합적으로 고려하여 새로운 변증법 개념을 결론적으로 제시한다. 헤겔에서 맑스와 레닌에 이르는 “모순 변증법”은 자본주의적으로 전개되고 있는 현대시민사회의 부정성과 모순성‘만’을 개념화하고 있는 ‘현실’ 변증법에 해당하는 것으로, 이 부정적인 현실을 지양하기 위해 요청되는 새로운 이념적 원리를 담고 있지 못하다. 그런데 헤겔과 맑스의 논의를 다시 살펴보면, “모순 변증법”과는 다른 변증법 개념, “코뮨 변증법”이라고 부르고자 하는 새로운 이념적 차원의 변증법이 있는데, 이 코뮨 변증법이야말로 변증법의 참된 이념이다. 코뮨 개념은 “자유로운 개인들의 자유로운 연합”으로서 중세 도시에서 역사적으로 기원하였다. 들뢰즈의 변증법 비판의 핵심은 대립과 모순가 차이를 억압하고 있다는 점에 있다. 바로 차이, 즉 개인들의 단특성이 그의 철학이 추구하는 핵심이다. 차이의 철학은 코뮨 변증법의 바깥에 있지 않다. 자유로운 개인들의 자유로운 연합이란 코뮨 변증법의 근본정의에서 드러나듯이, 차이의 철학이 추구하는 개인들의 단특성이 바로 코뮨 변증법의 출발점이자 그 핵심이기 때문이다.",
      "keywords": "코뮨 변증법, 모순, 차이, 자유로운 개인들의 자유로운 연합, 단특성",
      "isUOS": true
    },
    {
      "title": "상품과 알레고리 - 맑스와 벤야민의 환등상 개념",
      "author": "한상원",
      "abstract": "벤야민이 그의 19세기 파리의 파사주 연구에서 맑스의 상품물신주의 개념을 차용했다는 사실은 널리 알려져 있다. 그러나 두 이론가를 비교하려는 시도는 물론, 벤야민을 직접 맑스로 소급해 이해하려는 시도 역시 찾아보기 매우 힘들다. 본 논문이 밝혀내려는 것은 상품물신의 두 이론들은 공통적으로, 경제적 합리성에 기반을 둔 현대 사회가 바로 그 합리성의 논리에 따라 비합리성으로 전도된다는 변증법적 역설을 고찰한다는 것이다. 이러한 이론적 관점 속에서 본 논문은 맑스와 벤야민 사이의 상이한 서술수준을 넘어선 이론적 대화를 시도한다. 맑스는 상품의 가치가 형성되는 과정에서 드러나는 추상적 관계들의 전도된 형식들을 유령적 대상성과 물신주의, 환등상적 형식 등의 표현으로 담아냈다. 벤야민은 이러한 범주들이 구체적 역사적 상황 속에서 경험, 지각되는 방식을 이론화한다. 이를 통해 벤야민은 자본주의가 숭배의 기능을 갖는 종교적 체제라는 자신의 초기 신학적 구상과 맑스의 이론적 고찰을 연결시킨다. 파사주 프로젝트는 역사적으로 19세기에 출현한 환등상의 경제체제와 그 시대의 일상적 생활영역에 대한 탐구 속에서 합리적 경제체제의 비합리적, 신화적 요소로의 전도가능성을 살펴보려는 시도였다. 이러한 연구를 추적하면서 우리는 벤야민에 의해 수행된, 보들레르와 초현실주의 등 현대 예술사조와 맑스 이론의 접목가능성 역시 살펴보게 될 것이다. 결국 이러한 연구는 21세기 오늘날의 현 시대를 특징짓는 감각적이고 초감각적인 현상들과 그 경험들에 대한 이론적 고찰을 위한 준비과정으로 기능할 수 있을 것이다.",
      "keywords": "상품물신주의, 맑스, 벤야민, 환등상, 보들레르, 초현실주의",
      "isUOS": true
    },
    {
      "title": "진보적 지방정치의 역사적 경험들 - 시기별 특징과 그 함의",
      "author": "장석준",
      "abstract": "중앙정치에 과도하게 집중해온 한국 좌파와는 달리 세계 사회주의 운동은 초기부터 지역사회에 깊이 뿌리내리기 위해 노력했다. 이러한 노력은 몇 가지 뚜렷이 구별되는 단계를 거치며 전개돼왔다. 첫 번째 단계는 사회주의·노동자 정당이 막 태동하던 19세기 말인데, 이 시기에는 보수 세력의 지배 아래 있던 지역사회에 노동계급 공동체를 건설하는 것이 주된 과제였다. 이탈리아와 스웨덴의 ‘민중의 집’이 그 대표적인 사례다. 양차 대전 사이의 시기인 두 번째 단계에 이르러 서유럽 좌파정당들은 지방자치단체의 여당이 돼 지역에서부터 복지국가를 건설하기 시작했다(‘붉은 비엔나’ 등). 2차 대전 이후 사회민주주의 정당들이 중앙 권력 장악에 성공한 뒤에는 주로 유럽 공산주의 정당들이 지역 차원의 실험(이탈리아 에밀리아로마냐 주의 협동조합 육성 등)을 펼쳤다(세 번째 단계). 네 번째 단계는 전 세계적으로 신자유주의 공세가 시작된 시기와 겹친다. 이 시기에 진보좌파는 다시금 지역 정치에 주목해 이를 신자유주의 공세에 맞서는 진지로 삼았다. 영국 대처 정부에 맞섰던 런던 광역시정부나 미국 레이건 정부 시기에 참신한 진보 정책을 펼쳤던 벌링턴시가 그 인상적인 사례다. 다섯 번째 단계에서는 드디어 유럽을 넘어서 라틴아메리카, 인도 등 지구 곳곳에서 좌파의 혁신적인 지역 정치 실험이 꽃피게 된다. 결정권을 분산하고 대중이 결정 과정에 적극 참여하게 하는 것이 이 시기의 보편적인 특징이다.",
      "keywords": "사회주의, 지방자치, 지방정치, 민중의 집, 참여민주주의, 참여예산제",
      "isUOS": false
    },
    {
      "title": "르페브르의 변증법적 공간 이론과 공간정치― 「공간의 생산」을 중심으로",
      "author": "신승원",
      "abstract": "이 논문의 목적은 르페브르 공간생산론의 고유한 논의 지형을 제시하고, 그 실천적 함의를 밝히는 데 있다. 르페브르는『공간의 생산』에서 헤겔, 맑스의 생산 개념과 니체, 하이데거의 공간적 관점을 통합한다. 이종적인 이론적 자원을 종합하고 대안적 공간 기획의 기초를 제공하는 기초는 변증법이다. 르페브르의 변증법은 기본적으로 헤겔-맑스의 고전적인 해방기획과 연관되며, 공간의 우선성과 고유성을 강조하는 포스트모던적 주장을 포괄한다. 르페브르는 시․공간의 총체적 인식과 인간적 자연의 재창조를 주장하면서, 자본주의적 추상공간의 대안으로서 차이공간의 도래를 전망한다. 차이공간은 공간의 모순과 소유 논리에 저항하는 공간정치를 통해 실현될 수 있다. 르페브르에 따르면 저항적 가능성을 지원하는 힘의 원천이자, 아래로부터의 공간적 요구를 투쟁으로 결집하는 중심은 몸과 도시이다. 변증법적 가능성주의에 기반한 르페브르의 공간론은 그 현실성에 대한 물음들과 끊임없이 대결해 나갈 수밖에 없다. 그럼에도, 공간생산론은 오늘날 도시 비관주의와 도시 편향의 극복을 위한 의미있는 이론적 자원이다. 특히 몸과 도시사회의 관계 연구와 함께 다양한 해방기획과의 접합을 고민하는 것은 비판적 공간론에 남겨진 중요한 과제이다.",
      "keywords": "르페브르, 공간의 생산, 변증법, 공간정치, 도시사회",
      "isUOS": true
    },
    {
      "title": "<서평>『모더니티의 수도 파리(Paris, capital of modernity)』",
      "author": "김동훈",
      "abstract": "이 글의 목적은 영국 출신의 지리학자 데이비드 하비의 책 􋺷모더니티의 수도파리 (Paris, Capital of Modernity)􋺸의 내용을 분석하고 그 속에 담긴 인문학적 상상력의 깊이를 가늠해보는 데 있다. 이를 위해 평자는 우선 하비가 보들레르의 힘을 빌려 정의하는 근대성 개념의 특징을 분석하였다. 하비에 따르면 근대는 그 이전에 배태되어 있던 가능성의 발현이면서 동시에 창조적 파괴를 통한 그 이전의 역사와의 단절이라는 이중적 성격을 지닌다. 그런데 이를 통해 근대성을 형식적으로 정의할 수는 있겠지만 내용에 대해서는 아무것도 제시하지 않았기에 이러한 정의는 근대성을 근원적으로 설명하기에는미흡하다는 사실이 밝혀졌다. 하지만 다른 한편 하비는 구체적 상황들을 분석하고 설명하기 위해 끊임없이 보들레르, 플로베르, 발자크, 도미에 등의 시나소설, 삽화의 도움을 구하는데, 이러한 인문학적 상상력은 통계숫자와 공식적인 문건에만 매달리는 연구로는 절대로 접할 수 없는 사태의 이면을 통찰할수 있는 가능성을 열어준다. 그의 글이 매우 흥미롭게 읽히는 이유가 여기에있다. 이러한 사실들은 그가 오늘날 역사지리학자로서, 마르크스주의 이론가로서 누리고 있는 명성이 근거 없는 것이 아님을 여실히 보여준다. 하비가 이 책에서 주로 고찰하고 있는 것은 1848년 혁명과 그 이후 등장한제2제정 하에서 파리가 겪은 엄청난 변화, 그리고 그 결과로 인해 발생한1871년의 파리 코뮌이며, 그는 특히 제2제정 파리지사였던 오스망이 입안하고 실천에 옮겼던 엄청난 도시재편계획을 집중적으로 다루고 있다. 이로 인해파리는 프랑스 국내뿐만 아니라 전 유럽의 자본주의 발전에 있어서 모범적이고 선도적인 역할을 하는 근대성의 수도라는 의미를 지니게 된다. 이런 의미에서 􋺷파리􋺸는 오늘날 도시 안에서 무슨 일이 일어나고 있는가를 파악하려는이들에게나 창조적 파괴를 통하여 도시의 새로운 변화를 추구하는 이들 모두에게 필독서로 추천되기에 부족함이 없다고 하겠다.",
      "keywords": "근대성, 1848년 혁명, 제2제정, 파리 코뮌, 오스망, 발자크, 벤야민, 보들레르, 플로베르, 도미에",
      "isUOS": false
    },
    {
      "title": "발터 벤야민의 역사철학테제: 역사주의와 역사 유물론그리고 메시아주의의 성좌구조",
      "author": "고지현",
      "abstract": "우리는 「역사의 개념에 대하여」(1940)에서 벤야민의 역사철학을 집약하고 있는 성좌구조 하나를 발견할 수 있다. 역사주의와 역사 유물론 그리고 메시아주의가 만들어내는 형상이 바로 그것이다. 벤야민은 역사주의에 대해 ‘유곽에서 몸을 파는 창녀’에 비유할 정도로 격한 적대감을 드러내고 있으며, 역사주의에 맞선 대항마로 자신의 입장을 포함한 역사 유물론을 내세우고 있다. 한편 그는 마르크스후예들이 전유한 역사유물론이 그 고유한 비판적 잠재력을 상실했다는 점에서 당대 마르크스주의에 이의를 제기하고 있으며, 그러한 맥락 속에서 유대전통의 메시아주의를 주장하고 있다. 각 요소의 위상은 그 세 가지가 만들어내는 성좌구조 전체에 의해 규정되는데, 그것을 들여다볼 수 있는 열쇠 하나로 ‘신학적’이라 특징지을 수 있는 독특한 사유차원이 표면에 떠오른다. 만약 이 열쇠를 손에 넣을 수 있다면, 벤야민의 역사철학 반 이상은 파악하는 셈이 된다. 그러한 전망 속에서 이 성좌구조에 대해 살펴보기로 한다.",
      "keywords": "역사철학테제, 역사주의, 메시아주의, 기억(불망), 정치 신학",
      "isUOS": false
    },
    {
      "title": "마르크스 및 베버주의적 비교역사사회학에서 바라본 도시 개념: 유럽중심주의의 극복과 공간에 대한 새로운 접근",
      "author": "유성희",
      "abstract": "사회학 내 하나의 하위 분과인 비교역사사회학에서 도시연구는 종종 논쟁의 대상이 되곤 했다. 이는 비교역사사회학이 가지고 있었던 유럽중심주의적 시각과 더불어 비서구지역 및 전근대 시기 도시연구의 부족 때문이었다. 본 연구에서 저자는 비교역사사회학에서 진행된 마크르주의주의적 접근방식, 베버주의적 접근방법을 각각 소개한 뒤, 이들이 가진 한계점을 제시했다. 이후 유럽중심주의에 대한 대안으로서 저자는 유럽을 지방화시키는 한편, 공간 자체에 대한 인문학적 성찰을 요청했다. 나아가 비서구 및 전근대 시기 도시연구의 부족을 메꾸기 위한 하나의 전략으로서 연결사에 기초한 글로벌한 도시 역동성을 제시했다. 이러한 대안들은 한편으로 비유럽도시들에 대한 개성사적 기술을 가능하게 한다는 점에서, 다른 한편으로 다양한 도시 간 결합양태들을 거시적·총체적인 맥락에서 바라볼 수 있게 해준다는 점에서 기존 비교역사사회학 내 도시연구들에 새로운 활력을 불어넣어 줄 것이라 기대한다.",
      "keywords": "도시, 비교역사사회학, 공간, 유럽을 지방화하기, 연결사, 인문학적 성찰",
      "isUOS": false
    },
    {
      "title": "욕망의 정치경제학과 현대 도시의 위기",
      "author": "박영균",
      "abstract": "현대 도시는 자본의 정치경제학을 따라 구축되었다. 자본의 정치경제학은 생산과 소비의 이원적 구조를 통해서 ‘생산-기계’이자 ‘소비-기계’로서의 인간을 생산하였 다. 도시공간의 사적 공간, 공적 공간, 사회적 공간의 분할은 이런 자본의 정치경제 학을 따라 이루어졌다. 오늘날 현대 도시는 생산-소비의 메커니즘을 자본 축적의 메커니즘으로 코드화하고 영토화하는 과정을 통해서 이루어졌다. 자본에 의한 생산의 포획은 임노동이라는 자본의 외부를 자본 내적 축적으로 코 드화하면서 노동자를 ‘생산-기계’로 생산한다. 반면 자본에 의한 소비의 포획은 노 동자를 ‘욕망의 정치경제학’으로 흡수하는 과정을 통해서 이루어졌다. 소비혁명은 세 번에 걸쳐 일어났다. 첫 번째는 기계제 대공업과 ‘대량생산-대량소비’ 시스템의 구축, 두 번째는 복지국가의 편입을 통해서 일어났으며 세 번째는 ‘다품종대량생 산’-유연생산전략 시스템을 통해서 일어났다. 그러나 이런 현대 도시의 스펙타클을 창조하는 흐름의 공간, 네트워크적 사회의 구성은 노동의 사회화, 사회적 협력의 가치를 사적으로 전유하는 과정이며 소비욕 망을 통해서 자연의 생명적 에너지를 ‘자본의 가치 증식 욕망’으로 바꾸어 놓은 것 이다. 이런 의미에서 현대 도시의 위기는 ‘화석에너지시스템’과 자본이 코드화-영토 화하는 ‘욕망의 정치경제학’에 의해 발생하고 있다. 따라서 이 논문은 바로 이런 위기를 극복하기 위해서는 ① 자본의 욕망이 포획하 는 소비욕망에 삶의 욕망을 대립시키고, ② 자본이 영토화하는 소비공간-생산공간 으로서의 도시를 자신의 생명을 생산하는 ‘자기가치화의 운동’, 즉 ‘자치적 생산-소 비 공동체의 건설’로 바꾸며, ③ 자연과 인간의 내적 교통-교감의 메커니즘을 회복 하는 패러다임의 전환이 필요하다고 주장한다.",
      "keywords": "현대 도시의 위기, 자본의 정치경제학, 욕망, 생산 공간, 소비 공간, 스펙타클, 노동의 사회화, 네트워크, 화석에너지시스템, 마르크스, 르페브르, 드보르, 카스텔, 하비.",
      "isUOS": true
    },
    {
      "title": "마르크스 지대론의 확장과 현대 도시지대론을 위한 시론",
      "author": "곽노완",
      "abstract": "이 논문은 마르크스 \"자본\"에 제시된 도시지대 개념을 재구성하여 현대 자본주의 도시지대론의 시론을 제시하려는 시도이다. 현대 자본주의의 총순환에서 도시공간에 대한 자본투자와 도시지대의 비중이 급증하고 도시부동산에 대한 투기가 대중화되면서 도시의 부동산과 가계부채는 현대 경제위기의 뇌관 중에 하나로 자리 잡았다. 자본주의 분석에서 이제 도시지대는 필수영역이라 할 수 있다. \"자본\" 1권출간 150주년을 맞아 도시지대론을 재구성하려는 시도는 \"자본\"의 현재성을 새롭게 조명할 수 있는 계기가 될 것이다. 도시지대를 “사회의 진보를 가로채는 것”으로정식화한 마르크스는 공유지의 수탈이 도시지대의 기반을 이룬다는 점을 밝힘으로써 새로운 지평을 열어주고 있다. 이 글은 마르크스에 따라 공유지가 확대될수록공유지 수탈과 도시지대가 증가하는 ‘공유지의 역설’을 마르크스 도시지대론의 키워드로 정식화하고자 한다.",
      "keywords": "독점지대, 차액지대, 절대지대, 도시지대, 마르크스, 공유지의 역설.",
      "isUOS": true
    },
    {
      "title": "사회주의와 기본소득 -로머의 사회배당 및 하워드의 기본소득 개념의 재구성",
      "author": "곽노완",
      "abstract": "마르크스주의 연구자들 사이에서 모든 사회성원들에게 지급되는 무조건적인 기본소득에 대한 입장은 크게 네 가지로 나뉜다. 첫째, 기본소득은 모든 사회성원들을 노동자에 대한 착취자로 만드는 것이라 반대한다는 입장이다(엘스터, 비숍). 둘째, 기본소득은 자본주의 분배관계를 개선하지만 사회주의의 요소는 아니기에 한정적인 의미만 있다는 입장이다. 셋째, 기본소득은 노동자의 자유와 해방을 확대하는 한에서 사회주의적이라고 보는 입장이다(라이트, 키핑). 넷째, 기본소득은 생산수단의 공유화에 기초한 사회주의의 필수요소일 뿐만 아니라 자본주의에서도사회주의로 이행의 주체역량을 증폭시킨다고 보는 입장이다(블라슈케, 라이터, 하워드). 특히 로머의 사회배당+쿠폰사회주의 개념은 넷째에 가깝지만 절충적인 대안이라 할 수 있다. 성인 사회성원들이 공공부문 기업의 이윤을 평등하게 사회배당으로지급받고 추가로 쿠폰지분을 통해 기업의 주식을 사고팔 수 있는 시장사회주의 모델을 제시한다는 점에서, 그는 자본의 소유문제에 대해 사회성원들의 공동소유와사유화라는 모순된 두 가지 요소를 절충적으로 결합시키고 있다. 이에 따라 자본가와 지주가 독점했던 이윤은 부분적으로 사회의 모든 성인 구성원들에게 평등하게지급되는 사회배당으로 전환된다. 하지만 다수 사회성원들이 광범하게 각자 분배받은 쿠폰을 통해 투기적인 주식시장에 참여하도록 조장하면서 각종 사회경제적낭비와 비효율을 낳는다. 이러한 문제점은 쿠폰이라는 우회로를 통할 필요 없이 마르크스의 원리에 따라 모두가 공유하는 생산수단 및 자본의 수익으로부터 유래하는 사회주의적 기본소득을 통해 극복될 수 있다. 또한 이를 위해 사회주의에서 토지 및 생산수단에서 유래하는 수익의 분배를 주로 노동자에 한정할 것인지 아니면 사회의 모든 성원에게로 확장할 것인지에 대한 마르크스의 양가성은 비판적으로재구성될 필요가 있다.",
      "keywords": "사회배당, 쿠폰 사회주의, 기본소득, 로머, 착취, 마르크스.",
      "isUOS": true
    },
    {
      "title": "마르크스의 자유개념과 기본소득",
      "author": "곽노완",
      "abstract": "마르크스 연구자들 중 하워드처럼 기본소득을 옹호하는 연구가 늘어나고있다. 그러나 마르크스의 자유개념과 기본소득의 사회철학을 연계한 고찰은 아직 없다. 이 글은 마르크스의 자유개념을 자본주의에 포섭된 계몽주의의 법적･형식적 자유개념의 한계를 넘어서는, ‘연합사회의 자유’ 개념으로 재구성하는 것을 목표로 한다. 연구는 마르크스의 초기저작에 대한 연구와 중･후기 저작에 대한 연구로 나뉘어 진행된다. 초기 마르크스의 자유에 대한 논의는, ‘필연의 인식에 기초한 자기실현’이라는 계몽주의적 틀에서 크게 벗어나지 못하고 있다. 자유에 대한 논의가 현실에 존재하는 개인들의 자유라는 형태로 전개되지 못한다는 한계 역시 극복하지 못하고 있다. 그러나 약한 비결정론과 역사적 및 전체론적인 문제틀에 기초하여 “현실적 개인들”의 해방과 자유를 위해 현실을 새롭게 연구하게 되는 중기부터, 사정은 달라진다. 이 글에서는 한편에서는 중･후기마르크스의 자유개념을, 『루이 보나파르트의 브뤼메르 18일』에서 시사되는 ‘연합사회의자유’개념으로 재구성해 낸다. 다른 한편, 마르크스가 요청하는 생계유지를 빌미로 강제되는 노동으로부터의 자유를, 모든 개인의 생존권을 보장하는 ‘경제적 자유’로 재구성한다. 또한 이 자유개념에 연계하여, 그의 사회주의 사회 안에서 또 이 사회로의 이행을 위해기본소득제가 옹호될 수 있다고 주장한다. 나아가 이런 측면에서 마르크스의 기획이 판빠레이스나 페팃, 라벤토스 같은 현대 기본소득론자들의 자유를 위한 기획을 선취한다고 주장한다. 이 연구는 향후 마르크스 연구자들의 기본소득 연구에 디딤돌이 될 것으로 기대된다.",
      "keywords": "마르크스의 자유개념, 경제적자유, 계몽주의, 기본소득",
      "isUOS": true
    },
    {
      "title": "들릴로의 『코스모폴리스』에 나타난 코스모폴리스적 이상의 아이러니",
      "author": "정희원",
      "abstract": "This paper explores various ironical facets of the idea, or the ideal, of a cosmopolis in Don DeLillo’s Cosmopolis. This essay also offers a critical reflection upon cosmopolitan irony as cosmopolitan virtue. Having been reviewed as DeLillo’s first post-9/11 novel, Cosmopolis has been much acclaimed as describing the collapse of homo technologicus through its analogy between the novel’s protagonist Eric Packer and the World Trade Center. This article relocates the focus of reading from the aftermath of 9/11 to its titular ironic embodiment of cosmopolis in New York City, the center of global capitalism. This approach presupposes that the diachronic point of view that originates from eighteenth-century Enlightenment Cosmopolitanism is more helpful in tracing the complicated ironical aspects of (anti-) cosmopolitan practices in DeLillo’s novel. This paper traces the history of cosmopolitanism and the meaning of the term cosmopolitan, especially from Kant’s “Toward Perpetual Peace” through Marx and Engels’s Communist Manifesto and finally to cosmopolitanisms of the present. Then it interprets Cosmopolis as the product of a contemporary cosmopolitanism as part of the project of capitalism, a cosmopolitan- ism also known as neoliberalism.",
      "keywords": "들릴로, 『코스모폴리스』, 칸트, 코스모폴리타니즘, 신자유주의",
      "isUOS": true
    },
    {
      "title": "마르크스 사회(공산)주의론의 모순과 21세기 사회주의",
      "author": "곽노완",
      "abstract": "이 논문은 마르크스의 사회(공산)주의 생산양식 이론의 미래 현실 적합성을 극대화시키려는 시도이다. 이를 위해 신자유주의적 세계화라는 자본주의의 변화 및 현대 사회(공산)주의 이론과 마르크스의 이론을 대결시켰다. 21세기에 확대재생산할 수 있는 사회(공산)주의 생산양식은 금융자본과 주식회사의 사회화를 ‘시초축적’의 계기로 활용하여 신용과 주식회사 나아가 모든 자본관계를 폐기함으로써 사적 소유를 단일한 사회적 소유(이를 ‘사회기금’으로 명명하였다) 로 전환하고 투자와 생산뿐 아니라 기업경영도 기업별로 직접 생산자에게 결정하도록 하며 나아가 필요에 따른 분배와 성과에 따른 분배를 통합하는 체계이다. 필요에따른 분배 또는 이와 분리된 성과에 따른 분배 두 가지 중 하나가 아니라 두 가지분배원리가 하나로 통합될 때만 사회 전체 성원이 직간접적으로 능력에 따라 기여하는 생산관계에 적합하게 될 뿐 아니라 연대와 혁신을 동시적으로 확대재생산할수 있다. 그리고 ‘계획’은 중대한 몇몇 사안으로 제한될 때, 사회 성원이 최대한 민주적으로 참여할 수 있게 된다는 점을 보이고자 하였다. 따라서 최근 활발하게 논의되고있는 데바인과 앨버트의 ‘참여계획’ 테제는 모든 생산을 관장하는 원리가 아니라, 기업별 투자‧생산의 결정과 나란히 사회(공산)주의 생산양식의 두 축이 될 수 있다.",
      "keywords": "Widerspruch der marxschen Sozialismus und Sozialismus des 21. Jahrhunderts",
      "isUOS": true
    }
  ],
  "벤야민": [
    {
      "title": "발터 벤야민과 도시경험-벤야민의 도시인문학 방법론에 대한 고찰",
      "author": "홍준기",
      "abstract": "이 논문은 벤야민의 도시인문학 방법론을 해명하기 위해 정신분석적 관점을 취한다. 우선 벤야민 이론에 대한 탈정신분석적 해석의 역사 및 현황을 살펴보고 이의 문제점을 지적한 후 벤야민이 말하는 도시경험의 의미를 설명한다. 벤야민에 따르면 대도시에서의 현대인의 경험은 충격과 상실의 경험이다. 이 논문은 특히 보들레르로부터 차용한 상실의 개념을 벤야민 특유의 개념인 아우라 상실과 연결시켜 논의하고 아우라 상실의 경험이 새로운 아우라 경험을 위한 전제조건임을 밝힌다. 또한 현대 도시인이 겪는 충격 경험은 사람들을 방어적으로 만들어 그들을 무미건조하고 기계적인 행위와 체험의 차원으로 축소시키지만, 동시에 특히 영화와 같은 기술복제시대의 예술작품을 통해 상실한 ‘진정한 경험’을 찾을 수 있다는 사실을 밝힘으로써 벤야민 이론에 대한 새로운 해석을 모색한다. 끝으로 벤야민이 말하는 ‘촉각적 경험’과 시선의 상관관계를 라깡의 거울단계론과 불안이론과 관련시켜 간략히 논의하면서 논문을 결론짓는다.",
      "keywords": "벤야민, 정신분석, 라깡, 아우라, 도시, 도시경험, 시선, 촉각적 경험, 상실, 충격",
      "isUOS": true
    },
    {
      "title": "시공간의 변증법과 도시의 산책자 －대안적 도시인문학의 철학적 기반구축을 위해－",
      "author": "심광현",
      "abstract": "GDP가 자본 축적의 화폐적 표시라면 도시화율은 그것의 공간적 표시이다. 현재 전 세계의 평균 도시화율은 50%를 상회하는 데 반해, 한국은90%를 넘고 있는데, 이 놀라운 고정자본의 집적 및 공간적 압축은 곧 인간신체에 내재된 ‘다감각적 공간’이 세계 평균의 두 배에 가깝게 이루어지고 있음을 뜻한다. 개체 생태학적 위기의 지표라고 할 자살률과 이혼율이 꾸준히증가하여 세계적으로 수위를 달리고 있다는 점도 이런 압축적 성장과 무관치 않다. 에드워드 홀에 의하면 다양한 신체 감각들과 맞물린 다감각적 공간(및 ‘치명적 거리’)들이 파괴될 경우 인간의 행동 및 사고 능력은 무의식적으로 심각한 손상을 받아 ‘트라우마’ 혹은 ‘외상 후 스트레스’로 신체에 각인되어 심각한 우울증과 자살을 유발할 수 있다고 한다. 제한된 공간에 최대한 많은 용적의 건축물을 지어 최대한의 수익을 올리려는 개발업자와 투기꾼의 입장에서는 복잡한 공간적 거리를 필요로 하는유동적인 인간의 신체적 공간을 1평방 미터 이내의 고정된 크기를 지닌 물체적 공간으로 인식하는 것이 유리할 것이다. 인간적 접촉이 사라지고 인간이 개미나 점처럼 지각되는 원거리 시점에서 바라보게 되면 인간을 공간적으로 포개고 이동시킬 수 있는 하나의 물체로 간주하는 것은 거리낌 없고,자연스러운 일이 될 것이다. 하지만 이런 시점은 ‘자연스러운’ 것이 아니라‘본원적 축적’에 의해 농촌에서 내몰린 대규모 인구의 도시 유입과 더불어 도시와 농촌, 지식노동과 육체노동 간의 시공간적 분리와 모순을 격화시켜 온자본주의적 세계화의 산물이다. 이 과정에 숨겨진 모순과 위험의 심화 과정을 데이비드 하비의 시공간의 변증법을 통해 규명하고, 레이몽 윌리엄즈와 발터 벤야민, 레이코프/존슨등의 분석에 의거하여 개인과 집단의 능동적으로 신체화된 공간적 역량의활성화에 기여할 비판적-대안적 도시인문학의 ‘철학적 기반’을 탐색하는 데이 글의 목적이 있다.",
      "keywords": "근접학, 공간적 실존, 절대적-상대적-관계적 시공간의 변증법, 신체화된 마음의 다중감각적 공간, 신체-정치, 공간적 투사",
      "isUOS": false
    },
    {
      "title": "스펙타클의 대로 - 선셋 대로와 윌셔 대로를 통한 로스앤젤레스의 도시 경험",
      "author": "정소운",
      "abstract": "본 연구는 발터 벤야민이 『아케이드 프로젝트』에서 제시한 걷기를 통한 도시 경험이 현대 자동차 중심 도시에서 어떻게 변형되는지를 살펴본다. 이를 위해 기 드보르의 스펙타클 개념과 장 보드리야르의 시뮬라시옹 이론을 20세기 후반 이후의 로스앤젤레스 분석에 적용한다. 자본주의 사회 속 도시 경험은 사회적 관계가 이미지를 통해 매개되는 스펙타클과, 기호들이 자율적으로 증식하여 현실과 구분되지 않는 시뮬라시옹으로 심화된다. 이러한 이론적 맥락에서 볼 때, 로스앤젤레스의 두 중심축인 선셋 대로와 윌셔 대로는 각각 스펙타클적 공간과 시뮬라시옹적 공간으로 구체화된다. 상업적 광고판, 중상류층, 그리고 할리우드와의 연관성을 지닌 선셋 대로는 도시에 대한 영화적 인식을 불러일으킨다. 여기에서 자동차를 통한 도시 경험은 오로지 시각에만 집중된다. 이와 대조되게 이민자, 노동자 계층, 그리고 보행자 전용 도로를 특징으로 하는 윌셔 대로에서 걷는 경험은 더욱 다양한 감각을 자극한다. 따라서 윌셔 대로는 선셋 대로에 비해 ‘진정한’ 경험을 제공하는 듯하나, 사실은 그렇지 않다. 두 대로에서의 경험은 대중문화의 화려함과 하위문화의 투박함으로 대조되는 듯하지만, 도시 홍보에 활용되는 과정에서 둘 다 로스앤젤레스가 ‘다양한 사람들이 공존하는 모자이크’라는 통일된 인식을 형성하는 데 기여하기 때문이다. 이러한 단일화된 인식 속에서 사회적 갈등은 추상화된다. 따라서 이 연구는 신자유주의 도시에서 벤야민의 유럽 ‘플라뇌르’적인 비판적 사유가 불가능해진다는 점을 밝힌다. 그리고 동시에 새로운 형태의 비판적 인식이 가능한지를 탐색한다.",
      "keywords": "도시 경험, 스펙타클, 시뮬라시옹, 로스앤젤레스, 자동차 중심 도시",
      "isUOS": false
    },
    {
      "title": "프루스트와 벤야민의 건축적 상상력 -『잃어버린 시간을 찾아서』와『아케이드 프로젝트』의 경우",
      "author": "권용선",
      "abstract": "이 글은 발터 벤야민의『아케이드 프로젝트』를 구성하는 ‘건축적 방법론’을 프루스트의 소설『잃어버린 시간을 찾아서』와의 감응적 관계를 추적하는 과정 속에서살펴본 것이다. 이 글의 II장에서는 벤야민에게 건축적 상상력을 촉발한 것으로 보이는 프루스트 소설의 번역과 프루스트 소설의 구조적 이미지 형성에 기여한 러스킨의건축 비평에 관해 이야기하고, III장에서는 벤야민이 아케이드라는 역사적 건축물을자신의 프로젝트를 구성하는 하나의 ‘은유적’ 이미지로 설정했을 때, 그가 의도했던변증법적 구조의 의미와 요소들을 살펴본다. 또한 벤야민이 프로젝트의 목표로 삼았던 바를 핵심적으로 개념화한 ‘변증법적 이미지’가 프루스트의 소설에 나타난 ‘비의지적 기억’으로부터 어떤 감응적 촉발을 받았는지 추적해 보았다. 『아케이드 프로젝트』가 텍스트의 파편들을 조립하고 해체하는 것이 가능한 하나의 건축물이라면, 우리는 그 안에서 새로운 건축물의 형태를 발견하고 그 이미지에 따라 또 다른 하나의 텍스트를 생성해 낼 수 있을 것이다. 그것은 또한 벤야민이 제시한 자료들을 활용한 과거의 이미지를 구성하는 것이 될 수도 있고, 우리 시대 도시공간의 이미지나 문화적 현상을 해명하는 작업이 될 수도 있다.",
      "keywords": "건축적 상상력, 번역, 아케이드, 비의지적 기억, 변증법적 이미지",
      "isUOS": false
    },
    {
      "title": "발터 벤야민의 일상 개념에 대한 고찰 - 파시즘 비판의 계기로서 일상",
      "author": "이수경",
      "abstract": "벤야민에게 일상은 유물론으로 전환을 명시화하는 1930년경, 파시즘 비판 속에 개념화되지 않은 채 다뤄지고 있다. 이 논문은 벤야민의 일상 개념을 파시즘 비판의 계기로 고찰함으로써 일상 개념의 의미를 억압받은 이들의 삶의 요구에 대한 성찰로 재구성하는 데 목적이 있다. 먼저 『독일 파시즘의 이론들』에서 제기된 파시즘 이론의 문화적, 계급적 토대에 대한 벤야민의 비판을 살펴본다. 1차 세계대전 후 독일 사회의 위기를 분석하면서 벤야민은 파시즘의 ‘새로운 전쟁론’의 문화적 토대에 전쟁에 대한 부인과 망각의 정치가 있음을 본다. 그는 이를 파시즘과 표현주의 이데올로기의 연관 속에서 독일 혁명이 내건 ‘삶의 요구’에 대한 성찰의 부인으로 해명한다. 이러한 성찰의 부재는 전쟁이 제국주의-자본주의의 필연적 귀결임을 보지 못하는 것인 한편, 살 가치가 없는 삶의 파괴라는 반지성적 열망으로 귀결된다. 또한 그는 이러한 성찰의 부재에서 모든 합리성을 부정하는 파시즘의 계급적 뿌리가 자본주의에 있음을 확인한다. 파시즘의 자본주의에 대한 외관상의 적대를 해명하는 가운데 파시즘의 절대권력은 일상의 전장화에 내재한 ‘세계-죽음’이자 사회적 모순에 대한 마법적 해결이라는 기술관의 귀결로 드러난다. 마지막으로 절대권력을 해독하고 해체하는 힘으로서 일상을 살펴본다. 파시즘의 문화적 토대와 계급적 토대에 대한 대항으로 제시되는 벤야민의 일상 개념은 억압받은 이들의 삶과 삶의 요구에 대한 성찰 속에서 형성된다. 이를 통해 파시즘이 파편화된 삶의 위기들을 고립시키는 데 맞서, 계급투쟁의 인식 속에서 일상적 삶의 위기들을 ‘포괄적 위기’로 바라보면서 파시즘의 ‘전쟁’을 ‘혁명’으로 전환하고자 하는 것이다. 다른 한편, 일상으로부터 혁명을 사유하는 벤야민은 당대의 ‘진보’ 개념에 대항하면서, 억압받은 이들의 상황 자체에 상응하는 역사 개념을 마련하는 것을 과제로 삼는다. 이러한 과정을 통해 벤야민의 일상 개념이 억압받은 이들의 삶의 요구에 대한 성찰이자 파시즘에 대항하는 정치적, 역사적 실천의 두 축인 혁명과 기억의 원천임을 밝히고자 한다.",
      "keywords": "일상, 파시즘, 자본주의, 혁명, 기억, 발터 벤야민",
      "isUOS": false
    },
    {
      "title": "확장된 도시 읽기-벤야민의 도시 인상학을 중심으로",
      "author": "심혜련",
      "abstract": "2020년 코로나 팬데믹 이후, 일상공간에 큰 변화가 생겼다. 매체공간이 주요 공적공간으로 등장하고, 도시공간에서는 ‘사회적 거리두기’라는 새로운 삶의 방식이 요청되었다. 현전과 대면 대신 원격현전과 비대면이 전면에 등장했다. 그 결과 도시공간은 매체공간과의 결합으로 인해 확장된 도시가 되었다. 현대 대도시들은 모두 이러한 확장된 도시다. 따라서 이 글에서는 매체공간과의 결합을 통해 도시공간이 어떻게 확장되었는지를 살펴보고, 이를 분석하고자 한다. 특히 벤야민의 도시인상학을중심으로 지금의 확장된 도시를 분석하고자 한다. 대도시에 대한 벤야민의 사유 그리고 그의 방법론은 확장된 도시를 분석할 때도 여전히 유효하다. 그는 다양한 방식으로 도시를 분석했다. 다공성도 그러한 분석 중 하나다. 벤야민은 나폴리를 분석할때, 다공적이라고 분석했다. 다공적 도시란, 고정된 장소와 그 장소에서 요구되는특정한 행위가 없는 것을 의미한다. 이런 다공적 도시에서는 공간적 변화가 자유롭고 용이하다. 기능에 따라 도시의 여러 장소들이 쉽게 변화할 수 있다. 확장된 도시또한 매우 다공적이다. 따라서 이 글에서는 벤야민의 다공성 개념을 중심으로 그의도시 인상학을 분석한 후, 이를 확장된 도시에 적용을 시도할 것이다.",
      "keywords": "확장된 도시, 매체공간, 도시공간, 벤야민, 다공성, 도시 인상학, 도시철학, 산책자",
      "isUOS": false
    },
    {
      "title": "변증법적 몽환극 －발터 벤야민의 초현실주의 ‘경험’ 비판－",
      "author": "강재호",
      "abstract": "유대계 독일 철학자 발터 벤야민(1892~1940)의 현대성분석은 그의미완성 저작 「아케이드 프로젝트」가 발간된 이후 도시인문학과 문화철학 분야에서 큰 주목을 받아왔다. 특히, 고도자본주의의 상품물신성과 현대도시의 경험에 대한 그의 비판적 성찰은 20세기 초 서유럽 초현실주의 운동에큰 영향을 받았다. 그러나 그 영향은 과대평가되었고, 벤야민의 급진적인 초현실주의 비판은 과소평가되었다. 이 논문은 벤야민이 초현실주의의 예술경험과 정치적 실천을 이론적으로 비판하고 극복하면서, 그가 ‘인간학적 유물론’이라 부르는 현대성분석의 인식론을 더욱 체계화하고 있음을 주장한다. 이 논문은 그의 초현실주의 경험 비판이 ‘변증법적 유물론’을 너머, ‘변증법적 몽환극(夢幻劇, A Dialectical Féerie)’을 체계화하도록 이끌고 있음을보여준다. 벤야민의 에세이 「초현실주의」와 「아케이드 프로젝트」에 산재해있는 인식론적 논의 에 집중하면서, 나는 그동안 주목받지 못했던 그의 초현실주의 비판을 그 인식론적 핵심 개념인 ‘경험’ 개념을 통해 재조망하면서,그의 현대성분석을 ‘인간학적 유물론’의 핵심 개념인 몸, 테크놀로지, 그리고이미지공간으로 재구성하는 것을 목적으로 한다.",
      "keywords": "발터 벤야민, 초현실주의, 경험, 이데올로기, 상품물신성, 판타스마고리아",
      "isUOS": false
    },
    {
      "title": "At the Crossroad of Psychoanalysis and Marxism -Walter Benjamin's Method of City Philosophy",
      "author": "홍준기",
      "abstract": "Walter Benjamin is one of the most important modern 'classic' thinkerswho took cities as a central theme, as we can read especially in hisunfinished masterpiece 'Passagenwerk'. However, even though manystudies have been made on Benjamin's 'city philosophy' so far, weseem to be far away from the complete and systematic understandingof his thought. So, Examining critically the way how Benjamin hasbeen received in the academic and cultural field, this paper proposes apsychoanalytic perspective for understanding his works andaesthetics/philosophy, especially by focusing on some importantkey-concepts of Benjamin: dialectical image, allegorical image andmelancholia. For Benjamin, the city is a space in which a capitalisticphantasmagoria and urban spectacles made possible by new technologyfunction in order to keep people in an eternal sleep and hinder themfrom waking up from the myth created by capitalism. But he does notgive up hope. Historical ruins, everyday appliance, monuments, arcades,buildings, advertisement posters, beggars, whores, flâneurs, etc. can be'constructed' as a dialectical image that will be blastered out of thecontinuum of history, and this dialectical image 'destroys' the myth ofprogress, and rescues the past from the oppression. Then this paperalso shows the dialectical image as the contradictory co-existence ofthe past and now can be interpreted as an allegorical image contraryto, for example, that of Susan Buck-Morss. The city is according to Benjamin not only the space, in which thecapitalists ring the bell of triumph, but also a space through which therepressed wish of the oppressed can finally come true. So the city canbe a appropriate place for the liberating political act, because, due tothe developed technology, everything in the city is in rapid changesand people in the city feel afflicted with the sense of loss, thereforebecome melancholic. In other words, the feeling of the spleen ormelancholia is not just a pathological state that should be avoided, buta necessary condition for the future revolutionary action, and in thissense I interpret the melancholia as being integrated into Benjamin'sthought as a new category of 'concrete' subject. Benjamin found outthis concrete subject through the study of the baroque Trauerspiel andhe replaced the traditional subject concept of idealism with it.",
      "keywords": "Benjamin, Freud, Lacan, psychoanalysis, dialectical image, allegorical image, melancholia, city. criticism of the idea of progressive history",
      "isUOS": true
    },
    {
      "title": "국내 카페 파사드(façade)에서 읽어 낸 문화적 의미",
      "author": "황성경;김진아",
      "abstract": "오늘날 한국인들에게 커피는 일상생활에서 빼놓을 수 없는 중요한 존재가 되었으며, 커피에 대한 관심의 증가와 함께 카페 공간 역시 보다 다양한 문화적 요소를 접목시켜 하나의 독특한 ‘카페문화’를 형성하고 있다. 특히 최근 유행처럼 확산되고 있는 커피전문점들의 개방형 파사드는 거리 전체를 투명한 유리벽 또는 이 마저도 제거된 파사드들의 연속으로 구성함으로써 새로운 도시 풍경을 만들어내며 소비자를 유혹하고 있다. 본 연구는 도시 공간을 산책하며 비평적 시선을 투사한 벤야민의 방식을 응용하여 오늘날 한국 도시의 주요 경관을 구성하는 개방형 카페 파사드의 공간적 특성을 고찰하고 그 사회문화적 의미를 도출한다. 1980년대까지도 주를 이루었던 폐쇄형 카페 파사드와는 대조적으로, 전이형과 개방형 파사드는 밝고 세련된 도시적 분위기를 창출하며 커피전문점의 위상을 강화하게 된다. 특히 노천카페로 대표되는 유럽의 전이형 파사드와는 달리, 국내에서는 노천카페적 성격을 띠면서도 ‘폴딩도어’ 즉 개폐형 유리문을 사용하는 개방형 파사드가 급속도로 확산되어왔다. 본고는 폴딩도어식 파사드가 철골과 유리를 사용한 서구 아케이드의 진화된 모습과 문화적 특징을 내보이면서 동시에 한국 대청마루 창호의 기능과도 혼성적으로 조우한다는 점에 주목하며, 가변적으로 개폐되는 개방형 파사드가 소비자들의 시선과 거리 경험을 어떻게 변모시키는지 고찰한다. 그리고 보드리야르가 후기자본주의 사회의 특성에 대해 지적한대로, 카페 공간에서 작용하고 있는 보다 정교한 육체의 기호화·계층화 과정에 대해 논의한다. 그러나 이러한 비판적 기능에도 불구하고, 개방형 파사드는 변화와 이행이 일어나는 역동적인 ‘문지방’ 또는 ‘리미널 스페이스’로 기능할 수 있으며 복합적인 경험과 이벤트를 창출함으로써 새로운 의식적 전환을 불러일으킬 수 있는 가능성의 공간이라는 점에 주목한다.",
      "keywords": "카페, 파사드, 대청마루, 문지방, 보드리야르, 벤야민",
      "isUOS": false
    },
    {
      "title": "대도시의 미학을 위한 프롤레고메나- 짐멜, 크라카우어, 벤야민에 기대면서",
      "author": "하선규",
      "abstract": "‘대도시의 미학’이란 무엇인가? 대도시의 미학이 가능하다면, 이 때 ‘미학’은 어떤 의미이며, 대도시는 어떤 대상으로 이해해야 하는가? 본고는 이들 질문에 답하기 위한 예비적 고찰이다. 본고는 먼저 근대미학이 논구한 감성적 차원의 정당화가 어떤 의미에서 근대정신과 근대 세계에 대한 대응이자 도전이었는가를 간략하게 살펴본다. 특히 미학이란 학문의 이론적 출발점을 상기하고, 미학이 처음 등장할 때부터 철학적 인간학, 문화철학, 역사철학 등과 긴밀하게 연결되어 있음을 강조하고자 한다. 이어 본고는 모더니티 세계를 생성사적으로 이해하기 위한 핵심 개념으로서 ‘운동’ 개념에 주목하고, 이 개념이 지닌 다층적인 차원과 복합적인 의미를 토론한다. 운동 개념이 대도시를 살아가는 현대 주체의 고유한 세계지평과 자기 이해를 포괄적으로 조망할 수 있는 토대를 제공해주기 때문이다. 아울러 본고는 현대 주체의 세계지평과 자기 이해를 몇 가지 본질적인 측면에서 조명하는데, 이들은 세계의 파편화와 추상화, 역사적 연속성의 해체, 지배적 범주로서의 우연성, 대중매체의 충격과 중요성 등이다. 또한 본고는 이러한 현대성의 특징들이 현대 미학에게 어떤 근본적인 자기반성을 촉발했으며, 또 어떤 중요한 철학적 과제를 던져주었는가를 반성해본다. 이러한 논의를 통해 본고가 도달한 지점은 현대 미학이 포괄적인 역사적 지각이론과 역사적 주체이론을 매개로 대도시라는 사후적으로 구성되어야 하는 대상과 필연적으로 조우하게 된다는 것이다. 이제 현대 미학에게 던져진 과제는 이러한 지각이론과 주체이론을 근간으로 하는 역사적-문화적 현상학을 정립하는 일이라 할 수 있다.",
      "keywords": "대도시, 근대미학, 현대미학, 현대성의 이론, 추상화, 우연성, 대중매체",
      "isUOS": false
    },
    {
      "title": "발터 벤야민과 루이스 칸의 문지방Threshold",
      "author": "우영선",
      "abstract": "루이스 칸과 발터 벤야민은 동화의 세계에 주목했다는 점에서 공통된 사유의 맥락을 제시했다. 이러한 공통점을 넘어 루이스 칸과 벤야민은 미메시스적 사유와 문지방에 대한 사유에서 큰 유사점을 갖는다. 발터 벤야민은 여러 저작을 통해 문지방을 거론하고, 이 요소를 자신의 철학적 사유가 응축된 곳으로 이해한다. 벤야민은 정문이나 입구, 거리를 이러한 문지방의 사례로 지적한다. 건축 요소로서의 입구와 거리 개념의 중정은 루이스 칸 건축 작품의 가장 큰 특징 중 하나이다. 동일한 건축 요소들을 강조하는 이러한 맥락에 따라 루이스 칸의 입구와 중정 개념의 거리를 하나의 문지방 요소로 볼 수 있다. 루이스 칸의 어록에서 문지방은 크게 두 가지 의미로 등장한다. 그 하나는 문이 열렸을 때 빛이 지나가는 외부와 내부 사이의 전이적 공간이라는 구체적인 건축 요소이며, 다른 하나는 루이스 칸의 건축적 사유 주제였던 ‘침묵과 빛’의 이행 과정을 지칭하는 건축적 사유 주제다. 루이스 칸의 다이어그램과 시는 사물과 언어가 닮아있는 동화의 세계와 유사하며, 이 다이어그램과 시적인 함축적인 글을 통해 루이스 칸은 빛과 침묵, 그리고 빛에서 침묵으로, 침묵에서 빛으로의 이행지점에 해당하는 문지방 사유를 강조한다. 문지방을 영감과 아우라의 장소로 인식하고, 문지방을 신성한 곳으로 여기는 벤야민의 사유는 영감의 장소인 칸의 문지방 개념과 유사하다. 이러한 경험의 가능성은 입구-계단/회랑-중정으로 이어지는 일련의 공간에서 얻는 촉각적 경험과 ‘걷기(walk)’이다.",
      "keywords": "루이스 칸, 발터 벤야민, 문지방, 아우라, 미메시스, 동화, 입구, 거리",
      "isUOS": true
    },
    {
      "title": "세계의 몰락과 영웅적 멜랑콜리: 독일 바로크 비극, 보들레르, 그리고 발터 벤야민",
      "author": "김동훈",
      "abstract": "이 논문의 목적은 발터 벤야민이 독일 바로크 비극과 샤를르 보들레르의 시세계를 분석하면서 그 특징으로 언급한 영웅적 멜랑콜리 개념에 대한 변증법적 해석을 통해 이들 사이의 밀접한 연관관계를 해명하는 데 있다. 이를 위해 이 논문은 히포크라테스, 아리스토텔레스, 갈레누스 등 고대 철학자, 의학자들의 이론에 대한 선행적 고찰을 통하여 멜랑콜리의 일반적 특징을 분석하였고, 이를 통하여 멜랑콜리 개념의 변증법적 성격을 밝혀내었다. 히포크라테스는 멜랑콜리를 인체 내에 존재하는 네 가지 체액 중 하나인 흑담즙으로 인해 야기되는 질환이나 그 증상으로 파악하였지만, 갈레누스는 거기서 한 걸음 더 나아가 네 체액 사이의 관계를 통해 형성되는 체질 중 흑담즙이 우세한 체질로 파악하였다. 아리스토텔레스는 멜랑콜리를 차가움과 뜨거움이라는 정반대되는 두 가지 특성의 결합으로 이해하였다. 이 결합의 정도에 따라 무기력과 무능력, 까닭 없는 슬픔의 상태가 지속되는 것으로부터 천재적 능력의 발휘나 광기의 분출에까지 이르는 여러 가지 현상이 나타난다는 것이다. 벤야민은 멜랑콜리의 이러한 변증법적 성격을 체질이 아니라 독일 바로크 비극의 작가들이나 샤를르 보들레르가 처했던 시대적 상황 속에서 인간들이 가지게 되었던 근본적 정조와 관련시켜 새롭게 해석하고 있다. 전자의 경우 루터주의자로서 이들이 겪었던 세계의 의미상실이, 후자의 경우에는 산업자본주의 메커니즘으로 인해 야기된 모든 것들의 획일화와 그 끊임없는 반복이 멜랑콜리의 원인으로 나타난다. 이러한 의미상실로 인한 세계의 몰락에 대한 반응의 변증법적 양극단으로 벤야민은 독일 바로크 비극의 주인공인 군주의 몰락과 보들레르의 영웅적 멜랑콜리를 대비시키고 있다. 우유부단으로 인한 결정무능력으로 인하여 광기 속에서 몰락해가는 군주의 모습은 비천하고 파멸의 근원이 되는 멜랑콜리를 보여주는 반면 자본주의의 최첨단 도시였던 파리를 뒤덮고 있던 우울과 권태의 정서를 통하여 군중 속의 고독을 즐기면서 모든 것을 획일화하는 자본주의에 대한 도발을 감행했던 보들레르의 모습은 숭고한 멜랑콜리, 영웅적인 멜랑콜리(erhabene Melancholie, Melencolia illa heroica)를 드러낸다. 멜랑콜리에 대한 이러한 변증법적 해석은 멜랑콜리 현상을 질병이나 광기로만 이해하거나 천재적 감성으로만 이해하는 일면적 해석방식에서 벗어나 다양한 각도에서 조명할 수 있는 가능성을 열어 보여주는 한편, 현대인들이 겪고 있는 세계의 몰락이나 의미상실을 근원적으로 파악하고 극복할 수 있는 가능성을 제시하고 있다.",
      "keywords": "발터 벤야민, 독일 바로크 비극, 샤를르 보들레르, 세계의 몰락, 영웅적 멜랑콜리, 멜랑콜리적 천재, 광기, 변증법",
      "isUOS": false
    },
    {
      "title": "초현실주의 이념과 라깡 정신분석학의 관련성 연구: 발터 벤야민의 「초현실주의」를 중심으로",
      "author": "남인숙",
      "abstract": "초현실주의는 시적(詩的) 실천을 통해 프로이트가 발견한 ‘무의식’을 삶 속에 구현하려 한 예술운동이다. 브르통의 자동기술법이나 살바도르 달리의 ‘비판적 망상증적 방법’은 구체적인 삶의 현실이 곧 무의식적 삶임을 드러내려는 초현실주의의 대표적인 실천방법이라고 할 수 있다. 벤야민은 일찍이 ‘초현실주의’논문을 통해서 초현실주의 이러한 실천적이고 전복적인 힘을 간파하고 있음을 보여준다. 라깡 또한 자신의 세미나에 등장하는 많은 인용이나 언급을 통해 초현실주의와 고유한 영향관계를 보여주고 있다. 다른 한편으로 예술의 장에서, 현대미술은 초현실주의에 영향 받은 바가 막대함에도 불구하고 이론적, 이념적 조명은 상대적으로 빈약한 편이다. 본 글은 이런 점에 주목하여, 벤야민의 ‘초현실주의’ 논문을 중심으로 초현실주의와 라깡의 정신분석학의 관련성을 해명하는 것이다. 이것은 우선 초현실주의 연구를 한 차원 더 확장하여 초현실주의에 대한 이해를 높이며 따라서 현대미술에 대한 이해의 폭을 넓힌다는 의의를 지닌다. 둘째 벤야민의 유물론적 사유에서 ‘초현실주의’의 이념이 차지하는 위상을 파악해 볼 수 있다. 이로써 벤야민 사유 과정에서, 그의 언어관과 실천방법에 대한 이해를 보충한다는 의의를 지닌다. 셋째 초현실주의에서 논제를 보다 확대하여, 벤야민의 ‘초현실주의’에서 제출한 논점들을 라깡의 정신분석학을 통해서 보충적으로 해명함으로써, 벤야민 사유에 산포해 있는 정신분석학적인 단서를 정신분석학적인 방법을 통해서 ‘실질적으로 구체화’한다는 의의를 지닌다. 이는 벤야민 해명의 지평을 확대할 가능성을 보이는 것이다.",
      "keywords": "초현실주의, 정신분석학, 벤야민, 라깡, 브르통, 뒤샹, 무의식, 범속한 각성, 변증법적 이미지, 미메시스, 발견된 오브제, 충동, 궁정풍 사랑, 욕망, 레디메이드",
      "isUOS": false
    },
    {
      "title": "상품과 알레고리 - 맑스와 벤야민의 환등상 개념",
      "author": "한상원",
      "abstract": "벤야민이 그의 19세기 파리의 파사주 연구에서 맑스의 상품물신주의 개념을 차용했다는 사실은 널리 알려져 있다. 그러나 두 이론가를 비교하려는 시도는 물론, 벤야민을 직접 맑스로 소급해 이해하려는 시도 역시 찾아보기 매우 힘들다. 본 논문이 밝혀내려는 것은 상품물신의 두 이론들은 공통적으로, 경제적 합리성에 기반을 둔 현대 사회가 바로 그 합리성의 논리에 따라 비합리성으로 전도된다는 변증법적 역설을 고찰한다는 것이다. 이러한 이론적 관점 속에서 본 논문은 맑스와 벤야민 사이의 상이한 서술수준을 넘어선 이론적 대화를 시도한다. 맑스는 상품의 가치가 형성되는 과정에서 드러나는 추상적 관계들의 전도된 형식들을 유령적 대상성과 물신주의, 환등상적 형식 등의 표현으로 담아냈다. 벤야민은 이러한 범주들이 구체적 역사적 상황 속에서 경험, 지각되는 방식을 이론화한다. 이를 통해 벤야민은 자본주의가 숭배의 기능을 갖는 종교적 체제라는 자신의 초기 신학적 구상과 맑스의 이론적 고찰을 연결시킨다. 파사주 프로젝트는 역사적으로 19세기에 출현한 환등상의 경제체제와 그 시대의 일상적 생활영역에 대한 탐구 속에서 합리적 경제체제의 비합리적, 신화적 요소로의 전도가능성을 살펴보려는 시도였다. 이러한 연구를 추적하면서 우리는 벤야민에 의해 수행된, 보들레르와 초현실주의 등 현대 예술사조와 맑스 이론의 접목가능성 역시 살펴보게 될 것이다. 결국 이러한 연구는 21세기 오늘날의 현 시대를 특징짓는 감각적이고 초감각적인 현상들과 그 경험들에 대한 이론적 고찰을 위한 준비과정으로 기능할 수 있을 것이다.",
      "keywords": "상품물신주의, 맑스, 벤야민, 환등상, 보들레르, 초현실주의",
      "isUOS": true
    },
    {
      "title": "<서평>『모더니티의 수도 파리(Paris, capital of modernity)』",
      "author": "김동훈",
      "abstract": "이 글의 목적은 영국 출신의 지리학자 데이비드 하비의 책 􋺷모더니티의 수도파리 (Paris, Capital of Modernity)􋺸의 내용을 분석하고 그 속에 담긴 인문학적 상상력의 깊이를 가늠해보는 데 있다. 이를 위해 평자는 우선 하비가 보들레르의 힘을 빌려 정의하는 근대성 개념의 특징을 분석하였다. 하비에 따르면 근대는 그 이전에 배태되어 있던 가능성의 발현이면서 동시에 창조적 파괴를 통한 그 이전의 역사와의 단절이라는 이중적 성격을 지닌다. 그런데 이를 통해 근대성을 형식적으로 정의할 수는 있겠지만 내용에 대해서는 아무것도 제시하지 않았기에 이러한 정의는 근대성을 근원적으로 설명하기에는미흡하다는 사실이 밝혀졌다. 하지만 다른 한편 하비는 구체적 상황들을 분석하고 설명하기 위해 끊임없이 보들레르, 플로베르, 발자크, 도미에 등의 시나소설, 삽화의 도움을 구하는데, 이러한 인문학적 상상력은 통계숫자와 공식적인 문건에만 매달리는 연구로는 절대로 접할 수 없는 사태의 이면을 통찰할수 있는 가능성을 열어준다. 그의 글이 매우 흥미롭게 읽히는 이유가 여기에있다. 이러한 사실들은 그가 오늘날 역사지리학자로서, 마르크스주의 이론가로서 누리고 있는 명성이 근거 없는 것이 아님을 여실히 보여준다. 하비가 이 책에서 주로 고찰하고 있는 것은 1848년 혁명과 그 이후 등장한제2제정 하에서 파리가 겪은 엄청난 변화, 그리고 그 결과로 인해 발생한1871년의 파리 코뮌이며, 그는 특히 제2제정 파리지사였던 오스망이 입안하고 실천에 옮겼던 엄청난 도시재편계획을 집중적으로 다루고 있다. 이로 인해파리는 프랑스 국내뿐만 아니라 전 유럽의 자본주의 발전에 있어서 모범적이고 선도적인 역할을 하는 근대성의 수도라는 의미를 지니게 된다. 이런 의미에서 􋺷파리􋺸는 오늘날 도시 안에서 무슨 일이 일어나고 있는가를 파악하려는이들에게나 창조적 파괴를 통하여 도시의 새로운 변화를 추구하는 이들 모두에게 필독서로 추천되기에 부족함이 없다고 하겠다.",
      "keywords": "근대성, 1848년 혁명, 제2제정, 파리 코뮌, 오스망, 발자크, 벤야민, 보들레르, 플로베르, 도미에",
      "isUOS": false
    },
    {
      "title": "발터 벤야민의 역사철학테제: 역사주의와 역사 유물론그리고 메시아주의의 성좌구조",
      "author": "고지현",
      "abstract": "우리는 「역사의 개념에 대하여」(1940)에서 벤야민의 역사철학을 집약하고 있는 성좌구조 하나를 발견할 수 있다. 역사주의와 역사 유물론 그리고 메시아주의가 만들어내는 형상이 바로 그것이다. 벤야민은 역사주의에 대해 ‘유곽에서 몸을 파는 창녀’에 비유할 정도로 격한 적대감을 드러내고 있으며, 역사주의에 맞선 대항마로 자신의 입장을 포함한 역사 유물론을 내세우고 있다. 한편 그는 마르크스후예들이 전유한 역사유물론이 그 고유한 비판적 잠재력을 상실했다는 점에서 당대 마르크스주의에 이의를 제기하고 있으며, 그러한 맥락 속에서 유대전통의 메시아주의를 주장하고 있다. 각 요소의 위상은 그 세 가지가 만들어내는 성좌구조 전체에 의해 규정되는데, 그것을 들여다볼 수 있는 열쇠 하나로 ‘신학적’이라 특징지을 수 있는 독특한 사유차원이 표면에 떠오른다. 만약 이 열쇠를 손에 넣을 수 있다면, 벤야민의 역사철학 반 이상은 파악하는 셈이 된다. 그러한 전망 속에서 이 성좌구조에 대해 살펴보기로 한다.",
      "keywords": "역사철학테제, 역사주의, 메시아주의, 기억(불망), 정치 신학",
      "isUOS": false
    },
    {
      "title": "미디어 공간의 원사(原史): 발터 벤야민과 19세기 파리의 정보 산업",
      "author": "강재호",
      "abstract": "우선 이 논문은 19세기 파리에서의 도시공간의 사유화, 공공 커뮤니케션의 산업화 그리고 공적 공간의 미디어화와 관련해 미디어 공간으로서의 신문에 대한 발터 벤야민의 분석을 다룬다. 나는 어떻게 정보산업이 문학적 실천, 지적 행위 그리고 새로운 사회적 주체의 형성에 있어서 근본적인 변화를 야기했는지를 보여주고자 한다. 또한 나는 19세기의 미디어 공간의 복합적인 역동에 대한 벤야민의 풍부한 예증이 어떻게 부르주아적 공공영역의 분석에 근거한 과도한 단순화의 결함을 회피하는지 입증할 것이다. 이를 통해 나는 신문에 대한 벤야민의 비판적 분석이 디지털 시대의 미디어 공간과 도시경험 사이의 공통점들을 검토할 수 있도록 해주는 체계적인 틀을 제공한다는 논제를 제시하고자 한다.",
      "keywords": "미디어 공간, 판타스마고리아, 도시공간, 스펙터클, 이야기하기, 정보, 신문, 커뮤니케이션, 미디어화한 공적 공간",
      "isUOS": false
    },
    {
      "title": "발터 벤야민의 대도시 고고학- 베를린 에세이를 중심으로 -",
      "author": "남덕현",
      "abstract": "현대예술과 철학에서의 현대성은, 산업혁명의 향으로 형성된 대도시를 배 경으로 탄생했다. 다시 말해 현대성은 대도시의 새로운 현상과 문제점들에 대한 현대 예술의 예술적 형상화와 현대 철학의 지적인 성찰의 주제던 것이다. 이런 의미에서 현대예술과 현대철학은 대도시의 예술과 철학이라고 할 수 있다. 대도시에 대한 인문학적 연구를 우리는 ‘대도시 인문학’이라고 부를 수 있을 것이다. 이러한 새로운 학문 분야에서 발터 벤야민은 특별한 위치를 차지한다. 그는 대도시 베를린 출신으로, 독일에서 나치가 집권한 후에는 ‘19세기의 수도 파리’로 망명하여, 당시 최첨단의 예술과 철학에 대한 비평 작업을 수행했다. 이 를 통해 그가 제시한 역사철학, 언어철학, 매체론, 예술 비평에서 ‘현대적인’ 것 이 절대적인 비중을 차지하고 있으며, 그 중심점은 언제나 대도시와 대도시에 사 는 사람들의 삶이었다. 그는 대도시인들의 의식의 저변에 깔려 있는 무의식적 요 소들뿐 만이 아니라 현대 대도시의 역사철학적 토대와 기원에 대하여 많은 성찰 을 하고, 그에 관한 글들을 남겼다. 우리는 그의 글쓰기가 갖는 이런 방법론적인 특성을 ‘대도시 고고학’이라고 부를 수 있을 것이다. 이러한 관점에서 본 연구에서는 그의 ‘대도시 고고학’의 기본개념들을 담고 있는 베를린 에세이들을 분석한다. 이 에세이에서 그는 베를린을 연구하기 위한 자료로 사회학적이거나 역사학의 자료를 사용하지 않았다. 그 대신에 그는 ‘시민 계급의 한 아이에게 침전된 대도시 베를린의 이미지’를 중심적인 연구 자료로 사용한다. 베를린 에세이에 등장하는 바로 이런 중심 개념들을 토대로 그는 현대 대도시에 대한 사회학적, 심리학적, 철학적 연구들을 펼쳐나갔으며, 이는 다시 그의 역사철학으로 수렴된다. 대도시 경험에 대한 ‘무의지적 기억’ 속에서는 벤야민이 찾아보고자 했던 것 은, ‘원래의 역사’의 편린들이었다. 그에 따르건대 현대 대도시인들의 망각한 것 속에는 ‘이전 세계’에 대한 한 집단의 경험이 내재하며, 이는 세대를 이어 다음 세대에게도 내장된다. 이 고고학적 탐사의 글쓰기는 망각된 것을 되살리고자 하 는 ‘기억하기(Eingedenken)’의 작업이기도 하다. 이 개념을 매개로 대도시에 대한 벤야민의 성찰은 신학의 차원으로 넘어가는 것처럼 보인다. 유태카발라의 메시아주의에서 유래한 이 개념은 인간이 그 운명 속에 각인된 구원의 약속을 망각 하고 있다는 점을 가리킨다. 이 구원의 약속은 우리의 의식과 역사 현실, 그 3차 원의 세계에서는 위험의 순간에 섬광처럼 스치는, 파편적인 이미지, 일그러진 ‘꼽추난쟁이’의 형상으로 우리 자신에게 모습을 드러낸다. 이를 세속적으로 해석해보자면, 역사유물론 철학에서의 혁명 또한 그 혁명에 대한 믿음을 ‘지금 여기’에서 받아들일 때, 그때가 바로 혁명의 순간이 되는 셈 이다. 시간의 한 점에 고정되어있던 ‘이미지’가 나의 실천을 요구하면서 시간의 흐름을 다시금 작동시키는 ‘변증법적 이미지’로 전환되는 것이다. 하지만 혁명의 약속 또한 여전히 망각되어 잠들어있으며, 다만 절실하게 혁 명이 요청되는 위기의 순간에 파편화된 모습으로, 꼽추난쟁이의 형상으로 모습 을 드러내기도 한다. 그렇다면 벤야민에게서 세속적으로 이해된 구원이란, 바로 이 이미지로만 남아있는 것들을 일깨우고, 이를 일상과 실천 속으로 끌어들이는 것일 것이다. 결국 벤야민의 이러한 사유는, 변증법적 역사유물론을 기억과 깨어남의 관점 에서 새롭게 정립해야 한다는 주장으로 귀결될 수 있다. 그럼으로써 역사유물론 은 이전에 없었던 미래의 세계를 꿈꾸는 것이 아니라, 과거의 기억 속에 묻혀있 던 꿈을 관철시키는 것이라는 자각, 그 코페르니쿠스적 전환에 이를 수 있다는 것이다. 따라서 그의 역사유물론은 이 역사에 대한 기억, 그 속에서 망각하고 있 는 염원과 구원의 약속을 기억해내는 것이 바로 사물화 현상을 내면화하고 있는 현실에서 깨어나는 것이며, 그것은 미래에 대한 약속이 아니라 투쟁에 대한 요구 이기도 할 것이다.",
      "keywords": "발터 벤야민, 대도시, 베를린, 역사철학, 변증법적 이미지",
      "isUOS": false
    },
    {
      "title": "산업유산 활용 사례를 통해 본 인문학적 도시재생 방향 모색 - 뉴욕 하이라인과 서울 선유도 공원을 중심으로 -",
      "author": "김소라;이병민",
      "abstract": "산업구조와 도시의 사이클이 변화함에 따라 이전 산업과 관련 되었던 건축물이나 건축시설물들이 도시의 사회적 문제로 등장하게 되었다. 이런 기존 산업의 폐허를 깔끔하게 제거하고 새로운 건물을 짓는 것이 도시계획자나 기획자에게는 최선으로 여겨지고 있다. 인문학자 발터벤야민은 도시 자체를 체험하는 공간으로 간주하고, 지각하는 방식과 지각하는 주체를 언급함으로서 도시를 바라보는 새로운 시각을 보여주고 있다. 본 연구는 산업유산인 폐철도를 재활용한 뉴욕 하이라인 공원과 정수장 시설을 재활용한 한국 선유도 공원의 흔적을 살펴보고, 개발·관리 주체 및 현재 이용객들이 체험하고 있는 문화·예술 프로그램 등의 주요 콘텐츠 비교를 통해 산업유산 활용 시 인문학적인 도시재생의 방향을 모색하는데 있다.",
      "keywords": "도시재생, 산업유산, 산책자, 체험, 흔적",
      "isUOS": false
    },
    {
      "title": "人紋과 人文, 도시의 관계에 대한 고찰",
      "author": "류재한",
      "abstract": "본 연구는 人紋과 人文, 都市의 관계를 밝히고자 했다. 이를 위해 “인문(人紋)과 인문(人文)의 반영체(反影體)”로서의 도시와 도시의 정체성(역사와 이야기)의 관계, 그리고 人紋都市와 人文都市의 관계를 분석해 보았다. 먼저, Ⅱ장에서는 인문(人紋)과 인문(人文)의 개념 정의와 차이를 살펴보았다. 인문(人紋)은 발터 벤야민(Walter Benjamin)이 자신의 저서 『파리, 19세기의 수도Paris, capitale du XIXème siècle』에서 말했던 “거주한다는 것은 흔적을 남기는 것을 의미한다.”(Habiter signifie laisser des traces)에서 “흔적” 즉 인간 삶의 흔적(무늬)을 말하며 인문(人文)은 인문(人紋)이 켜켜이 쌓여 이루어 “인간의 변화”와 더불어 “인간의 문화와 문명”을 가리킨다. Ⅲ장에서는 人紋과 人文 그리고 都市의 관계를 살펴보았다. 적대적인 자연을 통제하기 위해 주술적 의미의 人紋을 자신의 신체(문신)와 거주지(동굴벽화)에 새겼던 인간이 인간의 몸과 거주 공간(동굴)을 넘어 도시라는 새로운 몸과 주거공간에 人紋을 새기고 기록하게 됨을 알 수 있었다. 인간에게 도시는 몸과 주거공간인 동굴을 대체하게 됨으로써 도시에 人紋을 새기고 기록(人文)하게 된 것이다. Ⅳ장에서는 도시에 ‘人紋’하고 도시를 ‘人文’해야 하는 당위성을 살펴보았다. 인간은 스스로 만든 작품에 자신의 흔적을 남기듯이, 도시에도 자신의 흔적 즉 人紋을 새긴다. 일상적인 흔적들뿐만 아니라 도시의 시그니처가 될 수 있는 무늬와 흔적들을 많이 보유하고 있는 도시일수록 도시의 정체성이 잘 드러남을 알 수 있었다. 따라서 미래도시의 비전으로서 人文도시는 도시 고유의 시그니처 즉 人紋을 새기고 새겨나가야 함을 파악할 수 있었다. Ⅴ장에서는 人紋도시를 人文도시로 만들 수 있는 도시의 주체인 플라뇌르에 대해 살펴보았다. 그는 “도시 애호가”로서 도시의 人紋을 읽고 해독하여 그 人紋을 人文으로 전환시킬 수 능력을 갖춘 도시 산책자이다. Ⅵ장에서는 人紋을 지키기 위한 人文의 방식을 몇몇 도시 사례를 중심으로 살펴보았다. 지금까지 살펴보았듯이, 도시는 기억(人紋)의 창고이자 기억의 재현과 기록 즉 人文의 공간이다. 그래서 人紋을 지워버린 도시 정주민의 정신적 실향은 人紋에 대한 기억상실이라고 말할 수 있다. 이는 자신이 살고 있는 도시의 이야기와 역사의 토대인 흔적에 대한 기억상실이라는 의미이다. 도시의 人紋은 기억이며 기억을 기록하는 하는 것은 人文이다. 이 때 도시의 ‘기억’과 ‘기억의 기록’ 즉 人文은 도시의 진실이며 정체성이 된다. 도시의 기억 즉 人紋을 지우는 反人文的 행위는 도시의 기억과 정체성을 지우는 것이며 도시의 ‘이야기’와 ‘역사’를 지우는 행위임을 알 수 있다. 결국 人紋都市는 공동체의 기억과 흔적(무늬) 즉 人紋을 품고 있는 ‘있는 그대로’의 도시라면, 人文都市는 人紋都市에 새겨져 있는 공동체의 人紋를 읽고 해독하며 하나의 인문학적 ‘도시-텍스트’로 기록하고 ‘만들어가는’ 도시라 할 수 있다.",
      "keywords": "인문(人紋), 인문(人文), 도시, 플라뇌르, 기억, 기록, 정체성",
      "isUOS": false
    },
    {
      "title": "도시 속의 낯선 이들 - 디킨즈 산문에 나타난 불안한/익숙한 낯섦과 타자성의 재현",
      "author": "정희원",
      "abstract": "This study deals with ghosts and the dead haunting London in Dickens’s essays Sketches by Boz(1836) and The Uncommercial Traveller(1861) in relation to his representation of London as a gothic city. This study contemplates the possibility of dialectics of unknowability and perceptibility, the everyday and the impenetrable, and the city as gothic labyrinth and the city as urban community based on communal feelings. In his essays, Dickens depicts the invisible ghostly others as the products of Victorian social structure that enhances the division between the poor and the middle class, and in doing so, he criticizes moral complacency of the middle sorts. Simultaneously, however, he provides visibility to the invisible through the uncanny encounter with them and discovers their viability through the eyes of a sympathetic (non)spectator. This study defines Dickens’s narrative style of journalism as the virtual expression of the Benjaminian dialectical images, for his essays care less for coherence and unity than for the immediacy of urban experiences constructed from discontinuous fragments of reality both from the past and the present.",
      "keywords": "『보즈의 스케치』, 『비상업적인 여행가』, 런던, 유령, 공동체성",
      "isUOS": true
    }
  ],
  "해러웨이": [
    {
      "title": "계산하는 친족(Computing Kin)과 패턴 식별/차별(Pattern Discrimination)-계산하는 기계와 어떠한 친족의 관계를 맺을 것인가?",
      "author": "김은주",
      "abstract": "이 논문은 체현된 인지와 체현의 물질적 구조를 통해 사이보그의 체현와 젠더의 관계를 탐색한 캐서린 헤일스의 문제의식을 공유하며, 웬디 휘경 전의 논의를 중심으로 계산하는 인간 컴퓨터였던 여성 컴퓨터와 프랑켄슈타인의 ‘딸’로 불린 소프트웨어의 작동을 살핀다. 이를 통해 이 글은 인간과 비인간을 훈육하고 양육하는 계산 기계를 계산하는 친족으로 제안하면서 블랙박스화된 계산 기계의 연산에 연결될 수 있는 방법을 모색한다. 이 글의 최종 목표는 계산 기계가 연산하는 패턴 식별이 기술의 용어만이 아니라, 정치적 소음을 차단하여 차이를 차별로 구조화한다는 점을 비판한 히토 슈타이얼의 논의를 제시하면서, 도나 해러웨이의 친족 만들기를 계산하는 기계와 연결하여 계산하는 친족 만들기의 형상에 관해 질문하고자 한다.",
      "keywords": "계산하는 친족, 비인간, 인공지능, 패턴 식별, 할루시네이션",
      "isUOS": true
    },
    {
      "title": "다종 간 도시를 위한 정의의 모색과 실천 - 너스바움의 다종 공동체와 해러웨이의 테라폴리스에서의 다종 간 정의를 중심으로",
      "author": "현남숙",
      "abstract": "도시는 인류세의 ‘화석’이 될 수 있을 정도로 기후위기에 주요한 영향을 미쳐서, 인류세는 도시세로 불리기도 한다. 이러한 상황에서 도시에서의 삶은 인간 이외의종들에게 매우 부정의한 공간이다. 비인간 동물들은 도시의 안과 밖에서 인간과 함께 살아감에도 기존의 정의 이론에서의 분배, 지위, 정치적 대표성 그리고 인지적정의 면에서 정의의 대상이 되지 못하였다. 따라서 다종 간 도시를 만들려면 다종간 정의의 정립이 요구된다. 이러한 맥락에서 너스바움의 ‘다종 사회에서의 동물정의’와 해러웨이의 ‘테라폴리스에서의 다종 간 정의’는 다종 간 도시의 근간이 되는다종 간 정의를 정립하는 데 주요한 통찰을 제시한다. 너스바움은 자유주의 철학의 배경에서 동물을 위한 가상헌법과 같은 법적 해결책을 제공하여, 다종 간 정의의 인간주의적 확장을 보여준다. 한편, 해러웨이는 생태정치적 담론의 맥락에서 반려종의 함께 되기를 통한 과학-예술적 실천을 제시함으로써, 다종 간 정의에서 탈인간화된 정의의 방향을 보여준다. 이들은 각각 이론적 차이와 그로부터 파생되는 실천적 방향의 차이에도 불구하고, 다종 간 도시의 맥락에서 다종 간 정의를 구상하는 데 주요한 비계를 제공한다.",
      "keywords": "다종 간 정의, 다종 간 도시, 너스바움, 해러웨이",
      "isUOS": false
    },
    {
      "title": "환경적 도덕주의 너머의 도시주의 - 가덕도신공항 논쟁 분석을 중심으로",
      "author": "백승한",
      "abstract": "본 논문은 현재 진행 중인 가덕도신공항 계획을 둘러싼 주요 논쟁을 살펴보고 그 인류세적 함의점을 검토한다. 이를 통해 인간중심주의, 그리고 돌봄의 윤리로서의 도덕주의에 한정하지 않는 도시주의 모델을 제안한다. 이는 2장의 이론적 논의와 3장의 사례연구로 구성된다. 먼저, 2장에서는 기후위기와 도시주의 논의를 둘러싼 서로 다른 두 가지 진영의 주요 내용과 사례를 검토한다. 첫 번째는 비판이론 전통에 기반하는 인류세의 건축과 도시주의에 대한 것이다. 이는 2000년을 전후로 대두된 지속가능성 및 인류세 담론과 더불어, 동식물을 포함한 자연 환경과 보다 수평적으로 관계 맺으려는 일련의 논의들을 포함한다. 두 번째는 도덕주의에 한정하지 않는 인류세 비평과 그 도시론적 확장 가능성 모색이다. 이는 문제적인 상황들을 마주하면서 지속가능한 공존 방식을 모색하는 도나 해러웨이, 일상생활 영역과 쓰레기를 넘나드는 플라스틱과의 정서적 관계 맺기에 주목하는 게이 하킨스, 그리고 마틴 하이데거의 현상학을 인류세적 독해로 끌어들이는 믹 스미스와 제이슨 영의 연구를 중심으로 전개된다. 인류세를 둘러싼 이와 같은 두 가지 연구 동향에 대한 검토는, 3장에서 살펴볼 개발주의 대 환경주의로 압축될 수 있는 가덕도신공항 계획을 둘러싼 지금까지의 논쟁을 입체적으로 살펴볼 수 있는 기회로 작용한다. 이를 통해 환경주의 진영이 전제하는 도덕적 당위성 너머에서, 돌봄과 무심함이 서로 뒤얽힌 채 작동하는 함께하기의 윤리를 새로운 도시주의 모델로 제안한다.",
      "keywords": "환경적 도덕주의, 도시주의, 가덕도신공항, 인류세, 무심함",
      "isUOS": false
    },
    {
      "title": "디지털 도시화와 사이보그 페미니즘 정치 분석: 인정투쟁의 관점에서 본 폐쇄적 장소의 정치와 상상계적 정체성 정치",
      "author": "이현재",
      "abstract": "이 논문에서 필자는 다음의 네 가지 주장을 하고자 한다. 첫째로, 디지털 도시화는 우리 사회의 페미니즘 이슈와 경향에 대대적인 변화를 가져왔다. 가령 디지털 매체를 이용한 불법촬영물의 촬영, 유포, 소비에 대한 저항은 전에 없던 강력한 페미니즘의 이슈가 되었다. 둘째로 디지털 도시화 시대에 우리 사회에는 기계와 유기체의 혼종인 사이보그가 탄생했다. 새로운 인간종인 사이보그가 경험하는 자아와 세게는 유기체로만 사는 사람들에게는 생소한 것이었다. 가령 불법촬영물에 대한 공포는 피해를 당하거나 당할 가능성이 높은 사이보그-여성들에게 특히 극대화된다. 셋째로, 우리 사회의 사이보그-페미니스트는 해러웨이의 예상과 달리 잡종성과 주변성이 아니라 ‘생물학적 여성’ 등 자연적 통일적 단일적 정체성에 기반하여 인정투쟁을 벌이는 경향을 보였다. 이는 페미니스트들이 남성중심적 도시 상상계를 비판하는 가운데 부지불식중에 이 상상계가 만들어 놓은 육체적 실재의 지도를 답습하고 있음을 의미한다. 넷째로 사이보그-페미니스트들이 생물학적 정체성 등 자연적 원본을 강조하게 된 이유는 사이버 공간에서 상처받지 않기 위해서 자신들만의 폐쇄적 장소를 만들어 가는 정치를 펼쳤기 때문이다. 사이보그-페미니스트들에게 남성중심적 문화가 지배하는 사이버 공간은 자유라기보다 제약의 공간이었으며 따라서 그들은 폐쇄적 장소를 만들어 도피하는 가운에 이에 저항했다. 그러나 폐쇄적 장소의 정치는 여성의 정체성을 물화하고 내부의 차이를 삭제할 위험을 안고 있다.",
      "keywords": "디지털 도시화, 사이보그, 페미니즘, 정체성 정치, 도시 상상계, 사이버 공간, 폐쇄 공동체",
      "isUOS": true
    },
    {
      "title": "디지털 도시화와 정신쇠약적 주체의 탄생 - ‘생물학적 여성’과 강박적 도시문화",
      "author": "이현재",
      "abstract": "필자는 이 논문에서 이 시대를 ‘디지털 도시화’의 시대로 명명하고, 디지털 도시화로 인한 정신쇠약의 상태가 ‘생물학적 여성’을 강박적으로 확증하려는 페미니즘의 흐름을 만드는 데 일조하였음을 주장하고자 한다. ‘디지털폴리스’는 가상이 아니라 “실재이자상상인 현실”(에드워드 소자) 이며, 디지털폴리스의 거주민의 몸은 인간과 비인간의 상호관계를 통해 형성되는 ‘물질-기호’의 장(다나 해러웨이)이다. 그러나 시뮬라크르의 홍수와 함께 디지털폴리스의 거주민들은 실재와의 관계, 물질과의 관계를 상실한채 상상과 기호로만 부유하게 된다. 셀레스테 올랄퀴아가(Celeste Olalquiaga)에 따르면 자아가 환경과 섞여버리기 쉬운 이러한 시뮬라크르의 홍수 속에서 거주민들은 자신의 몸이 소멸될 수 있다는 공포, 즉 정신쇠약의 상태를 경험하게 되며, 이러한 공포를 봉합하기 위해 상상계적 이미지를 강박적으로 반복하게 된다. 필자는 ‘생물학적 여성’이라는 상상계적 이미지를 강화하는 페미니즘역시 강박적 도시문화의 한 사례라고 본다. 그들은 디지털 성폭력 등 유기체로서의 몸이 유기되는 디지털 도시화의 상황에서 물질-기호 관계로서의 몸에 대한 이해를 확립하기보다 ‘생물학적 여성’이라는 상상계적 몸 이미지를 강박적으로 반복함으로써 몸 소멸과 침범의 공포에 맞서고자 했다. 결국 ‘생물학적 여성’이 상상계적 동일시에 기반하는 한 그들은 ‘생물학적 남성’뿐 아니라 트랜스젠더(M-to-F)와 같은 경계 횡단적 이질성도 배제하는 방향으로 나아가게 된다.",
      "keywords": "디지털 도시화, 정신쇠약적 주체, 물질-기호, 실재이자상상인 현실, 도시 상상계, 생물학적 여성, 디지털 페미니즘",
      "isUOS": true
    },
    {
      "title": "인간중심주의를 넘어 반려종으로 존재하기를 생각하다: 최유미 『해러웨이, 공-산의 사유』(도서출판 b, 2020)",
      "author": "김은주",
      "abstract": "",
      "keywords": "",
      "isUOS": true
    },
    {
      "title": "홀로바이온트의 응답하기, 기억하기: 해러웨이의 친족 만들기와 SF 글쓰기를 중심으로",
      "author": "김은주",
      "abstract": "이 글은 해러웨이의 응답하기와 기억하기를 친족 만들기와 SF 글쓰기로 조명하고 해러웨이의 응답하기의 윤리를 이해고자 한다. 해러웨이에게서 응답하기와 불가분의 관계를 맺고 있는 심포이에시스 개념은 해러웨이의 인간존재를 진화론적으로 환경에 적응, 변화해가는 구체적 생명체이자 자연-문화 연속체로서의 크리터들의 연합인 홀로바이온트로 제시한다. 홀로바이온트는 살아있음만이 아니라 죽어서 다른 존재들의 양분이 되는 퇴비라는 점에서 공생발생의 진화인 심포이에시스로 진화해 온 생태적 순환과 배치에 있는 관계성의 존재이다. 해러웨이의 홀로바이온트 개념은 해러웨이의 응답하기의 윤리를 응답의 상대로서 인간과 분리된 타자인 비인간을 세워놓는 인간중심주의적 윤리와 구별하는 존재론적 전제를 마련하며, 이러한 응답하기의 방식은 “친족만들기”로 등장한다. 친족은 이 행성에 거주하기에 트러블로 얽히면서 서로를 감염시키는 종들이 불순하게 얽힌 관계망이다. 친족 만들기는 친족으로 얽혀있었으나 인간중심주의적 경계선으로 배제한 관계를 친족으로 제시하면서 친족의 역사를 기억하기, 홀로바이온트로서 이미 얽힌 멤버를 함께 기념하기를 동반한다. 해러웨이가 기억하고 기념하기 위한 방식으로 제시하는 것이 친족에 관한 SF 글쓰기이다. 이 글은 친족 만들기와 기억하기로서 SF 글쓰기가 실행하는 응답하기를 역사성과 구체성에서 비롯한 응답의 위치 차이를 이해하는 부분적 회복으로서 제안하고, 응답하기의 윤리를 오염된 다양성과 불확실한 마주침 속에서 지구 행성에서 거주하기로 그 의미를 밝힌다.",
      "keywords": "기억하기, 응답하기, 친족만들기, 해러웨이, SF 글쓰기",
      "isUOS": true
    },
    {
      "title": "다중위기 시대, 비인간 전회와 회절의 정치",
      "author": "김은주",
      "abstract": "이질적 현상들의 복합 위기를 뜻하는 다중 위기의 상황은 코로나19 바이러스로 인한 팬데믹을 기점으로 지구 행성적 재난으로 본격화되고 있다. 이 글은 ‘비인간전회’를 통과해 다중위기상황에서 새로운 정치적 이행을 모색하는 행위자(actor)와 그 연결을 살핀다. 글의 구성은 다음과 같다. 우선 비인간 전회의 의미를 짚고, 브루노 라투르의 행위자 네트워크 개념을 해러웨이가 제안한 광학적 기구가 행하는 회절(diffraction)과 연결하여 설명한다. 행위성은 다양한 행위자들의 행위의 중첩과 얽힘 그리고 연결에 따른 것이라는 점에서, 간섭의 패턴으로서 회절이라는 개념과 연관한다. 이러한 회절은 바라드의 양자적 이해를 통과해 중첩과 얽힘 그리고 전유할 수 없는 타자들의 간섭한 패턴으로 구체화된다. 바라드는 이러한 얽힘이 타자화의 흔적에 얽매여 있는 관계이기에 다른 것과 얽혀 있는 의무의 관계를 드러낸다고 설명한다. 바라드는 특히 회절의 특징은 모호성과 미결정성을 강조하며 이분법적 사유를 넘어서 인간 행위자와 비인간 행위자 연결을 강조하는 회절의 정치의 가능성을 제시한다.",
      "keywords": "다중위기, 바라드, 비인간전회, 해러웨이, 행위자-네트워크, 회절",
      "isUOS": true
    }
  ],
  "르페브르": [
    {
      "title": "Navigating the Deep South - Mobility, Space, and Racial Boundaries in Twain’s Huckleberry Finn and Farrelly’s Green Book",
      "author": "김미정",
      "abstract": "Adopting an urban humanities approach, this article analyses Mark Twain’s Adventures of Huckleberry Finn (1884) and Peter Farrelly’s Green Book (2018), emphasizing mobility, spatial practices and racialized boundaries. While Adventures of Huckleberry Finn portrays the river and raft as liminal spaces on the margins of the antebellum South, Green Book depicts the car and highway as integral to the infrastructures of Jim Crow segregation and mid-twentieth-century urban modernity. A comparative analysis of these works reveals that everyday mobilities, whether drifting down the Mississippi or navigating Southern roads, can become technologies of exclusion and opportunities for solidarity. Drawing on Henri Lefebvre’s theory of the production of space and Rick Altman’s model of genre transformation, this article demonstrates how cultural texts convey the physical and symbolic dimensions of urban life, including surveillance, accessibility and intimacy. This approach makes a valuable contribution to urban humanities scholarship by tracing the history of racialized mobility and connecting nineteenth-century literary visions of the American South with twentieth-century cinematic portrayals of the Deep South.",
      "keywords": "Adventures of Huckleberry Finn, Green Book, Deep South, urban humanities, racialized space, road movie",
      "isUOS": false
    },
    {
      "title": "르페브르의 삼항변증법에 대한 정합적 해석",
      "author": "김외곤",
      "abstract": "본 논문은 ‘공간적 선회’에서의 공간의 개념을 소자가 ‘사회적으로 생산된 공간‘이라 밝힌 르페브르의『공간의 생산』을 중심으로 ‘사회적 공간의 세 가지 계기’와 관련된 변증법적 관계를 고찰한다. 본 논문은 『공간의 생산』의 전략적 가설이 탐색하기를 요구한 변증법적 관계가 지칭하는 변증법이 르페브르의 ‘삼항변증법’이라는 것을 밝히는 것을 첫 번째 목표로 한다. 그리고 르페브르를 연구하는 학자들의 삼항변증법에 대한 기존 해석으로는 『공간의 생산』의 전략적 가설이 탐색하기를 요구한 ‘다른 공간’을 생산하는 길을 제시한 변증법적 관계를 탐색하는 것에는 한계가 있다고 판단하여, 이 한계를 극복할 수 있는 삼항변증법에 대한 정합적 해석을 제시하는것을 두 번째 목표로 한다. 필자가 본 논문에서 제시한 ‘르페브르의 삼항변증법에 대한 정합적 해석’은 공간생산의 세 계기 중, ‘지각된 것과 인지된 것’, ‘인지된 것과 체험된 것’, ‘지각된 것과 체험된 것’ 등, 다른 두 항 사이의 대립에서 발생할 수 있는 모순을 극복하기 위해 제시된 삼중적 관계의 변증법에 대한 정합적 해석이다. 르페브르의 삼항변증법에 대한 정합적 해석에 따르면 삼항변증법은 ‘사회적 공간의 세 가지 계기’의 서로 다른 세 항이 동시에 영향을 끼치는 관계로, 세 항 중 한 항은 다른 항 보다 우선하지 않고, 초월 종합 부정을 찾지 않는 셋 사이의 지속적인 운동으로, 공간생산의 세 계기중 제3항은 일종의 계기이자 운동의 한 측면으로 존재는 하지만 변증법의 결과가 아니며, 더 이상 정점의 역할은 하지 않는다. 르페브르의 삼항변증법에 대한 정합적 해석은, 삼항변증법이 지금까지와는 다른 새로운 공간으로서의 다른 공간, 즉 다른 (사회적) 삶의 공간이며 다른 생산양식의 공간을 생산하기 위해 제시된 전략적 가설의 실천적인 방법을 보여준다.",
      "keywords": "르페브르, 전략적 가설, 사회적 공간, 사회적 공간의 세 가지 계기, 삼항변증법, 공간 생산의 삼중성, 르페브르의 삼항변증법의 정합적 해석, 공간의 역사",
      "isUOS": true
    },
    {
      "title": "포스트모던 도시에 대한 사회학적 탐색- 몸, 공간, 정체성",
      "author": "서영표",
      "abstract": "이 논문은 포스트모던 도시가 안고 있는 다층적 모순을 분석한다. 포스트모던 도시는 소비주의적 욕망을 동력으로 움직인다. 소비주의는 공간마저도 상품화시켜 화폐적 논리에 종속시킨다. 하지만 포스트모던 공간은 혼종성을 특징으로 하고 있기도 하다. 전근대, 근대, 후기자본주의의 요소들이 서로 얽혀서 그 자체로 독특한 혼종성을 창조하고 있다. 논문은 이러한 도시의 모습을 설명하기 위해 근대 도시이론들의 계보를 간략하게 검토하는 것으로 시작한다. 그리고 그러한 계보의 결정적 계기로서 앙리 르페브르를 위치시킨다. 르페브르가 포스트모던 도시의 억압적 성격을 파악하면서도 그것으로부터 벗어날 수 있는 저항의 계기를 동시에 이야기하고 있기 때문이다. 일상에 뿌리 내린 자본주의적 논리가 어떻게 사람들을 상품과 화폐에 논리에 종속시키는지 비판하는 것만큼, 일상의 여기저기에 존재하는 저항의 틈새를 찾는 작업도 중요하다. 우리의 몸의 리듬과 집합적 기억이 지배적인 공간질서와 마찰을 일으키면서 생겨나는 탈구의 지점들을 찾아내는 것이 중요하다는 것이다. 이러한 탈구의 지점들은 혼종성의 부정적 측면(권위주의+도구적 합리성+소비주의)을 넘어 긍정적 요소들(유대+민주주의+다양성)의 발현으로 전환시킬 수 있는 저항운동의 출발점이 될 수 있다.",
      "keywords": "앙리 르페브르, 포스트모던 도시, 몸의 리듬, 탈구, 혼종성",
      "isUOS": false
    },
    {
      "title": "Radical Urban Furture",
      "author": "Andy Merrifield",
      "abstract": "Over the past few years, we’ve glimpsed a resurgence of people struggling to participate in urban life. Activism here is broadly reacting to the failings of representative government and to a numbing professionalisation of social and political life. Nowadays, it’s as if only professionals can prop up representative democracy. Only professional accountants, bankers and economists supposedly know best about affecting policy, about good government and urban governance, about knowing the economic facts of austerity. This paper explores the scope for amateurs to participate in forging another urban future, a radical urban future, one that affirms a new ideal of collective consumption, of goods people share in common and consume together. A radical urban future stretches our imagination into the realm of the normative, taking us out of the real and into the possible—or, as Henri Lefebvre loved to joke, into the possible within the impossible.",
      "keywords": "amateurs, professionals, representation, participatory democracy, austerity, urban studies",
      "isUOS": false
    },
    {
      "title": "르페브르의 변증법적 공간 이론과 공간정치― 「공간의 생산」을 중심으로",
      "author": "신승원",
      "abstract": "이 논문의 목적은 르페브르 공간생산론의 고유한 논의 지형을 제시하고, 그 실천적 함의를 밝히는 데 있다. 르페브르는『공간의 생산』에서 헤겔, 맑스의 생산 개념과 니체, 하이데거의 공간적 관점을 통합한다. 이종적인 이론적 자원을 종합하고 대안적 공간 기획의 기초를 제공하는 기초는 변증법이다. 르페브르의 변증법은 기본적으로 헤겔-맑스의 고전적인 해방기획과 연관되며, 공간의 우선성과 고유성을 강조하는 포스트모던적 주장을 포괄한다. 르페브르는 시․공간의 총체적 인식과 인간적 자연의 재창조를 주장하면서, 자본주의적 추상공간의 대안으로서 차이공간의 도래를 전망한다. 차이공간은 공간의 모순과 소유 논리에 저항하는 공간정치를 통해 실현될 수 있다. 르페브르에 따르면 저항적 가능성을 지원하는 힘의 원천이자, 아래로부터의 공간적 요구를 투쟁으로 결집하는 중심은 몸과 도시이다. 변증법적 가능성주의에 기반한 르페브르의 공간론은 그 현실성에 대한 물음들과 끊임없이 대결해 나갈 수밖에 없다. 그럼에도, 공간생산론은 오늘날 도시 비관주의와 도시 편향의 극복을 위한 의미있는 이론적 자원이다. 특히 몸과 도시사회의 관계 연구와 함께 다양한 해방기획과의 접합을 고민하는 것은 비판적 공간론에 남겨진 중요한 과제이다.",
      "keywords": "르페브르, 공간의 생산, 변증법, 공간정치, 도시사회",
      "isUOS": true
    },
    {
      "title": "욕망의 정치경제학과 현대 도시의 위기",
      "author": "박영균",
      "abstract": "현대 도시는 자본의 정치경제학을 따라 구축되었다. 자본의 정치경제학은 생산과 소비의 이원적 구조를 통해서 ‘생산-기계’이자 ‘소비-기계’로서의 인간을 생산하였 다. 도시공간의 사적 공간, 공적 공간, 사회적 공간의 분할은 이런 자본의 정치경제 학을 따라 이루어졌다. 오늘날 현대 도시는 생산-소비의 메커니즘을 자본 축적의 메커니즘으로 코드화하고 영토화하는 과정을 통해서 이루어졌다. 자본에 의한 생산의 포획은 임노동이라는 자본의 외부를 자본 내적 축적으로 코 드화하면서 노동자를 ‘생산-기계’로 생산한다. 반면 자본에 의한 소비의 포획은 노 동자를 ‘욕망의 정치경제학’으로 흡수하는 과정을 통해서 이루어졌다. 소비혁명은 세 번에 걸쳐 일어났다. 첫 번째는 기계제 대공업과 ‘대량생산-대량소비’ 시스템의 구축, 두 번째는 복지국가의 편입을 통해서 일어났으며 세 번째는 ‘다품종대량생 산’-유연생산전략 시스템을 통해서 일어났다. 그러나 이런 현대 도시의 스펙타클을 창조하는 흐름의 공간, 네트워크적 사회의 구성은 노동의 사회화, 사회적 협력의 가치를 사적으로 전유하는 과정이며 소비욕 망을 통해서 자연의 생명적 에너지를 ‘자본의 가치 증식 욕망’으로 바꾸어 놓은 것 이다. 이런 의미에서 현대 도시의 위기는 ‘화석에너지시스템’과 자본이 코드화-영토 화하는 ‘욕망의 정치경제학’에 의해 발생하고 있다. 따라서 이 논문은 바로 이런 위기를 극복하기 위해서는 ① 자본의 욕망이 포획하 는 소비욕망에 삶의 욕망을 대립시키고, ② 자본이 영토화하는 소비공간-생산공간 으로서의 도시를 자신의 생명을 생산하는 ‘자기가치화의 운동’, 즉 ‘자치적 생산-소 비 공동체의 건설’로 바꾸며, ③ 자연과 인간의 내적 교통-교감의 메커니즘을 회복 하는 패러다임의 전환이 필요하다고 주장한다.",
      "keywords": "현대 도시의 위기, 자본의 정치경제학, 욕망, 생산 공간, 소비 공간, 스펙타클, 노동의 사회화, 네트워크, 화석에너지시스템, 마르크스, 르페브르, 드보르, 카스텔, 하비.",
      "isUOS": true
    }
  ],
  "하비": [
    {
      "title": "‘유비쿼터스 도시’의 출현과 대안적 도시인문학의 과제",
      "author": "심광현",
      "abstract": "현재 세계는 미국발 금융 위기를 매개로 지구적으로 확산된 카오스적 요동 상태에 처해 있다. 카오스적 요동이 커질수록 ‘나비효과’ 역시 커질 수 있다. 미국을 위시한 선진자본주의 국가들은 NBIC/GNR 형태의 학문 간 융·복합을 통해 공간-기술-사람을 연결하는 ‘유비쿼터스 도시’ 네트워크 구축이라는 새로운 축적전략을 위기 극복을 위한 ‘나비 효과’로 채택하고 있는 듯하다. 한국도 2008년 9월 관련 법률 시행령이 공포되어 그간 전국적으로 추진해온 40여 개 신도시 계획을 유비쿼터스 도시계획으로 전환하는 작업을 시작하고 있다. 이 계획은 향후 학문 간, 기술 간, 기업 간 융·복합을 통한 전국적 공간 조정의 테스트베드가 될 것이다. 이 과정에서 나타날 공간-사물-사람 간의 미시적 관계와 전체 학문의 지형 변화 및 거시적인 문화적·정치경제적 지형 변화를 가늠하는 데 도움이 될 인식 지도 그리기가 시급한 형편이다. 이 글은 유비쿼터스 도시 계획의 내용과 성격 분석을 통해 새로운 축적전략인 ‘유비쿼터스 사회’에 내재한 대안적 이행의 길의 모색(데이비드 하비의 변증법적 유토피아주의)에서 중추 역할을 할 대안적 학문 간 융·복합 연구의 촉매제로서의 대안적 도시인문학 연구의 실마리를 끌어내려는 ‘가추법 적인’ 시론이다. 가추법은 현실의 특정 사례로부터 그 발생의 원인과 미래의 개연성을 가설과 추론을 통해 가늠하는 ‘과학적 발견’의 방법이다. 필자는 ‘유비쿼터스 도시’ 계획 과 그 기반이 될 학문 간 통섭 연구가 21세기 세계 자본주의 위기 극복의 분기점의 향방을 가늠할 새로운 역사적 프로젝트라고 본다. 이 프로젝트의 중요한 특징은 과거에는 허구에 불과했던 ‘SF 영화’의 시나리오를 컴퓨터 시뮬레이션한 결과를 토대로 가상공간과 물리공간을 실시간으로 결합하여 제3공간을 만들어내려는 ‘신문명’ 건설이라는 점에 있다. 최근 신도시 계획에서 스토리텔링이 중요해지는 이유가 여기에 있고, 대안적 도시연구에 문학과 영화와 여타의 모든 예술을 포함하는 통섭형 인문학 연구가 새롭게 결합할 수밖에 없는 이유도 여기에 있다. 도시공간의 새로운 생산과 재구성 과정의 대안적 설계를 제안하고 논의해 나갈 수 있도록 ‘도시인문학’ 자체의 융·복합화 과정을 통해 예술과 학문 전체의 대안적 통섭 네트워크의 프로토콜을 만드는 일이 시급하다.",
      "keywords": "유비쿼터스 도시, 제3공간, 가추법, 정동적 전회, 신체화된 공 간, 변증법적 유토피아주의, 비환원주의적 학문 간 통섭.",
      "isUOS": false
    },
    {
      "title": "시공간의 변증법과 도시의 산책자 －대안적 도시인문학의 철학적 기반구축을 위해－",
      "author": "심광현",
      "abstract": "GDP가 자본 축적의 화폐적 표시라면 도시화율은 그것의 공간적 표시이다. 현재 전 세계의 평균 도시화율은 50%를 상회하는 데 반해, 한국은90%를 넘고 있는데, 이 놀라운 고정자본의 집적 및 공간적 압축은 곧 인간신체에 내재된 ‘다감각적 공간’이 세계 평균의 두 배에 가깝게 이루어지고 있음을 뜻한다. 개체 생태학적 위기의 지표라고 할 자살률과 이혼율이 꾸준히증가하여 세계적으로 수위를 달리고 있다는 점도 이런 압축적 성장과 무관치 않다. 에드워드 홀에 의하면 다양한 신체 감각들과 맞물린 다감각적 공간(및 ‘치명적 거리’)들이 파괴될 경우 인간의 행동 및 사고 능력은 무의식적으로 심각한 손상을 받아 ‘트라우마’ 혹은 ‘외상 후 스트레스’로 신체에 각인되어 심각한 우울증과 자살을 유발할 수 있다고 한다. 제한된 공간에 최대한 많은 용적의 건축물을 지어 최대한의 수익을 올리려는 개발업자와 투기꾼의 입장에서는 복잡한 공간적 거리를 필요로 하는유동적인 인간의 신체적 공간을 1평방 미터 이내의 고정된 크기를 지닌 물체적 공간으로 인식하는 것이 유리할 것이다. 인간적 접촉이 사라지고 인간이 개미나 점처럼 지각되는 원거리 시점에서 바라보게 되면 인간을 공간적으로 포개고 이동시킬 수 있는 하나의 물체로 간주하는 것은 거리낌 없고,자연스러운 일이 될 것이다. 하지만 이런 시점은 ‘자연스러운’ 것이 아니라‘본원적 축적’에 의해 농촌에서 내몰린 대규모 인구의 도시 유입과 더불어 도시와 농촌, 지식노동과 육체노동 간의 시공간적 분리와 모순을 격화시켜 온자본주의적 세계화의 산물이다. 이 과정에 숨겨진 모순과 위험의 심화 과정을 데이비드 하비의 시공간의 변증법을 통해 규명하고, 레이몽 윌리엄즈와 발터 벤야민, 레이코프/존슨등의 분석에 의거하여 개인과 집단의 능동적으로 신체화된 공간적 역량의활성화에 기여할 비판적-대안적 도시인문학의 ‘철학적 기반’을 탐색하는 데이 글의 목적이 있다.",
      "keywords": "근접학, 공간적 실존, 절대적-상대적-관계적 시공간의 변증법, 신체화된 마음의 다중감각적 공간, 신체-정치, 공간적 투사",
      "isUOS": false
    },
    {
      "title": "미셸 푸코의 ‘헤테로토피아’ - 초기 공간 개념에 대한 비판적 검토",
      "author": "허경",
      "abstract": "본 논문은 미셸 푸코(Michel Foucault, 1926-1984)의 1966-1967년의 논문 「헤테로토피아」 및 「다른 공간들」에 나타난 푸코 초기 사유에 있어서의 공간ㆍ지리ㆍ문화에 관한 논의를 비판적으로 소개ㆍ검토하는 것에 목표를 둔다. 논문은 먼저 푸코의 논의를 정리하고, 이에 연관된 칸트의 공간관 및 하비의 비판을 다룬 후, 나의 전반적 검토의 순서로 구성된다. 이에 따른 결론은 다음과 같다. 첫째, 이질적 공간으로서의 ‘헤테로토피아’에 대한 강조에도 불구하고 푸코가 기존의 보편/특수 사이의 이분법을 근본적으로 탈피하지 못하고 있다는 하비의 비판은 푸코가 전통적인 칸트의 ‘보편/특수’ 사이의 대립을 푸코 자신의 새로운 개념인 복수적인 진리놀이들(jeux de vérité)의 형식 아래 새로이 전유하고 있음을 이해하지 못하는 하비의 잘못된 비판이다. 둘째, 그럼에도 불구하고 하비의 비판이 일정한 의의를 갖는 것은 하비의 논의가 푸코의 헤테로토피아에 관한 논의가 기본적으로 (아마도 부지불식간에 혹은 의식적인 형태로) 칸트의 공간관에 입각해 있다는 사실에 있다. 푸코는 자신의 논리대로라면 응당 그랬어야 할 지리적 곧 문화적 축에 대해 침묵한다. 푸코는 자신이 헤겔적 역사철학의 관념에 대해 그랬던 것처럼, 공간ㆍ지리ㆍ문화에 대한 칸트적인 ‘절대 시공간’의 관념에 대해서도 복수적인 진리놀이들을 도입했어야 했다. 푸코는 자신이 시간과 역사에 대해 행했던 계보학적 분석을 공간과 지리 그리고 문화에 대해서는, 단지 그 이론적 가능성만을 원칙적으로 남겨둔 채, 동일한 작업을 수행하지 않는다. 단적으로 말해, 푸코의 사유 안에는 진정한 의미의 공간과 지리에 대한 ‘계보학적’ 분석이 부재한다. 나의 논지에 따르면, 그 이유는 푸코가 공간 및 지리와 문화에 따라 합리성이 달리 구성될 수 있다는 관점은 한 마디로 반(反)-칸트적인 관념을 수용할 수 없었기 때문이다. 보편성, 합리성 혹은 근대성 등의 ‘보편적’ 명칭 아래 가려진 공간과 지리 그리고 문화의 문제는 이처럼 근본적으로 정치적인 문제이다.",
      "keywords": "헤테로토피아, 공간, 지리학, 문화, 칸트, 하비",
      "isUOS": false
    },
    {
      "title": "21세기 도시연구의 새로운 방향 - 탈신자유주의적 도시의 탐색",
      "author": "이성백",
      "abstract": "이 논문은 21세기 도시연구의 새로운 방향을 모색하는 것을 목적으로 한다. 이를 위해 1970년대 이후 도시연구의 대표적인 이론적 흐름들인 데이비드 하비의 정치경제학적 도시론, 사스키야 사센의 지구적 도시론, 마누엘 카스텔의 정보도시론, 에드워드 소자의 포스트모던 도시론을 고찰한다. 그리고 이 도시론들의 비교로부터 80년대 이후 현대도시의 변화를 설명하는 더 포괄적이고 일반적인 도시 개념으로 신자유주의적 도시를 제시한다. 위의 여러 도시론들은 각각 독자적인 개념을 내세우고 있지만, 이 도시론들이 자신의 이론의 주요 특징으로 제시하고 있는 것을 보면 매우 흥미로운 점을 발견하게 되는데, 몇 가지 동일한 특징을 각각 자신의 특징으로 제시하고 있다는 것이다. ‘이중도시’, 즉 도시에서의 양극화 현상이 각 이론들에 의해 자신의 이론의 주요 특징으로 제시되고 있다. 70년대 이후 도시의 변화는 자본주의의 경제적 축적체제인 신자유주의의 차원에서 가장 포괄적이고 일반적으로 개념화되어야 한다. 지구적 도시는 신자유주의적 축적체제의 공간적 확장의 측면이고, 정보도시는 그것의 기술적 혁신의 측면에 해당한다. 21세기 도시 연구는 탈신자유주의의 대안을 모색하는 전망 속에서 신자유주의 도시 비판으로 방향을 잡아야 할 것이다. 신자유주의가 가져온 ‘도시의 비인간화’에 맞서 모든 인간을 위한 도시, 코스모폴리스의 새로운 전망을 모색해야 한다.",
      "keywords": "신자유주의적 도시, 도시의 정치경제학, 지구적 도시, 정보도시, 포스트모던 도시",
      "isUOS": true
    },
    {
      "title": "<서평>『모더니티의 수도 파리(Paris, capital of modernity)』",
      "author": "김동훈",
      "abstract": "이 글의 목적은 영국 출신의 지리학자 데이비드 하비의 책 􋺷모더니티의 수도파리 (Paris, Capital of Modernity)􋺸의 내용을 분석하고 그 속에 담긴 인문학적 상상력의 깊이를 가늠해보는 데 있다. 이를 위해 평자는 우선 하비가 보들레르의 힘을 빌려 정의하는 근대성 개념의 특징을 분석하였다. 하비에 따르면 근대는 그 이전에 배태되어 있던 가능성의 발현이면서 동시에 창조적 파괴를 통한 그 이전의 역사와의 단절이라는 이중적 성격을 지닌다. 그런데 이를 통해 근대성을 형식적으로 정의할 수는 있겠지만 내용에 대해서는 아무것도 제시하지 않았기에 이러한 정의는 근대성을 근원적으로 설명하기에는미흡하다는 사실이 밝혀졌다. 하지만 다른 한편 하비는 구체적 상황들을 분석하고 설명하기 위해 끊임없이 보들레르, 플로베르, 발자크, 도미에 등의 시나소설, 삽화의 도움을 구하는데, 이러한 인문학적 상상력은 통계숫자와 공식적인 문건에만 매달리는 연구로는 절대로 접할 수 없는 사태의 이면을 통찰할수 있는 가능성을 열어준다. 그의 글이 매우 흥미롭게 읽히는 이유가 여기에있다. 이러한 사실들은 그가 오늘날 역사지리학자로서, 마르크스주의 이론가로서 누리고 있는 명성이 근거 없는 것이 아님을 여실히 보여준다. 하비가 이 책에서 주로 고찰하고 있는 것은 1848년 혁명과 그 이후 등장한제2제정 하에서 파리가 겪은 엄청난 변화, 그리고 그 결과로 인해 발생한1871년의 파리 코뮌이며, 그는 특히 제2제정 파리지사였던 오스망이 입안하고 실천에 옮겼던 엄청난 도시재편계획을 집중적으로 다루고 있다. 이로 인해파리는 프랑스 국내뿐만 아니라 전 유럽의 자본주의 발전에 있어서 모범적이고 선도적인 역할을 하는 근대성의 수도라는 의미를 지니게 된다. 이런 의미에서 􋺷파리􋺸는 오늘날 도시 안에서 무슨 일이 일어나고 있는가를 파악하려는이들에게나 창조적 파괴를 통하여 도시의 새로운 변화를 추구하는 이들 모두에게 필독서로 추천되기에 부족함이 없다고 하겠다.",
      "keywords": "근대성, 1848년 혁명, 제2제정, 파리 코뮌, 오스망, 발자크, 벤야민, 보들레르, 플로베르, 도미에",
      "isUOS": false
    },
    {
      "title": "Global-polis and Time Space of Hope - Transformation of Global City and Spaces of Hope",
      "author": "곽노완",
      "abstract": "Globalization and the revolution in information have brought aboutpostmodern notions of space such as cyber space and overlappingspace. In her discussion of the dual systems of global cities, SaskiaSassen argues that overlapping space becomes predominant in globalcities, in which the global space is overlapping to the State and thelocal. Examining the specific ways of overlapping space, Sassenattempts to extend the space for political practices to the global space. However, for the effective construction of that kind of space, Sassen'snotion of global city seems to need to be revised. In Sassen'sframework, heterogeneous and different dimensions of communities inglobal cities are understudied and instead often easily reduced to economic dimension. Here David Harvey's recent discussion of spaces of hope seems to behelpful to rethink of what is understudied in Sassen's work. Proposingopen spatiotemporal utopianism, Harvey attempts to envision alternativeutopian spaces as a combination of dynamic socialisticcompetition-space with security-space which enables every citizen toreceive partially equal benefits from community. But Havery'sspatiotemporal utopianism moves between Keyensianism and utterutopianism that is imagined but not realizable. In a critical dialogue with Sassen's discussions of global cities andHarvey's spaces of hope, I will explore the ways in which we canenvision and open up the positive possibility of communities in globalcities. In doing so, I'd like to propose 'global-polis' ('polis' as acommunity of public encounter and solidarity like in the traditionalGreek sense) as an alternative term for global city. By 'global-polis' asa humanistic community of contradictory (neoliberal vs. alter-)globalizing age, I mean to open up the possibilities of realizable openutopian community. As Harvey formulated, combining dynamicsocialistic competition-space with security-space for such open utopianspaces, I will discuss how such spaces can be concreted with myprinciple of 'socialistic competition to enhance the value of each otherin security'.",
      "keywords": "Global city, Space of Hope, Sassen, Harvey, Global-polis.",
      "isUOS": true
    },
    {
      "title": "유비쿼터스 시대의 도시공간과 미디어공간의 문화ㆍ정치적 상호작용",
      "author": "심광현",
      "abstract": "도시 공간은 언제나 사람과 사물의 집적의 중심지였을 뿐만 아니라 교통의 중심지로서정보기술의 발전에 의해 크게 영향을 받아 왔다. 20세기 초 전화 기술은 공간분업을통해 도시공간의 재배치를 야기했고, 20세기 말 인터넷 기술 역시 도시공간의 성격을크게 변화시켰다. 그러나 최근 상용화되기 시작한 유비쿼터스 컴퓨팅 기술은 그간 분리되어 있던 물리공간과 가상공간을 실시간으로 연결하여 제3공간이라는 새로운 공간(“증강현실”)을 출현시킴으로써 또다시 대대적인 사회변동을 야기하고 있다. 2008년봄에 ‘Wi-bro’ 기술이 세계 최초로 수도권에서 상용화되면서 가능해진 물리공간과 가상공간의 실시간 연결은 2008년 여름 100일간 지속된 촛불시위에서 새로운 놀이형식의 문화ㆍ정치적 참여를 촉진했다. 막 시작된 이런 변화의 폭과 성격을 예측하기 위해서는 두 가지 분석을 연결하는 작업이 선행되어야 한다. 하나는 90년대 정보화가 신자유주의 세계화와 맞물려 도시와 사회 전반에 미친 변화의 내용과 의미에 대한 분석이다. 다른 하나는 2000년대에 들어첨단화되고 있는 디지털 미디어의 문화적 형식과 논리에 대한 분석이다. 그간 이 두가지 분석은 물리공간과 가상공간이 분리되어 있었듯이 서로 분리되어 진행되어 왔다. 그러나 유비쿼터스 컴퓨팅 기술이 현실적으로 두 공간의 연결을 촉진하고 있는 새로운현실을 따라잡기 위해서라도 도시연구와 미디어문화연구 간의 접속과 협력이 시급하다. 이 글에서는 카스텔스의 네트워크 사회에 관한 연구와 데이비드 하비의 공간 연구, 디지털 미디어의 새로운 언어와 논리에 관한 레프 마노비치의 연구, 그리고 촛불시위 사례 분석 등을 연결하여 제3공간이라는 새로운 지형의 문화ㆍ정치적 함의를 살펴보고자한다.",
      "keywords": "유비쿼터스 컴퓨팅, 제3공간, 네트워크 사회, 세계화의 거시공간과 신체의 미시공간, 네비게이션, 문화ㆍ정치적 참여",
      "isUOS": false
    },
    {
      "title": "욕망의 정치경제학과 현대 도시의 위기",
      "author": "박영균",
      "abstract": "현대 도시는 자본의 정치경제학을 따라 구축되었다. 자본의 정치경제학은 생산과 소비의 이원적 구조를 통해서 ‘생산-기계’이자 ‘소비-기계’로서의 인간을 생산하였 다. 도시공간의 사적 공간, 공적 공간, 사회적 공간의 분할은 이런 자본의 정치경제 학을 따라 이루어졌다. 오늘날 현대 도시는 생산-소비의 메커니즘을 자본 축적의 메커니즘으로 코드화하고 영토화하는 과정을 통해서 이루어졌다. 자본에 의한 생산의 포획은 임노동이라는 자본의 외부를 자본 내적 축적으로 코 드화하면서 노동자를 ‘생산-기계’로 생산한다. 반면 자본에 의한 소비의 포획은 노 동자를 ‘욕망의 정치경제학’으로 흡수하는 과정을 통해서 이루어졌다. 소비혁명은 세 번에 걸쳐 일어났다. 첫 번째는 기계제 대공업과 ‘대량생산-대량소비’ 시스템의 구축, 두 번째는 복지국가의 편입을 통해서 일어났으며 세 번째는 ‘다품종대량생 산’-유연생산전략 시스템을 통해서 일어났다. 그러나 이런 현대 도시의 스펙타클을 창조하는 흐름의 공간, 네트워크적 사회의 구성은 노동의 사회화, 사회적 협력의 가치를 사적으로 전유하는 과정이며 소비욕 망을 통해서 자연의 생명적 에너지를 ‘자본의 가치 증식 욕망’으로 바꾸어 놓은 것 이다. 이런 의미에서 현대 도시의 위기는 ‘화석에너지시스템’과 자본이 코드화-영토 화하는 ‘욕망의 정치경제학’에 의해 발생하고 있다. 따라서 이 논문은 바로 이런 위기를 극복하기 위해서는 ① 자본의 욕망이 포획하 는 소비욕망에 삶의 욕망을 대립시키고, ② 자본이 영토화하는 소비공간-생산공간 으로서의 도시를 자신의 생명을 생산하는 ‘자기가치화의 운동’, 즉 ‘자치적 생산-소 비 공동체의 건설’로 바꾸며, ③ 자연과 인간의 내적 교통-교감의 메커니즘을 회복 하는 패러다임의 전환이 필요하다고 주장한다.",
      "keywords": "현대 도시의 위기, 자본의 정치경제학, 욕망, 생산 공간, 소비 공간, 스펙타클, 노동의 사회화, 네트워크, 화석에너지시스템, 마르크스, 르페브르, 드보르, 카스텔, 하비.",
      "isUOS": true
    },
    {
      "title": "공유의 시대, 열리고 겹치는 공유도시의 비전",
      "author": "곽노완",
      "abstract": "리프킨의 말대로 자율적인 공유지와 공유경제가 확대되면서 사유경제모델을 뛰어넘어 새롭게 지속가능한 공유경제모델의 시대가 열리고 있다. 하딘의 ‘공유지의비극’론을 비판한 로즈의 ‘공유지의 희극’론과 오스트롬의 공유지에 대한 역사적고찰도 국가/시장의 이분법의 틀을 깨는 공유지와 공유경제의 우월성과 지속가능성을 보여주고 있다. 그러나 이들의 공유지론은 1만 5000명 이하의 성원을 가진 공동체에서만 입증되었다. 그리고 좀 더 큰 규모에 대해서 오스트롬은 각각의 공유지를갖춘 다양한 공동체들 간에 ‘다중심의 질서’를 제시한다. 하지만 하비가 비판했듯이이러한 ‘다중심의 질서’는 파편화된 지자체의 분할이 양극화와 불평등을 확대한다는 것을 보여준 ‘티뷰’ 가설의 함정에 빠질 가능성이 크다. 이러한 ‘티뷰’ 가설의함정을 피하기 위해서는 공유와 공동체를 소규모 지역공동체에 한정하지 않고 지역/도시/국가/지구라는 여러 공간차원에서 겹치는 것으로 볼 필요가 있다. 이에 기초해서 공유도시는 지역이나 국가 등과 겹치면서도 도시 전체를 아우르는 도시공동체로서 다차원적인 공유지를 갖는 장소로서 재정식화될 수 있다. 그리고 이렇게 재정식화됨으로써 공유도시는 도시 내 소규모 마을공동체적인 공유지의 틀을 벗어나서지역 및 국가와 겹치면서도 도시 전체를 아우르며 공유지의 복원과 확대라는 입체적인 전망을 얻을 수 있다. 이러한 전망 속에서 서울의 공유도시 어젠다도 새롭게진화할 수 있는 계기를 얻게 될 것이다.",
      "keywords": "공유지, 공동체, 공유도시, 리프킨, 하비, 서울.",
      "isUOS": true
    },
    {
      "title": "19세기 파리 역사문화공간 생산의 과정과 의미",
      "author": "홍용진",
      "abstract": "데이비드 하비에 따르면 19세기 파리는 파괴와 창조라는 특징을 지니는 근대성의 도시였다. 하지만 이 시기 파리는 동시에 과거의 역사기념물들을 보존하고 복원하려는 역사화의 과정을 보여주기도 한다. 이에 따라 18세기 말까지 부정적인 대상으로 인식되어 오던 ‘옛 파리’는 19세기 초에 들어와 낭만주의의 물결과 더불어 미학적으로 재발견된다. 이러한 문화사조는 새로운 국민정체성을 확립하고자 하는 7월 왕정의 정책으로 이어졌다. ‘시민왕’ 루이-필리프와 내무부장관 기조는 통합적인 ‘국민’의 이름으로 7월 왕정을 과거 왕조와 프랑스혁명 모두의 종합적 계승자로 내세우고자 했고 이는 곧 국민 공통의 기억의 모범인 역사기념물들의 보존과 복원정책으로 이어졌다. 비올레르뒤크를 중심으로 하는 역사기념물 보존 및 복원 사업은 1848혁명과 루이 보나파르트의 쿠데타, 제2제정의 등장이라는 파란만장한 정치적 격변 속에서도 꾸준히 이어졌다. 물론 이러한 작업들은 다양한 현실적⋅행정적 문제들과, 특히 제2제정 당시에 시행된 오스만 남작의 도시계획과 충돌할 수밖에 없었다. 제3공화정이 수립되고 민주주의가 확립되어 가면서 비올레르뒤크가 이끄는 역사기념물 보존 및 복원작업은 새로운 저항에 부딪히게 되었다. 이 시기의 소장 역사학자들과 고고학자들은 중세와 국민적 모범을 중심으로 하는 기존의 개념과 정책을 비판하면서 고대에서 근대까지 시기를 확장하고 민중의 일상생활과 관련된 유적들을 포함해야 한다는 주장하였다. 이렇게 해서 역사기념물 정책은 국민적 모범 확립에서 시민적 역사교육으로 변화해 갔다. 19세기 파리가 보여준 이상의 과정은 두 가지 의미를 던져준다. 한편으로 그것은 근대화 반대하는 역사화가 바로 근대화의 산물이라는 이중적 관계를, 다른 한편으로는 역사기념물 정책을 둘러싼 국민 정체성 확립의 변화를 잘 보여준다.",
      "keywords": "파리, 근대성, 역사기념물, 외젠 비올레르뒤크, 역사문화공간의 생산, 역사문화도시",
      "isUOS": true
    }
  ]
};

window.showTheoristPapers = function(theoristName) {
  const modal = document.getElementById('theorist-paper-modal');
  const listDom = document.getElementById('tp-modal-list');
  if (!modal || !listDom) return;
  
  document.getElementById('tp-modal-theorist').innerText = theoristName;
  
  const papers = DUMMY_THEORIST_PAPERS[theoristName] || [];
  
  if (papers.length === 0) {
    listDom.innerHTML = `<div style="text-align:center; padding: 2rem; color: #64748b;">관련 논문 데이터가 없습니다.</div>`;
  } else {
    let html = '';
    papers.forEach((p, idx) => {
      const borderColor = p.isUOS ? '#3b82f6' : '#ef4444';
      const badgeText = p.isUOS ? '서울시립대 인용' : '타 기관 인용';
      const badgeBg = p.isUOS ? '#3b82f6' : '#ef4444';
      
      html += `
        <div onclick="window.showTheoristDetail('${theoristName}', ${idx})" style="padding: 1rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; cursor: pointer; transition: all 0.2s; border-left: 4px solid ${borderColor};" onmouseover="this.style.background='#f1f5f9'; this.style.transform='translateY(-2px)';" onmouseout="this.style.background='#f8fafc'; this.style.transform='none';">
          <div style="font-weight: bold; color: #1e293b; font-size: 1.05rem; margin-bottom: 0.4rem;">${p.title}</div>
          <div style="font-size: 0.9rem; color: #64748b; display: flex; align-items: center;">
            <span>저자: <span style="color:${borderColor}; font-weight:bold;">${p.author}</span></span>
            <span style="font-size: 0.7rem; background: ${badgeBg}; color: white; padding: 2px 6px; border-radius: 10px; margin-left: 8px; font-weight:bold; letter-spacing: -0.5px;">${badgeText}</span>
          </div>
        </div>
      `;
    });
    listDom.innerHTML = html;
  }
  
  modal.style.display = 'flex';
};

window.showTheoristDetail = function(theoristName, idx) {
  const modal = document.getElementById('theorist-detail-modal');
  if (!modal) return;
  
  const paper = DUMMY_THEORIST_PAPERS[theoristName][idx];
  document.getElementById('td-modal-title').innerText = paper.title;
  document.getElementById('td-modal-author').innerHTML = `<span style="color: #2563eb; font-weight: bold;">${paper.author}</span>`;
  document.getElementById('td-modal-abstract').innerText = paper.abstract;
  
  const keywords = paper.keywords.split(',').map(k => `<span style="display:inline-block; padding:0.3rem 0.6rem; background:#f1f5f9; border:1px solid #cbd5e1; border-radius:4px; margin-right:0.4rem; margin-bottom:0.4rem; font-size:0.85rem; font-weight:bold; color:#0f172a;">#${k.trim()}</span>`).join('');
  document.getElementById('td-modal-keyword').innerHTML = keywords;
  
  modal.style.display = 'flex';
};


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

window.showTopCitingPapersModal = function(paperName, papersList, topKey) {
  const modal = document.getElementById('top10-citing-papers-modal');
  const listDom = document.getElementById('top10-citing-modal-list');
  if (!modal || !listDom) return;

  document.getElementById('top10-citing-modal-title').innerText = paperName;

  // Treemap rendering
  const treeDom = document.getElementById('top10-citing-modal-treemap');
  if (treeDom) {
    if (topKey && typeof TREEMAP_DATA !== 'undefined' && TREEMAP_DATA[topKey]) {
      treeDom.style.display = 'block';
      let treeChart = echarts.getInstanceByDom(treeDom);
      if (!treeChart) treeChart = echarts.init(treeDom);
      
      treeChart.setOption({
        tooltip: { formatter: '{b}: {c}건' },
        color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'],
        series: [{
          name: '분야별 비중',
          type: 'treemap',
          data: TREEMAP_DATA[topKey],
          roam: false,
          nodeClick: false,
          breadcrumb: { show: false },
          label: { show: true, formatter: '{b}\n({c}건)', fontSize: 13, fontWeight: 'bold' },
          itemStyle: { borderColor: '#fff', borderWidth: 2 }
        }]
      });
      setTimeout(() => treeChart.resize(), 100);
    } else {
      treeDom.style.display = 'none';
    }
  }

  // (List removed per user request)
  listDom.innerHTML = '';
  modal.style.display = 'flex';
};

window.showTopCitingDetailModal = function(paper) {
  const modal = document.getElementById('top10-citing-detail-modal');
  if (!modal) return;

  document.getElementById('top10-citing-detail-title').innerText = paper.title;
  document.getElementById('top10-citing-detail-author').innerHTML = `<span style="color: #ef4444; font-weight: bold;">${paper.author}</span>`;
  document.getElementById('top10-citing-detail-abstract').innerText = paper.abstract || '초록 정보가 없습니다.';

  let keywords = paper.keywords || '키워드 정보가 없습니다.';
  if (keywords !== '키워드 정보가 없습니다.' && keywords.trim() !== '') {
    keywords = keywords.split(',').map(k => `<span style="display:inline-block; padding:0.2rem 0.6rem; background:#ecfdf5; color:#10b981; border:1px solid #a7f3d0; border-radius:4px; margin-right:0.4rem; margin-bottom:0.4rem; font-size:0.85rem; font-weight:bold;">#${k.trim()}</span>`).join('');
  } else if(keywords.trim() === '') {
    keywords = '<span style="color:#64748b;">키워드 정보가 없습니다.</span>';
  }
  document.getElementById('top10-citing-detail-keyword').innerHTML = keywords;

  modal.style.display = 'flex';
};

// Matrix Detail Modal Logic
function showMatrixDetailModal(type) {
  if (typeof MATRIX_DETAIL_DATA === 'undefined') return;
  
  const modal = document.getElementById('matrix-detail-modal');
  const title = document.getElementById('matrix-modal-title');
  const listContainer = document.getElementById('matrix-cross-list');
  const data = MATRIX_DETAIL_DATA[type];
  if (!data) return;

  let titleText = '';
  if (type === 'uos_uos') titleText = '인용 상세 분석 (시립대 내부 인용 64건)';
  else if (type === 'non_non') titleText = '인용 상세 분석 (타기관 내부 인용 55건)';
  else if (type === 'uos_non') titleText = '인용 상세 분석 (시립대 → 타기관 인용 12건)';
  else if (type === 'non_uos') titleText = '인용 상세 분석 (타기관 → 시립대 인용 21건)';
  title.innerText = titleText;
  
  // Render Chart
  const chartDom = document.getElementById('matrix-donut-chart');
  
  if (type === 'uos_uos' || type === 'non_non') {
    chartDom.style.display = 'block';
    let donutChart = echarts.getInstanceByDom(chartDom);
    if (!donutChart) {
      donutChart = echarts.init(chartDom);
    }
    
    const selfLabel = data.self_label || '자기 인용';
    const crossLabel = data.cross_label || '타인 인용(순수 교차)';
    
    donutChart.setOption({
      tooltip: { trigger: 'item', formatter: '{b}: {c}건 ({d}%)' },
      legend: { top: 'bottom' },
      color: ['#ef4444', '#3b82f6'],
      series: [
        {
          name: '인용 유형',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: { show: true, formatter: '{b}: {c}건', fontSize: 14, fontWeight: 'bold' },
          data: [
            { value: data.self_count, name: selfLabel },
            { value: data.cross_count, name: crossLabel }
          ]
        }
      ]
    });
  } else {
    chartDom.style.display = 'none';
  }

  // Update List Header
  const listHeader = listContainer.previousElementSibling;
  if (listHeader) {
    if (type === 'uos_uos' || type === 'non_non') {
      listHeader.innerText = '순수 타인 인용 사례 목록';
    } else {
      listHeader.innerText = '상세 인용 사례 목록';
    }
  }

  // Render List
  listContainer.innerHTML = '';
  data.cross_list.forEach(item => {
    const li = document.createElement('li');
    li.className = 'matrix-cross-item';
    li.innerHTML = `
      <div style="display:flex; justify-content: space-between; align-items:flex-start; margin-bottom: 8px;">
        <div>
          <span style="font-size: 11px; background:#e2e8f0; color:#475569; padding:2px 6px; border-radius:4px; font-weight:bold;">${item.citing_field}</span>
          <span style="font-weight:bold; color:#1e293b; margin-left: 6px;">${item.citing_author}</span>
        </div>
        <div style="color: #cbd5e1;">➔</div>
        <div style="text-align:right;">
          <span style="font-weight:bold; color:#1e293b; margin-right: 6px;">${item.cited_author}</span>
          <span style="font-size: 11px; background:#e2e8f0; color:#475569; padding:2px 6px; border-radius:4px; font-weight:bold;">${item.cited_field}</span>
        </div>
      </div>
      <div style="display:flex; justify-content: space-between; gap: 10px; font-size: 13px; color: #475569;">
        <div style="flex:1; padding-right:10px; border-right: 1px dashed #cbd5e1;">"${item.citing_title}"</div>
        <div style="flex:1; padding-left:10px;">"${item.cited_title}"</div>
      </div>
    `;
    listContainer.appendChild(li);
  });

  modal.style.display = 'flex';
  setTimeout(() => {
    donutChart.resize();
  }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('matrix-detail-modal');
  const closeBtn = document.getElementById('matrix-modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }
});