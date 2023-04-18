import { OneAI } from 'oneai';

const oneai = new OneAI('4e176a0e-a844-4060-a4fe-4a17e7ecdf56');

const pipeline = new oneai.Pipeline(
   oneai.skills.names(),
   oneai.skills.summarize(),
   oneai.skills.highlights()
);

const output = await pipeline.run('Whether to power translation to document summarization, enterprises are increasing their investments in natural language processing (NLP) technologies. According to a 2021 survey from John Snow Labs and Gradient Flow, 60% of tech leaders indicated that their NLP budgets grew by at least 10% compared to 2020, while a third said that spending climbed by more than 30%');

console.log(output.summary.text);
