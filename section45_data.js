// 섹션 04, 05에 사용될 데이터 모음

// [섹션 04 패널 1] 투고자 유형 변화
const JOURNAL_CONTRIBUTOR_DATA = {
  years: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
  foreign: [8, 7, 5, 1, 2, 0, 2, 4, 0, 0, 0, 1, 0, 0, 0, 1, 0],
  domestic: [3, 7, 6, 6, 6, 9, 9, 5, 5, 6, 6, 9, 8, 6, 8, 11, 10],
  uos: [6, 6, 6, 4, 4, 8, 3, 5, 10, 7, 6, 1, 2, 4, 7, 5, 8]
};

const FOREIGN_PAPERS_DATA = {
  "2024": [
    {
      "author": "김건",
      "inst": "서안교통리버풀대학교 (중국)",
      "title": "Rethinking Smart Cities in Seoul: Grassroots Innovation and Urban Poverty",
      "abstract": "Although information and communication technology (ICT) has contributed to the rapid transformation of urban environments, its benefits have not been equally distributed, and urban poor populations have been disadvantaged by government-led smart city initiatives. This imbalance poses significant cha...",
      "keyword": "Smart Cities, Urban Poverty, Grassroots Innovation, Sustainable Development, Digital Capitalism",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003135628"
    }
  ],
  "2009": [
    {
      "author": "Le ROUX Brendan",
      "inst": "동경학예대학교 (일본)",
      "title": "유럽의 시점에서 본 동아시아 도시- 제1차 도시인문학 국제학술대회 참가기",
      "abstract": "초록 정보가 없습니다.",
      "keyword": "키워드 정보가 없습니다.",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001952842"
    },
    {
      "author": "마이크 더글라스",
      "inst": "University of Hawaii",
      "title": "Globopolis or Cosmopolis? -Alternative Futures of City Life in East Asia",
      "abstract": "From the late 1980s urbanization in East Asia has been proceedingunder historically new dynamics that are rapidly transforming urbanspaces and city life. One of the key drivers is the emergence of anaffluent middle class that is simultaneously pushing for political reformwhile also encouraging a shi...",
      "keyword": "키워드 정보가 없습니다.",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001952716"
    },
    {
      "author": "린타이",
      "inst": "복단대학교 (중국)",
      "title": "인도학 연구사 개설",
      "abstract": "초록 정보가 없습니다.",
      "keyword": "키워드 정보가 없습니다.",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001952832"
    },
    {
      "author": "에릭 스윙기도우",
      "inst": "맨체스터대학교 (영국)",
      "title": "The Antinomies of the Post-Political City",
      "abstract": "Political struggles are central in shaping alternative or differenttrajectories of socio-metabolic change and the construction of new andemancipatory urban environmental geographies. But thedisappearance ofthe properly political as theoretical and practical object stands instrange contrast with the ...",
      "keyword": "키워드 정보가 없습니다.",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001952613"
    },
    {
      "author": "렌 팡",
      "inst": "무한대학교 (중국)",
      "title": "근대 중국의 시진(市鎭) 연구-1860~1936년 양자강 중하류 지역을 중심으로-",
      "abstract": "이 글은 현대화 이론을 참조하여 양자강 중하류 지역을 중심으로 근대 공상업과 교통운수업을 가지고 사회경제사적인 시각에서 전통 시진(市鎭)의 근대적 전형에 대해 종합적으로 고찰한 것이다. 이른바 전통 시진이란 근대 이전 현성과 향촌 사이에 존재하면서 상대적으로 독립적 지위를 갖고 있었던 상업적 실체이다. 근대적 전형이라는 것은 기계공업이 주도한 일련의 사회 변화를 지칭하는 것으로, 그것은 전통 사회를 근대사회로 점차 이행하도록 이끌었다. 근대 공상업과 근대 교통운수업을 통해 볼 때, 양자강 중하류 지역 전통 시진의 근대적 전형은 완만...",
      "keyword": "근대 중국. 전통적 시장도시, 근대적 변형, 양자강 중류와 하류",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001950112"
    },
    {
      "author": "펑웨이",
      "inst": "복단대학교 (중국)",
      "title": "조선 서학(西學) 발전에 미친 신유박해의 영향",
      "abstract": "18세기 말 서학(西學)의 거듭된 발전은 조선이 국가적 차원에서 서학을 받아들일 가능성을 발생시켰다. 하지만 이러한 가능성은 1801년의 ‘신유박해’로압살됐다. 신유박해 발생 후 반서교(反西敎), 반서학(反西學)의 ‘위정척사(衛正斥邪)’가 지배적 지위를 차지하는 시대사조가 돼 전사회적으로 성행했다. 하지만 소위 ‘신유박해’의 본질은 ‘위정척사’의 방식으로 표출된 당쟁이었다. 만일 우리가 조선 서학의 발전을 역사적 좌표 위에 두고 살펴본다면, 조선 서학의 쇠퇴를 이끌어낸 주요 원인이 신유박해 후의 정세가 아니라 이미 변화가발생한 국제...",
      "keyword": "신유박해, 조선, 서학(西學), 당쟁",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001952810"
    },
    {
      "author": "마르티나 뢰브",
      "inst": "다름슈타트대학교 (독일)",
      "title": "Pre-structured Urban Development Opportunities - The theoretical idea of an intrinsic logic of cities and European case studies",
      "abstract": "The endeavour in this article is to develop a view of the city thatproductively addresses the differences between cities rather thanignoring them. The thesis Martina Löw accordingly presents fordiscussion is that cities develop and display an intrinsic logic(Eigenlogik) that pre-structures developme...",
      "keyword": "키워드 정보가 없습니다.",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001952764"
    },
    {
      "author": "오이시 마나부",
      "inst": "동경학예대학교 (일본)",
      "title": "일본 근세도시 에도의 기능과 성격",
      "abstract": "이 논문의 목적은 일본사회와 소위 ‘일본체계’의 형성과 발달 시기로서의 일본 근세 관점에서 도시 에도의 기능과 특징을 제시하는 것이다. 첫째, 일본과 외국 문헌에 근거해 이 논문은 근세 도시 에도가 정치적 중심, 즉 일본의수도로 인식되었다는 사실을 지적한다. 둘째, 본 논문은 ‘수도-에도’의 정치적, 외교적 기능을 해명한다. 백만 명의 거주자를갖고 있으며, 사무라이 지역[武家地], 상인과 장인의 지역[町人地], 그리고 종교적 건물이 있는 지역[寺社地]으로 나뉘어져 있었던 에도는 1657년 대화재 발생 이후에 그구조가 변화했다. 그리...",
      "keyword": "도시 에도에 대한 인식, “武家地” (사무라이 지역), “町人地” (상인과 장인의 지역), “寺社地” (절과 사당의 지역), 明曆시대의 대화재, 수도의 개편, “大江戶”, “江戸っ子에도코” (전통적 도쿄인)",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001950133"
    }
  ],
  "2020": [
    {
      "author": "임연경",
      "inst": "City University of Hong Kong (홍콩)",
      "title": "How can a Body Connecting to Locative Media Practice Urban Space?: “Feeling” as the Technique of Orientation in the Digital Age",
      "abstract": "How does the body practice space in the digital age? This paper aims to study the everyday practice of walking in urban space as a theoretical object. This study consists of two questions: (1) Who does the body walk around with in urban space? (2) How does the body feel the emotions, sentiments, and...",
      "keyword": "Emotion, Locative Media, Map Interface, Locative Media Narrative, Urban Space, Technique of Orientation",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002584780"
    }
  ],
  "2016": [
    {
      "author": "함충범",
      "inst": "나고야대학교 (일본)",
      "title": "1940년대 식민지 조선의 국책 극영화 속 ‘경성’ - <지원병>(1941)과 <조선해협>(1943)을 중심으로",
      "abstract": "본 연구에서는 군사 동원 정책을 다룬 국책 극영화 <지원병>(1941)과 <조선해협>(1943)을 중심으로, 1940년대 식민지 조선 영화 속 경성에 대해 고찰하였다. 이들 텍스트가 ‘경성’이라는 특정 공간을 어떻게 활용함으로써 스토리를 구성하고 스타일을 형성하며 메시지를 발산하는지에 관해 분석하였다. 그 결과는 다음과 같이 요약된다. 첫째, 두 영화에서 경성은 현실 문제의 발생 장소이자 해결 장소라는 이중적 성격을 띠며 등장한다. 이는 1930년대 조선 발성영화의 서사적 전통과 구별되는 지점이다. 둘째, <지원병>의 경우 스토리 ...",
      "keyword": "경성, 조선영화, 1940년대, 지원병, 조선해협",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002101347"
    },
    {
      "author": "Gerhard Vinken",
      "inst": "University of Bamberg (독일)",
      "title": "Neue Heimat or Constructing the Old Town - The Example of Cologne, 1930–1960",
      "abstract": "Cologne was among the German cities that suffered the greatest war damage. For its reconstruction after 1945, a middle path was chosen. Influenced by organic urban planning, a guiding ideal of the 1930s, Rudolf Schwarz, the head of Cologne’s urban planning authority, sought to chart a course of mode...",
      "keyword": "postwar rebuilding, “Traditionsinsel(island of tradition)”, reconstruction, Nazi urban rehabilitation policies, Rudolf Schwarz",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002101339"
    },
    {
      "author": "우에노 치즈코",
      "inst": "리쓰메이칸대학교 (일본)",
      "title": "A Twisted Alliance- Neo-Liberalism, Neo-nationalism and Backlash",
      "abstract": "The double disasters on March 11, 2011, a big earthquake and Tsunami, followed by the Fukushima incident of the nuclear power plants, influenced the Japanese society in many ways. While the political elites still seek for the economic growth, it urges Japan to downshift the gear. The neoliberalist r...",
      "keyword": "Neoliberalism, Neonationalism, Misogyny, Xenophobia, New Activism.",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002157601"
    },
    {
      "author": "레나타 살레츨",
      "inst": "Yeshiva University (미국)",
      "title": "Urban anxieties in times of terrorism",
      "abstract": "Urban anxieties are often linked to the perception that certain parts of the cities are off limit, with potential danger lurking on the streets or behind the closed doors. People are however not anxious about environmental dangers, but mostly about the behaviour of other people in public spaces. The...",
      "keyword": "Terrorism, Anxiety, Urban danger, Neuroscience, Genetics, Neuro- architecture, Neuro- urbanism, Social control, Psychoanalysis",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002157600"
    }
  ],
  "2015": [
    {
      "author": "Brendan Gleeson",
      "inst": "Melbourne University (호주)",
      "title": "The Urban Age and its Discontents",
      "abstract": "An urban age has been declared and celebrated by global institutions and in expert commentary. There is triumph in the air. To be sure, the urbanisation project that has been central to modernisation has reached new level of species’ significance. And yet, despite the enthusiasm of experts, the new ...",
      "keyword": "good city, urban age, political ecology, Arendt, modernity",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002045081"
    },
    {
      "author": "Andy Merrifield",
      "inst": "Cambridge University (영국)",
      "title": "Radical Urban Furture",
      "abstract": "Over the past few years, we’ve glimpsed a resurgence of people struggling to participate in urban life. Activism here is broadly reacting to the failings of representative government and to a numbing professionalisation of social and political life. Nowadays, it’s as if only professionals can prop u...",
      "keyword": "amateurs, professionals, representation, participatory democracy, austerity, urban studies",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002045108"
    }
  ],
  "2013": [
    {
      "author": "펑샨민",
      "inst": "상하이사범대학교 (중국)",
      "title": "NPO와 상하이 유동 아동의사회교육",
      "abstract": "본 논문은 사회 교육의 시야에서 당대 상하이 비영리단체가 유동 아동의 사회 서비스 영역에서 전개하고 있는 사업을 정리하고자 하며, 3개의 전형적인NPO의 능력 교육, 소양 교육, 시민 교육을 각각 고찰하고 있다. 이 세 종류의 교육은 하층 시민 가정 교육과 학교 교육의 부족을 보충하고 있으며, 유동아동의 도시 적응을 추동하고, 어느 정도는 도시 정신의 승화를 촉진하고 있다. NPO가 유동 아동의 사회 교육에서 더욱 기능을 잘 하게 하기 위해서NPO 사회 교육 서비스의 정부 구매 제도를 개선하고 NPO 사회 교육과 학교교육의 협조를 ...",
      "keyword": "NPO, 상하이, 유동아동, 사회 교육",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002090543"
    },
    {
      "author": "양지엔룽",
      "inst": "상하이사범대학교 (중국)",
      "title": "중국의 도시화 과정과도시문화연구",
      "abstract": "모두가 목도하고 있듯, 중국의 도시화 과정은 빠르게 진행되고 있다. 이에 도시문화연구는 중국 도시화 과정에 있어 중요한 임무가 되었다. 해외의 도시문화연구 성과를 번역, 소개하는 일은 국내 도시문화연구에 있어 매우 중요한과제이며, 도시문화연구의 시야를 넓히고 이론을 확립하는 데에 새로운 의의를 갖는다. 대학 기관과 사회과학원으로 구성된 연구 기관은 도시문화연구와발전에 중요한 역할을 하고 있다. 그러나 최근 들어 도시문화연구 과정에서여전히 부족함이 드러나고 있다. 우선, 이론에 있어 체계성이 떨어지고 이론체계를 수립하고자 하는 시야가...",
      "keyword": "중국, 도시화, 도시문화, 이론수립",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002090544"
    }
  ],
  "2012": [
    {
      "author": "나이토 마리코",
      "inst": "동경대학교 (일본)",
      "title": "과거를 표상하기 : 도시와 전후(戰後) 영화",
      "abstract": "이 논문은 전후 영화에 나타난 도시의 묘사를 검토한다. 중국감독 페이무(費穆, Fei Mu, 1906~1951)의 <어느 작은 마을의 봄>(小城之春, Spring in a Small Town, 1948)과 일본 감독 오즈 야스지로(小津安二郞, 1903~1963)의 <무네카타 자매들>(宗方姉妹, Munakata Sisters, 1950)이라는 두 편의 전후 영화에 대한 분석을 통해 나는 어떻게 도시의 영화적 이미지가 창조되고, 관객들이 이미지를 해석하며, 어떻게 도시의 이런 이미지가 결과적으로 관객들이 도시를 상상하는 방식을 조건화하...",
      "keyword": "전후 영화, 전통과 근대성의 이분법, 국가 정체성(National identity), ‘동양적(Oriental)’이라는 범주",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001955952"
    }
  ],
  "2011": [
    {
      "author": "마이크 더글라스",
      "inst": "University of Hawaii",
      "title": "동아시아 지역내 지구화되는 도시와 경계초월 도시 네트워크: 부산-후쿠오카 \"공동생활구역(common living sphere)\" 사례 연구",
      "abstract": "도시간 장거리 네트워크는 역사적으로, 민족국가 성립보다 훨씬 이전에 등장했다. 현재, 21세기로 접어들면서 도시들은 다시금 세계적으로 연계됨으로써 국가 경계의 종속으로부터 풀려나기 시작했다. 그러나 이 과정은 극도의 불균등한 과정으로 진행되고 있다. 상대적으로 적은 몇 안되는 메가-도시지역(mega-urban region)만이 글로벌 경제의 중심 역할을 하고 있는 동시에 그 도시에서 국가 시스템을 장악하고 있다. 다른 많은 도시들은 심각한 경제 침체와 심지어 인구 감소를 경험하고 있다. 크건 작건 모든 도시들은 선출된 정부의 공적 ...",
      "keyword": "지구화, 도시 네트워크, 경계초월, 공동생활구역",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001955568"
    },
    {
      "author": "송 쭈안요우",
      "inst": "상해사회과학원 (중국)",
      "title": "영안백화점과 상해 모던 시대의 생활 트렌드",
      "abstract": "본 연구는 영안백화점과 근대 상해의 생활양식을 탐구한다. 근대 상해는 소비 영역에 있어서 도시 모더니티가 극명히 드러나던 시기였다. 상해에서 여성복은 고상하고 자연스러웠는데, 특히 여성스러운 신체의 매력을 강조하였다. 서양 과학기술의 산물인 라디오, 사진기, 축음기, 전화기 등이 사치품에서 일용품으로 변화하면서 사람들의 오락, 여가, 교제 방식 등이 바뀌었다. 특히 국내외 여행에 대한 열기는 세계를 이해하는 창을 열어주고 시야를 확대하였다. 오랫동안 중고가격의 상품 판매를 중심으로 했던 영안백화점은 난징로[南京路]의 번영과 화려한 ...",
      "keyword": "상해, 영안백화점, 도시 모더니티, 생활 트렌드",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001955570"
    },
    {
      "author": "진 따루",
      "inst": "상해사회과학원 (중국)",
      "title": "중국의 ‘두 도시 이야기’ - 1966년 9월의 사건으로 예증하다",
      "abstract": "이 논문은 북경, 상해 두 도시에서 전개된 문화대혁명의 전개 양상을 비교적으로 검토했다. 필자는 이 글에서 특히 문화대혁명에서 나타난 폭력성의 근원이 지역적으로 북경에서 시작되었으며, 아울러 그 전개 양상이 혁명 역사에서 연원한 폭력의 전통, 교육의 결핍 광장의 효과와 현장의 심리상태 등에 의해서 크게 좌우되었음을 밝히고 있다. 그는 이어서 결론적으로 문화대혁명의 전개 양상에는 두 도시 간의 지역문화 차이가 긴밀히 작용했다고 설명한다. 이는 문화대혁명에 대한 분석에서 도시의 지역정치 차원에서 미시적인 접근이 필요하다는 점을 인식하게...",
      "keyword": "중국, 북경, 상해, 문화대혁명, 홍위병, 지역정치, 지역문화",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001955572"
    },
    {
      "author": "마르쿠스 쉴레커",
      "inst": "막스플랑크연구소 (독일)",
      "title": "“그땐 그랬어!” - 개혁 이전 시기 기술적 기념품과 1990년대 후반 하노이의 가족 개성화",
      "abstract": "우리는 기념품을 비망록 곧 우리의 기억을 일깨워주고 우리의 마음속에 저장되어 있는 과거 경험의 회상을 도와주는 것으로 생각하곤 한다. 보통 우리는 기억을 그 기념품을 소유하고 있는 이의 마음속에 위치시킨다. 그러나 만약 사람들이 기억을 그 기념품 자체 안에 저장해 두었다면 어떻게 될까? 기념품을 소유한 사람과 그의 회상 사이의 이러한 관계는 처음에 어떻게 해서 생겨난 것일까? 1990년대 후반 베트남의 도시들에 있어 동유럽 혹은 남베트남으로부터 도입된 기술은 때로 그 자체가 가족들에 의해 기념품들로 탈바꿈되어, 그러한 기술을 집으로...",
      "keyword": "기억술, 기술적 기념품, 가족 개성화",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001955593"
    },
    {
      "author": "도루 야마모리",
      "inst": "도시샤대학교 (일본)",
      "title": "하나인 다중(UNA SOLA MOLTITUDINE): 기본소득을 위한 투쟁 그리고 이탈리아, 영국 및 일본에서 도출된 공통 논리",
      "abstract": "이 글의 주장은 다음과 같다. 먼저 이 요구를 둘러싼 최근의 학문적 담론을 소개할 것이다(2절). 이를 통해 하트와 네그리의 비판자들이 지닌 오해를 지적할 것이다. 이후 1970년대 이탈리아의 투쟁을 잠시 언급하면서 하트와 네그리의 주장을 소개할 것이다(3절). 다음 기본소득을 둘러싼 몇몇 회의적 시각을 검토할 것이다(4절). 기본소득은 제국의 책략인가? 그럴 수도 있으며, 그렇기 때문에 기본소득 도입의 맥락이 매우 중요하다. 이 점에서 우리는 기본소득을 위한 투쟁에서 배울 점이 많다. 이러한 사례로 영국(5절)과 일본(6절)의 경...",
      "keyword": "기본소득, 네그리, 아우토노미아, 다중, 클레멘트 조합, 푸른잔디",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001955537"
    }
  ],
  "2010": [
    {
      "author": "도루 야마모리",
      "inst": "도시샤대학교 (일본)",
      "title": "잊혀진 여성들: 기본소득을 위한 싱글맘의 잊혀진 투쟁",
      "abstract": "최근 10년 동안 기본소득 연구는 “페미니스트들이 기본소득을 지지해야 하는가?”라는 논쟁을 진행 중이다. 내가 의아한 점은 이 논쟁에서 과거에 기본소득을 주장했던 페미니스트 운동에 대한 언급은 전혀 없다는 것이다. 이 글은 두 가지 목적을 가지고 있다. 가장 중요한 첫 번째 목적은 현재 학계에서 사라져버린 영국의 운동 역사를 드러내는 것이다. 그들의 목소리를 집단적 망각에서 구해내려 한다. 두 번째 목적은 기본소득을 연구하는 학계에서 왜 싱글맘의 목소리는 무시되어 왔는지 밝히는 것이다. 잊혀진 그들의 목소리를 되살리는 것은 그 자체...",
      "keyword": "싱글맘, 기본소득, 여성주의, 청구인연합",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001955211"
    },
    {
      "author": "브렌다 S.A. 여",
      "inst": "싱가포르국립대학교 (싱가포르)",
      "title": "코스모폴리스에서의 인재/노동/결혼 이주 : 싱가포르의 국가체제와 시민사회 발전",
      "abstract": "아시아 전역의 여러 글로벌화 된 도시 속에서, 이제 이주는 노동력 부족, 고령화 인구, 경쟁적인 경제 문제를 해결하기 위한 핵심 조치로서 조망되고 있다. 싱가포르는 고숙련 노동이주와 저숙련 노동이주 두 가지 모두에 대한 의존도가 증가하고 있을 뿐만 아니라, 글로벌 경제에서 주요한 위치를 차지하는 코스모폴리스가 되고자 하는 열망 속에 결혼이주도 점점 증가하고 있다. 이제싱가포르는 이런 경향의 도시국가의 주요 사례로 부상하고 있다. 이 논문은국가와 시민사회가 서로 다른 정도와 서로 다른 방식으로 코스모폴리타니즘의 출현에 기회와 제약을 ...",
      "keyword": "이주, 코스모폴리스, 싱가포르, 다인종",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001955226"
    },
    {
      "author": "무라이 히로시",
      "inst": "가나가와대학교 (일본)",
      "title": "민국(民國) 시기 상해에서의 언론과 광고",
      "abstract": "이 글에서는 1920, 30년대 상해에서의 언론(특히 신문)과 광고의 관계를 상술하고 중국에서 매체-사회의 관계에 대한 인식이 어떻게 변화했는가에 관해검토했다. 이 시기 상해의 신문들은 그 발행 부수가 증가됨에 따라 광고에의의존도가 높아지면서, 신문이 광고를 위한 매체라는 점이 강하게 의식됐다. 이러한 경향은 신문의 구성과 운영을 광고 중심으로 만들어 버렸다. 이러한상황 하에서 언론 내부의 권력관계에서도 변화가 발생했던 바, 정치권력과의관계뿐만 아니라 광고회사 및 광고주와의 관계 역시 중요해졌다. 이는 상업자본에 의한 매체 통제로 ...",
      "keyword": "상하이, 매체, 언론, 광고, 공론장",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001955229"
    },
    {
      "author": "료코 미야시타",
      "inst": "오사카시립대학교 (일본)",
      "title": "경계를 넘는 샤머니즘 : 재일 한국인 1세대 여성의 사례 연구",
      "abstract": "K의 사례, 민속의상을 만드는 “경험”이나 재일 한국인들의 다문화적 상황(음식, 의복, 그리고 평소 생활하는 거주지 등에서 나타나는 혼합양상)은 민족적정체성을 초월하는 그 무엇과 함께 탄생한다. 다른 말로 하자면, 언어, 의식(제사), 그리고 의식에서 사용되는 기술들은 한국적인 맥락을 이루지만, 그러한 종교의식의 대상이 되는 망자의 혼, 뱀신, 조상, 우물신, 악령 등은 일본적 맥락을 이룬다. 이러한 사례는 양자가 서로 혼합하여 새로운 샤머니즘을 창조한 예이다. 근대 민족국가 이전, 사람들의 행위와 삶에 직접 맞닿아 있는 인간 세계...",
      "keyword": "샤머니즘, 넘어섬, 민족경계, 민족성, 재일 한국인 1세대, 후세대 한국인, 민족국가",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001955232"
    },
    {
      "author": "왕 웨이지앙",
      "inst": "상해사회과학원 (중국)",
      "title": "Der Ostaisatische Lloyd(『德文新報』)와 상해 거류 독일인",
      "abstract": "『Der Ostasiatische Lloyd』는 상해 거류 독일인들이 1886-1917년간 상해에서 발간했던 동아시아에서 가장 오래된 독일 신문이다. 이 신문은 주로 동아시아 지역에 유통되었으며 독일에도 독자가 있었다. 그 만큼 사회적으로 큰영향력을 발휘했다. 이는 정치, 경제 뉴스뿐만 아니라 중국과 동아시아의 문화, 역사를 포함해 광범위한 정보를 다루었다. 또한 독일 외교관, 상인 그리고 독일어를 사용하는 사람들을 하나로 묶어 종교적, 문화적 활동을 함께 하도록 만들어주었다.",
      "keyword": "덕문일보, 독일거류민, 문화 활동, 상하이",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001955240"
    },
    {
      "author": "마이크 더글라스",
      "inst": "University of Hawaii",
      "title": "전지구적 가구화(global householding)의 관점에서 본 한국, 일본, 대만의 이주와 사회 변화에 관하여",
      "abstract": "한국과 대만, 그리고 일본에서 가구를 형성하고 유지하는 일이 위기에 봉착했다. 최근 이혼율뿐만 아니라 결혼이 늦어지거나 아예 결혼하지 하지 않는 인구의 비율이 증가하고 있다. 출생률 역시 인구 대체율을 밑돌고 있다. 세대 간 연속성과 어린이와 노인을 돌보는 것 역시 심각한 문제로 대두되고 있다. 사회 도처에 걱정의 목소리가 높아지고 있으며 노동력과 국가 인구의 절대적 감소, 인구의 신속한 고령화 및 국가의 사회 복지 체제에 대한 의존도가 높아지고 있어 사회 복지 체제 자체를 위협한다. 이러한 국가적 불행에 대응하기 위해 가구는 전지...",
      "keyword": "전지구적 가구, 일본, 대만, 한국, 국가",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001955209"
    },
    {
      "author": "강재호",
      "inst": "NYU (미국)",
      "title": "미디어 공간의 원사(原史): 발터 벤야민과 19세기 파리의 정보 산업",
      "abstract": "우선 이 논문은 19세기 파리에서의 도시공간의 사유화, 공공 커뮤니케션의 산업화 그리고 공적 공간의 미디어화와 관련해 미디어 공간으로서의 신문에 대한 발터 벤야민의 분석을 다룬다. 나는 어떻게 정보산업이 문학적 실천, 지적 행위 그리고 새로운 사회적 주체의 형성에 있어서 근본적인 변화를 야기했는지를 보여주고자 한다. 또한 나는 19세기의 미디어 공간의 복합적인 역동에 대한 벤야민의 풍부한 예증이 어떻게 부르주아적 공공영역의 분석에 근거한 과도한 단순화의 결함을 회피하는지 입증할 것이다. 이를 통해 나는 신문에 대한 벤야민의 비판적 ...",
      "keyword": "미디어 공간, 판타스마고리아, 도시공간, 스펙터클, 이야기하기, 정보, 신문, 커뮤니케이션, 미디어화한 공적 공간",
      "url": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART001955207"
    }
  ]
};

