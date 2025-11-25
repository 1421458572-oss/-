import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-10">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            日本語文章解析器
        </span>
      </h1>
      <p className="text-gray-500 text-sm md:text-base font-light tracking-wide uppercase mt-3">
        AI驱动 · 深入理解日语句子结构与词义
      </p>
    </header>
  );
};

export default Header;
