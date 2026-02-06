"use client"

// 1. 使用者與基本狀態
export const currentUser = {
  name: "張瑞文",
  role: "工地負責人",
  roleId: "supervisor",
  avatar: "張",
  gender: "男",
  birthDate: "1985-08-12",
  address: "高雄市鳳山區光復路二段...",
  email: "zhang_rw@heritage.gov.tw",
  phone: "0912-345-678",
  education: {
    school: "國立成功大學",
    major: "建築學系",
    degree: "學士",
    gradYear: "2007"
  }
}

// 2. 公告資訊
export const announcements = [
  { id: "ANN-001", type: "錄取公告", title: "114 年度「古蹟修復工程工地負責人培訓班(中區)」錄取名單公告", date: "2026-02-01", important: true, imageUrl: "/images/announcement-01.jpg" },
  { id: "ANN-002", type: "報名公告", title: "114 年度第一梯次古蹟修復工程工地負責人回訓課程開始報名", date: "2026-01-25", important: false, imageUrl: "/images/announcement-02.jpg" },
  { id: "ANN-003", type: "系統通知", title: "【重要】人才資歷查詢系統優化更新通知", date: "2026-01-20", important: false, imageUrl: "/images/announcement-03.jpg" },
  { id: "ANN-004", type: "成績公告", title: "113 年度第 42 期培訓班結訓測驗成績查詢開放", date: "2026-01-15", important: true, imageUrl: "/images/announcement-01.jpg" },
]

// 5. 工地負責人/人才庫 (加入機關註記資訊)
const baseSupervisors = [
  {
    id: "SUP-001",
    name: "張瑞文",
    idNumber: "A123456789",
    gender: "男",
    birthDate: "1985-08-12",
    email: "zhang_rw@heritage.gov.tw",
    phone: "0912-345-678",
    education: "國立成功大學 建築學系 (學士)",
    certNo: "文授資局蹟字第1103001234-01 號",
    certDate: "2022-06-15",
    certExpiryDate: "2026-06-14",
    qualification: "工地負責人",
    yearsOfExperience: 12,
    retrainingHours: 24,
    requiredRetrainingHours: 36,
    status: "有效",
    workItems: ["木作", "泥作", "瓦作"],
    secondaryCerts: [
      { name: "公共工程品質管理訓練班", id: "EE110-20234" },
      { name: "營造業乙級職業安全衛生管理技術士", id: "103-009876" }
    ],
    projects: [
      { id: "P001", projectName: "台南孔子廟大成殿修護工程", status: "進行中", heritageType: "國定古蹟", role: "工地負責人", period: "2024-05 ~ 至今" },
      { id: "P002", projectName: "屏東縣定古蹟阿猴城門修復計畫", status: "已竣工", heritageType: "縣(市)定古蹟", role: "副負責人", period: "2022-01 ~ 2023-06" },
      { id: "P003", projectName: "高雄市歷史建築打狗英國領事館館邸外牆維修", status: "已竣工", heritageType: "歷史建築", role: "現場工程師", period: "2020-08 ~ 2021-04" }
    ],
    officialRemarks: [
      { type: "獎勵", content: "曾獲 112 年度文化資產優秀從業人員獎", date: "2023-05-20" }
    ],
    retrainingLogs: [
      { id: "L001", name: "文化資產數位技術與工地安全管理研習", type: "實務研習", hours: 8, date: "2025-11-03", status: "已核備" },
      { id: "L002", name: "傳統木構造修復實務進階班", type: "專題講座", hours: 16, date: "2024-06-10", status: "已核備" }
    ]
  },
  {
    id: "SUP-002",
    name: "林志誠",
    idNumber: "B198765432",
    certNo: "文授資局蹟字第1093005678-05 號",
    certDate: "2021-05-20",
    certExpiryDate: "2025-05-19",
    qualification: "工地負責人",
    yearsOfExperience: 8,
    retrainingHours: 36,
    requiredRetrainingHours: 36,
    status: "有效",
    workItems: ["石作", "彩繪"],
    projects: [
       { id: "P201", projectName: "鹿港龍山寺彩繪修復", status: "已竣工", heritageType: "國定古蹟", role: "工地負責人", period: "2023-01 ~ 2024-01" },
       { id: "P202", projectName: "新竹州廳外牆維護", status: "已竣工", heritageType: "國定古蹟", role: "工地負責人", period: "2021-06 ~ 2022-06" }
    ],
    officialRemarks: [
      { type: "回訓", content: "系統自動提醒：請於三個月內完成外部時數申報", date: "2026-02-01" }
    ]
  },
  {
    id: "SUP-003",
    name: "陳建宏",
    idNumber: "C122334455",
    certNo: "文授資局蹟字第1083002233-02 號",
    certDate: "2020-01-10",
    certExpiryDate: "2024-01-09",
    qualification: "工地負責人",
    yearsOfExperience: 15,
    retrainingHours: 12,
    requiredRetrainingHours: 36,
    status: "已過期",
    workItems: ["瓦作"],
    projects: [
       { id: "P301", projectName: "金門縣定古蹟邱良功母節孝坊修復", status: "已竣工", heritageType: "國定古蹟", role: "副負責人", period: "2019-01 ~ 2020-01" }
    ],
    officialRemarks: [
      { type: "停止執行業務", content: "因證書過期，暫停古蹟修復工地負責人執業權限", date: "2024-01-10" }
    ]
  }
];

