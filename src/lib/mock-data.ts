// ==================== Types ====================

export interface Order {
  id: string
  title: string // 剧名/项目名称
  type: "即时单" | "预约单"
  roleDescription: string
  headcount: number
  location: string
  gatherTime: string
  workStartTime: string
  gender: "男" | "女" | "不限"
  heightRange: [number, number]
  bodyTypes: string[]
  skills: string[]
  benefits: string[]
  priceType: "日薪" | "时薪"
  price: number
  status: "待接单" | "进行中" | "已完成" | "已取消"
  applicants: Applicant[]
  posterImages: string[]
  crewId: string
  crewName: string
  crewCredit: number
  createdAt: string
  distance?: number
}

export interface Applicant {
  id: string
  actorId: string
  name: string
  avatar: string
  creditScore: number
  height: number
  status: "待审核" | "已通过" | "已拒绝"
  rejectReason?: string
  appliedAt: string
}

export interface Actor {
  id: string
  name: string
  avatar: string
  gender: "男" | "女"
  height: number
  weight: number
  bodyType: string
  skills: string[]
  creditScore: number
  distance: number
  age: number
  completedOrders: number
  income: number
  goodRate: number
  fans: number
  following: number
  bio: string
  photos: string[]
  videos: string[]
}

export interface Crew {
  id: string
  companyName: string
  creditScore: number
  bio: string
  totalOrders: number
  completedOrders: number
  goodRate: number
  fans: number
  following: number
  isGold: boolean // 130+ credit
}

export interface CommunityPost {
  id: string
  authorName: string
  authorAvatar: string
  title: string
  content: string
  images: string[]
  likes: number
  comments: number
  isLiked: boolean
  tags: string[]
  createdAt: string
}

export interface Review {
  id: string
  orderId: string
  orderTitle: string
  rating: number
  content: string
  tags: string[]
  reviewerName: string
  reviewerAvatar: string
  createdAt: string
  type: "crew-to-actor" | "actor-to-crew"
}

export interface Message {
  id: string
  type: "order_push" | "review_result" | "departure_reminder" | "review_reminder" | "system"
  title: string
  content: string
  isRead: boolean
  createdAt: string
  relatedId?: string
}

export interface NewsItem {
  id: string
  date: string
  title: string
  category: string
  image: string
  summary: string
  content: string
}

// ==================== Mock Data ====================

const avatars = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=actor1",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=actor2",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=actor3",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=actor4",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=actor5",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=actor6",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=actor7",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=actor8",
]

export const mockCrew: Crew = {
  id: "crew-1",
  companyName: "星辰影业",
  creditScore: 135,
  bio: "专注于高品质微短剧制作，已出品多部热播作品。",
  totalOrders: 48,
  completedOrders: 42,
  goodRate: 96,
  fans: 320,
  following: 15,
  isGold: true,
}

