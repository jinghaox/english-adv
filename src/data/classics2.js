// 第二批经典选段(均为公有领域作品)。散文与诗歌交替排列。
// verse: true 表示诗歌,text 中每个元素是一节,行与行之间用换行分隔。
// quiz 用紧凑写法 [题目, [选项], 正确下标],文件末尾统一转换。
const RAW = [
  {
    id: "c:janeeyre", title: "Jane Eyre", author: "Charlotte Brontë · 1847", zh: "《简·爱》开篇",
    note: "第二句是一个长句:主干是 the cold winter wind had brought … clouds so sombre, and a rain so penetrating, that …(so … that 结构),括号里是插入说明。",
    text: [
      "There was no possibility of taking a walk that day. We had been wandering, indeed, in the leafless shrubbery an hour in the morning; but since dinner (Mrs. Reed, when there was no company, dined early) the cold winter wind had brought with it clouds so sombre, and a rain so penetrating, that further out-door exercise was now out of the question.",
    ],
    quiz: [
      ["Why was a walk impossible that afternoon?", ["Mrs. Reed had forbidden it", "The weather had turned cold, dark and rainy", "There were guests in the house", "It was already too late in the evening"], 1],
      ["“Out of the question” means:", ["impossible", "not yet decided", "worth discussing", "unanswered"], 0],
    ],
  },
  {
    id: "c:sonnet18", title: "Sonnet 18", author: "William Shakespeare · 1609", zh: "十四行诗第 18 首", verse: true,
    note: "thee / thou / thy = you / your;hath = has;ow’st = own。前八行说夏天的不完美,But 一转,说“你”的美因这首诗而永存。",
    text: [
      "Shall I compare thee to a summer’s day?\nThou art more lovely and more temperate:\nRough winds do shake the darling buds of May,\nAnd summer’s lease hath all too short a date;",
      "Sometime too hot the eye of heaven shines,\nAnd often is his gold complexion dimm’d;\nAnd every fair from fair sometime declines,\nBy chance or nature’s changing course untrimm’d;",
      "But thy eternal summer shall not fade,\nNor lose possession of that fair thou ow’st;\nNor shall death brag thou wander’st in his shade,\nWhen in eternal lines to time thou grow’st:",
      "So long as men can breathe or eyes can see,\nSo long lives this, and this gives life to thee.",
    ],
    quiz: [
      ["“The eye of heaven” refers to:", ["the moon", "God", "the sun", "a star"], 2],
      ["In the final couplet, “this” refers to:", ["summer", "the poem itself", "death", "the beloved’s beauty"], 1],
    ],
  },
  {
    id: "c:copperfield", title: "David Copperfield", author: "Charles Dickens · 1850", zh: "《大卫·科波菲尔》开篇",
    note: "第一句由两个 whether 从句作主语式的铺垫,主句是 these pages must show。station 在这里指“地位、位置”。",
    text: [
      "Whether I shall turn out to be the hero of my own life, or whether that station will be held by anybody else, these pages must show. To begin my life with the beginning of my life, I record that I was born (as I have been informed and believe) on a Friday, at twelve o’clock at night. It was remarked that the clock began to strike, and I began to cry, simultaneously.",
    ],
    quiz: [
      ["What will “these pages” show?", ["Who the narrator’s parents were", "Whether the narrator is the hero of his own life", "Why he was born on a Friday", "How the clock came to strike"], 1],
      ["“Simultaneously” means:", ["loudly", "one after another", "at the same time", "unexpectedly"], 2],
    ],
  },
  {
    id: "c:ozymandias", title: "Ozymandias", author: "Percy Bysshe Shelley · 1818", zh: "《奥兹曼迪亚斯》", verse: true,
    note: "讽刺权力与时间:碑文叫人“看我的功业而绝望”,四周却只剩无边的黄沙。visage = 脸;mocked 兼有“摹刻”和“嘲弄”两层意思。",
    text: [
      "I met a traveller from an antique land,\nWho said—“Two vast and trunkless legs of stone\nStand in the desert. . . . Near them, on the sand,\nHalf sunk a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed;",
      "And on the pedestal, these words appear:\nMy name is Ozymandias, King of Kings;\nLook on my Works, ye Mighty, and despair!\nNothing beside remains. Round the decay\nOf that colossal Wreck, boundless and bare\nThe lone and level sands stretch far away.”",
    ],
    quiz: [
      ["What remains of the king’s “Works”?", ["A great city", "Nothing but a broken statue in the sand", "A library of inscriptions", "An army of stone figures"], 1],
      ["The poem’s irony lies in the contrast between:", ["the traveller and the poet", "the sculptor and the king", "the king’s boast and the empty desert", "the past and the future of art"], 2],
    ],
  },
  {
    id: "c:frankenstein", title: "Frankenstein", author: "Mary Shelley · 1818", zh: "《弗兰肯斯坦》第五章开头",
    note: "造物成功的一刻却写得阴冷压抑。注意 that I might infuse …(目的状语)和 when … I saw …(时间从句里才是关键事件)。",
    text: [
      "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet.",
      "It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
    ],
    quiz: [
      ["“The accomplishment of my toils” refers to:", ["finishing a long journey", "the completion of the narrator’s hard work", "a scientific prize", "the end of the storm"], 1],
      ["The atmosphere of the scene is best described as:", ["triumphant", "comic", "gloomy and tense", "peaceful"], 2],
    ],
  },
  {
    id: "c:roadnottaken", title: "The Road Not Taken", author: "Robert Frost · 1916", zh: "《未选择的路》", verse: true,
    note: "常被读成“走少有人走的路”的励志诗,但第二、三节明说两条路其实 really about the same。结尾的 sigh 是事后给选择赋予意义。wanted wear = 少有人踩踏。",
    text: [
      "Two roads diverged in a yellow wood,\nAnd sorry I could not travel both\nAnd be one traveler, long I stood\nAnd looked down one as far as I could\nTo where it bent in the undergrowth;",
      "Then took the other, as just as fair,\nAnd having perhaps the better claim,\nBecause it was grassy and wanted wear;\nThough as for that the passing there\nHad worn them really about the same,",
      "And both that morning equally lay\nIn leaves no step had trodden black.\nOh, I kept the first for another day!\nYet knowing how way leads on to way,\nI doubted if I should ever come back.",
      "I shall be telling this with a sigh\nSomewhere ages and ages hence:\nTwo roads diverged in a wood, and I—\nI took the one less traveled by,\nAnd that has made all the difference.",
    ],
    quiz: [
      ["According to the second and third stanzas, the two roads were:", ["very different in appearance", "worn about the same", "both blocked by leaves", "leading to the same place"], 1],
      ["“Wanted wear” means the road:", ["needed repairing", "was heavily used", "had not been walked on much", "was wanted by many travellers"], 2],
    ],
  },
  {
    id: "c:carol", title: "A Christmas Carol", author: "Charles Dickens · 1843", zh: "《圣诞颂歌》开篇",
    note: "短句连发,口语化的叙述语气。good upon ’Change 指在交易所里信誉可靠;dead as a door-nail 是成语“死得透透的”。",
    text: [
      "Marley was dead: to begin with. There is no doubt whatever about that. The register of his burial was signed by the clergyman, the clerk, the undertaker, and the chief mourner. Scrooge signed it: and Scrooge’s name was good upon ’Change, for anything he chose to put his hand to. Old Marley was as dead as a door-nail.",
    ],
    quiz: [
      ["Why does the narrator insist so firmly that Marley was dead?", ["Because Scrooge doubted it", "To prepare the reader for something surprising to come", "Because the register was lost", "To show that Scrooge was grieving"], 1],
      ["“Scrooge’s name was good upon ’Change” suggests that Scrooge was:", ["generous", "trusted in business", "often changing his mind", "newly rich"], 1],
    ],
  },
  {
    id: "c:daffodils", title: "I Wandered Lonely as a Cloud", author: "William Wordsworth · 1807", zh: "《我孤独地漫游,像一朵云》", verse: true,
    note: "浪漫主义名篇。最后一节是重点:真正的收获不在当时,而在日后独处时“内心之眼”的回想。jocund = 欢快的;pensive = 沉思的。",
    text: [
      "I wandered lonely as a cloud\nThat floats on high o’er vales and hills,\nWhen all at once I saw a crowd,\nA host, of golden daffodils;\nBeside the lake, beneath the trees,\nFluttering and dancing in the breeze.",
      "Continuous as the stars that shine\nAnd twinkle on the milky way,\nThey stretched in never-ending line\nAlong the margin of a bay:\nTen thousand saw I at a glance,\nTossing their heads in sprightly dance.",
      "The waves beside them danced; but they\nOut-did the sparkling waves in glee:\nA poet could not but be gay,\nIn such a jocund company:\nI gazed—and gazed—but little thought\nWhat wealth the show to me had brought:",
      "For oft, when on my couch I lie\nIn vacant or in pensive mood,\nThey flash upon that inward eye\nWhich is the bliss of solitude;\nAnd then my heart with pleasure fills,\nAnd dances with the daffodils.",
    ],
    quiz: [
      ["“That inward eye” refers to:", ["a dream", "memory and imagination", "the poet’s conscience", "the surface of the lake"], 1],
      ["What “wealth” did the scene bring the poet?", ["Money from his poems", "Fame among other poets", "A lasting source of joy in recollection", "A friendship made by the lake"], 2],
    ],
  },
  {
    id: "c:alice", title: "Alice’s Adventures in Wonderland", author: "Lewis Carroll · 1865", zh: "《爱丽丝漫游奇境》开篇",
    note: "第二段是一个长句:主干 she was considering … whether …,when suddenly … 才引出故事的转折。括号里是插入语。",
    text: [
      "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice “without pictures or conversations?”",
      "So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.",
    ],
    quiz: [
      ["Why did Alice lose interest in her sister’s book?", ["It was too difficult", "It had no pictures or conversations", "Her sister would not share it", "She had read it before"], 1],
      ["What was Alice trying to decide when the Rabbit appeared?", ["Whether to follow her sister home", "Whether to go to sleep", "Whether making a daisy-chain was worth the effort", "Whether the book was useful"], 2],
    ],
  },
  {
    id: "c:invictus", title: "Invictus", author: "William Ernest Henley · 1888", zh: "《不可征服》", verse: true,
    note: "Invictus 是拉丁语“未被征服的”。fell = 残酷的;bludgeonings = 棒击;strait = 狭窄的(不是 straight)。最后两行是英语中最常被引用的诗句之一。",
    text: [
      "Out of the night that covers me,\nBlack as the pit from pole to pole,\nI thank whatever gods may be\nFor my unconquerable soul.",
      "In the fell clutch of circumstance\nI have not winced nor cried aloud.\nUnder the bludgeonings of chance\nMy head is bloody, but unbowed.",
      "Beyond this place of wrath and tears\nLooms but the Horror of the shade,\nAnd yet the menace of the years\nFinds and shall find me unafraid.",
      "It matters not how strait the gate,\nHow charged with punishments the scroll,\nI am the master of my fate,\nI am the captain of my soul.",
    ],
    quiz: [
      ["“My head is bloody, but unbowed” means the speaker is:", ["defeated and ashamed", "hurt but not defeated", "angry at the gods", "unaware of his injuries"], 1],
      ["“How strait the gate” describes a gate that is:", ["narrow and hard to pass", "perfectly straight", "wide open", "far away"], 0],
    ],
  },
  {
    id: "c:huckfinn", title: "Adventures of Huckleberry Finn", author: "Mark Twain · 1884", zh: "《哈克贝利·费恩历险记》开篇",
    note: "用方言写成:without = unless;that ain’t no matter = that doesn’t matter;There was things = There were things。这些“语法错误”是刻意的人物口吻。",
    text: [
      "You don’t know about me without you have read a book by the name of The Adventures of Tom Sawyer; but that ain’t no matter. That book was made by Mr. Mark Twain, and he told the truth, mainly. There was things which he stretched, but mainly he told the truth.",
    ],
    quiz: [
      ["“There was things which he stretched” means Mark Twain:", ["wrote too long a book", "exaggerated some things", "left some things out", "repeated himself"], 1],
      ["The nonstandard grammar is used mainly to:", ["show the narrator’s own voice", "confuse the reader", "imitate older English", "save space"], 0],
    ],
  },
  {
    id: "c:hope", title: "“Hope” is the thing with feathers", author: "Emily Dickinson · c. 1861", zh: "《“希望”是长着羽毛的东西》", verse: true,
    note: "把希望比作一只栖在灵魂里的小鸟。破折号是 Dickinson 的标志性写法,读时稍作停顿即可。abash = 使窘迫、使退缩;in Extremity = 在绝境中。",
    text: [
      "“Hope” is the thing with feathers -\nThat perches in the soul -\nAnd sings the tune without the words -\nAnd never stops - at all -",
      "And sweetest - in the Gale - is heard -\nAnd sore must be the storm -\nThat could abash the little Bird\nThat kept so many warm -",
      "I’ve heard it in the chillest land -\nAnd on the strangest Sea -\nYet - never - in Extremity,\nIt asked a crumb - of me.",
    ],
    quiz: [
      ["When is the bird’s song “sweetest”?", ["In calm weather", "In the storm", "At night", "When it is fed"], 1],
      ["The last two lines suggest that hope:", ["demands a great deal", "disappears in hard times", "asks nothing in return", "must be fed to survive"], 2],
    ],
  },
  {
    id: "c:expectations", title: "Great Expectations", author: "Charles Dickens · 1861", zh: "《远大前程》开篇",
    note: "第一句以独立主格结构开头(My father’s family name being Pirrip …),主句是 my infant tongue could make of both names nothing longer … than Pip。",
    text: [
      "My father’s family name being Pirrip, and my Christian name Philip, my infant tongue could make of both names nothing longer or more explicit than Pip. So, I called myself Pip, and came to be called Pip.",
      "I give Pirrip as my father’s family name, on the authority of his tombstone and my sister,—Mrs. Joe Gargery, who married the blacksmith.",
    ],
    quiz: [
      ["How did the narrator get the name Pip?", ["His sister chose it", "It was written on a tombstone", "As a small child he could not pronounce his real names", "The blacksmith gave it to him"], 2],
      ["“On the authority of his tombstone” implies that the narrator’s father:", ["was a stonemason", "is dead", "wrote the family history", "left him an inheritance"], 1],
    ],
  },
  {
    id: "c:whenyouareold", title: "When You Are Old", author: "W. B. Yeats · 1893", zh: "《当你老了》", verse: true,
    note: "写给 Maud Gonne。第二节的对比是全诗核心:many 爱的是你的青春美貌,but one man 爱的是你的 pilgrim soul(朝圣者般的灵魂)。",
    text: [
      "When you are old and grey and full of sleep,\nAnd nodding by the fire, take down this book,\nAnd slowly read, and dream of the soft look\nYour eyes had once, and of their shadows deep;",
      "How many loved your moments of glad grace,\nAnd loved your beauty with love false or true,\nBut one man loved the pilgrim soul in you,\nAnd loved the sorrows of your changing face;",
      "And bending down beside the glowing bars,\nMurmur, a little sadly, how Love fled\nAnd paced upon the mountains overhead\nAnd hid his face amid a crowd of stars.",
    ],
    quiz: [
      ["What distinguishes the “one man” from the many?", ["He loved her beauty more truly", "He loved her soul and even her sorrows", "He was the first to love her", "He wrote her many books"], 1],
      ["The mood of the final stanza is:", ["bitter and accusing", "joyful", "quietly regretful", "indifferent"], 2],
    ],
  },
  {
    id: "c:wuthering", title: "Wuthering Heights", author: "Emily Brontë · 1847", zh: "《呼啸山庄》选段",
    note: "Catherine 对 Nelly 的自白。两组比喻对照:对 Linton 的爱像树叶(会变),对 Heathcliff 的爱像地下的岩石(不显眼却必需)。第一句是两个并列的虚拟条件句。",
    text: [
      "If all else perished, and he remained, I should still continue to be; and if all else remained, and he were annihilated, the universe would turn to a mighty stranger: I should not seem a part of it.",
      "My love for Linton is like the foliage in the woods: time will change it, I’m well aware, as winter changes the trees. My love for Heathcliff resembles the eternal rocks beneath: a source of little visible delight, but necessary. Nelly, I am Heathcliff!",
    ],
    quiz: [
      ["Comparing her love for Linton to foliage implies that it:", ["is deeply rooted", "will change with time", "is hidden from view", "grows stronger each year"], 1],
      ["“A source of little visible delight, but necessary” describes:", ["her love for Heathcliff", "her love for Linton", "the winter woods", "Nelly’s loyalty"], 0],
    ],
  },
  {
    id: "c:tyger", title: "The Tyger", author: "William Blake · 1794", zh: "《老虎》(选节)", verse: true,
    note: "全诗由一连串没有答案的问句构成:造出温顺羔羊的造物主,也造出了可怖的老虎吗?注意首尾两节只差一个词:Could 变成了 Dare。",
    text: [
      "Tyger Tyger, burning bright,\nIn the forests of the night;\nWhat immortal hand or eye,\nCould frame thy fearful symmetry?",
      "In what distant deeps or skies.\nBurnt the fire of thine eyes?\nOn what wings dare he aspire?\nWhat the hand, dare seize the fire?",
      "When the stars threw down their spears\nAnd water’d heaven with their tears:\nDid he smile his work to see?\nDid he who made the Lamb make thee?",
      "Tyger Tyger burning bright,\nIn the forests of the night:\nWhat immortal hand or eye,\nDare frame thy fearful symmetry?",
    ],
    quiz: [
      ["The central question of the poem is:", ["where tigers live", "what kind of creator could make such a fearsome creature", "why the stars wept", "how to tame the tiger"], 1],
      ["“Did he who made the Lamb make thee?” contrasts:", ["day and night", "heaven and earth", "gentleness and terror", "youth and age"], 2],
    ],
  },
  {
    id: "c:telltale", title: "The Tell-Tale Heart", author: "Edgar Allan Poe · 1843", zh: "《泄密的心》开篇",
    note: "不可靠叙述者的经典:越是强调自己没疯,越显得疯。破折号和短促的句子模拟紧张的语气。Hearken = listen。",
    text: [
      "True!—nervous—very, very dreadfully nervous I had been and am; but why will you say that I am mad? The disease had sharpened my senses—not destroyed—not dulled them. Above all was the sense of hearing acute. I heard all things in the heaven and in the earth. I heard many things in hell. How, then, am I mad? Hearken! and observe how healthily—how calmly I can tell you the whole story.",
    ],
    quiz: [
      ["What effect does the narrator’s insistence on his sanity have on the reader?", ["It proves he is reliable", "It makes him seem less sane", "It shows he is a doctor", "It makes the story comic"], 1],
      ["Which sense does the narrator say is especially sharp?", ["Sight", "Smell", "Touch", "Hearing"], 3],
    ],
  },
  {
    id: "c:hamlet", title: "Hamlet", author: "William Shakespeare · c. 1600", zh: "《哈姆雷特》“生存还是毁灭”独白(节选)", verse: true,
    note: "’tis = it is;consummation = 圆满的结局;there’s the rub = 麻烦就在这里;shuffled off this mortal coil = 摆脱尘世的纷扰(即死去)。",
    text: [
      "To be, or not to be, that is the question:\nWhether ’tis nobler in the mind to suffer\nThe slings and arrows of outrageous fortune,\nOr to take arms against a sea of troubles\nAnd by opposing end them.",
      "To die—to sleep,\nNo more; and by a sleep to say we end\nThe heart-ache and the thousand natural shocks\nThat flesh is heir to: ’tis a consummation\nDevoutly to be wish’d.",
      "To die, to sleep;\nTo sleep, perchance to dream—ay, there’s the rub:\nFor in that sleep of death what dreams may come,\nWhen we have shuffled off this mortal coil,\nMust give us pause.",
    ],
    quiz: [
      ["“There’s the rub” means:", ["there is the solution", "there is the difficulty", "there is the comfort", "there is the reward"], 1],
      ["What makes Hamlet hesitate about death?", ["Fear of physical pain", "Love of life", "Uncertainty about what may come after it", "Duty to his father"], 2],
    ],
  },
  {
    id: "c:bohemia", title: "A Scandal in Bohemia", author: "Arthur Conan Doyle · 1891", zh: "《波希米亚丑闻》开篇",
    note: "福尔摩斯探案中的名篇开头。eclipses and predominates = 使……黯然失色并居于其上;abhorrent to = 为……所厌恶;I take it = 我认为。",
    text: [
      "To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex.",
      "It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind. He was, I take it, the most perfect reasoning and observing machine that the world has seen, but as a lover he would have placed himself in a false position.",
    ],
    quiz: [
      ["How does Holmes regard Irene Adler?", ["He is in love with her", "He considers her superior to all other women", "He distrusts her", "He has forgotten her"], 1],
      ["“Abhorrent to his … mind” means that emotions were:", ["attractive to him", "unknown to him", "deeply disagreeable to him", "useful to him"], 2],
    ],
  },
  {
    id: "c:macbeth", title: "Macbeth", author: "William Shakespeare · c. 1606", zh: "《麦克白》“明天,又一个明天”独白", verse: true,
    note: "麦克白得知妻子死讯后的独白。意象层层递进:蜡烛、影子、蹩脚演员、白痴讲的故事。sound and fury 后来成了福克纳小说《喧哗与骚动》的书名。",
    text: [
      "To-morrow, and to-morrow, and to-morrow,\nCreeps in this petty pace from day to day,\nTo the last syllable of recorded time;\nAnd all our yesterdays have lighted fools\nThe way to dusty death.",
      "Out, out, brief candle!\nLife’s but a walking shadow, a poor player,\nThat struts and frets his hour upon the stage,\nAnd then is heard no more. It is a tale\nTold by an idiot, full of sound and fury,\nSignifying nothing.",
    ],
    quiz: [
      ["“A poor player” here means:", ["an unlucky gambler", "a bad musician", "an actor of little worth", "a penniless child"], 2],
      ["Macbeth’s view of life in this speech is that it is:", ["short but glorious", "brief and meaningless", "a test of courage", "guided by fate towards good"], 1],
    ],
  },
  {
    id: "c:callofwild", title: "The Call of the Wild", author: "Jack London · 1903", zh: "《野性的呼唤》开篇",
    note: "从一条狗的视角开场。背景是 1890 年代克朗代克淘金热:yellow metal 即黄金。booming the find = 大肆宣扬这一发现。",
    text: [
      "Buck did not read the newspapers, or he would have known that trouble was brewing, not alone for himself, but for every tide-water dog, strong of muscle and with warm, long hair, from Puget Sound to San Diego.",
      "Because men, groping in the Arctic darkness, had found a yellow metal, and because steamship and transportation companies were booming the find, thousands of men were rushing into the Northland. These men wanted dogs, and the dogs they wanted were heavy dogs, with strong muscles by which to toil, and furry coats to protect them from the frost.",
    ],
    quiz: [
      ["Why was “trouble brewing” for dogs like Buck?", ["A disease was spreading", "Gold-seekers heading north needed strong dogs", "Newspapers were warning against dogs", "Winter was unusually cold"], 1],
      ["“A yellow metal” refers to:", ["copper", "brass", "gold", "iron"], 2],
    ],
  },
  {
    id: "c:ulysses", title: "Ulysses", author: "Alfred, Lord Tennyson · 1842", zh: "《尤利西斯》结尾", verse: true,
    note: "年迈的奥德修斯号召老水手们再次出航。Tho’ = though;abides = 留存。最后一行连用四个不定式,是英语诗中最有力的结尾之一。",
    text: [
      "Come, my friends,\n’Tis not too late to seek a newer world.",
      "Tho’ much is taken, much abides; and tho’\nWe are not now that strength which in old days\nMoved earth and heaven, that which we are, we are;\nOne equal temper of heroic hearts,\nMade weak by time and fate, but strong in will\nTo strive, to seek, to find, and not to yield.",
    ],
    quiz: [
      ["“Tho’ much is taken, much abides” means:", ["everything has been lost", "although much has been lost, much remains", "the more we take, the more we keep", "nothing ever changes"], 1],
      ["The speaker and his friends are described as:", ["young and reckless", "weakened by age but strong in will", "tired and ready to rest", "defeated by fate"], 1],
    ],
  },
  {
    id: "c:declaration", title: "The Declaration of Independence", author: "Thomas Jefferson · 1776", zh: "《独立宣言》选段",
    note: "一个由多个 that 从句并列构成的长句,层层推进:人人平等 → 天赋权利 → 政府为保障权利而设 → 政府背离目的时人民有权更换。unalienable = 不可剥夺的。",
    text: [
      "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.",
      "That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed, That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it, and to institute new Government, laying its foundation on such principles and organizing its powers in such form, as to them shall seem most likely to effect their Safety and Happiness.",
    ],
    quiz: [
      ["According to the text, governments get their just powers from:", ["the Creator", "tradition", "the consent of the governed", "military strength"], 2],
      ["“Unalienable Rights” are rights that:", ["foreigners do not have", "cannot be taken away", "must be earned", "are granted by governments"], 1],
    ],
  },
  {
    id: "c:crisis", title: "The American Crisis", author: "Thomas Paine · 1776", zh: "《美国危机》开篇",
    note: "独立战争最艰难时写下的檄文。summer soldier / sunshine patriot 指只在顺境中效力的人。dearness 在这里是“代价高昂”,与前文 too cheap 相对。",
    text: [
      "These are the times that try men’s souls. The summer soldier and the sunshine patriot will, in this crisis, shrink from the service of their country; but he that stands by it now, deserves the love and thanks of man and woman.",
      "Tyranny, like hell, is not easily conquered; yet we have this consolation with us, that the harder the conflict, the more glorious the triumph. What we obtain too cheap, we esteem too lightly: it is dearness only that gives every thing its value.",
    ],
    quiz: [
      ["A “sunshine patriot” is someone who:", ["loves warm weather", "supports the cause only when things are easy", "fights only in daylight", "is always optimistic"], 1],
      ["“It is dearness only that gives every thing its value” means:", ["only loved things are valuable", "things are valued according to what they cost us", "expensive goods are better", "value cannot be measured"], 1],
    ],
  },
  {
    id: "c:inaugural", title: "Second Inaugural Address", author: "Abraham Lincoln · 1865", zh: "林肯第二次就职演说结尾",
    note: "内战即将结束时的演说,全段只有一句话。三个 with 短语开头,主句是 let us strive on,后接四个并列的不定式 to finish / to bind up / to care for / to do。",
    text: [
      "With malice toward none, with charity for all, with firmness in the right as God gives us to see the right, let us strive on to finish the work we are in, to bind up the nation’s wounds, to care for him who shall have borne the battle and for his widow and his orphan, to do all which may achieve and cherish a just and lasting peace among ourselves and with all nations.",
    ],
    quiz: [
      ["The tone Lincoln takes towards the defeated side is:", ["vengeful", "conciliatory", "mocking", "indifferent"], 1],
      ["“Him who shall have borne the battle” refers to:", ["the president", "the enemy general", "the soldier who fought", "the nation’s founders"], 2],
    ],
  },
  {
    id: "c:selfreliance", title: "Self-Reliance", author: "Ralph Waldo Emerson · 1841", zh: "《论自助》选句",
    note: "格言式的散文。hobgoblin = 吓唬人的小妖怪;a foolish consistency 指为了“前后一致”而不敢改变看法。最后一段用一串被误解的伟人来论证。",
    text: [
      "Trust thyself: every heart vibrates to that iron string.",
      "Whoso would be a man must be a nonconformist.",
      "A foolish consistency is the hobgoblin of little minds, adored by little statesmen and philosophers and divines. With consistency a great soul has simply nothing to do.",
      "Is it so bad, then, to be misunderstood? Pythagoras was misunderstood, and Socrates, and Jesus, and Luther, and Copernicus, and Galileo, and Newton, and every pure and wise spirit that ever took flesh. To be great is to be misunderstood.",
    ],
    quiz: [
      ["Emerson criticises “a foolish consistency” because it:", ["keeps people from changing their minds when they should", "makes people unreliable", "is admired by great souls", "leads to misunderstanding"], 0],
      ["Why does Emerson list Socrates, Galileo and Newton?", ["To show that science is difficult", "To show that greatness has often been misunderstood", "To praise ancient learning", "To argue that they were nonconformists by birth"], 1],
    ],
  },
  {
    id: "c:origin", title: "On the Origin of Species", author: "Charles Darwin · 1859", zh: "《物种起源》结尾",
    note: "全书最后一句。主干是 There is grandeur in this view of life;whilst … 引出对照:行星按固定规律运转的同时,生命从简单的开端演化出无穷的形态。",
    text: [
      "There is grandeur in this view of life, with its several powers, having been originally breathed into a few forms or into one; and that, whilst this planet has gone cycling on according to the fixed law of gravity, from so simple a beginning endless forms most beautiful and most wonderful have been, and are being, evolved.",
    ],
    quiz: [
      ["What does Darwin find “grand”?", ["The law of gravity", "The idea that endless forms of life evolved from a simple beginning", "The size of the planet", "The power of human science"], 1],
      ["“Have been, and are being, evolved” emphasises that evolution:", ["ended long ago", "is still going on", "happens only to simple forms", "is merely a theory"], 1],
    ],
  },
  {
    id: "c:studies", title: "Of Studies", author: "Francis Bacon · 1625", zh: "《论读书》选段",
    note: "早期现代英语:maketh = makes;conference = 交谈讨论;curiously = 仔细地(古义)。句式高度平行,王佐良的中译“读书足以怡情,足以傅彩,足以长才”是翻译名篇。",
    text: [
      "Studies serve for delight, for ornament, and for ability. Their chief use for delight, is in privateness and retiring; for ornament, is in discourse; and for ability, is in the judgment, and disposition of business.",
      "Read not to contradict and confute; nor to believe and take for granted; nor to find talk and discourse; but to weigh and consider. Some books are to be tasted, others to be swallowed, and some few to be chewed and digested; that is, some books are to be read only in parts; others to be read, but not curiously; and some few to be read wholly, and with diligence and attention.",
      "Reading maketh a full man; conference a ready man; and writing an exact man.",
    ],
    quiz: [
      ["Books “to be chewed and digested” are those that should be:", ["read only in parts", "read quickly", "read completely and with close attention", "avoided"], 2],
      ["According to Bacon, the proper purpose of reading is:", ["to win arguments", "to accept what is written", "to have something to talk about", "to weigh and consider"], 3],
    ],
  },
  {
    id: "c:donne", title: "Meditation XVII", author: "John Donne · 1624", zh: "《沉思录》第十七篇选段",
    note: "“没有人是一座孤岛”的出处,也是海明威《丧钟为谁而鸣》书名的来源。the main = 大陆;clod = 土块;promontory = 海岬。",
    text: [
      "No man is an island, entire of itself; every man is a piece of the continent, a part of the main. If a clod be washed away by the sea, Europe is the less, as well as if a promontory were, as well as if a manor of thy friend’s or of thine own were: any man’s death diminishes me, because I am involved in mankind, and therefore never send to know for whom the bell tolls; it tolls for thee.",
    ],
    quiz: [
      ["The main idea of the passage is that:", ["islands are slowly disappearing", "every person is connected to all of humanity", "death should be feared", "Europe is one country"], 1],
      ["“It tolls for thee” means:", ["the bell is calling you to church", "another person’s death concerns you too", "you have been found guilty", "you will be rewarded"], 1],
    ],
  },
  {
    id: "c:doriangray", title: "The Picture of Dorian Gray", author: "Oscar Wilde · 1891", zh: "《道林·格雷的画像》序言选句",
    note: "唯美主义宣言,由一句句悖论式的格言组成。Wilde 主张艺术不承担道德功能,只有写得好与坏之分。",
    text: [
      "The artist is the creator of beautiful things. To reveal art and conceal the artist is art’s aim.",
      "Those who find ugly meanings in beautiful things are corrupt without being charming. This is a fault.",
      "There is no such thing as a moral or an immoral book. Books are well written, or badly written. That is all.",
      "All art is quite useless.",
    ],
    quiz: [
      ["According to Wilde, books should be judged by:", ["their moral lessons", "how well they are written", "their popularity", "the character of their authors"], 1],
      ["“To reveal art and conceal the artist is art’s aim” means that:", ["artists should remain anonymous by law", "a work should show itself, not its maker", "art should hide its beauty", "artists should avoid the public"], 1],
    ],
  },
];

export const CLASSICS2 = RAW.map((c) => ({ ...c, quiz: c.quiz.map(([q, opts, a]) => ({ q, opts, a })) }));
