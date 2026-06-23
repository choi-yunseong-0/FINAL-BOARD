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
      color: ['#1e3a8a', '#3b82f6', '#93c5fd', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],
      series: LINE_DATA.series.map(s => {
        let lineType = 'solid';
        let width = 4;
        let symbolSize = 10;

        // 겹치는 선들을 시각적으로 분리하기 위한 트릭 (두께와 선 모양 다르게)
        if (s.name === '푸코') { width = 8; }
        if (s.name === '하비') { lineType = 'dashed'; width = 5; symbolSize = 8; }
        if (s.name === '라깡') { lineType = 'dotted'; width = 2; symbolSize = 6; }
        
        if (s.name === '라투르') { width = 6; }
        if (s.name === '해러웨이') { lineType = 'dashed'; width = 3; symbolSize = 6; }

        return {
          name: s.name,
          type: 'line',
          data: s.data,
          smooth: false,
          symbol: 'circle',
          symbolSize: symbolSize,
          lineStyle: { width: width, type: lineType }
        };
      })
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
        { name: '서울시립대 인용', type: 'bar', stack: 'total', label: { show: true, position: 'inside' }, itemStyle: { borderRadius: [4, 0, 0, 4] }, data: [3, 4, 7, 4, 0, 3, 3, 3].reverse() },
        { name: '타 기관 인용', type: 'bar', stack: 'total', label: { show: true, position: 'inside' }, itemStyle: { borderRadius: [0, 4, 4, 0] }, data: [1, 0, 1, 12, 4, 1, 1, 1].reverse() }
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
      "title": "발터 벤야민과 도시경험-벤야민의 도시인문학 방법론에 대한 고찰",
      "author": "홍준기",
      "abstract": "이 논문은 벤야민의 도시인문학 방법론을 해명하기 위해 정신분석적 관점을 취한다. 우선 벤야민 이론에 대한 탈정신분석적 해석의 역사 및 현황을 살펴보고 이의 문제점을 지적한 후 벤야민이 말하는 도시경험의 의미를 설명한다. 벤야민에 따르면 대도시에서의 현대인의 경험은 충격과 상실의 경험이다. 이 논문은 특히 보들레르로부터 차용한 상실의 개념을 벤야민 특유의 개념인 아우라 상실과 연결시켜 논의하고 아우라 상실의 경험이 새로운 아우라 경험을 위한 전제조건임을 밝힌다. 또한 현대 도시인이 겪는 충격 경험은 사람들을 방어적으로 만들어 그들을 무미건조하고 기계적인 행위와 체험의 차원으로 축소시키지만, 동시에 특히 영화와 같은 기술복제시대의 예술작품을 통해 상실한 ‘진정한 경험’을 찾을 수 있다는 사실을 밝힘으로써 벤야민 이론에 대한 새로운 해석을 모색한다. 끝으로 벤야민이 말하는 ‘촉각적 경험’과 시선의 상관관계를 라깡의 거울단계론과 불안이론과 관련시켜 간략히 논의하면서 논문을 결론짓는다.",
      "keywords": "벤야민, 정신분석, 라깡, 아우라, 도시, 도시경험, 시선, 촉각적 경험, 상실, 충격",
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
      "title": "국내 카페 파사드(façade)에서 읽어 낸 문화적 의미",
      "author": "황성경;김진아",
      "abstract": "오늘날 한국인들에게 커피는 일상생활에서 빼놓을 수 없는 중요한 존재가 되었으며, 커피에 대한 관심의 증가와 함께 카페 공간 역시 보다 다양한 문화적 요소를 접목시켜 하나의 독특한 ‘카페문화’를 형성하고 있다. 특히 최근 유행처럼 확산되고 있는 커피전문점들의 개방형 파사드는 거리 전체를 투명한 유리벽 또는 이 마저도 제거된 파사드들의 연속으로 구성함으로써 새로운 도시 풍경을 만들어내며 소비자를 유혹하고 있다. 본 연구는 도시 공간을 산책하며 비평적 시선을 투사한 벤야민의 방식을 응용하여 오늘날 한국 도시의 주요 경관을 구성하는 개방형 카페 파사드의 공간적 특성을 고찰하고 그 사회문화적 의미를 도출한다. 1980년대까지도 주를 이루었던 폐쇄형 카페 파사드와는 대조적으로, 전이형과 개방형 파사드는 밝고 세련된 도시적 분위기를 창출하며 커피전문점의 위상을 강화하게 된다. 특히 노천카페로 대표되는 유럽의 전이형 파사드와는 달리, 국내에서는 노천카페적 성격을 띠면서도 ‘폴딩도어’ 즉 개폐형 유리문을 사용하는 개방형 파사드가 급속도로 확산되어왔다. 본고는 폴딩도어식 파사드가 철골과 유리를 사용한 서구 아케이드의 진화된 모습과 문화적 특징을 내보이면서 동시에 한국 대청마루 창호의 기능과도 혼성적으로 조우한다는 점에 주목하며, 가변적으로 개폐되는 개방형 파사드가 소비자들의 시선과 거리 경험을 어떻게 변모시키는지 고찰한다. 그리고 보드리야르가 후기자본주의 사회의 특성에 대해 지적한대로, 카페 공간에서 작용하고 있는 보다 정교한 육체의 기호화·계층화 과정에 대해 논의한다. 그러나 이러한 비판적 기능에도 불구하고, 개방형 파사드는 변화와 이행이 일어나는 역동적인 ‘문지방’ 또는 ‘리미널 스페이스’로 기능할 수 있으며 복합적인 경험과 이벤트를 창출함으로써 새로운 의식적 전환을 불러일으킬 수 있는 가능성의 공간이라는 점에 주목한다.",
      "keywords": "카페, 파사드, 대청마루, 문지방, 보드리야르, 벤야민",
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
      "title": "발터 벤야민의 대도시 고고학- 베를린 에세이를 중심으로 -",
      "author": "남덕현",
      "abstract": "현대예술과 철학에서의 현대성은, 산업혁명의 향으로 형성된 대도시를 배 경으로 탄생했다. 다시 말해 현대성은 대도시의 새로운 현상과 문제점들에 대한 현대 예술의 예술적 형상화와 현대 철학의 지적인 성찰의 주제던 것이다. 이런 의미에서 현대예술과 현대철학은 대도시의 예술과 철학이라고 할 수 있다. 대도시에 대한 인문학적 연구를 우리는 ‘대도시 인문학’이라고 부를 수 있을 것이다. 이러한 새로운 학문 분야에서 발터 벤야민은 특별한 위치를 차지한다. 그는 대도시 베를린 출신으로, 독일에서 나치가 집권한 후에는 ‘19세기의 수도 파리’로 망명하여, 당시 최첨단의 예술과 철학에 대한 비평 작업을 수행했다. 이 를 통해 그가 제시한 역사철학, 언어철학, 매체론, 예술 비평에서 ‘현대적인’ 것 이 절대적인 비중을 차지하고 있으며, 그 중심점은 언제나 대도시와 대도시에 사 는 사람들의 삶이었다. 그는 대도시인들의 의식의 저변에 깔려 있는 무의식적 요 소들뿐 만이 아니라 현대 대도시의 역사철학적 토대와 기원에 대하여 많은 성찰 을 하고, 그에 관한 글들을 남겼다. 우리는 그의 글쓰기가 갖는 이런 방법론적인 특성을 ‘대도시 고고학’이라고 부를 수 있을 것이다. 이러한 관점에서 본 연구에서는 그의 ‘대도시 고고학’의 기본개념들을 담고 있는 베를린 에세이들을 분석한다. 이 에세이에서 그는 베를린을 연구하기 위한 자료로 사회학적이거나 역사학의 자료를 사용하지 않았다. 그 대신에 그는 ‘시민 계급의 한 아이에게 침전된 대도시 베를린의 이미지’를 중심적인 연구 자료로 사용한다. 베를린 에세이에 등장하는 바로 이런 중심 개념들을 토대로 그는 현대 대도시에 대한 사회학적, 심리학적, 철학적 연구들을 펼쳐나갔으며, 이는 다시 그의 역사철학으로 수렴된다. 대도시 경험에 대한 ‘무의지적 기억’ 속에서는 벤야민이 찾아보고자 했던 것 은, ‘원래의 역사’의 편린들이었다. 그에 따르건대 현대 대도시인들의 망각한 것 속에는 ‘이전 세계’에 대한 한 집단의 경험이 내재하며, 이는 세대를 이어 다음 세대에게도 내장된다. 이 고고학적 탐사의 글쓰기는 망각된 것을 되살리고자 하 는 ‘기억하기(Eingedenken)’의 작업이기도 하다. 이 개념을 매개로 대도시에 대한 벤야민의 성찰은 신학의 차원으로 넘어가는 것처럼 보인다. 유태카발라의 메시아주의에서 유래한 이 개념은 인간이 그 운명 속에 각인된 구원의 약속을 망각 하고 있다는 점을 가리킨다. 이 구원의 약속은 우리의 의식과 역사 현실, 그 3차 원의 세계에서는 위험의 순간에 섬광처럼 스치는, 파편적인 이미지, 일그러진 ‘꼽추난쟁이’의 형상으로 우리 자신에게 모습을 드러낸다. 이를 세속적으로 해석해보자면, 역사유물론 철학에서의 혁명 또한 그 혁명에 대한 믿음을 ‘지금 여기’에서 받아들일 때, 그때가 바로 혁명의 순간이 되는 셈 이다. 시간의 한 점에 고정되어있던 ‘이미지’가 나의 실천을 요구하면서 시간의 흐름을 다시금 작동시키는 ‘변증법적 이미지’로 전환되는 것이다. 하지만 혁명의 약속 또한 여전히 망각되어 잠들어있으며, 다만 절실하게 혁 명이 요청되는 위기의 순간에 파편화된 모습으로, 꼽추난쟁이의 형상으로 모습 을 드러내기도 한다. 그렇다면 벤야민에게서 세속적으로 이해된 구원이란, 바로 이 이미지로만 남아있는 것들을 일깨우고, 이를 일상과 실천 속으로 끌어들이는 것일 것이다. 결국 벤야민의 이러한 사유는, 변증법적 역사유물론을 기억과 깨어남의 관점 에서 새롭게 정립해야 한다는 주장으로 귀결될 수 있다. 그럼으로써 역사유물론 은 이전에 없었던 미래의 세계를 꿈꾸는 것이 아니라, 과거의 기억 속에 묻혀있 던 꿈을 관철시키는 것이라는 자각, 그 코페르니쿠스적 전환에 이를 수 있다는 것이다. 따라서 그의 역사유물론은 이 역사에 대한 기억, 그 속에서 망각하고 있 는 염원과 구원의 약속을 기억해내는 것이 바로 사물화 현상을 내면화하고 있는 현실에서 깨어나는 것이며, 그것은 미래에 대한 약속이 아니라 투쟁에 대한 요구 이기도 할 것이다.",
      "keywords": "발터 벤야민, 대도시, 베를린, 역사철학, 변증법적 이미지",
      "isUOS": false
    }
  ],
  "해러웨이": [
    {
      "title": "다종 간 도시를 위한 정의의 모색과 실천 - 너스바움의 다종 공동체와 해러웨이의 테라폴리스에서의 다종 간 정의를 중심으로",
      "author": "현남숙",
      "abstract": "도시는 인류세의 ‘화석’이 될 수 있을 정도로 기후위기에 주요한 영향을 미쳐서, 인류세는 도시세로 불리기도 한다. 이러한 상황에서 도시에서의 삶은 인간 이외의종들에게 매우 부정의한 공간이다. 비인간 동물들은 도시의 안과 밖에서 인간과 함께 살아감에도 기존의 정의 이론에서의 분배, 지위, 정치적 대표성 그리고 인지적정의 면에서 정의의 대상이 되지 못하였다. 따라서 다종 간 도시를 만들려면 다종간 정의의 정립이 요구된다. 이러한 맥락에서 너스바움의 ‘다종 사회에서의 동물정의’와 해러웨이의 ‘테라폴리스에서의 다종 간 정의’는 다종 간 도시의 근간이 되는다종 간 정의를 정립하는 데 주요한 통찰을 제시한다. 너스바움은 자유주의 철학의 배경에서 동물을 위한 가상헌법과 같은 법적 해결책을 제공하여, 다종 간 정의의 인간주의적 확장을 보여준다. 한편, 해러웨이는 생태정치적 담론의 맥락에서 반려종의 함께 되기를 통한 과학-예술적 실천을 제시함으로써, 다종 간 정의에서 탈인간화된 정의의 방향을 보여준다. 이들은 각각 이론적 차이와 그로부터 파생되는 실천적 방향의 차이에도 불구하고, 다종 간 도시의 맥락에서 다종 간 정의를 구상하는 데 주요한 비계를 제공한다.",
      "keywords": "다종 간 정의, 다종 간 도시, 너스바움, 해러웨이",
      "isUOS": false
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
      "title": "미셸 푸코의 ‘헤테로토피아’ - 초기 공간 개념에 대한 비판적 검토",
      "author": "허경",
      "abstract": "본 논문은 미셸 푸코(Michel Foucault, 1926-1984)의 1966-1967년의 논문 「헤테로토피아」 및 「다른 공간들」에 나타난 푸코 초기 사유에 있어서의 공간ㆍ지리ㆍ문화에 관한 논의를 비판적으로 소개ㆍ검토하는 것에 목표를 둔다. 논문은 먼저 푸코의 논의를 정리하고, 이에 연관된 칸트의 공간관 및 하비의 비판을 다룬 후, 나의 전반적 검토의 순서로 구성된다. 이에 따른 결론은 다음과 같다. 첫째, 이질적 공간으로서의 ‘헤테로토피아’에 대한 강조에도 불구하고 푸코가 기존의 보편/특수 사이의 이분법을 근본적으로 탈피하지 못하고 있다는 하비의 비판은 푸코가 전통적인 칸트의 ‘보편/특수’ 사이의 대립을 푸코 자신의 새로운 개념인 복수적인 진리놀이들(jeux de vérité)의 형식 아래 새로이 전유하고 있음을 이해하지 못하는 하비의 잘못된 비판이다. 둘째, 그럼에도 불구하고 하비의 비판이 일정한 의의를 갖는 것은 하비의 논의가 푸코의 헤테로토피아에 관한 논의가 기본적으로 (아마도 부지불식간에 혹은 의식적인 형태로) 칸트의 공간관에 입각해 있다는 사실에 있다. 푸코는 자신의 논리대로라면 응당 그랬어야 할 지리적 곧 문화적 축에 대해 침묵한다. 푸코는 자신이 헤겔적 역사철학의 관념에 대해 그랬던 것처럼, 공간ㆍ지리ㆍ문화에 대한 칸트적인 ‘절대 시공간’의 관념에 대해서도 복수적인 진리놀이들을 도입했어야 했다. 푸코는 자신이 시간과 역사에 대해 행했던 계보학적 분석을 공간과 지리 그리고 문화에 대해서는, 단지 그 이론적 가능성만을 원칙적으로 남겨둔 채, 동일한 작업을 수행하지 않는다. 단적으로 말해, 푸코의 사유 안에는 진정한 의미의 공간과 지리에 대한 ‘계보학적’ 분석이 부재한다. 나의 논지에 따르면, 그 이유는 푸코가 공간 및 지리와 문화에 따라 합리성이 달리 구성될 수 있다는 관점은 한 마디로 반(反)-칸트적인 관념을 수용할 수 없었기 때문이다. 보편성, 합리성 혹은 근대성 등의 ‘보편적’ 명칭 아래 가려진 공간과 지리 그리고 문화의 문제는 이처럼 근본적으로 정치적인 문제이다.",
      "keywords": "헤테로토피아, 공간, 지리학, 문화, 칸트, 하비",
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