// [섹션 04 패널 2] 인용 매트릭스
const CITATION_MATRIX_DATA = {
  // y: [from UOS, from Non-UOS], x: [to UOS, to Non-UOS]
  // data format: [x, y, value]
  data: [
    [1, 1, 64], // from UOS to UOS
    [0, 1, 12], // from UOS to Non-UOS
    [1, 0, 21], // from Non-UOS to UOS
    [0, 0, 55]  // from Non-UOS to Non-UOS
  ]
};

// [섹션 04 패널 3] 피인용 TOP 10 논문
const TOP_CITED_DATA = [
  { rank: 1, author: '허경', title: "미셸 푸코의 '헤테로토피아'\n[도시인문학연구]", cites: 66, type: '외부' },
  { rank: 2, author: '신승원', title: "르페브르의 공간 이론\n[도시인문학연구]", cites: 27, type: '시립대' },
  { rank: 3, author: '강은교·김은주', title: "한국 SF와 페미니즘\n[여성문학연구]", cites: 21, type: '시립대' },
  { rank: 4, author: '유인혁', title: "한국 웹소설 판타지\n[대중서사연구]", cites: 20, type: '시립대' },
  { rank: 5, author: '홍준기', title: "벤야민과 도시경험\n[현대정신분석]", cites: 18, type: '시립대' },
  { rank: 5, author: '남기범', title: "창조도시 비판적 성찰\n[도시인문학연구]", cites: 18, type: '시립대' },
  { rank: 5, author: '이중원', title: "빅데이터의 철학적 문제들\n[도시인문학연구]", cites: 18, type: '시립대' },
  { rank: 8, author: '임옥희', title: "혐오발언, 혐오감\n[도시인문학연구]", cites: 16, type: '외부' },
  { rank: 8, author: '이승일·장윤정', title: "문화자본과 취향분화\n[도시인문학연구]", cites: 16, type: '시립대' },
  { rank: 8, author: '김소라·이병민', title: "인문학적 도시재생\n[문화역사지리]", cites: 16, type: '외부' }
];

