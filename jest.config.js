module.exports = {
  preset: 'ts-jest', // 使用 ts-jest 处理 TypeScript
  testEnvironment: 'node', // 测试环境
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // 匹配测试文件
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // 文件扩展名
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // 指定 tsconfig 文件
    },
  },
};
