import { test } from './test.mjs';
import { question } from './question.mjs';
import { user } from './user.mjs';
import { stat } from './stat.mjs';

export const mockList = [...test, ...question, ...user, ...stat];
