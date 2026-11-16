// 水平测试题库
// 词汇部分:8 个词频段,每段 5 词。width = 该词频段覆盖的词汇数量,
// 估算词汇量 = Σ(该段正确率 × width)。

export const BANDS = [
  { name: '1–2000', width: 2000 },
  { name: '2000–4000', width: 2000 },
  { name: '4000–6000', width: 2000 },
  { name: '6000–8000', width: 2000 },
  { name: '8000–11000', width: 3000 },
  { name: '11000–14000', width: 3000 },
  { name: '14000–18000', width: 4000 },
  { name: '18000–25000', width: 7000 },
];

// [词频段下标, 单词, 词性, 中文释义]
export const VOCAB = [
  [0, 'improve', 'v', '改善;提高'],
  [0, 'ordinary', 'adj', '普通的;平常的'],
  [0, 'decision', 'n', '决定'],
  [0, 'avoid', 'v', '避免;躲开'],
  [0, 'opinion', 'n', '看法;意见'],

  [1, 'reluctant', 'adj', '不情愿的;勉强的'],
  [1, 'abandon', 'v', '抛弃;放弃'],
  [1, 'consequence', 'n', '后果;结果'],
  [1, 'genuine', 'adj', '真正的;真诚的'],
  [1, 'estimate', 'v', '估计;估算'],

  [2, 'ambiguous', 'adj', '模棱两可的;有歧义的'],
  [2, 'deteriorate', 'v', '恶化;变坏'],
  [2, 'plausible', 'adj', '貌似合理的;可信的'],
  [2, 'scrutiny', 'n', '仔细审查;监督'],
  [2, 'compel', 'v', '强迫;迫使'],

  [3, 'meticulous', 'adj', '一丝不苟的;极其细心的'],
  [3, 'exacerbate', 'v', '使加剧;使恶化'],
  [3, 'resilience', 'n', '韧性;恢复力'],
  [3, 'conspicuous', 'adj', '显眼的;引人注目的'],
  [3, 'relinquish', 'v', '(不情愿地)放弃;交出'],

  [4, 'ephemeral', 'adj', '短暂的;转瞬即逝的'],
  [4, 'acquiesce', 'v', '默许;勉强同意'],
  [4, 'ubiquitous', 'adj', '无处不在的'],
  [4, 'conundrum', 'n', '难题;令人费解的问题'],
  [4, 'placate', 'v', '安抚;平息(怒气)'],

  [5, 'obfuscate', 'v', '故意使模糊难懂;混淆'],
  [5, 'perfunctory', 'adj', '敷衍的;例行公事的'],
  [5, 'sycophant', 'n', '马屁精;谄媚者'],
  [5, 'recalcitrant', 'adj', '桀骜不驯的;拒不服从的'],
  [5, 'vicissitude', 'n', '(人生的)兴衰变迁;沉浮'],

  [6, 'pusillanimous', 'adj', '胆小怯懦的'],
  [6, 'obstreperous', 'adj', '吵闹而难以管束的'],
  [6, 'excoriate', 'v', '严厉斥责;痛批'],
  [6, 'penumbra', 'n', '半影;模糊的边缘地带'],
  [6, 'lachrymose', 'adj', '爱哭的;催人泪下的'],

  [7, 'tergiversate', 'v', '变节;支吾搪塞'],
  [7, 'sesquipedalian', 'adj', '(词)冗长的;爱用长词的'],
  [7, 'borborygmus', 'n', '肠鸣音;肚子咕咕叫的声音'],
  [7, 'defenestrate', 'v', '把…抛出窗外;将…赶下台'],
  [7, 'nugatory', 'adj', '无价值的;无效的'],
].map(([band, w, pos, zh]) => ({ band, w, pos, zh }));

