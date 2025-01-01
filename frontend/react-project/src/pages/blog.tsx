import React, {useState} from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';
import BlogListDeveloper from '../components/blog/blog-list-developer'
import BlogListUser from '../components/blog/blog-list-user';
import CreateBlog from '../components/blog/create-blog';
import BlogDetail from '../components/blog/blog-detail';
import PasswordPrompt from '../components/blog/PasswordPrompt';


const Blog: React.FC = () => {
  /**
 * コンポーネント名: Blog
 *
 * 概要:
 * - ブログのルーティングおよび表示ロジックを管理するメインコンポーネント。
 * - 開発者モードが有効な場合、認証ページを表示し、認証成功後に開発者向け機能を提供。
 * - 通常モードでは一般ユーザー向けのブログリストや投稿詳細を表示。
 *
 * Props:
 * - なし
 *
 * 環境変数:
 * - REACT_APP_DEVELOPER_MODE (string): 開発者モードを有効化するフラグ (`'true'`で有効)。
 * - REACT_APP_ACCESS_PASSWORD (string): パスワード認証のための正しいパスワードを設定。
 *
 * 使用例:
 * typescript
 * <Blog />
 *
 * 機能:
 * - 認証機能:
 *   - 開発者モードの場合、PasswordPromptを表示してパスワード認証を要求。
 *   - 認証成功後、開発者向けブログリストや投稿作成ページを利用可能。
 * - ルーティング:
 *   - `/`: 開発者モードの場合は開発者向けのブログリスト、通常モードではユーザー向けブログリストを表示。
 *   - `/create`: 開発者モードのみ投稿作成ページを表示。
 *   - `/posts/:id`: 投稿詳細ページを表示。
 *
 * 注意事項:
 * - 開発者モードや認証の制御には環境変数を使用しており、`.env`ファイルの設定が必要。
 * - 環境変数は必ず秘密情報として適切に管理してください。
 */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isDeveloperMode = process.env.REACT_APP_DEVELOPER_MODE === 'true';

  const handleAccessGranted = () => {
    setIsAuthenticated(true);
  };

  if (isDeveloperMode && !isAuthenticated) {
    return <PasswordPrompt onAccessGranted={handleAccessGranted} />;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={isDeveloperMode ? <BlogListDeveloper /> : <BlogListUser />} />
        <Route path="/create" element={isDeveloperMode ? <CreateBlog /> : <Navigate to="/" replace/>} />
        <Route path="/posts/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  );
};

export default Blog;