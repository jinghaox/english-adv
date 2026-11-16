// 长难句解析课程:10 课,每课 3 句,按语法结构分组。
// 每句:s 原句 / core 主干(还原后的简单句)/ parts 拆解 [片段, 说明] / zh 译文 / tip 阅读技巧
export const LESSONS = [
  {
    title: "倒装句",
    intro: "否定词、only、so 等放到句首时,助动词会跑到主语前面。读的时候先还原成正常语序。",
    items: [
      {
        s: "Not until the final chapter does the author reveal who has been narrating the story all along.",
        core: "The author does not reveal [who …] until the final chapter.",
        parts: [
          ["Not until the final chapter", "否定状语提到句首,引起部分倒装"],
          ["does the author reveal", "助动词 does 提到主语前;正常语序是 the author reveals"],
          ["who has been narrating the story all along", "宾语从句,作 reveal 的宾语"],
        ],
        zh: "直到最后一章,作者才揭示一直在讲述这个故事的人是谁。",
        tip: "看到句首的 Not until / Never / Seldom / Hardly,先在心里把它还原成正常语序。",
      },
      {
        s: "So rapidly has the technology advanced that regulations drafted five years ago already look obsolete.",
        core: "The technology has advanced so rapidly that regulations … look obsolete.",
        parts: [
          ["So rapidly", "so + 副词提到句首,引起倒装"],
          ["has the technology advanced", "助动词 has 在主语前;正常语序是 the technology has advanced"],
          ["that regulations … already look obsolete", "so … that 的结果状语从句"],
          ["drafted five years ago", "过去分词短语作后置定语,修饰 regulations"],
        ],
        zh: "技术发展得如此之快,以至于五年前起草的法规现在看来已经过时了。",
        tip: "So / Such 开头的倒装句,后面一定有个 that 从句表示结果,先去找它。",
      },
      {
        s: "Only when the last witness had testified did the jury grasp how flimsy the prosecution's case really was.",
        core: "The jury grasped [how flimsy … was] only when the last witness had testified.",
        parts: [
          ["Only when the last witness had testified", "only + 时间状语从句放句首(从句本身不倒装)"],
          ["did the jury grasp", "主句倒装;正常语序是 the jury grasped"],
          ["how flimsy the prosecution's case really was", "how 引导的宾语从句;flimsy = 站不住脚的"],
        ],
        zh: "直到最后一名证人作证完毕,陪审团才明白控方的证据其实有多么站不住脚。",
        tip: "Only + 状语在句首时,倒装的是主句,不是 only 后面的从句。",
      },
    ],
  },
  {
    title: "省略 if 的虚拟句",
    intro: "Had / Were / Should 开头而又不是问句,就是省略了 if 的虚拟条件句。",
    items: [
      {
        s: "Had the warning been taken seriously, the damage could have been contained within hours.",
        core: "If the warning had been taken seriously, the damage could have been contained.",
        parts: [
          ["Had the warning been taken seriously", "= If the warning had been taken seriously,对过去的虚拟(事实上没有被重视)"],
          ["the damage could have been contained", "could have done:本可以……(事实上没有)"],
          ["within hours", "时间状语:在几小时之内"],
        ],
        zh: "要是当初认真对待了那个警告,损失本可以在几小时内得到控制。",
        tip: "Had + 主语 + 过去分词 = If + 主语 + had + 过去分词。读出言外之意:事实正好相反。",
      },
      {
        s: "Were it not for the subsidies, few of these farms would survive a single bad harvest.",
        core: "If it were not for the subsidies, few of these farms would survive.",
        parts: [
          ["Were it not for the subsidies", "= If it were not for …,要不是有……(对现在的虚拟)"],
          ["few of these farms would survive", "few 表否定:几乎没有哪家能撑过去"],
          ["a single bad harvest", "survive 的宾语;a single 强调“哪怕一次”"],
        ],
        zh: "要不是有补贴,这些农场中没几家能熬过哪怕一次歉收。",
        tip: "Were it not for … / Had it not been for … 是固定句型,直接译成“要不是……”。",
      },
      {
        s: "Should the negotiations collapse, both governments would find themselves blamed for an outcome neither had wanted.",
        core: "If the negotiations should collapse, both governments would find themselves blamed.",
        parts: [
          ["Should the negotiations collapse", "= If the negotiations should collapse,表示可能性较小的假设:万一……"],
          ["would find themselves blamed", "find + 宾语 + 过去分词:发现自己被责怪"],
          ["for an outcome neither had wanted", "neither had wanted 是省略了关系代词的定语从句,修饰 outcome"],
        ],
        zh: "万一谈判破裂,两国政府都会发现自己要为一个双方都不想要的结果背黑锅。",
        tip: "名词后面紧跟“主语 + 谓语”而没有连接词,多半是省略了 that / which 的定语从句。",
      },
    ],
  },
  {
    title: "定语从句的嵌套与分隔",
    intro: "主语被一层套一层的从句拉得很长时,先找主句的谓语动词,再回头理清谁修饰谁。",
    items: [
      {
        s: "The reforms that the committee which was appointed last spring has recommended are unlikely to satisfy anyone.",
        core: "The reforms are unlikely to satisfy anyone.",
        parts: [
          ["The reforms … are unlikely to satisfy anyone", "主句;主语和谓语被两层从句隔开"],
          ["that the committee … has recommended", "第一层定语从句,修饰 reforms"],
          ["which was appointed last spring", "第二层定语从句,套在第一层里面,修饰 committee"],
        ],
        zh: "去年春天任命的那个委员会所建议的改革,恐怕谁也满足不了。",
        tip: "连续出现两个谓语(has recommended are)时,前一个属于从句,后一个才是主句的。",
      },
      {
        s: "A day will come when the assumptions on which our entire strategy rests are shown to be false.",
        core: "A day will come.",
        parts: [
          ["A day will come", "主句,非常短"],
          ["when the assumptions … are shown to be false", "定语从句修饰 day,但被谓语 will come 隔开了(避免头重脚轻)"],
          ["on which our entire strategy rests", "介词 + which 的定语从句,修饰 assumptions;rest on = 以……为基础"],
        ],
        zh: "总有一天,我们整个战略所依据的那些假设会被证明是错的。",
        tip: "定语从句不一定紧跟先行词。when / where 从句前面没有合适的名词时,往前找被隔开的那个。",
      },
      {
        s: "She is one of those rare managers whose authority owes nothing to their title and everything to the trust they have earned.",
        core: "She is one of those rare managers.",
        parts: [
          ["whose authority owes nothing to their title", "whose 定语从句修饰 managers;owe A to B = 把 A 归功于 B"],
          ["and everything to the trust", "省略了重复的 owes:and (owes) everything to the trust"],
          ["they have earned", "省略关系代词的定语从句,修饰 trust"],
        ],
        zh: "她是那种少见的管理者:其威信丝毫不靠头衔,全靠自己赢得的信任。",
        tip: "and 后面如果缺动词,去前面找它省略掉的那个动词,把结构补全。",
      },
    ],
  },
  {
    title: "名词性从句作主语和同位语",
    intro: "整个从句当作一个名词用:That … / What … 开头的往往是主语从句,抽象名词后的 that 常是同位语从句。",
    items: [
      {
        s: "That the experiment failed surprised no one who had read the original proposal.",
        core: "[That the experiment failed] surprised no one.",
        parts: [
          ["That the experiment failed", "that 引导的主语从句,整体作主语:实验失败这件事"],
          ["surprised no one", "主句谓语和宾语"],
          ["who had read the original proposal", "定语从句,修饰 no one"],
        ],
        zh: "凡是读过最初方案的人,对实验失败都不感到意外。",
        tip: "句首的 That 后面跟着完整的句子,然后又出现一个动词——That 从句就是主语。",
      },
      {
        s: "What worries economists is not that prices are rising but that people have come to expect them to keep rising.",
        core: "What worries economists is not that … but that …",
        parts: [
          ["What worries economists", "what 引导的主语从句:让经济学家担心的事"],
          ["is not that prices are rising", "第一个表语从句,被否定"],
          ["but that people have come to expect …", "第二个表语从句,才是重点;come to do = 逐渐开始"],
          ["them to keep rising", "expect + 宾语 + 不定式;them 指 prices"],
        ],
        zh: "让经济学家担心的不是物价在涨,而是人们已经开始预期物价会一直涨下去。",
        tip: "not A but B 结构,重点永远在 B。",
      },
      {
        s: "The suggestion that the data had been tampered with was dismissed by the very people who stood to lose most if it were true.",
        core: "The suggestion was dismissed by the very people.",
        parts: [
          ["that the data had been tampered with", "同位语从句,说明 suggestion 的具体内容;tamper with = 篡改"],
          ["was dismissed by the very people", "主句谓语;the very 表强调:恰恰是那些人"],
          ["who stood to lose most", "定语从句;stand to lose = 可能蒙受损失"],
          ["if it were true", "虚拟条件句;it 指那个说法"],
        ],
        zh: "有人提出数据遭到了篡改,但这一说法却被那些一旦属实损失最大的人否定了。",
        tip: "分辨同位语从句和定语从句:that 在从句里不充当任何成分,就是同位语从句。",
      },
    ],
  },
  {
    title: "插入语与分隔结构",
    intro: "两个逗号之间的内容往往可以先跳过,读完主干再回来补上。",
    items: [
      {
        s: "The minister, it later emerged, had known about the shortfall for months.",
        core: "The minister had known about the shortfall for months.",
        parts: [
          ["it later emerged", "插入语:后来才为人所知(= as it later emerged)"],
          ["had known about the shortfall", "过去完成时:在“被曝光”之前早已知道;shortfall = 缺口"],
          ["for months", "时间状语"],
        ],
        zh: "后来才知道,部长几个月前就已经知道资金缺口的事了。",
        tip: "it seems / it turned out / I believe 这类短句夹在主谓之间时是插入语,翻译时一般提到句首。",
      },
      {
        s: "The evidence, though far from conclusive, was, in the view of most observers, sufficient to justify an inquiry.",
        core: "The evidence was sufficient to justify an inquiry.",
        parts: [
          ["though far from conclusive", "省略了 it was 的让步状语:虽然远非确凿"],
          ["in the view of most observers", "插入的介词短语:在多数观察人士看来"],
          ["sufficient to justify an inquiry", "表语;justify = 证明……有理由"],
        ],
        zh: "证据虽然远谈不上确凿,但在多数观察人士看来,已足以说明有必要展开调查。",
        tip: "一句里有两处插入时,把逗号之间的部分全部遮住,剩下的就是主干。",
      },
      {
        s: "Rumours spread through the office that the company, which had lost its biggest client only a week earlier, was about to be sold.",
        core: "Rumours spread through the office.",
        parts: [
          ["Rumours spread through the office", "主句"],
          ["that the company … was about to be sold", "同位语从句说明 Rumours 的内容,被谓语隔到了后面"],
          ["which had lost its biggest client only a week earlier", "非限定性定语从句,插在从句的主语和谓语之间"],
        ],
        zh: "办公室里流传着这样的传言:一周前刚刚失去最大客户的这家公司即将被出售。",
        tip: "that 从句前面没有可以修饰的名词时,往前找 rumour / news / fact / idea 这类抽象名词。",
      },
    ],
  },
  {
    title: "比较结构",
    intro: "比较句最容易读反。先弄清楚比较的两方是谁,再判断是肯定还是否定。",
    items: [
      {
        s: "The problem is not so much that the rules are strict as that they are applied inconsistently.",
        core: "The problem is not so much A as B.",
        parts: [
          ["not so much … as …", "与其说是……不如说是……(重点在 as 后面)"],
          ["that the rules are strict", "A:规则严格(不是主要问题)"],
          ["that they are applied inconsistently", "B:执行不一致(才是真正的问题)"],
        ],
        zh: "问题与其说是规定严格,不如说是执行起来前后不一。",
        tip: "not so much A as B = less A than B = B rather than A,三种写法都是强调 B。",
      },
      {
        s: "He is no more a diplomat than I am a surgeon.",
        core: "He is not a diplomat, just as I am not a surgeon.",
        parts: [
          ["no more … than …", "两边都否定:和……一样都不是"],
          ["He is … a diplomat", "要否定的事:他是外交官"],
          ["I am a surgeon", "拿来作比的、显然不成立的事:我是外科医生"],
        ],
        zh: "他根本不是什么外交官,就像我不是外科医生一样。",
        tip: "no more … than 是两边都否定;not more … than 才是普通的“不比……更”。",
      },
      {
        s: "The more closely the figures are examined, the less convincing the official explanation becomes.",
        core: "The more …, the less …",
        parts: [
          ["The more closely the figures are examined", "条件部分:数字被审视得越仔细"],
          ["the less convincing the official explanation becomes", "结果部分:官方解释就变得越不可信"],
          ["the less convincing … becomes", "表语 convincing 被提到了主语前;正常语序是 the explanation becomes less convincing"],
        ],
        zh: "这些数字审视得越仔细,官方的解释就越难以令人信服。",
        tip: "the + 比较级 …, the + 比较级 …:前半句是条件,后半句是结果,两边的语序都被打乱了。",
      },
    ],
  },
  {
    title: "否定的陷阱",
    intro: "双重否定、否定转移和 cannot … too 都容易让人把意思读反。",
    items: [
      {
        s: "There is no rule so clear that a determined lawyer cannot find an exception to it.",
        core: "However clear a rule is, a determined lawyer can find an exception to it.",
        parts: [
          ["There is no rule so clear", "没有哪条规则清楚到……"],
          ["that a determined lawyer cannot find an exception to it", "so … that 结果从句,里面又有一个否定"],
          ["no … cannot", "双重否定 = 肯定:任何规则都能被找到例外"],
        ],
        zh: "没有哪条规则清楚到一个铁了心的律师找不出例外来。",
        tip: "遇到两个否定词,先把它们抵消掉,用肯定句的意思去理解。",
      },
      {
        s: "You cannot be too careful when quoting figures you have not checked yourself.",
        core: "You should be as careful as possible.",
        parts: [
          ["cannot be too careful", "cannot … too:再……也不为过(不是“不能太小心”)"],
          ["when quoting figures", "省略了 you are 的时间状语"],
          ["you have not checked yourself", "省略关系代词的定语从句,修饰 figures"],
        ],
        zh: "引用自己没有核实过的数字时,再怎么小心也不为过。",
        tip: "cannot / can never + too / enough / over- 都表示“越……越好”。",
      },
      {
        s: "I don't think the committee appreciated how little time remained.",
        core: "I think the committee did not appreciate [how little time remained].",
        parts: [
          ["I don't think", "否定转移:形式上否定 think,实际上否定的是后面的从句"],
          ["the committee appreciated", "appreciate 在这里是“充分意识到”,不是“感激”"],
          ["how little time remained", "how 引导的宾语从句;little 表否定:时间多么少"],
        ],
        zh: "我认为委员会并没有意识到剩下的时间有多么少。",
        tip: "think / believe / suppose / expect 的否定通常要“转移”到宾语从句里去理解。",
      },
    ],
  },
  {
    title: "非谓语动词",
    intro: "分词、不定式和独立主格把很多信息压缩在主句之外。先找到唯一的谓语动词。",
    items: [
      {
        s: "Faced with mounting debts and having exhausted every other option, the board voted to sell the company.",
        core: "The board voted to sell the company.",
        parts: [
          ["Faced with mounting debts", "过去分词短语作原因状语:(董事会)面对不断增加的债务"],
          ["having exhausted every other option", "现在分词完成式:动作发生在投票之前"],
          ["the board voted to sell the company", "主句;两个分词短语的逻辑主语都是 the board"],
        ],
        zh: "面对不断增加的债务,又已用尽其他一切办法,董事会投票决定出售公司。",
        tip: "句首的分词短语,逻辑主语就是主句的主语。过去分词表被动,现在分词表主动。",
      },
      {
        s: "The talks having broken down, each side set about blaming the other.",
        core: "Each side set about blaming the other.",
        parts: [
          ["The talks having broken down", "独立主格结构:分词有自己的主语 The talks,相当于 After the talks had broken down"],
          ["each side set about", "主句;set about doing = 着手做"],
          ["blaming the other", "动名词短语作 about 的宾语"],
        ],
        zh: "谈判破裂之后,双方都开始指责对方。",
        tip: "“名词 + 分词”后面跟着逗号和一个完整的句子,就是独立主格,可以当成一个状语从句来读。",
      },
      {
        s: "To have finished the project on time, given how few people were available, was a remarkable achievement.",
        core: "To have finished the project on time was a remarkable achievement.",
        parts: [
          ["To have finished the project on time", "不定式完成式作主语:(已经)按时完成这个项目"],
          ["given how few people were available", "given = 考虑到,后面接一个 how 从句"],
          ["was a remarkable achievement", "主句的谓语和表语"],
        ],
        zh: "考虑到可用的人手那么少,能按时完成这个项目是一项了不起的成就。",
        tip: "句首的 To do … 后面如果直接出现谓语动词,不定式就是主语,而不是目的状语。",
      },
    ],
  },
  {
    title: "让步与强调",
    intro: "形容词提前的让步句、It is … that 强调句和 however 从句,在议论文和社论里很常见。",
    items: [
      {
        s: "Talented as she undoubtedly is, she has yet to produce the work her early promise suggested.",
        core: "Although she is talented, she has not yet produced the work.",
        parts: [
          ["Talented as she undoubtedly is", "形容词 + as + 主语 + be = Although she is talented"],
          ["she has yet to produce the work", "have yet to do = 还没有做(形式上肯定,意思是否定)"],
          ["her early promise suggested", "省略关系代词的定语从句,修饰 work;promise = 潜质"],
        ],
        zh: "她无疑很有才华,但至今还没有拿出她早年的潜质所预示的那种作品。",
        tip: "形容词 / 副词 / 名词 + as / though + 主语 + 动词,放在句首,一律理解成 although。",
      },
      {
        s: "It was not the size of the fine but the publicity surrounding it that did the company lasting harm.",
        core: "Not the size of the fine but the publicity did the company lasting harm.",
        parts: [
          ["It was … that …", "强调句型:去掉 It was 和 that,句子仍然完整"],
          ["not the size of the fine but the publicity", "被强调的部分,本身是 not A but B"],
          ["surrounding it", "现在分词短语作后置定语,修饰 publicity;it 指 the fine"],
          ["did the company lasting harm", "do sb harm = 对……造成伤害"],
        ],
        zh: "给公司造成长久伤害的不是罚款的数额,而是围绕罚款的舆论曝光。",
        tip: "判断是不是强调句:把 It is / was 和 that 划掉,剩下的还是一个完整通顺的句子,就是。",
      },
      {
        s: "However carefully the plan had been drawn up, it took no account of what would happen if demand simply failed to materialise.",
        core: "The plan took no account of [what would happen …].",
        parts: [
          ["However carefully the plan had been drawn up", "however + 副词引导的让步状语从句:无论多么周密"],
          ["it took no account of", "take no account of = 没有考虑到"],
          ["what would happen", "what 引导的宾语从句,作 of 的宾语"],
          ["if demand simply failed to materialise", "条件从句;materialise = 成为现实"],
        ],
        zh: "无论这个计划制定得多么周密,它都没有考虑到需求根本没有出现时会怎样。",
        tip: "however 后面紧跟形容词或副词时是“无论多么”;后面是逗号时才是“然而”。",
      },
    ],
  },
  {
    title: "综合长句",
    intro: "把前面的技巧合起来用:先找主句谓语,再一层层挂上从句和修饰语。",
    items: [
      {
        s: "Those who assume that a policy which worked in one country can simply be transplanted to another tend to overlook the conditions that made it work in the first place.",
        core: "Those … tend to overlook the conditions.",
        parts: [
          ["Those who assume that …", "who 定语从句修饰 Those;assume 后面又接一个 that 宾语从句"],
          ["a policy which worked in one country can simply be transplanted to another", "宾语从句的内容,其中 which worked … 修饰 policy"],
          ["tend to overlook the conditions", "主句谓语,离主语 Those 很远"],
          ["that made it work in the first place", "定语从句修饰 conditions;in the first place = 当初"],
        ],
        zh: "有些人以为在一国行之有效的政策可以直接移植到另一国,他们往往忽视了当初使这项政策奏效的那些条件。",
        tip: "主语是 Those who … 时,句子通常很长。跳过整个 who 从句,去找第一个不属于从句的动词。",
      },
      {
        s: "Nowhere is the gap between what the company says and what it does more apparent than in its treatment of the staff it claims to value.",
        core: "The gap … is nowhere more apparent than in its treatment of the staff.",
        parts: [
          ["Nowhere is the gap …", "否定副词 Nowhere 在句首,引起倒装"],
          ["between what the company says and what it does", "介词短语修饰 gap,里面是两个 what 从句:言与行"],
          ["more apparent than in its treatment of the staff", "Nowhere … more … than = 在……上最为明显(否定 + 比较级 = 最高级)"],
          ["it claims to value", "省略关系代词的定语从句,修饰 staff"],
        ],
        zh: "这家公司言行之间的差距,在它对待那些自称珍视的员工的方式上体现得最为明显。",
        tip: "否定词 + 比较级 = 最高级。Nothing is more important than X 就是“X 最重要”。",
      },
      {
        s: "What the inquiry made plain was that the failures it had been set up to investigate were neither isolated nor, as the department had insisted, the fault of a few junior officials.",
        core: "What the inquiry made plain was that the failures were neither isolated nor the fault of a few junior officials.",
        parts: [
          ["What the inquiry made plain", "主语从句:调查所表明的事;make sth plain = 使……清楚"],
          ["was that the failures … were neither … nor …", "表语从句,核心是 neither A nor B"],
          ["it had been set up to investigate", "省略关系代词的定语从句,修饰 failures;it 指 the inquiry"],
          ["as the department had insisted", "插入语:像该部门一直坚称的那样(被 nor 否定)"],
        ],
        zh: "调查清楚地表明,它受命调查的那些失误既不是孤立事件,也不像该部门一直坚称的那样只是几个基层官员的过错。",
        tip: "插入语夹在 neither … nor 里时要小心:部门坚称的是“只是几个基层官员的错”,而调查否定了这一点。",
      },
    ],
  },
];
