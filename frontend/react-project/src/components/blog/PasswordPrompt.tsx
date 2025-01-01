import React, { useState } from 'react';

const PasswordPrompt: React.FC<{ onAccessGranted: () => void }> = ({ onAccessGranted }) => {
/**
 * コンポーネント名: PasswordPrompt
 *
 * 概要:
 * - パスワード認証ページ。
 * - ユーザーがパスワードを入力し、正しい場合に認証を成功として処理します。
 *
 * Props:
 * - onAccessGranted (function): 認証成功時に実行されるコールバック関数（必須）
 *
 * 使用例:
 * typescript
 * <PasswordPrompt onAccessGranted={() => console.log('Access Granted!')} />
 *
 * 環境変数:
 * - `REACT_APP_ACCESS_PASSWORD`: 正しいパスワードとして使用される文字列を定義するための環境変数。
 * 
 * 例:
 * ```
 * // .env ファイルに以下のように記述
 * REACT_APP_ACCESS_PASSWORD=your_password
 * ```
 *
 * スタイルのカスタマイズ:
 * - 現時点では直接スタイルを受け付けるプロパティはありません。
 * - 必要に応じて、親コンテナのCSSやスタイルプロパティを変更して調整可能です。
 *
 * コンポーネントの動作:
 * - ユーザーがフォームを送信すると、環境変数で定義されたパスワードと比較します。
 * - 認証が成功すると、`onAccessGranted` コールバックを呼び出します。
 * - 認証が失敗すると、エラーメッセージを表示します。
 *
 * 注意事項:
 * - 環境変数を使っているため、公開プロジェクトでは環境変数が適切に保護されていることを確認してください。
 * - パスワード入力に対するセキュリティやエラーハンドリングは、必要に応じて強化することをお勧めします。
 */
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = process.env.REACT_APP_ACCESS_PASSWORD; // 正しいパスワード
    console.log(process.env.REACT_APP_ACCESS_PASSWORD)
    
    if (password === correctPassword) {
      onAccessGranted();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div>
      <h2>Enter Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PasswordPrompt;