export const mockActors: Actor[] = [
  { id: "a1", name: "林小夏", avatar: avatars[0], gender: "女", height: 165, weight: 48, bodyType: "偏瘦", skills: ["舞蹈", "唱歌", "台词"], creditScore: 142, distance: 2.3, age: 22, completedOrders: 28, income: 15600, goodRate: 98, fans: 1200, following: 45, bio: "毕业于北京电影学院表演系，擅长古装和现代情感剧。", photos: ["/images/model_card_demo.jpg"], videos: [] },
  { id: "a2", name: "陈浩然", avatar: avatars[1], gender: "男", height: 180, weight: 72, bodyType: "标准", skills: ["武术", "骑马", "游泳"], creditScore: 128, distance: 5.1, age: 26, completedOrders: 15, income: 8900, goodRate: 95, fans: 680, following: 32, bio: "体育特长生转行表演，擅长动作戏和运动类角色。", photos: [], videos: [] },
  { id: "a3", name: "王诗涵", avatar: avatars[2], gender: "女", height: 170, weight: 52, bodyType: "标准", skills: ["模特", "舞蹈", "钢琴"], creditScore: 156, distance: 1.8, age: 24, completedOrders: 45, income: 28000, goodRate: 99, fans: 3500, following: 88, bio: "前模特转行演员，时尚类广告和都市剧经验丰富。", photos: ["/images/model_card_demo.jpg"], videos: [] },
  { id: "a4", name: "张子豪", avatar: avatars[3], gender: "男", height: 175, weight: 68, bodyType: "标准", skills: ["台词", "方言", "喜剧"], creditScore: 118, distance: 3.5, age: 30, completedOrders: 52, income: 32000, goodRate: 92, fans: 2100, following: 56, bio: "十年话剧舞台经验，喜剧和方言角色是强项。", photos: [], videos: [] },
  { id: "a5", name: "刘雨桐", avatar: avatars[4], gender: "女", height: 162, weight: 46, bodyType: "偏瘦", skills: ["唱歌", "吉他", "写作"], creditScore: 130, distance: 8.2, age: 20, completedOrders: 8, income: 4200, goodRate: 100, fans: 450, following: 120, bio: "音乐学院在读，希望跨界体验影视表演。", photos: [], videos: [] },
  { id: "a6", name: "赵明轩", avatar: avatars[5], gender: "男", height: 183, weight: 78, bodyType: "偏壮", skills: ["武术", "健身", "摩托"], creditScore: 145, distance: 4.6, age: 28, completedOrders: 35, income: 22000, goodRate: 97, fans: 1800, following: 40, bio: "专业武行出身，参与多部院线动作片拍摄。", photos: [], videos: [] },
  { id: "a7", name: "孙悦", avatar: avatars[6], gender: "女", height: 168, weight: 50, bodyType: "标准", skills: ["舞蹈", "瑜伽", "主持"], creditScore: 125, distance: 6.0, age: 25, completedOrders: 20, income: 11000, goodRate: 94, fans: 920, following: 65, bio: "从主持人转型演员，综艺和短剧都有参与。", photos: [], videos: [] },
  { id: "a8", name: "李天佑", avatar: avatars[7], gender: "男", height: 178, weight: 70, bodyType: "标准", skills: ["台词", "唱歌", "篮球"], creditScore: 110, distance: 12.0, age: 23, completedOrders: 5, income: 2800, goodRate: 90, fans: 200, following: 80, bio: "戏剧专业大四学生，正在积极寻找演出机会。", photos: [], videos: [] },
]