// 长难句理解:难度递增。opts[0] 永远是正确答案,出题时会打乱顺序。
export const SENTENCES = [
  {
    s: 'Had the committee not been warned in advance, the proposal, which few of its members had actually read, would almost certainly have passed without objection.',
    point: '虚拟语气倒装(Had … not = If … had not)+ 插入的非限定性定语从句',
    opts: [
      '委员会事先得到了警告,所以提案并没有顺利地无异议通过',
      '委员会没有得到警告,提案在无人反对的情况下通过了',
      '大多数委员认真读过提案后投了反对票',
      '委员会事先被警告不要通过这项提案,但还是通过了',
    ],
  },
  {
    s: 'No sooner had the minister denied any knowledge of the deal than documents bearing his signature surfaced.',
    point: 'No sooner … than 倒装结构;bearing 现在分词作后置定语',
    opts: [
      '部长刚否认自己知道这笔交易,带有他签名的文件就曝光了',
      '带有部长签名的文件曝光之后,他才否认知情',
      '部长很快承认了这笔交易,并公开了自己签署的文件',
      '部长否认签过任何文件,而文件此后也一直没有出现',
    ],
  },
  {
    s: 'Far from discouraging her, the critics’ dismissal of her early work only hardened her resolve to pursue the very style they had ridiculed.',
    point: 'Far from doing 表示“非但没有……反而”;the very 表强调',
    opts: [
      '评论家的否定非但没有让她气馁,反而让她更坚定地坚持那种被他们嘲笑的风格',
      '评论家的否定让她灰心,于是她放弃了被嘲笑的那种风格',
      '评论家远远没有否定她的早期作品,还鼓励她坚持自己的风格',
      '她因为嘲笑评论家的风格而遭到否定,但她并不在意',
    ],
  },
  {
    s: 'It is not that the evidence is lacking so much as that those in a position to act on it have little incentive to do so.',
    point: 'not A so much as B(与其说 A,不如说 B);those in a position to … 后置定语',
    opts: [
      '问题主要不在于缺乏证据,而在于有能力据此采取行动的人没什么动力去做',
      '证据严重不足,因此有关的人没有办法采取行动',
      '证据很充分,有权采取行动的人也很有积极性',
      '那些有能力行动的人之所以不行动,是因为他们拿不到证据',
    ],
  },
  {
    s: 'The notion that markets, left to themselves, invariably correct their own excesses is one that few economists who lived through the crisis would now defend without qualification.',
    point: '同位语从句 + 过去分词短语插入 + 双重定语从句;without qualification = 毫无保留地',
    opts: [
      '经历过那场危机的经济学家中,如今很少有人会毫无保留地捍卫“市场放任不管总能自我纠偏”这一观点',
      '经历过危机的经济学家大多认为,市场只要放任不管就一定能自我纠偏',
      '很少有经济学家具备资格去评判市场能否自我纠偏',
      '经济学家认为,正是因为对市场放任不管才引发了那场危机,这一点毫无疑问',
    ],
  },
  {
    s: 'What the report conspicuously fails to address is whether the savings it promises could be achieved without undermining the very services the reform was meant to protect.',
    point: '主语从句 + 表语从句(whether)+ 两处省略关系代词的定语从句',
    opts: [
      '报告明显回避了一个问题:它承诺的节省,能否在不损害改革本应保护的那些服务的前提下实现',
      '报告明确指出,节省开支必然会损害改革想要保护的服务',
      '报告没有说明这项改革究竟能省下多少钱',
      '报告成功地证明了,节省开支不会影响改革所保护的各项服务',
    ],
  },
  {
    s: 'That he should have been surprised by the verdict, given how openly the jurors had signalled their scepticism, says less about the trial than about his capacity for self-deception.',
    point: 'That 引导的主语从句(should 表“竟然”)+ given 让步/原因插入 + less … than 比较',
    opts: [
      '陪审员早已公开流露怀疑,他竟还对判决感到意外——这与其说反映了审判本身,不如说反映了他多么善于自欺',
      '判决结果出人意料,说明这场审判并不公正,而他被陪审员欺骗了',
      '他对判决并不意外,因为陪审员早就公开表示了怀疑',
      '陪审员对他的自欺能力感到吃惊,所以作出了出人意料的判决',
    ],
  },
  {
    s: 'Scarcely a policy has been announced this year whose stated aims, however laudable, were not quietly at odds with the interests of those charged with implementing it.',
    point: 'Scarcely … not 双重否定 = 几乎每一项都;whose 定语从句与先行词分隔;however laudable 让步插入',
    opts: [
      '今年宣布的政策,几乎每一项宣称的目标(无论多么值得称道)都与负责执行者的利益暗中相抵触',
      '今年几乎没有宣布什么政策,因为政策目标与执行者的利益相冲突',
      '今年宣布的政策目标都值得称道,而且几乎都符合执行者的利益',
      '今年只有极少数政策的目标与执行者的利益存在冲突',
    ],
  },
];

export const LEVELS = [
  { code: 'A2', name: '初级' },
  { code: 'B1', name: '中级' },
  { code: 'B2', name: '中高级' },
  { code: 'C1', name: '高级' },
  { code: 'C2', name: '精通' },
];

export function vocabLevel(v) {
  return v < 3500 ? 0 : v < 6000 ? 1 : v < 9000 ? 2 : v < 14000 ? 3 : 4;
}
export function sentenceLevel(correct) {
  return correct <= 1 ? 0 : correct <= 3 ? 1 : correct <= 5 ? 2 : correct <= 7 ? 3 : 4;
}
