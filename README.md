# 도시인문학 연구 기말 대시보드 (Visual Essay)

본 프로젝트는 KCI(한국학술지인용색인) 데이터를 기반으로 한 **'도시인문학' 16년(2009~2024)의 학술적 궤적과 생태계를 추적하는 인터랙티브 대시보드(기말 과제용)**입니다. 막대한 국가 예산이 투입된 기획형 융합 인문학이 기존 분과학문의 장벽을 어떻게 마주했는지를 5개의 시각적 에세이 패널을 통해 실증적으로 분석합니다.

## 📊 대시보드 패널 소개 (기말 페이퍼 구조)
이 대시보드는 지식의 **생산 → 유통 → 소비** 생태계를 해부하는 5개의 관찰 패널로 이루어져 있습니다.
1. **지식 생산의 구조적 비대칭성**: 펀딩에 의한 인위적 양적 팽창과 1회성 연구자들의 비율
2. **학술지 지식 생산의 파편화 현상**: 다학제적 융합 없는 개별 전공(분과)의 물리적 집합
3. **담론의 인위적 교체**: 축적되지 못하고 유행처럼 소비되는 서구 추상 담론의 부침
4. **학술 생태계의 고립과 변질**: 상호 인용의 부재와 연구 커뮤니티의 단절 현상
5. **뻗어나가지 못한 비전**: 외부 학계(도시과학)가 아닌 전통 인문학 내부에서만 소비된 한계

## 🛠 사용된 기술 (Tech Stack)
* **Frontend**: HTML5, CSS3, Vanilla JavaScript
* **Data Visualization**: [ECharts](https://echarts.apache.org/) (Interactive Charts, WordCloud), [Chart.js](https://www.chartjs.org/)
* **Data Source**: KCI (한국학술지인용색인) 논문 메타데이터 및 피인용 데이터 (447편의 논문 및 12,902개의 참고문헌 전수 조사)

## 🚀 실행 방법 (How to Run)
본 대시보드는 순수 프론트엔드 환경(Vanilla JS)으로 구축되어 있어 별도의 빌드 과정이나 백엔드 서버가 필요하지 않습니다.

1. 이 저장소를 로컬에 클론합니다.
```bash
git clone https://github.com/[username]/[repo-name].git
```
2. 다운로드 받은 폴더 내의 `index.html` 파일을 크롬(Chrome) 등의 웹 브라우저에 드래그하여 엽니다.
> **Note:** 보안 정책(CORS)으로 인해 모달 팝업이나 일부 차트가 로컬 파일(`file://`) 상태에서 제대로 작동하지 않을 경우, VS Code의 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 익스텐션을 사용하거나 간단한 로컬 서버(예: `python -m http.server`)를 띄워 실행해 주십시오.

## 📂 폴더 구조
* `index.html`: 기말 대시보드(Visual Essay) 메인 페이지
* `style.css`: 전체 스타일시트
* `app.js` & `visual_essay.js`: 차트 렌더링, 이벤트 핸들링 및 애니메이션 스크립트
* `*_data.js` (essay, line, network, section45, theme): 각 차트에 사용되는 JSON 형태의 정적 데이터 파일

## 📝 라이선스
MIT License
