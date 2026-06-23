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
          showTopCitingPapersModal(`${paper.author} - ${shortTitle}`, TOP10_CITING_PAPERS[topKey], topKey);
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
      "title": "서구근대도시 형성의 계보학- 미셸 푸코의 도시관",
      "author": "허경",
      "abstract": "푸코에게 서구근대도시의 형성이란 이 시기의 다양한 사건들이 일어난 장소임과 동시에, 그 자체가 이미 ‘서구근대’의 시기에 일어난 가장 중요한 사건들 중 하나이다. 도시의 형성을 바라보는 푸코의 관점은 단적으로 계보학적(généalogique) 태도라 지칭할 수 있다. 도시를 바라보는 계보학적 관점이란단적으로 - 도시 자체를 하나의 독립적 ‘실체’(substance)로 간주하고 그 형성과 변천을 역사적으로 탐구하는 것이 아닌 - ‘도시’라는 개념 자체로부터도시의 실제적 형성에 이르는 모든 과정을 주어진 시대와 사회 내에 존재하는 복합...",
      "keywords": "공간, 도시, 건축, 헤테로토피아, 규율, 내치, 통치성",
      "isUOS": false
    },
    {
      "title": "미셸 푸코의 ‘헤테로토피아’ - 초기 공간 개념에 대한 비판적 검토",
      "author": "허경",
      "abstract": "본 논문은 미셸 푸코(Michel Foucault, 1926-1984)의 1966-1967년의 논문 「헤테로토피아」 및 「다른 공간들」에 나타난 푸코 초기 사유에 있어서의 공간ㆍ지리ㆍ문화에 관한 논의를 비판적으로 소개ㆍ검토하는 것에 목표를 둔다. 논문은 먼저 푸코의 논의를 정리하고, 이에 연관된 칸트의 공간관 및 하비의 비판을 다룬 후, 나의 전반적 검토의 순서로 구성된다. 이에 따른 결론은 다음과 같다. 첫째, 이질적 공간으로서의 ‘헤테로토피아’에 대한 강조에도 불구하고 푸코가 기존의 보편/특수 사이의 이분법을 근본적으로 탈피하지...",
      "keywords": "헤테로토피아, 공간, 지리학, 문화, 칸트, 하비",
      "isUOS": false
    },
    {
      "title": "미셸 푸코와 ‘근대성의 놀이들’ - 『말과 사물』과 「계몽이란 무엇인가?」의 사이에서",
      "author": "허경",
      "abstract": "논문의 목적은 근대성의 개념이 프랑스의 사상가 미셸 푸코(Michel Foucault, 1926-1984)에게 어떻게 이해ㆍ설정되어 있는가를 밝히고, 그러한 토대 위에서 푸코의 근대성 개념이 오늘을 사는 ‘우리’에게 어떠한 의미를 가질 수 있는가를 토론하고자 하는 데 있다. 16세기 이래 1960년대까지의 서양 곧 자신의 문화와 합리성에 대한 일종의 ‘민족학’을 수행하고자 하는 1966년의 『말과 사물』은 푸코 자신이 서양 문화의 계보에 속하는 자이므로 자기 자신의 문화에 대한 분석이다. 이러한 서양 문화와 이성에 대한 민족학적 작...",
      "keywords": "근대, 근대성, 근대화, 세계화ㆍ지구화, 보편성, 제국주의",
      "isUOS": false
    },
    {
      "title": "우리 시대가 ‘위험에 빠진 신체’에 대처하는 한 방식: 푸코의 『안전, 영토, 인구』를 중심으로",
      "author": "도승연",
      "abstract": "푸코의 콜레즈 드 프랑스(Collège de France) 강의록들이 영미권에서 속속 번역, 출판되면서 권력의 철학자 푸코가 가지는 학문적 위상 역시 권력과 지식의 연관 작용을 통해 전개되는 주체 형성의 계보학으로부터 근대 국가의 통치적 합리성과 관계된 새로운 차원의 권력의 대상과 그 효과에 대한 분석으로 연구 방향의 중심축을 이동하고 있다고 보인다. 이 명시적 전환은 다음의 이론적 강조점들로 요약될 수 있을 것이다. 첫째, 인구를 대상으로 사목 권력이 전개되는 방식을 사유함으로써 영토에 기반을 둔 주권자 중심의 권력으로부터 안전...",
      "keywords": "규율적 권력, 주체의 계보학, 통치, 안전장치, 신자유주의",
      "isUOS": false
    }
  ],
  "라깡": [
    {
      "title": "발터 벤야민과 도시경험-벤야민의 도시인문학 방법론에 대한 고찰",
      "author": "홍준기",
      "abstract": "이 논문은 벤야민의 도시인문학 방법론을 해명하기 위해 정신분석적 관점을 취한다. 우선 벤야민 이론에 대한 탈정신분석적 해석의 역사 및 현황을 살펴보고 이의 문제점을 지적한 후 벤야민이 말하는 도시경험의 의미를 설명한다. 벤야민에 따르면 대도시에서의 현대인의 경험은 충격과 상실의 경험이다. 이 논문은 특히 보들레르로부터 차용한 상실의 개념을 벤야민 특유의 개념인 아우라 상실과 연결시켜 논의하고 아우라 상실의 경험이 새로운 아우라 경험을 위한 전제조건임을 밝힌다. 또한 현대 도시인이 겪는 충격 경험은 사람들을 방어적으로 만들어 그들을 ...",
      "keywords": "벤야민, 정신분석, 라깡, 아우라, 도시, 도시경험, 시선, 촉각적 경험, 상실, 충격",
      "isUOS": true
    },
    {
      "title": "At the Crossroad of Psychoanalysis and Marxism -Walter Benjamin's Method of City Philosophy",
      "author": "홍준기",
      "abstract": "Walter Benjamin is one of the most important modern 'classic' thinkerswho took cities as a central theme, as we can read especially in hisunfinished masterpiece 'Passagenwerk'. However, even though manystudies have been made on Benjamin's 'city philosophy' so far, weseem to be far away from the comp...",
      "keywords": "Benjamin, Freud, Lacan, psychoanalysis, dialectical image, allegorical image, melancholia, city. criticism of the idea of progressive history",
      "isUOS": true
    },
    {
      "title": "초현실주의 이념과 라깡 정신분석학의 관련성 연구: 발터 벤야민의 「초현실주의」를 중심으로",
      "author": "남인숙",
      "abstract": "초현실주의는 시적(詩的) 실천을 통해 프로이트가 발견한 ‘무의식’을 삶 속에 구현하려 한 예술운동이다. 브르통의 자동기술법이나 살바도르 달리의 ‘비판적 망상증적 방법’은 구체적인 삶의 현실이 곧 무의식적 삶임을 드러내려는 초현실주의의 대표적인 실천방법이라고 할 수 있다. 벤야민은 일찍이 ‘초현실주의’논문을 통해서 초현실주의 이러한 실천적이고 전복적인 힘을 간파하고 있음을 보여준다. 라깡 또한 자신의 세미나에 등장하는 많은 인용이나 언급을 통해 초현실주의와 고유한 영향관계를 보여주고 있다. 다른 한편으로 예술의 장에서, 현대미술은 초...",
      "keywords": "초현실주의, 정신분석학, 벤야민, 라깡, 브르통, 뒤샹, 무의식, 범속한 각성, 변증법적 이미지, 미메시스, 발견된 오브제, 충동, 궁정풍 사랑, 욕망, 레디메이드",
      "isUOS": false
    },
    {
      "title": "도시공간 구성의 의미에 관한 인문학적, 정신분석적 고찰:랑시에르와 라깡을 중심으로",
      "author": "홍준기",
      "abstract": "이 논문은 도시 및 도시공간이 갖는 근본적 의미를 탐색하기 위해 랑시에르의 미학과 라깡의 ‘병리적 공간화’의 문제를 연구한다. 현대사회에서 도시는 행정적 편의주의와 대자본의 경제적 이익이 공모하는 가운데, 인간주체의 기본적 욕망과 인권, 자유의 실현에 역행하는, 지극히 비인간적 방식으로 발전하고 있다. 이 논문은 도시의 비인간화에 기여하는 도시개발정책이나 사회과학적 도시론에 반대하면서, 도시가 인간의 본원적인 욕망과 기본권, 자유의 증진에 기여할 수 있기 위해서 참조해야 할 인문학적, 정신분석적 원리가 무엇인지 서술한다. 향유와 예...",
      "keywords": "도시, 도시공간, 라깡, 랑시에르, 멈포드, 공간화, 망상증",
      "isUOS": true
    }
  ],
  "라투르": [
    {
      "title": "인간-기술 관계와 기술철학과 과학철학의 의도하지 않은 조우",
      "author": "이상원",
      "abstract": "기술철학자 아이드는 세 가지 ‘인간-기술 관계’를 제시한다. 그는 기술철학과 과학철학이 근래에 상호 분리 상태를 벗어나 탐구 영역에서 서로 중첩되는 부분을 나타내는 상황을 맞이했다고 본다. 필자는 아이드가 제시하고 있는 세 가지 인간-기계 관계를 중심으로 과학철학에서 라투르와 해킹의 논의를 대상으로 삼아 기술철학과 과학철학의 몇몇 접촉면이 어떻게 형성되고 있는지를 살펴볼 것이다. 도구쓰기를 중심으로, 그러한 접촉면은 주로 TRF(H)를 산출한 실험실과 실험과학의 현미경술과 관계된다. 이러한 접촉면은 기술철학자와 과학철학자가 서로가 ...",
      "keywords": "아이드, 라투르, 해킹, 기술, 도구쓰기",
      "isUOS": true
    },
    {
      "title": "라투르의 구성주의와 해킹의 실험적 실재론",
      "author": "이상원",
      "abstract": "과학철학자 해킹은 라투르와 울거의 『실험실 생활』에 대해 그의 논문 한 편 전체를 통하여 그 의의를 평가한다. 해킹은 그 책의 철학적 중요성을 강조한다. 이 평가는 그 후 라투르가 과학철학만이 아니라 과학학, 여타 인문학, 사회과학 등에 큰 기여를 하는 학자가 되는 데 많은 영향을 미친다. 해킹은 영미권 과학철학의 분석적 전통에서 출발한 연구자이며 그 논문을 쓰기 몇 년 전 『표상하기와 개입하기』을 낸 바 있고 여기서 실험에 관한 철학적 연구를 제시한다. 반면 라투르와 울거는 영미권 과학철학 바깥에 있었으며, 특히 라투르는 프랑스 ...",
      "keywords": "라투르, 해킹, 문헌적 기록하기, 현상의 창조, 과학의 실천",
      "isUOS": true
    },
    {
      "title": "데리다의 에크리튀르와 라투르의 문헌적 기록하기",
      "author": "이상원",
      "abstract": "데리다의 ‘에크리튀르’ 혹은 ‘그라마’는 우리말로 기록, 쓰기 혹은 그리기라고 부를 만하다. 에크리튀르는 그림, 글자(표의 문자, 표음 문자 등), 컴퓨터 모니터 위의 그래픽, 텔레비전, 비디오 영상 등을 포괄한다. 라투르는 과학 논문 산출을 두 단계로 나누어 이해한다. 하나는 ‘문헌적 기록하기’이고 다른 하나는 ‘논문 쓰기’이다. 문헌적 기록하기는 실험의 결과가 시각화되어 나타나는 바를 말한다. 심전도, 지진도 혹은 수치, 통계표 혹은 기타 그림 등이 문헌적 기록하기에 속한다. 라투르는 그가 ‘기록하기 장치’라고 부르는 실험 도구...",
      "keywords": "데리다, 에크리튀르, 그라마, 라투르, 문헌적 기록하기",
      "isUOS": true
    },
    {
      "title": "불트만의 신약성서 신학에서 라투르의 과학철학으로: 매개의 수 늘리기 또는 번역의 연결망",
      "author": "이상원",
      "abstract": "라투르의 과학철학은 통상적 기대를 깨는 기원을 갖고 있다. 『실험실 생활』에 드러난 라투르의 사고는 독일 신약성서 신학자 불트만의 영향을 받았다. 이는 라투르 스스로 인정한 것이다. 라투르의 과학철학은 불트만의 신약성서 신학에서 강력한 힌트를 얻었다. 공관복음 전승을 둘러싼 탐구를 통해 역사적 예수에 관한 의혹에 도달한 불트만의 신약성서 텍스트 연구 방법이 라투르의 실험실 철학, 과학적 사실 구성 과정에 끼친 영향을 밝히고자 했다. 매개의 수 늘리기, 번역의 사슬, 번역의 연결망, 또는 혼성이라는 개념을 중심으로 논의를 전개했다....",
      "keywords": "불트만, 라투르, 매개의 수 늘리기, 번역의 사슬, 번역의 연결망",
      "isUOS": true
    }
  ],
  "마르크스": [
    {
      "title": "At the Crossroad of Psychoanalysis and Marxism -Walter Benjamin's Method of City Philosophy",
      "author": "홍준기",
      "abstract": "Walter Benjamin is one of the most important modern 'classic' thinkerswho took cities as a central theme, as we can read especially in hisunfinished masterpiece 'Passagenwerk'. However, even though manystudies have been made on Benjamin's 'city philosophy' so far, weseem to be far away from the comp...",
      "keywords": "Benjamin, Freud, Lacan, psychoanalysis, dialectical image, allegorical image, melancholia, city. criticism of the idea of progressive history",
      "isUOS": true
    },
    {
      "title": "상품과 알레고리 - 맑스와 벤야민의 환등상 개념",
      "author": "한상원",
      "abstract": "벤야민이 그의 19세기 파리의 파사주 연구에서 맑스의 상품물신주의 개념을 차용했다는 사실은 널리 알려져 있다. 그러나 두 이론가를 비교하려는 시도는 물론, 벤야민을 직접 맑스로 소급해 이해하려는 시도 역시 찾아보기 매우 힘들다. 본 논문이 밝혀내려는 것은 상품물신의 두 이론들은 공통적으로, 경제적 합리성에 기반을 둔 현대 사회가 바로 그 합리성의 논리에 따라 비합리성으로 전도된다는 변증법적 역설을 고찰한다는 것이다. 이러한 이론적 관점 속에서 본 논문은 맑스와 벤야민 사이의 상이한 서술수준을 넘어선 이론적 대화를 시도한다. 맑스는 ...",
      "keywords": "상품물신주의, 맑스, 벤야민, 환등상, 보들레르, 초현실주의",
      "isUOS": true
    },
    {
      "title": "마르크스 및 베버주의적 비교역사사회학에서 바라본 도시 개념: 유럽중심주의의 극복과 공간에 대한 새로운 접근",
      "author": "유성희",
      "abstract": "사회학 내 하나의 하위 분과인 비교역사사회학에서 도시연구는 종종 논쟁의 대상이 되곤 했다. 이는 비교역사사회학이 가지고 있었던 유럽중심주의적 시각과 더불어 비서구지역 및 전근대 시기 도시연구의 부족 때문이었다. 본 연구에서 저자는 비교역사사회학에서 진행된 마크르주의주의적 접근방식, 베버주의적 접근방법을 각각 소개한 뒤, 이들이 가진 한계점을 제시했다. 이후 유럽중심주의에 대한 대안으로서 저자는 유럽을 지방화시키는 한편, 공간 자체에 대한 인문학적 성찰을 요청했다. 나아가 비서구 및 전근대 시기 도시연구의 부족을 메꾸기 위한 하나의 ...",
      "keywords": "도시, 비교역사사회학, 공간, 유럽을 지방화하기, 연결사, 인문학적 성찰",
      "isUOS": false
    },
    {
      "title": "욕망의 정치경제학과 현대 도시의 위기",
      "author": "박영균",
      "abstract": "현대 도시는 자본의 정치경제학을 따라 구축되었다. 자본의 정치경제학은 생산과 소비의 이원적 구조를 통해서 ‘생산-기계’이자 ‘소비-기계’로서의 인간을 생산하였 다. 도시공간의 사적 공간, 공적 공간, 사회적 공간의 분할은 이런 자본의 정치경제 학을 따라 이루어졌다. 오늘날 현대 도시는 생산-소비의 메커니즘을 자본 축적의 메커니즘으로 코드화하고 영토화하는 과정을 통해서 이루어졌다. 자본에 의한 생산의 포획은 임노동이라는 자본의 외부를 자본 내적 축적으로 코 드화하면서 노동자를 ‘생산-기계’로 생산한다. 반면 자본에 의한 소비의 포획은...",
      "keywords": "현대 도시의 위기, 자본의 정치경제학, 욕망, 생산 공간, 소비 공간, 스펙타클, 노동의 사회화, 네트워크, 화석에너지시스템, 마르크스, 르페브르, 드보르, 카스텔, 하비.",
      "isUOS": true
    },
    {
      "title": "마르크스 지대론의 확장과 현대 도시지대론을 위한 시론",
      "author": "곽노완",
      "abstract": "이 논문은 마르크스 \"자본\"에 제시된 도시지대 개념을 재구성하여 현대 자본주의 도시지대론의 시론을 제시하려는 시도이다. 현대 자본주의의 총순환에서 도시공간에 대한 자본투자와 도시지대의 비중이 급증하고 도시부동산에 대한 투기가 대중화되면서 도시의 부동산과 가계부채는 현대 경제위기의 뇌관 중에 하나로 자리 잡았다. 자본주의 분석에서 이제 도시지대는 필수영역이라 할 수 있다. \"자본\" 1권출간 150주년을 맞아 도시지대론을 재구성하려는 시도는 \"자본\"의 현재성을 새롭게 조명할 수 있는 계기가 될 것이다. 도시지대를 “사회의 진보를 가로채...",
      "keywords": "독점지대, 차액지대, 절대지대, 도시지대, 마르크스, 공유지의 역설.",
      "isUOS": true
    },
    {
      "title": "사회주의와 기본소득 -로머의 사회배당 및 하워드의 기본소득 개념의 재구성",
      "author": "곽노완",
      "abstract": "마르크스주의 연구자들 사이에서 모든 사회성원들에게 지급되는 무조건적인 기본소득에 대한 입장은 크게 네 가지로 나뉜다. 첫째, 기본소득은 모든 사회성원들을 노동자에 대한 착취자로 만드는 것이라 반대한다는 입장이다(엘스터, 비숍). 둘째, 기본소득은 자본주의 분배관계를 개선하지만 사회주의의 요소는 아니기에 한정적인 의미만 있다는 입장이다. 셋째, 기본소득은 노동자의 자유와 해방을 확대하는 한에서 사회주의적이라고 보는 입장이다(라이트, 키핑). 넷째, 기본소득은 생산수단의 공유화에 기초한 사회주의의 필수요소일 뿐만 아니라 자본주의에서도사...",
      "keywords": "사회배당, 쿠폰 사회주의, 기본소득, 로머, 착취, 마르크스.",
      "isUOS": true
    },
    {
      "title": "마르크스의 자유개념과 기본소득",
      "author": "곽노완",
      "abstract": "마르크스 연구자들 중 하워드처럼 기본소득을 옹호하는 연구가 늘어나고있다. 그러나 마르크스의 자유개념과 기본소득의 사회철학을 연계한 고찰은 아직 없다. 이 글은 마르크스의 자유개념을 자본주의에 포섭된 계몽주의의 법적･형식적 자유개념의 한계를 넘어서는, ‘연합사회의 자유’ 개념으로 재구성하는 것을 목표로 한다. 연구는 마르크스의 초기저작에 대한 연구와 중･후기 저작에 대한 연구로 나뉘어 진행된다. 초기 마르크스의 자유에 대한 논의는, ‘필연의 인식에 기초한 자기실현’이라는 계몽주의적 틀에서 크게 벗어나지 못하고 있다. 자유에 대한 논의...",
      "keywords": "마르크스의 자유개념, 경제적자유, 계몽주의, 기본소득",
      "isUOS": true
    },
    {
      "title": "마르크스 사회(공산)주의론의 모순과 21세기 사회주의",
      "author": "곽노완",
      "abstract": "이 논문은 마르크스의 사회(공산)주의 생산양식 이론의 미래 현실 적합성을 극대화시키려는 시도이다. 이를 위해 신자유주의적 세계화라는 자본주의의 변화 및 현대 사회(공산)주의 이론과 마르크스의 이론을 대결시켰다. 21세기에 확대재생산할 수 있는 사회(공산)주의 생산양식은 금융자본과 주식회사의 사회화를 ‘시초축적’의 계기로 활용하여 신용과 주식회사 나아가 모든 자본관계를 폐기함으로써 사적 소유를 단일한 사회적 소유(이를 ‘사회기금’으로 명명하였다) 로 전환하고 투자와 생산뿐 아니라 기업경영도 기업별로 직접 생산자에게 결정하도록 하며 나...",
      "keywords": "Widerspruch der marxschen Sozialismus und Sozialismus des 21. Jahrhunderts",
      "isUOS": true
    }
  ],
  "벤야민": [
    {
      "title": "발터 벤야민과 도시경험-벤야민의 도시인문학 방법론에 대한 고찰",
      "author": "홍준기",
      "abstract": "이 논문은 벤야민의 도시인문학 방법론을 해명하기 위해 정신분석적 관점을 취한다. 우선 벤야민 이론에 대한 탈정신분석적 해석의 역사 및 현황을 살펴보고 이의 문제점을 지적한 후 벤야민이 말하는 도시경험의 의미를 설명한다. 벤야민에 따르면 대도시에서의 현대인의 경험은 충격과 상실의 경험이다. 이 논문은 특히 보들레르로부터 차용한 상실의 개념을 벤야민 특유의 개념인 아우라 상실과 연결시켜 논의하고 아우라 상실의 경험이 새로운 아우라 경험을 위한 전제조건임을 밝힌다. 또한 현대 도시인이 겪는 충격 경험은 사람들을 방어적으로 만들어 그들을 ...",
      "keywords": "벤야민, 정신분석, 라깡, 아우라, 도시, 도시경험, 시선, 촉각적 경험, 상실, 충격",
      "isUOS": true
    },
    {
      "title": "프루스트와 벤야민의 건축적 상상력 -『잃어버린 시간을 찾아서』와『아케이드 프로젝트』의 경우",
      "author": "권용선",
      "abstract": "이 글은 발터 벤야민의『아케이드 프로젝트』를 구성하는 ‘건축적 방법론’을 프루스트의 소설『잃어버린 시간을 찾아서』와의 감응적 관계를 추적하는 과정 속에서살펴본 것이다. 이 글의 II장에서는 벤야민에게 건축적 상상력을 촉발한 것으로 보이는 프루스트 소설의 번역과 프루스트 소설의 구조적 이미지 형성에 기여한 러스킨의건축 비평에 관해 이야기하고, III장에서는 벤야민이 아케이드라는 역사적 건축물을자신의 프로젝트를 구성하는 하나의 ‘은유적’ 이미지로 설정했을 때, 그가 의도했던변증법적 구조의 의미와 요소들을 살펴본다. 또한 벤야민이 프로젝...",
      "keywords": "건축적 상상력, 번역, 아케이드, 비의지적 기억, 변증법적 이미지",
      "isUOS": false
    },
    {
      "title": "발터 벤야민의 일상 개념에 대한 고찰 - 파시즘 비판의 계기로서 일상",
      "author": "이수경",
      "abstract": "벤야민에게 일상은 유물론으로 전환을 명시화하는 1930년경, 파시즘 비판 속에 개념화되지 않은 채 다뤄지고 있다. 이 논문은 벤야민의 일상 개념을 파시즘 비판의 계기로 고찰함으로써 일상 개념의 의미를 억압받은 이들의 삶의 요구에 대한 성찰로 재구성하는 데 목적이 있다. 먼저 『독일 파시즘의 이론들』에서 제기된 파시즘 이론의 문화적, 계급적 토대에 대한 벤야민의 비판을 살펴본다. 1차 세계대전 후 독일 사회의 위기를 분석하면서 벤야민은 파시즘의 ‘새로운 전쟁론’의 문화적 토대에 전쟁에 대한 부인과 망각의 정치가 있음을 본다. 그는 이...",
      "keywords": "일상, 파시즘, 자본주의, 혁명, 기억, 발터 벤야민",
      "isUOS": false
    },
    {
      "title": "확장된 도시 읽기-벤야민의 도시 인상학을 중심으로",
      "author": "심혜련",
      "abstract": "2020년 코로나 팬데믹 이후, 일상공간에 큰 변화가 생겼다. 매체공간이 주요 공적공간으로 등장하고, 도시공간에서는 ‘사회적 거리두기’라는 새로운 삶의 방식이 요청되었다. 현전과 대면 대신 원격현전과 비대면이 전면에 등장했다. 그 결과 도시공간은 매체공간과의 결합으로 인해 확장된 도시가 되었다. 현대 대도시들은 모두 이러한 확장된 도시다. 따라서 이 글에서는 매체공간과의 결합을 통해 도시공간이 어떻게 확장되었는지를 살펴보고, 이를 분석하고자 한다. 특히 벤야민의 도시인상학을중심으로 지금의 확장된 도시를 분석하고자 한다. 대도시에 대...",
      "keywords": "확장된 도시, 매체공간, 도시공간, 벤야민, 다공성, 도시 인상학, 도시철학, 산책자",
      "isUOS": false
    },
    {
      "title": "변증법적 몽환극 －발터 벤야민의 초현실주의 ‘경험’ 비판－",
      "author": "강재호",
      "abstract": "유대계 독일 철학자 발터 벤야민(1892~1940)의 현대성분석은 그의미완성 저작 「아케이드 프로젝트」가 발간된 이후 도시인문학과 문화철학 분야에서 큰 주목을 받아왔다. 특히, 고도자본주의의 상품물신성과 현대도시의 경험에 대한 그의 비판적 성찰은 20세기 초 서유럽 초현실주의 운동에큰 영향을 받았다. 그러나 그 영향은 과대평가되었고, 벤야민의 급진적인 초현실주의 비판은 과소평가되었다. 이 논문은 벤야민이 초현실주의의 예술경험과 정치적 실천을 이론적으로 비판하고 극복하면서, 그가 ‘인간학적 유물론’이라 부르는 현대성분석의 인식론을 더...",
      "keywords": "발터 벤야민, 초현실주의, 경험, 이데올로기, 상품물신성,판타스마고리아",
      "isUOS": false
    },
    {
      "title": "At the Crossroad of Psychoanalysis and Marxism -Walter Benjamin's Method of City Philosophy",
      "author": "홍준기",
      "abstract": "Walter Benjamin is one of the most important modern 'classic' thinkerswho took cities as a central theme, as we can read especially in hisunfinished masterpiece 'Passagenwerk'. However, even though manystudies have been made on Benjamin's 'city philosophy' so far, weseem to be far away from the comp...",
      "keywords": "Benjamin, Freud, Lacan, psychoanalysis, dialectical image, allegorical image, melancholia, city. criticism of the idea of progressive history",
      "isUOS": true
    },
    {
      "title": "국내 카페 파사드(façade)에서 읽어 낸 문화적 의미",
      "author": "황성경;김진아",
      "abstract": "오늘날 한국인들에게 커피는 일상생활에서 빼놓을 수 없는 중요한 존재가 되었으며, 커피에 대한 관심의 증가와 함께 카페 공간 역시 보다 다양한 문화적 요소를 접목시켜 하나의 독특한 ‘카페문화’를 형성하고 있다. 특히 최근 유행처럼 확산되고 있는 커피전문점들의 개방형 파사드는 거리 전체를 투명한 유리벽 또는 이 마저도 제거된 파사드들의 연속으로 구성함으로써 새로운 도시 풍경을 만들어내며 소비자를 유혹하고 있다. 본 연구는 도시 공간을 산책하며 비평적 시선을 투사한 벤야민의 방식을 응용하여 오늘날 한국 도시의 주요 경관을 구성하는 개방형...",
      "keywords": "카페, 파사드, 대청마루, 문지방, 보드리야르, 벤야민",
      "isUOS": false
    },
    {
      "title": "대도시의 미학을 위한 프롤레고메나- 짐멜, 크라카우어, 벤야민에 기대면서",
      "author": "하선규",
      "abstract": "‘대도시의 미학’이란 무엇인가? 대도시의 미학이 가능하다면, 이 때 ‘미학’은 어떤 의미이며, 대도시는 어떤 대상으로 이해해야 하는가? 본고는 이들 질문에 답하기 위한 예비적 고찰이다. 본고는 먼저 근대미학이 논구한 감성적 차원의 정당화가 어떤 의미에서 근대정신과 근대 세계에 대한 대응이자 도전이었는가를 간략하게 살펴본다. 특히 미학이란 학문의 이론적 출발점을 상기하고, 미학이 처음 등장할 때부터 철학적 인간학, 문화철학, 역사철학 등과 긴밀하게 연결되어 있음을 강조하고자 한다. 이어 본고는 모더니티 세계를 생성사적으로 이해하기 위...",
      "keywords": "대도시, 근대미학, 현대미학, 현대성의 이론, 추상화, 우연성, 대중매체",
      "isUOS": false
    },
    {
      "title": "발터 벤야민과 루이스 칸의 문지방Threshold",
      "author": "우영선",
      "abstract": "루이스 칸과 발터 벤야민은 동화의 세계에 주목했다는 점에서 공통된 사유의 맥락을 제시했다. 이러한 공통점을 넘어 루이스 칸과 벤야민은 미메시스적 사유와 문지방에 대한 사유에서 큰 유사점을 갖는다. 발터 벤야민은 여러 저작을 통해 문지방을 거론하고, 이 요소를 자신의 철학적 사유가 응축된 곳으로 이해한다. 벤야민은 정문이나 입구, 거리를 이러한 문지방의 사례로 지적한다. 건축 요소로서의 입구와 거리 개념의 중정은 루이스 칸 건축 작품의 가장 큰 특징 중 하나이다. 동일한 건축 요소들을 강조하는 이러한 맥락에 따라 루이스 칸의 입구와 ...",
      "keywords": "루이스 칸, 발터 벤야민, 문지방, 아우라, 미메시스, 동화, 입구, 거리",
      "isUOS": true
    },
    {
      "title": "세계의 몰락과 영웅적 멜랑콜리: 독일 바로크 비극, 보들레르, 그리고 발터 벤야민",
      "author": "김동훈",
      "abstract": "이 논문의 목적은 발터 벤야민이 독일 바로크 비극과 샤를르 보들레르의 시세계를 분석하면서 그 특징으로 언급한 영웅적 멜랑콜리 개념에 대한 변증법적 해석을 통해 이들 사이의 밀접한 연관관계를 해명하는 데 있다. 이를 위해 이 논문은 히포크라테스, 아리스토텔레스, 갈레누스 등 고대 철학자, 의학자들의 이론에 대한 선행적 고찰을 통하여 멜랑콜리의 일반적 특징을 분석하였고, 이를 통하여 멜랑콜리 개념의 변증법적 성격을 밝혀내었다. 히포크라테스는 멜랑콜리를 인체 내에 존재하는 네 가지 체액 중 하나인 흑담즙으로 인해 야기되는 질환이나 그 증...",
      "keywords": "발터 벤야민, 독일 바로크 비극, 샤를르 보들레르, 세계의 몰락, 영웅적 멜랑콜리, 멜랑콜리적 천재, 광기, 변증법",
      "isUOS": false
    },
    {
      "title": "초현실주의 이념과 라깡 정신분석학의 관련성 연구: 발터 벤야민의 「초현실주의」를 중심으로",
      "author": "남인숙",
      "abstract": "초현실주의는 시적(詩的) 실천을 통해 프로이트가 발견한 ‘무의식’을 삶 속에 구현하려 한 예술운동이다. 브르통의 자동기술법이나 살바도르 달리의 ‘비판적 망상증적 방법’은 구체적인 삶의 현실이 곧 무의식적 삶임을 드러내려는 초현실주의의 대표적인 실천방법이라고 할 수 있다. 벤야민은 일찍이 ‘초현실주의’논문을 통해서 초현실주의 이러한 실천적이고 전복적인 힘을 간파하고 있음을 보여준다. 라깡 또한 자신의 세미나에 등장하는 많은 인용이나 언급을 통해 초현실주의와 고유한 영향관계를 보여주고 있다. 다른 한편으로 예술의 장에서, 현대미술은 초...",
      "keywords": "초현실주의, 정신분석학, 벤야민, 라깡, 브르통, 뒤샹, 무의식, 범속한 각성, 변증법적 이미지, 미메시스, 발견된 오브제, 충동, 궁정풍 사랑, 욕망, 레디메이드",
      "isUOS": false
    },
    {
      "title": "상품과 알레고리 - 맑스와 벤야민의 환등상 개념",
      "author": "한상원",
      "abstract": "벤야민이 그의 19세기 파리의 파사주 연구에서 맑스의 상품물신주의 개념을 차용했다는 사실은 널리 알려져 있다. 그러나 두 이론가를 비교하려는 시도는 물론, 벤야민을 직접 맑스로 소급해 이해하려는 시도 역시 찾아보기 매우 힘들다. 본 논문이 밝혀내려는 것은 상품물신의 두 이론들은 공통적으로, 경제적 합리성에 기반을 둔 현대 사회가 바로 그 합리성의 논리에 따라 비합리성으로 전도된다는 변증법적 역설을 고찰한다는 것이다. 이러한 이론적 관점 속에서 본 논문은 맑스와 벤야민 사이의 상이한 서술수준을 넘어선 이론적 대화를 시도한다. 맑스는 ...",
      "keywords": "상품물신주의, 맑스, 벤야민, 환등상, 보들레르, 초현실주의",
      "isUOS": true
    },
    {
      "title": "<서평>『모더니티의 수도 파리(Paris, capital of modernity)』",
      "author": "김동훈",
      "abstract": "이 글의 목적은 영국 출신의 지리학자 데이비드 하비의 책 􋺷모더니티의 수도파리 (Paris, Capital of Modernity)􋺸의 내용을 분석하고 그 속에 담긴 인문학적 상상력의 깊이를 가늠해보는 데 있다. 이를 위해 평자는 우선 하비가 보들레르의 힘을 빌려 정의하는 근대성 개념의 특징을 분석하였다. 하비에 따르면 근대는 그 이전에 배태되어 있던 가능성의 발현이면서 동시에 창조적 파괴를 통한 그 이전의 역사와의 단절이라는 이중적 성격을 지닌다. 그런데 이를 통해 근대성을 형식적으로 정의할 수는 있겠지만 내용에 대해서는 아무것도...",
      "keywords": "근대성, 1848년 혁명, 제2제정, 파리 코뮌, 오스망, 발자크, 벤야민, 보들레르, 플로베르, 도미에",
      "isUOS": false
    },
    {
      "title": "발터 벤야민의 역사철학테제: 역사주의와 역사 유물론그리고 메시아주의의 성좌구조",
      "author": "고지현",
      "abstract": "우리는 「역사의 개념에 대하여」(1940)에서 벤야민의 역사철학을 집약하고 있는 성좌구조 하나를 발견할 수 있다. 역사주의와 역사 유물론 그리고 메시아주의가 만들어내는 형상이 바로 그것이다. 벤야민은 역사주의에 대해 ‘유곽에서 몸을 파는 창녀’에 비유할 정도로 격한 적대감을 드러내고 있으며, 역사주의에 맞선 대항마로 자신의 입장을 포함한 역사 유물론을 내세우고 있다. 한편 그는 마르크스후예들이 전유한 역사유물론이 그 고유한 비판적 잠재력을 상실했다는 점에서 당대 마르크스주의에 이의를 제기하고 있으며, 그러한 맥락 속에서 유대전통의 ...",
      "keywords": "역사철학테제, 역사주의, 메시아주의, 기억(불망), 정치 신학",
      "isUOS": false
    },
    {
      "title": "미디어 공간의 원사(原史): 발터 벤야민과 19세기 파리의 정보 산업",
      "author": "강재호",
      "abstract": "우선 이 논문은 19세기 파리에서의 도시공간의 사유화, 공공 커뮤니케션의 산업화 그리고 공적 공간의 미디어화와 관련해 미디어 공간으로서의 신문에 대한 발터 벤야민의 분석을 다룬다. 나는 어떻게 정보산업이 문학적 실천, 지적 행위 그리고 새로운 사회적 주체의 형성에 있어서 근본적인 변화를 야기했는지를 보여주고자 한다. 또한 나는 19세기의 미디어 공간의 복합적인 역동에 대한 벤야민의 풍부한 예증이 어떻게 부르주아적 공공영역의 분석에 근거한 과도한 단순화의 결함을 회피하는지 입증할 것이다. 이를 통해 나는 신문에 대한 벤야민의 비판적 ...",
      "keywords": "미디어 공간, 판타스마고리아, 도시공간, 스펙터클, 이야기하기, 정보, 신문, 커뮤니케이션, 미디어화한 공적 공간",
      "isUOS": false
    },
    {
      "title": "발터 벤야민의 대도시 고고학- 베를린 에세이를 중심으로 -",
      "author": "남덕현",
      "abstract": "현대예술과 철학에서의 현대성은, 산업혁명의 향으로 형성된 대도시를 배 경으로 탄생했다. 다시 말해 현대성은 대도시의 새로운 현상과 문제점들에 대한 현대 예술의 예술적 형상화와 현대 철학의 지적인 성찰의 주제던 것이다. 이런 의미에서 현대예술과 현대철학은 대도시의 예술과 철학이라고 할 수 있다. 대도시에 대한 인문학적 연구를 우리는 ‘대도시 인문학’이라고 부를 수 있을 것이다. 이러한 새로운 학문 분야에서 발터 벤야민은 특별한 위치를 차지한다. 그는 대도시 베를린 출신으로, 독일에서 나치가 집권한 후에는 ‘19세기의 수도 파리’로 망...",
      "keywords": "발터 벤야민, 대도시, 베를린, 역사철학, 변증법적 이미지",
      "isUOS": false
    }
  ],
  "해러웨이": [
    {
      "title": "다종 간 도시를 위한 정의의 모색과 실천 - 너스바움의 다종 공동체와 해러웨이의 테라폴리스에서의 다종 간 정의를 중심으로",
      "author": "현남숙",
      "abstract": "도시는 인류세의 ‘화석’이 될 수 있을 정도로 기후위기에 주요한 영향을 미쳐서, 인류세는 도시세로 불리기도 한다. 이러한 상황에서 도시에서의 삶은 인간 이외의종들에게 매우 부정의한 공간이다. 비인간 동물들은 도시의 안과 밖에서 인간과 함께 살아감에도 기존의 정의 이론에서의 분배, 지위, 정치적 대표성 그리고 인지적정의 면에서 정의의 대상이 되지 못하였다. 따라서 다종 간 도시를 만들려면 다종간 정의의 정립이 요구된다. 이러한 맥락에서 너스바움의 ‘다종 사회에서의 동물정의’와 해러웨이의 ‘테라폴리스에서의 다종 간 정의’는 다종 간 도...",
      "keywords": "다종 간 정의, 다종 간 도시, 너스바움, 해러웨이",
      "isUOS": false
    },
    {
      "title": "인간중심주의를 넘어 반려종으로 존재하기를 생각하다: 최유미 『해러웨이, 공-산의 사유』(도서출판 b, 2020)",
      "author": "김은주",
      "abstract": "nan...",
      "keywords": "nan",
      "isUOS": true
    },
    {
      "title": "홀로바이온트의 응답하기, 기억하기: 해러웨이의 친족 만들기와 SF 글쓰기를 중심으로",
      "author": "김은주",
      "abstract": "이 글은 해러웨이의 응답하기와 기억하기를 친족 만들기와 SF 글쓰기로 조명하고 해러웨이의 응답하기의 윤리를 이해고자 한다. 해러웨이에게서 응답하기와 불가분의 관계를 맺고 있는 심포이에시스 개념은 해러웨이의 인간존재를 진화론적으로 환경에 적응, 변화해가는 구체적 생명체이자 자연-문화 연속체로서의 크리터들의 연합인 홀로바이온트로 제시한다. 홀로바이온트는 살아있음만이 아니라 죽어서 다른 존재들의 양분이 되는 퇴비라는 점에서 공생발생의 진화인 심포이에시스로 진화해 온 생태적 순환과 배치에 있는 관계성의 존재이다. 해러웨이의 홀로바이온트 개...",
      "keywords": "기억하기, 응답하기, 친족만들기, 해러웨이, SF 글쓰기",
      "isUOS": true
    },
    {
      "title": "다중위기 시대, 비인간 전회와 회절의 정치",
      "author": "김은주",
      "abstract": "이질적 현상들의 복합 위기를 뜻하는 다중 위기의 상황은 코로나19 바이러스로 인한 팬데믹을 기점으로 지구 행성적 재난으로 본격화되고 있다. 이 글은 ‘비인간전회’를 통과해 다중위기상황에서 새로운 정치적 이행을 모색하는 행위자(actor)와 그 연결을 살핀다. 글의 구성은 다음과 같다. 우선 비인간 전회의 의미를 짚고, 브루노 라투르의 행위자 네트워크 개념을 해러웨이가 제안한 광학적 기구가 행하는 회절(diffraction)과 연결하여 설명한다. 행위성은 다양한 행위자들의 행위의 중첩과 얽힘 그리고 연결에 따른 것이라는 점에서, 간섭...",
      "keywords": "다중위기, 바라드, 비인간전회, 해러웨이, 행위자-네트워크, 회절",
      "isUOS": true
    }
  ],
  "르페브르": [
    {
      "title": "르페브르의 삼항변증법에 대한 정합적 해석",
      "author": "김외곤",
      "abstract": "본 논문은 ‘공간적 선회’에서의 공간의 개념을 소자가 ‘사회적으로 생산된 공간‘이라 밝힌 르페브르의『공간의 생산』을 중심으로 ‘사회적 공간의 세 가지 계기’와 관련된 변증법적 관계를 고찰한다. 본 논문은 『공간의 생산』의 전략적 가설이 탐색하기를 요구한 변증법적 관계가 지칭하는 변증법이 르페브르의 ‘삼항변증법’이라는 것을 밝히는 것을 첫 번째 목표로 한다. 그리고 르페브르를 연구하는 학자들의 삼항변증법에 대한 기존 해석으로는 『공간의 생산』의 전략적 가설이 탐색하기를 요구한 ‘다른 공간’을 생산하는 길을 제시한 변증법적 관계를 탐색...",
      "keywords": "르페브르, 전략적 가설, 사회적 공간, 사회적 공간의 세 가지 계기, 삼항변증법, 공간 생산의 삼중성, 르페브르의 삼항변증법의 정합적 해석, 공간의 역사",
      "isUOS": true
    },
    {
      "title": "포스트모던 도시에 대한 사회학적 탐색- 몸, 공간, 정체성",
      "author": "서영표",
      "abstract": "이 논문은 포스트모던 도시가 안고 있는 다층적 모순을 분석한다. 포스트모던 도시는 소비주의적 욕망을 동력으로 움직인다. 소비주의는 공간마저도 상품화시켜 화폐적 논리에 종속시킨다. 하지만 포스트모던 공간은 혼종성을 특징으로 하고 있기도 하다. 전근대, 근대, 후기자본주의의 요소들이 서로 얽혀서 그 자체로 독특한 혼종성을 창조하고 있다. 논문은 이러한 도시의 모습을 설명하기 위해 근대 도시이론들의 계보를 간략하게 검토하는 것으로 시작한다. 그리고 그러한 계보의 결정적 계기로서 앙리 르페브르를 위치시킨다. 르페브르가 포스트모던 도시의 억...",
      "keywords": "앙리 르페브르, 포스트모던 도시, 몸의 리듬, 탈구, 혼종성",
      "isUOS": false
    },
    {
      "title": "르페브르의 변증법적 공간 이론과 공간정치― 「공간의 생산」을 중심으로",
      "author": "신승원",
      "abstract": "이 논문의 목적은 르페브르 공간생산론의 고유한 논의 지형을 제시하고, 그 실천적 함의를 밝히는 데 있다. 르페브르는『공간의 생산』에서 헤겔, 맑스의 생산 개념과 니체, 하이데거의 공간적 관점을 통합한다. 이종적인 이론적 자원을 종합하고 대안적 공간 기획의 기초를 제공하는 기초는 변증법이다. 르페브르의 변증법은 기본적으로 헤겔-맑스의 고전적인 해방기획과 연관되며, 공간의 우선성과 고유성을 강조하는 포스트모던적 주장을 포괄한다. 르페브르는 시․공간의 총체적 인식과 인간적 자연의 재창조를 주장하면서, 자본주의적 추상공간의 대안으로서 차이...",
      "keywords": "르페브르, 공간의 생산, 변증법, 공간정치, 몸, 도시사회",
      "isUOS": true
    },
    {
      "title": "욕망의 정치경제학과 현대 도시의 위기",
      "author": "박영균",
      "abstract": "현대 도시는 자본의 정치경제학을 따라 구축되었다. 자본의 정치경제학은 생산과 소비의 이원적 구조를 통해서 ‘생산-기계’이자 ‘소비-기계’로서의 인간을 생산하였 다. 도시공간의 사적 공간, 공적 공간, 사회적 공간의 분할은 이런 자본의 정치경제 학을 따라 이루어졌다. 오늘날 현대 도시는 생산-소비의 메커니즘을 자본 축적의 메커니즘으로 코드화하고 영토화하는 과정을 통해서 이루어졌다. 자본에 의한 생산의 포획은 임노동이라는 자본의 외부를 자본 내적 축적으로 코 드화하면서 노동자를 ‘생산-기계’로 생산한다. 반면 자본에 의한 소비의 포획은...",
      "keywords": "현대 도시의 위기, 자본의 정치경제학, 욕망, 생산 공간, 소비 공간, 스펙타클, 노동의 사회화, 네트워크, 화석에너지시스템, 마르크스, 르페브르, 드보르, 카스텔, 하비.",
      "isUOS": true
    }
  ],
  "하비": [
    {
      "title": "미셸 푸코의 ‘헤테로토피아’ - 초기 공간 개념에 대한 비판적 검토",
      "author": "허경",
      "abstract": "본 논문은 미셸 푸코(Michel Foucault, 1926-1984)의 1966-1967년의 논문 「헤테로토피아」 및 「다른 공간들」에 나타난 푸코 초기 사유에 있어서의 공간ㆍ지리ㆍ문화에 관한 논의를 비판적으로 소개ㆍ검토하는 것에 목표를 둔다. 논문은 먼저 푸코의 논의를 정리하고, 이에 연관된 칸트의 공간관 및 하비의 비판을 다룬 후, 나의 전반적 검토의 순서로 구성된다. 이에 따른 결론은 다음과 같다. 첫째, 이질적 공간으로서의 ‘헤테로토피아’에 대한 강조에도 불구하고 푸코가 기존의 보편/특수 사이의 이분법을 근본적으로 탈피하지...",
      "keywords": "헤테로토피아, 공간, 지리학, 문화, 칸트, 하비",
      "isUOS": false
    },
    {
      "title": "Global-polis and Time Space of Hope - Transformation of Global City and Spaces of Hope",
      "author": "곽노완",
      "abstract": "Globalization and the revolution in information have brought aboutpostmodern notions of space such as cyber space and overlappingspace. In her discussion of the dual systems of global cities, SaskiaSassen argues that overlapping space becomes predominant in globalcities, in which the global space is...",
      "keywords": "Global city, Space of Hope, Sassen, Harvey, Global-polis.",
      "isUOS": true
    },
    {
      "title": "욕망의 정치경제학과 현대 도시의 위기",
      "author": "박영균",
      "abstract": "현대 도시는 자본의 정치경제학을 따라 구축되었다. 자본의 정치경제학은 생산과 소비의 이원적 구조를 통해서 ‘생산-기계’이자 ‘소비-기계’로서의 인간을 생산하였 다. 도시공간의 사적 공간, 공적 공간, 사회적 공간의 분할은 이런 자본의 정치경제 학을 따라 이루어졌다. 오늘날 현대 도시는 생산-소비의 메커니즘을 자본 축적의 메커니즘으로 코드화하고 영토화하는 과정을 통해서 이루어졌다. 자본에 의한 생산의 포획은 임노동이라는 자본의 외부를 자본 내적 축적으로 코 드화하면서 노동자를 ‘생산-기계’로 생산한다. 반면 자본에 의한 소비의 포획은...",
      "keywords": "현대 도시의 위기, 자본의 정치경제학, 욕망, 생산 공간, 소비 공간, 스펙타클, 노동의 사회화, 네트워크, 화석에너지시스템, 마르크스, 르페브르, 드보르, 카스텔, 하비.",
      "isUOS": true
    },
    {
      "title": "공유의 시대, 열리고 겹치는 공유도시의 비전",
      "author": "곽노완",
      "abstract": "리프킨의 말대로 자율적인 공유지와 공유경제가 확대되면서 사유경제모델을 뛰어넘어 새롭게 지속가능한 공유경제모델의 시대가 열리고 있다. 하딘의 ‘공유지의비극’론을 비판한 로즈의 ‘공유지의 희극’론과 오스트롬의 공유지에 대한 역사적고찰도 국가/시장의 이분법의 틀을 깨는 공유지와 공유경제의 우월성과 지속가능성을 보여주고 있다. 그러나 이들의 공유지론은 1만 5000명 이하의 성원을 가진 공동체에서만 입증되었다. 그리고 좀 더 큰 규모에 대해서 오스트롬은 각각의 공유지를갖춘 다양한 공동체들 간에 ‘다중심의 질서’를 제시한다. 하지만 하비가 ...",
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