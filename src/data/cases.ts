export interface CaseItem {
  id: string
  title: string
  file: string // public/cases 下的文件名
  date: string
  category: string
  methods: string[]
  summary: string
  highlight: string
}

export const CATEGORIES = [
  '全部',
  '用户画像与需求',
  '转化与留存',
  'NPS 与体验管理',
  '竞品与市场',
  '产品测试与卖点',
  '课堂体验分析',
] as const

export const cases: CaseItem[] = [
  {
    id: 'chushu-good-class',
    title: '初中数学长期班「一堂好课」研究',
    file: 'chushu-good-class.pdf',
    date: '2021.05',
    category: '课堂体验分析',
    methods: ['录像观察法', '深度访谈'],
    summary:
      '观察头部与中部主讲学生的课中行为差异，并结合课后访谈，提炼菁英班"一堂好课"的特征，回答"一堂好课的标准是什么"。',
    highlight: '输出"一堂好课"标准，为主讲培养与课程质量评估提供标尺',
  },
  {
    id: 'chushu-demo-flow',
    title: '初中数学暑期 demo 课访谈 + 心流分析',
    file: 'chushu-demo-flow.pdf',
    date: '2021.07',
    category: '课堂体验分析',
    methods: ['学生访谈', '心流分析', '录像观察'],
    summary:
      '对 32 名学生的访谈与 26 份合格课堂录像进行心流分析，还原 demo 课中学生体验的高点与低点，定位影响转化与喜爱的体验管理环节。',
    highlight: '将心流模型引入课堂体验诊断，识别 demo 课关键体验点',
  },
  {
    id: 'mot',
    title: '剑桥长期班红黑用户 MOT 挖掘',
    file: 'mot.pdf',
    date: '2025.10',
    category: 'NPS 与体验管理',
    methods: ['语料分析', 'MOT 关键时刻', 'NPS'],
    summary:
      '从 60 名推荐者与 80 名贬损者的班主任首月聊天记录中提取 165 条 MOT，系统梳理推荐点与贬损点，定位体验短板板块。',
    highlight: '165 条 MOT 语料，直接推动课程真人感、附课冗余等核心问题改进',
  },
  {
    id: 'nps-review',
    title: '系统班 NPS 回顾与影响因子分析',
    file: 'nps-review.pdf',
    date: '2024.10',
    category: 'NPS 与体验管理',
    methods: ['随机森林', '归因建模', 'NPS'],
    summary:
      '引入随机森林特征重要性分析，量化学生行为与感受指标对 NPS 的解释力，发现"孩子喜爱程度"是第一驱动因子（52.7%），并识别不同级别的差异化驱动因素。',
    highlight: '从"监测 NPS"进阶到"做什么能提高 NPS"的落地指导',
  },
  {
    id: 'monthly-forum',
    title: '月度用户座谈会机制（小高场）',
    file: 'monthly-forum.pdf',
    date: '2025.07',
    category: 'NPS 与体验管理',
    methods: ['座谈会', '机制建设'],
    summary:
      '为解决业务决策中用户声音缺位、滞后的问题，建立月度座谈会机制，覆盖产品运营、留存运营负责人，让业务方持续获得用户体感。',
    highlight: '从零建立的常规用户接触机制，成为业务决策的固定输入',
  },
  {
    id: 'word-bao',
    title: '趣拼单词宝体验调研',
    file: 'word-bao.pdf',
    date: '2025.11',
    category: 'NPS 与体验管理',
    methods: ['学生访谈', '体验诊断'],
    summary:
      '针对单词宝完成率随上课周期延长持续走低的问题，访谈低打开率学生，从意识层面（非必做项）与提醒层面（缺少触点）定位原因并给出改进方案。',
    highlight: '定位"必做感缺失+提醒触点缺失"双因，输出产品规划建议',
  },
  {
    id: '299-persona',
    title: '299 转化与未转化用户画像',
    file: '299-persona.pdf',
    date: '2025.03',
    category: '用户画像与需求',
    methods: ['K 值聚类', '问卷定量', '用户分群'],
    summary:
      '基于城市线、参培情况、报班目的、产品核心因素、续报意愿等维度聚类，划分三大用户群，回答"谁会报、谁不报、谁在犹豫"。',
    highlight: '聚类分群直接支撑转化策略与人群定向',
  },
  {
    id: 'ket-persona',
    title: 'KET 课用户画像',
    file: 'ket-persona.pdf',
    date: '2024.11',
    category: '用户画像与需求',
    methods: ['用户分群', '需求洞察', '新品立项'],
    summary:
      '按 KET 考试目标与备考强度接受度，将用户分为路线依赖型、路标确认型、冲击名校型三类，以多源证据论证"考级只是少部分用户诉求，提前学才是核心需求"。',
    highlight: '为 KET 新产品线立项提供核心需求依据',
  },
  {
    id: '299-buy',
    title: '同步 299 用户的购买点是什么',
    file: '299-buy.pdf',
    date: '2025.05',
    category: '用户画像与需求',
    methods: ['深度访谈', '卖点提炼'],
    summary: '通过用户访谈还原同步 299 用户的画像与真实购买动因，提炼潜在卖点，为前端宣传与转化话术提供输入。',
    highlight: '从用户原声中提炼可落地的转化卖点',
  },
  {
    id: 'tongbu-need',
    title: '同步学用户需求调研',
    file: 'tongbu-need.pdf',
    date: '2024.08',
    category: '用户画像与需求',
    methods: ['问卷定量', '聚类分析', '用户画像'],
    summary:
      '50 万用户 push 投放回收问卷，聚类得到四类用户，识别出同步课核心人群为"低线进取家长"，明确其"打基础、应试"诉求与拔高课人群的本质差异。',
    highlight: '明确同步线核心人群定位，支撑产品线 2.0 规划',
  },
  {
    id: 'story-line',
    title: '孩子喜欢的故事线调研',
    file: 'story-line.pdf',
    date: '2026.03',
    category: '用户画像与需求',
    methods: ['问卷定量', '内容偏好'],
    summary:
      'N=452 学生问卷，按年级与性别拆解孩子的故事/动画偏好（小低热闹爱笑、小中奇幻想象、小高复杂推理；男生打怪升级、女生情感成长），为教研选故事线串联课程提供数据支撑。',
    highlight: '偏好图谱直接用于课程内容设计',
  },
  {
    id: '0yuan-low',
    title: '0 元课小低转率为什么低',
    file: '0yuan-low.pdf',
    date: '2025.06',
    category: '转化与留存',
    methods: ['数据分析', 'NPS 看板', '归因分析'],
    summary:
      '整合 NPS 看板与学情问卷数据，定位春 16 期后转率下滑原因（吸引高年级英语基础差学生），并识别出量大利薄的小低 3 起点用户为重点改善对象。',
    highlight: '多数据源交叉归因，定位转率下滑真因',
  },
  {
    id: 'zipin-low',
    title: '自拼 1000 词转率低调研',
    file: 'zipin-low.pdf',
    date: '2025.11',
    category: '转化与留存',
    methods: ['用户访谈', '用户分群', '转化策略'],
    summary:
      '针对用户量大但转率低的自拼 1000 词，划分用户类型并识别高潜人群（自律学霸型、自学启蒙型），输出高转化卖点与前端筛选策略。',
    highlight: '识别高潜用户特征，提出前端筛选与话术建议',
  },
  {
    id: 'refund-corpus',
    title: '剑桥长期班退费用户语料分析',
    file: 'refund-corpus.pdf',
    date: '2025.09',
    category: '转化与留存',
    methods: ['语料分析', '问卷定量', 'MOT'],
    summary:
      '结合 118 人问卷与退费用户聊天记录，发现"难度/级别不合适"与"录播课"是主要退费原因，识别出直购用户"选级别"与"试听"两个体验 MOT 洼地。',
    highlight: '定位退费链路两个体验洼地，推动流程优化',
  },
  {
    id: 'renewal-mapping',
    title: '用户数据与剑桥续报的映射关系',
    file: 'renewal-mapping.pdf',
    date: '2025.12',
    category: '转化与留存',
    methods: ['行为数据分析', '相关性建模'],
    summary:
      '将课堂行课数据、阶段测成绩、开口次数等行为指标与续报结果映射，识别未续报课包的共性信号（行课表现不佳、阶段测难度过大等），为续报预警提供依据。',
    highlight: '建立行为数据→续报结果的映射，支撑续报预警',
  },
  {
    id: 'mid-price',
    title: '中价品调研（作业帮满分英语）',
    file: 'mid-price.pdf',
    date: '2025.12',
    category: '竞品与市场',
    methods: ['问卷定量', '竞品分析'],
    summary:
      '对比满分英语大通关与学而思剑桥英语的产品心智与卖点评价，解析竞品"可自学的系统课"心智的吸引力来源，为中价品升级提供支持。',
    highlight: '拆解竞品心智定位，支撑中价品升级决策',
  },
  {
    id: 'zyb-interview',
    title: '作业帮竞品用户座谈会',
    file: 'zyb-interview.pdf',
    date: '2025.05',
    category: '竞品与市场',
    methods: ['焦点小组', '竞品分析'],
    summary: '组织作业帮在读用户座谈会，挖掘孩子痛点与被竞品吸引的关键点，为同步线前端宣传提炼差异化话术。',
    highlight: '竞品吸引点直接转化为前端宣传策略',
  },
  {
    id: 'competitor-forum',
    title: '小低英语竞品座谈会调研',
    file: 'competitor-forum.pdf',
    date: '2024.06',
    category: '竞品与市场',
    methods: ['焦点小组', '竞品分析', '卖点测试'],
    summary:
      '以斑马等竞品用户为对象，挖掘竞品的产品之美与不足，找到学而思英语的差异化定位，并测试高势能卖点的用户感知与打动人的表述方式。',
    highlight: '明确品牌差异化定位与高势能卖点表述',
  },
  {
    id: 'offline-orgs',
    title: '线下英语机构调研',
    file: 'offline-orgs.pdf',
    date: '2025.09',
    category: '竞品与市场',
    methods: ['深度访谈', '跨城市调研'],
    summary:
      '走访重庆、济南、成都、广州等地线下英语机构在读用户，回答"线下用户为什么选择线下"，提炼线下机构亮点，为剑桥 3.0 设计提供借鉴。',
    highlight: '四城线下格局扫描，输入剑桥 3.0 设计',
  },
  {
    id: 'chongqing',
    title: '城市走访·重庆',
    file: 'chongqing.pdf',
    date: '2026.01',
    category: '竞品与市场',
    methods: ['城市走访', '入户观察', '市场洞察'],
    summary:
      '重庆城市走访：还原本地教培供给特点与家长偏好（参培率高但不卷考试、为初中预留时间的"提前学"心态），识别 1 年级英语入口年级等结构性机会。',
    highlight: '城市级市场洞察，支撑区域化策略',
  },
  {
    id: 'manfen-math',
    title: '满分数学标杆研究',
    file: 'manfen-math.pdf',
    date: '2024.03',
    category: '竞品与市场',
    methods: ['深度访谈', '定量验证', '标杆研究'],
    summary:
      '研究抖音场崛起的明星产品满分数学：发现其 PMF 点清晰（校内有余但思维不够"灵活"的普娃家长）及人设营销的成功要素，并沉淀"学生/家长-产品-营销"三角研究框架。',
    highlight: '为对标产品设计方向提供关键参考，方法论沉淀复用',
  },
  {
    id: 'course-test',
    title: '299 同步线全链路课程测试',
    file: 'course-test.pdf',
    date: '2025.05',
    category: '产品测试与卖点',
    methods: ['测课', '可用性测试'],
    summary: '组织二年级学生全链路测课，在课程上线前验证教学设计有效性，识别有效与无效设计，输出迭代建议。',
    highlight: '测课机制嵌入课程迭代流程，上线前拦截体验问题',
  },
  {
    id: 'selling-point',
    title: '同步线 299 卖点及名称调研',
    file: 'selling-point.pdf',
    date: '2025.03',
    category: '产品测试与卖点',
    methods: ['问卷定量', '卖点测试'],
    summary:
      '抖音渠道投放测试卖点吸引力：TOP 卖点为兴趣与自信，其次校内衔接与口语；单纯词汇卖点吸引力不足。输出分年级卖点优先级（低年级重口语、高年级重校内）。',
    highlight: '卖点优先级排序直接用于前端投放',
  },
  {
    id: 'ip-collab',
    title: 'IP 产品联名调研（2~8 岁）',
    file: 'ip-collab.pdf',
    date: '2024.04',
    category: '产品测试与卖点',
    methods: ['问卷定量', '溢价测试', 'IP 策略'],
    summary:
      '评估奥特曼等 IP 联名对思维机、图书的市场撬动比例、方案偏好与可接受溢价范围，明确"IP 联名是锦上添花的魅力因素而非期望因素"的策略定位。',
    highlight: '量化 IP 联名溢价空间，指导联名选品与定价',
  },
]