export const mockOrders: Order[] = [
  {
    id: "o1", title: "微短剧《逆风翻盘》", type: "预约单", roleDescription: "女主角，25岁左右，性格坚韧独立的职场女性，需要有一定的表演经验。",
    headcount: 2, location: "重庆市渝中区解放碑", gatherTime: "2026-03-10 08:00", workStartTime: "2026-03-10 09:00",
    gender: "女", heightRange: [160, 172], bodyTypes: ["偏瘦", "标准"], skills: ["台词", "舞蹈"],
    benefits: ["包餐", "接送", "有茶水"], priceType: "日薪", price: 500, status: "待接单",
    applicants: [
      { id: "ap1", actorId: "a1", name: "林小夏", avatar: avatars[0], creditScore: 142, height: 165, status: "待审核", appliedAt: "2026-03-04 10:30" },
      { id: "ap2", actorId: "a3", name: "王诗涵", avatar: avatars[2], creditScore: 156, height: 170, status: "待审核", appliedAt: "2026-03-04 11:15" },
      { id: "ap3", actorId: "a5", name: "刘雨桐", avatar: avatars[4], creditScore: 130, height: 162, status: "待审核", appliedAt: "2026-03-04 12:00" },
    ],
    posterImages: ["/images/UxmRP.jpg"], crewId: "crew-1", crewName: "星辰影业", crewCredit: 135, createdAt: "2026-03-03 14:00", distance: 3.2,
  },
  {
    id: "o2", title: "品牌广告 TVC 拍摄", type: "即时单", roleDescription: "阳光帅气的男大学生形象，18-25岁，需配合产品展示动作。",
    headcount: 3, location: "重庆市江北区观音桥", gatherTime: "2026-03-05 13:00", workStartTime: "2026-03-05 14:00",
    gender: "男", heightRange: [175, 185], bodyTypes: ["标准"], skills: ["模特"],
    benefits: ["包餐", "有茶水"], priceType: "时薪", price: 80, status: "进行中",
    applicants: [
      { id: "ap4", actorId: "a2", name: "陈浩然", avatar: avatars[1], creditScore: 128, height: 180, status: "已通过", appliedAt: "2026-03-04 09:00" },
      { id: "ap5", actorId: "a8", name: "李天佑", avatar: avatars[7], creditScore: 110, height: 178, status: "已通过", appliedAt: "2026-03-04 09:30" },
      { id: "ap6", actorId: "a4", name: "张子豪", avatar: avatars[3], creditScore: 118, height: 175, status: "已拒绝", rejectReason: "年龄不太匹配", appliedAt: "2026-03-04 10:00" },
    ],
    posterImages: ["/images/ZPANu.jpg"], crewId: "crew-1", crewName: "星辰影业", crewCredit: 135, createdAt: "2026-03-04 08:00", distance: 5.8,
  },
  {
    id: "o3", title: "古装剧《锦绣未央2》海选", type: "预约单", roleDescription: "古装丫鬟角色，需要身段灵活、面容清秀，有古装经验优先。",
    headcount: 5, location: "重庆市北碚区缙云山", gatherTime: "2026-03-15 07:00", workStartTime: "2026-03-15 08:30",
    gender: "女", heightRange: [158, 168], bodyTypes: ["偏瘦", "标准"], skills: ["舞蹈", "台词"],
    benefits: ["包餐", "包住宿", "接送", "有茶水"], priceType: "日薪", price: 350, status: "待接单",
    applicants: [
      { id: "ap7", actorId: "a1", name: "林小夏", avatar: avatars[0], creditScore: 142, height: 165, status: "待审核", appliedAt: "2026-03-05 08:00" },
    ],
    posterImages: ["/images/dHGwH.jpg"], crewId: "crew-1", crewName: "星辰影业", crewCredit: 135, createdAt: "2026-03-02 10:00", distance: 15.5,
  },
  {
    id: "o4", title: "网剧《都市猎人》", type: "预约单", roleDescription: "男主角保镖，30岁左右，需要武术功底，形象硬朗。",
    headcount: 1, location: "重庆市南岸区南滨路", gatherTime: "2026-03-20 09:00", workStartTime: "2026-03-20 10:00",
    gender: "男", heightRange: [178, 190], bodyTypes: ["偏壮", "标准"], skills: ["武术", "健身"],
    benefits: ["包餐", "包住宿"], priceType: "日薪", price: 800, status: "待接单",
    applicants: [
      { id: "ap8", actorId: "a6", name: "赵明轩", avatar: avatars[5], creditScore: 145, height: 183, status: "待审核", appliedAt: "2026-03-05 14:00" },
      { id: "ap9", actorId: "a2", name: "陈浩然", avatar: avatars[1], creditScore: 128, height: 180, status: "待审核", appliedAt: "2026-03-05 15:00" },
    ],
    posterImages: ["/images/QKDqy.jpg"], crewId: "crew-1", crewName: "星辰影业", crewCredit: 135, createdAt: "2026-03-01 16:00", distance: 7.3,
  },
  {
    id: "o5", title: "综艺节目群演", type: "即时单", roleDescription: "观众席群演，无特殊要求，配合现场导演指令即可。",
    headcount: 20, location: "重庆市渝北区龙头寺", gatherTime: "2026-02-28 18:00", workStartTime: "2026-02-28 19:00",
    gender: "不限", heightRange: [155, 190], bodyTypes: ["标准", "偏瘦", "偏壮"], skills: [],
    benefits: ["包餐"], priceType: "时薪", price: 50, status: "已完成",
    applicants: [
      { id: "ap10", actorId: "a1", name: "林小夏", avatar: avatars[0], creditScore: 142, height: 165, status: "已通过", appliedAt: "2026-02-27 10:00" },
      { id: "ap11", actorId: "a7", name: "孙悦", avatar: avatars[6], creditScore: 125, height: 168, status: "已通过", appliedAt: "2026-02-27 11:00" },
    ],
    posterImages: [], crewId: "crew-1", crewName: "星辰影业", crewCredit: 135, createdAt: "2026-02-26 12:00", distance: 4.1,
  },
  {
    id: "o6", title: "微电影《回家的路》", type: "预约单", roleDescription: "中年父亲角色，40-50岁，朴实形象，有生活感。",
    headcount: 1, location: "重庆市巴南区一品镇", gatherTime: "2026-02-20 06:00", workStartTime: "2026-02-20 07:00",
    gender: "男", heightRange: [170, 180], bodyTypes: ["标准"], skills: ["台词"],
    benefits: ["包餐", "包住宿", "接送"], priceType: "日薪", price: 600, status: "已取消",
    applicants: [],
    posterImages: [], crewId: "crew-1", crewName: "星辰影业", crewCredit: 135, createdAt: "2026-02-15 09:00", distance: 22.0,
  },
]