const TOP10_KEYWORDS_DATA = [
  "헤테로토피아, 공간, 지리학, 문화, 칸트, 하비",
  "르페브르, 공간의 생산, 변증법, 공간정치, 몸, 도시사회",
  "키워드 정보가 없습니다.", // 강은교·김은주
  "웹소설, 네트워크화된 개인, 기계적 예속, 다망감시, 관심경제, 포스트 아포칼립스, 사이보그",
  "벤야민, 정신분석, 라깡, 아우라, 도시, 도시경험, 시선, 촉각적 경험, 상실, 충격",
  "창조도시론 비판, 도시정책, 도시경제성장, 포스트포디스트 도시, 창조성, 리처드 플로리다",
  "지능정보사회, 빅데이터, 지향적 속성, 상관관계, 정보 존재론, 구조 실재론, 정보 인식론, 과학지식의 상의 변화, 프라이버시, 투명성, 동의, 정체성, 자율성, 소유권, 책임, 책무, 분산된 도덕성, 분산된 책임성, 다중 행위자, 빅데이터 윤리학, 빅데이터 거버넌스, 담화윤리",
  "혐오발언, 주권적 주체, 혐오감, 주이상스, 타자로서 이웃",
  "문화자본, 부르디외(Bourdieu), 여가활동, 문화적 취향, 취향분화",
  "도시재생, 산업유산, 산책자, 체험, 흔적"
];