export const supervisors = [
  ...baseSupervisors,
  ...Array.from({ length: 93 }, (_, i) => {
    const types = ["國定古蹟", "直轄市定古蹟", "縣(市)定古蹟", "歷史建築", "紀念建築"];
    const works = ["泥作", "木作", "瓦作", "石作", "彩繪"];
    const projCount = (i % 3) + 1;
    
    return {
      id: `SUP-${(i + 4).toString().padStart(3, '0')}`,
      name: ["王", "李", "趙", "錢", "孫"][i % 5] + ["大明", "志強", "美玲", "淑芬", "嘉文"][i % 5],
      idNumber: "D1" + Math.random().toString().slice(2, 11),
      certNo: `文授資局蹟字第${110 - (i % 5)}300${5000 + i}-0${(i % 3) + 1} 號`,
      certDate: `202${1 + (i % 3)}-0${(i % 9) + 1}-15`,
      certExpiryDate: `202${5 + (i % 3)}-0${(i % 9) + 1}-14`,
      qualification: "工地負責人",
      yearsOfExperience: 5 + (i % 20),
      retrainingHours: (i * 7) % 40,
      requiredRetrainingHours: 36,
      status: (i * 7) % 40 >= 36 ? "有效" : "回訓中",
      workItems: [works[i % 5], works[(i + 1) % 5]],
      projects: Array.from({ length: projCount }, (_, pi) => ({
        id: `P-GEN-${i}-${pi}`,
        projectName: `模擬修復工程 ${i}-${pi}`,
        status: pi === 0 && i % 10 === 0 ? "進行中" : "已竣工",
        heritageType: types[(i + pi) % types.length]
      })),
      officialRemarks: i % 15 === 0 ? [{ type: "警告", content: "工程日誌紀錄不實，口頭告誡乙次", date: "2025-11-03" }] : []
    }
  })
];

export const officialStats = {
  total: 1332,
  withCert: 1215,
  pending: 117,
  yearlyDistribution: [
    { year: "107", count: 120 },
    { year: "108", count: 145 },
    { year: "109", count: 168 },
    { year: "110", count: 185 },
    { year: "111", count: 210 },
    { year: "112", count: 235 },
    { year: "113", count: 269 },
  ],
  certStatus: [
    { name: "有效證照", value: 1150, fill: "hsl(var(--success))" },
    { name: "需回訓", value: 82, fill: "hsl(var(--warning))" },
    { name: "已過期", value: 100, fill: "hsl(var(--destructive))" },
  ],
  experienceDistribution: [
    { range: "20年以上", count: 210, fill: "hsl(var(--chart-1))" },
    { range: "10-20年", count: 450, fill: "hsl(var(--chart-2))" },
    { range: "5-10年", count: 520, fill: "hsl(var(--chart-3))" },
    { range: "5年以下", count: 152, fill: "hsl(var(--chart-4))" },
  ]
}