export const mockCommunityPosts: CommunityPost[] = [
  { id: "cp1", authorName: "林小夏", authorAvatar: avatars[0], title: "今天片场日常分享", content: "第一次拍古装戏，造型师姐姐手太巧了！分享一下今天的造型～", images: ["/images/dHGwH.jpg", "/images/UxmRP.jpg"], likes: 234, comments: 18, isLiked: false, tags: ["片场日常", "古装"], createdAt: "2026-03-04 16:30" },
  { id: "cp2", authorName: "赵明轩", authorAvatar: avatars[5], title: "动作戏幕后花絮", content: "这场打戏拍了整整8个小时，但效果真的很满意！感谢武术指导老师的耐心指导。", images: ["/images/QKDqy.jpg"], likes: 456, comments: 32, isLiked: true, tags: ["幕后花絮", "动作戏"], createdAt: "2026-03-04 14:00" },
  { id: "cp3", authorName: "王诗涵", authorAvatar: avatars[2], title: "新模卡拍好啦", content: "花了一下午拍的新模卡，大家觉得哪套造型好看？求投票！", images: ["/images/model_card_demo.jpg"], likes: 892, comments: 67, isLiked: false, tags: ["模卡", "造型"], createdAt: "2026-03-03 20:00" },
  { id: "cp4", authorName: "张子豪", authorAvatar: avatars[3], title: "分享一个面试技巧", content: "面试时最重要的不是完美的台词背诵，而是真诚的情感表达。今天面试一个喜剧角色，导演说最打动他的是我临场发挥的那段即兴表演。", images: [], likes: 678, comments: 89, isLiked: false, tags: ["面试技巧", "经验分享"], createdAt: "2026-03-03 12:00" },
  { id: "cp5", authorName: "刘雨桐", authorAvatar: avatars[4], title: "第一次上镜的感觉", content: "今天完成了人生第一场正式拍摄！虽然只是群演，但站在镜头前的感觉真的好奇妙～", images: ["/images/ZPANu.jpg", "/images/UxmRP.jpg"], likes: 345, comments: 25, isLiked: true, tags: ["新人日记", "群演"], createdAt: "2026-03-02 18:30" },
  { id: "cp6", authorName: "孙悦", authorAvatar: avatars[6], title: "从主持到表演的转变", content: "做了三年主持人，今年决定尝试转型演员。不同的舞台，同样的热爱。分享我的转型心路历程。", images: ["/images/about_meeting.jpg"], likes: 521, comments: 45, isLiked: false, tags: ["转型", "心路历程"], createdAt: "2026-03-01 10:00" },
]

export const mockReviews: Review[] = [
  { id: "r1", orderId: "o5", orderTitle: "综艺节目群演", rating: 5, content: "非常配合，准时到达，表现很棒！", tags: ["准时", "配合度高", "专业"], reviewerName: "星辰影业", reviewerAvatar: avatars[0], createdAt: "2026-03-01 10:00", type: "crew-to-actor" },
  { id: "r2", orderId: "o5", orderTitle: "综艺节目群演", rating: 4, content: "剧组安排有序，工作人员态度很好。", tags: ["管理有序", "态度好"], reviewerName: "林小夏", reviewerAvatar: avatars[0], createdAt: "2026-03-01 11:00", type: "actor-to-crew" },
  { id: "r3", orderId: "o2", orderTitle: "品牌广告 TVC 拍摄", rating: 5, content: "演员形象非常符合要求，表现力强。", tags: ["形象好", "表现力强", "准时"], reviewerName: "星辰影业", reviewerAvatar: avatars[1], createdAt: "2026-03-05 16:00", type: "crew-to-actor" },
  { id: "r4", orderId: "o2", orderTitle: "品牌广告 TVC 拍摄", rating: 5, content: "金牌剧组名不虚传，流程专业高效。", tags: ["金牌剧组", "流程专业", "薪资及时"], reviewerName: "陈浩然", reviewerAvatar: avatars[1], createdAt: "2026-03-05 17:00", type: "actor-to-crew" },
]