// [섹션 05 패널 1] 피인용 학술지 분포 트리맵
const CITATION_FIELD_DATA = [
  { name: '기타인문학', value: 27, category: 'humanities' },
  { name: '한국어와문학', value: 26, category: 'humanities' },
  { name: '학제간연구', value: 9, category: 'humanities' },
  { name: '지리학', value: 6, category: 'urban' },
  { name: '역사학', value: 6, category: 'humanities' },
  { name: '중국어와문학', value: 5, category: 'humanities' },
  { name: '교육학', value: 5, category: 'other' },
  { name: '관광학', value: 5, category: 'other' },
  { name: '철학', value: 4, category: 'humanities' },
  { name: '행정학', value: 4, category: 'other' },
  { name: '예술일반', value: 3, category: 'other' },
  { name: '기타지리학', value: 2, category: 'urban' },
  { name: '체육', value: 2, category: 'other' },
  { name: '문헌정보학', value: 2, category: 'other' },
  { name: '디자인', value: 2, category: 'other' },
  { name: '중국문화학', value: 2, category: 'humanities' },
  { name: '기타교육학', value: 2, category: 'other' },
  { name: '경제학', value: 2, category: 'other' },
  { name: '인문지리학', value: 1, category: 'urban' },
  { name: '건축공학', value: 1, category: 'urban' },
  { name: '공학일반', value: 1, category: 'urban' },
  { name: '도시개발/계획', value: 1, category: 'urban' },
  { name: '실내환경디자인', value: 1, category: 'urban' },
  { name: '기타(17개 분야)', value: 19, category: 'other' }
];

// [섹션 05 패널 2] 논문별 피인용 분포
const PAPER_CITATION_BREAKDOWN = {
  papers: [
    '허경 (푸코)', 
    '신승원 (공간이론)', 
    '강·김 (SF/페미니즘)', 
    '유인혁 (웹소설)', 
    '홍준기 (벤야민)', 
    '남기범 (창조도시)', 
    '이중원 (빅데이터)',
    '임옥희 (혐오발언)',
    '이·장 (문화자본)',
    '김·이 (도시재생)'
  ],
  urban: [2, 3, 0, 0, 1, 6, 0, 0, 0, 5],       // 도시/공간 관련 인용
  major: [20, 8, 12, 11, 6, 3, 2, 5, 4, 5],     // 주요 전공 분과 인용
  other: [44, 16, 9, 9, 11, 9, 16, 11, 12, 6]    // 기타 분야 인용
};
