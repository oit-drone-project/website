import React, { useState } from 'react';
import { Clipboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../css/Access.css';

const Access: React.FC = () => {
  const address = "東京都〇〇区〇〇町1-2-3";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="access-container">
      <h2 className="access-title">アクセス情報</h2>
      <div className="access-mt-4">
        <p className="access-text">📍 住所: {address}
          <button onClick={copyToClipboard} className="access-copy-btn">
            <Clipboard size={20} />
          </button>
        </p>
        {copied && <span className="access-copied-message">コピーしました！</span>}
        <p className="access-text">🚆 最寄駅: 〇〇線 〇〇駅 徒歩5分</p>
        <p className="access-text">🗺️ Googleマップ: 
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="access-link">こちら</a>
        </p>
      </div>
      <div className="access-mt-6">
        <h3 className="access-subtitle">🚶 徒歩でのアクセス</h3>
        <p className="access-text">〇〇駅から東口を出て、〇〇通りを直進し、右手に見える〇〇ビルの2階です。</p>
      </div>
      <div className="access-mt-6">
        <h3 className="access-subtitle">🚖 車でのアクセス</h3>
        <p className="access-text">首都高〇〇ICを降り、〇〇通りを直進、建物裏に駐車場があります（有料）。</p>
      </div>
      <div className="access-mt-6">
        <h3 className="access-subtitle">🅿️ 駐車場情報</h3>
        <p className="access-text">敷地内に駐車場あり（1時間500円）。</p>
        <p className="access-text">近隣のコインパーキング: 〇〇パーキング（徒歩2分）</p>
      </div>
      <Link to="/" className="access-text-blue access-mt-6 block">🏠 ホームに戻る</Link>
    </div>
  );
};

export default Access;