export const mockMessages: Message[] = [
  { id: "m1", type: "order_push", title: "新信息推荐", content: "《逆风翻盘》正在招募女主角，与你的条件匹配度 92%！", isRead: false, createdAt: "2026-03-04 10:00", relatedId: "o1" },
  { id: "m2", type: "review_result", title: "审核通过", content: "恭喜！你在《品牌广告 TVC 拍摄》的申请已通过，请准时到达集合地点。", isRead: false, createdAt: "2026-03-04 09:30", relatedId: "o2" },
  { id: "m3", type: "departure_reminder", title: "出发提醒", content: "《品牌广告 TVC 拍摄》将于今天 13:00 集合，请提前出发。", isRead: true, createdAt: "2026-03-05 11:00", relatedId: "o2" },
  { id: "m4", type: "review_reminder", title: "评价提醒", content: "你参与的《综艺节目群演》已完成，快来评价剧组吧！", isRead: true, createdAt: "2026-03-01 09:00", relatedId: "o5" },
  { id: "m5", type: "system", title: "系统通知", content: "你的信用分已更新至 142 分，继续保持！", isRead: true, createdAt: "2026-02-28 15:00" },
  { id: "m6", type: "order_push", title: "新信息推荐", content: "《古装剧锦绣未央2》正在海选丫鬟角色，快来看看！", isRead: false, createdAt: "2026-03-05 08:00", relatedId: "o3" },
]

export const mockNews: NewsItem[] = [
  {
    id: "news-1", date: "2026-02-15", title: "SceneReady 1.0 版本正式上线", category: "产品动态",
    image: "/images/mini_app_release.png",
    summary: "全新 SceneReady 1.0 现已上线。核心功能全面开放，支持微信小程序快速扫码访问，让剧组与演员沟通更加高效。",
    content: `SceneReady 1.0 版本于今日正式上线！经过数月的打磨和测试，我们为剧组和演员带来了全新的选角体验。

## 核心功能

### 剧组端
- **智能发单**：3分钟完成组讯发布，AI自动解析角色需求
- **简历管理**：卡片式浏览演员资料，一滑即选
- **信息追踪**：实时掌握招募进度和演员状态

### 演员端
- **任务大厅**：海量优质通告，智能推荐匹配
- **电子模卡**：专业模卡一键生成，展现最佳形象
- **社区交流**：与同行分享经验，拓展人脉资源

### 平台特色
- **信用体系**：双向评价机制，打造诚信生态
- **安全保障**：实名认证、隐私保护、资金安全
- **微信小程序**：无需下载，扫码即用

## 未来规划

我们将持续迭代产品功能，计划在 Q2 推出视频面试、AI 简历解析等高级功能。感谢每一位早期用户的支持与反馈！`,
  },
  {
    id: "news-2", date: "2026-01-28", title: "参加永川区影视产业发展座谈会", category: "行业交流",
    image: "/images/yongchuan_meeting.jpg",
    summary: "SceneReady 团队前往永川区，就当地微短剧等影视产业的高质量发展与行业代表展开深入探讨，探索合作新可能。",
    content: `2026年1月28日，SceneReady 团队受邀参加永川区影视产业发展座谈会。

## 会议概况

本次座谈会由永川区文化旅游委主办，汇聚了十余家影视制作公司、经纪公司和技术服务商代表。会议围绕重庆微短剧产业发展现状和未来趋势展开了深入讨论。

## 交流内容

SceneReady 创始人在会上分享了平台在数字化选角领域的实践经验：
- 如何通过技术手段解决传统选角中的信息不对称问题
- AI 在演员匹配和角色推荐中的应用前景
- 建立行业信用体系的思路和实践

## 合作展望

与会代表对 SceneReady 的产品理念表示高度认可，多家公司表达了合作意向。我们将继续深耕重庆影视市场，为行业发展贡献技术力量。`,
  },
  {
    id: "news-3", date: "2026-01-23", title: "前往重庆巴南影视产业园参观调研", category: "行业交流",
    image: "/images/banan_research.jpg",
    summary: "SceneReady 团队前往重庆巴南影视产业园进行实地参观调研，深入了解园区影视生态与配套设施。",
    content: `2026年1月23日，SceneReady 团队前往重庆巴南影视产业园进行实地参观调研。

## 园区概况

巴南影视产业园是重庆市重点文化产业项目，占地面积超过500亩，配备专业摄影棚、后期制作中心、演员培训基地等设施。

## 调研收获

- 深入了解了园区内影视制作全流程的配套设施
- 与园区管理方探讨了数字化服务平台的接入可能
- 参观了多个正在进行中的拍摄项目现场
- 与驻园企业代表交流了人才招募的痛点和需求

## 合作方向

基于此次调研成果，我们计划：
1. 在园区设立服务站点，为驻园剧组提供便捷的选角服务
2. 与园区联合举办演员培训和选角活动
3. 共同建设影视人才数据库，服务区域产业发展`,
  },
]

