import { NextRequest, NextResponse } from 'next/server';
import { handleApiError } from '@/lib/api-utils';

const PROPHECIES = [
  { id: 1, title: 'Born of a Virgin', category: 'Messianic', status: 'fulfilled', otBook: 'Isaiah', otRef: '7:14', ntBook: 'Matthew', ntRef: '1:23' },
  { id: 2, title: 'Born in Bethlehem', category: 'Messianic', status: 'fulfilled', otBook: 'Micah', otRef: '5:2', ntBook: 'Matthew', ntRef: '2:1' },
  { id: 3, title: 'Triumphal Entry', category: 'Messianic', status: 'fulfilled', otBook: 'Zechariah', otRef: '9:9', ntBook: 'Matthew', ntRef: '21:5' },
  { id: 4, title: 'Betrayed for 30 Silver', category: 'Messianic', status: 'fulfilled', otBook: 'Zechariah', otRef: '11:12', ntBook: 'Matthew', ntRef: '26:15' },
  { id: 5, title: 'Pierced Hands and Feet', category: 'Messianic', status: 'fulfilled', otBook: 'Psalms', otRef: '22:16', ntBook: 'John', ntRef: '20:25' },
  { id: 6, title: 'Suffering Servant', category: 'Messianic', status: 'fulfilled', otBook: 'Isaiah', otRef: '53:5', ntBook: '1 Peter', ntRef: '2:24' },
  { id: 7, title: 'Resurrection', category: 'Messianic', status: 'fulfilled', otBook: 'Psalms', otRef: '16:10', ntBook: 'Acts', ntRef: '2:31' },
  { id: 8, title: 'Temple Destruction', category: 'Historical', status: 'fulfilled', otBook: 'Daniel', otRef: '9:26', ntBook: 'Matthew', ntRef: '24:2' },
  { id: 9, title: 'Israel Scattered', category: 'Historical', status: 'fulfilled', otBook: 'Deuteronomy', otRef: '28:64', ntBook: 'Luke', ntRef: '21:24' },
  { id: 10, title: 'Israel Regathered', category: 'Eschatological', status: 'partially', otBook: 'Ezekiel', otRef: '37:21', ntBook: 'Romans', ntRef: '11:26' },
  { id: 11, title: 'New Heaven & Earth', category: 'Eschatological', status: 'future', otBook: 'Isaiah', otRef: '65:17', ntBook: 'Revelation', ntRef: '21:1' },
  { id: 12, title: 'Second Coming', category: 'Eschatological', status: 'future', otBook: 'Daniel', otRef: '7:13', ntBook: 'Matthew', ntRef: '24:30' },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    let results = PROPHECIES;
    if (category) results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
    if (status) results = results.filter(p => p.status === status);

    return NextResponse.json({
      prophecies: results,
      total: results.length,
      stats: {
        fulfilled: PROPHECIES.filter(p => p.status === 'fulfilled').length,
        partially: PROPHECIES.filter(p => p.status === 'partially').length,
        future: PROPHECIES.filter(p => p.status === 'future').length,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
