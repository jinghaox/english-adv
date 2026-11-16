// 听说练习句库。lv: 1 = 中高级, 2 = 高级, 3 = 精通
export const PRACTICE = [
  [1, 'I would rather take the train than sit in traffic for two hours.'],
  [1, 'Could you let me know whether the meeting has been moved to Thursday?'],
  [1, 'The longer you put it off, the harder it will be to get started.'],
  [1, 'She has been working on this project since the beginning of the year.'],
  [1, 'If I had known you were coming, I would have saved you a seat.'],
  [1, 'It took me a while to get used to driving on the other side of the road.'],

  [2, 'What struck me most was how calmly everyone reacted to the announcement.'],
  [2, 'The company is under pressure to cut costs without compromising on quality.'],
  [2, 'Had it not been for her advice, I would never have applied for the position.'],
  [2, 'Critics argue that the policy does little to address the root causes of the problem.'],
  [2, 'He has a habit of glossing over the details that don’t support his argument.'],
  [2, 'There is a growing consensus that the current approach is simply not sustainable.'],

  [3, 'Not until the results were published did the scale of the problem become apparent.'],
  [3, 'The proposal, ambitious though it is, rests on assumptions that few experts would endorse.'],
  [3, 'Whether the measures will achieve anything beyond placating nervous investors remains to be seen.'],
  [3, 'So thoroughly had the rumour taken hold that even a flat denial did nothing to dispel it.'],
  [3, 'What distinguishes a seasoned negotiator is less the ability to persuade than the willingness to listen.'],
  [3, 'It is one thing to acknowledge a mistake in private and quite another to be held publicly accountable for it.'],
].map(([lv, s]) => ({ lv, s }));

export const SCENARIOS = [
  { id: 'free', name: '自由聊天', prompt: 'Open-ended small talk. Start by asking what the learner would like to talk about today, or offer two interesting topics.' },
  { id: 'news', name: '时事讨论', prompt: 'Discuss current affairs. Pick one of the headlines below (if any are provided), summarise it in two sentences, and ask for the learner’s opinion. Push back politely so they have to defend their view.' },
  { id: 'interview', name: '英文面试', prompt: 'Role-play a job interview. You are the interviewer. First ask what role the learner wants to interview for, then ask one question at a time and follow up on their answers.' },
  { id: 'debate', name: '观点辩论', prompt: 'Friendly debate practice. Propose a debatable statement, let the learner pick a side, and argue the opposite side in a measured way.' },
  { id: 'book', name: '读书讨论', prompt: 'Talk about books and classic literature. Ask what the learner has been reading in the app or elsewhere and discuss themes, characters and style.' },
];