export const trainingClasses = [
  { id: "TC-2026-001", name: "114 年度「古蹟修復工程工地負責人培訓班(中區)」", startDate: "2026-03-01", endDate: "2026-05-30", location: "台中市", capacity: 40, enrolled: 35, status: "報名中", fee: "15,000", organizer: "國立中興大學", requirement: "大專以上建築、土木相關科系畢業並具備3年實務經驗。" },
  { id: "TC-2026-002", name: "114 年度「古蹟修復工程工地負責人培訓班(北區)」", startDate: "2026-04-15", endDate: "2026-07-15", location: "台北市", capacity: 40, enrolled: 0, status: "即將開放", fee: "15,000", organizer: "國立台灣科技大學" },
  { id: "TC-2025-042", name: "113 年度「古蹟修復工程工地負責人培訓班(南區)」", startDate: "2025-09-01", endDate: "2025-11-30", location: "台南市", capacity: 40, enrolled: 40, status: "已結束", fee: "15,000" },
]

export const registrationApplications = [
  { id: "REG-2026-003", applicantName: "張瑞文", classId: "TC-2026-001", className: "114 年度「古蹟修復工程工地負責人培訓班(中區)」", status: "錄取", appliedDate: "2026-01-15", documents: ["身分證影本.pdf", "畢業證書.jpg", "工作證明.pdf"], reviewNotes: "資格符合", scores: null },
]

export const permissionModules = [
  {
    group: "前台使用者功能",
    items: [
      { id: "F1", name: "首頁公告檢視", key: "front.announcements" },
      { id: "F2", name: "培訓班線上報名", key: "front.training.reg" },
      { id: "F3", name: "錄取及候補查詢", key: "front.admission.search" },
      { id: "F4", name: "合格名單公告", key: "front.qualified.list" },
      { id: "F5", name: "個人基本資料管理", key: "front.profile.basic" },
      { id: "F6", name: "個人經歷維護", key: "front.profile.experience" },
      { id: "F7", name: "個人證照管理", key: "front.profile.certs" },
      { id: "F8", name: "回訓登錄申報", key: "front.profile.retraining" },
      { id: "F9", name: "機關註記查詢", key: "front.profile.remarks" },
      { id: "F10", name: "人才公開查詢", key: "front.talent.search" },
    ]
  },
  {
    group: "管理後台系統 (培訓管理)",
    items: [
      { id: "M1", name: "管理儀表板", key: "admin.dashboard" },
      { id: "M2", name: "培訓班場次維護", key: "admin.training.classes" },
      { id: "M3", name: "學員報名資格審核", key: "admin.training.review" },
      { id: "M4", name: "回訓時數核備審查", key: "admin.training.retraining" },
      { id: "M5", name: "成績判定與結果公告", key: "admin.training.announcements" },
    ]
  },
  {
    group: "管理後台系統 (人才庫管理)",
    items: [
      { id: "T1", name: "人才庫名冊總覽", key: "admin.talent.list" },
      { id: "T2", name: "行政處分/獎勵註記", key: "admin.talent.remarks" },
      { id: "T3", name: "進階條件查詢與匯出", key: "admin.talent.export" },
    ]
  },
  {
    group: "管理後台系統 (系統維護)",
    items: [
      { id: "S1", name: "帳號管理", key: "system.accounts" },
      { id: "S2", name: "角色權限設定", key: "system.permissions" },
      { id: "S3", name: "系統日誌查看", key: "system.logs" },
    ]
  }
]

