import { NextRequest, NextResponse } from 'next/server';
import { handleApiError } from '@/lib/api-utils';

const PARABLES = [
  { name: 'The Sower', theme: 'Kingdom', gospels: { matthew: '13:1-23', mark: '4:1-20', luke: '8:4-15' } },
  { name: 'The Mustard Seed', theme: 'Kingdom', gospels: { matthew: '13:31-32', mark: '4:30-32', luke: '13:18-19' } },
  { name: 'The Leaven', theme: 'Kingdom', gospels: { matthew: '13:33', luke: '13:20-21' } },
  { name: 'The Hidden Treasure', theme: 'Kingdom', gospels: { matthew: '13:44' } },
  { name: 'The Pearl of Great Price', theme: 'Kingdom', gospels: { matthew: '13:45-46' } },
  { name: 'The Dragnet', theme: 'Judgment', gospels: { matthew: '13:47-50' } },
  { name: 'The Lost Sheep', theme: 'Grace', gospels: { matthew: '18:12-14', luke: '15:3-7' } },
  { name: 'The Lost Coin', theme: 'Grace', gospels: { luke: '15:8-10' } },
  { name: 'The Prodigal Son', theme: 'Grace', gospels: { luke: '15:11-32' } },
  { name: 'The Good Samaritan', theme: 'Love', gospels: { luke: '10:25-37' } },
  { name: 'The Rich Fool', theme: 'Wealth', gospels: { luke: '12:16-21' } },
  { name: 'The Unforgiving Servant', theme: 'Forgiveness', gospels: { matthew: '18:21-35' } },
  { name: 'The Workers in the Vineyard', theme: 'Grace', gospels: { matthew: '20:1-16' } },
  { name: 'The Two Sons', theme: 'Obedience', gospels: { matthew: '21:28-32' } },
  { name: 'The Wicked Tenants', theme: 'Judgment', gospels: { matthew: '21:33-46', mark: '12:1-12', luke: '20:9-19' } },
  { name: 'The Wedding Banquet', theme: 'Kingdom', gospels: { matthew: '22:1-14' } },
  { name: 'The Ten Virgins', theme: 'Readiness', gospels: { matthew: '25:1-13' } },
  { name: 'The Talents', theme: 'Stewardship', gospels: { matthew: '25:14-30' } },
  { name: 'The Sheep and the Goats', theme: 'Judgment', gospels: { matthew: '25:31-46' } },
  { name: 'The Rich Man and Lazarus', theme: 'Wealth', gospels: { luke: '16:19-31' } },
  { name: 'The Pharisee and the Tax Collector', theme: 'Humility', gospels: { luke: '18:9-14' } },
  { name: 'The Fig Tree', theme: 'Readiness', gospels: { matthew: '24:32-35', mark: '13:28-31', luke: '21:29-33' } },
  { name: 'The Growing Seed', theme: 'Kingdom', gospels: { mark: '4:26-29' } },
  { name: 'The Persistent Widow', theme: 'Prayer', gospels: { luke: '18:1-8' } },
  { name: 'The Friend at Midnight', theme: 'Prayer', gospels: { luke: '11:5-13' } },
  { name: 'The Vine and the Branches', theme: 'Discipleship', gospels: { john: '15:1-8' } },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const theme = searchParams.get('theme');
    const gospel = searchParams.get('gospel');

    let results = [...PARABLES];

    if (theme) {
      results = results.filter(p => p.theme.toLowerCase() === theme.toLowerCase());
    }

    if (gospel) {
      const g = gospel.toLowerCase() as 'matthew' | 'mark' | 'luke' | 'john';
      results = results.filter(p => g in p.gospels);
    }

    return NextResponse.json({
      total: results.length,
      themes: [...new Set(PARABLES.map(p => p.theme))],
      parables: results,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