// ==================== Helper Functions ====================

export function getOrders(filter?: { status?: string; search?: string }): Order[] {
  let result = [...mockOrders]
  if (filter?.status && filter.status !== "全部") {
    result = result.filter(o => o.status === filter.status)
  }
  if (filter?.search) {
    const s = filter.search.toLowerCase()
    result = result.filter(o => o.title.toLowerCase().includes(s) || o.roleDescription.toLowerCase().includes(s))
  }
  return result
}

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find(o => o.id === id)
}

export function getActors(filter?: { gender?: string; heightMin?: number; heightMax?: number; bodyTypes?: string[]; skills?: string[]; search?: string; sort?: string }): Actor[] {
  let result = [...mockActors]
  if (filter?.gender && filter.gender !== "不限") result = result.filter(a => a.gender === filter.gender)
  if (filter?.heightMin) result = result.filter(a => a.height >= filter.heightMin!)
  if (filter?.heightMax) result = result.filter(a => a.height <= filter.heightMax!)
  if (filter?.bodyTypes?.length) result = result.filter(a => filter.bodyTypes!.includes(a.bodyType))
  if (filter?.skills?.length) result = result.filter(a => a.skills.some(s => filter.skills!.includes(s)))
  if (filter?.search) {
    const s = filter.search.toLowerCase()
    result = result.filter(a => a.name.toLowerCase().includes(s) || a.skills.join(",").includes(s))
  }
  if (filter?.sort === "distance") result.sort((a, b) => a.distance - b.distance)
  else if (filter?.sort === "credit") result.sort((a, b) => b.creditScore - a.creditScore)
  return result
}

export function getActorById(id: string): Actor | undefined {
  return mockActors.find(a => a.id === id)
}

export function getCommunityPosts(sort?: "latest" | "hot" | "recommended"): CommunityPost[] {
  const result = [...mockCommunityPosts]
  if (sort === "hot") result.sort((a, b) => b.likes - a.likes)
  else if (sort === "latest") result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return result
}

export function getReviews(type?: "crew-to-actor" | "actor-to-crew"): Review[] {
  if (type) return mockReviews.filter(r => r.type === type)
  return [...mockReviews]
}

export function getMessages(): Message[] {
  return [...mockMessages].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getNewsById(id: string): NewsItem | undefined {
  return mockNews.find(n => n.id === id)
}

export const bodyTypeOptions = ["偏瘦", "标准", "偏壮", "微胖"]
export const skillOptions = ["台词", "舞蹈", "唱歌", "武术", "骑马", "游泳", "模特", "钢琴", "吉他", "方言", "喜剧", "健身", "瑜伽", "主持", "写作", "摩托", "篮球"]
export const benefitOptions = ["包餐", "接送", "包住宿", "有茶水", "提供服装", "提供化妆"]
export const reviewTags = ["准时", "配合度高", "专业", "形象好", "表现力强", "态度好", "管理有序", "金牌剧组", "流程专业", "薪资及时"]