export const systemRoles = [
  { id: "ROLE-001", name: "系統管理者", description: "擁有系統所有功能權限，包含帳號、角色與系統設定。", userCount: 2, permissions: [] },
  { id: "ROLE-002", name: "主管機關人員", description: "負責培訓班審核、成績判定與人才資歷覆核。", userCount: 5, permissions: [] },
  { id: "ROLE-003", name: "工地負責人", description: "前台註冊用戶，可報名培訓課程與管理個人資歷。", userCount: 1105, permissions: [] },
  { id: "ROLE-004", name: "一般查詢人員", description: "僅能使用人才庫查詢與匯出功能，無法修改資料。", userCount: 12, permissions: [] },
]

export const rolePermissions: Record<string, string[]> = {
  "系統管理者": permissionModules.flatMap(m => m.items.map(i => i.key)),
  "主管機關人員": [
    "front.announcements", "front.talent.search",
    "admin.dashboard", "admin.training.classes", "admin.training.review", "admin.training.retraining", "admin.training.announcements",
    "admin.talent.list", "admin.talent.remarks", "admin.talent.export"
  ],
  "工地負責人": [
    "front.announcements", "front.training.reg", "front.admission.search", "front.qualified.list",
    "front.profile.basic", "front.profile.experience", "front.profile.certs", "front.profile.retraining", "front.profile.remarks",
    "front.talent.search"
  ],
  "一般查詢人員": ["front.announcements", "front.talent.search", "admin.talent.export"]
}

export const dashboardStats = {
  totalSupervisors: 1332,
  activeSupervisors: 1150,
  trainingClasses: 3,
  pendingReviews: 15,
  retrainingDue: 82,
  certificatesIssued: 2450
}

export const monthlyData = [
  { month: "9月", registrations: 45, certificates: 38, retraining: 12 },
  { month: "10月", registrations: 52, certificates: 42, retraining: 15 },
  { month: "11月", registrations: 48, certificates: 35, retraining: 18 },
  { month: "12月", registrations: 65, certificates: 58, retraining: 22 },
  { month: "1月", registrations: 38, certificates: 30, retraining: 10 },
  { month: "2月", registrations: 42, certificates: 36, retraining: 14 },
]

export const categoryData = [
  { name: "國定古蹟", value: 400, fill: "hsl(var(--chart-1))" },
  { name: "直轄市/縣定", value: 300, fill: "hsl(var(--chart-2))" },
  { name: "歷史建築", value: 200, fill: "hsl(var(--chart-3))" },
  { name: "其他", value: 100, fill: "hsl(var(--chart-4))" },
]

export const systemLogs = Array.from({ length: 35 }, (_, i) => {
  const users = ["admin01", "reviewer_a", "zhang_rw", "staff_01"]
  const results = ["success", "success", "success", "fail"]
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(i / 3))
  return {
    id: `LOG-${(i + 1).toString().padStart(3, '0')}`,
    username: users[i % users.length],
    loginAt: `${date.toISOString().split('T')[0]} ${10 + (i % 8)}:15:23`,
    logoutAt: i % 5 === 0 ? null : `${date.toISOString().split('T')[0]} ${12 + (i % 8)}:30:45`,
    ip: `192.168.1.${100 + i}`,
    result: results[i % results.length]
  }
})

export const systemAccounts = [
  { id: "ACC-001", username: "admin01", name: "系統管理員", role: "系統管理者", email: "admin@boch.gov.tw", status: "啟用", lastLogin: "2026-02-06 09:15", createdAt: "2024-01-01" },
  { id: "ACC-002", username: "reviewer_a", name: "林審核", role: "主管機關人員", email: "lin@boch.gov.tw", status: "啟用", lastLogin: "2026-02-05 14:20", createdAt: "2024-03-15" },
  { id: "ACC-003", username: "zhang_rw", name: "張瑞文", role: "工地負責人", email: "zhang@example.com", status: "啟用", lastLogin: "2026-02-06 10:05", createdAt: "2024-06-01" },
  { id: "ACC-004", username: "staff_01", name: "王小明", role: "一般查詢人員", email: "wang@example.com", status: "停用", lastLogin: "2025-12-30 09:00", createdAt: "2024-01-01" },
]