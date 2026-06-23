const MATRIX_DETAIL_DATA = {
  // 서울시립대 -> 서울시립대 (총 64건)
  'uos_uos': {
    self_count: 44,
    cross_count: 20,
    cross_list: [
      { citing_author: '곽노완', citing_title: '도시부동산수익의 공유와 기본소득', citing_field: '기타인문학', cited_author: '권정임', cited_title: '실질적 자유지상주의 분배정의의 세 원칙과 공유사회', cited_field: '철학' },
      { citing_author: '곽노완', citing_title: '도시부동산수익의 공유와 기본소득', citing_field: '기타인문학', cited_author: '권정임', cited_title: '실질적 자유지상주의 분배정의의 세 원칙과 공유사회', cited_field: '철학' },
      { citing_author: '곽노완', citing_title: '도시부동산수익의 공유와 기본소득', citing_field: '기타인문학', cited_author: '권정임', cited_title: '실질적 자유지상주의 분배정의의 세 원칙과 공유사회', cited_field: '철학' },
      { citing_author: '곽노완', citing_title: '도시부동산수익의 공유와 기본소득', citing_field: '기타인문학', cited_author: '권정임', cited_title: '실질적 자유지상주의 분배정의의 세 원칙과 공유사회', cited_field: '철학' },
      { citing_author: '권정임', citing_title: '실질적 자유지상주의 분배정의의 세 원칙과 공유사회', citing_field: '철학', cited_author: '곽노완', cited_title: '도시부동산수익의 공유와 기본소득', cited_field: '기타인문학' },
      { citing_author: '권정임', citing_title: '실질적 자유지상주의 분배정의의 세 원칙과 공유사회', citing_field: '철학', cited_author: '곽노완', cited_title: '도시부동산수익의 공유와 기본소득', cited_field: '기타인문학' },
      { citing_author: '권정임', citing_title: '실질적 자유지상주의 분배정의의 세 원칙과 공유사회', citing_field: '철학', cited_author: '곽노완', cited_title: '도시부동산수익의 공유와 기본소득', cited_field: '기타인문학' },
      { citing_author: '김은주', citing_title: '사물들의 플랫폼으로서 디지털 폴리스와 행위자 네트워크', citing_field: '기타인문학', cited_author: '홍남희', cited_title: '진정성의 탐색과 문화 귀촌 - 귀촌 브이로그를 통해 본 청년의 삶-노동 에토스', cited_field: '기타인문학' },
      { citing_author: '홍남희', citing_title: '진정성의 탐색과 문화 귀촌 - 귀촌 브이로그를 통해 본 청년의 삶-노동 에토스', citing_field: '기타인문학', cited_author: '김은주', cited_title: '사물들의 플랫폼으로서 디지털 폴리스와 행위자 네트워크', cited_field: '기타인문학' }
    ]
  },
  // 타기관 -> 타기관 (총 55건)
  'non_non': {
    self_count: 36,
    cross_count: 19,
    cross_list: [
      { citing_author: '김미정', citing_title: 'Navigating the Deep South - Mobility, Space, and Racial Boundaries in Twain’s Huckleberry Finn and Farrelly’s Green Book', citing_field: '기타인문학', cited_author: '정성훈', cited_title: '생활세계와 생활도시 - 신뢰와 확신의 구별을 통한 인문학적 접근', cited_field: '기타인문학' },
      { citing_author: '정성훈', citing_title: '생활세계와 생활도시 - 신뢰와 확신의 구별을 통한 인문학적 접근', citing_field: '기타인문학', cited_author: '서우석', cited_title: '도시인문학의 등장 - 학문적 담론과 실천', cited_field: '기타인문학' },
      { citing_author: '이효숙;전병국', citing_title: '세계시민의식 함양을 위한 교양교과목 설계와 성찰', citing_field: '교양기초교육', cited_author: '서우석', cited_title: '도시인문학의 등장 - 학문적 담론과 실천', cited_field: '기타인문학' },
      { citing_author: '윤영돈', citing_title: '생태학적 다문화 도시공간을 위한 도시인문학의 근본개념 탐구', citing_field: '기타인문학', cited_author: '김미정', cited_title: 'Navigating the Deep South - Mobility, Space, and Racial Boundaries in Twain’s Huckleberry Finn and Farrelly’s Green Book', cited_field: '기타인문학' }
    ]
  },
  // 서울시립대 -> 타기관 (총 12건)
  'uos_non': {
    self_count: 10,
    self_label: '과거 공저자/지인 인용',
    cross_count: 2,
    cross_label: '순수 학술적 참조',
    cross_list: [
    {
        "citing_title": "도시인문학의 등장 - 학문적 담론과 실천",
        "citing_author": "서우석",
        "citing_field": "기타인문학",
        "cited_title": "마을인문학과 여성주의",
        "cited_author": "김영선",
        "cited_field": "철학일반",
        "is_self": false
    },
    {
        "citing_title": "주관의 발견과 지양 - 도쿄 시기 샤오훙 단편집 『우차 위에서』(1937)의 자전적 리얼리즘",
        "citing_author": "이현정",
        "citing_field": "기타인문학",
        "cited_title": "발터 벤야민의 역사철학테제: 역사주의와 역사 유물론그리고 메시아주의의 성좌구조",
        "cited_author": "고지현",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "르페브르의 변증법적 공간 이론과 공간정치― 「공간의 생산」을 중심으로",
        "citing_author": "신승원",
        "citing_field": "기타인문학",
        "cited_title": "미셸 푸코의 ‘헤테로토피아’ - 초기 공간 개념에 대한 비판적 검토",
        "cited_author": "허경",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "도시공간 구성의 의미에 관한 인문학적, 정신분석적 고찰:랑시에르와 라깡을 중심으로",
        "citing_author": "홍준기",
        "citing_field": "기타인문학",
        "cited_title": "공간-마련과 깃들임의 사유 : 하이데거 사유를 통해 본 도시 공간의 의미",
        "cited_author": "김동훈",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "1920-30년대 베이징의 문예청년과 도시공간의 분할",
        "citing_author": "김태연",
        "citing_field": "중국어와문학",
        "cited_title": "공감과 공유로서의 도시 북경(北京) -천(天)에서 인(人), 이상(理想)에서 현실(現實)로의 전환",
        "cited_author": "김덕삼",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "도시, 주체, 텍스트: 폴 오스터의 『뉴욕 3부작』에 나타난 유토피아/헤테로토피아로서 뉴욕의 재현 양상을 중심으로",
        "citing_author": "정희원",
        "citing_field": "영문학",
        "cited_title": "미셸 푸코의 ‘헤테로토피아’ - 초기 공간 개념에 대한 비판적 검토",
        "cited_author": "허경",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "들릴로의 『코스모폴리스』에 나타난 코스모폴리스적 이상의 아이러니",
        "citing_author": "정희원",
        "citing_field": "영어와문학",
        "cited_title": "Globopolis or Cosmopolis? -Alternative Futures of City Life in East Asia",
        "cited_author": "마이크 더글라스",
        "cited_field": "기타인문학",
        "is_self": false
    }
]
  },
  // 타기관 -> 서울시립대 (총 21건)
  'non_uos': {
    self_count: 18, 
    self_label: '사업 초기 총론 의례적 인용',
    cross_count: 3,
    cross_label: '특정 아젠다 인용',
    cross_list: [
    {
        "citing_title": "대안도시 논의들에 대한 비판적 검토",
        "citing_author": "김태훈",
        "citing_field": "기타인문학",
        "cited_title": "창조도시 논의의 비판적 성찰과 과제",
        "cited_author": "남기범",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "대안도시 논의들에 대한 비판적 검토",
        "citing_author": "김태훈",
        "citing_field": "기타인문학",
        "cited_title": "도시인문학의 등장 - 학문적 담론과 실천",
        "cited_author": "서우석",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "대안도시 논의들에 대한 비판적 검토",
        "citing_author": "김태훈",
        "citing_field": "기타인문학",
        "cited_title": "21세기 도시연구의 새로운 방향 - 탈신자유주의적 도시의 탐색",
        "cited_author": "이성백",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "대안도시 논의들에 대한 비판적 검토",
        "citing_author": "김태훈",
        "citing_field": "기타인문학",
        "cited_title": "도시공간 구성의 의미에 관한 인문학적, 정신분석적 고찰:랑시에르와 라깡을 중심으로",
        "cited_author": "홍준기",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "대안도시 논의들에 대한 비판적 검토",
        "citing_author": "김태훈",
        "citing_field": "기타인문학",
        "cited_title": "발터 벤야민과 도시경험-벤야민의 도시인문학 방법론에 대한 고찰",
        "cited_author": "홍준기",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "Rethinking Smart Cities in Seoul: Grassroots Innovation and Urban Poverty",
        "citing_author": "김건",
        "citing_field": "기타인문학",
        "cited_title": "서울시 도시재생의 지역 공동체에 대한 비판적 고찰: 실천 공동체 개념을 중심으로",
        "cited_author": "김건",
        "cited_field": "도시개발/계획",
        "is_self": true
    },
    {
        "citing_title": "확장된 도시 읽기-벤야민의 도시 인상학을 중심으로",
        "citing_author": "심혜련",
        "citing_field": "기타인문학",
        "cited_title": "디지털 도시화와 사이보그 페미니즘 정치 분석: 인정투쟁의 관점에서 본 폐쇄적 장소의 정치와 상상계적 정체성 정치",
        "cited_author": "이현재",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "탈산업화 시대의 문화도시 연구 - <캐나다 셰익스피어 페스티벌>의 스트랫포드를 중심으로 -",
        "citing_author": "권오숙",
        "citing_field": "기타인문학",
        "cited_title": "문자로서의 도시, 도시시학의 가능성 - 도시인문학의 이론적 기초 -",
        "cited_author": "김동우",
        "cited_field": "한국어와문학",
        "is_self": false
    },
    {
        "citing_title": "탈산업화 시대의 문화도시 연구 - <캐나다 셰익스피어 페스티벌>의 스트랫포드를 중심으로 -",
        "citing_author": "권오숙",
        "citing_field": "기타인문학",
        "cited_title": "도시인문학의 등장 - 학문적 담론과 실천",
        "cited_author": "서우석",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "조선후기 宮家의 미술사ㆍ도시인문학적 의미 - 彰義宮의 장소성과 서화컬렉션을 중심으로",
        "citing_author": "황정연",
        "citing_field": "미술사",
        "cited_title": "도시인문학의 등장 - 학문적 담론과 실천",
        "cited_author": "서우석",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "인문학적 도시의 핵심원리로서의 ‘공감(共感)’에 관한 연구 - 맹자(孟子)와 퇴계(退溪)의 감정이해방식을 중심으로 -",
        "citing_author": "김성실",
        "citing_field": "기타인문학",
        "cited_title": "도시인문학의 등장 - 학문적 담론과 실천",
        "cited_author": "서우석",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "인문학적 도시의 핵심원리로서의 ‘공감(共感)’에 관한 연구 - 맹자(孟子)와 퇴계(退溪)의 감정이해방식을 중심으로 -",
        "citing_author": "김성실",
        "citing_field": "기타인문학",
        "cited_title": "21세기 도시연구의 새로운 방향 - 탈신자유주의적 도시의 탐색",
        "cited_author": "이성백",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "헤테로토피아로서의 인문도시와 공동체 내에서의 타자의 문제 - 인문도시 진주 사업을 중심으로",
        "citing_author": "장만호",
        "citing_field": "기타인문학",
        "cited_title": "글로벌 시대의 대도시인의 정체성에 관한 연구: 도시인문학 방법론 논의의 맥락에서―조나단 프리드먼과 짐멜의 이론을 중심으로",
        "cited_author": "홍준기",
        "cited_field": "철학",
        "is_self": false
    },
    {
        "citing_title": "도시공간의 과심미화 현상에 대한 비판적 고찰",
        "citing_author": "심혜련",
        "citing_field": "기타인문학",
        "cited_title": "시민 문화예술활동의 사회적 의미 고찰 - 서울시 마을예술창작소의 일상성, 공동체성, 공공성을 중심으로",
        "cited_author": "서윤경",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "포스트모던 도시에 대한 사회학적 탐색- 몸, 공간, 정체성",
        "citing_author": "서영표",
        "citing_field": "기타인문학",
        "cited_title": "르페브르의 변증법적 공간 이론과 공간정치― 「공간의 생산」을 중심으로",
        "cited_author": "신승원",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "포스트모던 도시에 대한 사회학적 탐색- 몸, 공간, 정체성",
        "citing_author": "서영표",
        "citing_field": "기타인문학",
        "cited_title": "21세기 도시연구의 새로운 방향 - 탈신자유주의적 도시의 탐색",
        "cited_author": "이성백",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "1980년대 상하이(上海) 청년 시인들의 도시 서사(抒寫) - 시집 『도시인』(城市人)을 중심으로",
        "citing_author": "이경하",
        "citing_field": "기타인문학",
        "cited_title": "루야오의 ‘도농 교차지대’와 은폐된 서사",
        "cited_author": "성근제",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "‘인문도시목포’를 통해 본 대학의 기능",
        "citing_author": "김경옥",
        "citing_field": "기타사회과학",
        "cited_title": "도시인문학의 등장 - 학문적 담론과 실천",
        "cited_author": "서우석",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "지속가능한 인문도시 지원사업의 활성화 방안 및 기대효과 연구",
        "citing_author": "나윤빈, 성지선",
        "citing_field": "학제간연구",
        "cited_title": "서울학 연구의 현재적 의미와 한계",
        "cited_author": "유승희",
        "cited_field": "기타인문학",
        "is_self": false
    },
    {
        "citing_title": "도시언어에 대하여",
        "citing_author": "김정태",
        "citing_field": "한국어와문학",
        "cited_title": "국문학 분야 도시 연구의 동향과 전망",
        "cited_author": "정인숙",
        "cited_field": "기타인문학",
        "is_self": false
    }
]
  }
};
