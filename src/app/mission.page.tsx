// app/mission.page.tsx
import React from 'react';
import Link from 'next/link';

export default function MissionPage() {
  return (
    <div>
      <h1>日々のミッション</h1>
      <p>ここに日々のミッションに関する内容を表示します。</p>
      <Link href="/">ホームに戻る</Link>
    </div>
  );
}
