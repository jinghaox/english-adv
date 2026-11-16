// 经典文学选段(均为公有领域作品)。quiz: a 为正确选项下标。
import { CLASSICS2 } from './classics2.js';

const FIRST = [
  {
    id: 'c:pride',
    title: 'Pride and Prejudice',
    author: 'Jane Austen · 1813',
    zh: '《傲慢与偏见》开篇',
    note: '英语文学中最著名的开场白之一。注意 Austen 的反讽:表面上说“举世公认的真理”,实际上是在调侃急着嫁女儿的邻里。',
    text: [
      'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
      'However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters.',
    ],
    quiz: [
      {
        q: 'In this passage, “in want of a wife” most nearly means:',
        opts: ['needing or lacking a wife', 'unwilling to take a wife', 'searching for his lost wife', 'wanted by his wife'],
        a: 0,
      },
      {
        q: 'According to the second sentence, the neighbouring families regard a rich single man as:',
        opts: ['a threat to their daughters', 'someone whose feelings must be respected first', 'already belonging to one of their daughters', 'a stranger who should be avoided'],
        a: 2,
      },
      {
        q: 'The tone of the opening sentence is best described as:',
        opts: ['solemn and philosophical', 'ironic', 'angry', 'nostalgic'],
        a: 1,
      },
    ],
  },
  {
    id: 'c:twocities',
    title: 'A Tale of Two Cities',
    author: 'Charles Dickens · 1859',
    zh: '《双城记》开篇',
    note: '整段只有一句话,用一连串对照(anaphora 首语重复)写出法国大革命前夕的矛盾时代。重点看最后的 in short … 才是主句的落点。',
    text: [
      'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way—in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.',
    ],
    quiz: [
      {
        q: '“Incredulity” is closest in meaning to:',
        opts: ['disbelief', 'cruelty', 'innocence', 'faith'],
        a: 0,
      },
      {
        q: 'What does the narrator say the period had in common with “the present period”?',
        opts: ['Both were peaceful and prosperous', 'People insisted on describing it only in extremes', 'Nobody believed in anything', 'Its authorities were unusually quiet'],
        a: 1,
      },
      {
        q: '“In the superlative degree of comparison only” means the age was described:',
        opts: ['only with words like “best” and “worst”', 'only by comparing it with the past', 'only by its most educated people', 'with great precision'],
        a: 0,
      },
    ],
  },
  {
    id: 'c:mobydick',
    title: 'Moby-Dick',
    author: 'Herman Melville · 1851',
    zh: '《白鲸》开篇',
    note: '第二段是一个由四个 whenever 从句层层铺垫的长句,主句直到 then, I account it high time … 才出现。spleen、hypos 都指忧郁情绪。',
    text: [
      'Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation.',
      'Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to sea as soon as I can.',
    ],
    quiz: [
      {
        q: 'Why does Ishmael go to sea?',
        opts: ['To make his fortune', 'To escape the law', 'To cure his low spirits', 'To find a lost relative'],
        a: 2,
      },
      {
        q: '“A damp, drizzly November in my soul” is a metaphor for:',
        opts: ['a feeling of gloom', 'bad weather at sea', 'old age', 'a guilty conscience'],
        a: 0,
      },
      {
        q: 'What is the main clause of the long second sentence?',
        opts: ['whenever I find myself growing grim about the mouth', 'it requires a strong moral principle', 'I account it high time to get to sea', 'my hypos get such an upper hand of me'],
        a: 2,
      },
    ],
  },
  {
    id: 'c:walden',
    title: 'Walden',
    author: 'Henry David Thoreau · 1854',
    zh: '《瓦尔登湖》选段',
    note: '梭罗解释自己为何独居林中。deliberately 在这里是“从容审慎地”;front = confront;marrow 是骨髓,引申为精华。',
    text: [
      'I went to the woods because I wished to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived.',
      'I did not wish to live what was not life, living is so dear; nor did I wish to practise resignation, unless it was quite necessary. I wanted to live deep and suck out all the marrow of life, to live so sturdily and Spartan-like as to put to rout all that was not life, to cut a broad swath and shave close, to drive life into a corner, and reduce it to its lowest terms.',
    ],
    quiz: [
      {
        q: 'What does Thoreau most fear, according to the first sentence?',
        opts: ['Dying alone in the woods', 'Reaching the end of life and finding he had never truly lived', 'Being unable to learn from books', 'Losing touch with society'],
        a: 1,
      },
      {
        q: '“Living is so dear” means that life is:',
        opts: ['expensive to maintain', 'precious', 'lonely', 'difficult'],
        a: 1,
      },
      {
        q: '“To put to rout all that was not life” means to:',
        opts: ['drive away everything inessential', 'travel along every possible road', 'record everything he experienced', 'reject the company of other people'],
        a: 0,
      },
    ],
  },
  {
    id: 'c:gatsby',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald · 1925',
    zh: '《了不起的盖茨比》开篇与结尾',
    note: '开篇父亲的忠告奠定了叙述者 Nick “不轻易评判”的立场;结尾的 green light 与逆流而上的小船,是美国文学中最著名的意象之一。',
    text: [
      'In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since.',
      '“Whenever you feel like criticizing anyone,” he told me, “just remember that all the people in this world haven’t had the advantages that you’ve had.”',
      'Gatsby believed in the green light, the orgastic future that year by year recedes before us. It eluded us then, but that’s no matter—tomorrow we will run faster, stretch out our arms farther. . . . And one fine morning——',
      'So we beat on, boats against the current, borne back ceaselessly into the past.',
    ],
    quiz: [
      {
        q: 'The father’s advice is essentially a warning against:',
        opts: ['trusting strangers', 'judging others too quickly', 'wasting one’s advantages', 'talking too much'],
        a: 1,
      },
      {
        q: '“Recedes” in “year by year recedes before us” means:',
        opts: ['moves further away', 'grows brighter', 'repeats itself', 'comes closer'],
        a: 0,
      },
      {
        q: 'The final sentence suggests that people:',
        opts: ['always reach their dreams in the end', 'should stop striving', 'keep striving forward yet are constantly pulled back by the past', 'are happiest when they forget the past'],
        a: 2,
      },
    ],
  },
  {
    id: 'c:gettysburg',
    title: 'The Gettysburg Address',
    author: 'Abraham Lincoln · 1863',
    zh: '《葛底斯堡演说》选段',
    note: '英语演说的典范:句式平行、节奏鲜明。score = 20,所以 four score and seven years = 87 年。注意 dedicate / consecrate / hallow 三个近义动词的递进。',
    text: [
      'Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.',
      'Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.',
      'But, in a larger sense, we can not dedicate—we can not consecrate—we can not hallow—this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here.',
    ],
    quiz: [
      {
        q: '“Four score and seven years” equals:',
        opts: ['47 years', '87 years', '407 years', '27 years'],
        a: 1,
      },
      {
        q: 'Why does Lincoln say “we can not hallow this ground”?',
        opts: ['The war is not yet over', 'The ground belongs to the enemy', 'The soldiers who fought there have already made it sacred', 'The ceremony was not properly prepared'],
        a: 2,
      },
      {
        q: '“Far above our poor power to add or detract” implies that the speakers’ words are:',
        opts: ['insignificant compared with the soldiers’ deeds', 'more powerful than weapons', 'likely to be misunderstood', 'too long to be remembered'],
        a: 0,
      },
    ],
  },
];

export const CLASSICS = [...FIRST, ...CLASSICS2];
