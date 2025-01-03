import React, { useState } from 'react';
import data from '../../assets/sky-view-dataset.json';
import { useLocation, useNavigate } from 'react-router-dom';

const Album: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 初期値を location.state.category から取得（記憶した MediaMain に合わせて修正）
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    location.state?.category ? [location.state.category] : [] // 初期値を設定
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6; // 1ページに表示するアイテム数

  // 初期状態のログ
  console.log('Initial Categories:', selectedCategories);

  // カテゴリー選択のトグル
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      const updatedCategories = prev.includes(category)
        ? prev.filter((cat) => cat !== category) // すでに選択されている場合は削除
        : [...prev, category]; // 選択されていない場合は追加
      console.log('Category Toggled:', category);
      console.log('Updated Categories:', updatedCategories);
      return updatedCategories;
    });
  };

  // フィルタリング
  const filteredData = data.filter((item) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) => item.categories.includes(category));
    const matchesTitle = item.title.includes(searchTerm);
    return matchesCategory && matchesTitle;
  });

  // ページネーションの計算
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleBackClick = () => {
    navigate(-1); // 前のページに戻る
  };

  return (
    <div>
      {/* 検索バー */}
      <div className="sky-view-header">
        <button onClick={handleBackClick} className="back-button">
            戻る
        </button>
        <div className="search-bar">
          <label htmlFor="search-input" className="search-label">
            検索:
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="タイトルで検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      {/* アルバム表示 */}
      <div className="album">
        {currentItems.map((item) => (
          <div className="card" key={item.id}>
            {item.type === 'image' ? (
              <img src={item.src} alt={item.title} className="card-media" />
            ) : (
              <video controls className="card-media">
                <source src={item.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => {
              setCurrentPage((prev) => {
                const newPage = Math.max(prev - 1, 1);
                console.log('Navigated to Previous Page:', newPage);
                return newPage;
              });
            }}
            disabled={currentPage === 1}
          >
            前へ
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button
            onClick={() => {
              setCurrentPage((prev) => {
                const newPage = Math.min(prev + 1, totalPages);
                console.log('Navigated to Next Page:', newPage);
                return newPage;
              });
            }}
            disabled={currentPage === totalPages}
          >
            次へ
          </button>
        </div>
      )}
    </div>
  );
};

export default Album;